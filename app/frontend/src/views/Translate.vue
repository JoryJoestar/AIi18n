<script lang="ts" setup>
import { ref } from 'vue';
import { translate } from '~/apis/translate';

const tranlsate_source_text = ref<string>('');
const translate_source_language = ref<string>('en-US');
const translate_target_language = ref<string>('zh-CN')
const translate_target_text = ref<string>(''); // 翻译内容

const messageVisible = ref(false);
const messageContent = ref(''); // 用于存储消息内容
const messageDuration = ref(0);
const messageType = ref<string>('info');
const messageCloseButtonVisible = ref<boolean>(false);

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
        showMessage('Success', 2000, 'success'); // 显示消息
    });

};
const copyTargetText = () => {
    navigator.clipboard.writeText(translate_target_text.value).then(() => {
        showMessage('Success', 2000, 'success'); // 显示消息
    });
};

const translateFetch = () => {
    if (tranlsate_source_text.value.trim() === '') {
        showMessage('Source text cannot be empty!', 2000, 'error'); // 弹出提示
        return; // 退出函数，不进行翻译
    }

    const params: TranslateParams = {
        source_text: tranlsate_source_text.value,
        source_language: translate_source_language.value,
        target_language: translate_target_language.value,
        prompt_version: 'v2',
        replacement: []
    }
    translate(params).then(res => {
        console.log(res)
        if (res.code === 200) {
            translate_target_text.value = res.data.translate_content; // 更新翻译内容
        }
    })
};

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
                        <div class="translate-main-tools-left-language-source">
                            {{ translate_source_language }}
                        </div>
                        <div class="translate-main-tools-left-language-exchange"><-></div>
                        <div class="translate-main-tools-left-language-target">
                            {{ translate_target_language }}
                        </div>
                    </div>

                    <div class="translate-main-tools-left-start" @click="translateFetch">
                        START
                    </div>
                </div>

                <div class="translate-main-tools-right"></div>
            </div>
            <div class="translate-main-container">
                <div class="translate-main-source">
                    <textarea class="translate-main-source-input" placeholder="source text..."
                        v-model="tranlsate_source_text" @keydown.enter="translateFetch"></textarea>
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
        <Message v-if="messageVisible" :message="messageContent" :type="messageType" :duration="messageDuration" :close-button-visible="messageCloseButtonVisible"
            @close="messageVisible = false" />
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

                    &-source {
                        display: flex;
                        align-items: center;
                        margin-right: .75rem;
                        cursor: pointer;
                        transition: all .15s ease-in-out;
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
                        margin-left: .75rem;
                        cursor: pointer;
                        transition: all .15s ease-in-out;
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
                    background-color: rgba(0, 0, 0, 0.7);
                    border-radius: .5rem;
                    color: white;
                    cursor: pointer;
                    transition: all .15s ease-in-out;
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
}
</style>