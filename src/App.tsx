import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
    return (
        <div className="text-2xl min-h-screen flex flex-col p-4">
            <div className="flex justify-center">
                <Navbar />
            </div>
            <Outlet />
            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    )
}

export default App;
