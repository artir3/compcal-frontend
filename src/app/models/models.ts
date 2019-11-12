export interface UserRegister {
    email: string,
    firstName: string,
    surname: string,
    company: string,
    nip: string,
    street: string,
    parcelNo: string,
    homeNo: string,
    zip: string,
    city: string,
    country: string,
    password: string,
    taxForm: string
}

export interface User {
    id: number,
    email: string,
    firstName: string,
    company: string,
    nip: string,
    surname: string,
    street: string,
    parcelNo: string,
    homeNo: string,
    zip: string,
    city: string,
    taxForm: string,
    pkd: string,
    regon: string,
    country: string,
    password: string,
    bankAccountSet: BankAccount[],
}

export interface BankAccount {
    id: number,
    accountNo: string,
    currency: string,
    swift: string,
}

export interface DialogData {
    title: string,
    context: string
}

export interface YesNoDialogData {
    title: string,
    context: string,
    yesButton: string,
    noButton: string
}

export interface Kpir {
    id: number,
    idx: number;
    economicEventDate: Date;
    registrationNumber: string;
    fullName: string;
    address: string;
    description: string;
    soldIncome: number;
    otherIncome: number;
    allIncome: number;
    purchaseCosts: number;
    purchaseSideCosts: number;
    paymentCost: number;
    otherCosts: number;
    sumCosts: number;
    other: number;
    comments: string,
    payed: Boolean,
    paymentDateMin: Date,
    paymentDateMax: Date,
    type: string
    radDescription: string,
    radCosts: number,
    overduePayment: Boolean;
    currency: string,
}

export interface Contractor {
    id: number,
    email: string,
    firstname: string,
    company: string,
    nip: string,
    surname: string,
    street: string,
    parcelNo: string,
    homeNo: string,
    zip: string,
    city: string,
    country: string,
    phone: string,
    trade: string,
    bankAccounts: BankAccount[],
    creditor: boolean,
    debtor: boolean,
    creditorAmount: number,
    debtorAmount: number,
}

export interface ContractorMini {
    id: number,
    personName: string,
    company: string,
    nip: string,
    contact: string,
    address: string,
    trade: string
    creditor: boolean,
    debtor: boolean,
}

export interface ContractorSelect {
    id: number,
    company: string,
}

export interface ContractorFilter {
    company: string,
    nip: string,
    person: string,
    trade: string
}

export interface KpirFilter {
    company: string,
    nip: string,
    registrationNumber: string,
    economicEventDate: Date,
    isPayed: boolean,
    notPayed: boolean,
    overdue: boolean,
    selectedYear: number,
    selectedMonth: number,
    type: string,
}

export interface ActivateModel {
    code: string,
}

export class Card {
    site: string;
    title: string;
    url: string
}
