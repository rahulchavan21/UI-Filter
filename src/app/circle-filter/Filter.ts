export interface Filter {
    name: string;
    weight: number;
    type: number;
}

export class MainFilter implements Filter {
    name: string;
    weight: number;
    type: number;

    constructor(name: string, weight: number, type: number) {
        this.name = name;
        this.weight = weight;
        this.type = type;
    }
}

export class SubFilter implements Filter {
    name: string;
    weight: number;
    type: number;
    mainFilter: string[];

    constructor(name: string, weight: number, type: number, mainFilter: []) {
        this.name = name;
        this.weight = weight;
        this.type = type;
        this.mainFilter = mainFilter;
    }
}