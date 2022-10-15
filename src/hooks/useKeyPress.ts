import { useEffect, useState } from "react";

function useKeyPress() {
    // State for keeping track of whether key is pressed
    const [keyPressed, setKeyPressed] = useState<string>('');

    const downHandler = ({ key }: KeyboardEvent) => {
        setKeyPressed(key);
    }
    const upHandler = ({ key }: KeyboardEvent) => {
        setKeyPressed('');
    };
    // Add event listeners
    useEffect(() => {
        window.addEventListener("keydown", downHandler);
        window.addEventListener("keyup", upHandler);
        // Remove event listeners on cleanup
        return () => {
            window.removeEventListener("keydown", downHandler);
            window.removeEventListener("keyup", upHandler);
        };
    }, []);

    return keyPressed;
}

export default useKeyPress