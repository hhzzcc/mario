const handler = (obj, direction, isPress) => {
    obj[`isDo${direction}`] = isPress;
};


export const addKeyEvent = obj => {
    const onKeyDown = e => {
        e.preventDefault();
        switch(e.keyCode) {
            case 38:
                handler(obj, 'Top', true);
                break;
            case 40:
                handler(obj, 'Bottom', true);
                break;
            case 37:
                handler(obj, 'Left', true);
                break;
            case 39:
                handler(obj, 'Right', true);
                break;
            case 32:
                handler(obj, 'Bullet', true);
        }
    };
    
    const onkeyUp = e => {
        switch(e.keyCode) {
            case 38:
                handler(obj, 'Top', false);
                break;
            case 40:
                handler(obj, 'Bottom', false);
                break;
            case 37:
                handler(obj, 'Left', false);
                break;
            case 39:
                handler(obj, 'Right', false);
                break;
            case 32:
                handler(obj, 'Bullet', false);
        }
    };

    const removeKeyEvent = () => {
        document.removeEventListener('keydown', onKeyDown);
        document.removeEventListener('keyup', onkeyUp);
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onkeyUp);

    return removeKeyEvent;
};