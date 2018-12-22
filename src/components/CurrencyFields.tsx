import * as React from 'react';
import { TextField, ITextFieldProps, autobind} from "office-ui-fabric-react"




export class CurrencyField extends React.Component<ITextFieldProps, { recognizedNumber: number | null}> {

    constructor(props:ITextFieldProps){
        super(props);
        this.state = {
            recognizedNumber: null
        }
    }

    public render() {
        return (
            <div>
                <TextField {...this.props}
                    suffix = "PLN"
                    onGetErrorMessage = {this._onGetErrorMessage}
                    onChange = {this._mergedChange}
                />
                {/* {this.state.recognizedNumber !== null && `${this.state.recognizedNumber.toString()}`} */}
            </div>
        );
    }


    @autobind
    private _mergedChange(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue:string|undefined) {
        const numValue = Number(newValue);
        if(!isNaN(numValue)) {
            this.setState({
                recognizedNumber: numValue
            })
        }
        if(this.props.onChange){
            this.props.onChange(event,newValue);
        }
    }

    private _onGetErrorMessage(val:string){
        if (isNaN(Number(val))) { return "Nie rozpoznano liczby"}
        else { return }
    }



}

