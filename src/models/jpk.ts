

export interface IJPK {
    wersjaSchemy: string,
    kodSystemowy: string,
    kodFormularza: string,
    celZlozenia: string,
    dataWytworzeniaJPK: Date,
    dataOd: Date,
    dataDo: Date,
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
    dataWystawienia: Date,
    dataSprzedazy: Date,
    k19: number,
    k20: number
}

export interface IFakturaZakupu {
    nrDostawcy: string,
    nazwaDostawcy: string,
    adresDostawcy: string,
    dowodZakupu: string,
    dataZakupu: Date,
    dataWplywu: Date
    k45: number
    k46: number
}