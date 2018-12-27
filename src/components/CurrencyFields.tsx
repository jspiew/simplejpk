import * as React from 'react';
import { TextField, ITextFieldProps} from "office-ui-fabric-react"
import * as numeral from "numeral"




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
                    suffix = "PLN"
                    onGetErrorMessage = {this._onGetErrorMessage}
                    // onChange = {this._mergedChange}
                    // value = {formattedValue}
                />
            </div>
        );
    }

    // @autobind
    // private _getFormattedValue(val: string|undefined){
    //     if(val){
    //         const numeralVal = numeral(val);
    //         if (isNaN(numeralVal.value())){
    //             return "";       
    //         } else {
    //             return numeralVal.format("0,0.");
    //         }        
    //     } else {
    //         return "";
    //     }
    // }

    // @autobind
    // private _mergedChange(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue:string|undefined) {
    //     const numValue = numeral(newValue).value();
    //     if(!isNaN(numValue)) {
    //         this.setState({
    //             recognizedNumber: numValue
    //         })
    //     }
    //     if(this.props.onChange){
    //         this.props.onChange(event,newValue);
    //     }
    // }

    private _onGetErrorMessage(val:string){
        if (isNaN(numeral(val).value())) { return "Nie rozpoznano liczby"}
        else { return }
    }



}

