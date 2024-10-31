<script lang="ts" setup>
import { computed, onBeforeMount, onMounted, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { useProjectsStore } from '~/stores/projectsStore'; // 导入项目 store
import { create_project, get_project_by_id, get_project_item_by_id } from '~/apis/projects';
import { useAppStore } from '~/stores/appStore';

const route = useRoute();
const router = useRouter();

const appStore = useAppStore();

const projectsStore = useProjectsStore(); // 创建项目 store 实例

const searchContent = ref<string>('');

const computedProjects = computed(() => {
    return projectsStore.projects
        .filter(project => project.name.includes(searchContent.value)) // 根据搜索值过滤项目
        .map(project => ({
            ...project,
            created_at: new Date(project.created_at).toLocaleString() // 格式化 created_at
        })) || [];
});

const newProject = () => {
    const newProject: ReqProject = {
        name: `New project`,
        description: '',
    };

    create_project(newProject).then((res: ResProject) => {
        // 跳转到对应的 projectDetails 页面
        router.push({ name: 'projectDetails', params: { id: res.id } });
    })
};

const goToDetails = (id: number) => {
    projectsStore.getProject(id);
    router.push({ name: 'projectDetails', params: { id } });
}

onBeforeMount(() => {
    projectsStore.getProjectsAll();
})


</script>

<template>
    <div class="projects">
        <header class="projects-header">
            <div class="projects-header-title">
                Projects
            </div>
        </header>
        <main class="projects-main">
            <div class="projects-main-header">
                <div class="projects-main-header-search">
                    <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px"
                        fill="#5f6368">
                        <path d="M0 0h24v24H0V0z" fill="none" />
                        <path
                            d="M15.5 14h-.79l-.28-.27c1.2-1.4 1.82-3.31 1.48-5.34-.47-2.78-2.79-5-5.59-5.34-4.23-.52-7.79 3.04-7.27 7.27.34 2.8 2.56 5.12 5.34 5.59 2.03.34 3.94-.28 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                    </svg>
                    <input type="text" v-model="searchContent" placeholder="search">
                </div>
                <div class="projects-main-header-controls">
                    <button @click="newProject" class="add-project-button">New</button>
                </div>
            </div>
            <div class="projects-main-body">
                <div class="projects-main-body-item" v-for="item, index in computedProjects" :key="index"
                    @click="goToDetails(item.id)">
                    <div class="projects-main-body-item-name">
                        {{ item.name }}
                    </div>
                    <div class="projects-main-body-item-description">
                        {{ item.description }}
                    </div>
                    <div class="projects-main-body-item-date">
                        {{ item.created_at }}
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<style lang="scss" scoped>
.projects {
    padding: 1rem;

    &-header {
        height: 4rem;

        &-title {
            font-size: .9rem;
        }
    }

    &-main {
        &-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-bottom: .75rem;
            margin-bottom: 1rem;
            border-bottom: 1px solid rgba(0, 0, 0, .1);

            &-search {
                display: flex;
                align-items: center;
                border: 1px solid rgba(0, 0, 0, 0.2); // 添加边框
                border-radius: .5rem; // 圆角
                padding: .5rem .75rem; // 内边距
                transition: border-color .15s ease-in-out;
                height: 2.5rem;

                &:focus-within {
                    border-color: rgba(0, 0, 0, 0.5); // 聚焦时边框颜色变化
                }

                svg {
                    width: 1.5rem;
                    height: 1.5rem;
                }

                input {
                    border: none; // 去掉输入框的默认边框
                    outline: none; // 去掉输入框的轮廓
                    padding: .5rem; // 内边距
                    font-size: 1rem; // 字体大小
                }
            }

            &-controls {
                .add-project-button {
                    font-size: 1rem;
                    padding: .5rem 1rem;
                    width: 5rem;
                    height: 2.5rem;
                    background-color: rgba(0, 0, 0, 0.7);
                    border-radius: .5rem;
                    color: white;
                    cursor: pointer;
                    transition: all .15s ease-in-out;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .add-project-button:hover {
                    background-color: rgba(0, 0, 0, .8);
                }
            }
        }

        &-body {
            display: flex;
            flex-wrap: wrap; // 允许换行
            gap: 1rem; // 项目间隔

            &-item {
                width: calc(20% - .5rem); // 默认每行最多四个项目
                height: 12rem;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                border-radius: .5rem;
                padding: 1rem;
                background-color: white;
                cursor: pointer;
                transition: all .15s ease-in-out;

                &-name {
                    font-size: 1.2rem;
                }

                &-description {
                    font-size: .9rem;
                    color: #666;
                }

                &-date {
                    font-size: .8rem;
                    color: #999;
                }
            }

            &-item:hover {
                background-color: rgba(0, 0, 0, 0.01);
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
            }

            @media (max-width: 1680px) {
                &-item {
                    width: calc(25% - .5rem);
                }
            }

            @media (max-width: 1440px) {
                &-item {
                    width: calc(33% - .5rem);
                }
            }

            @media (max-width: 1080px) {
                &-item {
                    width: calc(50% - .5rem);
                }
            }

            @media (max-width: 600px) {
                &-item {
                    width: calc(100%);
                }
            }
        }
    }
}
</style>