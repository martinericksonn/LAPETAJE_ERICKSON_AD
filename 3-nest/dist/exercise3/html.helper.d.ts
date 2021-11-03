export declare class HTML {
    elements: string[];
    start: string;
    end: string;
    br: string;
    add(v: string): void;
    nbsp: (iterations?: number) => string;
    h1: (v: string) => string;
    h2: (v: string) => string;
    h3: (v: string) => string;
    h4: (v: string) => string;
    h5: (v: string) => string;
    h6: (v: string) => string;
    hr: () => string;
    style: (v: string) => string;
    table: (v?: string[], style?: any) => string;
    div: (v?: string[], style?: any) => string;
    tr: (v?: string[]) => string;
    td: (v?: string[], colspan?: number, style?: any) => string;
    img: (v: string, width?: number | string, height?: number | string) => string;
    renderScreenHTML(): string;
    renderEmailHtml(): string;
}
