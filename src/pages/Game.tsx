import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import RefreshIcon from "@mui/icons-material/Refresh";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Tooltip from '@mui/material/Tooltip';
import { romanjiMap } from '../components/kana';
import correctAudio from '../assets/audio/correct.mp3';
import incorrectAudio from '../assets/audio/incorrect.mp3';
import HeadsetIcon from '@mui/icons-material/Headset';
import HeadsetOffIcon from '@mui/icons-material/HeadsetOff';

const Game = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { selectedChars } = location.state || { selectedChars: [] };
    const correct = new Audio(correctAudio);
    const incorrect = new Audio(incorrectAudio);


    //shuffle characters randomly
    const shuffleArray = (array: string[]) => [...array].sort(() => Math.random() - 0.5);
    const [shuffledChars, setShuffledChars] = useState<string[]>(shuffleArray(selectedChars));
    const [, setRetryQueue] = useState<string[]>([]);


    const [currentIndex, setCurrentIndex] = useState(0);
    const [userInput, setUserInput] = useState('');
    const [message, setMessage] = useState('');
    const [correctCount, setCorrectCount] = useState(1);
    const [incorrectCount, setIncorrectCount] = useState(0);
    const [showCorrect, setShowCorrect] = useState(false);
    const [pendingRetry, setPendingRetry] = useState<string | null>(null); 
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const [isMuted, setIsMuted] = useState<boolean>(() => {
        return localStorage.getItem("isMuted") === "true";
    });

    const remainingSymbols = shuffledChars.length - currentIndex;

    //Functions for the mute option
    const toggleMute = () => {
        setIsMuted((prev) => {
            const newMutedState = !prev;
            localStorage.setItem("isMuted", JSON.stringify(newMutedState));
            return newMutedState;
        });
    };
    const playCorrectSound = () => {
        if(!isMuted) correct.play();
    };
    const playinCorrectSound = () => {
        if(!isMuted) incorrect.play();
    };

    //restart game if selectedChars changes
    useEffect(() => {
        setShuffledChars(shuffleArray(selectedChars));
        setRetryQueue([]);
        setCurrentIndex(0);
        setQuizCompleted(false);
    }, [selectedChars]);

    const checkAnswer = () => {
        if(quizCompleted || isProcessing) return;

        setIsProcessing(true);
        const currentKana = shuffledChars[currentIndex];
        const correctAnswer = romanjiMap[currentKana];

        if (userInput.trim().toLowerCase() === correctAnswer) {
            setMessage('Correct!');
            setCorrectCount(prevCount => prevCount + 1);
            setShowCorrect(false);
            playCorrectSound();
            setTimeout(() => {
                setUserInput('');
                setMessage('');
                moveToNext();
                setIsProcessing(false);
            }, 500);
        }else{
            setMessage(`Incorrect. \nCorrect Answer: ${correctAnswer}`);
            playinCorrectSound();
            setIncorrectCount(prev => prev + 1);
            setShowCorrect(true);
            setPendingRetry(currentKana);
            setIsProcessing(false);
        }
    };


    //move to next question when user guesses wrong
    const moveToNext = () => {
        setUserInput('');
        setMessage('');
        setShowCorrect(false);
        if(pendingRetry){
            //add incorrect answer into random position
            const newShuffledlist = [...shuffledChars];
            const insertIndex = Math.floor(Math.random() * (shuffledChars.length - currentIndex - 1))
            newShuffledlist.splice(insertIndex, 0, pendingRetry);
            setShuffledChars(newShuffledlist);
            setPendingRetry(null);
        }

        if(currentIndex + 1 < shuffledChars.length){
            setCurrentIndex(currentIndex + 1)
        }else{
            //all questions are answered
            const total = correctCount + incorrectCount;
            const accuracy = total === 0 ? 0 : (correctCount / total) * 100;
            setMessage(`Finished Quiz with ${accuracy.toFixed(2)}% Accuracy!`)
            setQuizCompleted(true);
        }
    };

    const restartGame = () => {
        setShuffledChars(shuffleArray(selectedChars));
        setRetryQueue([]);
        setCurrentIndex(0);
        setCorrectCount(0);
        setIncorrectCount(0);
        setMessage('');
        setUserInput('');
        setShowCorrect(false);
        setPendingRetry(null);
        setQuizCompleted(false);
    };

    return (
        <div className='min-h-screen flex flex-col items-center justify-center bg-[#090909] text-white p-6'>
            {/* <NavBar /> */}
            {!quizCompleted ? (
                <>
                    {/* Show kana/question when quiz is active */}
                    <h1 className=' text-3xl font-bold '>Remaining: {remainingSymbols}</h1>
                    <h2 className='text-4xl font-bold mb-4 mt-12'>{shuffledChars[currentIndex]}</h2>
                    
                    {/* Input Field with Arrow */}
                    <TextField
                        variant='outlined'
                        placeholder='答え'
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !isProcessing) {
                                e.preventDefault();
                                showCorrect ? moveToNext() : checkAnswer();
                            }
                        }}
                        className='mb-4 bg-neutral-900'
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                border: "2px solid #4B5563",
                                borderRadius: "8px",
                                "&.Mui-focused": {
                                    boxShadow: "none !important", 
                                    outline: "none !important", 
                                },
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#4B5563 !important", 
                            },
                            "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                                boxShadow: "none !important",
                                outline: "none !important",
                            },
                            "& .MuiInputBase-input": {
                                textAlign: "center",
                                fontSize: "1.5rem",
                                color: "white",
                                paddingLeft: "3.5rem",
                            },
                            "& .MuiInputBase-input::placeholder": {
                                fontSize: "1.5rem",
                                opacity: 1,
                                color: "#D1D5DB",
                            },
                        }}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <IconButton onClick={showCorrect ? moveToNext : checkAnswer}
                                    sx={{
                                        color: "#4B5563",
                                        "&:hover": {
                                            color: "#9CA3AF",
                                        },
                                    }}
                                    >
                                        <ArrowForwardIcon sx={{ color: "#4B5563" }} />
                                    </IconButton>
                                ),
                                style: {
                                    textAlign: "center",
                                    color: "white",
                                },
                            },
                        }}
                    />

                    {/* Message Display */}
                    <p className='mt-4 text-lg min-h-[56px] whitespace-pre-line text-center font-bold'>{message}</p>
                </>
            ) : (
                <>
                    {/* Display Final Message when Quiz is Done */}
                    <h1 className='text-3xl font-bold text-center'>{message}</h1>
                </>
            )}

            {/* Bottom Navigation Icons (Always Show) */}
            {/* Menu button */}
            <div className="flex flex-row gap-6 mt-6">
                <Tooltip title="Return to Menu" arrow>
                    <IconButton onClick={() => navigate("/")} sx={{ 
                        color: "red", 
                        "&:hover":{
                            color: "#ff6666",
                        }
                    }}>
                        <ArrowBackIcon fontSize="large" />
                    </IconButton>
                </Tooltip>

                {/* Mute button */}
                <Tooltip title="Mute Sound" arrow>
                    <IconButton onClick={toggleMute} sx={{ 
                        color: "red", 
                        "&:hover":{
                            color: "#ff6666",
                        }
                    }}>
                        {isMuted ? <HeadsetOffIcon fontSize='large'/> : <HeadsetIcon fontSize='large'/>}
                    </IconButton>
                </Tooltip>
                
                {/* Restart button */}
                <Tooltip title="Restart Quiz" arrow>
                    <IconButton onClick={restartGame} sx={{ 
                        color: "red",
                        "&:hover":{
                            color: "#ff6666",
                            }
                        }}>
                        <RefreshIcon fontSize="large" />
                    </IconButton>
                </Tooltip>
            </div>
        </div>
    );
};

export default Game;
