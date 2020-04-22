import React, { Component } from 'react';
import './App.scss';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';

// set license key as below
import {LicenseManager} from "ag-grid-enterprise";
LicenseManager.setLicenseKey('Enter your License Key');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [{
        headerName: "Make", field: "make"
      }, {
        headerName: "Model", field: "model"
      }, {
        headerName: "Price", field: "price"
      }],
      rowData: [{
        make: "Toyota", model: "Celica", price: 35000
      }, {
        make: "Ford", model: "Mondeo", price: 32000
      }, {
        make: "Porsche", model: "Boxter", price: 72000
      }]
    }
  }

  render() {
    return (
        <div
            className="ag-theme-alpine"
            style={{
              height: '500px',
              width: '600px' }}
        >
          <AgGridReact
              columnDefs={this.state.columnDefs}
              rowData={this.state.rowData}>
          </AgGridReact>
        </div>
    );
  }
}

export default App;
