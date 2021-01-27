export class Camera {
    constructor(options) {
        const { x, y, w, h } = options;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    // 平移
    translate(options) {
        const { x, y } = options;
        this.x += (x || 0);
        this.y += (y || 0);
    }

    // 精灵是否在相机视野内
    isInView(sprite) {
        const { x, y, w, h } = this;
        return (
            sprite.x + sprite.w >= x &&
            sprite.x <= x + w && 
            sprite.y + sprite.h >= y &&
            sprite.y <= y + h
        );
    }
};