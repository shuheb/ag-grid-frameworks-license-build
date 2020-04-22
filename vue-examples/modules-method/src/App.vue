<style lang="scss">
  @import "../node_modules/@ag-grid-enterprise/all-modules/dist/styles/ag-grid.scss";
  @import "../node_modules/@ag-grid-enterprise/all-modules/dist/styles/ag-theme-alpine/sass/ag-theme-alpine.scss";
</style>

<template>
  <div>
    <button @click="getSelectedRows()">Get Selected Rows</button>
    <ag-grid-vue style="width: 500px; height: 500px;"
                 class="ag-theme-alpine"
                 :columnDefs="columnDefs"
                 :rowData="rowData"
                 :modules="modules"
                 rowSelection="multiple"
                 @grid-ready="onGridReady">
    </ag-grid-vue>
  </div>
</template>

<script>
  import {AgGridVue} from '@ag-grid-community/vue';
  import {AllModules} from '@ag-grid-enterprise/all-modules';

  // set license key as follows
  import {LicenseManager} from '@ag-grid-enterprise/core';
  LicenseManager.setLicenseKey('Enter your license key');

  export default {
    name: 'App',
    data() {
      return {
        columnDefs: null,
        rowData: null,
        gridApi: null,
        columnApi: null,
        modules: AllModules
      }
    },
    components: {
      AgGridVue
    },
    methods: {
      onGridReady(params) {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;
      },
      getSelectedRows() {
        const selectedNodes = this.gridApi.getSelectedNodes();
        const selectedData = selectedNodes.map(node => node.data);
        const selectedDataStringPresentation = selectedData.map(node => node.make + ' ' + node.model).join(', ');
        alert(`Selected nodes: ${selectedDataStringPresentation}`);
      }
    },
    beforeMount() {
      this.columnDefs = [
        {headerName: 'Make', field: 'make'},
        {headerName: 'Model', field: 'model'},
        {headerName: 'Price', field: 'price'}
      ];

      fetch('https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/sample-data/rowData.json')
              .then(result => result.json())
              .then(rowData => this.rowData = rowData);
    }
  }
</script>
