type TranslateItem = {
    id: string,
    source_text: string;
    source_language: string;
    target_language: string;
    prompt_version: string;
    replacement: Replacement[];
};

type Replacement = {
    source_text: string;
    replacement: string;
};

type TranslateResponse = {
    code: number
    data: {
        translate_content: string
        translate_elapsed_time: string;
        prompt_tokens: string;
        output_tokens: string
        total_tokens: string
    }
}

type Language = {
    "local-name": string
    "zh-name": string
    "en-name": string
    "code": string
    "code-iso639-2": string
}

type HistoryItem = {
    id: string;
    sourceText: string;
    targetText: string;
    sourceLang: string;
    targetLang: string;
    timestamp: Date;
}