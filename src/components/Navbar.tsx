import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div className="flex gap-6 bg-amber-400 w-fit px-6 py-2 rounded-2xl items-center">
            <Link to="/"><img src="/logo.png" className="object-cover size-12" /></Link>
            <a href="https://github.com/AnshKumar200/Grind-Grid" target="_blank" rel="noopener noreferrer">How It Works</a>
            <a href="https://0xansh.vercel.app/">Contact Me :)</a>
        </div >
    )
}
