import * as React from 'react';
import { IFakturaSprzedazy } from  "../models/jpk"
import { Icon, DefaultButton, DetailsList, IColumn, TextField, DatePicker, IconType, SelectionMode } from "office-ui-fabric-react"
import {observer} from "mobx-react"
import { CurrencyField } from './CurrencyFields';
import "./faktury.css"
import * as numeral from "numeral"
import * as moment from 'moment'

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
                    item.dataWystawienia = moment(v);
                    this.props.updateSellInvoice(index || 0, item);
                }
                return <DatePicker value={item.dataWystawienia === undefined ? undefined : item.dataWystawienia.toDate()} onSelectDate={update} />
            }
        },
        {
            key: "dataSprzedazy",
            name: "Data Sprzedaży",
            minWidth: 100,
            onRender: (item: IFakturaSprzedazy, index) => {
                const update = (v: Date) => {
                    item.dataSprzedazy = moment(v);
                    this.props.updateSellInvoice(index || 0, item);
                }
                return <DatePicker value={item.dataSprzedazy === undefined ? undefined : item.dataSprzedazy.toDate()} onSelectDate={update} />
            }
        },
        {
            key: "k19",
            name: "K19",
            minWidth: 100,
            onRender: (item: IFakturaSprzedazy, index) => {
                const update = (event: React.FormEvent, v: string | undefined) => {
                    const numValue = numeral(v).value();
                    if (!isNaN(numValue) && item.k19 !== numValue) {
                        item.k19 = numValue;
                        this.props.updateSellInvoice(index || 0, item);
                    }
                }
                return <CurrencyField value={item.k19 === undefined ? undefined : item.k19.toString()} onChange={update} />
            }
        },
        {
            key: "k20",
            name: "K20",
            minWidth: 100,
            onRender: (item: IFakturaSprzedazy,index) => {
                const update = (event: React.FormEvent, v: string | undefined) => {
                    const numValue = numeral(v).value();
                    if (!isNaN(numValue) && item.k20 !== numValue) {
                        item.k20 = numValue;
                        this.props.updateSellInvoice(index || 0, item);
                    }
                }
                return <CurrencyField value={item.k20 === undefined ? undefined : item.k20.toString()} onChange={update} />
            }
        },
        {
            key: "delete",
            name: "Usun",
            minWidth: 30,
            onRender: (item: IFakturaSprzedazy, index) => {
                return <Icon className="deleteIcon" iconType={IconType.default} iconName="Delete" />
            }
        }
    ]

    public render() {
        return (
            <div>
                <h2>Faktury sprzedaży</h2>
                <DetailsList items = {this.props.fakturyZakupu} selectionMode={SelectionMode.none} columns = {this.columns}/>
                <DefaultButton iconProps={{ iconName: 'Add', iconType: IconType.default }} text="Dodaj" onClick={this.props.addSellInvoice} />

            </div>
            
        );
    }

}

