import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-green/theme.css";
import "primereact/resources/primereact.css";

import React, { useState, useEffect, useRef } from "react";
import { gql } from "@apollo/client";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { InputNumber } from "primereact/inputnumber";
import { Image } from "primereact/image";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputSwitch } from "primereact/inputswitch";
import Dropzone from "./Dropzone";
import { Toast } from "primereact/toast";
import { CircularProgress } from "@mui/material";

const NUEVO_PLATO = gql`
  mutation NuevoPlato {
    nuevoPlato {
      nombre
      img
      imgID
      pack
      enMenu
      precio
      peso
      calorias
      proteina
      carbohidrato
      grasa
    }
  }
`;

const Table = ({ data }) => {
  const PLATO_VACIO = {
    id: "",
    nombre: "",
    img: "",
    imgID: "",
    pack: "",
    enMenu: null,
    precio: 0,
    peso: 0,
    calorias: 0,
    proteina: 0,
    carbohidrato: 0,
    grasa: 0,
  };

  const PACK_DROPDOWN_ITEMS = [
    { label: "Definición", value: "Definición" },
    { label: "Rendimiento", value: "Rendimiento" },
    { label: "Volumen", value: "Volumen" },
  ];

  const [platos, setPlatos] = useState(data);
  const [plato, setPlato] = useState(PLATO_VACIO);
  const [submitted, setSubmitted] = useState(false);
  const [platoDialog, setPlatoDialog] = useState(false);
  const [deletePlatoDialog, setDeletePlatoDialog] = useState(false);
  const [deletePlatosDialog, setDeletePlatosDialog] = useState(false);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [filters, setFilters] = useState(null);
  const [platosSeleccionados, setPlatosSeleccionados] = useState(null);
  const [expandedRows, setExpandedRows] = useState(null);
  const [uploadedImg, setUploadedImg] = useState();
  const [imgChanged, setImgChanged] = useState(false);
  const [fromEdit, setFromEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const toast = useRef(null);

  useEffect(() => {
    //AQUÍ VA EL FETCH
    initFilters();
  }, []);

  //COLUMNAS
  const formatCurrency = (rowData) => {
    return rowData.precio.toLocaleString("es-ES", {
      style: "currency",
      currency: "EUR",
    });
  };

  const imageBodyTemplate = (rowData) => {
    return (
      <div className="w-[5rem]">
        <Image
          src={`${rowData.img}`}
          template="Preview Content"
          alt={rowData.nombre}
          imageClassName="product-image rounded-lg shadow-lg"
          onError={(e) => (e.target.src = "/placeholder-image.jpg")}
        />
      </div>
    );
  };

  const pesoBodyTemplate = (rowData) => {
    return <span>{rowData.peso}g</span>;
  };

  const menuBodyTemplate = (rowData) => {
    if (rowData.enMenu) {
      return (
        <div className="bg-green-200 text-center text-green-600 font-semibold px-4 py-1 rounded-md w-[4rem]">
          <span>Sí</span>
        </div>
      );
    } else {
      return (
        <div className="bg-red-200 text-center text-red-600 font-semibold px-3 py-1 rounded-md w-[4rem]">
          <span>No</span>
        </div>
      );
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

  const renderHeader = () => {
    return (
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
    );
  };

  const header = renderHeader();

  const initFilters = () => {
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      nombre: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      pack: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },

      precio: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
    });
    setGlobalFilterValue("");
  };

  //Edición

  const editPlato = (plato) => {
    setFromEdit(true);
    setPlato({ ...plato });
    setPlatoDialog(true);
  };

  const confirmDeletePlato = (plato) => {
    setPlato(plato);
    setDeletePlatoDialog(true);
  };

  //Toolbar Utilities
  const openNew = () => {
    setPlato(PLATO_VACIO);
    setSubmitted(false);
    setPlatoDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setPlatoDialog(false);
  };

  const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < platos.length; i++) {
      if (platos[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  };

  const savePlato = async () => {
    setSubmitted(true);

    let _plato;

    if (imgChanged) {
      setLoading(true);

      if (fromEdit) {
        //Aquí irá el endpoint al que le pasará el public id de la foto y el back la borrará
      }

      //Subo la imagen a Cloudinary
      const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;

      const formData = new FormData();
      formData.append("file", uploadedImg);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
      );

      const response = await fetch(url, {
        method: "post",
        body: formData,
      });

      const data = await response.json();
      console.log(data);
      debugger;

      _plato = { ...plato };
      _plato["img"] = data.secure_url;
      _plato["imgID"] = data.asset_id;
      setPlato(_plato);

      setLoading(false);
    } else {
      _plato = { ...plato };
    }

    if (plato.nombre.trim()) {
      let _platos = [...platos];

      if (plato.id !== "") {
        const index = findIndexById(plato.id);

        _platos[index] = _plato;
        toast.current.show({
          severity: "success",
          summary: "Plato actualizado",
          detail: "La base de datos ha sido actualizada",
          life: 5000,
        });
      } else {
        _platos.unshift(_plato);
        toast.current.show({
          severity: "success",
          summary: "Plato creado",
          detail: "La base de datos ha sido actualizada",
          life: 5000,
        });
      }

      setPlatos(_platos);
      setPlatoDialog(false);
      setImgChanged(false);
      setFromEdit(false);
      setPlato(PLATO_VACIO);
    }
  };

  const hideDeletePlatoDialog = () => {
    setDeletePlatoDialog(false);
  };

  const hideDeletePlatosDialog = () => {
    setDeletePlatosDialog(false);
  };

  const deletePlato = () => {
    //Aquí habrá que llamar al endpoint para borrar imagenes de cloudinary
    let _platos = platos.filter((val) => val.id !== plato.id);
    setPlatos(_platos);
    setDeletePlatoDialog(false);
    setPlato(PLATO_VACIO);
    toast.current.show({
      severity: "success",
      summary: "Plato eliminado",
      detail: "La base de datos ha sido actualizada",
      life: 5000,
    });
  };

  const deleteSelectedPlatos = () => {
    let _platos = platos.filter((val) => !platosSeleccionados.includes(val));
    setPlatos(_platos);
    setDeletePlatosDialog(false);
    setPlatosSeleccionados(null);
    toast.current.show({
      severity: "success",
      summary: "Platos eliminados",
      detail: "La base de datos ha sido actualizada",
      life: 5000,
    });
  };

  const confirmDeleteSelected = () => {
    setDeletePlatosDialog(true);
  };

  //Export
  const cols = [
    { field: "nombre", header: "Nombre" },
    { field: "imagen", header: "Imagen" },
    { field: "pack", header: "Pack" },
    { field: "peso", header: "Peso" },
    { field: "precio", header: "Precio" },
    { field: "enMenu", header: "En menú" },
    { field: "proteina", header: "Proteína" },
    { field: "carbohidrato", header: "Carbohidratos" },
    { field: "grasa", header: "Grasas" },
  ];

  const exportColumns = cols.map((col) => ({
    title: col.header,
    dataKey: col.field,
  }));

  const exportPdf = () => {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF.default(0, 0);
        doc.autoTable(exportColumns, platos);
        doc.save("products.pdf");
      });
    });
  };

  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(platos);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      saveAsExcelFile(excelBuffer, "platos");
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

  //Formulario
  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _plato = { ...plato };
    _plato[`${name}`] = val;

    setPlato(_plato);
  };

  const onPackChange = (e) => {
    let _plato = { ...plato };
    _plato["pack"] = e.value;
    setPlato(_plato);
  };

  const onMenuChange = (e) => {
    let _plato = { ...plato };
    _plato["enMenu"] = e.value;
    setPlato(_plato);
  };

  const onInputNumberChange = (e, name) => {
    const val = e.value || 0;
    let _plato = { ...plato };
    _plato[`${name}`] = val;

    setPlato(_plato);
  };

  const onMacrosInputChange = (e, name) => {
    const val = e.value || 0;
    let _plato = { ...plato };
    _plato[`${name}`] = val;
    setPlato(_plato);
  };

  const onDropzoneChange = (img) => {
    setImgChanged(true);
    setUploadedImg(img);
  };

  //Dialog JSX
  const platoDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button
        label="Guardar"
        icon="pi pi-check"
        className="p-button-text"
        onClick={savePlato}
      />
    </React.Fragment>
  );
  const deletePlatoDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeletePlatoDialog}
      />
      <Button
        label="Sí"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deletePlato}
      />
    </React.Fragment>
  );
  const deletePlatosDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeletePlatoDialog}
      />
      <Button
        label="Sí"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteSelectedPlatos}
      />
    </React.Fragment>
  );

  //Toolbar JSX
  const leftToolbarTemplate = () => {
    return (
      <>
        <button
          className="bg-main p-3 text-white rounded-md mr-2"
          onClick={openNew}
        >
          <i className="pi pi-plus mr-2 "></i>
          Nuevo plato
        </button>

        {!platosSeleccionados || !platosSeleccionados.length ? (
          <div />
        ) : (
          <button
            className="bg-red-500 p-3 text-white rounded-md"
            onClick={confirmDeleteSelected}
            disabled={!platosSeleccionados || !platosSeleccionados.length}
          >
            <i className="pi pi-trash mr-2 "></i>
            Eliminar
          </button>
        )}
      </>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <div className="space-x-2">
        <Button
          type="button"
          icon="pi pi-file-excel"
          onClick={exportExcel}
          className="p-button-success mr-2"
          data-pr-tooltip="XLS"
        />
        <Button
          type="button"
          icon="pi pi-file-pdf"
          onClick={exportPdf}
          className="p-button-warning mr-2"
          data-pr-tooltip="PDF"
        />
      </div>
    );
  };

  //Edit JSX
  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex justify-end w-full space-x-2">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => editPlato(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeletePlato(rowData)}
        />
      </div>
    );
  };

  //Expandible JSX
  const rowExpansionTemplate = (data) => {
    let FormattedData = [data];
    return (
      <div className="orders-subtable">
        <DataTable
          value={FormattedData}
          responsiveLayout="stack"
          breakpoint="960px"
        >
          <Column field="calorias" header="Calorías (g)"></Column>
          <Column field="proteina" header="Proteína (g)"></Column>
          <Column field="carbohidrato" header="Carbohidratos (g)"></Column>
          <Column field="grasa" header="Grasas (g)"></Column>
        </DataTable>
      </div>
    );
  };

  return (
    <div className="datatable-rowexpansion-demo">
      <Toast ref={toast} />
      <div className="card">
        <Toolbar
          className="mb-4"
          left={leftToolbarTemplate}
          right={rightToolbarTemplate}
        />

        <DataTable
          value={platos}
          paginator
          responsiveLayout="stack"
          breakpoint="960px"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords}"
          rows={5}
          rowsPerPageOptions={[5, 10, 20]}
          removableSort
          header={header}
          filters={filters}
          globalFilterFields={["nombre", "pack", "precio"]}
          emptyMessage="No se encontraron platos."
          dataKey="id" //???
          selectionMode="checkbox"
          selection={platosSeleccionados}
          onSelectionChange={(e) => setPlatosSeleccionados(e.value)}
          expandedRows={expandedRows}
          onRowToggle={(e) => setExpandedRows(e.data)}
          rowExpansionTemplate={rowExpansionTemplate}
        >
          <Column selectionMode="multiple" headerStyle={{ width: "3em" }} />
          <Column expander style={{ width: "3em" }} />
          <Column field="nombre" header="Nombre" sortable></Column>
          <Column field="img" header="Imagen" body={imageBodyTemplate}></Column>
          <Column field="pack" header="Pack" sortable></Column>
          <Column
            field="peso"
            header="Peso"
            body={pesoBodyTemplate}
            sortable
          ></Column>
          <Column
            field="precio"
            header="Precio"
            body={formatCurrency}
            sortable
          ></Column>
          <Column
            field="enMenu"
            header="En menú"
            body={menuBodyTemplate}
            sortable
          ></Column>
          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "8rem" }}
          ></Column>
        </DataTable>
      </div>

      <Dialog
        visible={platoDialog}
        style={{ width: "450px" }}
        header="Detalles del plato"
        modal
        className="p-fluid space-y"
        footer={!loading && platoDialogFooter}
        onHide={hideDialog}
        dismissableMask={loading ? false : true}
        closable={loading ? false : true}
        blockScroll={true}
      >
        {loading ? (
          <div className="flex w-full justify-center">
            <CircularProgress color="success" />
          </div>
        ) : (
          <>
            <div className="field mb-12">
              <label className="font-bold" htmlFor="nombre">
                Nombre
              </label>
              <InputText
                id="nombre"
                value={plato.nombre}
                onChange={(e) => onInputChange(e, "nombre")}
                required
                autoFocus
              />
            </div>

            <div className="field mb-12">
              <label className="font-bold" htmlFor="img">
                Imagen
              </label>
              <Dropzone img={plato.img} onDropzoneChange={onDropzoneChange} />
            </div>

            <div className="field mb-12">
              <label className="font-bold">Pack</label>
              <div className="formgrid grid">
                <Dropdown
                  value={plato.pack}
                  options={PACK_DROPDOWN_ITEMS}
                  onChange={onPackChange}
                  placeholder="Selecciona un pack"
                />
              </div>
            </div>

            <div className="field mb-12">
              <label className="font-bold">Menú</label>
              <div className="formgrid grid">
                <InputSwitch checked={plato.enMenu} onChange={onMenuChange} />
              </div>
            </div>

            <div className="formgrid grid">
              <div className="field col mb-12">
                <label className="font-bold" htmlFor="precio">
                  Precio
                </label>
                <InputNumber
                  id="precio"
                  value={plato.precio}
                  onValueChange={(e) => onInputNumberChange(e, "precio")}
                  mode="currency"
                  currency="EUR"
                  locale="es-ES"
                />
              </div>

              <div className="field col mb-12 flex space-x-6">
                <div className="flex flex-col">
                  <label className="font-bold" htmlFor="peso">
                    Peso
                  </label>
                  <InputNumber
                    id="peso"
                    value={plato.peso}
                    onValueChange={(e) => onInputNumberChange(e, "peso")}
                    integeronly
                  />
                </div>

                <div className="flex flex-col">
                  <label className="font-bold" htmlFor="calorias">
                    Calorias
                  </label>
                  <InputNumber
                    id="calorias"
                    value={plato.calorias}
                    onValueChange={(e) => onMacrosInputChange(e, "calorias")}
                    integeronly
                  />
                </div>
              </div>

              <div className="field col flex space-x-6 mb-12">
                <div className="flex flex-col">
                  <label className="font-bold" htmlFor="proteina">
                    Proteina
                  </label>
                  <InputNumber
                    id="proteina"
                    value={plato.proteina}
                    onValueChange={(e) => onMacrosInputChange(e, "proteina")}
                    integeronly
                  />
                </div>

                <div className="flex flex-col">
                  <label className="font-bold" htmlFor="carbohidrato">
                    Carbohidrato
                  </label>
                  <InputNumber
                    id="carbohidrato"
                    value={plato.carbohidrato}
                    onValueChange={(e) =>
                      onMacrosInputChange(e, "carbohidrato")
                    }
                    integeronly
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-bold" htmlFor="grasa">
                    Grasas
                  </label>
                  <InputNumber
                    id="grasa"
                    value={plato.grasa}
                    onValueChange={(e) => onMacrosInputChange(e, "grasa")}
                    integeronly
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </Dialog>

      <Dialog
        visible={deletePlatoDialog}
        style={{ width: "450px" }}
        header="Confirmar"
        modal
        footer={deletePlatoDialogFooter}
        onHide={hideDeletePlatoDialog}
        dismissableMask={true}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "1rem" }}
          />
          {plato && (
            <span>
              ¿Está seguro de querer borrar <b>{plato.nombre}</b>?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deletePlatosDialog}
        style={{ width: "450px" }}
        header="Confirmar"
        modal
        footer={deletePlatosDialogFooter}
        onHide={hideDeletePlatosDialog}
        dismissableMask={true}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {plato && (
            <span>¿Está seguro de querer borrar los platos seleccionados?</span>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default Table;
