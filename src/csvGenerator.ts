import { IJPK } from './models/jpk';
import { IJpkCsvRow } from './models/csv';
import * as df from "dateformat"
import * as numeral from "numeral"

function formatDate(date:Date, includeTime: boolean){
    if(includeTime){
        return df(date, "yyyy-mm-ddThh:MM:ss")
    }
    else {
        return df(date, "yyyy-mm-dd")
    }
}

export function downloadCSV(jpk: IJPK){
    let csvContent = "data:text/csv;charset=utf-8,";
    
    const header = getHeaderRows(jpk);
    const sell = getSellRows(jpk);
    const buy = getBuyRows(jpk);

    const jpkContent = [...header,...sell,...buy]

    const encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
}

function getSellRows(jpk: IJPK){
    const rows: IJpkCsvRow[]  = [];
    jpk.sprzedaz.forEach((invoice,index) => {
        const invRow = getEmptyRow();
        invRow.LpSprzedazy = (index+1).toString();
        invRow.NrKontrahenta = invoice.nrKontrahenta === null || invoice.nrKontrahenta === undefined || invoice.nrKontrahenta === "" ? "brak" : invoice.nrKontrahenta;
        invRow.NazwaKontrahenta = invoice.nazwaKontrahenta;
        invRow.AdresKontrahenta = invoice.adresKontrahenta;
        invRow.DowodSprzedazy = invoice.dowodSprzedazy;
        invRow.DataWystawienia = formatDate(invoice.dataWystawienia,false);
        invRow.DataSprzedazy = formatDate(invoice.dataSprzedazy, false);
        invRow.K_19 = numeral(invoice.k19).format("0,00");
        invRow.K_20 = numeral(invoice.k20).format("0,00");      
        rows.push(invRow);
    })
    
    const sellSummaryRow = getEmptyRow();
    sellSummaryRow.PodatekNalezny = numeral(0).format("0,00");
    sellSummaryRow.LiczbaWierszySprzedazy = rows.length.toString();
    
    return [...rows,sellSummaryRow];
}

function getBuyRows(jpk: IJPK) {
    const rows: IJpkCsvRow[] = [];
    jpk.zakup.forEach((invoice, index) => {
        const invRow = getEmptyRow();
        invRow.LpZakupu = (index + 1).toString();
        invRow.NrDostawcy = invoice.nrDostawcy === null || invoice.nrDostawcy === undefined || invoice.nrDostawcy === "" ? "brak" : invoice.nrDostawcy;
        invRow.NazwaDostawcy = invoice.nazwaDostawcy;
        invRow.AdresDostawcy = invoice.adresDostawcy;
        invRow.DowodZakupu = invoice.dowodZakupu;
        invRow.DataZakupu = formatDate(invoice.dataZakupu,false);
        invRow.DataWplywu = formatDate(invoice.dataWplywu,false);
        invRow.K_45 = numeral(invoice.k45).format("0,00");
        invRow.K_46 = numeral(invoice.k46).format("0,00");
        rows.push(invRow);
    })

    const buySummaryRow = getEmptyRow();
    buySummaryRow.PodatekNaliczony = numeral(0).format("0,00");
    buySummaryRow.LiczbaWierszyZakupow = rows.length.toString();

    return [...rows, buySummaryRow];
}

function getHeaderRows(jpk: IJPK){
    const headerRow = getEmptyRow();
    headerRow.KodFormularza= "JPK_VAT";
    headerRow.kodSystemowy= "JPK_VAT (3)";
    headerRow.wersjaSchemy= "1-1";
    headerRow.WariantFormularza= "3";
    headerRow.CelZlozenia= "0";
    headerRow.DataWytworzeniaJPK= formatDate(jpk.dataWytworzeniaJPK,true);
    headerRow.DataOd= formatDate(jpk.dataOd,false);
    headerRow.DataDo= formatDate(jpk.dataDo,false);
    headerRow.NazwaSystemu= "Excel";
    headerRow.AdresDostawcy= null;

    const submitterRow = getEmptyRow();
    submitterRow.NIP = jpk.nip,
    submitterRow.PelnaNazwa= jpk.pelnaNazwa,
    submitterRow.Email= jpk.email

    const delimitterRow = getEmptyRow();

    return [headerRow,submitterRow,delimitterRow]
}

function getEmptyRow(){
    const emptyRow: IJpkCsvRow = {
        KodFormularza: null,
        kodSystemowy: null,
        wersjaSchemy: null,
        WariantFormularza: null,
        CelZlozenia: null,
        DataWytworzeniaJPK: null,
        DataOd: null,
        DataDo: null,
        NazwaSystemu: null,
        NIP: null,
        PelnaNazwa: null,
        Email: null,
        LpSprzedazy: null,
        NrKontrahenta: null,
        NazwaKontrahenta: null,
        AdresKontrahenta: null,
        DowodSprzedazy: null,
        DataWystawienia: null,
        DataSprzedazy: null,
        K_10: null,
        K_11: null,
        K_12: null,
        K_13: null,
        K_14: null,
        K_15: null,
        K_16: null,
        K_17: null,
        K_18: null,
        K_19: null,
        K_20: null,
        K_21: null,
        K_22: null,
        K_23: null,
        K_24: null,
        K_25: null,
        K_26: null,
        K_27: null,
        K_28: null,
        K_29: null,
        K_30: null,
        K_31: null,
        K_32: null,
        K_33: null,
        K_34: null,
        K_35: null,
        K_36: null,
        K_37: null,
        K_38: null,
        K_39: null,
        LiczbaWierszySprzedazy: null,
        PodatekNalezny: null,
        LpZakupu: null,
        NrDostawcy: null,
        NazwaDostawcy: null,
        AdresDostawcy: null,
        DowodZakupu: null,
        DataZakupu: null,
        DataWplywu: null,
        K_43: null,
        K_44: null,
        K_45: null,
        K_46: null,
        K_47: null,
        K_48: null,
        K_49: null,
        K_50: null,
        LiczbaWierszyZakupow: null,
        PodatekNaliczony: null
    }

    return emptyRow;
}