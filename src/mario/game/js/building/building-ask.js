import { Building } from './building.js';

export class BuildingAsk extends Building {
    constructor(options) {
        super(options);
        this.nothingImages = options.nothingImages;
        this.type = 'building-Ask';
    }

    // 顶起来
    horn() {
        super.horn();
        // 顶过一次不能再顶
        this.ableHorn = false;
        this.images = this.nothingImages;
    }
}