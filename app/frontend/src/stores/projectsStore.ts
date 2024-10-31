// app/frontend/src/stores/projectsStore.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { get_project_by_id, get_project_item_all, get_project_item_by_id, get_projects_all } from '~/apis/projects';

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref<ResProject[]>([]); // 项目数组
  const project = ref<ResProject>()
  const projectItems = ref<ResProjectItem[]>()
  const projectItem = ref<ResProjectItem>()

  const translatedDataTable = ref<any>(null);
  const formattedDataTable = ref<any>(null);

  const isOpenUploadPanel = ref<boolean>(false)
  const isOpenDownloadPanel = ref<boolean>(false)

  const getProjectsAll = () => {
    get_projects_all().then((res: ResProject[]) => {
      projects.value = res
    })
  }

  const getProject = (projectId: number) => {
    get_project_by_id(projectId).then((res: ResProject) => {
      project.value = res
    })
  };

  // 获取所有 item 信息
  const getProjectItemsAll = () => {
    if (!project.value) return;
    get_project_item_all(project.value.id).then((res: ResProjectItem[]) => {
      projectItems.value = res;
    })
  }

  // 根据 ID 获取当前项目的信息
  const getProjectItem = (projectId: number) => {
    get_project_item_by_id(projectId).then((res: ResProjectItem) => {
      projectItem.value = res
    })
  };

  // 返回状态和方法
  return {
    project, projects, getProjectsAll, getProject,
    projectItem, projectItems, getProjectItemsAll, getProjectItem,
    isOpenUploadPanel, isOpenDownloadPanel,
    translatedDataTable, formattedDataTable,
  };
});