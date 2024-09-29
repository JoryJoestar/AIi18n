type ProjectItem = {
    id: string;
    name: string;
    data: ProjectData[]
    description: string
    createdAt: Date
    recentAt?: Date
}

type ProjectData = {
    id: string;
    location: string;
    translate: TranslateItem[]
    description: string;
}

