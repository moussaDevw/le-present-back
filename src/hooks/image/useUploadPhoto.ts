import { useState } from "react";
import { useRootedContext } from "../context/useContext";
import { UseFormRegisterReturn } from "react-hook-form";

export const useUploadPhoto = (
  multiple: boolean,
  register: UseFormRegisterReturn,
) => {
  const [fileInputElement, setFileInputElement] =
    useState<HTMLInputElement | null>(null);
  const { photos, setPhotos } = useRootedContext();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && !multiple) {
      return setPhotos([event.target.files[0]]);
    }

    if (event.target.files) {
      setPhotos((prevPhotos) => [
        ...prevPhotos,
        ...Array.from(event.target.files as FileList),
      ]);
    }
  };

  const customRegister = (element: HTMLInputElement) => {
    register.ref(element);
    setFileInputElement(element);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (event.dataTransfer.files && !multiple) {
      return setPhotos([event.dataTransfer.files[0]]);
    }

    if (event.dataTransfer.files) {
      setPhotos((prevPhotos) => [
        ...prevPhotos,
        ...Array.from(event.dataTransfer.files),
      ]);
    }
  };

  return {
    fileInputElement,
    customRegister,
    handleFileChange,
    handleDragOver,
    handleDrop,
    photos,
  };
};
