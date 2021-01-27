import { Mushroom } from './mushroom.js';

export class MushroomBad extends Mushroom {
    constructor(options) {
        super(options);
        this.deathImages = options.deathImages;
        this.frameDelay = 0.05;
        this.type = 'mushroom-Bad';
    }

    // 死亡
    death() {
        this.images = this.deathImages;
        this.isRemoveBefore = true;
    }

    handleDeath() {
        if (this.isRemoveBefore) {
            this.AnimatedDelay = this.AnimatedDelay || 0;
            if (this.AnimatedDelay >= 1) {
                this.remove();
            }
            else {
                this.AnimatedDelay += 0.05;
            }
        }
    }

    // 帧循环
    frameWorkCallback() {
        // 处理死亡
        this.handleDeath();
    }
};