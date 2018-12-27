import * as React from 'react';
import { TextField, ITextFieldProps, DatePicker, autobind } from "office-ui-fabric-react"
import {_formatDate} from "../utils/utils"
import { IJPK } from 'src/models/jpk';



export interface IJpkNaglowekProps {
    jpk: IJPK
    updateJpk: (jpk: IJPK) => void
}

export class JpkNaglowek extends React.Component<IJpkNaglowekProps,{}> {

    constructor(props: IJpkNaglowekProps) {
        super(props);        
    }

    public render() {
        // const formattedValue = this._getFormattedValue(this.props.value)
        return (
            <div className="ms-Grid">
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm6 ms-md2">
                        <DatePicker label="Data od" formatDate={_formatDate} value={this.props.jpk.dataOd} placeholder="Pierwszy dzien miesiaca" />
                    </div>
                    <div className="ms-Grid-col ms-sm6 ms-md2">
                        <DatePicker label="Data do" formatDate={_formatDate} value={this.props.jpk.dataDo} placeholder="Ostatni dzien miesiaca"/>
                    </div>
                    <div className="ms-Grid-col ms-sm6 ms-md2">
                        <TextField label="Email" value={this.props.jpk.email}/>
                    </div>
                    <div className="ms-Grid-col ms-sm6 ms-md2">
                        <TextField label="NIP" value={this.props.jpk.nip}/>
                    </div>
                    <div className="ms-Grid-col ms-sm6 ms-md2">
                        <TextField label="Pełna nazwa" placeholder="Nazwa firmy..." value={this.props.jpk.pelnaNazwa}/>
                    </div>
                </div>
            </div>
        );
    }

    @autobind
    private updateDateFrom(date: Date){
        
    }
}



// "celZlozenia": "",
//     "dataDo": "2018-12-26T23:40:09.443Z",
//         "dataOd": "2018-12-26T23:40:09.443Z",
//             "dataWytworzeniaJPK": "2018-12-26T23:40:09.443Z",
//                 "email": "",
//                     "kodFormularza": "",
//                         "kodSystemowy": "",
//                             "nazwaSystemu": "Excel",
//                                 "nip": "",
//                                     "pelnaNazwa": "",
