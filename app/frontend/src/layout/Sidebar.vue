<script setup lang="ts">
import { useRouter } from 'vue-router';


const main_menu_items = [
    {
        name: "Home",
        icon: "home",
        link: "/"
    },
    {
        name: "Projects",
        icon: "folder",
        link: "/projects"
    },
    {
        name: "Library",
        icon: "book",
        link: "/library"
    },
]

const router = useRouter()

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
            <div class="sidebar-main-menu-item" v-for="item, index in main_menu_items" :key="index"
                @click="router.push(item.link)">
                {{ item.name }}
            </div>
        </nav>
        <footer class="sidebar-footer">
            <div class="sidebar-footer-vip sidebar-footer-item">
                VIP
            </div>
            <div class="sidebar-footer-settings sidebar-footer-item">
                Settings
            </div>
        </footer>
    </div>
</template>

<style lang="scss">
.sidebar {
    width: 10rem;
    height: 100%;
    background: rgba(255, 255, 255, 0.75); // 半透明背景
    backdrop-filter: blur(1rem); // 背景模糊效果

    &-header {
        height: 3rem;
        padding: .5rem 1rem;
        border-bottom: 1px solid #e1e1e1;
        font-size: 1.25rem;
    }

    &-main {
        padding: .5rem;
        height:calc(100vh - 10rem);
        &-menu-item {
            display: flex;
            align-items: center;
            padding: .5rem;
            margin: .5rem 0;
            border-radius: 5px;
            transition: all .2s ease-in-out;
            cursor: pointer;

            &:hover {
                background: #efefef;
            }
        }
    }

    &-footer {
        padding: .5rem 1rem;
        border-top: 1px solid #e1e1e1;
        bottom:0;

        &-item {
            display: flex;
            align-items: center;
            padding: .5rem;
            border-radius: 5px;
            transition: all .2s ease-in-out;
            cursor: pointer;

            &:hover {
                background: #efefef;
            }
        }
    }
}
</style>