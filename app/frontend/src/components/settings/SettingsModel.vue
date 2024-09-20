<script lang="ts" setup>

const openai_models = {
    "name": "OpenAI",
    "icon": "https://openai.com/favicon.ico",
    "list": [
        {
            "name": "GPT 4o Mini",
            "value": "gpt-4o-mini"
        },

    ]
}

const google_models = {
    "name": "Gemini",
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
    "icon": "https://claude.ai/favicon.ico",
    "list": [
        {
            "name": "Claude 3.5 Sonnet",
            "value": "claude-3-5-sonnet"
        }
    ]
}


const models = [
    openai_models,
    google_models,
    anthropic_models
]

</script>

<template>
    <div class="settings-model">
        <div class="settings-model-header">
            Model
        </div>
        <div class="settings-model-main">
            <div class="settings-model-main-item" v-for="platform, index in models" :key="index">
                <div class="settings-model-main-item-body">
                    <div class="settings-model-main-item-body-title">
                        <img class="settings-model-main-item-body-title-icon" :src="platform.icon" alt="">
                        <div class="settings-model-main-item-body-title-name">{{ platform.name }}</div>
                    </div>
                    <div class="settings-model-main-item-body-setup">
                        API-KEY Set Up
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
        font-size: 1.25rem;
        margin-bottom: 1.5rem;
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

                &-setup {
                    font-size: .8rem;
                    background-color: rgba(0, 0, 0, 0.75);
                    color: white;
                    padding: .5rem .75rem;
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
</style>