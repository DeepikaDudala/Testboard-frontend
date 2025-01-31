import { useSelector } from "react-redux";
import { useState } from "react";
import CardComponent from "../components/CardComponent";
import Spinner from "../components/Spinner";
import SearchBar from "../components/SearchBar";
import SortButton from "../components/SortButton";
import WelcomeTest from '../assets/WelcomeTest.svg';
import NoResults from '../assets/NoResults.svg';

function Tests() {
  const { tests, isLoading } = useSelector((state) => state.tests);
  const { role } = useSelector((state) => state.auth.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState(null);

  if (isLoading) {
    return <Spinner />;
  }

  const filteredTests = tests.filter((test) =>
    test.testName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedTests = [...filteredTests].sort((a, b) => {
    if (sortType === "duration-asc") return a.duration - b.duration;
    if (sortType === "duration-desc") return b.duration - a.duration;
    if (sortType === "marks-asc") return a.totalMarks - b.totalMarks;
    if (sortType === "marks-desc") return b.totalMarks - a.totalMarks;
    return 0;
  });

  return (
    <div className="w-full h-full">
      <div className="container mx-auto text-center">
        <div className="flex items-center justify-center mb-4">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <SortButton setSortType={setSortType} />
        </div>
        {role === "teacher" ? (
          <>
            {sortedTests.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {sortedTests.map(({ testName, _id }) => (
                  <CardComponent
                    name={testName}
                    key={_id}
                    buttonText="Delete Test"
                    buttonType="bg-red-500 text-white px-4 py-2 rounded-md"
                    id={_id}
                  />
                ))}
                <CardComponent
                  name="+"
                  buttonText="Create Test"
                  buttonType="bg-blue-500 text-white px-4 py-2 rounded-md"
                />
              </div>
            ) : (
              <p className="text-gray-500">No tests found.</p>
            )}
          </>
        ) : (
          <div className="m-5 md:m-10 flex flex-col">
            {/* Show the welcome message only if no search is performed */}
            {!searchTerm && (
              <div className="flex items-center max-md:hidden bg-white flex-row rounded-xl w-full justify-center p-4 mb-4">
                <img src={WelcomeTest} className="w-1/4 h-auto" alt="Test Image" />
                <div className="w-1/2 text-sm text-gray-700">
                  <h2 className="text-3xl font-semibold text-[#7b1481] mb-2">
                    Welcome to TestBoard
                  </h2>
                  <p className="m-3">
                    Take a test to see how well you understand the subject. Ready to start? Click on "Take Test" and get started now!
                    You can also retake it to track your progress and improvement.
                  </p>
                </div>
              </div>
            )}

            {/* Show test cards if results exist, otherwise show the welcome image and text centered */}
            {sortedTests.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {sortedTests.map(({ testName, _id, duration, totalMarks }) => (
                  <CardComponent
                    name={testName}
                    key={_id}
                    buttonText="Take Test"
                    buttonType="px-4 py-2 rounded-xl"
                    id={_id}
                    duration={duration}
                    totalMarks={totalMarks}
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
        )}
      </div>
    </div>
  );
}

export default Tests;
