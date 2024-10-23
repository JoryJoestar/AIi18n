type ProjectItem = {
    name: string
    description: string
    data: ProjectData[]
}

type ProjectData = {
    position: string
    translate: TranslateItem[]
}

