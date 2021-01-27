<template>
    <div class="editor-grids">
        <div
            v-for="grid in grids"
            :key="grid.x + ',' + grid.y"
            :style="{
                width: unit + 'px',
                height: unit + 'px'
            }"
            @click="$emit('change', grid)"
            class="editor-grids__grid"/>
    </div>
</template>

<script>
export default ({
    name: 'editor-grids',
    props: {
        width: {
            type: Number,
            default: 0
        },
        height: {
            type: Number,
            default: 0
        },
        unit: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            grids: []
        };
    },
    mounted() {
        this.createGrid();
    },
    methods: {
        createGrid() {
            this.grids = [];
            for (let i = 0; i < this.height; i+= this.unit) {
                for (let j = 0; j < this.width; j+= this.unit) {
                    this.grids.push({
                        x: j,
                        y: i,
                        unit: this.unit
                    });
                }
            }
        }
    },
});
</script>

<style lang="less">
.editor-grids {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    &__grid {
        box-shadow: 0 0 0 0.5px #666;

        &:hover {
            background-color: #2254f4;
            opacity: .6;
        }
    }
}
</style>