import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { RootedContext, useRootedContext } from "@/hooks/context/useContext";
import { useContext } from "react";

interface ModalProps {
  children: React.ReactNode;
  title?: string;
  cancelButton?: string;
  confirmButton?: string;
}

export const ModalL = ({
  children,
  title,
  cancelButton,
  confirmButton,
}: ModalProps) => {
  const { openModal, setOpenModal } = useRootedContext();

  return (
    <AlertDialog open={openModal}>
      <AlertDialogTrigger asChild>j</AlertDialogTrigger>
      <AlertDialogContent className="z-50 m-auto bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{children}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {cancelButton && (
            <AlertDialogCancel onClick={() => setOpenModal(false)}>
              {cancelButton}
            </AlertDialogCancel>
          )}
          {confirmButton && (
            <AlertDialogAction>{confirmButton}</AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
