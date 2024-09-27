<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { translate } from '~/apis/translate';
import { useTranslateStore } from '~/stores/translateStore';

const route = useRoute();

const translateStore = useTranslateStore();

const tranlsate_source_text = ref<string>('');
const translate_source_language = ref<string>('en-US');
const translate_target_language = ref<string>('zh-CN')
const translate_target_text = ref<string>(''); // 翻译内容
const isTranslating = ref(false); // 新增状态，跟踪翻译是否正在进行

const messageVisible = ref(false);
const messageContent = ref(''); // 用于存储消息内容
const messageDuration = ref(0);
const messageType = ref<string>('info');
const messageCloseButtonVisible = ref<boolean>(false);

const showLanguageSelector = ref(false); // 控制语言选择框的显示
const languageSelector = ref<string>('') // 什么来源选择语言 Source or Target
const selected_language = ref<string>('')

const clearSourceText = () => {
    tranlsate_source_text.value = '';
};

const showMessage = (msg: string, duration: number, type: string) => {
    messageContent.value = msg;
    messageDuration.value = duration;
    messageType.value = type;
    messageVisible.value = true;
    messageCloseButtonVisible.value = false;
};

const copySourceText = () => {
    navigator.clipboard.writeText(tranlsate_source_text.value).then(() => {
        showMessage('Success', 1500, 'success'); // 显示消息
    });

};
const copyTargetText = () => {
    navigator.clipboard.writeText(translate_target_text.value).then(() => {
        showMessage('Success', 1500, 'success'); // 显示消息
    });
};

const translateFetch = async () => {
    if (tranlsate_source_text.value.trim() === '') {
        return; // 退出函数，不进行翻译
    }

    isTranslating.value = true; // 开始翻译时设置状态

    const params: TranslateParams = {
        source_text: tranlsate_source_text.value,
        source_language: translate_source_language.value,
        target_language: translate_target_language.value,
        prompt_version: 'v2',
        replacement: []
    }

    // @ts-ignore
    const res = await window.electronAPI.translate(params)
    console.log(res)

    // translate(params).then(res => {
    //     console.log(res)
    //     isTranslating.value = false; // 翻译完成时恢复状态
    //     if (res.code === 200) {
    //         translate_target_text.value = res.data.translate_content; // 更新翻译内容
    //         translateStore.addHistory(tranlsate_source_text.value, translate_target_text.value, translate_source_language.value, translate_target_language.value, new Date()); // 添加当前时间戳
    //     }
    // }).catch(() => {
    //     isTranslating.value = false; // 处理错误时恢复状态
    //     showMessage('Translation failed!', 1500, 'error'); // 显示失败消息
    // });
};

const toggleLanguageSelector = (whichSelect: string) => {
    if (showLanguageSelector.value && languageSelector.value === whichSelect) {
        // 如果选择框已经打开且点击的是同一个语言选择器，则关闭选择框
        showLanguageSelector.value = false;
        languageSelector.value = '';
    } else {
        // 否则打开选择框并设置当前选择的语言
        showLanguageSelector.value = true;
        languageSelector.value = whichSelect;
    }

    if (whichSelect === 'source') {
        selected_language.value = translate_source_language.value;
    } else {
        selected_language.value = translate_target_language.value;
    }
};

const updateSourceLanguage = (language: Language) => {
    if (languageSelector.value === 'source') {
        translate_source_language.value = language.code; // 更新源语言
    } else if (languageSelector.value === 'target') {
        translate_target_language.value = language.code; // 更新目标语言
    }

    showLanguageSelector.value = false; // 选择后关闭选择框
    languageSelector.value = ''
};

const exchangeTranslate = () => {
    const tempSourceLanguage = translate_source_language.value;
    translate_source_language.value = translate_target_language.value;
    translate_target_language.value = tempSourceLanguage;

    // 交换源文本和目标文本
    const tempSourceText = tranlsate_source_text.value;
    tranlsate_source_text.value = translate_target_text.value;
    translate_target_text.value = tempSourceText;
}

