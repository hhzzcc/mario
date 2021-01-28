<template>
    <div :class="className">
        <div class="'map__title">{{ map.title }}</div>
        <Icon
            name="iconshanchu"
            @click.native.stop="$emit('delete')"
            v-if="ableDelete"
        />
    </div>
</template>

<script>
import Icon from '@/components/icon';

export default ({
    name: 'editor-map',
    components: {
        Icon
    },
    props: {
        map: {
            type: Object,
            default: () => ({})
        },
        active: {
            type: Boolean,
            default: false
        },
        ableDelete: {
            type: Boolean,
            default: true
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
    transition: all .2s;

    .icon {
        position: absolute;
        top: 4px;
        right: 4px;
        color: #2254f4;
        font-size: 20px;
    }

    &:hover {
        box-shadow: 0 0 0 1px #2254f4;
        color: #2254f4;
        .icon {
            color: #2254f4;
        }
    }

    &--active {
        background-color: #2254f4;
        color: #fff;
        .icon {
            color: #fff;
        }
        
        &:hover {
            background-color: #2254f4;
            color: #fff;
            .icon {
                color: #fff;
            }
        }
    }

    &__title {
        font-size: 20px;
    }
}
</style>