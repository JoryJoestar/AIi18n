<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProjectsStore } from '~/stores/projectsStore';

import IconArrowLeft from '~/assets/icon/arrow-left-line.svg'

const route = useRoute();
const router = useRouter();

const projectsStore = useProjectsStore();
const backToProjects = () => {
    router.push('/projects');
}

</script>

<template>
    <div class="projectDetails-sidebar-container">
        <div class="projectDetails-sidebar-container-header">
            <div class="projectDetails-sidebar-container-header-back" @click="backToProjects">
                <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill="#5f6368">
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path
                        d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42-.39-.39-1.02-.39-1.41 0l-6.59 6.59c-.39.39-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1z" />
                </svg>
            </div>
            <div class="projectDetails-sidebar-container-header-controls">
                <div class="projectDetails-sidebar-container-header-controls-add">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12 4C11.4477 4 11 4.44772 11 5V11H5C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13H11V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V13H19C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11H13V5C13 4.44772 12.5523 4 12 4Z"
                            fill="currentColor" />
                    </svg>
                </div>
                <div class="projectDetails-sidebar-container-header-controls-search">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M18.319 14.4326C20.7628 11.2941 20.542 6.75347 17.6569 3.86829C14.5327 0.744098 9.46734 0.744098 6.34315 3.86829C3.21895 6.99249 3.21895 12.0578 6.34315 15.182C9.22833 18.0672 13.769 18.2879 16.9075 15.8442C16.921 15.8595 16.9351 15.8745 16.9497 15.8891L21.1924 20.1317C21.5829 20.5223 22.2161 20.5223 22.6066 20.1317C22.9971 19.7412 22.9971 19.1081 22.6066 18.7175L18.364 14.4749C18.3493 14.4603 18.3343 14.4462 18.319 14.4326ZM16.2426 5.28251C18.5858 7.62565 18.5858 11.4246 16.2426 13.7678C13.8995 16.1109 10.1005 16.1109 7.75736 13.7678C5.41421 11.4246 5.41421 7.62565 7.75736 5.28251C10.1005 2.93936 13.8995 2.93936 16.2426 5.28251Z"
                            fill="currentColor" />
                    </svg>
                </div>
            </div>
        </div>
        <div class="projectDetails-sidebar-container-main">

        </div>
    </div>
</template>

<style lang="scss" scoped>
.projectDetails-sidebar-container {
    width: 15vw;
    min-width: 12rem;
    max-width: 12rem;
    height: 100%;
    background: rgba(255, 255, 255, 0.75); // 半透明背景
    backdrop-filter: blur(1rem); // 背景模糊效果
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-right: 1px solid #e1e1e1;
    padding: .75rem 1rem;

    &-header {
        display: flex;
        justify-content: space-between;
        padding-bottom: .75rem;
        border-bottom: 1px solid #e1e1e1;

        &-back {
            width: 2rem;
            height: 2rem; // 固定高度
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all .15s ease-in-out;
            border-radius: .5rem;
            cursor: pointer;

            svg {
                width: 1.5rem;
                height: 1.5rem;
            }

            &:hover {
                background: #efefef;
            }
        }

        &-controls {
            display: flex;

            &-add,
            &-search {
                flex: 1;
                width: 2rem;
                height: 2rem; // 固定高度
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all .15s ease-in-out;
                border-radius: .5rem;
                cursor: pointer;

                &:hover {
                    background: #efefef;
                }
            }

            &-search {

                svg {
                    width: 1.25rem;
                    height: 1.25rem;
                    margin-top: .15rem;
                }
            }

        }


    }

}
</style>