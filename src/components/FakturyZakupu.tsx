import * as React from 'react';
import { IFakturaZakupu, IJPK } from  "../models/jpk"
import { ActionButton, DetailsList, IColumn, TextField, DatePicker, IconType, Icon, SelectionMode, Dropdown, IDropdownOption, TooltipHost } from "office-ui-fabric-react"
import {observer} from "mobx-react"
import {DATEFORMAT, VATRATES, validateRequired} from "../utils/utils"
import * as numeral from "numeral"
import * as df from "dateformat"
import {CurrencyField} from "../components/CurrencyFields"
import "./faktury.css"
import * as moment from "moment"

export interface  IFakturyZakupuProps {
    jpk: IJPK,
    updateJpk: (jpk:IJPK) => void,
    addBuyInvoice: () => void,
    copyBuyInvoice: (index: number) => void,
    removeBuyInvoice: (index: number) => void,
    updateBuyInvoice: (index: number, invoice: IFakturaZakupu, recalculateTax?: boolean) => void
} 

@observer
export class FakturyZakupu extends React.Component<IFakturyZakupuProps,{}> {

    // private k45timeout = -1;
    private columns: IColumn[] = [
        {
            key: "lp",
            name: "LP",
            minWidth: 15,
            maxWidth: 15,
            className : "invoiceDetailsCell",
            onRender: (item,index) => {
                return <div className="invoiceNumberSpan">{(index|| 0)+1}</div>
            }
        },
        {
            key: "nrDostawcy",
            name: "Numer dostawcy",
            className: "invoiceDetailsCell",
            minWidth: 120,
            maxWidth: 120,
            onRender: (item:IFakturaZakupu, index) => {
                const update = (v:string) => {
                    item.nrDostawcy = v;
                    this.props.updateBuyInvoice(index || 0, item);
                }
                return <TextField tabIndex={(index||0)+1} value={item.nrDostawcy} onGetErrorMessage={validateRequired} onChanged= {update}/>
            }
        },
        {
            key: "nazwaDostawcy",
            name: "Nazwa Dostawcy",
            className: "invoiceDetailsCell",
            minWidth: 170,
            maxWidth: 170,
            onRender: (item: IFakturaZakupu, index) => {
                const update = (v: string) => {
                    item.nazwaDostawcy = v;
                    this.props.updateBuyInvoice(index || 0, item);
                }
                return <TextField tabIndex={(index || 0) + 2} value={item.nazwaDostawcy} onChanged={update} onGetErrorMessage={validateRequired} />
            }
        },
        {
            key: "adresDostawct",
            name: "Adres Dostawcy",
            className : "invoiceDetailsCell",
            minWidth: 200,
            maxWidth: 200,
            onRender: (item: IFakturaZakupu, index) => {
                const update = (v: string) => {
                    item.adresDostawcy = v;
                    this.props.updateBuyInvoice(index || 0, item);
                }
                return <TextField tabIndex={(index || 0) + 3} value={item.adresDostawcy} multiline={true} rows={2} onChanged={update} onGetErrorMessage={validateRequired} />
            }
        },
        {
            key: "dowodZakupu",
            name: "Dowód Zakupu",
            className: "invoiceDetailsCell",
            minWidth: 250,
            onRender: (item: IFakturaZakupu, index) => {
                const update = (v: string) => {
                    item.dowodZakupu = v;
                    this.props.updateBuyInvoice(index || 0, item);
                }
                return <TextField tabIndex={(index || 0) + 4} value={item.dowodZakupu} onChanged={update} onGetErrorMessage={validateRequired} />
            }
        },
        {
            key: "dataZakupu",
            name: "Data Zakupu",
            className: "invoiceDetailsCell",
            minWidth: 120,
            onRender: (item: IFakturaZakupu, index) => {
                const update = (v: Date) => {
                    item.dataZakupu = moment(v);
                    this.props.updateBuyInvoice(index || 0, item);
                }
                return <DatePicker className={item.dataZakupu === undefined ? "dateInvalid" : undefined} tabIndex={(index || 0) + 5} value={item.dataZakupu === undefined ? undefined : item.dataZakupu.toDate()} formatDate={this._formatDate} initialPickerDate={moment().add(-1, "month").startOf("month").toDate()} onSelectDate={update}  />
            }
        },
        {
            key: "dataWplywu",
            name: "Data Wpływu",
            className : "invoiceDetailsCell",
            minWidth: 120,
            onRender: (item: IFakturaZakupu, index) => {
                const update = (v: Date) => {
                    item.dataWplywu = moment(v);
                    this.props.updateBuyInvoice(index || 0, item);
                }
                return <DatePicker className={item.dataWplywu === undefined ? "dateInvalid" : undefined}  tabIndex={(index || 0) + 6} value={item.dataWplywu === undefined ? undefined : item.dataWplywu.toDate()} formatDate={this._formatDate} onSelectDate={update} />
            }
        },
        {
            key: "k45",
            name: "K45",
            className: "invoiceDetailsCell",
            minWidth: 75,
            onRender: (item: IFakturaZakupu, index) => {
                const update = (event: React.FormEvent, v: string | undefined) => {
                    const numValue = numeral(v === undefined ? undefined : v.replace(',','.') || 0).value();
                    if (!isNaN(numValue) && item.k45 !== numValue){
                        item.k45 = numValue;
                        item.k46 = parseFloat((item.k45 * (item.vat / 100)).toFixed(2));
                        this.props.updateBuyInvoice(index || 0, item, true);
                    }
                }
                return <CurrencyField tabIndex={(index || 0) + 7} value={item.k45 === undefined ? undefined : item.k45.toString()} onChange={update} />
            }
        },
        {
            key: "vat",
            name: "VAT",
            className: "invoiceDetailsCell",
            minWidth: 80,
            onRender: (item: IFakturaZakupu, index) => {
                const update = (event: React.FormEvent, val: IDropdownOption) => {
                    item.vat = numeral(val.key).value();
                    if (item.k45) {
                        item.k46 = parseFloat((item.k45 * (item.vat / 100)).toFixed(2));
                    }
                    this.props.updateBuyInvoice(index || 0, item, true);
                    return item.vat.toString()
                }
                return <Dropdown tabIndex={(index || 0) + 8} defaultSelectedKey = {item.vat} options = {VATRATES.map<IDropdownOption>(r => {
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
            className: "invoiceDetailsCell",
            minWidth: 75,
            onRender: (item: IFakturaZakupu, index) => {
                const update = (event: React.FormEvent, v: string | undefined) => {
                    const numValue = numeral(v === undefined ? undefined : v.replace(',', '.') || 0).value();
                    if (!isNaN(numValue) && item.k46 !== numValue) {
                        item.k46 = numValue;
                        this.props.updateBuyInvoice(index || 0, item, true);
                    }
                }
                return <CurrencyField tabIndex={(index || 0) + 9} value={item.k46 === undefined ? undefined : item.k46.toString()} onChange={update} />
            }
        },
        {
            key: "delete",
            name: "",
            minWidth: 30,
            className: "invoiceDetailsCell",
            onRender: (item: IFakturaZakupu, index: number) => {
                const remove = ()=>{
                    this.props.removeBuyInvoice(index);
                }
                const copy = () => {
                    this.props.copyBuyInvoice(index);
                }
                return (
                    <div>
                        <TooltipHost content="Usun">
                            <Icon className="deleteIcon" iconType={IconType.default} iconName="Delete" onClick={remove} />
                        </TooltipHost>
                        <TooltipHost content="Kopiuj">
                            <Icon className="deleteIcon" iconType={IconType.default} iconName="Copy" onClick={copy} />
                        </TooltipHost>
                    </div>)
            }
        }
    ]

    constructor(props: IFakturyZakupuProps){
        super(props);
        this._updateTax = this._updateTax.bind(this);
    }

    public render() {
        return (
            <div>
                <h2>Faktury zakupu</h2>
                <DetailsList className="invoiceList" items={this.props.jpk.zakup} selectionMode={SelectionMode.none} columns = {this.columns}/>
                <div className="invoiceFooter">
                    <ActionButton className="addInvoiceButton" iconProps={{ iconName: 'Add', iconType: IconType.default }} text="Dodaj fakturę" onClick={this.props.addBuyInvoice} />
                    <CurrencyField className="taxField" label="Podatek" value={this.props.jpk.podatekZakup == null ? "" : this.props.jpk.podatekZakup.toString()} onChanged={this._updateTax}/>
                </div>
            </div>
            
        );
    }

    private _formatDate(date:Date){
        return df(date,DATEFORMAT)
    }

    private _updateTax(val: string){
        const numValue = numeral(val === undefined ? undefined : val.replace(',', '.') || 0).value();
        const newJPK = {...this.props.jpk}
        newJPK.podatekZakup = numValue;
        this.props.updateJpk(newJPK);
    }
    

}

