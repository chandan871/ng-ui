export interface Users {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    companyId: string;
}

export interface Login {
    email: string;
    password: string;
}

export interface Company {
    id: string;
    name: string;
    logo: string;
    description: string;
}

export interface ContactList {
    [x: string]: any;
    name: string;
    country: string;
    phone: string;
    companyId: number;
    id: number;
}
