import React, { useState } from "react";
import { useSelector } from "react-redux";
import CardComponentResult from "../components/CardComponentResult";
import Spinner from "../components/Spinner";
import SearchBar from "../components/SearchBar";
import NoResults from '../assets/NoResults.svg';

function Results() {
  const { results, isLoading } = useSelector((state) => state.results);
  const [searchTerm, setSearchTerm] = useState("");

  if (isLoading) {
    return <Spinner />;
  }

  const filteredResults = results.filter((test) =>
    test.testName.toLowerCase().includes(searchTerm.toLowerCase())
  );
console.log(results)
  return (
    <div className="w-full h-full">
      <div className="md:hidden flex items-center invisible justify-center  mb-4">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
      <div className="container mx-auto text-center">
        <div className="flex items-center justify-center mb-4">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
      {/* Display a message if no results are found */}
      <div className="m-5 md:m-10">
        <h6 className=" text-2xl font-semibold text-[#7B1481]">Results</h6>
      {filteredResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredResults.map(({ testName, _id }) => (
                  <CardComponentResult
                    name={testName}
                    key={_id}
                    buttonText="View Result"
                    buttonType="px-4 py-2 rounded-xl"
                    id={_id}
                  />
                ))}
              </div>
            ) : (
              searchTerm && (
                <div className="flex flex-col items-center justify-center h-96">
                  <img src={NoResults} className="w-1/4 h-auto mb-4" alt="No Results" />
                  <p className="text-gray-500 text-lg">No tests found. Try a different search.</p>
                </div>
              )
            )}
      </div>
      
    </div>
    </div>

  );
}

export default Results;
