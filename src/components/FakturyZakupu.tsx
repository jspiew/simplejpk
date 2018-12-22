import * as React from 'react';
import { IFakturaZakupu } from  "../models/jpk"
import {  DefaultButton, DetailsList, IColumn, TextField, DatePicker } from "office-ui-fabric-react"
import {observer} from "mobx-react"
import {DATEFORMAT} from "../utils/utils"
import * as df from "dateformat"
import {CurrencyField} from "../components/CurrencyFields"

export interface  IFakturyZakupuProps {
    fakturyZakupu: IFakturaZakupu[],
    addBuyInvoice: () => void,
    removeBuyInvoice: (index: number) => void,
    updateBuyInvoice: (index: number, invoice: IFakturaZakupu) => void
} 

@observer
export class FakturyZakupu extends React.Component<IFakturyZakupuProps,{}> {

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
            key: "nrDostawcy",
            name: "Numer dostawcy",
            minWidth: 100,
            onRender: (item:IFakturaZakupu, index) => {
                const update = (v:string) => {
                    item.nrDostawcy = v;
                    this.props.updateBuyInvoice(index || 0, item);
                }
                return <TextField value={item.nrDostawcy} onChanged= {update}/>
            }
        },
        {
            key: "nazwaDostawcy",
            name: "Nazwa Dostawcy",
            minWidth: 150,
            maxWidth: 200,
            onRender: (item: IFakturaZakupu, index) => {
                const update = (v: string) => {
                    item.nazwaDostawcy = v;
                    this.props.updateBuyInvoice(index || 0, item);
                }
                return <TextField value={item.nazwaDostawcy} onChanged={update} />
            }
        },
        {
            key: "adresDostawct",
            name: "Adres Dostawcy",
            minWidth: 200,
            onRender: (item: IFakturaZakupu, index) => {
                const update = (v: string) => {
                    item.adresDostawcy = v;
                    this.props.updateBuyInvoice(index || 0, item);
                }
                return <TextField value={item.adresDostawcy} multiline={true} rows={4} onChanged={update} />
            }
        },
        {
            key: "dowodZakupu",
            name: "Dowód Zakupu",
            minWidth: 100,
            onRender: (item: IFakturaZakupu, index) => {
                const update = (v: string) => {
                    item.dowodZakupu = v;
                    this.props.updateBuyInvoice(index || 0, item);
                }
                return <TextField value={item.dowodZakupu} onChanged={update} />
            }
        },
        {
            key: "dataZakupu",
            name: "Data Zakupu",
            minWidth: 150,
            onRender: (item: IFakturaZakupu, index) => {
                const update = (v: Date) => {
                    item.dataZakupu = v;
                    this.props.updateBuyInvoice(index || 0, item);
                }
                return <DatePicker value={item.dataZakupu} formatDate={this._formatDate} onSelectDate={update} />
            }
        },
        {
            key: "dataWplywu",
            name: "Data Wpływu",
            minWidth: 150,
            onRender: (item: IFakturaZakupu, index) => {
                const update = (v: Date) => {
                    item.dataWplywu = v;
                    this.props.updateBuyInvoice(index || 0, item);
                }
                return <DatePicker value={item.dataWplywu} formatDate={this._formatDate} onSelectDate={update} />
            }
        },
        {
            key: "k45",
            name: "K45",
            minWidth: 150,
            onRender: (item: IFakturaZakupu, index) => {
                const update = (event: React.FormEvent, v: string | undefined) => {
                    const numValue = Number(v)
                    if (!isNaN(numValue) && item.k45 !== numValue){
                        item.k45 = Number(v);
                        this.props.updateBuyInvoice(index || 0, item);
                    }
                }
                return <CurrencyField value={item.k45.toString()} onChange={update} />
            }
        },
        {
            key: "k46",
            name: "K46",
            minWidth: 150,
            onRender: (item: IFakturaZakupu, index) => {
                const update = (event: React.FormEvent, v: string | undefined) => {
                    const numValue = Number(v)
                    if (!isNaN(numValue) && item.k46 !== numValue) {
                        item.k46 = Number(v);
                        this.props.updateBuyInvoice(index || 0, item);
                    }
                }
                return <CurrencyField value={item.k46.toString()} onChange={update} />
            }
        }
    ]

    public render() {
        return (
            <div>

                <DetailsList items = {this.props.fakturyZakupu} columns = {this.columns}/>
                <DefaultButton text="Dodaj" onClick={this.props.addBuyInvoice} />

            </div>
            
        );
    }

    private _formatDate(date:Date){
        return df(date,DATEFORMAT)
    }
    

}

