<script lang="ts" setup>

import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useProjectsStore } from '~/stores/projectsStore'; // 导入项目 store

const route = useRoute();

const projectsStore = useProjectsStore(); // 创建项目 store 实例

const backendURL = ref()

const addProject = async () => {
    // const newProject = {
    //     id: Date.now(), // 使用当前时间戳作为项目 ID
    //     name: `Project ${projectsStore.projects.length + 1}`, // 项目名称
    //     // 其他项目属性可以在这里添加
    // };
    // projectsStore.addProject(newProject); // 调用 store 方法添加项目

    // @ts-ignore
    backendURL.value = await window.electronAPI.getBackendUrl();
};

</script>

<template>
    <div class="projects">
        {{ backendURL }}
        <nav class="projects-sidebar">
            <ProjectsSidebar></ProjectsSidebar>
        </nav>
        <header class="translate-header">
            <div class="translate-header-title">
                Projects
            </div>
            <div class="translate-header-breadcrumb">

            </div>
        </header>
        <main class="projects-main">
            <button @click="addProject" class="add-project-button">新增项目</button> <!-- 新增项目按钮 -->
        </main>
    </div>
</template>

<style lang="scss" scoped>
.projects {
    padding: 1rem;

    &-header {
        height: 4rem;

        &-title {
            font-size: .9rem;
        }
    }

    &-main {}
}
</style>