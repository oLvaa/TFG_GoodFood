import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { classNames } from "primereact/utils";
import { InputTextarea } from "primereact/inputtextarea";
import { Toolbar } from "primereact/toolbar";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import emailjs from "@emailjs/browser";
import { useFormik } from "formik";
import useAuth from "../../../hooks/useAuth";

const TablaSoporte = ({ data }) => {
  const [mensajes, setMensajes] = useState(data);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [filters, setFilters] = useState(null);
  const [emailDialog, setEmailDialog] = useState(false);
  const [formData, setFormData] = useState({});
  const { auth } = useAuth();

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
        <button
          onClick={() => {
            setEmailDialog(true);
          }}
        >
          <i className="pi pi-comment cursor-pointer" />
        </button>
      </>
    );
  };

  const formik = useFormik({
    initialValues: {
      asunto: "",
      nombre: auth.nombre,
      mensaje: "",
      email: auth.email,
    },
    validate: (data) => {
      let errors = {};

      if (!data.asunto) {
        errors.asunto = "No puedes dejar el asunto vacío";
      }

      if (!data.mensaje) {
        errors.mensaje = "No puedes dejar el mensaje vacío";
      }

      return errors;
    },
    onSubmit: (dataForm) => {
      debugger;
      emailjs
        .send(
          "service_v48vmpk",
          "template_o4ezgmp",
          dataForm,
          "9sOxb4vwak0eciukQ"
        )
        .then(
          (result) => {
            console.log(result);
            setFormData(dataForm);
            setEmailDialog(false);
            formik.resetForm();
            toast.current.show({
              severity: "success",
              summary: "Email enviado",
              detail: "El mensaje se borrará automáticamente",
              life: 5000,
            });
          },
          (error) => {
            toast.current.show({
              severity: "error",
              summary: "Ha ocurrido un problema",
              detail: "Inténtelo de nuevo más tarde",
              life: 5000,
            });
          }
        );
    },
  });

  const isFormFieldValid = (name) =>
    !!(formik.touched[name] && formik.errors[name]);

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

  const emailFooter = () => {
    <div></div>;
  };

  const hideEmailDialog = () => {
    setEmailDialog(false);
  };

  const getFormErrorMessage = (name) => {
    return (
      isFormFieldValid(name) && (
        <small className="p-error">{formik.errors[name]}</small>
      )
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
        <Dialog
          visible={emailDialog}
          style={{ width: "450px" }}
          header="Email"
          modal
          footer={emailFooter}
          onHide={hideEmailDialog}
          dismissableMask={true}
        >
          <div className="form-demo">
            <div className="flex justify-content-center">
              <div className="card w-full">
                <form onSubmit={formik.handleSubmit} className="p-fluid">
                  <div className="field">
                    <span className="p-float-label mt-5">
                      <InputText
                        id="asunto"
                        name="asunto"
                        value={formik.values.asunto}
                        onChange={formik.handleChange}
                        autoFocus
                        className={classNames({
                          "p-invalid": isFormFieldValid("asunto"),
                        })}
                      />
                      <label htmlFor="name">Asunto</label>
                    </span>
                    {getFormErrorMessage("asunto")}
                  </div>

                  <div className="field">
                    <span className="p-float-label mt-7">
                      <InputTextarea
                        id="mensaje"
                        name="mensaje"
                        value={formik.values.mensaje}
                        onChange={formik.handleChange}
                        autoResize
                        rows={5}
                        cols={30}
                        className={classNames({
                          "p-invalid": isFormFieldValid("mensaje"),
                        })}
                      />
                      <label htmlFor="name">Mensaje</label>
                    </span>
                    {getFormErrorMessage("asunto")}
                  </div>
                  <button
                    className="blackButton text-lg w-full flex justify-center p-2 mt-10"
                    type="submit"
                  >
                    Enviar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default TablaSoporte;
