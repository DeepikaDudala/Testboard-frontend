import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import CardComponent from "../components/CardComponent";
import Spinner from "../components/Spinner";

function Results() {
  const { results, isLoading } = useSelector((state) => state.results);
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div>
      <div className="container text-center">
        <h4 className="text-primary p-4">Results</h4>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4">
          {results.map(({ _id, testName }) => (
            <CardComponent
              name={testName}
              key={_id}
              buttonText="View Result"
              buttonType="btn-primary"
              id={_id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Results;