// 点击外部收起选择框
const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const languageSelectorElement = document.querySelector('.language-selector');
    const languageToggleElement = document.querySelector('.translate-main-tools-left-language'); // 语言选择器的父元素

    // 检查点击的目标是否在语言选择框或其父元素内
    if (languageSelectorElement && !languageSelectorElement.contains(target) &&
        languageToggleElement && !languageToggleElement.contains(target)) {
        showLanguageSelector.value = false;
        languageSelector.value = ''
    }
};

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
});

</script>

<template>
    <div class="translate">
        <div class="translate-header">
            <div class="translate-header-title">
                Translate
            </div>
        </div>
        <div class="translate-nav">
            <div class="translate-nav-item Single">
                <!-- Single -->
            </div>
            <div class="translate-nav-item multiple">
                <!-- Multiple -->
            </div>
        </div>
        <div class="translate-main">
            <div class="translate-main-tools">
                <div class="translate-main-tools-left">
                    <div class="translate-main-tools-left-language">
                        <div :class="{ 'selected': languageSelector === 'source' }"
                            class="translate-main-tools-left-language-source" @click="toggleLanguageSelector('source')">
                            {{ translate_source_language }}
                        </div>
                        <div class="translate-main-tools-left-language-exchange" @click="exchangeTranslate"><-></div>
                        <div :class="{ 'selected': languageSelector === 'target' }"
                            class="translate-main-tools-left-language-target" @click="toggleLanguageSelector('target')">
                            {{ translate_target_language }}
                        </div>

                        <!-- 语言选择框 -->
                        <LanguageSelector class="language-selector" v-if="showLanguageSelector"
                            @language-selected="updateSourceLanguage" :selected-language="selected_language"
                            @close="showLanguageSelector = false" />
                    </div>

                    <div class="translate-main-tools-left-start" @click="translateFetch">
                        <div v-if="isTranslating" class="spinner"></div>
                        <span v-else>START</span>
                    </div>
                </div>

                <div class="translate-main-tools-right"></div>
            </div>
            <div class="translate-main-container">
                <div class="translate-main-source">
                    <textarea class="translate-main-source-input" placeholder="source text..."
                        v-model="tranlsate_source_text"></textarea>
                    <div class="translate-main-source-more">
                        <div class="translate-main-source-more-left">
                            <div class="translate-main-source-more-left-clear" @click="clearSourceText">CLEAR</div>

                        </div>
                        <div class="translate-main-source-more-right">
                            <div class="translate-main-source-more-right-copy" @click="copySourceText">COPY</div>
                            <div class="translate-main-source-more-right-length">{{ tranlsate_source_text.length }}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="translate-main-target">
                    <div class="translate-main-target-content">
                        {{ translate_target_text }}</div>
                    <div class="translate-main-target-more">
                        <div class="translate-main-target-more-copy" @click="copyTargetText">COPY</div>
                        <div class="translate-main-target-more-length">{{ translate_target_text.length }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="tranlsate-history">
            <TranslateHistory></TranslateHistory>
        </div>
        <Message v-if="messageVisible" :message="messageContent" :type="messageType" :duration="messageDuration"
            :close-button-visible="messageCloseButtonVisible" @close="messageVisible = false" />
    </div>
</template>

<style lang="scss" scoped>
.translate {
    padding: 1rem;

    &-header {
        height: 4rem;

        &-title {
            font-size: .9rem;
        }
    }

    &-main {
        display: flex;
        flex-direction: column;
        width: 100%;

        &-tools {
            display: flex;
            margin-bottom: .5rem;

            &-left {
                display: flex;
                align-items: center;

                &-language {
                    display: flex;
                    align-items: center;
                    padding: .25rem 1.25rem;
                    border: 1px solid #eeeeee;
                    border-radius: .5rem;
                    margin-right: 1rem;
                    position: relative;

                    .language-selector {
                        position: absolute;
                        top: 3rem;
                        left: 0;
                    }

                    &-source {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin-right: .75rem;
                        cursor: pointer;
                        transition: all .15s ease-in-out;
                        width: 4rem;
                    }

                    &-source.selected {
                        color: green
                    }

                    &-source:hover {
                        color: green
                    }

                    &-source::after {
                        content: '';
                        display: inline-block;
                        width: 0;
                        height: 0;
                        border-left: 5px solid transparent;
                        /* 左边透明 */
                        border-right: 5px solid transparent;
                        /* 右边透明 */
                        border-top: 5px solid black;
                        /* 向下的三角形颜色 */
                        margin-left: 5px;
                        /* 三角形与文本的间距 */
                    }

                    &-exchange {
                        padding: .25rem .75rem;
                        cursor: pointer;
                        color: rgb(0, 0, 0, 0.5);
                        transition: all .15s ease-in-out;
                    }

                    &-exchange:hover {
                        padding: .25rem .75rem;
                        cursor: pointer;
                        color: rgb(0, 0, 0, 1);
                    }

                    &-target {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin-left: .75rem;
                        cursor: pointer;
                        transition: all .15s ease-in-out;
                        width: 4rem;
                    }

                    &-target.selected {
                        color: green
                    }

                    &-target:hover {
                        color: green
                    }

                    &-target::after {
                        content: '';
                        display: inline-block;
                        width: 0;
                        height: 0;
                        border-left: 5px solid transparent;
                        /* 左边透明 */
                        border-right: 5px solid transparent;
                        /* 右边透明 */
                        border-top: 5px solid black;
                        /* 向下的三角形颜色 */
                        margin-left: 5px;
                        /* 三角形与文本的间距 */
                    }
                }

                &-start {
                    padding: .5rem 1rem;
                    width: 5rem;
                    height: 2.3rem;
                    background-color: rgba(0, 0, 0, 0.7);
                    border-radius: .5rem;
                    color: white;
                    cursor: pointer;
                    transition: all .15s ease-in-out;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    .spinner {
                        border: .25rem solid rgba(255, 255, 255, 0.3);
                        border-top: .25rem solid #ffffff;
                        /* Spinner color */
                        border-radius: 50%;
                        width: 1.5rem;
                        height: 1.5rem;
                        animation: spin 1s linear infinite;
                        /* 旋转动画 */
                        margin-right: 5px;
                        /* Spinner 和文本之间的间距 */
                    }

                    @keyframes spin {
                        0% {
                            transform: rotate(0deg);
                        }

                        100% {
                            transform: rotate(360deg);
                        }
                    }
                }

                &-start:hover {
                    background-color: rgba(0, 0, 0, .8);
                }
            }
        }

        &-container {
            background: #eeeeee;
            display: flex;
            border-radius: .5rem;
        }

        &-source {
            width: 50%;
            border: 1px solid #eeeeee;
            padding-bottom: 0.5rem;
            background-color: white;
            border-top-left-radius: .5rem;
            border-bottom-left-radius: .5rem;

            &-input {
                width: 100%;
                height: 24rem;
                resize: none;
                padding: .5rem .75rem;
                font-size: .9rem;
            }

            &-more {
                width: 100%;
                display: flex;
                justify-content: space-between;
                font-size: .8rem;
                padding: 0 .75rem;

                &-left {
                    &-clear {
                        cursor: pointer;
                        color: rgba(0, 0, 0, 0.5);
                        transition: all .15s ease-in-out;
                    }

                    &-clear:hover {
                        color: rgba(0, 0, 0, 1);
                    }
                }

                &-right {
                    display: flex;
                    align-items: center;

                    &-copy {
                        cursor: pointer;
                        color: rgba(0, 0, 0, 0.5);
                        transition: all .15s ease-in-out;
                        margin-right: .5rem;
                    }

                    &-copy:hover {
                        color: rgba(0, 0, 0, 1);
                    }
                }
            }
        }

        &-target {
            flex: 1;

            &-content {
                width: 100%;
                height: 24rem;
                padding: .5rem.75rem;
                font-size: .9rem;
                margin-bottom: .5rem;
            }

            &-more {
                width: 100%;
                display: flex;
                justify-content: flex-end;
                font-size: .8rem;
                padding: 0 .75rem;

                &-copy {
                    cursor: pointer;
                    color: rgba(0, 0, 0, 0.5);
                    transition: all .15s ease-in-out;
                    margin-right: .5rem;
                }

                &-copy:hover {
                    color: rgba(0, 0, 0, 1);
                }

            }
        }
    }

    &-history {
        margin-top: 1rem;
    }
}
</style>