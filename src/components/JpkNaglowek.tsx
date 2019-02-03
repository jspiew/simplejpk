import * as React from 'react';
import { TextField, DatePicker, autobind, DayOfWeek } from "office-ui-fabric-react"
import {_formatDate, validateRequired} from "../utils/utils"
import { IJPK } from 'src/models/jpk'
import * as moment from "moment"



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
                    <div className="ms-Grid-col ms-sm12 ms-md2">
                        <DatePicker label="Data od" formatDate={_formatDate}  firstDayOfWeek={DayOfWeek.Monday} isRequired={true} value={this.props.jpk.dataOd.toDate()} onSelectDate={this._updateDateFrom}  
                          placeholder="Pierwszy dzien miesiaca" />
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md2">
                        <DatePicker label="Data do" formatDate={_formatDate} value={this.props.jpk.dataDo.toDate()} firstDayOfWeek={DayOfWeek.Monday}  isRequired={true} onSelectDate={this._updateDateTo}  placeholder="Ostatni dzien miesiaca"/>
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md2">
                        <TextField label="Email" onChange={this._updateEmail} required={true} onGetErrorMessage={validateRequired} value={this.props.jpk.email}/>
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md2">
                        <TextField label="NIP" onChange={this._updateNip}
                            onGetErrorMessage={validateRequired} required={true} value={this.props.jpk.nip}/>
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md2">
                        <TextField label="Pełna nazwa" onGetErrorMessage={validateRequired} onChange={this._updateFullName} required={true} placeholder="Nazwa firmy..." value={this.props.jpk.pelnaNazwa}/>
                    </div>
                </div>
            </div>
        );
    }

    @autobind
    private _updateDateFrom(date: Date | null | undefined){
        const newJPK = {...this.props.jpk};
        newJPK.dataOd = date === null ? moment() : moment(date);
        this.props.updateJpk(newJPK);
    }

    @autobind
    private _updateDateTo(date: Date | null | undefined) {
        const newJPK = { ...this.props.jpk };
        newJPK.dataDo = date === null ? moment() : moment(date);
        this.props.updateJpk(newJPK);
    }

    @autobind
    private _updateEmail(event: React.FormEvent, email:string) {
        const newJPK = { ...this.props.jpk };
        newJPK.email = email;
        this.props.updateJpk(newJPK);
    }

    @autobind
    private _updateNip(event: React.FormEvent, nip: string) {
        const newJPK = { ...this.props.jpk };
        newJPK.nip = nip;
        this.props.updateJpk(newJPK);
    }

    @autobind
    private _updateFullName(event: React.FormEvent, name: string) {
        const newJPK = { ...this.props.jpk };
        newJPK.pelnaNazwa = name;
        this.props.updateJpk(newJPK);
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
