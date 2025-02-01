import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

function DetailsComp({ result }) {
  return (
    <div className="my-8 px-4 flex justify-center">
      <div className="w-full md:w-1/2">

        {result.details && result.details.map(({ question, correctAnswer, yourAnswer, options }, index) => (
          <div
            key={index}
            className="mb-6 p-4 rounded-lg border shadow-md bg-white"
          >
            <p className="text-lg font-semibold mb-3">{index + 1}. {question}</p>

            <ol className="pl-5 space-y-2 list-decimal">
              {options.map((option, oi) => {
                let optionStyle = "p-2 rounded-md flex items-center justify-between";
                if (oi == correctAnswer) {
                  optionStyle += " bg-green-100 text-green-700 font-semibold";
                } else if (oi === yourAnswer && yourAnswer !== correctAnswer) {
                  optionStyle += " bg-red-100 text-red-700 font-semibold";
                } else {
                  optionStyle += " text-gray-800";
                }

                return (
                  <li key={oi} className={optionStyle}>
                    {option}
                    {oi == yourAnswer && yourAnswer != correctAnswer && <FaTimesCircle className="text-red-600 ml-2" />}
                    {oi == correctAnswer && <FaCheckCircle className="text-green-600 ml-2" />}
                  </li>
                );
              })}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DetailsComp;
