import { IJPK } from './models/jpk';
import { IJpkCsvRow } from './models/csv';
import * as numeral from "numeral"
import { Moment } from 'moment';



function formatDate(moment: Moment, includeTime: boolean){
    if (moment === null || moment === undefined){
        return null;
    } else if(includeTime){
        return moment.format("YYYY-MM-DDThh:mm:ss");
    }
    else {
        return moment.format("YYYY-MM-DD");
    }
}

export function downloadCSV(jpk: IJPK){
    let csvContent = "";
    
    const header = getHeaderRows(jpk);
    const sell = getSellRows(jpk);
    const buy = getBuyRows(jpk);

    const jpkContent = [...header, ...buy, ...sell]
    
    csvContent+=getHeaderRow();
    jpkContent.forEach(row => {
        csvContent += csvRow(row);
    })

    const link = document.createElement('a');
    link.setAttribute('href', "data:text/csv;charset=utf-8," + encodeURI(csvContent));
    link.setAttribute('download',`JPKVAT ${jpk.dataOd.format("mm.yyyy")}.csv`);
    link.click();
    
    
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
        invRow.DataWystawienia = formatDate(invoice.dataWystawienia as Moment,false);
        invRow.DataSprzedazy = formatDate(invoice.dataSprzedazy as Moment, false);
        invRow.K_19 = numeral(invoice.k19).format("0.00").replace(",", ".");
        invRow.K_20 = numeral(invoice.k20).format("0.00").replace(",", ".");      
        rows.push(invRow);
    })
    
    const sellSummaryRow = getEmptyRow();
    sellSummaryRow.PodatekNalezny = numeral(jpk.podatekSprzedaz).format("0.00").replace(",", ".");
    sellSummaryRow.LiczbaWierszySprzedazy = rows.length.toString();
    
    return jpk.sprzedaz.length > 0  ? [...rows,sellSummaryRow] : [...rows]
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
        invRow.DataZakupu = formatDate(invoice.dataZakupu as Moment,false);
        invRow.DataWplywu = formatDate(invoice.dataWplywu as Moment,false);
        invRow.K_45 = numeral(invoice.k45).format("0.00").replace(",",".");
        invRow.K_46 = numeral(invoice.k46).format("0.00").replace(",", ".");
        rows.push(invRow);
    })

    const buySummaryRow = getEmptyRow();
    buySummaryRow.PodatekNaliczony = numeral(jpk.podatekZakup).format("0.00").replace(",", ".");
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

function csvRow(rowData: IJpkCsvRow){
    return `${csvVal(rowData.KodFormularza)};${csvVal(rowData.kodSystemowy)};${csvVal(rowData.wersjaSchemy)};${csvVal(rowData.WariantFormularza)};${csvVal(rowData.CelZlozenia)};${csvVal(rowData.DataWytworzeniaJPK)};${csvVal(rowData.DataOd)};${csvVal(rowData.DataDo)};${csvVal(rowData.NazwaSystemu)};${csvVal(rowData.NIP)};${csvVal(rowData.PelnaNazwa)};${csvVal(rowData.Email)};${csvVal(rowData.LpSprzedazy)};${csvVal(rowData.NrKontrahenta)};${csvVal(rowData.NazwaKontrahenta)};${csvVal((rowData.AdresKontrahenta || "").replace("\n", ", "))};${csvVal(rowData.DowodSprzedazy)};${csvVal(rowData.DataWystawienia)};${csvVal(rowData.DataSprzedazy)};${csvVal(rowData.K_10)};${csvVal(rowData.K_11)};${csvVal(rowData.K_12)};${csvVal(rowData.K_13)};${csvVal(rowData.K_14)};${csvVal(rowData.K_15)};${csvVal(rowData.K_16)};${csvVal(rowData.K_17)};${csvVal(rowData.K_18)};${csvVal(rowData.K_19)};${csvVal(rowData.K_20)};${csvVal(rowData.K_21)};${csvVal(rowData.K_22)};${csvVal(rowData.K_23)};${csvVal(rowData.K_24)};${csvVal(rowData.K_25)};${csvVal(rowData.K_26)};${csvVal(rowData.K_27)};${csvVal(rowData.K_28)};${csvVal(rowData.K_29)};${csvVal(rowData.K_30)};${csvVal(rowData.K_31)};${csvVal(rowData.K_32)};${csvVal(rowData.K_33)};${csvVal(rowData.K_34)};${csvVal(rowData.K_35)};${csvVal(rowData.K_36)};${csvVal(rowData.K_37)};${csvVal(rowData.K_38)};${csvVal(rowData.K_39)};${csvVal(rowData.LiczbaWierszySprzedazy)};${csvVal(rowData.PodatekNalezny)};${csvVal(rowData.LpZakupu)};${csvVal(rowData.NrDostawcy)};${csvVal(rowData.NazwaDostawcy)};${csvVal((rowData.AdresDostawcy) || "").replace("\n", ", ")};${csvVal(rowData.DowodZakupu)};${csvVal(rowData.DataZakupu)};${csvVal(rowData.DataWplywu)};${csvVal(rowData.K_43)};${csvVal(rowData.K_44)};${csvVal(rowData.K_45)};${csvVal(rowData.K_46)};${csvVal(rowData.K_47)};${csvVal(rowData.K_48)};${csvVal(rowData.K_49)};${csvVal(rowData.K_50)};${csvVal(rowData.LiczbaWierszyZakupow)};${csvVal(rowData.PodatekNaliczony)}\n`
}

function getHeaderRow(){
    return "KodFormularza;kodSystemowy;wersjaSchemy;WariantFormularza;CelZlozenia;DataWytworzeniaJPK;DataOd;DataDo;NazwaSystemu;NIP;PelnaNazwa;Email;LpSprzedazy;NrKontrahenta;NazwaKontrahenta;AdresKontrahenta;DowodSprzedazy;DataWystawienia;DataSprzedazy;K_10;K_11;K_12;K_13;K_14;K_15;K_16;K_17;K_18;K_19;K_20;K_21;K_22;K_23;K_24;K_25;K_26;K_27;K_28;K_29;K_30;K_31;K_32;K_33;K_34;K_35;K_36;K_37;K_38;K_39;LiczbaWierszySprzedazy;PodatekNalezny;LpZakupu;NrDostawcy;NazwaDostawcy;AdresDostawcy;DowodZakupu;DataZakupu;DataWplywu;K_43;K_44;K_45;K_46;K_47;K_48;K_49;K_50;LiczbaWierszyZakupow;PodatekNaliczony\n"
}

function csvVal(val:string | null){
    let ret = "";
    if (val === undefined || val === null){
        return ret;
    } else if((val || "").indexOf('"') >= 0){
        ret = `"${val.replace(/"/g,"\"\"")}"`
    } else {
        ret = val as string
    }

    return ret;
}