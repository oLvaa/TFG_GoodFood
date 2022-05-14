import React, { useMemo, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "1rem",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#449E48",
};

const acceptStyle = {
  borderColor: "#357B38",
};

const rejectStyle = {
  borderColor: "#B32D23",
};

const Dropzone = ({ img, onDropzoneChange }) => {
  const [imagen, setImagen] = useState(img);

  const onDrop = useCallback(async (acceptedFile) => {
    onDropzoneChange(acceptedFile[0]);
    setImagen(URL.createObjectURL(acceptedFile[0]));
  }, []);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      accepts: "image/*",
      multiple: false,
    });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <div {...getRootProps({ style })}>
      <input {...getInputProps()} />
      {imagen === "" && (
        <p className="m-12">
          Arrastra una imagen o haz click para seleccionarla
        </p>
      )}
      <div className="w-full">
        <img src={imagen} alt="" />
      </div>
    </div>
  );
};

export default Dropzone;
