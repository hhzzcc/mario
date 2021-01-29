import { Building } from './building.js';

export class BuildingWin extends Building {
    constructor(options) {
        const { images, x, y, w } = options;
        super({
            ...options,
            images: [images[0]],
            x: x - w / 2,
            y: y + 22
        });
        this.groupX = x;
        this.groupY = y;
        this.sprites.push(
            new Building({
                images: [images[1]],
                x,
                y,
                type: 'building-WinRod'
            })
        );
        this.allImages = images;
        this.type = 'building-Win';
        this.ablePhysical = false;
        // 默认为一个杆子
        this.setRodCount(1);
    }

    // 获取总高度
    getSpritesSumHeight() {
        return this.sprites.length * this.h;
    }

    // 增加杆子个数
    setRodCount(count) {
        const sprites = [];
        this.sprites.splice(1);
        for (let i = 0; i < count; i++) {
            sprites.push(
                new Building({
                    images: [this.allImages[2]],
                    x: this.groupX,
                    y: this.groupY + 32 * (i + 1),
                    type: 'building-WinRod'
                })
            );
        }

        this.sprites.push(...sprites);
        return sprites;
    }
}