import { useDispatch, useSelector } from "react-redux";
import {
  onOptionsChange,
  onQuestionsChange,
  onRemoveQuestion, 
} from "../features/tests/createTestSlice";
import { FaTrash } from "react-icons/fa";

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

  const handleRemoveQuestion = () => {
    dispatch(onRemoveQuestion({ index }));
  };

  return (
    <div className="border border-gray-300 text-xs rounded-lg p-6 my-4 shadow-sm relative">
      <button
        type="button"
        onClick={handleRemoveQuestion}
        className="absolute top-2 right-2 text-red-500 hover:text-red-700 focus:outline-none"
        title="Remove Question"
      >
        <FaTrash />
      </button>
      <div className="flex items-center mb-4">
        <label htmlFor="text" className=" font-medium text-gray-700 mr-4">
          Question {index + 1}:
        </label>
        <input
          type="text"
          id="text"
          name="text"
          value={text}
          onChange={handleChange}
          required
          className="w-3/4 px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
        />
      </div>
      <ul>
        {options.map((value, i) => (
          <li key={i} className="mt-3">
            <input
              type="text"
              name={i.toString()}
              id={`option${i}`}
              placeholder={`Option ${i + 1}`}
              value={value}
              onChange={(e) => handleOptionsChange(e, i)}
              required
              className="w-1/2 px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            />
          </li>
        ))}
      </ul>
      <div className="flex items-center mt-6">
        <label
          htmlFor="correctAnswer"
          className=" font-medium text-gray-700 mr-4"
        >
          Correct Option:
        </label>
        <select
          name="correctAnswer"
          id="correctAnswer"
          required
          onChange={handleChange}
          className="px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
        >
          <option value="">Select Option</option>
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
