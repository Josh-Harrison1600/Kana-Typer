const NavBar = () => {
    return(
        <nav className="bg-[#131a15] py-3 px-6 shadow-lg border-b border-white mb-6 w-full">
            <div className="max-w-7xl mx-auto flex items-center justify-between w-full">
                {/* Title */}
                <h1 className="text-white font-bold text-5xl tracking-wide">KANA
                    <span className="text-red-500"> TYPER</span>
                </h1>

            </div>

        </nav>
    )
}

export default NavBar;