type Page = {
    name: string;
    title: string;
    description: string;
    points: string[];
};

type Dictionary<T extends Record<string, Page>> = {
    pages: T;
};

export type PagesDictionary =  Dictionary<{
    home: Page;
    rewrite: Page;
    humanizer: Page;
    research: Page;
}>

export type Languages = 'en' | 'es' | 'nl' | 'ar';