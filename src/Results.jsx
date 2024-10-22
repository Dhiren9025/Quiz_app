function Results({ score, totalQuestions, onRestart }) {
  // Calculate the percentage score
  const percentage = (score / totalQuestions) * 100;

  // Determine the message and emoji based on the score
  let message;
  let emoji;

  if (score === 0) {
    message = "Oh no! You didn't score any points.";
    emoji = "😢"; // Sad emoji for 0 points
  } else if (percentage >= 90) {
    message = "Congratulations! You aced the quiz!";
    emoji = "🎉"; // Celebration emoji for high score
  } else if (percentage >= 80) {
    message = "Great job! You did really well!";
    emoji = "👏"; // Applause emoji for good performance
  } else if (percentage >= 60) {
    message = "Good effort! You can improve even more!";
    emoji = "🙂"; // Encouraging emoji for moderate performance
  } else {
    message = "Don't be discouraged. Keep practicing!";
    emoji = "😞"; // Disappointed emoji for low score
  }

  return (
    <div className="results-container p-6 bg-white rounded-lg shadow-lg w-full max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Quiz Finished!</h2>
      <p className="text-lg text-center">Your score: {score} out of {totalQuestions}</p>
      <p className="text-xl text-center mt-4 font-bold">{message} {emoji}</p>
      {/* New quiz button */}
      <button 
        className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-300"
        onClick={onRestart} // Call the restart function
      >
        New Quiz
      </button>
    </div>
  );
}

export default Results;
