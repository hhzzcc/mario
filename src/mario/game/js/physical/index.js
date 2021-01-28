import {
    isCollectTop,
    isCollectBottom,
    isCollectLeft,
    isCollectRight,
    isCollectLeftRight,
    isCollectTopBottom,
    isCollection
} from './utils/math.js';
import { baseData } from '../../data/base';

export class Physical {

    constructor(options) {
        const { camera } = options;
        this.camera = camera;
        // 静态精灵(不会动)
        this.staticSprites = {};
        // 不稳定精灵(随时可能动)
        this.unstableSprites = {};
        // 动态精灵(一直会动)
        this.dynamicSprites = [];
    }

    // 添加静态精灵（用键值对形式，为了提升性能）
    addStaticSprite(staticSprites) {
        for (const key in staticSprites) {
            this.staticSprites[key] = staticSprites[key];
        }
    }

    // 添加不稳定精灵（随时可能由静态 -> 动态）
    addUnstableSprite(unstableSprites) {
        for (const key in unstableSprites) {
            this.unstableSprites[key] = unstableSprites[key];
        }
    }

    // 添加动态精灵
    addDynamicSprite(dynamicSprites) {
        return dynamicSprites.forEach(dynamicSprite => {
            dynamicSprite && this.dynamicSprites.push(dynamicSprite);
        });
        
    }

    // 移除动态精灵
    removeDynamicSprite(dynamicSprite) {
        for (let i = 0; i < this.dynamicSprites.length; i++) {
            if (dynamicSprite === this.dynamicSprites[i]) {
                this.dynamicSprites.splice(i, 1);
                break;
            }
        }
    }

    // 处理动态精灵和静态精灵
    handleDynamicSpriteAndStaticSprite(dynamicSprite, staticSprites) {
        // 物理重力
        this.handlePhysicalGravity(dynamicSprite);
        // 物理移动
        this.handlePhysicalMove(dynamicSprite);
        // 物理碰撞
        this.handlePhysicalCollection(dynamicSprite, staticSprites);
        // 精灵运动
        dynamicSprite.handleMove();
    }

    // 物理重力
    handlePhysicalGravity(dynamicSprite) {
        // 重力，跳太高会坠落
        if (dynamicSprite.isDoTop && dynamicSprite.isAbleDoTop) {
            dynamicSprite._jumpOffset = (dynamicSprite._jumpOffset || 0) + 1;
            if (dynamicSprite._jumpOffset >= (dynamicSprite.maxJump || 32)) {
                // 上升到最高点会坠落
                dynamicSprite.isAbleDoTop = false; 
            }
            return;
        }
        dynamicSprite.vy = 5;
    }

    // 物理碰撞
    handlePhysicalCollection(dynamicSprite, staticSprites) {
        // 和周围的静态精灵做碰撞检测
        const UNIT = baseData.unit;
        const LEFT_BORDER = Math.max(~~(dynamicSprite.x / UNIT) * UNIT, 0) - UNIT;
        const RIGHT_BORDER = ~~((dynamicSprite.x + dynamicSprite.w) / UNIT) * UNIT + UNIT;
        const TOP_BORDER = ~~(dynamicSprite.y / UNIT) * UNIT - UNIT;
        const BOTTOM_BORDER = ~~((dynamicSprite.y + dynamicSprite.h) / UNIT) * UNIT + UNIT;

        for (let j = LEFT_BORDER; j < RIGHT_BORDER; j += UNIT) {
            for (let k = TOP_BORDER; k < BOTTOM_BORDER; k += UNIT) {
                const staticSprite = staticSprites[j + ',' + k];
                if (staticSprite) {
                    if (staticSprite.isRemoveBefore) {
                        delete staticSprites[j + ',' + k];
                        continue;
                    }
                    // 动态精灵和静态精灵碰撞
                    this.handleDynamicSpriteAndStaticSpriteCollection(dynamicSprite, staticSprite);
                }
            }
        }
    }

    // 物理移动
    handlePhysicalMove(dynamicSprite) {
        // 根据不同精灵处理碰撞交互
        switch(dynamicSprite.type) {
            case 'person':
                return this.handlePersonMove(dynamicSprite);
            case 'bullet':
                return this.handleBulletMove(dynamicSprite);
        }
    }

    // 动态精灵和静态精灵碰撞
    handleDynamicSpriteAndStaticSpriteCollection(dynamicSprite, staticSprite) {
        if (isCollection(dynamicSprite, staticSprite)) {
            // 根据不同精灵处理碰撞交互
            switch(dynamicSprite.type) {
                case 'person':
                    return this.handlePersonCollectBuilding(
                        dynamicSprite,
                        staticSprite
                    );
                case 'bullet':
                    return this.handleBulletCollectBuilding(
                        dynamicSprite,
                        staticSprite
                    );
                case 'mushroom-Bad':
                case 'mushroom-Grow':
                    return this.handleMushroomCollectBuilding(
                        dynamicSprite,
                        staticSprite
                    );
            }
        }
    }

    // 人物移动
    handlePersonMove(person) {
        person.vx = 0;

        if (person.isDoTop && person.isAbleDoTop) {
            person.vy = -4;
        }

        if (person.isDoLeft) {
            person.vx = -4;
        }

        if (person.isDoRight) {
            person.vx = 4;
        }
    }

    // 子弹移动
    handleBulletMove(bullet) {
        if (bullet.isDoTop && bullet.isAbleDoTop) {
            bullet.vy = -4;
        }
    }

