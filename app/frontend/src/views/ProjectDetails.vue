<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProjectsStore } from '~/stores/projectsStore';

const route = useRoute();
const router = useRouter();

const projectsStore = useProjectsStore();

// 获取 URL 上的 ID
const projectId = computed(() => {
    return route.params.id; // 假设 ID 在路由参数中
});

// 根据 ID 获取当前项目的信息
const getProjectsInfo = computed(() => {
    return projectsStore.projects.find(project => project.id === projectId.value);
});

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

onMounted(() => {
    
})

</script>

<template>
    <div class="projectDetails">
        <nav class="projectDetails-sidebar">
            <ProjectDetailsSidebar></ProjectDetailsSidebar>
        </nav>
        <div class="projectDetails-body">
            <header class="projectDetails-body-header">
                <div class="projectDetails-body-header-left">
                    <div class="projectDetails-body-header-left-upload-translate">
                        UPLOAD
                    </div>
                </div>
                <div class="projectDetails-body-header-name">
                    {{ getProjectsInfo?.name }}
                </div>
                <div class="projectDetail-body-header-right">
                    <div class="projectDetails-body-header-right-download-translate">
                        DOWNLOAD
                    </div>
                </div>
            </header>
            <main class="projectDetails-body-main">
                
            </main>
        </div>

        <Message v-if="messageVisible" :message="messageContent" :type="messageType" :duration="messageDuration"
            :close-button-visible="messageCloseButtonVisible" @close="messageVisible = false" />
    </div>
</template>

<style lang="scss">
.projectDetails {
    height: 100%;
    display: flex;

    &-sidebar {
        height: 100%;
    }

    &-body {
        padding: .5rem 1rem;
        flex: 1;
        height: 100%;

        &-header {
            display: flex;
            justify-content: space-between;
            align-items: center;

            &-name {
                font-size: 1.25rem;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                transition: all .15s ease-in-out;
            }

            &-name:hover {
                color: green;
            }

            &-name::after {
                content: '';
                display: inline-block;
                width: 0;
                height: 0;
                border-left: 5px solid transparent;
                /* 左边透明 */
                border-right: 5px solid transparent;
                /* 右边透明 */
                border-top: 5px solid black;
                /* 向下的三角形颜色 */
                margin-left: 5px;
                /* 三角形与文本的间距 */
            }

            &-left {

                &-upload-translate {
                    cursor: pointer;
                }
            }

            &-right {
                &-download-translate {
                    cursor: pointer;
                }
            }
        }



        &-main {}
    }

}
</style>