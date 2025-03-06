import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import RefreshIcon from "@mui/icons-material/Refresh";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Tooltip from '@mui/material/Tooltip';
import { romanjiMap } from './kana';
import correct from '../assets/audio/correct.mp3';
import incorrect from '../assets/audio/incorrect.mp3';

const Game = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { selectedChars } = location.state || { selectedChars: [] };

    //shuffle characters randomly
    const shuffleArray = (array: string[]) => [...array].sort(() => Math.random() - 0.5);
    const [shuffledChars, setShuffledChars] = useState<string[]>(shuffleArray(selectedChars));
    const [retryQueue, setRetryQueue] = useState<string[]>([]);


    const [currentIndex, setCurrentIndex] = useState(0);
    const [userInput, setUserInput] = useState('');
    const [message, setMessage] = useState('');
    const [correctCount, setCorrectCount] = useState(1);
    const [incorrectCount, setIncorrectCount] = useState(0);
    const [showCorrect, setShowCorrect] = useState(false);
    const [pendingRetry, setPendingRetry] = useState<string | null>(null); 
    const [quizCompleted, setQuizCompleted] = useState(false);

    //restart game if selectedChars changes
    useEffect(() => {
        setShuffledChars(shuffleArray(selectedChars));
        setRetryQueue([]);
        setCurrentIndex(0);
        setQuizCompleted(false);
    }, [selectedChars]);

    const checkAnswer = () => {
        if(quizCompleted) return;

        const currentKana = shuffledChars[currentIndex];
        const correctAnswer = romanjiMap[currentKana];

        if (userInput.trim().toLowerCase() === correctAnswer) {
            setMessage('Correct!');
            new Audio(correct).play();
            setCorrectCount(prevCount => prevCount + 1);
            setShowCorrect(false);

            setTimeout(() => {
                setUserInput('');
                setMessage('');
                moveToNext();
            }, 500);
        }else{
            setMessage(`Incorrect. Correct Answer: ${correctAnswer}`);
            new Audio(incorrect).play();
            setIncorrectCount(prev => prev + 1);
            setShowCorrect(true);
            setPendingRetry(currentKana);
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
        <div className='min-h-screen flex flex-col items-center justify-center bg-gray-800 text-white p-6'>
            {!quizCompleted ? (
                <>
                    {/* Show kana/question when quiz is active */}
                    <h1 className='text-4xl font-bold mb-4 mt-12'>{shuffledChars[currentIndex]}</h1>
                    
                    {/* Input Field with Arrow */}
                    <TextField
                        variant='outlined'
                        placeholder='答え'
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                showCorrect ? moveToNext() : checkAnswer();
                            }
                        }}
                        className='mb-4 bg-white rounded-lg'
                        sx={{
                            "& .MuiInputBase-input": {
                                textAlign: "center",
                                fontSize: "1.5rem",
                                color: "black",
                                paddingLeft: "3.5rem",
                            },
                            "& .MuiInputBase-input::placeholder": {
                                fontSize: "1.5rem",
                                opacity: 1,
                                color: "gray",
                            },
                        }}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <IconButton onClick={showCorrect ? moveToNext : checkAnswer}>
                                        <ArrowForwardIcon sx={{ color: "black" }} />
                                    </IconButton>
                                ),
                                style: {
                                    textAlign: "center",
                                    color: "black",
                                },
                            },
                        }}
                    />

                    {/* Message Display */}
                    <p className='mt-4 text-lg min-h-[32px]'>{message}</p>
                </>
            ) : (
                <>
                    {/* Display Final Message when Quiz is Done */}
                    <h1 className='text-3xl font-bold text-center'>{message}</h1>
                </>
            )}

            {/* Bottom Navigation Icons (Always Show) */}
            <div className="flex flex-row gap-6 mt-6">
                <Tooltip title="Return to Menu" arrow>
                    <IconButton onClick={() => navigate("/")} sx={{ color: "red" }}>
                        <ArrowBackIcon fontSize="large" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Restart Quiz" arrow>
                    <IconButton onClick={restartGame} sx={{ color: "red" }}>
                        <RefreshIcon fontSize="large" />
                    </IconButton>
                </Tooltip>
            </div>
        </div>
    );
};

export default Game;
