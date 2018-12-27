import * as React from 'react';
import { TextField, ITextFieldProps, DatePicker } from "office-ui-fabric-react"




export class JpkNaglowek extends React.Component {

    constructor(props: ITextFieldProps) {
        super(props);        
    }

    public render() {
        // const formattedValue = this._getFormattedValue(this.props.value)
        return (
            <div className="ms-Grid">
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm6 ms-md2">
                        <h3>Cel złożenia</h3>
                    </div>
                    <div className="ms-Grid-col ms-sm6 ms-md2">
                        <TextField />
                    </div>
                </div>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm6 ms-md2">
                        <h3>Data od</h3>
                    </div>
                    <div className="ms-Grid-col ms-sm6 ms-md2">
                        <DatePicker />
                    </div>
                </div>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm6 ms-md2">
                        <h3>Data do</h3>
                    </div>
                    <div className="ms-Grid-col ms-sm6 ms-md2">
                        <DatePicker />
                    </div>
                </div>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm6 ms-md2">
                        <h3>Data wytworzenia</h3>
                    </div>
                    <div className="ms-Grid-col ms-sm6 ms-md2">
                        <TextField disabled={true}/>
                    </div>
                </div>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm6 ms-md2">
                        <h3>Email</h3>
                    </div>
                    <div className="ms-Grid-col ms-sm6 ms-md2">
                        <TextField />
                    </div>
                </div>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm6 ms-md2">
                        <h3>Kod formularza</h3>
                    </div>
                    <div className="ms-Grid-col ms-sm6 ms-md2">
                        <TextField />
                    </div>
                </div>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm6 ms-md2">
                        <h3>Kod systemowy</h3>
                    </div>
                    <div className="ms-Grid-col ms-sm6 ms-md2">
                        <TextField />
                    </div>
                </div>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm6 ms-md2">
                        <h3>Nazwa systemu</h3>
                    </div>
                    <div className="ms-Grid-col ms-sm6 ms-md2">
                        <TextField />
                    </div>
                </div>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm6 ms-md2">
                        <h3>NIP</h3>
                    </div>
                    <div className="ms-Grid-col ms-sm6 ms-md2">
                        <TextField />
                    </div>
                </div>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm6 ms-md2">
                        <h3>Pelna nazwa</h3>
                    </div>
                    <div className="ms-Grid-col ms-sm6 ms-md2">
                        <TextField />
                    </div>
                </div>
            </div>
        );
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
