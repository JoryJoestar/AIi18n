<script lang="ts" setup>
import { nextTick, onBeforeMount, onMounted, ref } from 'vue';
import { update_project } from '~/apis/projects';
import { useProjectsStore } from '~/stores/projectsStore';

const projectsStore = useProjectsStore();
const showMenu = ref(false); // 控制菜单显示的状态
const showRenameModal = ref(false); // 控制重命名弹窗的状态
const showDeleteConfirmModal = ref(false); // 控制删除确认弹窗的状态
const newName = ref(''); // 存储新的项目名称
const newDescription = ref(''); // 存储新的项目名称
const inputRenameRef = ref<HTMLInputElement | null>(null); // 引用输入框
const inputDescriptionRef = ref<HTMLInputElement | null>(null); // 引用输入框

const toggleMenu = () => {
    showMenu.value = !showMenu.value; // 切换菜单显示状态
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
        console.log(params)
        update_project(params).then((res: ResProject) => {
            projectsStore.project = res
            projectsStore.get_projects_all();
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

    showDeleteConfirmModal.value = false; // 关闭确认弹窗
};

// 关闭删除确认弹窗
const closeDeleteConfirmModal = () => {
    showDeleteConfirmModal.value = false; // 关闭确认弹窗
};
</script>

<template>
    <div class="project-details-header">
        <div class="project-details-header-left">
            <div class="project-details-header-left-upload-translate">
            </div>
        </div>
        <div class="project-details-header-name" @click="toggleMenu">
            <span>
                {{ projectsStore.project?.name }}
            </span>
            <div class="project-details-header-menu" v-if="showMenu">
                <ul>
                    <li @click="openRenameModal">修改信息</li>
                    <li @click="openDeleteConfirmModal">删除项目</li>
                </ul>
            </div>
        </div>
        <div class="projectDetail-header-right">
            <div class="project-details-header-right-download-translate">
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
                        确认删除
                    </div>
                </div>
                <div class="modal-panel-main">您确定要删除此项目吗？</div>
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
                margin: 1rem 0;
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