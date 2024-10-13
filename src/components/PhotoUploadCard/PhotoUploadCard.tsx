"use client";

import { Upload } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { UseFormRegisterReturn } from "react-hook-form";
import { useUploadPhoto } from "@/hooks/image/useUploadPhoto";
import { CarrouselHorizontal } from "../CarrouselHorizontal/CarrouselHorizontal";
import { useRootedContext } from "@/hooks/context/useContext";

interface PhotoUploadCardProps {
  multiple: boolean;
  register: UseFormRegisterReturn;
  setValue: (key: any, value: FileList) => void;
}

export function PhotoUploadCardComponent({
  multiple,
  register,
  setValue,
}: PhotoUploadCardProps) {
  const {
    fileInputElement,
    customRegister,
    handleFileChange,
    handleDragOver,
    handleDrop,
    photos,
  } = useUploadPhoto(multiple, register);
  const { existingPhotoUrl } = useRootedContext();

  const totalPhotos = multiple
    ? existingPhotoUrl.length + photos.length
    : photos.length;
  const photoLabel = totalPhotos > 1 ? "photos" : "photo";
  console.log(existingPhotoUrl);
  return (
    <Card className="mx-auto w-full max-w-md shadow-lg">
      <CardContent className="p-6">
        <div
          className="border-gray-300 cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition-colors duration-300 hover:border-primary"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <label
            htmlFor="upload"
            className="text-gray-600 mt-2 flex cursor-pointer flex-col items-center text-sm transition-colors duration-300 hover:text-primary"
          >
            <Upload className="text-gray-400 mb-2 h-8 w-8" />
            {multiple
              ? "Cliquez ou glissez-déposez vos images ici *"
              : "Cliquez ou glissez-déposez votre image ici *"}
          </label>
        </div>

        <input
          {...register}
          type="file"
          id="upload"
          multiple={multiple}
          accept="image/*"
          className="opacity-0"
          aria-label="Sélectionner des photos"
          onChange={handleFileChange}
          ref={customRegister}
        />
      </CardContent>

      {(multiple
        ? totalPhotos > 0
        : photos.length > 0 || existingPhotoUrl.length > 0) && (
        <CarrouselHorizontal
          images={
            multiple
              ? [
                  ...existingPhotoUrl.map((photo) => photo?.url),
                  ...photos.map((photo) => URL.createObjectURL(photo)),
                ]
              : photos.length > 0
                ? photos.map((photo) => URL.createObjectURL(photo))
                : existingPhotoUrl.map((photo) => photo.url)
          }
          fileInputElement={fileInputElement}
          setValue={setValue}
          multiple={multiple}
        />
      )}

      <CardFooter className="items-center justify-between">
        <p className="text-gray-500 text-sm">
          {totalPhotos} {photoLabel}{" "}
          {totalPhotos > 1 ? "téléchargées" : "téléchargée"}
        </p>
      </CardFooter>
    </Card>
  );
}
