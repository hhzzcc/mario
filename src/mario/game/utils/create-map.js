import { baseData } from '../data/base';
import { BuildingAsk, BuildingGold, BuildingFlow, BuildingStone, BuildingWin, BuildingNormal } from '../js/building';

const handleBuilding = (m, allImages) => {
    
    const params = {
        x: m.x,
        y: m.y,
        w: baseData.unit,
        h: baseData.unit,
        images: allImages.building[m.type.replace('-', '')],
        ableHorn: false,
        ableBorn: false
    };
    switch(m.type) {
        case 'building-Ask':
            return new BuildingAsk({
                ...params,
                ableHorn: true,
                nothingImages: allImages.building.buildingNothing
            });
        case 'building-Gold':
            return new BuildingGold(params);
        case 'building-Flow':
            return new BuildingFlow(params);
        case 'building-Stone':
            return new BuildingStone({
                ...params,
                ableHorn: true,
                ableBorn: true
            });
        case 'building-Win':
            return new BuildingWin(params);
    }
    return new BuildingNormal(params);
};

export const createMap = (allImages, mapData) => {
    const maps = {};
    for (let i = 0; i < mapData.length; i++) {
        const m = mapData[i];
        maps[m.x + ',' + m.y] = handleBuilding(m, allImages);
    }
    return maps;
}