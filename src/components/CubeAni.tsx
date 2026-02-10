export default function CubeAni() {
    return (
        <div className="absolute top-0 right-50">
            <div className="absolute inset-0 flex justify-center pointer-events-none">
                <div className="w-0 border-r-2 border-dashed h-screen animate-trail" />
            </div>

            <div className="size-7 border-2 animate-block relative z-10 bg-white" />
        </div>
    );
}

