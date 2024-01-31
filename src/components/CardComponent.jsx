import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getResult } from "../features/results/resultSlice";

function CardComponent({ id, name, buttonText, buttonType }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleTest = () => {
    if (buttonText == "Take Test" || buttonText == "Delete Test")
      navigate(`/tests/${id}`);
    else if (buttonText == "View Result") {
      dispatch(getResult(id));
      navigate(`/results/${id}`);
    } else if (buttonText == "Create Test") {
      navigate(`/tests/createTest`);
    }
  };
  return (
    <div>
      <div className="col m-3">
        <div className="card p-3">
          <div className="card-body p-3 h5">{name}</div>
          <button
            type="submit"
            className={`btn  ${buttonType}`}
            onClick={handleTest}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardComponent;
