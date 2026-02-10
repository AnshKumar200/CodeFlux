import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
    return (
        <div className="text-2xl min-h-screen flex flex-col p-4 font-outfit">
            <div className="flex justify-center">
                <Navbar />
            </div>
            <div className="flex-1 flex flex-col">
                <Outlet />
            </div>
            <div className="">
                <Footer />
            </div>
        </div>
    )
}

export default App;
