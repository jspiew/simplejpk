import * as React from 'react';
import './App.css';
import { IJPK, IFakturaZakupu, IFakturaSprzedazy } from './models/jpk';
import { FakturyZakupu } from './components/FakturyZakupu';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { FakturySprzedazy } from './components/FakturySprzedazy';


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

          <FakturySprzedazy
            fakturyZakupu={this.state.jpk.sprzedaz}
            addSellInvoice={this._addSellInvoice}
            removeSellInvoice={this._removeSellInvoice}
            updateSellInvoice={this._updateSellInvoice}
          />
               
        </p>

        <code>
          <pre>
            {JSON.stringify(this.state.jpk,null,4)}
          </pre>
        </code>
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
  private _updateBuyInvoice(index: number, invoice: IFakturaZakupu) {
    const newJPK = { ...this.state.jpk };
    const newInvoices = [...newJPK.zakup];
    newJPK.zakup = newInvoices;
    newJPK.zakup[index] = invoice;
    this.setState({
      jpk: newJPK
    })
  }

  @autobind
  private _addSellInvoice() {
    const newJPK = { ...this.state.jpk };
    const newInvoices = [...newJPK.sprzedaz];
    newInvoices.push({
      adresKontrahenta: "",
      dataSprzedazy: new Date(Date.now()),
      dataWystawienia: new Date(Date.now()),
      dowodSprzedazy: "",
      k19: 0,
      k20: 0,
      nazwaKontrahenta: "",
      nrKontrahenta: ""
    })
    newJPK.sprzedaz = newInvoices
    this.setState({
      jpk: newJPK
    })
  }

  @autobind
  private _removeSellInvoice() {
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
  private _updateSellInvoice(index: number, invoice: IFakturaSprzedazy) {
    const newJPK = { ...this.state.jpk };
    const newInvoices = [...newJPK.sprzedaz];
    newJPK.sprzedaz = newInvoices;
    newJPK.sprzedaz[index] = invoice;
    this.setState({
      jpk: newJPK
    })
  }
}

export default App;
