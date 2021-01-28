<template>
    <div class="editor-tools">
        <div class="editor-tools__tip">小提示：点击下方精灵后点击上方网格可添加</div>
        <div class="editor-tools__content">
            <img
                v-for="(tool, i) in tools"
                :key="i"
                :src="tool.image.src"
                @click="handleClick(tool)"
                class="editor-tools__tool"/>
        </div>
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
    flex-direction: column;
    align-items: center;
    position: relative;
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

    &__content {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
    }

    &__tip {
        padding: 2px 5px;
        color: #33383e;
        font-weight: bold;
        font-size: 12px;
        background: #fff;
        border-radius: 2px;
    }

}
</style>