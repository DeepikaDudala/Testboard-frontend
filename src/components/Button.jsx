function Button({ text }) {
  return (
    <div className=" d-md-flex justify-content-md-center m-3">
      <button
        className="btn btn-outline-primary me-md-2 btn-sm mt-2"
        type="submit"
      >
        {text}
      </button>
    </div>
  );
}

export default Button;
