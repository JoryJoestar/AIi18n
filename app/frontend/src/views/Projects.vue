<script lang="ts" setup>

import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { hello } from '~/apis/translate';
import { useProjectsStore } from '~/stores/projectsStore'; // 导入项目 store

const route = useRoute();

const projectsStore = useProjectsStore(); // 创建项目 store 实例

const messageVisible = ref(false);
const messageContent = ref(''); // 用于存储消息内容
const messageDuration = ref(0);
const messageType = ref<string>('info');
const messageCloseButtonVisible = ref<boolean>(false);

const showMessage = (msg: string, duration: number, type: string) => {
    messageContent.value = msg;
    messageDuration.value = duration;
    messageType.value = type;
    messageVisible.value = true;
    messageCloseButtonVisible.value = false;
};

const addProject = async () => {
    // const newProject = {
    //     id: Date.now(), // 使用当前时间戳作为项目 ID
    //     name: `Project ${projectsStore.projects.length + 1}`, // 项目名称
    //     // 其他项目属性可以在这里添加
    // };
    // projectsStore.addProject(newProject); // 调用 store 方法添加项目

    hello().then(res => {
        console.log(res)
        showMessage(`success`, 1500, 'success'); // 显示失败消息
    }).catch((err) => {
        console.error('Translation error:', err); // 添加错误日志
        showMessage(`Translation failed!\n${err}`, 1500, 'error'); // 显示失败消息
    });

};

</script>

<template>
    <div class="projects">
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

        <Message v-if="messageVisible" :message="messageContent" :type="messageType" :duration="messageDuration"
            :close-button-visible="messageCloseButtonVisible" @close="messageVisible = false" />
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