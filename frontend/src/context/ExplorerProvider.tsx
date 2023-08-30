import { createContext, useContext, ReactNode, useState } from "react";
import axios from 'axios'
import useSWR from 'swr'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DirTypes } from "../types/DirTypes";

interface ExplorerContextProps {
  createFolder: (path: string, folderName: string) => Promise<void>;
  handleModalCarpeta: () => void;
  folderName: string;
  setFolderName: React.Dispatch<React.SetStateAction<string>>
  setModalCarpeta: React.Dispatch<React.SetStateAction<boolean>>
  modalCarpeta: boolean
  handleSubmitFolder: (path: string,fName:string ) => void;
  useDataFetcher: (path: string) => void;
  dataFolders?: DirTypes
  setDataFolders: React.Dispatch<React.SetStateAction<DirTypes | undefined>>
  fetcher: (url: string) => Promise<DirTypes>
}

const ExplorerContext = createContext<ExplorerContextProps | null>(null);

const ExplorerProvider = ({ children }: { children: ReactNode }) => {
  const [modalCarpeta, setModalCarpeta] = useState<boolean>(false)
  const [folderName, setFolderName] = useState<string>('')
  const [dataFolders, setDataFolders] = useState<DirTypes>()

  const url3000 = import.meta.env.VITE_BACKEND_URI;

  const createFolder = async (path: string, folderName: string) => {
    let cleanPath = path.replace(/\\/g, "--")

    try {
      const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/dir/${cleanPath}`, {name:folderName})
      console.log("data",data)
      const newData = [...dataFolders?.content.directories as any, data.folderName]
      setDataFolders({...dataFolders, content:{...dataFolders?.content, directories: newData}} as any)
      console.log("Nuevo data",newData)
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
  const fetcher = async (url: string): Promise<DirTypes> => {
    console.log("URL del fetcher", url)
    const response = await axios.get<DirTypes>(url);
    
    // if (response.data) {
      setDataFolders(response.data);
      return response.data;
    // } else {
    //   throw new Error('Data not available');
    // }
  };
  
  function useDataFetcher(path: string) {
    const url = `${url3000}/content/${path}`;
    const { data, error } = useSWR(url, fetcher);
     
    return {
      data,
      error
    };
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
        handleSubmitFolder,
        useDataFetcher,
        dataFolders,
        setDataFolders,
        fetcher,
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
