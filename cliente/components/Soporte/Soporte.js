import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { classNames } from "primereact/utils";
import useAuth from "../../hooks/useAuth";
import { useMutation } from "@apollo/client";
import { NUEVO_MENSAJE } from "../../endpoints";
import { toast } from "react-toastify";

import "primeicons/primeicons.css";
import "primereact/resources/primereact.css";

const Support = () => {
  const [visible, setVisible] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});
  const [nuevoMensaje] = useMutation(NUEVO_MENSAJE);

  const { auth } = useAuth();

  const formik = useFormik({
    initialValues: {
      asunto: "",
      mensaje: "",
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
    onSubmit: async (dataForm) => {
      try {
        const { data } = await nuevoMensaje({
          variables: {
            input: {
              asunto: dataForm.asunto,
              mensaje: dataForm.mensaje,
            },
          },
        });

        setFormData(dataForm);
        setShowMessage(true);
        setVisible(false);
        formik.resetForm();
      } catch (error) {
        toast.error(error);
      }
    },
  });

  const isFormFieldValid = (name) =>
    !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (name) => {
    return (
      isFormFieldValid(name) && (
        <small className="p-error">{formik.errors[name]}</small>
      )
    );
  };

  const onHide = () => {
    setVisible(false);
  };

  const renderFooter = () => {
    return <div></div>;
  };

  return (
    <>
      {auth?.admin || auth === null ? (
        ""
      ) : (
        <button
          onClick={() => setVisible(true)}
          className="bg-main text-white opacity-50 hover:opacity-100 flex justify-center items-center w-[3rem] h-[3rem] rounded-full fixed bottom-[5rem] right-[1.25rem]"
        >
          <i className="pi pi-envelope !text-[1.5rem]"></i>
        </button>
      )}

      <Dialog
        visible={showMessage}
        onHide={() => setShowMessage(false)}
        position="top"
        showHeader={false}
        breakpoints={{ "960px": "80vw" }}
        dismissableMask
        style={{ width: "30vw" }}
      >
        <div className="flex items-center flex-col pt-6 px-3 rounded-md space-y-5">
          <i
            className="pi pi-check-circle"
            style={{ fontSize: "3rem", color: "#60992D" }}
          ></i>
          <h2 className="text-[1.5rem]">Mensaje enviado!</h2>
          <p className="mt-3 text-[1.15rem] text-center">
            El soporte se pondrá en contacto con usted vía email, a través de la
            dirección:{" "}
            <span className="font-medium mt-2 text-md">{auth?.email}</span>
          </p>
        </div>
      </Dialog>

      <Dialog
        header="Contacto con el soporte"
        visible={visible}
        onHide={() => onHide()}
        breakpoints={{ "960px": "75vw" }}
        style={{ width: "50vw" }}
        footer={renderFooter()}
        draggable={false}
        blockScroll={true}
        dismissableMask
        closable={false}
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
    </>
  );
};

export default Support;
