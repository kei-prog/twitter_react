const CameraButton = ({ onChange, type }) => (
  <div className="absolute inset-0 flex items-center justify-center rounded-full bg-opacity-50">
    <label className="p-2 text-white bg-gray-800 rounded-full cursor-pointer bg-opacity-50">
      <img
        src="/src/assets/icons8-camera-50.png"
        alt="Camera Icon"
        className="w-6 h-6"
      />
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => onChange(e, type)}
      />
    </label>
  </div>
);

export default CameraButton;
