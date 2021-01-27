<template>
    <div class="editor-tools">
        <img
            v-for="(tool, i) in tools"
            :key="i"
            :src="tool.image.src"
            @click="handleClick(tool)"
            class="editor-tools__tool"/>
    </div>
</template>

<script>
export default ({
    name: 'editor-tools',
    props: {
        tools: {
            type: Array,
            default: () => []
        },
    },
    methods: {
        handleClick(tool) {
            this.$el.parentElement.style.cursor = `url(${tool.image.src}), pointer`;
            this.$emit('change', tool);
        }
    }
});
</script>

<style lang="less">
.editor-tools {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    padding: 20px;
    background-image: linear-gradient(to top right,#ccc 25%,transparent 0,transparent 75%,#ccc 0,#ccc),linear-gradient(to top right,#ccc 25%,transparent 0,transparent 75%,#ccc 0,#ccc);
    background-size: 12px 12px;
    background-position: 0 0,6px 6px;

    &__tool {
        width: 32px;
        height: 32px;
        margin-left: 20px;
        cursor: pointer;
    }
}
</style>