import { useState } from "react";

const useInput = (validationFunction) =>{
    const [inputValue, setInputValue] = useState('');
    const [inputIsTouched, setIsTouched] = useState(false);

    const isValid = validationFunction(inputValue);
    const hasErrors = inputIsTouched && !isValid;
    
    const handleInput = (event)=>setInputValue(event.target.value);
    const handleBlur = (event) => setIsTouched(true);
    return {
        inputValue,
        handleInput,
        inputIsTouched,
        handleBlur,
        isValid,
        hasErrors,
        setInputValue
    };
}

export default useInput;