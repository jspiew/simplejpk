import * as React from 'react';
import { IFakturaZakupu } from  "../models/jpk"
import {  DefaultButton, DetailsList, IColumn } from "office-ui-fabric-react"
import {observer} from "mobx-react"

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
            onRender: (item:IFakturaZakupu) => {
                return <span>{item.nrDostawcy}</span>
            }
        },
        {
            key: "nazwaDostawcy",
            name: "Nazwa Dostawcy",
            minWidth: 100,
            onRender: (item: IFakturaZakupu) => {
                return <span>{item.nazwaDostawcy}</span>
            }
        },
        {
            key: "adresDostawct",
            name: "Adres Dostawcy",
            minWidth: 100,
            onRender: (item: IFakturaZakupu) => {
                return <span>{item.adresDostawcy}</span>
            }
        },
        {
            key: "dowodZakupu",
            name: "Dowód Zakupu",
            minWidth: 100,
            onRender: (item: IFakturaZakupu) => {
                return <span>{item.dowodZakupu}</span>
            }
        },
        {
            key: "dataZakupu",
            name: "Data Zakupu",
            minWidth: 100,
            onRender: (item: IFakturaZakupu) => {
                return <span>{item.dataZakupu.toDateString()}</span>
            }
        },
        {
            key: "dataWplywu",
            name: "Data Wpływu",
            minWidth: 100,
            onRender: (item: IFakturaZakupu) => {
                return <span>{item.dataWplywu.toDateString()}</span>
            }
        },
        {
            key: "k45",
            name: "K45",
            minWidth: 100,
            onRender: (item: IFakturaZakupu) => {
                return <span>{item.k45}</span>
            }
        },
        {
            key: "k46",
            name: "K46",
            minWidth: 100,
            onRender: (item: IFakturaZakupu) => {
                return <span>{item.k46}</span>
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


}

