
import { Sprite } from '../../../web2d/sprite';
import { baseData } from '../../data/base';
import { Bullet } from '../bullet';

export class Person extends Sprite {
    constructor(options) {
        const { allImages, x, y, w = baseData.unit, h = baseData.unit } = options;
        super({ x, y, w, h });

        // 人物相关的所有素材
        this.allImages = allImages;

        // 各个方向速度值
        this.vTop = -4;
        this.vLeft = -4;
        this.vRight = 4;

        // 当前速度
        this.vx = 0;
        this.vy = 0;

        // 运行跳跃
        this.isAbleDoTop = true;

        this.personType = 'base';
        this.type = 'person';
    }

    // 成长 - 变大
    growToBig() {
        if (this.personType === 'big' || this.personType == 'bullet') return;
        this.y -= this.h;
        this.h = 2 * this.h;
        this.personType = 'big';
    }

    // 成长 - 拥有子弹
    growToBullet() {
        if (this.personType === 'bullet') return;
        if (this.personType === 'base') {
            this.y -= this.h;
            this.h = 2 * this.h;
        }
        this.personType = 'bullet';
    }

    // 还原
    clear() {
        this.x = this.beginX;
        this.y = this.beginY;
        this.w = this.beginW;
        this.h = this.beginH;
        this.personType = 'base';
    }

    // 变小
    shrink() {
        if (this.personType === 'base') return;
        this.w = this.beginW;
        this.h = this.beginH;
        this.y += this.h;
        this.personType = 'base';
    }

    // 处理移动
    handleMove() {
        this.x += this.vx;
        this.y += this.vy;
    }

    // 处理运动状态
    handleRunType() {
        let runType = 'Static';

        if (this.isDoTop && this.isAbleDoTop) {
            runType = 'TopRight';
        }

        if (this.isDoLeft) {
            runType = this.isDoTop ? 'TopLeft' : 'Left';
        }

        if (this.isDoRight) {
            runType = this.isDoTop ? 'TopRight' : 'Right';
        }

        this.runType = runType;
    }

    // 处理发射子弹
    handleFire(scene, physical) {
        if (this.isDoBullet && this.personType === 'bullet') {
            this.runType = this.runType.includes('Left') ? 'BulletLeft' : 'BulletRight';
            if (!this.timmer || Date.now() - this.timmer > 200) {
                const isLeft = this.runType.includes('Left');
                const bullet = new Bullet({
                    x: this.x + (isLeft ? -0.5 : 1) * this.w,
                    y: this.y,
                    w: 16,
                    h: 16,
                    vx: (isLeft ? - 1: 1) * 6,
                    images: this.allImages.bullet
                });
                scene.add([bullet]);
                physical.addDynamicSprite([bullet]);
                this.timmer = Date.now();
            }
        }
    }

    // 处理死亡
    handleDeath() {
        if (this.isDeath) {
            runType = 'Death';
        }
    }

    // 更新精灵
    update() {
        this.images = this.allImages[`${this.personType}Person${this.runType}`];
    }

    // 帧循环
    frameWorkCallback(scene, camera, physical) {
        // 更新运动状态
        this.handleRunType();
        // 发射子弹
        this.handleFire(scene, physical);
        // 死亡
        this.handleDeath();
        // 更新状态
        this.update();
    }
}