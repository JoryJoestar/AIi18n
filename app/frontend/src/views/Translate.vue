<script lang="ts" setup>
import { ref } from 'vue';
import { translate } from '~/apis/translate';

const translate_content = ref<string>(''); // 翻译内容

const tranlsate_source_text = ref<string>('');
const translate_source_language = ref<string>('zh-CN');
const translate_target_language = ref<string>('en-US')

const sourceInputValue = (event: InputEvent) => {
    console.log(event)
    // tranlsate_source_text.value = event.data
}

const clearSourceText = () => {
    tranlsate_source_text.value = '';
};

const copySourceText = () => {
    navigator.clipboard.writeText(tranlsate_source_text.value);
};

const translateFetch = () => {
    const params: TranslateParams = {
        source_text: 'hello world',
        source_language: 'en-US',
        target_language: 'zh-CN',
        prompt_version: 'v2',
        replacement: []
    }
    translate(params).then(res => {
        console.log(res)
        if (res.code === 200) {
            translate_content.value = res.data.translate_content; // 更新翻译内容
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

            <div class="translate-main-source">
                <textarea class="translate-main-source-input" placeholder="source text..."
                    v-model="tranlsate_source_text"></textarea>
                <div class="translate-main-source-more">
                    <div class="translate-main-source-more-left">
                        <div class="translate-main-source-more-left-clear" @click="clearSourceText">CLEAR</div>

                    </div>
                    <div class="translate-main-more-right">
                        <div class="translate-main-source-more-right-copy" @click="copySourceText">COPY</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="translate-main-target">
            <div class="translate-main-target-content">
                {{ translate_content }}</div>
            <div class="translate-main-target-more">
                <div class="translate-main-target-more-copy">COPY</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
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
                    padding: .5rem 1.25rem;
                    background-color: rgba(0, 0, 0, 0.75);
                    border-radius: .5rem;
                    color: white;
                    cursor: pointer;
                    transition: all .15 ease-in-out;
                }

                &-start:hover {
                    background-color: rgba(0, 0, 0, 1);
                }
            }
        }


        &-source {
            width: 100%;
            border: 1px solid #eeeeee;
            padding-bottom: 1.5rem;
            position: static;

            &-input {
                width: 100%;
                height: 10rem;
                resize: none;
                padding: .5rem 1rem;
            }

            &-more {
                position: absolute;
                bottom: .5rem;
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
                    &-copy {
                        cursor: pointer;
                        color: rgba(0, 0, 0, 0.5);
                        transition: all .15s ease-in-out;
                    }

                    &-copy:hover {
                        color: rgba(0, 0, 0, 1);
                    }
                }
            }
        }
    }
}
</style>