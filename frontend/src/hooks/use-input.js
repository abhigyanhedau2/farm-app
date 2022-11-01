import { useState } from 'react';

const useInput = (validationFn) => {

    const [input, setInput] = useState('');
    const [inputIsValid, setInputIsValid] = useState(false);
    const [inputIsTouched, setInputIsTouched] = useState(false);

    const inputChangeHandler = (event) => {
        setInput(event.target.value);
        setInputIsValid(validationFn(event.target.value));
    };

    const inputTouchedHandler = () => {
        setInputIsTouched(true);
    }

    return {
        input, inputIsValid, inputIsTouched, inputChangeHandler, inputTouchedHandler
    };

};

export default useInput;