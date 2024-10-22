import { useState } from "react";

const categories = [
  { name: "General Knowledge", id: 9 },
  { name: "Entertainment: Books", id: 10 },
  { name: "Entertainment: Film", id: 11 },
  { name: "Entertainment: Music", id: 12 },
  { name: "Entertainment: Musicals & Theatres", id: 13 },
  { name: "Entertainment: Video Games", id: 14 },
  { name: "Entertainment: Board Games", id: 15 },
  { name: "Science & Nature", id: 17 },
  { name: "Science: Computers", id: 18 },
  { name: "Science: Gadgets", id: 19 },
  { name: "Mythology", id: 20 },
  { name: "Sports", id: 21 },
  { name: "Geography", id: 22 },
  { name: "History", id: 23 },
  { name: "Politics", id: 24 },
  { name: "Art", id: 25 },
  { name: "Celebrities", id: 26 },
  { name: "Animals", id: 27 },
  { name: "Vehicles", id: 28 },
  { name: "Entertainment: Comics", id: 29 },
  { name: "Entertainment: Anime & Manga", id: 31 },
  { name: "Entertainment: Cartoon & Animations", id: 32 },
];

function CategorySelection({ onStartQuiz }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [numQuestions, setNumQuestions] = useState(3); // Default to 3 questions

  const handleStartQuiz = () => {
    if (selectedCategory) {
      console.log("Starting quiz with selected category:", selectedCategory);
      onStartQuiz(selectedCategory, numQuestions);
    } else {
      alert("Please select a category.");
    }
  };

  const handleRandomQuiz = () => {
    console.log("Starting random quiz");
    onStartQuiz(null, 20); // Start random quiz with 20 questions
  };

  return (
    <div className="p-4 md:p-6 bg-white rounded-lg shadow-lg w-full max-w-md mx-auto mt-10">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center text-gray-800">
        Select Quiz Category
      </h2>

      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="mb-4 p-3 border rounded w-full sm:max-w-xs md:max-w-md text-lg" // Responsive width
      >
        <option value="">-- Select a Category --</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <input
        type="number"
        min="1"
        max="100"
        value={numQuestions}
        onChange={(e) => {
          const value = e.target.value;

          // Check if the value is within the range and set the state accordingly
          if (value >= 1 && value <= 100) {
            setNumQuestions(value);
          } else if (value === "") {
            // Allow the input to be empty
            setNumQuestions("");
          }
        }}
        className="mb-4 p-2 border rounded w-full"
        placeholder="Number of Questions"
      />

      <button
        className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-300 mb-2"
        onClick={handleStartQuiz}
      >
        Start Quiz
      </button>

      <button
        className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition duration-300"
        onClick={handleRandomQuiz}
      >
        Random Quiz (20 Questions)
      </button>
    </div>
  );
}

export default CategorySelection;
