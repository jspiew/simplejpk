export function downloadCSV(invoices: any[]){
    let csvContent = "data:text/csv;charset=utf-8,";
    invoices.forEach((inv) =>{
        const row = `${inv.numerDostawcy}`
        csvContent += row + "\r\n";
    }); 

    const encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
}