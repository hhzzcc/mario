import { Building, BuildingBorn } from './index.js';

export class BuildingStone extends Building {
    constructor(options) {
        super(options);
        this.type = 'building-Land';
    }

    // 处理爆炸
    handleBorn(scene) {
        if (this.isBorn && this.ableBorn) {
            this.remove();
            let { beginX, beginY ,w, h, images } = this;
            w /= 2;
            h /= 2;
            scene.add([
                new BuildingBorn({ x: beginX, y: beginY, w, h, images, index: 0 }),
                new BuildingBorn({ x: beginX + w, y: beginY, w, h, images, index: 1 }),
                new BuildingBorn({ x: beginX, y: beginY + h, w, h, images, index: 2 }),
                new BuildingBorn({ x: beginX + w, y: beginY + h, w, h, images, index: 3 }),
            ]);
            this.ableBorn = false;
        }
    }

    frameWorkCallback(scene, camera, physical) {
        super.frameWorkCallback(scene, camera, physical);
        this.handleBorn(scene);
    }
}