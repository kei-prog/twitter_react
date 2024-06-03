import React from "react";

const ImagePreview = ({ previews, handleRemoveImage = null }) => {
  return (
    <div className="mt-2 grid grid-cols-2 gap-2">
      {previews.map((preview, index) => (
        <div key={index} className="relative">
          <img
            src={preview}
            alt={`Preview ${index + 1}`}
            className="w-full h-auto"
          />
          {handleRemoveImage && (
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="absolute top-0 right-0 w-6 h-6 text-white bg-gray-500 rounded-full"
            >
              ×
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ImagePreview;
