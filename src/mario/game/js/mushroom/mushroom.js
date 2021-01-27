import { Sprite } from '@/mario/web2d/sprite';

export class Mushroom extends Sprite {
    constructor(options) {
        const { images, x, y, w = 32, h = 32 } = options;
        super({ images, x, y, w, h, frameDelay: 0.01 });

        this.vx = -1;
        this.vy = 0;

        // 允许运动
        this.isAbleMove = true;
    }

    handleMove() {
        if (!this.isAbleMove) return;
        this.x += this.vx;
        this.y += this.vy;
    }
};