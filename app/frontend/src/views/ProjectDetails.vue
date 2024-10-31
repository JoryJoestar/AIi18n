<script lang="ts" setup>
import { ref } from 'vue';
import { useAppStore } from '~/stores/appStore';

const appStore = useAppStore();

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