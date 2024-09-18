"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Dropzone from "@/components/dropzone";

import UploadImage from "@/../public/upload-image.png";
import AddProductFile from "@/../public/add product image.png";
import Close from "@/../public/close-2.png";

export default function Left() {
    const [noOfFilesAdded, setNoOfFilesAdded] = useState(0);
    const [file1, setFile1] = useState(null);
    const [file1Preview, setFile1Preview] = useState(null);
    const [file2, setFile2] = useState(null);
    const [file2Preview, setFile2Preview] = useState(null);
    const [file3, setFile3] = useState(null);
    const [file3Preview, setFile3Preview] = useState(null);
    const [file4, setFile4] = useState(null);
    const [file4Preview, setFile4Preview] = useState(null);
    const fileRef = useRef(null);

    const handleDelete = (setFileHandler, setFilePreview, i) => {
        // i -> 1 to 4, noOfFilesAdded -> 0 to 4
        if (i === noOfFilesAdded) {
            setFileHandler(null);
            setFilePreview(null);
            setNoOfFilesAdded(curr => curr - 1);
        }
        else if (i < noOfFilesAdded) {
            const x = noOfFilesAdded;
            setNoOfFilesAdded(curr => curr - 1);
            setFileHandler(null);
            setFilePreview(null);
            for (let j = i + 1; j <= x; j++) {
                switch (j) {
                    case 2:
                        setFile1(file2);
                        setFile1Preview(file2Preview);
                        setFile2(null);
                        setFile2Preview(null);
                        break;
                    case 3:
                        setFile2(file3);
                        setFile2Preview(file3Preview);
                        setFile3(null);
                        setFile3Preview(null);
                        break;
                    case 4:
                        setFile4(null);
                        setFile4Preview(null);
                        break;
                }
            }
        }
        else
            return;
    };

    const handleDrop = (acceptedFiles) => {
        // Trigger the file upload
        if (acceptedFiles.length > 0) {
            if (acceptedFiles[0].type.split("/")[0] !== "image" && acceptedFiles[0].type.split("/")[0] !== "video") {
                return;
            }
            else {
                if (noOfFilesAdded < 4) {
                    const file = acceptedFiles[0];;
                    const reader = new FileReader();
                    switch (noOfFilesAdded) {
                        case 0:
                            setFile1(file);
                            if (file.type.split("/")[0] !== "video") {
                                reader.onloadend = () => {
                                    setFile1Preview(reader.result);
                                };
                                reader.readAsDataURL(file);
                            }
                            else {
                                const url = URL.createObjectURL(file);
                                setFile1Preview(url);
                            }
                            break;
                        case 1:
                            setFile2(file);
                            if (file.type.split("/")[0] !== "video") {
                                reader.onloadend = () => {
                                    setFile2Preview(reader.result);
                                };
                                reader.readAsDataURL(file);
                            }
                            else {
                                const url = URL.createObjectURL(file);
                                setFile2Preview(url);
                            }
                            break;
                        case 2:
                            setFile3(file);
                            if (file.type.split("/")[0] !== "video") {
                                reader.onloadend = () => {
                                    setFile3Preview(reader.result);
                                };
                                reader.readAsDataURL(file);
                            }
                            else {
                                const url = URL.createObjectURL(file);
                                setFile3Preview(url);
                            }
                            break;
                        case 3:
                            setFile4(file);
                            if (file.type.split("/")[0] !== "video") {
                                reader.onloadend = () => {
                                    setFile4Preview(reader.result);
                                };
                                reader.readAsDataURL(file);
                            }
                            else {
                                const url = URL.createObjectURL(file);
                                setFile4Preview(url);
                            }
                            break;
                    }
                    setNoOfFilesAdded(curr => curr + 1);
                }
            }
        }
    };

    const addFile = () => {
        fileRef.current.click();
    };

    const handleFileChange = (event) => {
        if (event.target.files.length > 0) {
            if (event.target.files[0].type.split("/")[0] !== "image" && event.target.files[0].type.split("/")[0] !== "video") {
                return;
            }
            else {
                if (noOfFilesAdded < 4) {
                    const file = event.target.files[0];
                    const reader = new FileReader();
                    switch (noOfFilesAdded) {
                        case 0:
                            setFile1(file);
                            if (file.type.split("/")[0] !== "video") {
                                reader.onloadend = () => {
                                    setFile1Preview(reader.result);
                                };
                                reader.readAsDataURL(file);
                            }
                            else {
                                const url = URL.createObjectURL(file);
                                setFile1Preview(url);
                            }
                            break;
                        case 1:
                            setFile2(file);
                            if (file.type.split("/")[0] !== "video") {
                                reader.onloadend = () => {
                                    setFile2Preview(reader.result);
                                };
                                reader.readAsDataURL(file);
                            }
                            else {
                                const url = URL.createObjectURL(file);
                                setFile2Preview(url);
                            }
                            break;
                        case 2:
                            setFile3(file);
                            if (file.type.split("/")[0] !== "video") {
                                reader.onloadend = () => {
                                    setFile3Preview(reader.result);
                                };
                                reader.readAsDataURL(file);
                            }
                            else {
                                const url = URL.createObjectURL(file);
                                setFile3Preview(url);
                            }
                            break;
                        case 3:
                            setFile4(file);
                            if (file.type.split("/")[0] !== "video") {
                                reader.onloadend = () => {
                                    setFile4Preview(reader.result);
                                };
                                reader.readAsDataURL(file);
                            }
                            else {
                                const url = URL.createObjectURL(file);
                                setFile4Preview(url);
                            }
                            break;
                    }
                    setNoOfFilesAdded(curr => curr + 1);
                }
            }
        }
    };

    return <section className="w-full rounded-[26px] border border-[#CACACA] p-[24px]">
        <p className="text-[#393939] lg:text-2xl font-medium ml-2 lg:ml-0">Add Product Images or Videos</p>
        <div className="mt-[20px] lg:mt-[30px] w-full h-[270px] lg:h-[380px] rounded-[24px] border-2 border-[#FFDEC2] bg-[#F4F4F4] flex flex-col flex-nowrap items-center justify-center hover:cursor-pointer">
            <Dropzone onDrop={handleDrop} onClick={addFile}>
                <Image src={UploadImage} alt="upload" className="w-[55px] h-[55px]" />
                <p className="mt-[24px] text-[#FE9135] font-semibold">Click to upload</p>
                <p className="hidden lg:block mt-[10px] text-[#909090] font-medium">or Drag and drop file</p>
                <p className="mt-[10px] text-[#909090] font-medium">(Max 4 files allowed)</p>
            </Dropzone>
            <input type="file" className="hidden" ref={fileRef} onChange={(e) => handleFileChange(e)} />
        </div>
        <div className="mt-[32px] flex flex-row flex-nowrap gap-x-[2.5%] overflow-x-auto">
            {
                noOfFilesAdded === 0 ? (
                    <Image src={AddProductFile} alt="add file" className="flex-[0_0_auto] lg:flex-none w-[30%] lg:w-[22%] h-[81px] lg:h-[142px] hover:cursor-pointer" onClick={addFile} />
                ) : (
                    <>
                        {
                            file1.type.split("/")[0] === "image" && (
                                <div className="flex-[0_0_auto] lg:flex-none relative w-[30%] lg:w-[22%] h-[81px] lg:h-[142px]">
                                    <img src={file1Preview} alt="file" className="w-full h-full rounded-[12px]" />
                                    <Image src={Close} alt="delete" className="absolute w-[20px] h-[20px] top-2 right-2" onClick={() => {
                                        handleDelete(setFile1, setFile1Preview, 1);
                                    }} />
                                </div>)
                        }
                        {
                            file1.type.split("/")[0] === "video" && (
                                <div className="flex-[0_0_auto] lg:flex-none relative w-[30%] lg:w-[22%] h-[81px] lg:h-[142px]">
                                    <video className="w-full h-full rounded-[12px] object-cover" loop={true} autoPlay="autoplay" muted>
                                        <source src={file1Preview} type={file1.type} />
                                    </video>
                                    <Image src={Close} alt="delete" className="absolute w-[20px] h-[20px] top-2 right-2" onClick={() => {
                                        handleDelete(setFile1, setFile1Preview, 1);
                                    }} />
                                </div>)
                        }
                    </>
                )
            }
            {
                noOfFilesAdded === 1 ? (
                    <Image src={AddProductFile} alt="add file" className="flex-[0_0_auto] lg:flex-none w-[30%] lg:w-[22%] h-[81px] lg:h-[142px] hover:cursor-pointer" onClick={addFile} />
                ) : noOfFilesAdded > 1 && (
                    <>
                        {
                            file2.type.split("/")[0] === "image" && (
                                <div className="flex-[0_0_auto] lg:flex-none relative w-[30%] lg:w-[22%] h-[81px] lg:h-[142px]">
                                    <img src={file2Preview} alt="file" className="w-full h-full rounded-[12px]" />
                                    <Image src={Close} alt="delete" className="absolute w-[20px] h-[20px] top-2 right-2" onClick={() => {
                                        handleDelete(setFile2, setFile2Preview, 2);
                                    }} />
                                </div>)
                        }
                        {
                            file2.type.split("/")[0] === "video" && (
                                <div className="flex-[0_0_auto] lg:flex-none relative w-[30%] lg:w-[22%] h-[81px] lg:h-[142px]">
                                    <video className="w-full h-full rounded-[12px] object-cover" loop={true} autoPlay="autoplay" muted>
                                        <source src={file2Preview} type={file2.type} />
                                    </video>
                                    <Image src={Close} alt="delete" className="absolute w-[20px] h-[20px] top-2 right-2" onClick={() => {
                                        handleDelete(setFile2, setFile2Preview, 2);
                                    }} />
                                </div>)
                        }
                    </>
                )
            }
            {
                noOfFilesAdded === 2 ? (
                    <Image src={AddProductFile} alt="add file" className="flex-[0_0_auto] lg:flex-none w-[30%] lg:w-[22%] h-[81px] lg:h-[142px] hover:cursor-pointer" onClick={addFile} />
                ) : noOfFilesAdded > 2 && (
                    <>
                        {
                            file3.type.split("/")[0] === "image" && (
                                <div className="flex-[0_0_auto] lg:flex-none relative w-[30%] lg:w-[22%] h-[81px] lg:h-[142px]">
                                    <img src={file3Preview} alt="file" className="w-full h-full rounded-[12px]" />
                                    <Image src={Close} alt="delete" className="absolute w-[20px] h-[20px] top-2 right-2" onClick={() => {
                                        handleDelete(setFile3, setFile3Preview, 3);
                                    }} />
                                </div>)
                        }
                        {
                            file3.type.split("/")[0] === "video" && (
                                <div className="flex-[0_0_auto] lg:flex-none relative w-[30%] lg:w-[22%] h-[81px] lg:h-[142px]">
                                    <video className="w-full h-full rounded-[12px] object-cover" loop={true} autoPlay="autoplay" muted>
                                        <source src={file3Preview} type={file3.type} />
                                    </video>
                                    <Image src={Close} alt="delete" className="absolute w-[20px] h-[20px] top-2 right-2" onClick={() => {
                                        handleDelete(setFile3, setFile3Preview, 3);
                                    }} />
                                </div>)
                        }
                    </>
                )
            }
            {
                noOfFilesAdded === 3 ? (
                    <Image src={AddProductFile} alt="add file" className="flex-[0_0_auto] lg:flex-none w-[30%] lg:w-[22%] h-[81px] lg:h-[142px] hover:cursor-pointer" onClick={addFile} />
                ) : noOfFilesAdded > 3 && (
                    <>
                        {
                            file4.type.split("/")[0] === "image" && (
                                <div className="flex-[0_0_auto] lg:flex-none relative w-[30%] lg:w-[22%] h-[81px] lg:h-[142px]">
                                    <img src={file4Preview} alt="file" className="w-full h-full rounded-[12px]" />
                                    <Image src={Close} alt="delete" className="absolute w-[20px] h-[20px] top-2 right-2" onClick={() => {
                                        handleDelete(setFile4, setFile4Preview, 4);
                                    }} />
                                </div>)
                        }
                        {
                            file4.type.split("/")[0] === "video" && (
                                <div className="flex-[0_0_auto] lg:flex-none relative w-[30%] lg:w-[22%] h-[81px] lg:h-[142px]">
                                    <video className="w-full h-full rounded-[12px] object-cover" loop={true} autoPlay="autoplay" muted>
                                        <source src={file4Preview} type={file4.type} />
                                    </video>
                                    <Image src={Close} alt="delete" className="absolute w-[20px] h-[20px] top-2 right-2" onClick={() => {
                                        handleDelete(setFile4, setFile4Preview, 4);
                                    }} />
                                </div>)
                        }
                    </>
                )
            }
        </div>
    </section>
}