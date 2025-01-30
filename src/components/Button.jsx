function Button({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-1/3 m-4 py-2 px-4 rounded-full bg-[#7b1481] text-white font-semibold hover:bg-[#6a0f71] focus:outline-none focus:ring-2 focus:ring-[#7b1481] focus:ring-opacity-50"
    >
      {text}
    </button>
  );
}

export default Button;
