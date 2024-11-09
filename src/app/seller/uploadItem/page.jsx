"use client";

import { useState, useEffect } from "react";

import Left from "@/components/sellerUploadItem/left";
import Right from "@/components/sellerUploadItem/right";
import Color from "@/components/sellerUploadItem/color";

export default function UploadItem() {
    const [noOfFilesAdded, setNoOfFilesAdded] = useState(0);
    const [file1, setFile1] = useState(null);
    const [file1Preview, setFile1Preview] = useState(null);
    const [file2, setFile2] = useState(null);
    const [file2Preview, setFile2Preview] = useState(null);
    const [file3, setFile3] = useState(null);
    const [file3Preview, setFile3Preview] = useState(null);
    const [file4, setFile4] = useState(null);
    const [file4Preview, setFile4Preview] = useState(null);
    const [file5, setFile5] = useState(null);
    const [file5Preview, setFile5Preview] = useState(null);
    const [selectedColor, setSelectedColor] = useState("#FFF");

    const isBase64Video = (base64) => {
        const mime = base64.match(/^data:(.*?);base64,/);

        if (mime && mime[1].startsWith('video/')) {
            return true;
        } else {
            return false;
        }
    }

    const base64ToFileImage = (base64String, fileName) => {
        // Split the base64 string into the data type and the actual data
        const [header, data] = base64String.split(',');
        // Extract the MIME type from the header
        const mimeType = header.match(/:(.*?);/)[1];

        // Convert the base64 string to binary data
        const binaryData = atob(data);

        // Create an array buffer to hold the binary data
        const arrayBuffer = new ArrayBuffer(binaryData.length);
        const uint8Array = new Uint8Array(arrayBuffer);

        // Populate the array buffer with the binary data
        for (let i = 0; i < binaryData.length; i++) {
            uint8Array[i] = binaryData.charCodeAt(i);
        }

        // Create a Blob from the array buffer
        const blob = new Blob([arrayBuffer], { type: mimeType });

        // Create a File object from the Blob
        const file = new File([blob], fileName, { type: mimeType });

        return file;
    }

    const base64ToBlob = (base64, contentType) => {
        const byteCharacters = atob(base64.split(',')[1]); // Decode Base64 string
        const byteArrays = [];

        for (let i = 0; i < byteCharacters.length; i += 512) {
            const slice = byteCharacters.slice(i, i + 512);
            const byteNumbers = new Array(slice.length);

            for (let j = 0; j < slice.length; j++) {
                byteNumbers[j] = slice.charCodeAt(j);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        return new Blob(byteArrays, { type: contentType });
    }

    // Function to convert Base64 to File
    const base64ToFileVideo = (base64, fileName, contentType) => {
        const blob = base64ToBlob(base64, contentType);
        return new File([blob], fileName, { type: contentType });
    }

    return <main className="relative px-[10%] lg:px-[5%] mb-[90px] top-[80px]">
        <p className="mt-[35px] lg:mt-[60px] mb-[45px] text-2xl lg:text-4xl font-medium">Product information</p>
        <div className="flex flex-col lg:flex-row flex-nowrap justify-between lg:mb-[150px]">
            <div className="w-full lg:w-[48%] flex flex-col flex-nowrap items-center">
                <Left
                    file1={file1}
                    setFile1={setFile1}
                    file2={file2}
                    setFile2={setFile2}
                    file3={file3}
                    setFile3={setFile3}
                    file4={file4}
                    setFile4={setFile4}
                    file5={file5}
                    setFile5={setFile5}
                    file1Preview={file1Preview}
                    setFile1Preview={setFile1Preview}
                    file2Preview={file2Preview}
                    setFile2Preview={setFile2Preview}
                    file3Preview={file3Preview}
                    setFile3Preview={setFile3Preview}
                    file4Preview={file4Preview}
                    setFile4Preview={setFile4Preview}
                    file5Preview={file5Preview}
                    setFile5Preview={setFile5Preview}
                    noOfFilesAdded={noOfFilesAdded}
                    setNoOfFilesAdded={setNoOfFilesAdded}
                />
                <Color
                    selectedColor={selectedColor}
                    setSelectedColor={setSelectedColor}
                />
            </div>
            <Right
                file1={file1}
                file2={file2}
                file3={file3}
                file4={file4}
                file5={file5}
                selectedColor={selectedColor}
            />
        </div>
    </main>
}