export class Renderer {
    constructor(options) {
        const { canvas, camera, scene, physical } = options;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');

        this.camera = camera;
        this.scene = scene;
        this.physical = physical;

        // 离屏canvas
        this.screenCanvas = document.createElement('canvas');
        this.screenCanvas.width = scene.w;
        this.screenCanvas.height = scene.h;
        this.screenCtx = this.screenCanvas.getContext('2d');
    }

    // 渲染相机视角
    renderCamera(camera, scene, screenCtx) {
        const reCount = ~~(camera.x / camera.w);
        screenCtx.drawImage(scene.backgroundImage, 0, 0, camera.w, camera.h, reCount * camera.w, 0, camera.w, camera.h);
        screenCtx.drawImage(scene.backgroundImage, 0, 0, camera.w, camera.h, (reCount + 1) * camera.w, 0, camera.w, camera.h);
    }

    // 渲染场景内精灵
    renderScene(camera, scene, physical, screenCtx) {
        const { sprites } = scene;
        for (let i = 0; i < sprites.length; i++) {
            const sprite = sprites[i];

            // 不在相机视野内，不渲染
            if (!camera.isInView(sprite)) {
                sprite.isOverflowRemove && sprite.remove();
                continue;
            }

            // 移除精灵，不渲染
            if (sprite.isRemove) {
                scene.remove(sprite);
                i--;
                continue;
            }

            // 执行帧循环回调
            sprite.frameWorkCallback(scene, camera, physical);

            // 运行精灵返回渲染参数
            const { w, h, x, y, image } = sprite.run();
            
            if (sprite.isCrop) {
                // 裁剪后渲染精灵
                screenCtx.drawImage(image, 0, 0, w, h, x, y, w, h);
            }
            else {
                // 渲染精灵
                screenCtx.drawImage(image, x, y, w, h);
            }
        }
    }

    // 渲染画布
    renderCanvas(camera, ctx, screenCanvas) {
        const { x, y, w, h } = camera;
        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(screenCanvas, x, y, w, h, 0, 0, w, h);
    }

    // 渲染
    render() {
        const { camera, scene, physical, screenCanvas, screenCtx, ctx } = this;

        // 渲染相机视角
        this.renderCamera(camera, scene, screenCtx);

        // 渲染场景内精灵
        this.renderScene(camera, scene, physical, screenCtx);

        // 渲染画布
        this.renderCanvas(camera, ctx, screenCanvas);
    }
};