<script lang="ts" setup>
import { ref } from 'vue';

/* 下载翻译模板 */
const downloadSourceTemplate = () => {
    const link = document.createElement('a');
    link.href = '/source_template.csv'; // 下载文件的路径
    link.download = 'source_template.csv'; // 下载时的文件名
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

// 下载
const downloadTranslatedFile = (translatedDataTable: any) => {
    if (!translatedDataTable) {
        alert('翻译数据为空，无法下载文件。');
        return;
    }
    const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(translatedDataTable);
    const link = document.createElement('a');
    link.href = csvContent; // 设置为CSV内容
    link.download = 'translated_file.csv'; // 下载时的文件名
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

const downloadFormattedFile = (formattedDataTable: any) => {
    if (!formattedDataTable) {
        alert('格式化数据为空，无法下载文件。');
        return;
    }
    const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(formattedDataTable);
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
        <button class="project-download-button">
            <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="48px" viewBox="0 0 24 24"
                width="48px" fill="#5f6368">
                <g>
                    <rect fill="none" height="24" width="24" />
                </g>
                <g>
                    <path
                        d="M16.59,9H15V4c0-0.55-0.45-1-1-1h-4C9.45,3,9,3.45,9,4v5H7.41c-0.89,0-1.34,1.08-0.71,1.71l4.59,4.59 c0.39,0.39,1.02,0.39,1.41,0l4.59-4.59C17.92,10.08,17.48,9,16.59,9z M5,19c0,0.55,0.45,1,1,1h12c0.55,0,1-0.45,1-1s-0.45-1-1-1H6 C5.45,18,5,18.45,5,19z" />
                </g>
            </svg>
        </button>
    </div>
</template>
<style lang="scss">
.project-download {
    &-button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 2.25rem;
        height: 2.25rem;
        cursor: pointer;
        transition: all .15s ease-in-out;
        border-radius: .25rem;

        svg {
            width: 1.75rem;
            height: 1.75rem;
        }
    }

    &-button:hover {
        background-color: rgba(0, 0, 0, .05);
    }


    &-body {
        position: absolute;
    }
}
</style>