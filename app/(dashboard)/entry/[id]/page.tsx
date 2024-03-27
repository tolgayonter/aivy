import Editor from "@/components/Editor";
import { getUserByClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";

const getEntry = async (id) => {
  const user = await getUserByClerkID();

  const entry = await prisma.entry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id: id,
      },
    },
  });

  return entry;
};

const EntryPage = async ({ params }) => {
  const entry = await getEntry(params.id);
  const analyses = [
    { name: "Summary", value: "" },
    { name: "Subject", value: "" },
    { name: "Mood", value: "" },
    { name: "Negative", value: "False" },
  ];

  return (
    <div className="w-full h-full grid grid-cols-3">
      <div className="col-span-2">
        <Editor entry={entry} />
      </div>
      <div className="border-l border-black/10">
        <div className="bg-blue-200 px-5 py-10">
          <h2 className="text-xl">Analysis</h2>
        </div>
        <div>
          <ul>
            {analyses.map((item) => (
              <li
                key={item.name}
                className="flex items-center justify-between px-2 py-4 border-b border-t border-black/10"
              >
                <span className="text-lg font-semibold">{item.name}</span>
                <span>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EntryPage;
