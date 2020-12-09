import { useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';

export default function useAlan() {


	useEffect(() => {

        alanBtn({
            key: process.env.REACT_APP_ALAN_KEY,
            onCommand: (commandData) => {
                console.log(commandData);
                
            }
        })


    }, []);

	return null;
}
