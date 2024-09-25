"use client";

import { useState, useRef } from "react";
import { X, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UseFormRegisterReturn } from "react-hook-form";

interface PhotoUploadCardProps {
  multiple: boolean;
  register: UseFormRegisterReturn<string>;
}

export function PhotoUploadCardComponent({
  multiple,
  register,
}: PhotoUploadCardProps) {
  const [photos, setPhotos] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setPhotos((prevPhotos) => [
        ...prevPhotos,
        ...Array.from(event.target.files as FileList),
      ]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files) {
      setPhotos((prevPhotos) => [
        ...prevPhotos,
        ...Array.from(event.dataTransfer.files),
      ]);
    }
  };

  const handleDelete = (index: number) => {
    setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>Téléchargement de photos</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className="border-gray-300 cursor-pointer rounded-lg border-2 border-dashed p-4 text-center"
          onClick={openFileDialog}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <Upload className="text-gray-400 mx-auto h-12 w-12" />
          <p className="text-gray-600 mt-1 text-sm">
            Cliquez ou glissez-déposez des photos ici
          </p>
        </div>
        <input
          type="file"
          {...register}
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple={multiple}
          accept="image/*"
          className="hidden"
          aria-label="Sélectionner des photos"
        />
        {photos.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-4">
            {photos.map((photo, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(photo)}
                  alt={`Photo ${index + 1}`}
                  className="h-24 w-full rounded object-cover"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute right-0 top-0 h-6 w-6"
                  onClick={() => handleDelete(index)}
                  aria-label={`Supprimer la photo ${index + 1}`}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <p className="text-gray-500 text-sm">
          {photos.length} photo{photos.length !== 1 ? "s" : ""} téléchargée
          {photos.length !== 1 ? "s" : ""}
        </p>
      </CardFooter>
    </Card>
  );
}
