import * as React from 'react';
import { TextField, ITextFieldProps, autobind} from "office-ui-fabric-react"
import * as numeral from "numeral"
import { validateRequired } from 'src/utils/utils';


export interface ICurrencyFieldProps {
    precision? : number
}


export class CurrencyField extends React.Component<ITextFieldProps, { recognizedNumber: number | null}> {

    constructor(props:ITextFieldProps){
        super(props);
        this.state = {
            recognizedNumber: null
        }
    }

    public render() {
        // const formattedValue = this._getFormattedValue(this.props.value)
        return (
            <div>
                <TextField {...this.props}
                    onGetErrorMessage = {this._onGetErrorMessage}
                    onBlur = {this._formatValue}
                    // onChange = {this._mergedChange}
                    // value = {formattedValue}
                />
            </div>
        );
    }

    private _onGetErrorMessage(val:string){
        const ret = validateRequired(val);
        if (ret) {return ret}
        else if (isNaN(numeral(val).value())) { return "Nie rozpoznano liczby"}
        else if(numeral(val).value() <= 0) {return "Wartość dodatnia"}
        else { return ""}
    }

    @autobind
    private _formatValue(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>){
        const newValue = numeral(this.props.value).format("0.00");
        if (this.props.onChange) {
            this.props.onChange(event,newValue);
        }
    }



}

