import * as React from 'react';
import { IFakturaZakupu, IJPK } from  "../models/jpk"
import { ActionButton, DetailsList, IColumn, TextField, DatePicker, IconType, Icon, SelectionMode, Dropdown, IDropdownOption } from "office-ui-fabric-react"
import {observer} from "mobx-react"
import {DATEFORMAT, VATRATES} from "../utils/utils"
import * as numeral from "numeral"
import * as df from "dateformat"
import {CurrencyField} from "../components/CurrencyFields"
import "./faktury.css"
import * as moment from "moment"

export interface  IFakturyZakupuProps {
    jpk: IJPK,
    updateJpk: (jpk:IJPK) => void,
    addBuyInvoice: () => void,
    removeBuyInvoice: (index: number) => void,
    updateBuyInvoice: (index: number, invoice: IFakturaZakupu) => void
} 

@observer
export class FakturyZakupu extends React.Component<IFakturyZakupuProps,{}> {

    // private k45timeout = -1;
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
                return <TextField value={item.adresDostawcy} multiline={true} rows={2} onChanged={update} />
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
                    item.dataZakupu = moment(v);
                    this.props.updateBuyInvoice(index || 0, item);
                }
                return <DatePicker value={item.dataZakupu === undefined ? undefined : item.dataZakupu.toDate()} formatDate={this._formatDate} onSelectDate={update} />
            }
        },
        {
            key: "dataWplywu",
            name: "Data Wpływu",
            minWidth: 150,
            onRender: (item: IFakturaZakupu, index) => {
                const update = (v: Date) => {
                    item.dataWplywu = moment(v);
                    this.props.updateBuyInvoice(index || 0, item);
                }
                return <DatePicker value={item.dataWplywu === undefined ? undefined : item.dataWplywu.toDate()} formatDate={this._formatDate} onSelectDate={update} />
            }
        },
        {
            key: "k45",
            name: "K45",
            minWidth: 150,
            onRender: (item: IFakturaZakupu, index) => {
                const update = (event: React.FormEvent, v: string | undefined) => {
                    const numValue = numeral(v).value();
                    if (!isNaN(numValue) && item.k45 !== numValue){
                        item.k45 = numValue;
                        item.k46 = parseFloat((item.k45 * (1 + item.vat / 100)).toFixed(2));
                        this.props.updateBuyInvoice(index || 0, item);
                    }
                }
                return <CurrencyField value={item.k45 === undefined ? undefined : item.k45.toString()} onChange={update} />
            }
        },
        {
            key: "vat",
            name: "VAT",
            minWidth: 75,
            onRender: (item: IFakturaZakupu, index) => {
                const update = (event: React.FormEvent, val: IDropdownOption) => {
                    item.vat = numeral(val.key).value();
                    if (item.k45) {
                        item.k46 = parseFloat((item.k45 * (1 + item.vat / 100)).toFixed(2));
                    }
                    this.props.updateBuyInvoice(index || 0, item);
                    return item.vat.toString()
                }
                return <Dropdown defaultSelectedKey = {item.vat} options = {VATRATES.map<IDropdownOption>(r => {
                    return {
                        key: r,
                        text: `${r}%`
                    }
                })} onChange={update} />
            }
        },
        {
            key: "k46",
            name: "K46",
            minWidth: 150,
            onRender: (item: IFakturaZakupu, index) => {
                const update = (event: React.FormEvent, v: string | undefined) => {
                    const numValue = numeral(v).value();
                    if (!isNaN(numValue) && item.k46 !== numValue) {
                        item.k46 = numValue;
                        this.props.updateBuyInvoice(index || 0, item);
                    }
                }
                return <CurrencyField value={item.k46 === undefined ? undefined : item.k46.toString()} onChange={update} />
            }
        },
        {
            key: "delete",
            name: "Usun",
            minWidth: 30,
            onRender: (item: IFakturaZakupu, index) => {
                return <Icon className="deleteIcon" iconType={IconType.default} iconName="Delete" />
            }
        }
    ]

    public render() {
        return (
            <div>
                <h2>Faktury zakupu</h2>
                <DetailsList items={this.props.jpk.zakup} selectionMode={SelectionMode.none} columns = {this.columns}/>
                <CurrencyField value={this.props.jpk.podatekZakup.toString()} onChange={this._updateTax}/>
                <ActionButton iconProps={{ iconName: 'Add', iconType: IconType.default }} text="Dodaj" onClick={this.props.addBuyInvoice} />

            </div>
            
        );
    }

    private _formatDate(date:Date){
        return df(date,DATEFORMAT)
    }

    private _updateTax(event: React.FormEvent, val: string){
        const newJPK = {...this.props.jpk}
        newJPK.podatekZakup = numeral(val).value();
        this.props.updateJpk(newJPK);
    }
    

}

