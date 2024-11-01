<script lang="ts" setup>
import { on } from 'events';
import { onMounted } from 'vue';
import { useProjectsStore } from '~/stores/projectsStore';
import { useTranslateStore } from '~/stores/translateStore';

const translateStore = useTranslateStore();
const projectsStore = useProjectsStore()

const headers = ['']

onMounted(() => {
    console.log(projectsStore.projectItemsData)
})

</script>
<template>
    <div class="project-data">
        <div class="project-data-header">
            <div class="project-data-header-language">
                <div class="project-data-header-language-item"
                    v-for="language, index in translateStore.translate_languages" :key="index">
                    <div class="project-data-header-language-item-container" v-if="language.display">
                        <div class="project-data-header-language-item-container-name">
                            {{ language.zh_name }}
                        </div>
                        <div class="project-data-header-language-item-container-code">
                            {{ language.code }}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="project-data-body">
            <div class="project-data-body-item" v-for="item, index in projectsStore.projectItemsData" :key="index">
                <div class="project-data-body-item-position">
                    <span></span>
                </div>
                <div class="project-data-body-item-content">
                    <div class="project-data-body-item-content-source">
                        <span></span>
                    </div>
                    <div class="project-data-body-item-content-translate">
                        <span></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss"></style>