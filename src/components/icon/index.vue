<template>
    <svg class="icon"><use :xlink:href="'#' + name"/></svg>
</template>

<script>

export default {
    name: 'icon',
    props: {
        name: {
            type: String,
            required: true,
        },
    },
};
</script>
<style lang="less">
.icon {
    display: inline-block;
    width: 1em;
    height: 1em;
    fill: currentColor;
    overflow: hidden;
    font-size: 24px;
}
</style>
