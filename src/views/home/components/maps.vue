<template>
    <div class="editor-maps">
        <Map
            v-for="(map, i) in maps"
            :key="map.name"
            :map="map"
            :active="i === active"
            :ableDelete="maps.length > 1"
            @click.native="$emit('change', { map, i })"
            @delete="$emit('delete', { map, i })"
        />
        <Map
            :map="{ title: '添加地图' }"
            :ableDelete="false"
            @click.native="$emit('add')"
        />
    </div>
</template>

<script>
import Map from './map';

export default ({
   name: 'editor-maps' ,
    components: {
        Map
    },
    props: {
        active: {
            type: Number,
            default: 0
        },
        maps: {
            type: Array,
            default: () => []
        }
    }
});
</script>

<style lang="less">
.editor-maps {
    position: fixed;
    left: 0;
    top: 54px;
    height: calc(100vh - 54px);
    padding: 8px 8px 8px 20px;
    overflow: auto;
    z-index: 9;
    background-color: #fff;
    >div {
        margin-top: 8px;

        &:first-of-type {
            margin-top: 0;
        }
    }
}
</style>