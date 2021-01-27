<template>
    <div :class="className">
        <div class="'map__title">{{ map.title }}</div>
    </div>
</template>

<script>
export default ({
    name: 'editor-map',
    props: {
        map: {
            type: Object,
            default: () => ({})
        },
        active: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        className() {
            const className = 'map';
            return this.active ? className + ' map--active' : className;
        }
    }
});
</script>

<style lang="less">
.map {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 200px;
    height: 120px;
    border-radius: 4px;
    cursor: pointer;
    box-shadow: 0 0 0 1px #e8eaec;
    color: #333;
    transition: background-color .2s;

    &:hover, &--active {
        background-color: #2254f4;
        color: #fff;
    }

    &__title {
        font-size: 20px;
    }
}
</style>