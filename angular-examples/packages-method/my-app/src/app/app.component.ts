import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import 'ag-grid-enterprise';

// add license key as follows

import {LicenseManager} from 'ag-grid-enterprise';
LicenseManager.setLicenseKey('Enter your license key');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;

  title = 'app';

  columnDefs = [
    {headerName: 'Model', field: 'model'},
    {headerName: 'Make', field: 'make', },
    {headerName: 'Price', field: 'price'}
  ];


  rowData: any;

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.rowData = this.http.get('https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/sample-data/rowData.json');
  }

  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map( node => node.data );
    const selectedDataStringPresentation = selectedData.map( node => node.make + ' ' + node.model).join(', ');
    alert(`Selected nodes: ${selectedDataStringPresentation}`);
  }
}
