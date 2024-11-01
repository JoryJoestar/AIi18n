<script lang="ts" setup>
import { nextTick, onBeforeMount, onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { delete_project, update_project } from '~/apis/projects';
import { useAppStore } from '~/stores/appStore';
import { useProjectsStore } from '~/stores/projectsStore';

const appStore = useAppStore();

const router = useRouter();

const projectsStore = useProjectsStore();
const showMenu = ref(false); // 控制菜单显示的状态
const showRenameModal = ref(false); // 控制重命名弹窗的状态
const showDeleteConfirmModal = ref(false); // 控制删除确认弹窗的状态
const newName = ref(''); // 存储新的项目名称
const newDescription = ref(''); // 存储新的项目名称
const inputRenameRef = ref<HTMLInputElement | null>(null); // 引用输入框
const inputDescriptionRef = ref<HTMLInputElement | null>(null); // 引用输入框

const itemSearchContent = ref<string>('')

const toggleMenu = () => {
    showMenu.value = !showMenu.value; // 切换菜单显示状态
};

// 点击外部区域时隐藏菜单
const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const menuElement = document.querySelector('.project-details-header-left-name');
    if (menuElement && !menuElement.contains(target)) {
        showMenu.value = false; // 隐藏菜单
    }

};

// 打开重命名弹窗
const openRenameModal = () => {
    if (projectsStore.project) {
        newName.value = projectsStore.project.name
        newDescription.value = projectsStore.project.description
    }
    showRenameModal.value = true; // 显示重命名弹窗
    nextTick(() => {
        inputRenameRef.value?.focus(); // 在弹窗显示后自动聚焦输入框
    });
};

// 处理重命名逻辑
const confirmRenameProject = () => {
    if (newName.value.trim()) {
        if (!projectsStore.project) return
        console.log(projectsStore.project)
        const params = {
            'id': projectsStore.project.id,
            'name': newName.value,
            'description': newDescription.value
        }
        update_project(params).then((res: ResProject) => {
            projectsStore.project = res
        }).catch(err => {
            console.error(err)
        })
        showRenameModal.value = false; // 关闭弹窗
    }
};

// 关闭重命名弹窗
const closeRenameModal = () => {
    showRenameModal.value = false; // 关闭弹窗
};

// 打开删除确认弹窗
const openDeleteConfirmModal = () => {
    showDeleteConfirmModal.value = true; // 显示删除确认弹窗
};

// 处理删除项目逻辑
const confirmDeleteProject = () => {
    // 处理删除项目的逻辑
    if (!projectsStore.project) return
    delete_project(projectsStore.project?.id).then(res => {
        appStore.showMessage('DELET SUCCESSFUL', 2500, 'success')
        router.push('/projects')
    })
    showDeleteConfirmModal.value = false; // 关闭确认弹窗
};

// 关闭删除确认弹窗
const closeDeleteConfirmModal = () => {
    showDeleteConfirmModal.value = false; // 关闭确认弹窗
};

const backToProjects = () => {
    router.push('/projects');
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});

</script>

