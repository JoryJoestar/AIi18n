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
        <div class="search-input">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M18.319 14.4326C20.7628 11.2941 20.542 6.75347 17.6569 3.86829C14.5327 0.744098 9.46734 0.744098 6.34315 3.86829C3.21895 6.99249 3.21895 12.0578 6.34315 15.182C9.22833 18.0672 13.769 18.2879 16.9075 15.8442C16.921 15.8595 16.9351 15.8745 16.9497 15.8891L21.1924 20.1317C21.5829 20.5223 22.2161 20.5223 22.6066 20.1317C22.9971 19.7412 22.9971 19.1081 22.6066 18.7175L18.364 14.4749C18.3493 14.4603 18.3343 14.4462 18.319 14.4326ZM16.2426 5.28251C18.5858 7.62565 18.5858 11.4246 16.2426 13.7678C13.8995 16.1109 10.1005 16.1109 7.75736 13.7678C5.41421 11.4246 5.41421 7.62565 7.75736 5.28251C10.1005 2.93936 13.8995 2.93936 16.2426 5.28251Z"
                    fill="currentColor" />
            </svg>
            <input type="text" v-model="searchQuery" placeholder="Search languages..." />
        </div>

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
        display: flex;
        align-items: center;
        border-bottom: 1px solid #eeeeee;
        transition: border-color .15s ease-in-out;
        margin-bottom: 1rem;

        &:focus-within {
            border-color: rgba(0, 0, 0, 0.5); // 聚焦时边框颜色变化
        }

        svg {
            width: 1.5rem;
            height: 1.5rem;
        }

        input {
            width: 100%;
            padding: .5rem;
            border-radius: .25rem;
        }

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