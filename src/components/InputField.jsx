function InputField({ type, place, id, name, value, handleChange }) {
  return (
    <input
      type={type}
      placeholder={place}
      id={id}
      name={name}
      value={value}
      onChange={handleChange}
      className="input-bottom-border my-3  w-50 "
    />
  );
}

export default InputField;
