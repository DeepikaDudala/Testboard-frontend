import { useSelector } from "react-redux";
import CardComponent from "../components/CardComponent";
import Spinner from "../components/Spinner";

function Tests() {
  const { tests, isLoading } = useSelector((state) => state.tests);
  const { role } = useSelector((state) => state.auth.user);

  if (isLoading) {
    return <Spinner />;
  }
  if (role == "teacher") {
    return (
      <div className=" full-width-div ">
        <div className="container text-center">
          <h4 className="text-primary p-4">Tests</h4>
          {tests.length && (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4">
              <>
                {tests.map(({ testName, _id }) => (
                  <CardComponent
                    name={testName}
                    key={_id}
                    buttonText="Delete Test"
                    buttonType="btn btn-danger"
                    id={_id}
                  />
                ))}
                <CardComponent
                  name={`+`}
                  buttonText="Create Test"
                  buttonType="btn-primary"
                />
              </>
            </div>
          )}
        </div>
      </div>
    );
  }
  return (
    <div className=" full-width-div ">
      <div className="container text-center">
        <h4 className="text-primary p-4">Tests</h4>
        {tests.length && (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4">
            {tests.map(({ testName, _id }) => (
              <CardComponent
                name={testName}
                key={_id}
                buttonText="Take Test"
                buttonType="btn-primary"
                id={_id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Tests;
