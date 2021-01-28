export class Scene {
    constructor(options) {
        const { x, y, w, h, backgroundImage } = options;
        this.x = x || 0;
        this.y = y || 0;
        this.w = w;
        this.h = h;
        // 场景背景
        this.backgroundImage = backgroundImage;
        this.sprites = [];
    }

    // 添加精灵
    add(sprites) {
        for (let i = 0; i < sprites.length; i++) {
            const sprite = sprites[i];
            if (!sprite) continue;
            for (let j = 0; j < this.sprites.length; j++) {
                const sceneSprite = this.sprites[j];
                // 删除重复位置精灵
                if (
                    sprite.x === sceneSprite.x &&
                    sprite.y === sceneSprite.y &&
                    sprite.ableCoverIdenticalPosition
                ) {
                    sceneSprite.remove();
                    break;
                }
            }
            this.sprites.push(sprite);
        }
    }

    // 删除精灵
    remove(sprite) {
        if (!sprite) return;
        for (let i = 0; i < this.sprites.length; i++) {
            if (sprite === this.sprites[i])  {
                this.sprites.splice(i, 1);
                break;
            }
        }
    }

    // 清空精灵
    clear() {
        this.sprites = [];
    }
};