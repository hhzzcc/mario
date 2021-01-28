<template>
    <div class="editor-content">
        <div v-if="isLoaded">
            <div class="editor-content__game">
                <span @click="$emit('page-prev')" v-if="isOpenEditor">←<div>相机左移</div></span>

                <div class="editor-content__canvas">
                    <slot></slot>
                    <div class="editor-content__fps" v-if="fps">fps: {{ fps }}</div>
                    <Grids
                        v-if="gridWidth && isOpenEditor"
                        :width="gridWidth"
                        :height="gridHeight"
                        :unit="gridUnit"
                        @change="v => $emit('change-grid', v)"
                    />
                </div>

                <span @click="$emit('page-next')" v-if="isOpenEditor">→<div>相机右移</div></span>
            </div>
            <div class="editor-content__tip" :style="{ paddingLeft: isOpenEditor ? '90px' : null }">
                键盘操作：上下左右控制&nbsp;&nbsp;空格发射子弹
            </div>
            <Tools
                v-if="tools.length && isOpenEditor"
                :tools="tools"
                @change="v => $emit('change-tool', v)"/>
        </div>
        <Icon name="iconloading-copy" v-else/>
    </div>
</template>

<script>
import Icon from '@/components/icon';

import Grids from './grids';
import Tools from './tools';

export default ({
    name: 'editor-content',
    components: {
        Icon,
        Grids,
        Tools
    },
    props: {
        isLoaded: {
            type: Boolean,
            default: false
        },
        gridWidth: {
            type: Number,
            default: 0
        },
        gridHeight: {
            type: Number,
            default: 0
        },
        gridUnit: {
            type: Number,
            default: 0
        },
        fps: {
            type: Number,
            default: 60
        },
        tools: {
            type: Array,
            default: () => []
        },
        isOpenEditor: {
            type: Boolean,
            default: true
        }
    }
});
</script>

<style lang="less">
.editor-content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(100% - 228px);
    height: calc(100vh - 62px);
    margin-left: 228px;
    margin-top: 62px;
    padding-bottom: 50px;
    z-index: 8;
    background: #eef2f8;
    border-radius: 4px;

    >div {
        border-radius: 4px;
        overflow: hidden;
    }

    &__game {
        display: flex;
        align-items: center;
        border-radius: 4px;
        overflow: hidden;

        >span {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 5px;
            margin: 0 8px;
            background-color: #2254f4;
            color: #fff;
            cursor: pointer;
            border-radius: 4px;
            transition: opacity .2s;
            &:hover {
                opacity: .6;
            }
        }
    }

    &__tip {
        padding-top: 8px;
        color: #33383e;
        font-weight: bold;
    }

    &__canvas {
        position: relative;
        width: 800px;
    }

    &__fps {
        position: absolute;
        top: 5px;
        right: 5px;
        color: #33383e;
        font-size: 12px;
        font-weight: bold;
    }

    .icon {
        font-size: 60px;
        animation: icon-rotation 1s infinite linear;
    }

    @keyframes icon-rotation {
        100% {
            transform: rotate(360deg);
        }
    }
}
</style>