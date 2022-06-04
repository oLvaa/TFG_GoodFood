import React, { useState } from "react";
import Link from "next/link";
import Contenedor from "../Contenedor";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { AUTENTICAR_USUARIO } from "../../endpoints";
import { useRouter } from "next/router";
import MensajeError from "./MensajeError";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const { login } = useAuth();

  const router = useRouter();

  const [autenticarUsuario] = useMutation(AUTENTICAR_USUARIO);

  const [mensajeBack, setMensajeBack] = useState(null);

  const mostrarMensajeBack = () => {
    return (
      <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 mb-4 mt-[-1rem]">
        <p className="text-sm">{mensajeBack}</p>
      </div>
    );
  };

  const [mensajeLogin, setMensajeLogin] = useState(null);

  const mostrarMensajeLogin = () => {
    return (
      <div className="my-2 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 mt-[-1rem]">
        <p className="text-md">{mensajeLogin}</p>
        <p className="text-sm">En breve será redirigido a la página inicial</p>
      </div>
    );
  };

  //Formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("El correo electrónico no es válido")
        .required("Este campo es obligatorio"),
      password: Yup.string()
        .required("Este campo es obligatorio")
        .min(6, "La contraseña debe tener al menos 6 caracteres"),
    }),
    onSubmit: async (values) => {
      try {
        const { email, password } = values;

        //El back me devuelve un token
        const { data } = await autenticarUsuario({
          variables: {
            input: {
              email,
              password,
            },
          },
        });

        // Guardo el token en localstorage
        const { token } = data.autenticarUsuario;
        localStorage.setItem("token", token);
        login(token);
        router.push("/");
      } catch (error) {
        setMensajeBack(error.message.replace("GraphQL error: ", ""));
      }
    },
  });
  return (
    <Contenedor>
      <form
        onSubmit={formik.handleSubmit}
        className="bg-fondoBlanco h-[31.5313rem]"
      >
        <h1 className="text-oscuro mb-1">¡Hola de nuevo!</h1>
        <p className="font-normal text-contrasteGris mb-7">Inicia sesión</p>

        {mensajeBack && mostrarMensajeBack()}
        {mensajeLogin && mostrarMensajeLogin()}

        <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 bg-white">
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
            className="pl-2 outline-none border-none"
            type="text"
            id="email"
            placeholder="Correo electrónico"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </div>
        {formik.touched.email && formik.errors.email ? (
          <MensajeError error={formik.errors.email} />
        ) : null}
        <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 bg-white">
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
            className="pl-2 outline-none border-none"
            type="password"
            id="password"
            placeholder="Contraseña"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
        </div>
        {formik.touched.password && formik.errors.password ? (
          <MensajeError error={formik.errors.password} />
        ) : null}
        <input
          type="submit"
          value="Iniciar sesión"
          className="block cursor-pointer w-full hover:bg-mainHover bg-main mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
        />

        <span className="text-sm ml-2 ">
          ¿No tienes cuenta?{" "}
          <Link href="/registro">
            <a>
              <span className="palabraSpan hover:text-mainHover cursor-pointer text-sm">
                Regístrate
              </span>
            </a>
          </Link>
        </span>
      </form>
    </Contenedor>
  );
};

export default Login;
