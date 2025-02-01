function Popup({ isOpen, onClose }) {
    if (!isOpen) return null; // Don't render the popup if it's not open
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg w-96 p-6 shadow-xl">
          <h2 className="text-2xl font-semibold text-center text-indigo-600 mb-4">Popup Title</h2>
          <p className="text-gray-700 text-center mb-6">This is the content of the popup. You can put any information here.</p>
  
          <div className="flex justify-center">
            <button 
              onClick={onClose} 
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default Popup;
  