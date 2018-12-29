import * as React from 'react';
import './App.css';
import { IJPK, IFakturaZakupu, IFakturaSprzedazy } from './models/jpk';
import { FakturyZakupu } from './components/FakturyZakupu';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { FakturySprzedazy } from './components/FakturySprzedazy';
import { initializeIcons } from '@uifabric/icons';
import { JpkNaglowek } from './components/JpkNaglowek';
import { downloadCSV } from './csvGenerator';
import * as moment from "moment"


class App extends React.Component<{},{jpk:IJPK}> {

  constructor(props: {}) {
      super(props);

      initializeIcons();

      const lastJPKstring = window.localStorage.getItem("lastJPK")

      if(lastJPKstring && window.location.search.indexOf("dbg") < 0){
        const loadedJPK = JSON.parse(lastJPKstring) as IJPK;
        loadedJPK.dataDo = moment(loadedJPK.dataDo);
        loadedJPK.dataOd = moment(loadedJPK.dataOd);
        loadedJPK.dataWytworzeniaJPK = moment(loadedJPK.dataWytworzeniaJPK);
        loadedJPK.zakup.forEach(z =>{
          z.dataWplywu = moment(z.dataWplywu);
          z.dataZakupu = moment(z.dataZakupu);
        })
        loadedJPK.sprzedaz.forEach(s => {
          s.dataSprzedazy = moment(s.dataSprzedazy);
          s.dataWystawienia = moment(s.dataWystawienia);
        })
        this.state = {
          jpk: loadedJPK
        }
      } else {
        this.state = {
          jpk: {
            celZlozenia: "",
            dataDo: moment(),
            dataOd: moment(),
            dataWytworzeniaJPK: moment(),
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
              dataWplywu: moment(),
              dataZakupu: moment(),
              dowodZakupu: "",
              k45: 0,
              k46: 0,
              nazwaDostawcy: "",
              nrDostawcy: ""
            }]

          }
        }
      }
    }

  public componentDidUpdate(){
    window.localStorage.setItem("lastJPK",JSON.stringify(this.state.jpk));
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Troche prostsze JPK</h1>
          <link rel="stylesheet" href="https://static2.sharepointonline.com/files/fabric/office-ui-fabric-core/9.6.1/css/fabric.min.css"/>
        </header>
          <JpkNaglowek jpk={this.state.jpk} updateJpk={this._updateJPK}/>
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
        <a onClick={this._getCSV}>CSV</a>
        {window.location.search.indexOf("dbg") >= 0 && <code>
          <pre>
            {JSON.stringify(this.state.jpk,null,4)}
          </pre>
        </code>
        }
      </div>
    );
  }


  @autobind 
  private _getCSV(){
    downloadCSV(this.state.jpk)
  }

  @autobind
  private _addBuyInvoice() {
    const newJPK = {...this.state.jpk};
    const newInvoices = [...newJPK.zakup];
    newInvoices.push({
      adresDostawcy: "",
      dataWplywu: moment(),
      dataZakupu: moment(),
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
      dataWplywu: moment(),
      dataZakupu: moment(),
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
      dataSprzedazy: moment(),
      dataWystawienia: moment(),
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
      dataWplywu: moment(),
      dataZakupu: moment(),
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

  @autobind 
  private _updateJPK(jpk: IJPK){
    this.setState({
      jpk
    })
  }
}

export default App;
