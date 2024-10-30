<script lang="ts" setup>
import { ref } from 'vue';
import { useProjectsStore } from '~/stores/projectsStore';
import { parseTranslateSourceCSV, readCSV } from '~/utils/csv';

const projectsStore = useProjectsStore();

const translate_content = ref<string>(''); // 翻译内容
const tranlsate_source_file = ref<File>();
const tranlsate_source_file_url = ref<string>('');
const format_source_file = ref<File>();
const format_source_file_url = ref<string>('');
const promptVersion = ref<string>('v2'); // 默认选择的 prompt 版本


/* 上传翻译源文件 */
const uploadTranslateSourceFile = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    input.onchange = (event) => {
        const target = event.target as HTMLInputElement;
        if (target.files && target.files.length > 0) {
            const file = target.files[0];
            tranlsate_source_file.value = file
            //@ts-ignore
            tranlsate_source_file_url.value = file.path; // 显示上传的文件名
            parseTranslateSourceCSV(tranlsate_source_file.value, (data) => {
                // console.log('translate_source:', data)
            })
            projectsStore.isOpenUploadPanel = false;
        }
    };
    input.click(); // 触发文件选择对话框
};

/* 上传格式化源文件 */
const uploadFormattedSourceFile = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    input.onchange = (event) => {
        const target = event.target as HTMLInputElement;
        if (target.files && target.files.length > 0) {
            const file = target.files[0];
            format_source_file.value = file
            //@ts-ignore
            format_source_file_url.value = file.path; // 显示上传的文件名
            parseTranslateSourceCSV(format_source_file.value, (data) => {
                console.log('format_source:', data)
            })
            projectsStore.isOpenUploadPanel = false;
        }
    };
    input.click(); // 触发文件选择对话框
};

</script>
<template>
    <div class="project-upload">
        <div class="project-upload-body" v-show="projectsStore.isOpenUploadPanel">
            <div class="project-upload-body-panel">
                <div class="project-upload-body-panel-header">
                    <div class="project-upload-body-panel-header-title">
                        UPLOAD TYPE:
                    </div>
                    <div class="project-upload-body-panel-header-close" @click="projectsStore.isOpenUploadPanel = false">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
                                fill="currentColor" />
                        </svg>
                    </div>
                </div>
                <div class="project-upload-body-panel-select">
                    <div class="project-upload-body-panel-select-source select-option"
                        @click="uploadTranslateSourceFile">
                        <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px"
                            fill="#5f6368">
                            <path d="M0 0h24v24H0V0z" fill="none" />
                            <path
                                d="M12.65 15.67c.14-.36.05-.77-.23-1.05l-2.09-2.06.03-.03c1.74-1.94 2.98-4.17 3.71-6.53h1.94c.54 0 .99-.45.99-.99v-.02c0-.54-.45-.99-.99-.99H10V3c0-.55-.45-1-1-1s-1 .45-1 1v1H1.99c-.54 0-.99.45-.99.99 0 .55.45.99.99.99h10.18C11.5 7.92 10.44 9.75 9 11.35c-.81-.89-1.49-1.86-2.06-2.88-.16-.29-.45-.47-.78-.47-.69 0-1.13.75-.79 1.35.63 1.13 1.4 2.21 2.3 3.21L3.3 16.87c-.4.39-.4 1.03 0 1.42.39.39 1.02.39 1.42 0L9 14l2.02 2.02c.51.51 1.38.32 1.63-.35zM17.5 10c-.6 0-1.14.37-1.35.94l-3.67 9.8c-.24.61.22 1.26.87 1.26.39 0 .74-.24.88-.61l.89-2.39h4.75l.9 2.39c.14.36.49.61.88.61.65 0 1.11-.65.88-1.26l-3.67-9.8c-.22-.57-.76-.94-1.36-.94zm-1.62 7l1.62-4.33L19.12 17h-3.24z" />
                        </svg>
                        <span>TRANSLATE SOURCE</span>
                    </div>
                    <div class="project-upload-body-panel-select-format select-option"
                        @click="uploadFormattedSourceFile">
                        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 20 20" height="48px"
                            viewBox="0 0 20 20" width="48px" fill="#5f6368">
                            <rect fill="none" height="20" width="20" />
                            <path
                                d="M15.35,8.83l0.71-0.71c0.59-0.59,0.59-1.54,0-2.12L15,4.94c-0.59-0.59-1.54-0.59-2.12,0l-0.71,0.71L15.35,8.83z M11.11,6.71 l-6.96,6.96C4.05,13.77,4,13.89,4,14.03v2.47C4,16.78,4.22,17,4.5,17h2.47c0.13,0,0.26-0.05,0.35-0.15l6.96-6.96L11.11,6.71z M4.51,11.18C3.59,10.76,3,10.16,3,9.25c0-1.31,1.39-1.99,2.61-2.59C6.45,6.24,7.5,5.73,7.5,5.25C7.5,4.91,6.83,4.5,6,4.5 c-0.94,0-1.36,0.46-1.38,0.48C4.35,5.29,3.88,5.33,3.57,5.07C3.26,4.81,3.21,4.35,3.46,4.03C3.55,3.93,4.34,3,6,3 c1.47,0,3,0.84,3,2.25C9,6.66,7.55,7.37,6.27,8C5.56,8.35,4.5,8.87,4.5,9.25c0,0.3,0.48,0.56,1.17,0.78L4.51,11.18z M14.14,12.16 c0.83,0.48,1.36,1.14,1.36,2.09c0,1.94-2.44,2.75-3.75,2.75C11.34,17,11,16.66,11,16.25s0.34-0.75,0.75-0.75 c0.77,0,2.25-0.49,2.25-1.25c0-0.39-0.38-0.71-0.97-0.97L14.14,12.16z" />
                        </svg>
                        <span>FORMAT SOURCE</span>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.project-upload {
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
            }
        }
    }
}
</style>