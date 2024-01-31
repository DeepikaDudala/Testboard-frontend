function DetailsComp({ result }) {
  return (
    <div className="my-5">
      <h3 className="text-center my-5">Test Results</h3>
      {result.details &&
        result.details.map(
          ({ question, correctAnswer, yourAnswer, options }, index) => (
            <div key={index}>
              <p className="mt-2">
                {correctAnswer === yourAnswer ? (
                  <span> ✔️</span>
                ) : (
                  <span>❌</span>
                )}{" "}
                {index + 1}. {question}
              </p>
              <ol>
                {options.map((option, oi) => (
                  <li
                    key={oi}
                    className={
                      correctAnswer == oi
                        ? "text-success h6"
                        : yourAnswer == oi
                        ? "text-danger h6"
                        : "text-primary "
                    }
                  >
                    {option}
                  </li>
                ))}
              </ol>
            </div>
          )
        )}
    </div>
  );
}

export default DetailsComp;
