import React from "react";
import ImageIcon from "../../../assets/image.svg";

const ImageUploadButton = ({
  handleImageChange,
  imageCount,
  maxImages = 4,
}) => {
  const isDisabled = imageCount >= maxImages;

  return (
    <label>
      <input
        type="file"
        multiple
        accept="image/jpeg, image/png"
        onChange={handleImageChange}
        className="hidden"
        disabled={isDisabled}
      />
      <img
        src={ImageIcon}
        alt="Image Icon"
        className={`w-4 h-4 text-blue-500 ${
          isDisabled ? "opacity-50" : "cursor-pointer"
        }`}
      />
    </label>
  );
};

export default ImageUploadButton;
