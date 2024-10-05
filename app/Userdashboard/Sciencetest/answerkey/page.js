'use client'
import { useRouter } from "next/navigation";

const AnswerKey = () => {
  const router = useRouter();
  const { search } = router; // Get the search string from the router

  // Use URLSearchParams to parse the search string
  const params = new URLSearchParams(search);
  
  // Retrieve data from search params
  const questions = JSON.parse(params.get("questions") || "[]");
  const selectedOptions = JSON.parse(params.get("selectedOptions") || "[]");
  const isCorrectArray = JSON.parse(params.get("isCorrectArray") || "[]");

  return (
    <div className="bg-gray-50 flex items-center justify-center w-full">
      <div className="bg-white rounded-lg p-8 flex flex-col w-1/2">
        <h3 className="text-lg font-bold mb-4">Answer Key</h3>
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-2">Question</th>
              <th className="px-4 py-2">Your Answer</th>
              <th className="px-4 py-2">Correct Answer</th>
              <th className="px-4 py-2">Correctness</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2">{question.question}</td>
                <td className="px-4 py-2">{selectedOptions[index]}</td>
                <td className="px-4 py-2">{question.correctAnswer}</td>
                <td className="px-4 py-2">
                  {isCorrectArray[index] ? (
                    <span className="text-green-500">✔</span>
                  ) : (
                    <span className="text-red-500">✘</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnswerKey;
