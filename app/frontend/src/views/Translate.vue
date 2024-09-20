<script lang="ts" setup>
import { ref } from 'vue';
import { translate } from '~/apis/translate';

const translate_content = ref<string>('none'); // 翻译内容

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
                Single
            </div>
            <div class="translate-nav-item multiple">
                Multiple
            </div>
        </div>
        <div class="translate-main">
            <div class="translate-main-source">
                <div class="translate-main-source-input"></div>
                <div class="translate-main-source-clear">CLEAR</div>
                <div class="translate-main-source-more">
                    <div class="translate-main-source-more-copy">COPY</div>
                    <div class="translate-main-source-more-start" @click="translateFetch">
                        START
                    </div>
                </div>
            </div>
            <div class="translate-main-language">
                <div class="translate-main-language-source"></div>
                <div class="translate-main-language-exchange"></div>
                <div class="translate-main-language-target"></div>
            </div>
            <div class="translate-main-target">
                <div class="translate-main-target-content">
                    {{ translate_content }}</div>
                <div class="translate-main-target-more">
                    <div class="translate-main-target-more-copy">COPY</div>
                </div>
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
}
</style>