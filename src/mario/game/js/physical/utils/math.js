export const isCollectTop = (a, b) => {
    return (
        (a.y + a.vy > b.y && a.y + a.vy < b.y + b.h) &&
        a.x !== b.x - a.w &&
        a.x !== b.x + b.w
    );
};

export const isCollectBottom = (a, b) => {
    return (
        (a.y + a.h + a.vy > b.y && a.y + a.h + a.vy < b.y + b.h) &&
        a.x !== b.x - a.w &&
        a.x !== b.x + b.w
    );
};

export const isCollectLeft = (a, b) => {
    return (
        (a.x + a.w + a.vx > b.x && a.x + a.w + a.vx < b.x + b.w) &&
        a.y !== b.y - a.h &&
        a.y !== b.y + b.h
    );
};

export const isCollectRight = (a, b) => {
    return (
        (a.x + a.vx > b.x && a.x + a.vx < b.x + b.w) &&
        a.y !== b.y - a.h &&
        a.y !== b.y + b.h
    );
};

export const isCollectLeftRight = (a, b) => {
    return (
        (
            (a.x + a.vx > b.x && a.x + a.vx < b.x + b.w) ||
            (a.x + a.w + a.vx > b.x && a.x + a.w + a.vx < b.x + b.w)
        ) &&
        a.y !== b.y - a.h &&
        a.y !== b.y + b.h
    );
};

export const isCollectTopBottom = (a, b) => {
    return (
        (
            (a.y + a.vy > b.y && a.y + a.vy < b.y + b.h) ||
            (a.y + a.h + a.vy > b.y && a.y + a.h + a.vy < b.y + b.h)
        ) &&
        a.x !== b.x - a.w &&
        a.x !== b.x + b.w
    );
};
            

export const isCollection = (a, b) => {
    return !(
        a.x + a.vx >= b.x + b.w ||
        a.x + a.vx + a.w <= b.x ||
        a.y + a.vy >= b.y + b.h ||
        a.y + a.vy + a.h <= b.y
    );
}
            