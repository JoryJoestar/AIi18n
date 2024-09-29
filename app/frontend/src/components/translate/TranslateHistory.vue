<script lang="ts" setup>
import { useTranslateStore } from '~/stores/translateStore';

const translateStore = useTranslateStore();

</script>

<template>
    <div class="translate-history">
        <h3>History</h3>
        <ul>
            <li v-for="(item, index) in translateStore.history" :key="index">
                {{ item.sourceText }} ({{ item.sourceLang }}) → {{ item.targetText }} ({{ item.targetLang }})
                <span class="timestamp">[{{ translateStore.formatTimestamp(item.timestamp) }}]</span> <!-- 显示时间戳 -->
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
.translate-history {
    padding: 1rem;
    border: 1px solid #eeeeee;
    border-radius: 0.5rem;
    max-height: 300px;
    overflow-y: auto;
}
</style>