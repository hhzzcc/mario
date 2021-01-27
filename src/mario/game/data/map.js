export const map = [
    { type: 'building-Land', x: 0, y: 13, w: 20, h: 2, },
    { type: 'building-Stone', x: 6, y: 9, w: 3, h: 1, },

    { type: 'building-Gold', x: 9, y: 8, w: 20, h: 1, },
    { type: 'building-Ask', x: 9, y: 9, w: 2, h: 1, },
    { type: 'building-Stone', x: 11, y: 9, w: 3, h: 1, },
    { type: 'building-Ask', x: 32, y: 11, w: 2, h: 1, },
    { type: 'building-Stone', x: 34, y: 9, w: 3, h: 1, },
    { type: 'building-Land', x: 22, y: 13, w: 20, h: 2, },
    { type: 'building-Land', x: 30, y: 9, w: 50, h: 2, },

    { type: 'building-Ask', x: 10, y: 12, w: 2, h: 1, },

    { type: 'building-Ask', x: 17, y: 12, w: 2, h: 1, },

    { type: 'building-Flow', x: 17, y: 11, w: 2, h: 1, },
]

const handle = map => {
    const m = [];
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].w; j++) {
            for (let k = 0; k < map[i].h; k++) {
                m.push({
                    type: map[i].type,
                    x: (map[i].x + j) * 32,
                    y: (map[i].y + k) * 32,
                });
            }
        }
    }
    return m;
}

export const mapData = handle(map)