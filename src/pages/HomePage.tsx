import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <div className="flex flex-col items-center">
            <div>Grind Grid</div>
            <div>Your Coding Activity,</div>
            <div>Beautifully Visualized</div>
            <Link to='activity'>Get your heatmap!</Link>
        </div>
    )
}
