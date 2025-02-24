import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const Footer = () => {
    return(
        <footer className='fixed bottom-0 w-full bg-black py-4 shadow-lg'>
                  <div className="flex justify-center mt-2">
                    <div className='mb-2'>                
                        <Stack spacing={2} direction="row">
                        <Button variant="contained">Start</Button>     
                        </Stack>    
                    </div>
                </div>
        </footer>
    )
}

export default Footer;