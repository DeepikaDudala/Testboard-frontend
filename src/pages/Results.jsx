import React from "react";
import { useSelector } from "react-redux";
import CardComponentResult from "../components/CardComponentResult";
import Spinner from "../components/Spinner";

function Results() {
  const { results, isLoading } = useSelector((state) => state.results);
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {results.map(({ _id, testName }) => (
          <CardComponentResult
            name={testName}
            key={_id}
            buttonText="View Result"
            buttonType="px-4 py-2 rounded-xl"
            id={_id}
          />
        ))}
      </div>
    </div>
  );
}

export default Results;
