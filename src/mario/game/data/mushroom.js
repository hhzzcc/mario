export const mushrooms = [
    { type: 'mushroom-Bad', x: 14, y: 11 },
    { type: 'mushroom-Bad', x: 15, y: 11 },
]

const handle = mushrooms => {
    const m = [];
    for (let i = 0; i < mushrooms.length; i++) {
        const mushroom = mushrooms[i];
        m.push({
            type: mushroom.type,
            x: mushroom.x * 32,
            y: mushroom.y * 32,
        });
    }
    return m;
}

export const mushroomData = handle(mushrooms)