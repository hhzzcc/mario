import { Sprite } from "@/mario/web2d/sprite";

export class Bullet extends Sprite {
    constructor(options) {
        const { images, x, y, w = 16, h = 16, vx = 4 } = options;
        super({ images, x, y, w, h });

        this.vx = vx;
        this.vy = 0;
        this.maxJump = 10;

        // 超出屏幕删除
        this.ableOverflowHidden = true;
        this.type = 'bullet';
    }

    // 移动
    handleMove() {
        this.x += this.vx;
        this.y += this.vy;
    }
}