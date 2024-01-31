function InputField({ type, place, id, name, value, handleChange }) {
  return (
    <div>
      <input
        type={type}
        placeholder={place}
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        className="input-bottom-border my-3 p-2 w-50"
      />
    </div>
  );
}

export default InputField;
