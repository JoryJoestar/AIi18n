<script lang="ts" setup>
import { ref, computed } from 'vue';
import languages from '~/assets/data/languages.json'; // 确保路径正确

const props = defineProps<{
    selectedLanguage: string; // 接收已选择的语言
}>();

const searchQuery = ref('');
const selectedLanguage = ref<Language>();

const emit = defineEmits(['close', 'language-selected']);

const filteredLanguages = computed(() => {
    return languages.filter(language =>
        language['zh-name'].toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        language['local-name'].toLowerCase().includes(searchQuery.value.toLowerCase()) || language['en-name'].toLowerCase().includes(searchQuery.value.toLowerCase()) || language['code'].toLowerCase().includes(searchQuery.value.toLowerCase()) || language['code-iso639-2'].toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

const selectLanguage = (language: Language) => {
    selectedLanguage.value = language;
    // Emit the selected language to the parent component
    selectedLanguage.value = language;
    emit('language-selected', language);
    emit('close'); // 选择后关闭选择框
};
</script>

<template>
    <div class="language-selector">
        <input type="text" v-model="searchQuery" placeholder="Search languages..." class="search-input" />
        <ul class="language-list">
            <li v-for="language in filteredLanguages" :key="language.code">
                <div @click="selectLanguage(language)" :class="{ selected: props.selectedLanguage === language.code }">
                    {{ language['zh-name'] }} ({{ language['code'] }})
                </div>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
.language-selector {
    /* 确保在其他元素之上 */
    width: 25rem;
    margin: 0 auto;
    background-color: white;
    border: 1px solid #eeeeee;
    border-radius: .5rem;
    padding: .5rem .75rem;

    .search-input {
        width: 100%;
        padding: 0.5rem;
        border-radius: 4px;
        margin-bottom: 1rem;
        border-bottom: 1px solid #eeeeee;
    }

    .language-list {
        list-style: none;
        padding: 0;
        margin: 0;
        max-height: 200px;
        /* 设置最大高度 */
        overflow-y: auto;
        /* 超出时启用垂直滚动 */

        li {
            // padding: 0.5rem;
            cursor: pointer;
            transition: background-color 0.2s;

            div {
                padding: 0.5rem;
                transition: background-color 0.2s;

                &:hover {
                    background-color: #f0f0f0;
                }

                &.selected {
                    background-color: #d0e0ff;
                    /* 高亮选中的语言 */
                }
            }
        }
    }
}
</style>