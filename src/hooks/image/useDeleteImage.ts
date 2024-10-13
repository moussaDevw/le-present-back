import { useRootedContext } from "../context/useContext";

export const useDeleteImage = (
  setValue: any,
  fileInputElement: HTMLInputElement | null,
) => {
  const { setPhotos } = useRootedContext();

  const handleDelete = (index: number) => {
    setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));

    // Mise à jour de l'input file
    if (fileInputElement && fileInputElement.files) {
      const { files } = fileInputElement;

      if (files) {
        const dt = new DataTransfer();

        for (let i = 0; i < files.length; i++) {
          if (i !== index) {
            dt.items.add(files[i]);
          }
        }

        fileInputElement.files = dt.files;
        setValue("image", dt.files);
      }
    }
  };

  return {
    handleDelete,
  };
};
