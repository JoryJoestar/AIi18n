<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue';
import { set_api_key } from '~/apis/settings';
import { useAppStore } from '~/stores/appStore';
import { get_api_key_status } from '~/apis/settings';

const appStore = useAppStore();
const api_key_status = ref<string[]>([]);

const openai_models = {
    "name": "OpenAI",
    "icon": "https://openai.com/favicon.ico",
    "api_key": false,
    "list": [
        {
            "name": "GPT 4o Mini",
            "value": "gpt-4o-mini"
        },

    ]
}

const google_models = {
    "name": "Gemini",
    "api_key": false,
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
    "api_key": false,
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

const setup_model = ref<string>("");
const apiKey = ref<string>("");
const setup_model_visible = ref<boolean>(false);

const openSetup = (model: string) => {
    setup_model.value = model;
    setup_model_visible.value = true;
}

const cancelSetupApiKey = () => {
    setup_model_visible.value = false;
}

const comfirmSetupApiKey = () => {
    if (apiKey.value === '')
        return

    set_api_key(setup_model.value, apiKey.value).then((res: any) => {
        if (setup_model.value === 'OpenAI') {
            models.value[0].api_key = true;
        } else if (setup_model.value === 'Gemini') {
            models.value[1].api_key = true;
        } else if (setup_model.value === 'Anthropic') {
            models.value[2].api_key = true;
        };
        setup_model_visible.value = false;
        console.log(res)
    }).catch((err) => {
        console.log(err)
    })
}

onBeforeMount(() => {
    get_api_key_status().then(res => {
        appStore.setApiKeyStatus(res.data)
        api_key_status.value = appStore.getApiKeyStatus()
    })

})

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
                        <span :class="{ 'set': api_key_status.includes(platform.name) }">API-KEY</span>
                        <div class="settings-model-main-item-body-apikey-setup" @click="openSetup(platform.name)">
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

        <div class="input-apikey-container" v-show="setup_model_visible">
            <div class="input-apikey-container-main">
                <div class="input-apikey-container-main-title">
                    Set Up {{ setup_model }}
                </div>
                <input class="input-apikey-container-main-input" type="text" v-model="apiKey"
                    placeholder="Enter your API Key" />
                <div class="input-apikey-container-main-controls">
                    <div class="input-apikey-container-main-controls-cancel" @click="cancelSetupApiKey">Cancel</div>
                    <div class="input-apikey-container-main-controls-comfirm" @click="comfirmSetupApiKey">
                        Comfirm
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

    .input-apikey-container {
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background-color: rgb(0, 0, 0, .5);
        z-index: 1000;
        display: flex;
        justify-content: center;
        align-items: center;

        &-main {
            $size: 8rem;
            position: absolute;
            z-index: 999;
            border-radius: .5rem;
            width: calc(4 * $size);
            // height: calc(2 * $size);
            background-color: white;
            display: flex;
            flex-direction: column;
            padding: 1rem 1.25rem;

            &-title {
                font-size: 1.25rem;
                margin-bottom: 1rem;
            }

            &-input {
                width: 100%;
                padding: 1rem .75rem;
                font-size: 1rem;
                border: 1px solid rgba(0, 0, 0, 0.25);
                border-radius: .5rem;
                margin-bottom: 1rem;
            }

            &-controls {
                display: flex;
                justify-content: flex-end;

                div {
                    padding: .5rem .75rem;
                    color: white;
                    cursor: pointer;
                    font-size: .9rem;
                    background-color: rgba(0, 0, 0, 0.75);
                    color: white;
                    border-radius: .5rem;
                    cursor: pointer;
                    transition: all .15s ease-in-out;
                }

                div:hover {
                    background-color: rgba(0, 0, 0, 0.6);
                }

                &-cancel {
                    margin-right: .5rem;
                }

                &-comfirm {}
            }
        }
    }
}
</style>