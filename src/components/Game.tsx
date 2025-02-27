import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { romanjiMap } from './kana';


const Game = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { selectedChars } = location.state || { selectedChars: [] };

    //shuffle characters randomly
    const shuffleArray = (array:string[]) => [...array].sort(() => Math.random() - 0.5);
    const [shuffledChars, setShuffledChars] = useState<string[]>(shuffleArray(selectedChars));
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userInput, setUserInput] = useState('');
    const [message, setMessage] = useState('');

    //restart game if selectedChars changes
    useEffect(() => {
        setShuffledChars(shuffleArray(selectedChars));
        setCurrentIndex(0);
    }, [selectedChars]);

    const checkAnswer = () => {
        const currentKana = shuffledChars[currentIndex];
        const correctAnswer = romanjiMap[currentKana];

        if(userInput.trim().toLowerCase() === correctAnswer){
            setMessage('correct answer');
            setTimeout(() => {
                setUserInput('');
                setMessage('');
                if(currentIndex + 1 < shuffledChars.length){
                    setCurrentIndex(currentIndex + 1);
                }else{
                    setMessage('finished quiz');
                }
            }, 1000);
        }else{
            setMessage('Incorrect answer, try again');
        }
    };

    return(
        <div className='min-h-screen flex flex-col items-center justify-center bg-gray-800 text-white p-6'>
            {shuffledChars.length > 0 && currentIndex < shuffledChars.length ? (
                <>
                    <h1 className='text-4xl font-bold mb-4'>{shuffledChars[currentIndex]}</h1>
                    <TextField
                        variant='outlined'
                        placeholder='答え'
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        className='mb-4 bg-white'
                    />
                    <Button variant='contained' color='primary' onClick={checkAnswer}>
                        Submit
                    </Button>
                    <p className='mt-4 text-lg'>{message}</p>
                </>
            ) : (
                <Button variant='contained' color='secondary' onClick={() => navigate('/')}>
                    Back
                </Button>
            )}
        </div>
    )
}

export default Game;