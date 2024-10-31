<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAppStore } from '~/stores/appStore';
import { useProjectsStore } from '~/stores/projectsStore';

const appStore = useAppStore();

const projectsStore = useProjectsStore();

const main_menu_items = [
    {
        name: "Translate",
        icon: "translate",
        link: "/"
    },
    {
        name: "Projects",
        icon: "folder",
        link: "/projects"
    },
    {
        name: "Tools",
        icon: "book",
        link: "/tools"
    },
    {
        name: "Library",
        icon: "book",
        link: "/library"
    },
]

const route = useRoute()
const router = useRouter()

const routeTo = (item: any) => {
    router.push(item.link)
}

</script>

<template>
    <div class="sidebar">
        <header class="sidebar-header">
            <div class="sidebar-header-title">
                AIi18n
            </div>
            <div class="sidebar-header-toggle">

            </div>
        </header>
        <nav class="sidebar-main">
            <div :class="{ 'active': route.path === item.link || (route.name === 'projectDetails' && item.link === '/projects') }"
                class="sidebar-main-menu-item" v-for="item, index in main_menu_items" :key="index"
                @click="routeTo(item)">
                {{ item.name }}
            </div>
        </nav>
        <footer class="sidebar-footer">
            <div class="sidebar-footer-settings sidebar-footer-item" @click="appStore.settingsSwitch = true">
                Settings
            </div>
        </footer>
    </div>
</template>

<style lang="scss">
.sidebar {
    position: fixed;
    width: 15vw;
    min-width: 10rem;
    max-width: 12rem;
    height: 100%;
    background: rgba(255, 255, 255, 0.75); // 半透明背景
    backdrop-filter: blur(1rem); // 背景模糊效果
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-right: 1px solid #e1e1e1;

    &-header {
        height: 4rem;
        padding: .75rem 1rem;
        font-size: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: start;
    }

    &-main {
        flex: 1;
        padding: .5rem;

        &-menu-item {
            display: flex;
            align-items: center;
            padding: .5rem .75rem;
            margin: .25rem 0;
            border-radius: 5px;
            transition: all .15s ease-in-out;
            cursor: pointer;

            &:hover {
                background: #efefef;
            }
        }

        &-menu-item.active {
            background: #555555;
            color: white;
        }
    }

    &-footer {
        padding: .5rem;
        z-index: 100;

        &-item {
            width: 100%;
            display: flex;
            align-items: center;
            padding: .5rem .75rem;
            border-radius: 5px;
            transition: all .15s ease-in-out;
            cursor: pointer;

            &:hover {
                background: #efefef;
            }
        }
    }
}
</style>