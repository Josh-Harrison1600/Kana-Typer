import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

const About = () => {
    const navigate = useNavigate();

    return(
        <div className="min-h-screen bg-[#090909] flex justify-center items-center px-6">
            <motion.div
                className="text-white max-w-2xl text-2xl text-center leading-relaxed font-bold"
                initial={{ opacity: 0, y: 50}}
                animate={{ opacity: 1, y: 0}}// <- fade in + move up
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <p>
                    <span className="text-red-500">Kana Typer</span> is a tool for people looking to learn Japanese. It helps teach users the two phonetic Japanese writing systems: <span className="text-red-500">Hiragana and Katakana.</span>
                </p>
                    <p className="mt-4">
                        Simply select any number of Hiragana/Katakana you wish to learn and click <span className="font-bold">'Start'</span>. From here, you will be quizzed and have to <span className="text-red-500">correctly spell out the symbol in English.</span>
                    </p>
                <p className="mt-4">
                    Doing this consistently over a few days or weeks will help you memorize Japanese phonetics and get started learning the language!
                </p>
                    <p className="mt-4 mb-6">
                        <Tooltip title="Do your best!" arrow
                            slotProps={{ 
                                popper: { 
                                    modifiers: [{ name: "offset", options: { offset: [-6, 0] } }] 
                                } 
                            }}>
                            <span className="cursor-pointer">頑張れ！</span>
                        </Tooltip>    
                    </p>
                    <button className=" mt-4 px-8 py-2 text-lg font-bold rounded-lg transition mt-4 border-red-500 border-2 text-red-500 hover:bg-red-500 hover:text-white mr-6"
                        onClick={() =>navigate("/")}    
                    >
                        Main Menu
                  </button>           
            </motion.div>
        </div>
    )
}

export default About;