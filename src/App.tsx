import * as React from 'react';
import './App.css';
import { IJPK, IFakturaZakupu, IFakturaSprzedazy, IJpkProfile, IVendor } from './models/jpk';
import { FakturyZakupu } from './components/FakturyZakupu';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { IconType } from 'office-ui-fabric-react/lib/Icon';
import { FakturySprzedazy } from './components/FakturySprzedazy';
import { initializeIcons } from '@uifabric/icons';
import { JpkNaglowek } from './components/JpkNaglowek';
import { downloadCSV } from './csvGenerator';
import * as moment from "moment"
import {uniqBy} from "lodash";


class App extends React.Component<{},{jpk:IJPK, selectedDate: moment.Moment, availableVendors: IVendor[]}> {

  constructor(props: {}) {
      super(props);

      initializeIcons();

    const selectedDate = moment();
    const jpk = this.extractJPK(selectedDate);
    const availableVendors = this.getAvailableVendors();
    this.state = {
      selectedDate,
      jpk,
      availableVendors
    }
  }

  

 

  public componentDidUpdate(){
    window.localStorage.setItem("JPK_" + this.state.selectedDate.format("YYYYMM"),JSON.stringify(this.state.jpk));
    window.localStorage.setItem("JPK_profileconsts",JSON.stringify({
      nip: this.state.jpk.nip,
      email: this.state.jpk.email,
      nazwa: this.state.jpk.pelnaNazwa
    } as IJpkProfile));
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Troche prostsze JPK</h1>
          <h2>
            <DefaultButton className="monthButton" text="Poprzedni miesiąc" onClick={this._decrementMonth} />{this.state.selectedDate.format("MM.YYYY")}
            <DefaultButton className="monthButton" text="Następny miesiąc" onClick={this._incrementMonth} />
          </h2>
          <link rel="stylesheet" href="https://static2.sharepointonline.com/files/fabric/office-ui-fabric-core/9.6.1/css/fabric.min.css"/>
        </header>
        <div className="App-main">
          <JpkNaglowek jpk={this.state.jpk} updateJpk={this._updateJPK}/>
          <FakturyZakupu 
            jpk = {this.state.jpk}
            addBuyInvoice={this._addBuyInvoice}
            copyBuyInvoice = {this._copyBuyInvoice}
            removeBuyInvoice = {this._removeBuyInvoice}
            updateBuyInvoice = {this._updateBuyInvoice}
            updateJpk = {this._updateJPK}
          />          
          
          <FakturySprzedazy
            jpk={this.state.jpk}
            addSellInvoice={this._addSellInvoice}
            copySellInvoice = {this._copySellInvoice}
            removeSellInvoice={this._removeSellInvoice}
            updateSellInvoice={this._updateSellInvoice}
            updateJpk={this._updateJPK}
          />
          <DefaultButton onClick={this._getCSV} className="generateCSVButton" text="Wygeneruj CSV" iconProps={{ iconName: 'DownloadDocument', iconType: IconType.default }}/>
          {window.location.search.indexOf("dbg") >= 0 && <code>
            <pre>
              {JSON.stringify(this.state.jpk,null,4)}
            </pre>
          </code>
          }
        </div>
      </div>
    );
  }

  @autobind 
  private _incrementMonth(){
    const newDate = moment(this.state.selectedDate).add(1, "month");
    const jpk = this.extractJPK(newDate);
    this.setState({
      selectedDate: newDate,
      jpk
    })
  }

  @autobind 
  private _decrementMonth() {
    const newDate = moment(this.state.selectedDate).add(-1, "month");
    const jpk = this.extractJPK(newDate);
    this.setState({
      selectedDate: newDate,
      jpk
    })
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
      dataWplywu: undefined,
      dataZakupu: undefined,
      dowodZakupu: "",
      k45: 0,
      vat: 23,
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
  private _copyBuyInvoice(index:number) {
    const newJPK = { ...this.state.jpk };
    const newInvoices = [...newJPK.zakup];
    const newInvoice  = {...newInvoices[index]}
    newInvoices.push(newInvoice);
    newJPK.zakup = newInvoices;
    this.setState({
      jpk: newJPK
    })
  }

  @autobind
  private _removeBuyInvoice(index: number) {
    const newJPK = { ...this.state.jpk };
    const newInvoices = [...newJPK.zakup];
    newInvoices.splice(index,1);
    newJPK.zakup = newInvoices;
    this.setState({
      jpk: newJPK
    })
  }

  @autobind
  private _updateBuyInvoice(index: number, invoice: IFakturaZakupu, recalculateTax = false) {
    const newJPK = { ...this.state.jpk };
    const newInvoices = [...newJPK.zakup];
    newJPK.zakup = newInvoices;
    newJPK.zakup[index] = invoice;
    if(recalculateTax){
      const newTax =  newJPK.zakup.map(f => f.k46).reduce((prev,next) => (prev || 0) + (next || 0));
      if(newTax){
        newJPK.podatekZakup = parseFloat(newTax.toFixed(2));
      }
    }
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
      dataSprzedazy: undefined,
      dataWystawienia: undefined,
      dowodSprzedazy: "",
      k19: 0,
      vat: 23,
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
  private _copySellInvoice(index: number) {
    const newJPK = { ...this.state.jpk };
    const newInvoices = [...newJPK.sprzedaz];
    const newInvoice = { ...newInvoices[index] }
    newInvoices.push(newInvoice);
    newJPK.sprzedaz = newInvoices;
    this.setState({
      jpk: newJPK
    })
  }

  @autobind
  private _removeSellInvoice(index: number) {
    const newJPK = { ...this.state.jpk };
    const newInvoices = [...newJPK.zakup];
    newInvoices.splice(index, 1);
    newJPK.zakup = newInvoices
    this.setState({
      jpk: newJPK
    })
  }

  @autobind
  private _updateSellInvoice(index: number, invoice: IFakturaSprzedazy, recalculateTax = false) {
    const newJPK = { ...this.state.jpk };
    const newInvoices = [...newJPK.sprzedaz];
    newJPK.sprzedaz = newInvoices;
    newJPK.sprzedaz[index] = invoice;
    if (recalculateTax) {
      const newTax = newJPK.sprzedaz.map(f => f.k20).reduce((prev, next) => (prev || 0) + (next || 0));
      if (newTax) {
        newJPK.podatekSprzedaz = parseFloat(newTax.toFixed(2));
      }
    }
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

  @autobind
  private extractJPK(selectedDate: moment.Moment) {
    const lastJPKstring = window.localStorage.getItem("JPK_" + selectedDate.format("YYYYMM"))
    if (lastJPKstring && window.location.search.indexOf("dbg") < 0) {
      const loadedJPK = JSON.parse(lastJPKstring) as IJPK;
      loadedJPK.dataDo = moment(loadedJPK.dataDo);
      loadedJPK.dataOd = moment(loadedJPK.dataOd);
      loadedJPK.dataWytworzeniaJPK = moment(loadedJPK.dataWytworzeniaJPK);
      loadedJPK.zakup.forEach(z => {
        z.dataWplywu = moment(z.dataWplywu);
        z.dataZakupu = moment(z.dataZakupu);
      });
      loadedJPK.sprzedaz.forEach(s => {
        s.dataSprzedazy = moment(s.dataSprzedazy);
        s.dataWystawienia = moment(s.dataWystawienia);
      });

      return loadedJPK;
    }
    else {
      const emptyJpk =  this.emptyJpk(selectedDate);
      const profileString = window.localStorage.getItem("JPK_profileconsts");
      if (profileString){
        const profile = JSON.parse(profileString) as IJpkProfile;
        emptyJpk.email = profile.email;
        emptyJpk.nip = profile.nip;
        emptyJpk.pelnaNazwa  = profile.nazwa;
      }

      return emptyJpk;
    }
  }

  private emptyJpk(date: moment.Moment): IJPK {
    const ret = {
      dataDo: moment(date).endOf("month"),
      dataOd: moment(date).startOf("month"),
      dataWytworzeniaJPK: moment(),
      email: "",
      nip: "",
      pelnaNazwa: "",
      podatekSprzedaz: 0,
      podatekZakup: 0,
      sprzedaz: [],
      zakup: []
    };

    return ret;
  }

  private getAvailableVendors() {
    const allJPKS = this.getAllSavedJPKs();
    let vendors: IVendor[] = [];
    allJPKS.forEach(j => {
      vendors = [...vendors, ...j.zakup.map<IVendor>(f => {
        return {
          vendorAddress: f.adresDostawcy,
          vendorName: f.nazwaDostawcy,
          vendorNumber: f.nrDostawcy
        };
      })];
      vendors = [...vendors, ...j.sprzedaz.map<IVendor>(f => {
        return {
          vendorAddress: f.adresKontrahenta,
          vendorName: f.nazwaKontrahenta,
          vendorNumber: f.nrKontrahenta
        };
      })];
    });
    const uniqVendors = uniqBy(vendors, v => v.vendorNumber);
    return uniqVendors;
  }

  private getAllSavedJPKs() {
    const currentDate = moment();
    const jpks: IJPK[] = [];

    let thisJPKString = window.localStorage.getItem("JPK_" + currentDate.format("YYYYMM"));
    while (thisJPKString){
      const loadedJPK = this.parseLoadedJPK(thisJPKString);
      jpks.push(loadedJPK);
      thisJPKString = window.localStorage.getItem("JPK_" + currentDate.add(1,"months").format("YYYYMM"))
    }
    
    thisJPKString = window.localStorage.getItem("JPK_" + currentDate.add(-1,"months").format("YYYYMM"));
    while (thisJPKString) {
      const loadedJPK = this.parseLoadedJPK(thisJPKString);
      jpks.push(loadedJPK);
      thisJPKString = window.localStorage.getItem("JPK_" + currentDate.add(-1, "months").format("YYYYMM"))
    }
    return jpks;
  }

  private parseLoadedJPK(thisJPKString: string) {
    const loadedJPK = JSON.parse(thisJPKString) as IJPK;
    loadedJPK.dataDo = moment(loadedJPK.dataDo);
    loadedJPK.dataOd = moment(loadedJPK.dataOd);
    loadedJPK.dataWytworzeniaJPK = moment(loadedJPK.dataWytworzeniaJPK);
    loadedJPK.zakup.forEach(z => {
      z.dataWplywu = moment(z.dataWplywu);
      z.dataZakupu = moment(z.dataZakupu);
    });
    loadedJPK.sprzedaz.forEach(s => {
      s.dataSprzedazy = moment(s.dataSprzedazy);
      s.dataWystawienia = moment(s.dataWystawienia);
    });
    return loadedJPK;
  }
}

export default App;