<template>
    <div class="project-details-header">
        <div class="project-details-header-left">
            <div class="project-details-header-left-back" @click="backToProjects">
                <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill="#5f6368">
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path
                        d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42-.39-.39-1.02-.39-1.41 0l-6.59 6.59c-.39.39-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1z" />
                </svg>
            </div>
            <div class="project-details-header-left-name" @click="toggleMenu">

                <span>
                    {{ projectsStore.project?.name }}
                </span>
                <div class="project-details-header-left-name-menu" v-if="showMenu">
                    <ul>
                        <li @click="openRenameModal">Change Info</li>
                        <li @click="openDeleteConfirmModal">Delete</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="project-details-header-center">

        </div>
        <div class="projectDetail-header-right">
            <div class="project-details-header-right-search">
                <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill="#5f6368">
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path
                        d="M15.5 14h-.79l-.28-.27c1.2-1.4 1.82-3.31 1.48-5.34-.47-2.78-2.79-5-5.59-5.34-4.23-.52-7.79 3.04-7.27 7.27.34 2.8 2.56 5.12 5.34 5.59 2.03.34 3.94-.28 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                </svg>
                <input type="text" v-model="itemSearchContent" placeholder="Search">
            </div>
        </div>

        <!-- 重命名弹窗 -->
        <div v-if="showRenameModal" class="modal">
            <div class="modal-panel">
                <div class="modal-panel-header">
                    <div class="modal-panel-header-title">
                        Rename
                    </div>
                </div>
                <div class="modal-panel-main">
                    <input ref="inputRenameRef" v-model="newName" placeholder="input name"
                        @keydown.enter="confirmRenameProject" />
                    <input ref="inputDescriptionRef" v-model="newDescription" placeholder="input description"
                        @keydown.enter="confirmRenameProject" />
                </div>

                <div class="modal-panel-buttons">
                    <div class="modal-panel-buttons-cancel" @click="closeRenameModal">Cancel</div>
                    <div class="modal-panel-buttons-cofirm" @click="confirmRenameProject">Comfirm</div>
                </div>
            </div>
        </div>

        <!-- 删除确认弹窗 -->
        <div v-if="showDeleteConfirmModal" class="modal">
            <div class="modal-panel">
                <div class="modal-panel-header">
                    <div class="modal-panel-header-title">
                        Confirm deletion?
                    </div>
                </div>
                <div class="modal-panel-main">Information related to the project will not be recoverable after deletion.
                </div>
                <div class="modal-panel-buttons">
                    <div class="modal-panel-buttons-cancel" @click="closeDeleteConfirmModal">Cancel</div>
                    <div class="modal-panel-buttons-confirm" @click="confirmDeleteProject">Confirm</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.project-details {
    &-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 3rem;

        &-left {
            display: flex;
            align-items: center;

            &-back {
                width: 2rem;
                height: 2rem; // 固定高度
                margin-right: .5rem;
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

            &-name {
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                transition: all .15s ease-in-out;
                position: relative; // 添加相对定位以便菜单定位

                span {
                    font-size: 1.25rem;
                }


                &:hover span {
                    color: green;
                }


                &::after {
                    content: '';
                    display: inline-block;
                    width: 0;
                    height: 0;
                    border-left: 5px solid transparent;
                    border-right: 5px solid transparent;
                    border-top: 5px solid black;
                    margin-left: 5px;
                }

                &-menu {
                    position: absolute; // 绝对定位菜单
                    top: 100%; // 菜单在名称下方
                    left: 0;
                    background: #f9f9f9; // 更简洁的背景色
                    border: 1px solid #ddd; // 更柔和的边框
                    border-radius: .5rem; // 添加圆角
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); // 添加阴影
                    z-index: 10; // 确保菜单在其他元素之上
                    min-width: 150px; // 设置最小宽度
                }

                &-menu ul {
                    list-style: none; // 去掉列表样式
                    margin: 0; // 去掉外边距
                    padding: 0; // 去掉内边距
                }

                &-menu li {
                    padding: 0.5rem 1rem; // 添加内边距
                    cursor: pointer; // 鼠标悬停时显示为指针
                    transition: background 0.2s; // 添加过渡效果
                }

                &-menu li:hover {
                    background: #e0e0e0; // 鼠标悬停时的背景色
                }
            }
        }

        &-right {
            &-search {
                display: flex;
                align-items: center;
                border: 1px solid rgba(0, 0, 0, 0.1);
                border-radius: .5rem;
                transition: border-color .15s ease-in-out;
                padding: .25rem .5rem;

                &:focus-within {
                    border: 1px solid rgba(0, 0, 0, 0.25);
                }

                svg {
                    width: 1.5rem;
                    height: 1.5rem;
                }

                input {
                    width: 100%;
                    border-radius: .25rem;
                    margin-left: .5rem;
                }
            }
        }




        .modal {
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100vw;
            height: 100vh;
            background-color: rgba(0, 0, 0, 0.5); // 半透明背景
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .modal-panel {
            $size: 10rem;
            z-index: 999;
            border-radius: .5rem;
            width: calc(2 * $size);
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

                &-title {
                    font-size: 1.25rem;
                }
            }

            &-main {
                margin: 1rem .25rem;
            }

            input {
                width: 100%;
                padding: 1rem .75rem;
                font-size: 1rem;
                border: 1px solid rgba(0, 0, 0, 0.25);
                border-radius: .5rem;
                margin-bottom: 1rem;
            }

            &-buttons {
                width: 100%;
                display: flex;
                justify-content: flex-end;

                div {
                    padding: .5rem .75rem;
                    color: white;
                    cursor: pointer;
                    font-size: .9rem;
                    background-color: rgba(0, 0, 0, 0.75);
                    color: white;
                    border-radius: .5rem;
                    cursor: pointer;
                    transition: all .15s ease-in-out;
                }

                div:hover {
                    background-color: rgba(0, 0, 0, 0.6);
                }

                &-cancel {
                    margin-right: .5rem;
                }

                &-comfirm {}
            }

        }
    }
}
</style>