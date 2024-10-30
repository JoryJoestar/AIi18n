<script lang="ts" setup>
import { ref } from 'vue';

const isMouseInBottomBar = ref<boolean>(false);

const sliderLeft = ref<number>(0);
const sliderWidth = ref<number>(0);
const sliderOpacity = ref<number>(1);

const moveSlider = (event: MouseEvent) => {
    const element = event.target as HTMLElement;
    const offsetParent = element.offsetParent as HTMLElement;
    isMouseInBottomBar.value = true;

    sliderLeft.value = offsetParent.offsetLeft
    sliderWidth.value = element.clientWidth
    sliderOpacity.value = 1
};

const moveleave = (event: MouseEvent) => {
    sliderOpacity.value = 0
}

</script>

<template>
    <div class="project-details-bottom-bar">
        <div class="project-details-bottom-bar-buttons" @mouseleave="moveleave">
            <div class="slider" :style="{ left: `${sliderLeft}px`, width: `${sliderWidth}px`, opacity: sliderOpacity }"></div>
            <ProjectUpload class="hover-button" @mouseover="moveSlider"></ProjectUpload>
            <ProjectTranslate class="hover-button" @mouseover="moveSlider"></ProjectTranslate>
            <ProjectDownload class="hover-button" @mouseover="moveSlider"></ProjectDownload>
        </div>
    </div>
</template>
<style lang="scss">
.project-details-bottom-bar {
    position: absolute; // 改为绝对定位
    bottom: 0; // 固定在底部
    left: 50%; // 水平居中
    transform: translateX(-50%); // 使其真正居中
    width: 100%; // 使其宽度为100%

    &-buttons {
        overflow: hidden;
        border-radius: .5rem;
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #555555;
        bottom: 1rem;
        left: 50%;
        transform: translateX(-50%);

        .hover-button {
            position: relative;
            z-index: 1; // 确保按钮在滑块之上
        }

        .slider {
            position: absolute;
            height: 2.75rem;
            background-color: rgba(0, 0, 0, .75); // 滑块颜色
            transition: all 0.3s ease; // 平滑过渡
        }

    }
}
</style>