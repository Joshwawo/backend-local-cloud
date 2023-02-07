import saveAs from "file-saver";
import { AiFillFile } from "react-icons/ai";

type AnotherFIleProps = {
  cleanRoute: string;
  file: string;
};

const AnotherFIle = ({ cleanRoute, file }: AnotherFIleProps) => {
  // const mediaRegex = /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/;
  const url3000 = import.meta.env.VITE_BACKEND_URI;
  const mediaRegex =
    /^((?!\.(jpg|jpeg|png|gif|bmp|mp3|ogg|flac|acc|mp4|mkv|flv|mov|avi|jfif|webp|wav)$).)*$/;
  console.log(mediaRegex.test(cleanRoute));
  return (
    <div className="">
      {mediaRegex.test(cleanRoute) ? (
        <p
          onClick={() => saveAs(`${url3000}/download/${cleanRoute}`, file)}
          className="flex rounded hover:cursor-pointer"
        >
          <AiFillFile className="text-yellow-500 mt-1" />
          <span className="text-green-500">{file}</span>
        </p>
      ) : (
        null
      )}
    </div>
  );
};

export default AnotherFIle;
