<script lang="ts" setup>
import { ref } from 'vue';
import { useProjectsStore } from '~/stores/projectsStore';
import { useTranslateStore } from '~/stores/translateStore';

const translateStore = useTranslateStore()
const projectsStore = useProjectsStore();

/* 下载翻译模板 */
const downloadSourceTemplate = () => {
    const link = document.createElement('a');
    link.href = '/source_template.csv'; // 下载文件的路径
    link.download = 'source_template.csv'; // 下载时的文件名
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

// 下载翻译好的文件
const downloadTranslatedFile = () => {
    if (!projectsStore.translatedDataTable) {
        return;
    }
    const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(projectsStore.translatedDataTable);
    const link = document.createElement('a');
    link.href = csvContent; // 设置为CSV内容
    link.download = 'translated_file.csv'; // 下载时的文件名
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

const downloadFormattedFile = () => {
    if (!projectsStore.formattedDataTable) {
        return;
    }
    const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(projectsStore.formattedDataTable);
    const link = document.createElement('a');
    link.href = csvContent; // 设置为CSV内容
    link.download = 'formatted_file.csv'; // 下载时的文件名
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

</script>
<template>
    <div class="project-download">
        <div class="project-download-body" v-show="projectsStore.isOpenDownloadPanel">
            <div class="project-download-body-panel">
                <div class="project-download-body-panel-header">
                    <div class="project-download-body-panel-header-title">
                        DOWNLOAD TYPE:
                    </div>
                    <div class="project-download-body-panel-header-close" @click="projectsStore.isOpenDownloadPanel = false">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
                                fill="currentColor" />
                        </svg>
                    </div>
                </div>
                <div class="project-download-body-panel-select">
                    <div class="project-download-body-panel-select-template select-option"
                        @click="downloadSourceTemplate">
                        <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px"
                            fill="#5f6368">
                            <path
                                d="M3 6c-.55 0-1 .45-1 1v13c0 1.1.9 2 2 2h13c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1-.45-1-1V7c0-.55-.45-1-1-1zm17-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 9h-8c-.55 0-1-.45-1-1s.45-1 1-1h8c.55 0 1 .45 1 1s-.45 1-1 1zm-4 4h-4c-.55 0-1-.45-1-1s.45-1 1-1h4c.55 0 1 .45 1 1s-.45 1-1 1zm4-8h-8c-.55 0-1-.45-1-1s.45-1 1-1h8c.55 0 1 .45 1 1s-.45 1-1 1z" />
                        </svg>
                        <span>SOURCE TEMPLATE</span>
                    </div>
                    <div class="project-download-body-panel-select-translated select-option"
                        :class="{ 'ban': projectsStore.translatedDataTable == null }" @click="downloadTranslatedFile">
                        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="48px"
                            viewBox="0 0 24 24" width="48px" fill="#5f6368">
                            <g>
                                <path d="M0,0h24v24H0V0z" fill="none" />
                            </g>
                            <g>
                                <path
                                    d="M19.41,7.41l-4.83-4.83C14.21,2.21,13.7,2,13.17,2H6C4.9,2,4.01,2.9,4.01,4L4,20c0,1.1,0.89,2,1.99,2H18c1.1,0,2-0.9,2-2 V8.83C20,8.3,19.79,7.79,19.41,7.41z M10.23,17.29l-2.12-2.12c-0.39-0.39-0.39-1.02,0-1.41l0,0c0.39-0.39,1.02-0.39,1.41,0 l1.41,1.41l3.54-3.54c0.39-0.39,1.02-0.39,1.41,0l0,0c0.39,0.39,0.39,1.02,0,1.41l-4.24,4.24C11.26,17.68,10.62,17.68,10.23,17.29z M14,9c-0.55,0-1-0.45-1-1V3.5L18.5,9H14z" />
                            </g>
                        </svg>
                        <span>TRANSLATED</span>
                    </div>
                    <div class="project-download-body-panel-select-format select-option"  :class="{ 'ban': projectsStore.formattedDataTable == null }"  @click="downloadFormattedFile">
                        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 20 20" height="48px"
                            viewBox="0 0 20 20" width="48px" fill="#5f6368">
                            <g>
                                <rect fill="none" height="20" width="20" x="0" y="0" />
                                <path
                                    d="M16,3H7C6.45,3,6,3.45,6,4v9c0,0.55,0.45,1,1,1h9c0.55,0,1-0.45,1-1V4C17,3.45,16.55,3,16,3z M14.68,6.73l-4.24,4.24 c-0.2,0.2-0.51,0.2-0.71,0L8.32,9.56c-0.2-0.2-0.2-0.51,0-0.71c0.2-0.2,0.51-0.2,0.71,0l1.06,1.06l3.89-3.89 c0.2-0.2,0.51-0.2,0.71,0C14.88,6.22,14.88,6.54,14.68,6.73z M14,16.5c0,0.28-0.22,0.5-0.5,0.5H4c-0.55,0-1-0.45-1-1V6.5 C3,6.22,3.22,6,3.5,6S4,6.22,4,6.5v9C4,15.78,4.22,16,4.5,16h9C13.78,16,14,16.22,14,16.5z" />
                            </g>
                        </svg>
                        <span>FORMATTED</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.project-download {

    &-body {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        z-index: 998;
        background-color: rgb(0, 0, 0, .5);

        &-panel {
            $size: 10rem;
            z-index: 999;
            border-radius: .5rem;
            // width: calc(3 * $size);
            height: calc(2 * $size);
            background-color: white;
            padding: .75rem;
            display: flex;
            justify-content: center;
            align-items: start;
            flex-direction: column;

            &-header {
                width: 100%;
                display: flex;
                justify-content: space-between;

                &-close {
                    padding: .5rem .75rem;
                    transition: all .15s ease-in-out;
                    border-radius: .5rem;
                    cursor: pointer;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    svg {
                        width: 1rem;
                        height: 1rem;
                    }

                    &:hover {
                        background: #efefef;
                    }
                }
            }

            &-select {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: .75rem;
                width: 100%;
                height: 100%;

                .select-option {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;

                    width: 12rem;
                    height: calc(100% - 1rem);
                    cursor: pointer;
                    border-radius: .25rem;
                    transition: all .15s ease-in-out;
                    border: 1px solid rgba(0, 0, 0, 0.1);

                    svg {
                        margin-bottom: 1rem;
                    }
                }

                .select-option:hover {
                    background-color: rgba(0, 0, 0, 0.05);
                }

                .ban {
                    cursor: not-allowed;
                    opacity: .5;
                }
            }
        }
    }
}
</style>