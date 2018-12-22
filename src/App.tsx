import * as React from 'react';
import './App.css';

import logo from './logo.svg';
import { IJPK } from './models/jpk';
import { FakturyZakupu } from './components/FakturyZakupu';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';


class App extends React.Component<{},{jpk:IJPK}> {

  constructor(props: {}) {
      super(props);
      this.state = {
        jpk: {
          celZlozenia: "",
          dataDo: new Date(Date.now()),
          dataOd: new Date(Date.now()),
          dataWytworzeniaJPK: new Date(Date.now()),
          email: "",
          kodFormularza: "",
          kodSystemowy: "",
          nazwaSystemu: "Excel",
          nip: "",
          pelnaNazwa: "",
          sprzedaz: [],
          wersjaSchemy: "1-1",
          zakup: [{
            adresDostawcy: "",
            dataWplywu: new Date(Date.now()),
            dataZakupu: new Date(Date.now()),
            dowodZakupu: "",
            k45: 0,
            k46: 0,
            nazwaDostawcy: "",
            nrDostawcy: ""
          }]

        }
      }
    }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          <link rel="stylesheet" href="https://static2.sharepointonline.com/files/fabric/office-ui-fabric-core/9.6.1/css/fabric.min.css"/>
        </header>
        <p className="App-intro">
            <FakturyZakupu 
              fakturyZakupu={this.state.jpk.zakup}
              addBuyInvoice={this._addBuyInvoice}
              removeBuyInvoice = {this._removeBuyInvoice}
              updateBuyInvoice = {this._updateBuyInvoice}
              />
               
        </p>
      </div>
    );
  }



  @autobind
  private _addBuyInvoice() {
    const newJPK = {...this.state.jpk};
    const newInvoices = [...newJPK.zakup];
    newInvoices.push({
      adresDostawcy: "",
      dataWplywu: new Date(Date.now()),
      dataZakupu: new Date(Date.now()),
      dowodZakupu: "",
      k45: 0,
      k46: 0,
      nazwaDostawcy: "",
      nrDostawcy: ""
    })
    newJPK.zakup = newInvoices
    this.setState({
      jpk: newJPK
    })
  }

  @autobind
  private _removeBuyInvoice() {
    const newJPK = { ...this.state.jpk };
    const newInvoices = [...newJPK.zakup];
    newInvoices.push({
      adresDostawcy: "",
      dataWplywu: new Date(Date.now()),
      dataZakupu: new Date(Date.now()),
      dowodZakupu: "",
      k45: 0,
      k46: 0,
      nazwaDostawcy: "",
      nrDostawcy: ""
    })
    newJPK.zakup = newInvoices
    this.setState({
      jpk: newJPK
    })
  }

  @autobind
  private _updateBuyInvoice() {
    const newJPK = { ...this.state.jpk };
    const newInvoices = [...newJPK.zakup];
    newInvoices.push({
      adresDostawcy: "",
      dataWplywu: new Date(Date.now()),
      dataZakupu: new Date(Date.now()),
      dowodZakupu: "",
      k45: 0,
      k46: 0,
      nazwaDostawcy: "",
      nrDostawcy: ""
    })
    newJPK.zakup = newInvoices
    this.setState({
      jpk: newJPK
    })
  }
}

export default App;
