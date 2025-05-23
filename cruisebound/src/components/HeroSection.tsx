import NavBar from "./NavBar";

export default function HeroSection() {
    return (
        <div className="relative w-full h-screen overflow-hidden">
            <NavBar />
            {/* Background sea image */}
            <div className="absolute inset-0">
                <img 
                    src="/img/Sea.webp"
                    alt="Sea" 
                    className="w-full h-full object-cover"
                    style={{objectPosition: '47.5% center'}}
                />
            </div>
            
            {/* Boat image overlay */}
            <div className="absolute inset-0 z-10">
                <img 
                    src="/img/Boat.webp"
                    alt="Boat" 
                    className="w-full h-full object-cover "
                    style={{objectPosition: '47.5% center'}}
                />
            </div>
            
            {/* Text content */}
            <div className="absolute top-1/3 left-1/2 -translate-y-1/3 -translate-x-1/2 lg:top-1/4 lg:left-1/2 lg:-translate-y-1/4 lg:-translate-x-1/2 w-fit h-fit inset-0 z-5 flex flex-col items-center px-4">
                <p className="text-white font-medium mb-4 text-lg lg:text-xl xl:text-2xl tracking-wider">
                    BEST CRUISES OVER THE WORLD
                </p>
                <h1 className="text-white font-extrabold leading-none text-8xl lg:text-9xl xl:text-[20vw] tracking-tight">
                    SEALING
                </h1>
            </div>
            
            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 z-15 bg-gradient-to-b from-black/30 via-transparent to-black/40"></div>
        </div>
    );
}