import * as React from 'react';
import { IFakturaSprzedazy } from  "../models/jpk"
import {  DefaultButton, DetailsList, IColumn, TextField, DatePicker } from "office-ui-fabric-react"
import {observer} from "mobx-react"

export interface  IFakturySprzedazyProps {
    fakturyZakupu: IFakturaSprzedazy[],
    addSellInvoice: () => void,
    removeSellInvoice: (index: number) => void,
    updateSellInvoice: (index: number, invoice: IFakturaSprzedazy) => void
} 

@observer
export class FakturySprzedazy extends React.Component<IFakturySprzedazyProps,{}> {

    private columns: IColumn[] = [
        {
            key: "lp",
            name: "LP",
            minWidth: 30,
            maxWidth: 30,
            onRender: (item,index) => {
                return <span>{(index|| 0)+1}</span>
            }
        },
        {
            key: "nrKontrahenta",
            name: "Numer Kontrahenta",
            minWidth: 100,
            onRender: (item: IFakturaSprzedazy, index) => {
                const update = (v:string) => {
                    item.nrKontrahenta = v;
                    this.props.updateSellInvoice(index || 0, item);
                }
                return <TextField value={item.nrKontrahenta} onChanged= {update}/>
            }
        },
        {
            key: "nazwaKontrahenta",
            name: "Nazwa Kontrahenta",
            minWidth: 100,
            onRender: (item: IFakturaSprzedazy, index) => {
                const update = (v: string) => {
                    item.nazwaKontrahenta = v;
                    this.props.updateSellInvoice(index || 0, item);
                }
                return <TextField value={item.nazwaKontrahenta} onChanged={update} />
            }
        },
        {
            key: "adresKontrahenta",
            name: "Adres Kontrahenta",
            minWidth: 100,
            onRender: (item: IFakturaSprzedazy, index) => {
                const update = (v: string) => {
                    item.adresKontrahenta = v;
                    this.props.updateSellInvoice(index || 0, item);
                }
                return <TextField value={item.adresKontrahenta} multiline={true} onChanged={update} />
            }
        },
        {
            key: "dowodSprzedazy",
            name: "Dowód Sprzedaży",
            minWidth: 100,
            onRender: (item: IFakturaSprzedazy, index) => {
                const update = (v: string) => {
                    item.dowodSprzedazy = v;
                    this.props.updateSellInvoice(index || 0, item);
                }
                return <TextField value={item.dowodSprzedazy} onChanged={update} />
            }
        },
        {
            key: "dataWystawienia",
            name: "Data Wystawienia",
            minWidth: 100,
            onRender: (item: IFakturaSprzedazy, index) => {
                const update = (v: Date) => {
                    item.dataWystawienia = v;
                    this.props.updateSellInvoice(index || 0, item);
                }
                return <DatePicker value={item.dataWystawienia} onSelectDate={update} />
            }
        },
        {
            key: "dataSprzedazy",
            name: "Data Sprzedaży",
            minWidth: 100,
            onRender: (item: IFakturaSprzedazy, index) => {
                const update = (v: Date) => {
                    item.dataSprzedazy = v;
                    this.props.updateSellInvoice(index || 0, item);
                }
                return <DatePicker value={item.dataSprzedazy} onSelectDate={update} />
            }
        },
        {
            key: "k19",
            name: "K19",
            minWidth: 100,
            onRender: (item: IFakturaSprzedazy, index) => {
                const update = (v: string) => {
                    item.k19 = Number(v);
                    this.props.updateSellInvoice(index || 0, item);
                }
                return <TextField value={item.k19.toString()} onChanged={update} />
            }
        },
        {
            key: "k20",
            name: "K20",
            minWidth: 100,
            onRender: (item: IFakturaSprzedazy,index) => {
                // const update = (v: string) => {                 
                //     item.k20 = parseFloat(v);
                //     this.props.updateSellInvoice(index || 0, item);
                // }
                return <input type="number" min="0" step="0.01" />
            }
        }
    ]

    public render() {
        return (
            <div>

                <DetailsList items = {this.props.fakturyZakupu} columns = {this.columns}/>
                <DefaultButton text="Dodaj" onClick={this.props.addSellInvoice} />

            </div>
            
        );
    }

}

