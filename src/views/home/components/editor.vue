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
        camera: {
            type: Object,
            default: null
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
            gameImages: null,
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
            const toolType = this.currentTool.type

            // 解析数据
            const type = toolType.split('-')[0] === 'mushroom' ? 'mushroomData' : 'mapData';

            const data = {
                type: toolType,
                x: this.camera.x + grid.x,
                y: this.camera.y + grid.y
            };
            this.maps[this.mapActive][type].push(data);
            this.$emit('edit', data);
        },

        // 开始游戏
        start() {
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