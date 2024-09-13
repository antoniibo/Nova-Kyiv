import config from '../config';

export interface Size {
    [key: string]: {
        remainder: number;
    };
}

export interface DataItem {
    id: number;
    category: number;
    popular: boolean;
    date: string;
    header: string;
    photos:string[];
    price: number;
    desc: string;
    addstaff: string[];
    size: Size;
}
export const fetchAllData =  async (): Promise<DataItem[]> => {
    const response = await fetch(`${config.BASE_URL}data`)
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    return response.json();
    
}
export const fetchSortedData = async (): Promise<DataItem[]> => {
    const response = await fetch(`${config.BASE_URL}data/sorted`);
    if (!response.ok) {
        throw new Error('Failed to fetch sorted data');
    }
    return response.json();
};

export const fetchPopularData = async (): Promise<DataItem[]> => {
    const response = await fetch(`${config.BASE_URL}data/popular`);
    if (!response.ok) {
        throw new Error('Failed to fetch popular data');
    }
    return response.json();
};

export const fetchCategoryData = async (category: number): Promise<DataItem[]> => {
    const response = await fetch(`${config.BASE_URL}data/category/${category}`);
    if (!response.ok) {
        throw new Error('Failed to fetch category data');
    }
    return response.json();
};

export const fetchDataById = async (id: number): Promise<DataItem> => {
    const response = await fetch(`${config.BASE_URL}data/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    return response.json();
};