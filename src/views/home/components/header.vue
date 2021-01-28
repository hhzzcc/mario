<template>
    <div class="editor-header">
        <div class="editor-header__logo">超级玛丽游戏编辑器</div>
        <div class="editor-header__edit" @click="handleEdit">
            <Icon name="iconbianjibi"/>
            {{ isOpenEditor ? '编辑结束' : '开始编辑' }}
        </div>
    </div>
</template>

<script>
import Icon from '@/components/icon';

export default ({
    name: 'editor-header',
    components: {
        Icon
    },
    props: {
        isOpenEditor: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            isEdit: false
        };
    },
    methods: {
        handleEdit() {
            this.isOpenEditor ? this.$emit('edit-end') : this.$emit('edit-start');
            this.$emit('update:isOpenEditor', !this.isOpenEditor)
        }
    }
});
</script>

<style lang="less">
.editor-header {
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 54px;
    padding: 0 20px;
    font-size: 16px;
    letter-spacing: 4px;
    background: #fff;
    z-index: 9;
    &__logo {
        font-weight: bold;
    }

    &__edit {
        display: flex;
        align-items: center;
        margin-left: 30px;
        color: #33383e;
        font-size: 12px;
        font-weight: bold;
        cursor: pointer;
        &:hover {
            color: #2254f4;
        }

        .icon {
            font-size: 20px;
            margin-right: 4px;
        }
    }
}
</style>