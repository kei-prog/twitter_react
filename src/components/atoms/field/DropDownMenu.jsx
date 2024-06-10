const DropdownMenu = ({ handleConfirmDeleteClick }) => (
  <div className="absolute top-0 right-0 p-2 bg-black border border-gray-600 rounded-lg w-max">
    <div className="flex items-center text-base text-red-500">
      <img src="/src/assets/trash.svg" alt="trash" className="w-4 h-4" />
      <span className="pl-2 cursor-pointer" onClick={handleConfirmDeleteClick}>
        削除
      </span>
    </div>
  </div>
);

export default DropdownMenu;
