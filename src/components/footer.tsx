import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {

    return(
        <footer className='bottom-0 w-full bg-[#131a15] py-4 shadow-lg border-t border-gray-600 mt-4'>
                  <div className="flex justify-center">
                    <a href="https://github.com/Josh-Harrison1600/Kana-Typer/" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faGithub} className="text-white text-4xl hover:text-gray-300 transition duration-300" />
                    </a>
                </div>
        </footer>
    )
}

export default Footer;