import { useState, createContext, Dispatch, SetStateAction } from "react";

interface RootedContextTypes {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}
const RootedContext = createContext<RootedContextTypes>({
  openModal: false,
  setOpenModal: () => {},
});

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <RootedContext.Provider value={{ openModal, setOpenModal }}>
      {children}
    </RootedContext.Provider>
  );
};

export { RootedContext, AppContextProvider };
