type TranslateParams = {
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