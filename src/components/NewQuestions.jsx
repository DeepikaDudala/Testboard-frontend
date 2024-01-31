import { useDispatch, useSelector } from "react-redux";
import {
  onOptionsChange,
  onQuestionsChange,
} from "../features/tests/createTestSlice";

function NewQuestions({ index }) {
  const { text, options } = useSelector(
    (state) => state.createTest.questions[index]
  );
  const dispatch = useDispatch();
  const handleChange = (e) => {
    e.preventDefault();
    dispatch(
      onQuestionsChange({ name: e.target.name, value: e.target.value, index })
    );
  };
  const handleOptionsChange = (e, optionIndex) => {
    e.preventDefault();
    dispatch(
      onOptionsChange({
        questionIndex: index,
        optionIndex,
        value: e.target.value,
      })
    );
  };
  return (
    <div>
      <div className="d-flex align-items-center">
        <label htmlFor="text" className="h6 me-2">
          Question {index + 1}:
        </label>
        <input
          type="text"
          className="form-control form-control-sm w-75 m-3"
          name="text"
          id="text"
          value={text}
          onChange={handleChange}
          required
        />
      </div>
      <ul>
        {options.map((value, i) => (
          <li key={i} className="mt-2">
            <input
              type="text"
              className="form-control form-control-sm w-50"
              name={i}
              id={`option${i}`}
              placeholder={`Option ${i + 1}`}
              value={value}
              onChange={(e) => handleOptionsChange(e, i)}
              required
            />
          </li>
        ))}
      </ul>
      <div className="d-flex align-items-center">
        <label htmlFor="correctAnswer" className="h6 me-2">
          Correct Option :
        </label>
        <select
          name="correctAnswer"
          id="correctAnswer"
          required
          onChange={handleChange}
        >
          <option value="">options</option>
          <option value="0">{options[0]}</option>
          <option value="1">{options[1]}</option>
          <option value="2">{options[2]}</option>
          <option value="3">{options[3]}</option>
        </select>
      </div>
    </div>
  );
}

export default NewQuestions;
