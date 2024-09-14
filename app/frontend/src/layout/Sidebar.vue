<script setup lang="ts">

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

</script>

<template>
    <nav class="sidebar">
        <div class="sidebar-header">
            <div class="sidebar-header-title">

            </div>
            <div class="sidebar-header-toggle">

            </div>
        </div>
        <div class="sidebar-main">
            <div class="sidebar-main-menu" v-for="item, index in main_menu_items" :key="index">
                <div class="sidebar-main-menu-item" :class="item.name">
                    {{ item.name }}
                </div>
            </div>
        </div>
        <div class="sidebar-footer">
            <div class="sidebar-footer-vip">
                
            </div>
            <div class="sidebar-footer-settings">

            </div>
        </div>
    </nav>
</template>

<style></style>