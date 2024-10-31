<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProjectsStore } from '~/stores/projectsStore';

const route = useRoute();
const router = useRouter();

const projectsStore = useProjectsStore();

const itemSearchContent = ref<string>('')

const computedProjectItems = () => {

}

const backToProjects = () => {
    router.push('/projects');
    projectsStore.get_projects_all();
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
            </div>
        </div>
        <div class="projectDetails-sidebar-container-search">
            <input type="text" v-model="itemSearchContent" placeholder="Search">
        </div>
        <div class="projectDetails-sidebar-container-main">
            <div class="projectDetails-sidebar-container-main-item" v-for="item, index in computedProjectItems"
                :key="index">
                {{ item }}
            </div>
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
    border-right: 1px solid #e1e1e1;
    padding: .75rem 1rem;

    &-header {
        display: flex;
        justify-content: space-between;
        padding-bottom: .25rem;
        margin-bottom: .5rem;
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

        }


    }

    &-search {
        display: flex;
        align-items: center;
        border: 1px solid transparent;
        border-radius: .5rem;
        transition: border-color .15s ease-in-out;
        margin-bottom: 1rem;

        &:hover {
            border: 1px solid rgba(0, 0, 0, 0.1);
        }

        &:focus-within {
            border: 1px solid rgba(0, 0, 0, 0.25);
        }

        svg {
            width: 1.5rem;
            height: 1.5rem;
        }

        input {
            width: 100%;
            padding: .5rem;
            border-radius: .25rem;
        }
    }

}
</style>