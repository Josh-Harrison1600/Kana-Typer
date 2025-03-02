import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import RefreshIcon from "@mui/icons-material/Refresh";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Tooltip from '@mui/material/Tooltip';
import { romanjiMap } from './kana';

const Game = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { selectedChars } = location.state || { selectedChars: [] };

    //shuffle characters randomly
    const shuffleArray = (array: string[]) => [...array].sort(() => Math.random() - 0.5);
    const [shuffledChars, setShuffledChars] = useState<string[]>(shuffleArray(selectedChars));

    const [currentIndex, setCurrentIndex] = useState(0);
    const [userInput, setUserInput] = useState('');
    const [message, setMessage] = useState('');
    const [correctCount, setCorrectCount] = useState(1);
    const [incorrectCount, setIncorrectCount] = useState(0);

    //restart game if selectedChars changes
    useEffect(() => {
        setShuffledChars(shuffleArray(selectedChars));
        setCurrentIndex(0);
    }, [selectedChars]);

    const checkAnswer = () => {
        const currentKana = shuffledChars[currentIndex];
        const correctAnswer = romanjiMap[currentKana];

        if (userInput.trim().toLowerCase() === correctAnswer) {
            setMessage('correct answer');
            setCorrectCount(prevCount => prevCount + 1);
            setTimeout(() => {
                setUserInput('');
                setMessage('');
                if (currentIndex + 1 < shuffledChars.length) {
                    setCurrentIndex(currentIndex + 1);
                } else {
                    const total = correctCount + incorrectCount + 1;
                    const accuracy = total === 0 ? 0 : ((correctCount + 1) / total) * 100;
                    setMessage(`Finished quiz! Accuracy: ${accuracy.toFixed(2)}%`);
                }
            }, 500);
        } else {
            setMessage('Incorrect answer, try again');
            setIncorrectCount(prevCount => prevCount + 1);
        }
    };

    const restartGame = () => {
        setShuffledChars(shuffleArray(selectedChars));
        setCurrentIndex(0);
        setCorrectCount(0);
        setIncorrectCount(0);
        setMessage('');
        setUserInput('');
    };

    return (
        <div className='min-h-screen flex flex-col items-center justify-center bg-gray-800 text-white p-6'>
            {shuffledChars.length > 0 && currentIndex < shuffledChars.length ? (
                <>
                    <h1 className='text-4xl font-bold mb-4'>{shuffledChars[currentIndex]}</h1>
                    
                    {/* Input Field with Arrow */}
                    <TextField
                        variant='outlined'
                        placeholder='答え'
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                checkAnswer();
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
                                    <IconButton onClick={checkAnswer}>
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
                    <p className='mt-4 text-lg'>{message}</p>

                    {/* Bottom Navigation Icons */}
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
                </>
            ) : (
                <IconButton onClick={() => navigate("/")} sx={{ color: "magenta" }}>
                    <ArrowBackIcon fontSize="large" />
                </IconButton>
            )}
        </div>
    );
};

export default Game;
