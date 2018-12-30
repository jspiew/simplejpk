import { Moment } from 'moment';


export interface IJPK {
    dataWytworzeniaJPK: Moment,
    dataOd: Moment,
    dataDo: Moment,
    nip: string,
    pelnaNazwa: string,
    email: string
    sprzedaz: IFakturaSprzedazy[]
    podatekSprzedaz: number,
    zakup: IFakturaZakupu[]
    podatekZakup: number
}

export interface IFakturaSprzedazy {
    nrKontrahenta: string,
    nazwaKontrahenta: string,
    adresKontrahenta: string,
    dowodSprzedazy: string,
    dataWystawienia?: Moment,
    dataSprzedazy?: Moment,
    vat: number,
    k19: number | undefined,
    k20: number | undefined
}

export interface IFakturaZakupu {
    nrDostawcy: string,
    nazwaDostawcy: string,
    adresDostawcy: string,
    dowodZakupu: string,
    dataZakupu: Moment | undefined,
    dataWplywu: Moment | undefined,
    vat: number,
    k45: number | undefined,
    k46: number | undefined
}
