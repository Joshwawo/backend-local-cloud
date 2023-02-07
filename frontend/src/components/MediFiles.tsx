
type AnotherFIleProps = {
  cleanRoute: string;
  file: string;
};

const MediFiles = ({ cleanRoute }: AnotherFIleProps) => {
  const url3000 = import.meta.env.VITE_BACKEND_URI;
  // const imageRegex = /\.(jpg|jpeg|png|gif|bmp|jfif|webp)$/;
  // const videoRegex = /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/;
  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".jfif", ".webp"];
  const videoExtensions = [".mp4", ".webm", ".ogg", ".mp3", ".wav", ".flac", ".aac"];
  const fileExtension = cleanRoute.split(".").pop() || "";
  if (imageExtensions.includes(`.${fileExtension}`)) {
    return (
      <div className="">
        <img src={`${url3000}/img/${cleanRoute}`} />
      </div>
    );
  } else if (videoExtensions.includes(`.${fileExtension}`)) {
    return (
      <div className="">
        <video src={`${url3000}/img/${cleanRoute}`} controls />
      </div>
    );
  } else {
    return null;
  }
};

export default MediFiles;
