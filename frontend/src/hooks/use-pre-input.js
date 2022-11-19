import { useState } from 'react';

const usePreInput = (validationFn) => {

    const [input, setInput] = useState('');
    const [inputIsValid, setInputIsValid] = useState(true);
    const [inputIsTouched, setInputIsTouched] = useState(false);

    const inputChangeHandler = (event) => {
        setInput(event.target.value);
        setInputIsValid(validationFn(event.target.value));
    };

    const inputTouchedHandler = () => {
        setInputIsTouched(true);
    }

    return {
        input, inputIsValid, inputIsTouched, inputChangeHandler, inputTouchedHandler, setInput, setInputIsValid, setInputIsTouched
    };

};

export default usePreInput;