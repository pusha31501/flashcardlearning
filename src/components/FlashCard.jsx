import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

const FlashCard = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [cards, setCards] = useState(() => {
    const saved = localStorage.getItem("flashcards");
    return saved ? JSON.parse(saved) : [];
  });

  const [flippedIndex, setFlippedIndex] = useState(null);
  //Save to LocalStorage
  useEffect(() => {
    localStorage.setItem("flashcards", JSON.stringify(cards));
  }, [cards]);

  const addCard = () => {
    if (!question.trim() || !answer.trim()) return;
    setCards([...cards, { question, answer }]);
    setQuestion("");
    setAnswer("");
  };
  const removeCard = (index) => {
    setCards(cards.filter((_, i) => i !== index));
  };
  return (
    <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Flashcard Learning App</h1>
      <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl shadow-lg w-full max-w-xl mb-8">
        <h2 className="text-xl font-semibold mb-4">Add a Flashcard</h2>
        <input
          type="text"
          placeholder="Enter question...."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full mb-3 p-2 rounded-md text-gray-800 focus:outline-0 bg-amber-50"
        />
        <input
          type="text"
          placeholder="Enter answer...."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full mb-3 p-2 rounded-md text-gray-800 focus:outline-0 bg-amber-50"
        />
        <button
          onClick={addCard}
          className="w-full py-2 bg-green-500 rounded-md font-semibold hover:bg-green-600 transition cursor-pointer mb-4"
        >
          Add Card
        </button>
        {cards.length === 0 ? (
          <p className="text-white/80">
            No Flashcards yet. Add one to get started
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-5xl">
            {cards.map((card, i) => (
              <motion.div
                initial={{ rotateY: 0 }}
                animate={{ rotateY: flippedIndex === i ? 180 : 0 }}
                transition={{ duration: 0.6 }}
                style={{ transformStyle: "preserve-3d" }}
                key={i}
                className="relative w-full h-48 cursor-pointer"
                onClick={() => setFlippedIndex(flippedIndex === i ? null : i)}
              >
                {/*front*/}
                <div className="absolute inset-0 flex flex-col justify-center items-center bg-white/20 rounded-xl shadow-xl backface-hidden p-4">
                  <div className="absolute top-2 left-2 p-1 bg-gray-300 rounded-full w-6 h-6 flex items-center justify-center">
                    <p className="font-bold text-gray-950">{i + 1}</p>
                  </div>
                  <p className="text=xl font-bold">{card.question}</p>
                </div>
                {/*back*/}
                <div
                  className="absolute inset-0 flex flex-col justify-between items-center bg-green-400 text-black rounded-xl shadow-lg p-4"
                  style={{
                    transform: "rotateY(180deg)",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <div className="absolute top-2 left-2 p-1 bg-gray-300 rounded-full w-6 h-6 flex items-center justify-center">
                    <p className="font-bold">{i + 1}</p>
                  </div>
                  <span className="font-light">Answer: </span>
                  <p className="text-lg font-semibold">{card.answer}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeCard(i);
                    }}
                    className="w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FlashCard;
