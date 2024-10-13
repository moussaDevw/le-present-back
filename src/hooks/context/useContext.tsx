import {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";

type ExistingPhotoUrlType = {
  id: string;
  key: string;
  url: string;
};
interface RootedContextTypes {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  isDrawerOpen: boolean;
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>;
  photos: File[];
  setPhotos: Dispatch<SetStateAction<File[]>>;
  existingPhotoUrl: ExistingPhotoUrlType[];
  setExistingPhotoUrl: Dispatch<SetStateAction<ExistingPhotoUrlType[]>>;
}
const RootedContext = createContext<RootedContextTypes | undefined>(undefined);

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [openModal, setOpenModal] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [photos, setPhotos] = useState<File[]>([]);
  const [existingPhotoUrl, setExistingPhotoUrl] = useState<
    ExistingPhotoUrlType[]
  >([]);

  return (
    <RootedContext.Provider
      value={{
        openModal,
        setOpenModal,
        isDrawerOpen,
        setIsDrawerOpen,
        photos,
        setPhotos,
        existingPhotoUrl,
        setExistingPhotoUrl,
      }}
    >
      {children}
    </RootedContext.Provider>
  );
};

const useRootedContext = () => {
  const context = useContext(RootedContext);
  if (!context) {
    throw new Error(
      "useRootedContext must be used within a AppContextProvider",
    );
  }
  return context;
};

export { RootedContext, AppContextProvider, useRootedContext };
