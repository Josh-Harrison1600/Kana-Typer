import { useNavigate } from "react-router-dom";


const NavBar = () => {
    const navigate = useNavigate();

    return(
        <nav className="bg-[#131a15] py-3 px-6 shadow-lg border-b border-white w-full mb-6">
            <div className="max-w-7xl mx-auto flex items-center justify-between w-full">
                {/* Title */}
                <h1 className="text-white font-bold text-5xl tracking-wide cursor-pointer" onClick={() => navigate('/')}>KANA
                    <span className="text-red-500"> TYPER</span>
                </h1>

                {/* Right hand side content */}
                <h2 className="text-white font-bold text-3xl hover:text-red-500 transition duration-200 cursor-pointer" onClick={() => navigate('/about')}>How it Works</h2>
            </div>

        </nav>
    )
}

export default NavBar;