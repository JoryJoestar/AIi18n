<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useTranslateStore } from '~/stores/translateStore';

import languages from '~/assets/data/languages.json'; // 确保路径正确

const translateStore = useTranslateStore();

const searchQuery = ref('');
const selectedLanguage = ref<Language>();
const showLanguageSelector = ref<boolean>(false); // 控制语言选择框的显示

const filteredLanguages = computed(() => {
    return translateStore.translate_languages.filter(language =>
        language['zh_name'].toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        language['local_name'].toLowerCase().includes(searchQuery.value.toLowerCase()) || language['en_name'].toLowerCase().includes(searchQuery.value.toLowerCase()) || language['code'].toLowerCase().includes(searchQuery.value.toLowerCase()) || language['code_iso639_2'].toLowerCase().includes(searchQuery.value.toLowerCase())
    )
});

const initLanguagesFormat = () => {
    translateStore.translate_languages = languages.map((language, index) => {
        return {
            langId: index,
            display: false,
            ...language
        }
    })
}

const selectLanguage = (language: Language) => {

    const index = translateStore.translate_languages.findIndex(lang => lang.code === language.code); // 查找语言的索引
    translateStore.translate_languages[index].display = !translateStore.translate_languages[index].display
}

const handleClickLanauageSelector = () => {
    showLanguageSelector.value = !showLanguageSelector.value;
}

// 点击外部收起选择框
const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const languageSelectorElement = document.querySelector('.project-select-languages-selector');
    const languageSelectorButtonElement = document.querySelector('.project-select-languages-button');
    // 检查点击的目标是否在语言选择框或其父元素内
    if (languageSelectorElement && !languageSelectorElement.contains(target) && languageSelectorButtonElement && !languageSelectorButtonElement.contains(target)
    ) {
        showLanguageSelector.value = false;
    }
};

onMounted(() => {
    if (translateStore.translate_languages.length === 0) {
        initLanguagesFormat();
    }
    document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
});

</script>

<template>
    <div class="project-select-languages">
        <div class="project-select-languages-button" @click="handleClickLanauageSelector">
            <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill="#5f6368">
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path
                    d="M12.65 15.67c.14-.36.05-.77-.23-1.05l-2.09-2.06.03-.03c1.74-1.94 2.98-4.17 3.71-6.53h1.94c.54 0 .99-.45.99-.99v-.02c0-.54-.45-.99-.99-.99H10V3c0-.55-.45-1-1-1s-1 .45-1 1v1H1.99c-.54 0-.99.45-.99.99 0 .55.45.99.99.99h10.18C11.5 7.92 10.44 9.75 9 11.35c-.81-.89-1.49-1.86-2.06-2.88-.16-.29-.45-.47-.78-.47-.69 0-1.13.75-.79 1.35.63 1.13 1.4 2.21 2.3 3.21L3.3 16.87c-.4.39-.4 1.03 0 1.42.39.39 1.02.39 1.42 0L9 14l2.02 2.02c.51.51 1.38.32 1.63-.35zM17.5 10c-.6 0-1.14.37-1.35.94l-3.67 9.8c-.24.61.22 1.26.87 1.26.39 0 .74-.24.88-.61l.89-2.39h4.75l.9 2.39c.14.36.49.61.88.61.65 0 1.11-.65.88-1.26l-3.67-9.8c-.22-.57-.76-.94-1.36-.94zm-1.62 7l1.62-4.33L19.12 17h-3.24z" />
            </svg>
            <span :class="{ 'selected': true }"></span>
        </div>
        <!-- 语言选择框 -->
        <div class="project-select-languages-selector" v-if="showLanguageSelector">
            <ul class="language-list">
                <li v-for="language in filteredLanguages" :key="language.code">
                    <div @click="selectLanguage(language)" :class="{ selected: language.display }">
                        {{ language['zh_name'] }} ({{ language['code'] }})
                    </div>
                </li>
            </ul>

            <div class="search-input">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M18.319 14.4326C20.7628 11.2941 20.542 6.75347 17.6569 3.86829C14.5327 0.744098 9.46734 0.744098 6.34315 3.86829C3.21895 6.99249 3.21895 12.0578 6.34315 15.182C9.22833 18.0672 13.769 18.2879 16.9075 15.8442C16.921 15.8595 16.9351 15.8745 16.9497 15.8891L21.1924 20.1317C21.5829 20.5223 22.2161 20.5223 22.6066 20.1317C22.9971 19.7412 22.9971 19.1081 22.6066 18.7175L18.364 14.4749C18.3493 14.4603 18.3343 14.4462 18.319 14.4326ZM16.2426 5.28251C18.5858 7.62565 18.5858 11.4246 16.2426 13.7678C13.8995 16.1109 10.1005 16.1109 7.75736 13.7678C5.41421 11.4246 5.41421 7.62565 7.75736 5.28251C10.1005 2.93936 13.8995 2.93936 16.2426 5.28251Z"
                        fill="currentColor" />
                </svg>
                <input type="text" v-model="searchQuery" placeholder="Search languages..." />
            </div>
        </div>
    </div>
</template>
<style lang="scss">
.project-select-languages {
    &-button {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 2.75rem;
        cursor: pointer;
        transition: all .15s ease-in-out;
        border-radius: .25rem;
        padding: .25rem .5rem;

        svg {
            width: 1.5rem;
            height: 1.5rem;
            fill: white;
            pointer-events: none;
        }

        span {
            display: flex;
            justify-content: center;
            align-items: center;
            pointer-events: none;

            &::after {
                content: '';
                display: inline-block;
                width: 0;
                height: 0;
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                border-bottom: 5px solid white;
                margin-left: 5px;
                transition: all .15s ease-in;
            }

            &.selected {
                &::after {
                    transform: rotate(180deg);
                }
            }
        }
    }

    &-selector {
        position: absolute;
        bottom: 3rem;
        /* 确保在其他元素之上 */
        width: 25rem;
        margin: 0 auto;
        background-color: white;
        border: 1px solid #eeeeee;
        border-radius: .5rem;
        padding: .5rem .75rem;
        left: 50%; // 将选择器的左边距设置为 50%
        transform: translateX(-50%); // 向左移动自身宽度的一半以实现居中

        .search-input {
            display: flex;
            align-items: center;
            border: 1px solid #eeeeee;
            border-radius: .5rem;
            transition: border-color .15s ease-in-out;
            margin-top: .5rem;
            padding-left: .25rem;

            &:focus-within {
                border-color: rgba(0, 0, 0, 0.25); // 聚焦时边框颜色变化
            }

            svg {
                width: 1.5rem;
                height: 1.5rem;
                fill: black;
                color: black;
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
            color: black;
            font-size: 1rem;
            user-select: none;

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
}
</style>