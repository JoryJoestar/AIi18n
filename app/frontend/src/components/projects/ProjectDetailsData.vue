<script lang="ts" setup>
import { useProjectsStore } from '~/stores/projectsStore';

const projectsStore = useProjectsStore()



</script>
<template>
    <div class="project-data">
        <div class="project-data-header">
            <div class="project-data-header-language-text">

                <div class="project-data-header-language-text-item">

                </div>
            </div>
            <div class="project-data-header-language-code">

                <div class="project-data-header-language-code-item">

                </div>
            </div>
        </div>

    </div>
    <div class="project-data-item">
        <div class="project-data-item-source">
            <span></span>
        </div>
        <div class="project-data-item-translate">
            <span></span>
        </div>
    </div>
</template>
<style lang="scss"></style>