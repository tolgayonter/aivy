import { OpenAI } from "langchain/llms/openai";
import { StructuredOutputParser } from "langchain/output_parsers";
import z from "zod";
import { PromptTemplate } from "langchain/prompts";
import { Document } from "langchain/document";
import { loadQARefineChain } from "langchain/chains";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    subject: z.string().describe("the subject of the entry."),
    summary: z.string().describe("quick summary of the entire entry."),
    mood: z.string().describe("the mood of the person who wrote the entry."),
    color: z
      .string()
      .describe(
        "a hexadecimal color code that represents the mood of the entry. (e.g. #0101fe for blue representing happiness)."
      ),
    negative: z
      .boolean()
      .describe(
        "is the journal entry negative? (i.e. does it contain negative emotions?)."
      ),
    sentimentScore: z
      .number()
      .describe(
        "sentiment of the text and rated on a sclae from -10 to 10, where -10 is exremely negative, 0 is neutral, and 10 is extremely positive."
      ),
  })
);

const getPrompt = async (content) => {
  const format_instructions = parser.getFormatInstructions();

  const prompt = new PromptTemplate({
    template:
      "Analyse the following entry. Follow the instructions and format your response to match the format instructions, no matter what!\n{format_instructions}\n{entry}",
    inputVariables: ["entry"],
    partialVariables: { format_instructions },
  });

  const input = await prompt.format({
    entry: content,
  });

  return input;
};

export const analyse = async (content) => {
  const model = new OpenAI({ temperature: 0, modelName: "gpt-3.5-turbo" });
  const input = await getPrompt(content);
  const result = await model.invoke(input);

  try {
    return parser.parse(result);
  } catch (error) {
    console.log(error);
  }
};

export const qa = async (question, entries) => {
  const docs = entries.map((entry) => {
    return new Document({
      pageContent: entry.content,
      metadata: { id: entry.id, createdAt: entry.createdAt },
    });
  });

  const model = new OpenAI({ temperature: 0, modelName: "gpt-3.5-turbo" });
  const chain = loadQARefineChain(model);
  const embeddings = new OpenAIEmbeddings();
  const store = await MemoryVectorStore.fromDocuments(docs, embeddings);
  const relevantDocs = await store.similaritySearch(question);
  const response = await chain.invoke({
    input_documents: relevantDocs,
    question,
  });

  return response.output_text;
};
