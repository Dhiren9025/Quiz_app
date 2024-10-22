import { useState } from 'react';
import Quiz from './Quiz';
import Results from './Results';
import CategorySelection from './CategorySelection';

function App() {
  const [isQuizStarted, setIsQuizStarted] = useState(false); // Track if the quiz is started
  const [isQuizFinished, setIsQuizFinished] = useState(false); // Track if the quiz is finished
  const [score, setScore] = useState(0);
  const [quizData, setQuizData] = useState({ category: null, numQuestions: 3 });

  // Handle when the quiz finishes
  const handleQuizFinish = (finalScore) => {
    setScore(finalScore);
    setIsQuizFinished(true); // Mark the quiz as finished
    setIsQuizStarted(false); // Stop showing the Quiz component
  };

  // Start the quiz with selected category and number of questions
  const startQuiz = (category, numQuestions) => {
    console.log("Starting quiz with category:", category, "and number of questions:", numQuestions);
    setQuizData({ category, numQuestions });
    setIsQuizStarted(true); // Start the quiz
    setIsQuizFinished(false); // Ensure the quiz is not finished yet
    setScore(0); // Reset the score for a new quiz
  };

  // New function to restart the quiz
  const restartQuiz = () => {
    setIsQuizStarted(false); // Stop showing the Quiz component
    setIsQuizFinished(false); // Reset the finished state
    setScore(0); // Reset the score
    setQuizData({ category: null, numQuestions: 3 }); // Reset quiz data
  };

  return (
    <div className="app-container max-w-lg mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-black bg-white p-4 rounded-lg shadow-md">
        It's <span className="text-red-500">Q</span>
        <span className="text-green-500">u</span>
        <span className="text-blue-500">i</span>
        <span className="text-yellow-500">z </span> 
        Time!
      </h1>

      {/* Show the Category Selection if the quiz hasn't started yet */}
      {!isQuizStarted && !isQuizFinished && (
        <CategorySelection onStartQuiz={startQuiz} />
      )}

      {/* Show the Quiz component when the quiz is started */}
      {isQuizStarted && (
        <Quiz 
          onFinish={handleQuizFinish} 
          category={quizData.category} 
          numQuestions={quizData.numQuestions} 
        />
      )}

      {/* Show the Results component when the quiz is finished */}
      {isQuizFinished && (
        <Results 
          score={score} 
          totalQuestions={quizData.numQuestions} 
          onRestart={restartQuiz} // Pass the restart function
        />
      )}
    </div>
  );
}

export default App;
