<script lang="ts" setup>
import { computed, onBeforeMount, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProjectsStore } from '~/stores/projectsStore';
import { get_project_by_id, get_project_item_by_id } from '~/apis/projects';

const route = useRoute();
const router = useRouter();

const projectsStore = useProjectsStore();


// 获取 URL 上的 ID
const projectId = computed(() => {
    return Number(route.params.id);
});

const getProject = () => {
    get_project_by_id(projectId.value).then((res: ResProject) => {
        projectsStore.project = res;
    }).catch(err => {
        showMessage(err.message, 3000, 'error');
    })
};

// 根据 ID 获取当前项目的信息
const getProjectItem = () => {
    get_project_item_by_id(projectId.value).then((res: ResProjectItem) => {
        projectsStore.projectItem = res;
    }).catch(err => {
        showMessage(err.message, 3000, 'error');
    })
};

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

onBeforeMount(() => {
    getProject()
    getProjectItem()
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
                        <ProjectUpload></ProjectUpload>
                    </div>
                </div>
                <div class="projectDetails-body-header-name">
                    {{ projectsStore.project?.name }}
                </div>
                <div class="projectDetail-body-header-right">
                    <div class="projectDetails-body-header-right-download-translate">
                        <ProjectDownload></ProjectDownload>
                    </div>
                </div>
            </header>
            <main class="projectDetails-body-main">
                <div class="projectDetails-body-main-data">
                    DATA
                </div>
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
            height: 3rem;

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
        }



        &-main {
            display: flex;
            justify-content: start;
            align-items: start;
            width: 100%;
            height: calc(100% - 3rem);

        }
    }

}
</style>