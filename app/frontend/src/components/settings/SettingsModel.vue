<script lang="ts" setup>
import { ref } from 'vue';


const openai_models = {
    "name": "OpenAI",
    "icon": "https://openai.com/favicon.ico",
    "api_key": "",
    "list": [
        {
            "name": "GPT 4o Mini",
            "value": "gpt-4o-mini"
        },

    ]
}

const google_models = {
    "name": "Gemini",
    "api_key": "",
    "icon": "https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg",
    "list": [
        {
            "name": "Gemini 1.0 Pro",
            "value": "gemini-1.0-pro",
        },
        {
            "name": "Gemini 1.5 Flash",
            "value": "gemini-1.5-flash"
        }


    ]
}

const anthropic_models = {
    "name": "Anthropic",
    "api_key": "",
    "icon": "https://claude.ai/favicon.ico",
    "list": [
        {
            "name": "Claude 3.5 Sonnet",
            "value": "claude-3-5-sonnet"
        }
    ]
}

const models = ref([
    openai_models,
    google_models,
    anthropic_models
])

</script>

<template>
    <div class="settings-model">
        <div class="settings-model-header">

        </div>
        <div class="settings-model-main">
            <div class="settings-model-main-item" v-for="platform, index in models" :key="index">
                <div class="settings-model-main-item-body">
                    <div class="settings-model-main-item-body-title">
                        <img class="settings-model-main-item-body-title-icon" :src="platform.icon" alt="">
                        <div class="settings-model-main-item-body-title-name">{{ platform.name }}</div>
                    </div>
                    <div class="settings-model-main-item-body-apikey">
                        <span :class="{ 'set': platform.api_key !== '' }">API-KEY</span>
                        <div class="settings-model-main-item-body-apikey-setup">
                            Set Up
                        </div>
                    </div>

                </div>
                <div class="settings-model-main-item-models">
                    <div class="settings-model-main-item-models-item" v-for="model, index in platform.list"
                        :key="index">
                        <div class="settings-model-main-item-models-item-name">{{ model.name }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.settings-model {
    width: 100%;

    &-header {
        margin-bottom: 2.5rem;
    }

    &-main {
        &-item {
            padding: 1rem 1.25rem;
            margin: .5rem 0;
            background-color: #f4f4f4;
            border-radius: .5rem;

            &-body {
                display: flex;
                justify-content: space-between;

                &-title {
                    display: flex;
                    align-items: center;

                    &-icon {
                        width: 1.5rem;
                        height: 1.5rem;
                    }

                    &-name {
                        font-size: 1.25rem;
                        margin-left: .5rem;
                    }

                }

                &-apikey {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: .5rem .75rem;
                    border: 1px solid rgba(0, 0, 0, 0.25);
                    border-radius: .5rem;

                    span {
                        font-size: .75rem;
                        margin-bottom: .25rem;
                        display: flex;
                        align-items: center;
                    }

                    span::before {
                        content: "";
                        width: .6rem;
                        height: .6rem;
                        background-color: rgba(0, 0, 0, 0.25);
                        border-radius: .5rem;
                        margin-right: .5rem;
                    }

                    span.set::before {
                        background-color: rgb(54, 230, 54);
                    }

                    &-setup {
                        font-size: .8rem;
                        background-color: rgba(0, 0, 0, 0.75);
                        color: white;
                        padding: .25rem 1.25rem;
                        border-radius: .5rem;
                        cursor: pointer;
                        transition: all .15s ease-in-out;
                    }

                    &-setup:hover {
                        background-color: rgba(0, 0, 0, 0.6);
                    }
                }
            }
        }
    }
}
</style>