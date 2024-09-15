import { useState } from "react";
import CheckCircle from "../Images/upload/checkCircle.png";
import Trash from "../Images/upload/trash.png";
import CloudUpload from "../Images/upload/cloudupload.svg";

const UploadField = ({
  uploadedFile,
  setUploadedFile,
  multiple,
  uploadFileName,
  label,
  fieldName,
  name,
  error,
  errorText,
  onChange,
}) => {
  const handleDelete = () => {
    uploadedFile.setFieldValue(name, "");
  };

  return (
    <div className="flex flex-col relative w-full mb-2 ">
      <h3 className="text-contentFade">{label}</h3>
      <label
        htmlFor={name}
        className={`flex lg:w-full ${
          error ? "border-red-500" : "border-[#E4E6EA]"
        } py-[12px] pl-3  rounded-[5px] shadow-[0_1px_2px_0_rgba(16,_24,_40,_0.05)] h-[40%] p-4 border cursor-pointer bg-white`}
      >
        <div className="flex items-center">
          {uploadFileName ? (
            <div className="flex">
              <p className="text-KandaBlack mr-1 text-wrap">{uploadFileName}</p>
              <img
                src={CheckCircle}
                alt="done"
                className="text-green-500 w-5 h-5 ml-1 mt-[2px]"
              />
            </div>
          ) : (
            <div className="flex items-center">
              <img
                src={CloudUpload}
                alt="upload"
                className="text-[#AFB2B8] fill-[#AFB2B8] w-[24px]"
              />
              <p className="text-KandaBlack ml-1 w-[80%] lg:w-full overflow-hidden whitespace-nowrap text-ellipsis">
                {fieldName}
              </p>
            </div>
          )}
        </div>
        <input
          id={name}
          type="file"
          accept=" image/jpeg, image/png, image/jpg"
          onChange={onChange}
          className="hidden"
          name={name}
        />

        {uploadedFile && (
          <button
            onClick={handleDelete}
            className="absolute right-3 top-3 text-red-500 hover:text-red-700 cursor-pointer"
          >
            <img src={Trash} alt="delete" className="w-4 h-4 mt-[2px]" />
          </button>
        )}
      </label>
      <div className="ss">
        {" "}
        {error && <p className="text-xs text-red-500">{errorText}</p>}
      </div>
    </div>
  );
};

export default UploadField;
