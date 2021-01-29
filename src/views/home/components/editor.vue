<template>
    <div class="editor">
        <Header
            @edit-start="handleEditStart"
            @edit-end="handleEditEnd"
            :isOpenEditor.sync="isOpenEditor"
        />
        <Maps
            :maps="maps"
            :active="mapActive"
            @change="handleActiveMap"
            @delete="handleDeleteMap"
            @add="handleAddMap"
        />

        <Content
            :fps="fps"
            :gridWidth="gridWidth"
            :gridHeight="gridHeight"
            :gridUnit="gridUnit"
            :tools="tools"
            :isOpenEditor.sync="isOpenEditor"
            :isLoaded="isLoaded"
            @page-prev="$emit('page-prev')"
            @page-next="$emit('page-next')"
            @change-grid="onChangeGrid"
            @change-tool="v => currentTool = v">
            <canvas
                width="800"
                height="480"
                ref="canvas" />
        </Content>
    </div>
</template>

<script>
import { level1, level2 } from '@/mario/game/data/levels';
import { initImages } from '@/mario/game/utils/init-image';
import { baseData } from '@/mario/game/data/base';
import { createMap } from '@/mario/game/utils/create-map';
import { createMushroomBad, createMushroomGrow } from '@/mario/game/utils/create-mushroom';

import Header from './header';
import Maps from './maps';
import Content from './content';

export default ({
    name: 'editor',
    components: {
        Header,
        Maps,
        Content,
    },
    props: {
        staticSprites: {
            type: Object,
            default: () => ({})
        },
        cameraX: {
            type: Number,
            default: 0
        },
        cameraY: {
            type: Number,
            default: 0
        },
        fps: {
            type: Number,
            default: 60
        }
    },
    data() {
        return {
            maps: [
                {
                    title: '地图1',
                    ...level1
                },
                {
                    title: '地图2',
                    ...level2
                }
            ],
            mapActive: 0,
            gridWidth: 0,
            gridHeight: 0,
            gridUnit: 0,
            currentTool: null,
            images: null,
            tools: [],
            isOpenEditor: false,
            // 加载完毕
            isLoaded: false,
        };
    },
    mounted() {
        console.log(level1);
        this.init();
    },
    methods: {
        async init() {
            const images = await initImages();
            this.images = images;
            this.isLoaded = true;

            this.$nextTick(() => {
                const canvas = this.$refs.canvas;
                // 网格
                this.gridWidth = canvas.width;
                this.gridHeight = canvas.height;
                this.gridUnit = baseData.unit;

                // 工具栏资源
                this.tools = [
                    { type: 'building-Stone', image:  images.building.buildingStone[0]},
                    { type: 'building-Ask', image:  images.building.buildingAsk[3]},
                    { type: 'building-Gold', image:  images.building.buildingGold[4]},
                    { type: 'building-Land', image:  images.building.buildingLand[0]},
                    { type: 'building-Rock', image:  images.building.buildingRock[0]},
                    { type: 'building-PipeLeft', image:  images.building.buildingPipeLeft[0]},
                    { type: 'building-PipeRight', image:  images.building.buildingPipeRight[0]},
                    { type: 'building-PipeTopLeft', image:  images.building.buildingPipeTopLeft[0]},
                    { type: 'building-PipeTopRight', image:  images.building.buildingPipeTopRight[0]},
                    { type: 'building-Win', image:  images.building.buildingWin[0]},
                    { type: 'mushroom-Bad', image:  images.mushroom.mushroomBad[0]},
                ];
                
                this.$emit('load', {
                    images,
                    map: this.maps[this.mapActive],
                    canvas
                });
            });
        },

        // 开始编辑
        handleEditStart() {
            this.$emit('edit-start');
            this.isOpenEditor = true;
        },

        // 结束编辑
        handleEditEnd() {
            this.$emit('edit-end');
            this.isOpenEditor = false;
        },

        // 切换地图
        handleActiveMap({ map, i }) {
            this.mapActive = i;
            this.start();
        },

        // 删除地图
        handleDeleteMap({ map, i }){
            this.maps.splice(i, 1);
            this.mapActive = Math.min(i, this.maps.length - 1);
            this.start();
        },

        // 添加地图
        handleAddMap() {
            this.maps.push({
                title: `地图${this.maps.length + 1}`,
                mapData: [],
                mushroomData: []
            });
            this.mapActive = this.maps.length - 1;
            this.start();
            this.handleEditStart();
        },

        // 点击网格
        onChangeGrid(grid) {
            if (!this.currentTool) return;
            // 解析数据
            const type = this.currentTool.type;
            const mapType = type.split('-')[0] === 'mushroom' ? 'mushroomData' : 'mapData';
            const currentResource = this.maps[this.mapActive][mapType];
            const data = {
                type,
                x: this.cameraX + grid.x,
                y: this.cameraY + grid.y
            };
            
            const sprites = this.createSprites(data);

            if (type === 'building-Win') {
                this.handleBuildingWin(sprites, currentResource, data);
            }
            currentResource.push(data);
            this.$emit('edit', sprites);
        },

        handleBuildingWin(sprites, currentResource, data) {
            let childrenSprites = [];
            const sprite = Object.values(sprites.buildings)[0];
            for (let i = data.y; i < this.gridHeight - data.y; i += baseData.unit) {
                const staticSprite = this.staticSprites[data.x + ',' + (data.y + i)];
                if (
                    staticSprite &&
                    (
                        staticSprite.type === 'building-Normal' ||
                        staticSprite.type === 'building-Ask' ||
                        staticSprite.type === 'building-Stone'
                    )
                ) {
                    childrenSprites = sprite.setRodCount(i / baseData.unit - 1);
                    break;
                }

                if (i === this.gridHeight - data.y - baseData.unit) {
                    childrenSprites = sprite.setRodCount(i / baseData.unit);
                }
            }
            for (let i = 0; i < childrenSprites.length; i++) {
                const childrenSprite = childrenSprites[i];
                currentResource.push({
                    type: 'building-WinRod',
                    x: childrenSprite.x,
                    y: childrenSprite.y
                });
            }
        },

        createSprites(data) {
            const { images } = this;
            const sprites = {
                buildings: {},
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

            return sprites;
        },

        // 开始游戏
        start() {
            console.log(this.maps[this.mapActive]);
            this.$emit('start', this.maps[this.mapActive]);
        }
    }
});
</script>

<style lang="less">
.editor {
    width: 100%;
}
</style>