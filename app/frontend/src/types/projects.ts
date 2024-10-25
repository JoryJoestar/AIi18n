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