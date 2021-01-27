import { MushroomBad, MushroomGrow } from '../js/mushroom';

export const createMushroomBad = (allImages, mushroomData) => {
    return mushroomData.map(m => new MushroomBad({
        x: m.x,
        y: m.y,
        w: 32,
        h: 32,
        images: allImages.mushroom[m.type.replace('-', '')],
        deathImages: allImages.mushroom.mushroomBadDie,
    }));
}

export const createMushroomGrow = (building, allImages) => {
    const mushrooms = {};
    Object.values(building).forEach(b => {
        if (b.type === 'building-Ask') {
            mushrooms[b.x + ',' + b.y] = new MushroomGrow({
                x: b.x,
                y: b.y,
                w: 32,
                h: 32,
                images: allImages.mushroom.mushroomGrow,
            });
        }
    });
    return mushrooms;
}