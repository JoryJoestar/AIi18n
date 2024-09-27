// app/frontend/src/stores/projectsStore.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref<projectItem[]>([]); // 项目数组

  const addProject = (project: { id: number; name: string; description?: string; createdAt?: string }) => {
    projects.value.push(project); // 添加新项目到数组
  };

  const removeProject = (id: number) => {
    projects.value = projects.value.filter(p => p.id !== id); // 删除指定 ID 的项目
  };

  return { projects, addProject, removeProject }; // 返回状态和方法
});