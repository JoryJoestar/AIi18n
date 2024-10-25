// app/frontend/src/stores/projectsStore.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref<ResProject[]>([]); // 项目数组
  const project = ref<ResProject>()
  const projectItem = ref<ResProjectItem>()

  const addProject = (project: ResProject) => {
    projects.value.push(project)
  };

  const removeProject = (id: number) => {
    projects.value = projects.value.filter(p => p.id !== id); // 删除指定 ID 的项目
  };

  // 返回状态和方法
  return {
    projects, addProject, removeProject,
    project, projectItem
  };
});