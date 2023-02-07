import {useState} from "react"
import { Link, useParams } from "react-router-dom";
import useSwr from "swr";
import axios from "axios";
import { saveAs } from "file-saver";
import "react-toastify/dist/ReactToastify.css";
import {
  AiFillFolder,
  AiOutlineLoading3Quarters,
  AiFillFolderAdd,
  AiFillFileImage,
} from "react-icons/ai";
import { BiCommentError } from "react-icons/bi";
import { DirTypes } from "../types/DirTypes";
import useExplorer from "../context/ExplorerProvider";
import { toast } from "react-toastify";
import { BsFileEarmarkArrowDown } from "react-icons/bs";
import AnotherFIle from "../components/AnotherFIle";
import MediFiles from "../components/MediFiles";

// const url = location.pathname.replace('/content', 'http://localhost:3001')
//TODO: Refactor this component
const Home = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const { path } = useParams();
  const {handleModalCarpeta } = useExplorer();

  const url3000 = import.meta.env.VITE_BACKEND_URI;
  //Fetcher function
  const fetcherFolder = (url: string) =>
    axios.get<DirTypes>(url).then((res) => res.data);
  ///Swr hook
  const { data:dataFolders, error } = useSwr(`${url3000}/content/${path}`, fetcherFolder);
  //Error handling

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files);
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    let cleanRoute = `${dataFolders?.path}`;
    cleanRoute = cleanRoute.replace(/[\\\/]/g, "--").replace(/----/g, "");
    event.preventDefault();
    if (!files) {
      return toast.error("No files selected");
    }

    const formData = new FormData();
    //Esta forma es poco legible pero funciona
    // for (let i = 0; i < files.length; i++) {
    //   formData.append('file', files[i]);
    // }
    for (const file of files) {
      formData.append("file", file);
    }

    try {
      const response = await axios.post(`${url3000}/upload/${cleanRoute}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      toast.success("Files uploaded successfully");
    } catch (err:any) {
      console.error(err);
      toast.error(err.response.data.message);
    }
  };

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <BiCommentError className="text-5xl text-red-500" />
        <p className="text-semiBlanco px-2 text-2xl">
          Error: {error.message} <br />
        </p>
      </div>
    );
  }
  if (!dataFolders) {
    return (
      <div className="flex justify-center items-center h-screen">
        <AiOutlineLoading3Quarters className="animate-spin text-5xl text-green-500" />
      </div>
    );
  }
  

  return (
    <div className=" container mx-auto text-red-600 mt-10 px-2 mb-5 bg-slate-50/1">
      <Link to={`/content/`}>
        <h1 className="text-2xl text-semiBlanco mb-5">Home</h1>
      </Link>
      <p>Path: {dataFolders?.path}</p>
     <div className="flex  items-end gap-x-10">
       <button
         onClick={() => handleModalCarpeta()}
         className="mt-10  text-black py-2 px-2 rounded-lg font-semibold bg-black/20 hover:bg-black/40"
       >
         <AiFillFolderAdd className="text-yellow-400 rounded text-2xl" />
       </button>
       <form className="flex items-center space-x-6" onSubmit={handleSubmit}>
          <label className="block">
          <input type="file" name="file" multiple 
            onChange={handleFileChange}
            className="block w-full text-sm text-slate-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-yellow-50 file:text-yellow-700
            hover:file:bg-yellow-100
          "/>
          </label>
          <button className="text-yellow-500 rounded-lg font-semibold">Upload</button>
        </form>
     </div>
      <div>
        <div className="space-y-2 mt-10">
          {dataFolders?.content?.directories?.map((dir, index) => {
            let cleanRoute = `${dataFolders.path}--${dir}`;
            cleanRoute = cleanRoute.replace(/[\\\/]/g, "--").replace(/----/g, "");
            return (
              <div className="hover:bg-gray-50/20 rounded" key={index}>
                <Link
                  className="text-green-500 flex"
                  to={`/content/${cleanRoute}`}
                >
                  <AiFillFolder className="mt-1 text-yellow-500" /> {dir}
                </Link>
              </div>
            );
          })}
        </div>
        <div className="mt-10 space-y-2 ">
          {dataFolders.content.files.length <= 0 ? (
            <p className="">This folder is empty</p>
          ) : (
            dataFolders.content.files.map((file, index) => {
              let cleanRoute = `${dataFolders.path}--${file}`;
              cleanRoute = cleanRoute.replace(/[\\\/]/g, "--")
              return (
                <div className="hover:bg-gray-50/20 rounded hover:cursor-pointer" key={index} 
                >
                  
                  <AnotherFIle cleanRoute={cleanRoute} file={file}/>
                </div>
              );
            }
            )
          )}
        </div>
        <div className="mt-10 space-y-2 2xl:columns-5 ">
          {dataFolders.content.files.length <= 0 ? (
            <p className="">This folder no have media files</p>
          ) : (
            dataFolders.content.files.map((file, index) => {
              let cleanRoute = `${dataFolders.path}--${file}`;
              cleanRoute = cleanRoute.replace(/[\\\/]/g, "--")
              return (
                <div className="hover:bg-gray-50/20 rounded hover:cursor-pointer" key={index} 
                >
                  
                  <MediFiles cleanRoute={cleanRoute} file={file}/>
                </div>
              );
            }
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
