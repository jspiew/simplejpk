import * as React from 'react';
import { IFakturaSprzedazy, IJPK } from  "../models/jpk"
import { Icon, ActionButton, DetailsList, IColumn, TextField, DatePicker, IconType, SelectionMode, IDropdownOption, Dropdown, TooltipHost } from "office-ui-fabric-react"
import {observer} from "mobx-react"
import { CurrencyField } from './CurrencyFields';
import "./faktury.css"
import * as numeral from "numeral"
import * as moment from 'moment'
import { validateRequired, VATRATES, DATEFORMAT } from 'src/utils/utils';
import * as df from 'dateformat'

export interface  IFakturySprzedazyProps {
    jpk: IJPK,
    updateJpk: (jpk: IJPK) => void,
    addSellInvoice: () => void,
    copySellInvoice: (index: number) => void,
    removeSellInvoice: (index: number) => void,
    updateSellInvoice: (index: number, invoice: IFakturaSprzedazy, recalculateTax?: boolean) => void
} 

@observer
export class FakturySprzedazy extends React.Component<IFakturySprzedazyProps,{}> {

    private columns: IColumn[] = [
        {
            key: "lp",
            name: "LP",
            minWidth: 15,
            maxWidth: 15,
            className: "invoiceDetailsCell",
            onRender: (item, index) => {
                return <div className="invoiceNumberSpan">{(index || 0) + 1}</div>
            }
        },
        {
            key: "nrKontrahenta",
            name: "Numer Kontrahenta",
            className: "invoiceDetailsCell",
            minWidth: 120,
            maxWidth: 120,
            onRender: (item: IFakturaSprzedazy, index) => {
                const update = (ev: React.FormEvent, v:string) => {
                    item.nrKontrahenta = v;
                    this.props.updateSellInvoice(index || 0, item);
                }
                return <TextField value={item.nrKontrahenta} onChange={update} onGetErrorMessage={validateRequired}/>
            }
        },
        {
            key: "nazwaKontrahenta",
            name: "Nazwa Kontrahenta",
            className: "invoiceDetailsCell",
            minWidth: 170,
            maxWidth: 170,
            onRender: (item: IFakturaSprzedazy, index) => {
                const update = (ev: React.FormEvent, v: string) => {
                    item.nazwaKontrahenta = v;
                    this.props.updateSellInvoice(index || 0, item);
                }
                return <TextField value={item.nazwaKontrahenta} onChange={update} onGetErrorMessage={validateRequired}/>
            }
        },
        {
            key: "adresKontrahenta",
            name: "Adres Kontrahenta",
            className: "invoiceDetailsCell",
            minWidth: 200,
            maxWidth: 200,
            onRender: (item: IFakturaSprzedazy, index) => {
                const update = (ev: React.FormEvent, v: string) => {
                    item.adresKontrahenta = v;
                    this.props.updateSellInvoice(index || 0, item);
                }
                return <TextField value={item.adresKontrahenta} multiline={true} rows={2} onGetErrorMessage={validateRequired} onChange={update} />
            }
        },
        {
            key: "dowodSprzedazy",
            name: "Dowód Sprzedaży",
            className: "invoiceDetailsCell",
            minWidth: 250,
            onRender: (item: IFakturaSprzedazy, index) => {
                const update = (ev: React.FormEvent, v: string) => {
                    item.dowodSprzedazy = v;
                    this.props.updateSellInvoice(index || 0, item);
                }
                return <TextField value={item.dowodSprzedazy} onChange={update} onGetErrorMessage={validateRequired} />
            }
        },
        {
            key: "dataWystawienia",
            name: "Data Wystawienia",
            className: "invoiceDetailsCell",
            minWidth: 120,
            onRender: (item: IFakturaSprzedazy, index) => {
                const update = (v: Date) => {
                    item.dataWystawienia = moment(v);
                    this.props.updateSellInvoice(index || 0, item);
                }
                return <DatePicker className={item.dataWystawienia === undefined ? "dateInvalid" : undefined}   value={item.dataWystawienia === undefined ? undefined : item.dataWystawienia.toDate()} initialPickerDate={moment().add(-1,"month").startOf("month").toDate()} onSelectDate={update} formatDate={this._formatDate}/>
            }
        },
        {
            key: "dataSprzedazy",
            name: "Data Sprzedaży",
            className: "invoiceDetailsCell",
            minWidth: 120,
            onRender: (item: IFakturaSprzedazy, index) => {
                const update = (v: Date) => {
                    item.dataSprzedazy = moment(v);
                    this.props.updateSellInvoice(index || 0, item);
                }
                return <DatePicker className={item.dataSprzedazy === undefined ? "dateInvalid" : undefined} value={item.dataSprzedazy === undefined ? undefined : item.dataSprzedazy.toDate()} onSelectDate={update} formatDate={this._formatDate} initialPickerDate={moment().add(-1, "month").startOf("month").toDate()}/>
            }
        },
        {
            key: "k19",
            name: "netto",
            className: "invoiceDetailsCell",
            minWidth: 75,
            onRender: (item: IFakturaSprzedazy, index) => {
                const update = (event: React.FormEvent, v: string | undefined) => {
                    const numValue = numeral(v === undefined ? undefined : v.replace(',', '.') || 0).value();
                    if (!isNaN(numValue) && item.k19 !== numValue) {
                        item.k19 = numValue;
                        item.k20 = parseFloat((item.k19 * (item.vat / 100)).toFixed(2));
                        this.props.updateSellInvoice(index || 0, item, true);
                    }
                }
                return <CurrencyField value={item.k19 === undefined ? undefined : item.k19.toString()} onChange={update} />
            }
        },
        {
            key: "vat",
            name: "VAT",
            className: "invoiceDetailsCell",
            minWidth: 80,
            onRender: (item: IFakturaSprzedazy, index) => {
                const update = (event: React.FormEvent, val: IDropdownOption) => {
                    item.vat = numeral(val.key).value();
                    if (item.k19) {
                        item.k20 = parseFloat((item.k19 * (item.vat / 100)).toFixed(2));
                    }
                    this.props.updateSellInvoice(index || 0, item, true);
                    return item.vat.toString()
                }
                return <Dropdown defaultSelectedKey={item.vat} options={VATRATES.map<IDropdownOption>(r => {
                    return {
                        key: r,
                        text: `${r}%`
                    }
                })} onChange={update} />
            }
        },
        {
            key: "k20",
            name: "K20",
            className: "invoiceDetailsCell",
            minWidth: 75,
            onRender: (item: IFakturaSprzedazy,index) => {
                const update = (event: React.FormEvent, v: string | undefined) => {
                    const numValue = numeral(v === undefined ? undefined : v.replace(',', '.') || 0).value();
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
            name: "",
            minWidth: 30,
            className: "invoiceDetailsCell",
            onRender: (item: IFakturaSprzedazy, index: number) => {
                const remove = () => {
                    this.props.removeSellInvoice(index);
                }
                const copy = () => {
                    this.props.copySellInvoice(index);
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

    constructor(props: IFakturySprzedazyProps) {
        super(props);
        this._updateTax = this._updateTax.bind(this);
    }

    public render() {
        return (
            <div>
                <h2>Faktury sprzedaży</h2>
                <DetailsList className="invoiceList" items = {this.props.jpk.sprzedaz} selectionMode={SelectionMode.none} columns = {this.columns}/>
                <div className="invoiceFooter">
                    <ActionButton className="addInvoiceButton" iconProps={{ iconName: 'Add', iconType: IconType.default }} text="Dodaj fakturę" onClick={this.props.addSellInvoice} />
                    <CurrencyField className="taxField" label="Podatek" value={this.props.jpk.podatekSprzedaz == null ? "" : this.props.jpk.podatekSprzedaz.toString()} onChange={this._updateTax} />
                </div>
            </div>
            
        );
    }


    private _updateTax(event: React.FormEvent, val: string) {
        const numValue = numeral(val === undefined ? undefined : val.replace(',', '.') || 0).value();
        const newJPK = { ...this.props.jpk }
        newJPK.podatekSprzedaz = numValue;
        this.props.updateJpk(newJPK);
    }

    private _formatDate(date: Date) {
        return df(date, DATEFORMAT)
    }

}

