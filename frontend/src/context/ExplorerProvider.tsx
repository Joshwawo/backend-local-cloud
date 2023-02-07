import { createContext, useContext, ReactNode, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ExplorerContextProps {
  createFolder: (path: string, folderName: string) => Promise<void>;
  handleModalCarpeta: () => void;
  folderName: string;
  setFolderName: React.Dispatch<React.SetStateAction<string>>
  setModalCarpeta: React.Dispatch<React.SetStateAction<boolean>>
  modalCarpeta: boolean
  handleSubmitFolder: (path: string,fName:string ) => void;
  
}

const ExplorerContext = createContext<ExplorerContextProps | null>(null);

const ExplorerProvider = ({ children }: { children: ReactNode }) => {
  const [modalCarpeta, setModalCarpeta] = useState<boolean>(false)
  const [folderName, setFolderName] = useState<string>('')

  const createFolder = async (path: string, folderName: string) => {
    let cleanPath = path.replace(/\\/g, "--")

    try {
      const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/dir/${cleanPath}`, {name:folderName})
      console.log("data",data)
      toast.success(data.message)
      setModalCarpeta(false)
    } catch (error:any) {
      console.log(error.response)
      toast.error(error.response.data.message)
    }
  };

  const handleModalCarpeta = () =>{
    setModalCarpeta(!modalCarpeta)
    setFolderName('')
  }

  const handleSubmitFolder = (path:string, fName:string) => {
    let cleanPath = path.split("content/")[1].replace(/\\|undefined/g, "--");    
    createFolder(cleanPath, fName)
  }

  return (
    <ExplorerContext.Provider
      value={{
        createFolder,
        handleModalCarpeta,
        folderName,
        setFolderName,
        setModalCarpeta,
        modalCarpeta,
        handleSubmitFolder
      }}
    >
      {children}
    </ExplorerContext.Provider>
  );
};

export { ExplorerProvider };

const useExplorer = () => {
  const context = useContext(ExplorerContext);
  if (!context) {
    throw new Error("useExplorer must be used within a ExplorerProvider");
  }
  return context;
};

export default useExplorer;
