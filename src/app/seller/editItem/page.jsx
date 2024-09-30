"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Error from "next/error";

import Left from "@/components/sellerEditItem/left";
import Right from "@/components/sellerEditItem/right";
import Color from "@/components/sellerEditItem/color";

export default function EditItem() {
    const searchParams = useSearchParams();
    const [isItemProfileExists, setIsItemProfileExists] = useState(false);
    const [itemDetails, setItemDetails] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [itemFileNames, setItemFileNames] = useState([]);
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

    const downloadFileToVariable = async (url) => {
        const response = await fetch(url);       // Fetch the file from the URL
        const blob = await response.blob();      // Convert the response to a Blob
        return blob;                             // Return the Blob
    }

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

    const downloadFileUsingProxy = async (url) => {
        const response = await fetch(url);             // Fetch file via proxy
        const blob = await response.blob();
        const file = new File([blob], `f.${blob.type.split("/")[1]}`, { type: blob.type });
        return file;
    }

    const fetchItemImagesAndVideos = async () => {
        try {
            for (let i = 0; i < itemFileNames.length; i++) {
                const x = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/seller/fetchImage`, {
                    method: "GET",
                    headers: {
                        "imageKey": itemFileNames[i]
                    }
                });
                const y = await x.json();
                if (y.success) {
                    const f = await downloadFileUsingProxy(y.imgUrl);
                    console.log(f);
                    console.log(URL.createObjectURL(f));
                    switch (i) {
                        case 0:
                            setFile1(f);
                            setFile1Preview(URL.createObjectURL(f));
                            setNoOfFilesAdded(1);
                            break;
                        case 1:
                            setFile2(f);
                            setFile2Preview(URL.createObjectURL(f));
                            setNoOfFilesAdded(2);
                            break;
                        case 2:
                            setFile3(f);
                            setFile3Preview(URL.createObjectURL(f));
                            setNoOfFilesAdded(3);
                            break;
                        case 3:
                            setFile4(f);
                            setFile4Preview(URL.createObjectURL(f));
                            setNoOfFilesAdded(4);
                            break;
                        case 4:
                            setFile5(f);
                            setFile5Preview(URL.createObjectURL(f));
                            setNoOfFilesAdded(5);
                            break;
                    }
                }
            }
            setIsLoaded(true);
        }
        catch (err) {
            console.log(err);
        }
    };

    const fetchItemImagesAndVideosFileNames = async () => {
        try {
            const x = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/seller/getItemImagesAndVideos`, {
                method: "GET",
                headers: {
                    itemid: searchParams.get("itemId")
                }
            });
            const y = await x.json();
            if (y.success) {
                setItemFileNames(y.itemFiles);
            }
        }
        catch (err) {
            console.log(err);
        }
    };

    const fetchItemDetails = async () => {
        try {
            const x = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/seller/getSellerItems`, {
                method: "GET",
                headers: {
                    sellerid: searchParams.get("sellerId")
                }
            });
            const y = await x.json();
            if (y.success) {
                setItemDetails(y.items.find(x => x.itemId === searchParams.get("itemId")));
                setIsItemProfileExists(true);
            }
            else {
                setIsItemProfileExists(false);
                setIsLoaded(true);
            }
        }
        catch (err) {
            console.log(err);
            setIsLoaded(true);
        }
    };

    useEffect(() => {
        //fetch user details
        if (searchParams.get("sellerId") && searchParams.get("itemId")) {
            fetchItemDetails();
            fetchItemImagesAndVideosFileNames();
        }
        else
            setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (itemFileNames.length > 0)
            fetchItemImagesAndVideos();
    }, [itemFileNames]);

    useEffect(() => {
        console.log(`${noOfFilesAdded} files added!`);
    }, [noOfFilesAdded]);

    if (!isLoaded)
        return null;

    return <main className="relative px-[10%] lg:px-[5%] mb-[90px]">
        {
            searchParams.get("sellerId") && searchParams.get("itemId") && isItemProfileExists && isLoaded && <>
                <p className="mt-[35px] lg:mt-[60px] mb-[45px] text-2xl lg:text-4xl font-medium">Product information</p>
                <div className="flex flex-col lg:flex-row flex-nowrap justify-between">
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
                            itemDetails={itemDetails}
                            selectedColor={selectedColor}
                            setSelectedColor={setSelectedColor}
                        />
                    </div>
                    <Right
                        itemId={searchParams.get("itemId")}
                        itemDetails={itemDetails}
                        file1={file1}
                        file2={file2}
                        file3={file3}
                        file4={file4}
                        file5={file5}
                        selectedColor={selectedColor}
                    />
                </div>
            </>
        }
        {
            !isItemProfileExists && isLoaded && (
                <Error statusCode={404} />
            )
        }
    </main>
}