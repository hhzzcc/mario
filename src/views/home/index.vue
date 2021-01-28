<template>
    <div class="home">
        <Editor
            :camera="camera"
            :fps="fps"
            :loaded="ableLoadedEditor"
            @load="handleLoad"
            @start="handleStart"
            @edit-start="handleEditStart"
            @edit="handleEdit"
            @edit-end="handleEditEnd"
            @page-prev="handlePagePrev"
            @page-next="handlePageNext"
        />
        <!-- <Icon name="iconloading-copy"/> -->
    </div>
</template>

<script>
import { Camera } from '@/mario/web2d/camera';
import { Scene } from '@/mario/web2d/scene';
import { Renderer } from '@/mario/web2d/renderer';

import { Person } from '@/mario/game/js/person';
import { Physical } from '@/mario/game/js/physical';

import { addKeyEvent } from '@/mario/game/utils/key-event';
import { createMap } from '@/mario/game/utils/create-map';
import { createMushroomBad, createMushroomGrow } from '@/mario/game/utils/create-mushroom';

import { baseData } from '@/mario/game/data/base';

import Editor from './components/editor';

export default ({
    name: 'home',
    components: {
        Editor
    },
    data() {
        return {
            person: null,
            camera: null,
            scene: null,
            physical: null,
            renderer: null,
            images: null,
            canvas: null,

            // 游戏是否启动
            ableStartGame: true,
            // 人物是否出现
            ableVisiblePerson: true,
            // 编辑器是否加载完成
            ableLoadedEditor: false,

            fps: 60,
            fpsCount: 0,
        };
    },
    methods: {
        // 编辑器加载完
        handleLoad({ images, map, canvas }) {
            // 绑定图片资源
            this.images = images;
            // 绑定canvas
            this.canvas = canvas;
            // 初始化人物
            this.person = this.initPerson();
            // 初始化相机
            this.camera = this.initCamera();
            // 初始化场景
            this.scene = this.initScene();
             // 初始化物理引擎
            this.physical = this.initPhysical();
            // 初始化物理引擎
            this.renderer = this.initRenderer();
            // 初始化完毕，开始游戏
            this.handleStart(map);
        },

        // 开始游戏
        handleStart(map) {
            this.clear();
            const sprites = this.createSprites(map);
            this.sceneAddSprite(sprites);
            this.physicalAddSprite(sprites);
            this.reRender();
        },

        // 开始编辑
        handleEditStart() {
            this.camera.x = 0;
            this.ableVisiblePerson = false;
        },

        // 网格编辑
        handleEdit(data) {
            const { images } = this;
            const sprites = {
                buildings: [],
                mushroomsBad: [],
                mushroomsGrow: []
            };

            if (data.type.includes('building')) {
                sprites.buildings = createMap(images, [data]);
                if (data.type.includes('Ask')) {
                    sprites.mushroomsGrow = createMushroomGrow(sprites.buildings, images);
                }
            }

            if (data.type.includes('mushroom')) {
                sprites.mushroomsBad = createMushroomBad(images, [data]);
            }

            this.sceneAddSprite(sprites, false);
            this.physicalAddSprite(sprites, false);
        },

        // 结束编辑
        handleEditEnd() {
            this.ableVisiblePerson = true;
        },

        handlePagePrev() {
            this.camera.x = Math.max(this.camera.x - this.camera.w, 0);
        },

        handlePageNext() {
            this.camera.x = Math.min(this.camera.x + this.camera.w, this.scene.w - this.camera.w)
        },

        // 初始化人物
        initPerson() {
            const { images } = this;
            const person = new Person({
                allImages: images.person,
                x: baseData.personOffset,
                y: 0,
            });
            addKeyEvent(person);
            return person;
        },

        // 初始化相机
        initCamera() {
            return new Camera({
                x: 0,
                y: 0,
                w: this.canvas.width,
                h: this.canvas.height
            });
        },

        // 初始化场景
        initScene() {
            const { images } = this;
            return new Scene({
                w: images.scene.sceneBackground[0].width * 2,
                h: images.scene.sceneBackground[0].height,
                backgroundImage: images.scene.sceneBackground[0]
            });
        },

        // 初始化物理引擎
        initPhysical() {
            const { scene, camera } = this;
            return new Physical({ scene, camera });
        },

        // 初始化渲染器
        initRenderer() {
            const { canvas, camera, scene, physical } = this;
            return new Renderer({ canvas, camera, scene, physical });
        },

        // 创建精灵
        createSprites({ mapData, mushroomData }) {
            const { images } = this;
            const buildings = createMap(images, mapData);
            const mushroomsBad = createMushroomBad(images, mushroomData);
            const mushroomsGrow = createMushroomGrow(buildings, images);

            return {
                buildings,
                mushroomsBad,
                mushroomsGrow
            };
        },

        // 向场景中添加精灵
        sceneAddSprite(sprites, ablePerson = true) {
            const { buildings, mushroomsBad, mushroomsGrow } = sprites;
             this.scene.add([
                ...Object.values(mushroomsGrow),
                ...Object.values(buildings),
                ...mushroomsBad,
                ablePerson && this.person
            ]);
        },

        // 向物理引擎中添加精灵
        physicalAddSprite(sprites, ablePerson = true) {
            const { buildings, mushroomsBad, mushroomsGrow } = sprites;
            // 添加动态精灵
            this.physical.addDynamicSprite([
                ablePerson && this.person,
                ...mushroomsBad
            ]);
            // 添加静态精灵
            this.physical.addStaticSprite(buildings);
            // 添加不稳定精灵
            this.physical.addUnstableSprite(mushroomsGrow);
        },

        // 重置游戏
        clear() {
            clearTimeout(this.timmer);
            this.physical.clear();
            this.scene.clear();
            this.person.clear();
        },

        // 重启渲染
        reRender() {
            this.ableStartGame = false;
            this.timmer = setTimeout(() => {
                this.ableStartGame = true;
                this.render();
            }, 100);
        },

        // 渲染画面
        render() {
            if (this.ableVisiblePerson) {
                this.camera.x = Math.max(this.person.x - baseData.personOffset, 0);
            }
            this.physical.run();
            this.renderer.render();
            this.fpsCount ++;
            if (!this.prevTimmer || Date.now() - this.prevTimmer >= 1000) {
                this.fps = this.fpsCount;
                this.fpsCount = 0;
                this.prevTimmer = Date.now();
            }
            this.ableStartGame && requestAnimationFrame(this.render);
        }
    }
});
</script>

<style lang="less">
.home {
}
</style>