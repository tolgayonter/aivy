"use client";

import { askQuestion } from "@/utils/api";
import { useState } from "react";

const Question = () => {
  const [value, setValue] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const answer = await askQuestion(value);
    setResponse(answer);

    setValue("");
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="border border-black/20 px-4 py-2 text-lg rounded-lg"
          value={value}
          type="text"
          placeholder="Ask a question"
          onChange={handleOnChange}
          disabled={loading}
        />
        <button
          className="bg-blue-200 px-4 py-2 rounded-lg text-lg"
          type="submit"
          disabled={loading}
        >
          Ask
        </button>
      </form>
      {loading && <div>...loading</div>}
      {response && <div>{response}</div>}
    </div>
  );
};

export default Question;
