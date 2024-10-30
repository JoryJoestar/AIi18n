<script lang="ts" setup>

import { useProjectsStore } from '~/stores/projectsStore';

const projectsStore = useProjectsStore()

</script>
<template>
    <div class="project-download">
        <button class="project-download-button" title="Download" @click="projectsStore.isOpenDownloadPanel = true;">
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
<style lang="scss" scoped>
.project-download {
    &-button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 2.75rem;
        height: 2.75rem;
        cursor: pointer;
        transition: all .15s ease-in-out;
        border-radius: .25rem;

        svg {
            width: 1.75rem;
            height: 1.75rem;
            fill: white;
            pointer-events: none;
        }
    }

}
</style>