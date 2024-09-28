<script lang="ts" setup>

import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProjectsStore } from '~/stores/projectsStore'; // 导入项目 store
import { generateUniqueId } from '~/utils/uuid';

const route = useRoute();
const router = useRouter();

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

const newProject = () => {
    const project_uuid = generateUniqueId();
    const newProject: ProjectItem = {
        id: `P${project_uuid}`,
        name: `新建项目`,
        data: [],
        description: '',
        createdAt: new Date(),
    };
    projectsStore.addProject(newProject); // 调用 store 方法添加项目

    // 跳转到对应的 projectDetails 页面
    router.push({ name: 'projectDetails', params: { id: newProject.id } }); // 跳转到项目详情

};

</script>

<template>
    <div class="projects">
        <header class="projects-header">
            <div class="projects-header-title">
                Projects
            </div>

        </header>
        <main class="projects-main">
            <div class="projects-main-header">
                <div class="projects-main-header-search">
                    Search
                </div>
                <div class="projects-main-header-controls">
                    <button @click="newProject" class="add-project-button">New</button>
                </div>
            </div>
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

    &-main {
        &-header {
            display: flex;
            align-items: center;
            justify-content: space-between;

            &-breadcrumb {
                font-size: .9rem;
            }

            &-controls {
                .add-project-button {
                    font-size: 1rem;
                    padding: .5rem 1rem;
                    width: 5rem;
                    height: 2.3rem;
                    background-color: rgba(0, 0, 0, 0.7);
                    border-radius: .5rem;
                    color: white;
                    cursor: pointer;
                    transition: all .15s ease-in-out;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }
        }
    }
}
</style>