<script lang="ts" setup>
import { onMounted, reactive, ref, shallowRef } from 'vue';

import SettingsModel from '@/components/settings/SettingsModel.vue';
import SettingsGeneral from '@/components/settings/SettingGeneral.vue';
import { useAppStore } from '~/stores/appStore';

const appStore = useAppStore();

const settingsTree = [
    {
        name: 'General',
        icon: 'general',
        component: SettingsGeneral
    },
    {
        name: 'Model',
        icon: 'model',
        component: SettingsModel
    }
]

const curSettings = ref<string>('General')
const component = shallowRef(SettingsGeneral);
const switchComponent = (item: any) => {
    curSettings.value = item.name;
    component.value = item.component;
};

const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
        appStore.settingsSwitch = false; // 按下 Esc 键时关闭设置界面
    }
};

onMounted(() => {
    window.addEventListener('keydown', handleKeydown);
    // 清理事件监听器
    return () => {
        window.removeEventListener('keydown', handleKeydown);
    };
});

</script>

<template>
    <div class="settings">
        <div class="settings-bg"></div>
        <div class="settings-body">
            <div class="settings-body-sidebar">
                <div class="settings-body-sidebar-header">
                    Settings
                </div>
                <div class="settings-body-sidebar-main">
                    <div :class="{ 'active': item.name === curSettings }" class="settings-body-sidebar-main-item"
                        v-for="item, index in settingsTree" :key="index" @click="switchComponent(item)">
                        {{ item.name }}
                    </div>
                </div>
            </div>
            <div class="settings-body-main">
                <Transition name="fade" mode="out-in">
                    <KeepAlive>
                        <component :is="component" />
                    </KeepAlive>
                </Transition>
            </div>
            <div class="settings-close" @click="appStore.settingsSwitch = false">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
                        fill="currentColor" />
                </svg>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.settings {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 998;

    &-bg {
        position: relative;
        width: 100%;
        height: 100%;
        background-color: rgb(0, 0, 0, .5);
        z-index: 998;
    }

    &-body {
        $size: 10rem;
        position: absolute;
        z-index: 999;
        border-radius: .5rem;
        width: calc(4 * $size);
        height: calc(3 * $size);
        background-color: white;
        display: flex;

        &-sidebar {
            padding: .75rem;
            width: 10rem;
            display: flex;
            flex-direction: column;
            border-right: 1px solid #e1e1e1;
            box-sizing: border-box;

            &-header {
                font-size: 1.25rem;
                margin-bottom: 1rem;
            }

            &-main {
                &-item {
                    margin: .25rem 0;
                    padding: .25rem .75rem;
                    border-radius: .25rem;
                    cursor: pointer;
                    transition: all .15s ease-in-out;

                    &:hover {
                        background: #efefef;
                    }
                }

                &-item.active {
                    color: white;
                    background: #555555;
                }

            }
        }

        &-main {
            flex: 1;
            padding: .75rem;
        }
    }

    &-close {
        position: absolute;
        right: .75rem;
        top: .75rem;
        padding: .5rem .75rem;
        transition: all .15s ease-in-out;
        border-radius: .5rem;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;

        svg {
            width: 1rem;
            height: 1rem;
        }

        &:hover {
            background: #efefef;
        }
    }
}
</style>