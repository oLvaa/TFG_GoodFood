import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { usePlacesWidget } from "react-google-autocomplete";
import { useMutation } from "@apollo/client";
import { REGISTRAR_USUARIO } from "../../endpoints";
import MensajeError from "./MensajeError";
import Contenedor from "../Contenedor";

const Registro = () => {
  //Manejo de mensajes del servidor y registro
  const [mensajeBack, setMensajeBack] = useState(null);
  const [mensajeRegistroCompletado, setRegistroCompletado] = useState(null);

  const mostrarMensajeBack = () => {
    return (
      <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 mb-4 mt-[-1rem]">
        <p className="text-sm">{mensajeBack}</p>
      </div>
    );
  };

  const mostrarMensajeRegistro = () => {
    return (
      <div className="my-2 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 mt-[-1rem]">
        <p className="text-md">{mensajeRegistroCompletado}</p>
        <p className="text-sm">
          En breves serás redirigido a la página del login
        </p>
      </div>
    );
  };

  //Routing
  const router = useRouter();

  //Mutation
  const [nuevoUsuario] = useMutation(REGISTRAR_USUARIO);

  //Google autocomplete
  const { ref } = usePlacesWidget({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API,
    onPlaceSelected: (place) => {
      formik.setFieldValue("direccion", place.formatted_address);
      formik.values.direccion = place.formatted_address;
    },
    options: {
      types: ["address"],
      componentRestrictions: { country: "es" },
    },
  });

  //Validación
  const telefonoRegex = /^[0-9]{9}$/;
  const espacioRegex = /^[aA-zZ0-9]+$/;
  const formik = useFormik({
    initialValues: {
      nombre: "",
      email: "",
      password: "",
      telefono: "",
      direccion: "",
      piso: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string()
        .required("Este campo es obligatorio")
        .matches(
          espacioRegex,
          "El nombre de usuario solo puede contener números y letras"
        ),
      email: Yup.string()
        .email("El correo electrónico no es válido")
        .required("Este campo es obligatorio"),
      password: Yup.string()
        .required("Este campo es obligatorio")
        .min(6, "La contraseña debe tener al menos 6 caracteres"),
      telefono: Yup.string()
        .matches(telefonoRegex, "El número de teléfono no es válido")
        .required("Este campo es obligatorio"),
      direccion: Yup.string().required("Este campo es obligatorio"),
      piso: Yup.string(),
    }),
    onSubmit: async (values) => {
      const { nombre, email, password, telefono, direccion, piso } = values;
      try {
        //Data es la respuesta del servidor
        const { data } = await nuevoUsuario({
          variables: {
            input: {
              nombre,
              email,
              password,
              telefono,
              piso,
              direccion,
            },
          },
        });
        //Usuario creado correctamente
        setMensajeBack(null);
        setRegistroCompletado("¡Registro completado!");
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } catch (error) {
        setMensajeBack(error.message.replace("GraphQL error: ", ""));
      }
    },
  });

  return (
    <Contenedor>
      <form className="bg-fondoBlanco" onSubmit={formik.handleSubmit}>
        <h1 className="text-oscuro mb-1">¡Bienvenido!</h1>
        <p className="font-normal text-contrasteGris mb-7">Crea tu cuenta</p>

        {mensajeBack && mostrarMensajeBack()}
        {mensajeRegistroCompletado && mostrarMensajeRegistro()}

        <div className="flex items-center border-2  py-2 px-3 rounded-2xl mb-4 bg-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-contrasteGris"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
          <input
            className="pl-2 outline-none border-none text-oscuro w-full"
            type="text"
            id="nombre"
            placeholder="Nombre de usuario*"
            value={formik.values.nombre}
            onChange={formik.handleChange}
          />
        </div>

        {formik.touched.nombre && formik.errors.nombre ? (
          <MensajeError error={formik.errors.nombre} />
        ) : null}

        <div className="flex items-center border-2  py-2 px-3 rounded-2xl mb-4 bg-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-contrasteGris"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
            />
          </svg>
          <input
            className="pl-2 outline-none border-none text-oscuro w-full"
            type="text"
            id="email"
            name="email"
            placeholder="Correo electrónico*"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </div>

        {formik.touched.email && formik.errors.email ? (
          <MensajeError error={formik.errors.email} />
        ) : null}

        <div className="flex items-center border-2  py-2 px-3 rounded-2xl mb-4 bg-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-contrasteGris"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clipRule="evenodd"
            />
          </svg>
          <input
            className="pl-2 outline-none border-none text-oscuro w-full"
            type="password"
            id="password"
            placeholder="Contraseña*"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
        </div>

        {formik.touched.password && formik.errors.password ? (
          <MensajeError error={formik.errors.password} />
        ) : null}

        <div className="flex items-center border-2  py-2 px-3 rounded-2xl mb-4 bg-white">
          <svg
            className="h-5 w-5 text-contrasteGris"
            width="5"
            height="5"
            viewBox="0 0 35 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.22 19.64C16.3075 21.7576 18.8333 23.3926 21.62 24.43L25.39 21.43C25.5018 21.353 25.6343 21.3118 25.77 21.3118C25.9057 21.3118 26.0382 21.353 26.15 21.43L33.15 25.94C33.4157 26.0998 33.6407 26.3191 33.8071 26.5808C33.9735 26.8424 34.0768 27.1392 34.1088 27.4476C34.1408 27.756 34.1006 28.0677 33.9915 28.3579C33.8824 28.6482 33.7073 28.909 33.48 29.12L30.2 32.36C29.7303 32.8241 29.1529 33.1647 28.5195 33.3514C27.8861 33.5381 27.2164 33.5651 26.57 33.43C20.1222 32.0983 14.1791 28.9795 9.41999 24.43C4.76648 19.8352 1.54627 13.9888 0.149995 7.59998C0.0120608 6.96362 0.0408495 6.30242 0.233571 5.68046C0.426292 5.05849 0.77641 4.49686 1.24999 4.04998L4.64999 0.769983C4.86039 0.553771 5.11698 0.387958 5.40054 0.284961C5.6841 0.181964 5.98729 0.144451 6.28741 0.175232C6.58752 0.206013 6.87678 0.30429 7.13353 0.462704C7.39028 0.621117 7.60787 0.835563 7.77 1.08998L12.43 7.99998C12.5104 8.10849 12.5538 8.23995 12.5538 8.37498C12.5538 8.51002 12.5104 8.64148 12.43 8.74998L9.35999 12.44C10.4256 15.1709 12.0857 17.6304 14.22 19.64V19.64Z"
              fill="#969696"
            />
          </svg>

          <input
            className="pl-2 outline-none border-none text-oscuro w-full"
            type="text"
            id="telefono"
            placeholder="Número de teléfono*"
            value={formik.values.telefono}
            onChange={formik.handleChange}
          />
        </div>

        {formik.touched.telefono && formik.errors.telefono ? (
          <MensajeError error={formik.errors.telefono} />
        ) : null}

        <div className="flex items-center border-2  py-2 px-3 rounded-2xl mb-4 bg-white">
          <svg
            className="h-5 w-5 text-contrasteGris"
            viewBox="0 0 5 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.94975 1.15694L4.356 0.648611C4.31565 0.619831 4.27179 0.597659 4.22575 0.582778C4.1799 0.56629 4.13217 0.557124 4.084 0.555556H2.375L2.57525 1.94444H4.084C4.125 1.94444 4.17625 1.93417 4.2255 1.91722C4.27475 1.90028 4.32225 1.87694 4.35575 1.85167L4.9495 1.34278C4.98325 1.3175 5 1.28389 5 1.25C5 1.21611 4.98325 1.1825 4.94975 1.15694V1.15694ZM2.125 0H1.875C1.84185 0 1.81005 0.0146329 1.78661 0.0406796C1.76317 0.0667263 1.75 0.102053 1.75 0.138889V1.11111H0.916C0.8745 1.11111 0.8235 1.12139 0.77425 1.13861C0.72475 1.15528 0.6775 1.17833 0.644 1.20417L0.05025 1.7125C0.0165 1.73778 0 1.77167 0 1.80556C0 1.83917 0.0165 1.87278 0.05025 1.89861L0.644 2.4075C0.6775 2.43278 0.72475 2.45611 0.77425 2.47278C0.8235 2.48972 0.8745 2.5 0.916 2.5H1.75V4.86111C1.75 4.89795 1.76317 4.93327 1.78661 4.95932C1.81005 4.98537 1.84185 5 1.875 5H2.125C2.15815 5 2.18995 4.98537 2.21339 4.95932C2.23683 4.93327 2.25 4.89795 2.25 4.86111V0.138889C2.25 0.102053 2.23683 0.0667263 2.21339 0.0406796C2.18995 0.0146329 2.15815 0 2.125 0V0Z"
              fill="#969696"
            />
          </svg>
          <input
            className="pl-2 outline-none border-none text-oscuro w-full"
            type="direccion"
            id="direccion"
            placeholder="Dirección*"
            value={formik.values.direccion}
            onChange={formik.handleChange}
            ref={ref}
          />
        </div>

        {formik.touched.direccion && formik.errors.direccion ? (
          <MensajeError error={formik.errors.direccion} />
        ) : null}

        <div className="flex items-center border-2  py-2 px-3 rounded-2xl mb-4 bg-white">
          <svg
            className="h-5 w-5 text-contrasteGris"
            width="3"
            height="5"
            viewBox="0 0 3 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.5 0C0.6716 0 0 0.6656 0 1.4866C0 2.3077 1.5 5.0001 1.5 5.0001C1.5 5.0001 3 2.3077 3 1.4866C3 0.6656 2.3284 0 1.5 0ZM1.4951 1.9312C1.2394 1.9312 1.0322 1.7257 1.0322 1.4724C1.0322 1.2189 1.2394 1.0135 1.4951 1.0135C1.751 1.0135 1.9582 1.2189 1.9582 1.4724C1.9582 1.7257 1.751 1.9312 1.4951 1.9312Z"
              fill="#969696"
            />
          </svg>

          <input
            className="pl-2 outline-none border-none text-oscuro w-full"
            type="text"
            id="piso"
            placeholder="Piso / Puerta"
            value={formik.values.piso}
            onChange={formik.handleChange}
          />
        </div>
        <input
          type="submit"
          value="Registrar"
          className="block cursor-pointer w-full hover:bg-mainHover bg-main mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
        />
        <span className="text-sm ml-2 ">
          ¿Ya tienes cuenta?{" "}
          <Link href="/login">
            <a>
              <span className="palabraSpan hover:text-mainHover cursor-pointer text-sm">
                Inicia sesión
              </span>
            </a>
          </Link>
        </span>
      </form>
    </Contenedor>
  );
};

export default Registro;
