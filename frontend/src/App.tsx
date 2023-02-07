import { Routes, Route, Navigate } from "react-router-dom";
import {ToastContainer} from "react-toastify"
import { ExplorerProvider } from "./context/ExplorerProvider";
import Home from "./pages/Home";
import ModalCreateFolder from "./components/ModalCreateFolder";

const App = () => {
  return (
    <div className="App">
      <ExplorerProvider>
        <Routes>
          <Route path="/content/:path?" element={<Home/>}  />
          <Route path="/" element={<Navigate to={"/content/"} replace />}></Route>
          <Route path="*" element={<p className="text-center text-2xl text-red-600">404 not found</p>} />
        </Routes>
        <ModalCreateFolder/>
        <ToastContainer/>
      </ExplorerProvider>
    </div>
  );
};

export default App;
