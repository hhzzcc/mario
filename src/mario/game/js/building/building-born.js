import { Building } from './index.js';

export class BuildingBorn extends Building {
    constructor(options) {
        const { index } = options;
        super(options);
        // 碎块位置
        this.index = index;
        this.animatedX = 0;
        this.animatedY = 0;
        this.isPhysical = false;
        this.isCrop = true;
        this.type = 'building-Born';
    }

    // 根据碎块位置做抛物线运动
    frameWorkCallback() {
        if (this.index === 0 || this.index === 2) {
            const b = this.index === 0 ? 5 : 3;
            this.animatedX += 2;
            this.animatedY = 0.1 * this.animatedX * this.animatedX - b * this.animatedX;
            this.x = this.beginX - this.animatedX;
            this.y = this.beginY + this.animatedY;
        }

        if (this.index === 1 || this.index === 3) {
            const b = this.index === 1 ? 5 : 3;
            this.animatedX += 2;
            this.animatedY = 0.1 * this.animatedX * this.animatedX - b * this.animatedX;
            this.x = this.beginX + this.animatedX;
            this.y = this.beginY + this.animatedY;
        }
    }
}