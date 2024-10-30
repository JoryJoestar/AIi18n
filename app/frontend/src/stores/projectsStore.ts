// app/frontend/src/stores/projectsStore.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { get_project_all } from '~/apis/projects';

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref<ResProject[]>([]); // 项目数组
  const project = ref<ResProject>()
  const projectItem = ref<ResProjectItem>()

  const translatedDataTable = ref<any>(null);
  const formattedDataTable = ref<any>(null);

  const isOpenUploadPanel = ref<boolean>(false)
  const isOpenDownloadPanel = ref<boolean>(false)

  const get_projects_all = () => {
    get_project_all().then((res: ResProject[]) => {
      projects.value = res
    })
  }

  // 返回状态和方法
  return {
    projects, get_projects_all,
    project, projectItem,
    isOpenUploadPanel, isOpenDownloadPanel,
    translatedDataTable, formattedDataTable,
  };
});