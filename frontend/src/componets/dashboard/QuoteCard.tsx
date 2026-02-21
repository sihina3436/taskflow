import { useState, useEffect } from "react";

type Quote = {
  text: string;
  author: string;
};

const quotes: Quote[] = [
  { text: "Start now, not later.", author: "Mark Twain" },
  { text: "Progress over perfection.", author: "Aristotle" },
  { text: "Done is better than perfect.", author: "Sheryl Sandberg" },
  { text: "Stay hungry. Stay foolish.", author: "Steve Jobs" },
  { text: "Small steps win big goals.", author: "Robin Sharma" },
  { text: "Discipline equals freedom.", author: "Jocko Willink" },
  { text: "Dream big. Act bigger.", author: "Tony Robbins" },
  { text: "Consistency builds greatness.", author: "John Maxwell" },
  { text: "Action cures fear.", author: "Dale Carnegie" },
  { text: "Focus creates success.", author: "Bruce Lee" },
  { text: "Push beyond limits.", author: "Michael Jordan" },
  { text: "Make it happen.", author: "Elon Musk" },
  { text: "Your only limit is you.", author: "Oprah Winfrey" },
  { text: "Excellence is a habit.", author: "Aristotle" },
  { text: "Start where you are.", author: "Arthur Ashe" },
  { text: "Turn pain into power.", author: "Les Brown" },
  { text: "Success loves speed.", author: "Tony Robbins" },
  { text: "Great things take time.", author: "Warren Buffett" },
  { text: "Build daily momentum.", author: "Mel Robbins" },
  { text: "Make today count.", author: "" },
  { text: "Success begins with belief.", author: "Napoleon Hill" },
  { text: "Work hard. Stay humble.", author: "Cristiano Ronaldo" },
  { text: "Fall seven times, rise eight.", author: "Japanese Proverb" },
  { text: "The best time is now.", author: "" },
  { text: "Hard work beats talent.", author: "Tim Notke" },
  { text: "Believe and achieve.", author: "Norman Vincent Peale" },
  { text: "Fear is temporary. Regret is forever.", author: "" },
  { text: "Clarity creates confidence.", author: "Brendon Burchard" },
  { text: "One step at a time.", author: "" },
  { text: "Your future starts today.", author: "Robert Kiyosaki" },
  { text: "Effort defines destiny.", author: "" },
  { text: "Do something today.", author: "" },
  { text: "Success requires sacrifice.", author: "" },
  { text: "Energy flows where focus goes.", author: "Tony Robbins" },
  { text: "Master your mindset.", author: "David Goggins" },
  { text: "Take control of your life.", author: "Jim Rohn" },
  { text: "Winners never quit.", author: "Vince Lombardi" },
  { text: "Create your own future.", author: "Peter Drucker" },
  { text: "Courage fuels progress.", author: "" },
  { text: "Commit. Execute. Repeat.", author: "" }
];


const getRandomQuote = () =>
  quotes[Math.floor(Math.random() * quotes.length)];

const QuoteCard = () => {
  const [quote, setQuote] = useState(getRandomQuote());

  // auto refresh every 1 minute
  useEffect(() => {
    const interval = setInterval(() => {
      setQuote(getRandomQuote());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="
        w-full lg:w-[360px]
        bg-white
        border border-gray-100
        rounded-xl
        shadow-sm
        px-4 py-3
        flex items-center gap-3
        hover:shadow-md transition
      "
    >
      {/* small remix icon */}
      <i className="ri-double-quotes-l text-indigo-500 text-lg shrink-0" />

      {/* text */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-700 truncate">
          “{quote.text}”
        </p>
        <span className="text-xs text-gray-400">
          — {quote.author}
        </span>
      </div>

      {/* refresh */}
      <button
        onClick={() => setQuote(getRandomQuote())}
        className="text-gray-400 hover:text-indigo-600 text-base shrink-0"
      >
        <i className="ri-refresh-line" />
      </button>
    </div>
  );
};

export default QuoteCard;
