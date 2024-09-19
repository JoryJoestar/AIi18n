<script lang="ts" setup>
import { ref } from 'vue';

import SettingsModel from '@/components/settings/SettingsModel.vue';
import SettingsGeneral from '@/components/settings/SettingGeneral.vue';
import { useAppStore } from '~/stores/appStore';

const appStore = useAppStore();

const component = ref<any>(SettingsGeneral);
const switchComponent = (tab: string) => {
    if (tab === 'general') {
        component.value = SettingsGeneral;
    } else if (tab === 'model') {
        component.value = SettingsModel;
    }
};

</script>

<template>
    <div class="settings">
        <div class="settings-bg"></div>
        <div class="settings-body">
            <div class="settings-body-sidebar">
                <div class="settings-body-sidebar-header"></div>
                <div class="settings-body-sidebar-main">

                </div>
            </div>
            <div class="settings-body-main">
                <Transition name="fade" mode="out-in">
                    <KeepAlive>
                        <component :is="component" />
                    </KeepAlive>
                </Transition>
            </div>
            <div class="settings-close" @click="appStore.settingsSwitch = false">X</div>
        </div>
    </div>
</template>

<style lang="scss">
.settings {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    &-bg {
        position: relative;
        width: 100%;
        height: 100%;
        background-color: rgb(0, 0, 0, .5);
        z-index: 1;
    }

    &-body {
        $size: 10rem;
        padding: .75rem;
        position: absolute;
        z-index: 2;
        border-radius: .5rem;
        width: calc(4 * $size);
        height: calc(3 * $size);
        background-color: white;
        border: 1px solid beige;
    }

    &-close {
        position: absolute;
        right: .75rem;
        top: .75rem;
        padding: .15rem .75rem;
        transition: all .15s ease-in-out;
        border-radius: .5rem;
        cursor: pointer;
    }

    &-close:hover {
        color: white;
        background-color: rgba(0, 0, 0, 0.75);
    }

}
</style>