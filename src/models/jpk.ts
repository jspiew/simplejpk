import { Moment } from 'moment';


export interface IJPK {
    wersjaSchemy: string,
    kodSystemowy: string,
    kodFormularza: string,
    celZlozenia: string,
    dataWytworzeniaJPK: Moment,
    dataOd: Moment,
    dataDo: Moment,
    nazwaSystemu: "Excel",
    nip: string,
    pelnaNazwa: string,
    email: string
    sprzedaz: IFakturaSprzedazy[]
    zakup: IFakturaZakupu[]
}

export interface IFakturaSprzedazy {
    nrKontrahenta: string,
    nazwaKontrahenta: string,
    adresKontrahenta: string,
    dowodSprzedazy: string,
    dataWystawienia: Moment,
    dataSprzedazy: Moment,
    k19: number,
    k20: number
}

export interface IFakturaZakupu {
    nrDostawcy: string,
    nazwaDostawcy: string,
    adresDostawcy: string,
    dowodZakupu: string,
    dataZakupu: Moment,
    dataWplywu: Moment
    k45: number
    k46: number
}
