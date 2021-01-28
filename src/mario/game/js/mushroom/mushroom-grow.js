import { Mushroom } from './mushroom.js';

export class MushroomGrow extends Mushroom {
    constructor(options) {
        super(options);
        this.type = 'mushroom-Grow';
        // 默认不允许移动
        this.isAbleMove = false;
        // 是否从墙中出现
        this.isAppear = false;
        // 不受物理影响
        this.ablePhysical = false;
    }

    // 处理蘑菇出现
    handleAppear() {
        const n = 10;
        if (this.isAppear) {
            this.y -= n;
            this.appearOffset = 0;
            this.isAppear = false;
        }

        if (this.appearOffset < this.h - n) {
            this.appearOffset ++;
            this.y -= 1;
        }

        // 出现后运行移动，受物理效果影响
        if (this.appearOffset >= this.h - n) {
            this.isAbleMove = true;
            this.ablePhysical = true;
        }
    }

    // 帧循环
    frameWorkCallback(scene, camera, physical) {
        // 处理蘑菇出现
        this.handleAppear();
    }
};