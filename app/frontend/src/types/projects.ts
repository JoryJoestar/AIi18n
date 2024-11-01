// === Project ===
type ReqProject = {
    name: string
    description: string
}

type ResProject = {
    id: number
    name: string
    description: string
    created_at: string
    updated_at: string
}

// === ProjectItem ===

type ReqProjectItem = {
    position: string
    project_id: string
}

type ResProjectItem = {
    id: number
    position: string
    project_id: string
    created_at: string
    updated_at: string
}

type ProjectItemAllData = {
    id: number
    position: string
    content?: {
        id: number
        source_content: string
        source_langauge: string
        translate_language: string
        translate?: {
            translate_content: string
            prompt_version: string
            translate_elapsed_time_second: number
            prompt_tokens: number
            output_tokens: number
            created_at: string
            updated_at: string
        }[]
    }[]
    project_id: string
    created_at: string
    updated_at: string

}