import React from "react";
import { useDropzone } from "react-dropzone";

const Dropzone = ({ onDrop, children }) => {
    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div {...getRootProps()} className="w-full h-full flex flex-col items-center justify-center flex-nowrap">
            <input {...getInputProps()} />
            {children}
        </div>
    );
};

export default Dropzone;