    // 人物碰撞
    handlePersonCollectBuilding(person, building) {
        // 吃到金币
        if (building.type === 'building-Gold') {
            return building.remove();
        }

        // 对火焰花处理
        if (building.type === 'building-Flow') {
            person.growToBullet();
            return building.remove();
        }

        // 水平方向撞墙
        if (isCollectLeftRight(person, building)) {
            person.vx = 0;
        }

        // 垂直方向撞墙
        if (isCollectTopBottom(person, building)) {
            
            // 顶到墙
            if (isCollectTop(person, building)) {
                // 位置修补
                person.y = building.y + building.h;
                person.isAbleDoTop = false;
                
                if(person.personType !== 'base') {
                    // 建筑爆炸
                    building.isBorn = true;
                }
                this.handleBuildingHorn(building);
            }

            // 踩到墙
            if (isCollectBottom(person, building)) {
                // 位置修补
                person.y = building.y - person.h;
                person._jumpOffset = 0;
                person.vy = 0;
                person.isAbleDoTop = true;
            }

        }
    }

    // 处理被顶到的建筑
    handleBuildingHorn(building) {
        if (building.type === 'building-Ask') {
            // 对应道具出现
            const sprite = this.unstableSprites[building.x + ',' + building.y];
            if (sprite && !sprite.isAppear) {
                sprite.isAppear = true;
                this.dynamicSprites.push(sprite);
                delete this.unstableSprites[building.x + ',' + building.y];
            }
        }
        building.horn();
    }

    // 子弹碰撞
    handleBulletCollectBuilding(bullet, building) {

        if (
            building.type === 'building-Gold' ||
            building.type === 'building-Flow'
        ) {
            return;
        }

        // y轴碰撞，vy取反
        if (isCollectTopBottom(bullet, building)) {
            if (isCollectTop(bullet, building)) {
                bullet.y = building.y + building.h;
                bullet.isDoTop = false;
                bullet.isAbleDoTop = false;
            }
            if (isCollectBottom(bullet, building)) {
                bullet.y = building.y - bullet.h;
                bullet.isDoTop = true;
                bullet.isAbleDoTop = true;
                bullet._jumpOffset = 0;
            }
        }

        // x轴碰撞消失
        if (isCollectLeftRight(bullet, building)) {
            if (isCollectLeft(bullet, building)) {
                bullet.x = building.x + building.w;
            }
            if (isCollectRight(bullet, building)) {
                bullet.x = building.x - bullet.w;
            }
            bullet.vx = 0;
            bullet.vy = 0;
            bullet.remove();
        }
    }

    // 蘑菇碰撞
    handleMushroomCollectBuilding(mushroom, building) {
        if (
            building.type === 'building-Gold' ||
            building.type === 'building-Flow'
        ) {
            return;
        }

        // 垂直方向撞墙
        if (isCollectTopBottom(mushroom, building)) {

            // 顶到墙
            if (isCollectTop(mushroom, building)) {
                // 位置修补
                mushroom.y = building.y + building.h;
            }

            // 踩到墙
            if (isCollectBottom(mushroom, building)) {
                // 位置修补
                mushroom.y = building.y - building.h;
                mushroom.vy = 0;
            }
            
        }

        if (isCollectLeftRight(mushroom, building)) {
            // 反方向走
            mushroom.vx = -mushroom.vx;
        }
    }

    // 处理动态精灵和动态精灵
    handleDynamicSpriteAndDynamicSprite(dynamicSprite, dynamicSprites) {
        for (let j = 0; j < dynamicSprites.length; j++) {
            const dynamicSpriteOther = dynamicSprites[j];

            if (
                !this.camera.isInView(dynamicSpriteOther) ||
                dynamicSprite === dynamicSpriteOther
            ) continue;

            // 人物和其他动态精灵交互
            if (dynamicSprite.type === 'person') {
                const person = dynamicSprite;
                if (isCollection(person, dynamicSpriteOther)) {
                    // 对敌人蘑菇处理
                    if (dynamicSpriteOther.type === 'mushroom-Bad') {
                        if (isCollectBottom(person, dynamicSpriteOther)) {
                            person.y -= 20;
                            dynamicSpriteOther.death();
                        }
                        else {
                            person.shrink();
                        }
                    }

                    // 对成长蘑菇处理
                    if (dynamicSpriteOther.type === 'mushroom-Grow' && dynamicSpriteOther.ablePhysical) {
                        person.growToBig();
                        dynamicSpriteOther.remove();
                    }
                }
            }

            if (dynamicSprite.type === 'bullet') {
                const bullet = dynamicSprite;
                if (isCollection(bullet, dynamicSpriteOther)) {
                    if (dynamicSpriteOther.type === 'mushroom-Bad') {
                        dynamicSpriteOther.remove();
                        dynamicSprite.remove();
                    }
                }
            }
        }        
    }

    // 清空物理引擎
    clear() {
        this.staticSprites = {};
        this.unstableSprites = {};
        this.dynamicSprites = [];
    }

    // 运行物理引擎
    run() {
        const staticSprites = this.staticSprites;
        const dynamicSprites = this.dynamicSprites;

        for (let i = 0; i < dynamicSprites.length; i++) {
            const dynamicSprite = dynamicSprites[i];
            
            // 移除精灵
            if (dynamicSprite.isRemoveBefore || dynamicSprite.isRemove) {
                this.removeDynamicSprite(dynamicSprite);
                i--;
                continue;
            }

            // 跳过不受物理效果影响的精灵
            if (!dynamicSprite.ablePhysical) {
                continue;
            }

            // 动态精灵和静态精灵之间
            this.handleDynamicSpriteAndStaticSprite(dynamicSprite, staticSprites);

            // 动态精灵和动态精灵之间
            this.handleDynamicSpriteAndDynamicSprite(dynamicSprite, dynamicSprites);
            
        }
    }
}