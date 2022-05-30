import React, { useState, useEffect, useRef } from "react";
import { gql, useMutation } from "@apollo/client";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Badge } from "primereact/badge";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";

import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-green/theme.css";
import "primereact/resources/primereact.css";

const ACTUALIZAR_PEDIDO = gql`
  mutation Mutation($actualizarPedidoId: ID!, $estado: String!) {
    actualizarPedido(id: $actualizarPedidoId, estado: $estado) {
      id
    }
  }
`;

const TablaPedidos = ({ data }) => {
  const [actualizarPedido] = useMutation(ACTUALIZAR_PEDIDO);

  const [pedidos, setPedidos] = useState(data);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [filters, setFilters] = useState(null);

  const toast = useRef(null);

  useEffect(() => {
    initFilters();
  }, []);

  const initFilters = () => {
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      creado: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      idUsuario: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },

      idPedido: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      importe: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      direccion: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      piso: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      estado: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
    });
    setGlobalFilterValue("");
  };

  //BODY TEMPLATES

  const fechaBodyTemplate = (rowData) => {
    const formatedDate = new Date(parseInt(rowData.creado));
    return <>{formatedDate.toLocaleDateString()}</>;
  };

  const estadoBodyTemplate = (rowData) => {
    switch (rowData.estado) {
      case "Pendiente":
        return <Badge value="Pendiente" severity="danger"></Badge>;
        break;
      case "Reparto":
        return <Badge value="Reparto" severity="warning"></Badge>;
        break;
      case "Entregado":
        return <Badge value="Entregado" severity="success"></Badge>;
        break;
    }
  };

  //BÚSQUEDA

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  //TOOLBAR

  const leftToolbarTemplate = () => {
    return <div></div>;
  };

  const rightToolbarTemplate = () => {
    return (
      <div className="flex space-x-2">
        <div className="flex justify-end">
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              value={globalFilterValue}
              onChange={onGlobalFilterChange}
              placeholder="Buscar"
            />
          </span>
        </div>
        <div className="space-x-2">
          <Button
            type="button"
            icon="pi pi-file-excel"
            onClick={exportExcel}
            className="p-button-success mr-2"
            tooltip="XLS"
            tooltipOptions={{ position: "top" }}
          />
          <Button
            type="button"
            icon="pi pi-file-pdf"
            onClick={exportPdf}
            className="p-button-warning mr-2"
            tooltip="PDF"
            tooltipOptions={{ position: "top" }}
          />
        </div>
      </div>
    );
  };

  //EXPORT
  const cols = [
    { field: "creado", header: "Fecha" },
    { field: "idUsuario", header: "ID Usuario" },
    { field: "idPago", header: "ID Pedido" },
    { field: "importe", header: "Importe" },
    { field: "direccion", header: "Dirección" },
    { field: "piso", header: "Piso" },
    { field: "estado", header: "Estado" },
  ];

  const exportColumns = cols.map((col) => ({
    title: col.header,
    dataKey: col.field,
  }));

  const exportPdf = () => {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF.default(0, 0);
        doc.autoTable(exportColumns, pedidos);
        doc.save("pedidos.pdf");
      });
    });
  };

  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(pedidos);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      saveAsExcelFile(excelBuffer, "pedidos");
    });
  };

  const saveAsExcelFile = (buffer, fileName) => {
    import("file-saver").then((module) => {
      if (module && module.default) {
        let EXCEL_TYPE =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        let EXCEL_EXTENSION = ".xlsx";
        const data = new Blob([buffer], {
          type: EXCEL_TYPE,
        });

        module.default.saveAs(
          data,
          fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
        );
      }
    });
  };

  //FORMAT
  const formatCurrency = (rowData) => {
    return rowData.importe.toLocaleString("es-ES", {
      style: "currency",
      currency: "EUR",
    });
  };

  //EDIT

  const statuses = [
    { label: "Pendiente", value: "Pendiente" },
    { label: "Reparto", value: "Reparto" },
    { label: "Entregado", value: "Entregado" },
  ];

  const statusEditor = (options) => {
    return (
      <Dropdown
        value={options.rowData.estado}
        options={statuses}
        optionLabel="label"
        optionValue="value"
        onChange={(e) => {
          options.rowData.estado = e.value;
          options.editorCallback(e.value);
        }}
        placeholder="Selecciona el estado"
        itemTemplate={(option) => {
          switch (option.label) {
            case "Pendiente":
              return <Badge value="Pendiente" severity="danger"></Badge>;
            case "Reparto":
              return <Badge value="Reparto" severity="warning"></Badge>;
            case "Entregado":
              return <Badge value="Entregado" severity="success"></Badge>;
          }
        }}
      />
    );
  };

  const onRowEditComplete = async (e) => {
    let _pedidos = [...pedidos];
    let { newData, index } = e;

    newData.estado = newData.field_1;
    delete newData.field_1;

    _pedidos[index] = newData;

    let id = _pedidos[index].id;
    let estado = _pedidos[index].estado;
    try {
      const { data } = await actualizarPedido({
        variables: {
          actualizarPedidoId: id,
          estado: estado,
        },
      });
      setPedidos(_pedidos);
      toast.current.show({
        severity: "success",
        summary: "Estado del pedido actualizado",
        detail: "Actualizado correctamente en la base de datos",
        life: 5000,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="card">
        <Toast ref={toast} />
        <Toolbar left={leftToolbarTemplate} right={rightToolbarTemplate} />
        <DataTable
          stripedRows
          editMode="row"
          onRowEditComplete={onRowEditComplete}
          emptyMessage="No se encontraron pedidos"
          value={pedidos}
          responsiveLayout="scroll"
          breakpoint="960px"
          paginator
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords}"
          rows={5}
          rowsPerPageOptions={[5, 10, 20]}
          removableSort
          filters={filters}
          globalFilterFields={[
            "creado",
            "importe",
            "idUsuario",
            "idPago",
            "direccion",
          ]}
        >
          <Column body={fechaBodyTemplate} header="Fecha" sortable></Column>
          <Column
            body={estadoBodyTemplate}
            header="Estado"
            sortable
            editor={(options) => statusEditor(options)}
          ></Column>
          <Column
            field="importe"
            header="Importe"
            body={formatCurrency}
            sortable
          ></Column>
          <Column field="direccion" header="Dirección"></Column>
          <Column field="piso" header="Piso"></Column>
          <Column field="idUsuario" header="ID Usuario"></Column>
          <Column field="idPago" header="ID Pedido"></Column>
          <Column
            rowEditor
            exportable={false}
            style={{ minWidth: "8rem" }}
          ></Column>
        </DataTable>
      </div>
    </div>
  );
};

export default TablaPedidos;
