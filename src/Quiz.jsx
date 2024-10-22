import { useState, useEffect } from 'react';   
import { GrFormPreviousLink, GrFormNextLink } from "react-icons/gr";
import { ClipLoader } from 'react-spinners';

function Quiz({ onFinish, category, numQuestions }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  // Decode HTML entities
  function decodeHTML(html) {
    const text = document.createElement("textarea");
    text.innerHTML = html;
    return text.value;
  }

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const url = category 
          ? `https://opentdb.com/api.php?amount=${numQuestions}&category=${category}&type=multiple`
          : `https://opentdb.com/api.php?amount=${numQuestions}&type=multiple`; // Random questions
          
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        const formattedQuestions = data.results.map(q => ({
          question: decodeHTML(q.question),
          correct_answer: decodeHTML(q.correct_answer),
          options: shuffleOptions([...q.incorrect_answers.map(decodeHTML), decodeHTML(q.correct_answer)]),
        }));
        
        setQuestions(formattedQuestions);
        setSelectedOptions(Array(formattedQuestions.length).fill('')); // Initialize selected options
      } catch (error) {
        console.error('Error fetching quiz questions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [category, numQuestions]);

  // Shuffle options for the quiz questions
  const shuffleOptions = (options) => {
    return options.sort(() => Math.random() - 0.5);
  };

  // Handle the next question or finish the quiz
  const handleNext = () => {
    // Increment score if the answer is correct
    if (selectedOptions[currentQuestion] === questions[currentQuestion].correct_answer) {
      setScore(score + 1);
    }

    // Check if there are more questions
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Call finish function with final score
      onFinish(score + (selectedOptions[currentQuestion] === questions[currentQuestion].correct_answer ? 1 : 0));
    }
  };

  // Handle moving to the previous question
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // Handle option change
  const handleOptionChange = (value) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[currentQuestion] = value; // Update selected option for the current question
    setSelectedOptions(newSelectedOptions);
  };

  // Handle hint usage
  const handleHint = () => {
    window.open('https://ai-chatbot-react.netlify.app/', '_blank'); // Open the link without limit
  };


  

  // Loading and no questions states
  if (loading) return <div className="text-center">
  <ClipLoader color="#FF0000" loading={loading} size={50} />
  <p >Loading...</p>
</div>;
  if (!questions.length) return <p className="text-center">No questions available. Please try again.</p>;

  return (
    <div className="quiz-container p-4 md:p-6 bg-white rounded-lg shadow-lg w-full max-w-md mx-auto mt-10">
    <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center text-gray-800 break-words leading-relaxed">
    {currentQuestion + 1}) {questions[currentQuestion].question}
  </h2>
  
      <div className="options mt-4">
        {questions[currentQuestion].options.map((option, index) => (
          <label key={index} className="block mb-2">
            <input
              type="radio"
              name="option"
              value={option}
              checked={selectedOptions[currentQuestion] === option}
              onChange={() => handleOptionChange(option)} // Update option on change
              className="hidden"
            />
            <span className={`inline-block p-3 md:p-4 w-full border border-gray-300 rounded-lg cursor-pointer transition duration-300 ease-in-out ${selectedOptions[currentQuestion] === option ? 'bg-black text-white' : 'bg-gray-100 hover:bg-blue-200'}`}>
              {option}
            </span>
          </label>
        ))}
      </div>
      <div className="flex justify-between items-center mt-6">
        <button
          className={`flex items-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md 
            ${currentQuestion === 0 ? 'opacity-50 cursor-not-allowed' : ''}`} // Disable style for the previous button
          onClick={handlePrevious}
          disabled={currentQuestion === 0} // Disable previous button on first question
        >
          <GrFormPreviousLink className="mr-2" />
          Prev
        </button>

        <button
          className="flex items-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition duration-300"
          onClick={handleNext}
        >
          {currentQuestion < questions.length - 1 ? 'Next' : 'Finish'}
          <GrFormNextLink className="ml-2" />
        </button>
      </div>

      <button 
        className="text-xl flex items-center focus:outline-none px-4 py-2 mt-4"
        onClick={handleHint}  
        style={{ cursor: 'pointer' }}
      >
        Assist
        <span
          className="inline-block text-white w-[35px] h-[32px] items-center justify-center ml-1 rounded-lg shadow-lg transition-colors duration-300"
          style={{ backgroundColor: "#007bff" }}
        >
          Me
        </span>
      </button>
    </div>
  );
}

export default Quiz;
