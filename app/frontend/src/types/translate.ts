type Language = {
    "local-name": string
    "zh-name": string
    "en-name": string
    "code": string
    "code-iso639-2": string
}

// ===Translate===
type ReqTranslate = {
    source_content: string
    source_language: string
    translate_language: string
    prompt_version: string
    replacement: ReqReplacement[]

};

type ResTranslate = {
    id: number
    source_content: string
    translate_content: string
    source_langauge: string
    translate_language: string
    prompt_version: string
    translate_elapsed_time_second: number
    prompt_tokens: number
    output_tokens: number
    created_at: string
    updated_at: string

    project_item_id: number
}

// ===Replacement===
type ReqReplacement = {
    source_content: string
    replacement: string

    translate_id: number
};

type ResReplacement = {
    id: number
    source_content: string
    replacement: string
    translate_id: number
    created_at: string
    updated_at: string
}

// ===table===

type table = {
    
}



type HistoryItem = {
    id: string;
    sourceText: string;
    targetText: string;
    sourceLang: string;
    targetLang: string;
    timestamp: Date;
}

