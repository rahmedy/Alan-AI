import { useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';

export default function useAlan() {


	useEffect(() => {

        alanBtn({
            key: '1d3e4f95dae88c851d9b60c7de5a02cc2e956eca572e1d8b807a3e2338fdd0dc/stage',
            onCommand: (commandData) => {
                console.log(commandData);
                
            }
        })


    }, []);

	return null;
}
