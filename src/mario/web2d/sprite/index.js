export class Sprite {
    constructor(options) {
        const { x, y, w, h, images, frameDelay = 0.1, frameCount = 0, isCrop = false } = options;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.images = images;
        // 初始x
        this.beginX = x;
        // 初始y
        this.beginY = y;
        // 初始w
        this.beginW = w;
        // 初始h
        this.beginH = h;
        // 精灵帧延迟
        this.frameDelay = frameDelay;
        // 第几帧精灵
        this.frameCount = frameCount;
        // 是否离屏幕移除
        this.isOverflowRemove = false;
        // 即将被移除
        this.isRemoveBefore = false;
        // 被移除
        this.isRemove = false;
        // 是否裁剪
        this.isCrop = isCrop;
        // 是否受物理效果影响
        this.ablePhysical = true;
        // 是否覆盖相同位置下的精灵
        this.ableBeCover = false;
        // 当前包含的精灵
        this.sprites = [];
    }

    run() {
        const { x, y, w, h } = this;
        this.frameCount = (this.frameCount >= this.images.length - 1) ? 0 : (this.frameCount + this.frameDelay);
        const image = this.images[~~this.frameCount];
        return { x, y, w, h, image, sprite: this };
    }

    // 即将移除精灵
    wellRemove() {
        this.isRemoveBefore = true;
    }

    // 精灵移除
    remove() {
        this.isRemoveBefore = true;
        this.isRemove = true;
    }

    // 每一帧执行回调，适合在子类继承中重写
    frameWorkCallback() {}
};