<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const props = defineProps({
    message: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: 'info' // 可选值: 'info', 'success', 'error', 'warning'
    },
    duration: {
        type: Number,
        default: 2000 // 默认消失时间为3000毫秒
    },
    closeButtonVisible: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['close']);
const visible = ref(true);
const closing = ref(false); // 用于控制关闭动画

const close = () => {
    closing.value = true; // 设置为关闭状态
    setTimeout(() => {
        visible.value = false; // 在动画结束后隐藏组件
        emit('close'); // 触发关闭事件
    }, 500); // 动画持续时间
};

// 在组件挂载时设置定时器
onMounted(() => {
    setTimeout(close, props.duration);
});

</script>

<template>
    <div v-if="visible" :class="['message-alert', type, { 'slide-in': !closing, 'slide-out': closing }]">
        <span>{{ message }}</span>
        <button v-if="closeButtonVisible" @click="close">X</button>
    </div>
</template>

<style lang="scss">
.message-alert {
    padding: 10px;
    border-radius: 5px;
    margin: 10px auto; /* 上下间距，左右自动 */
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed; /* 固定定位 */
    top: 10rem; 
    left: 50%; /* 左侧50% */
    transform: translateX(-50%); /* 向左移动自身宽度的一半，实现居中 */
    transition: all .25s ease-in-out;


    &.info {
        background-color: #e7f3fe;
        color: #31708f;
    }

    &.success {
        background-color: #dff0d8;
        color: #3c763d;
    }

    &.error {
        background-color: #f2dede;
        color: #a94442;
    }

    &.warning {
        background-color: #fcf8e3;
        color: #8a6d3b;
    }

    button {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 1.25rem;
        margin-left: .5rem;
    }

    /* 动画效果 */
    &.slide-in {
        animation: slideIn 0.5s ease forwards;
    }

    &.slide-out {
        animation: slideOut 0.25s ease-in-out forwards;
    }
}

/* 定义下滑动画 */
@keyframes slideIn {
    from {
        transform: translate(-50%, -20px); /* 从上方20px开始 */
        opacity: 0; /* 初始透明度为0 */
    }
    to {
        transform: translate(-50%, 0); /* 最终位置 */
        opacity: 1; /* 最终透明度为1 */
    }
}

/* 定义上滑动画 */
@keyframes slideOut {
    from {
        transform: translate(-50%, 0); /* 从当前位置开始 */
        opacity: 1; /* 初始透明度为1 */
    }
    to {
        transform: translate(-50%, -10px); /* 向上移动20px */
        opacity: 0; /* 最终透明度为0 */
    }
}
</style>