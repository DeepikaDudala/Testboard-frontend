function InputField({ type, place, id, name, value, handleChange }) {
  return (
    <input
      type={type}
      placeholder={place}
      id={id}
      name={name}
      value={value}
      onChange={handleChange}
      className="my-3 md:w-1/2 px-4 py-2 rounded-full border-1 border-[#7b1481] focus:border-2 focus:outline-none focus:border-[#7b1481] text-[#7b1481]"
    />
  );
}

export default InputField;
