import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode, FilterOperator } from "primereact/api";

const TablaSoporte = ({ data }) => {
  const [mensajes, setMensajes] = useState(data);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [filters, setFilters] = useState(null);

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
      nombre: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },

      asunto: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
    });
    setGlobalFilterValue("");
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const toast = useRef(null);

  const fechaBodyTemplate = (rowData) => {
    const formatedDate = new Date(parseInt(rowData.creado));
    return <>{formatedDate.toLocaleDateString()}</>;
  };

  const respuestaBodyTemplate = (rowData) => {
    return (
      <>
        <button onClick={() => {}}>
          <i className="pi pi-comment cursor-pointer" />
        </button>
      </>
    );
  };

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
      </div>
    );
  };

  return (
    <div>
      <div className="card">
        <Toast ref={toast} />
        <Toolbar left={leftToolbarTemplate} right={rightToolbarTemplate} />
        <DataTable
          stripedRows
          emptyMessage="No se encontraron mensajes"
          value={mensajes}
          responsiveLayout="scroll"
          breakpoint="960px"
          paginator
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords}"
          rows={5}
          rowsPerPageOptions={[5, 10, 20]}
          removableSort
          filters={filters}
          globalFilterFields={["fecha", "nombre", "asunto"]}
        >
          <Column body={fechaBodyTemplate} header="Fecha" sortable></Column>
          <Column field="nombre" header="Nombre"></Column>
          <Column field="asunto" header="Asunto"></Column>
          <Column field="mensaje" header="Mensaje"></Column>
          <Column body={respuestaBodyTemplate}></Column>
        </DataTable>
      </div>
    </div>
  );
};

export default TablaSoporte;
