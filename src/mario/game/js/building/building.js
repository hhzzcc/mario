import { Sprite } from '@/mario/web2d/sprite';
import { baseData } from '@/mario/game/data/base';

export class Building extends Sprite {
    constructor(options) {
        const { images, x, y, w = baseData.unit, h = baseData.unit, ableHorn, ableBorn } = options;
        super({ images, x, y, w, h });
        // 是否允许被顶起来
        this.ableHorn = ableHorn;
        // 是否允许击中爆炸
        this.ableBorn = ableBorn;
        // 是否爆炸
        this.isBorn = false;
    }

    // 被顶起来
    horn() {
        if (!this.ableHorn || this.isBorn) return;
        this.y = this.beginY - 8;
    }

    // 恢复顶起状态
    handleRestoreHorn() {
        if (this.y !== this.beginY) {
            this.y += 1;
        }
    }

    // 复原顶起状态
    frameWorkCallback(scene, camera, physical) {
        this.handleRestoreHorn();
    }
}