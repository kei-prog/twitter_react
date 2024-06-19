const ConfirmationModal = ({ onClose, onConfirm, message }) => (
  <div
    onClick={onClose}
    className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/50"
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="p-6 text-center bg-black rounded-lg shadow-lg"
    >
      <p className="mb-4 text-xl font-bold">{message}</p>
      <div className="flex flex-col justify-center overflow-y-hidden">
        <button
          className="px-4 py-2 mr-2 text-white bg-red-700 rounded-full"
          onClick={onConfirm}
        >
          削除
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 mt-4 text-white bg-black border border-white rounded-full"
        >
          キャンセル
        </button>
      </div>
    </div>
  </div>
);

export default ConfirmationModal;
