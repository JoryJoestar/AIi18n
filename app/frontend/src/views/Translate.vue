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
        <button @click="translateFetch">translate</button>
        {{ translate_content }}
    </div>
</template>

<style lang="scss"></style>