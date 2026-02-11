import { Link } from "react-router-dom";
import CubeAni from "../components/CubeAni";

export default function HomePage() {
    return (
        <div className="flex-1 flex flex-col justify-end mb-10">
            <CubeAni dir='bt' />
            <div className="w-full flex flex-col gap-5">
                <div className="text-7xl">Grind Grid</div>
                <div className="flex flex-col gap-2">
                    <div className="text-4xl">Your Coding Activity,</div>
                    <div className="text-4xl">Beautifully Visualized</div>
                </div>
                <Link to='activity' className="p-3 bg-amber-500 w-fit rounded-xl">Get your heatmap!</Link>
            </div>
        </div>
    )
}
