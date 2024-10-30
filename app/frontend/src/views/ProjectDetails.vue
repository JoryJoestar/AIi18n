<script lang="ts" setup>
import { ref } from 'vue';

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
</script>

<template>
    <div class="projectDetails">
        <nav class="projectDetails-sidebar">
            <ProjectDetailsSidebar></ProjectDetailsSidebar>
        </nav>
        <div class="projectDetails-body">
            <header class="projectDetails-body-header">
                <ProjectDetailsHeader></ProjectDetailsHeader>
            </header>
            <main class="projectDetails-body-main">
                <div class="projectDetails-body-main-data">
                    <ProjectDetailsData></ProjectDetailsData>
                </div>
            </main>
            <ProjectBottomBar></ProjectBottomBar>
        </div>

        <ProjectUploadBody></ProjectUploadBody>
        <ProjectDownloadBody></ProjectDownloadBody>

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
        position: relative;

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