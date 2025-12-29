export interface Award {
    title: string;
    organization: string;
    year: string;
    url?: string;
}

export interface Project {
    name: string;
    slug: string;
    category?: string;
    link?: string;
    image?: string;
    video?: string;
}

export interface SocialLink {
    platform: string;
    handle: string;
    url: string;
}

export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
    isThinking?: boolean;
}
