import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Swal from "sweetalert2";
import { actionAddFanzi } from "../../../app/CarruselFanzines/fanzinesActions";

const StyledModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;

  .containerModal {
    width: 90%;
    max-width: 35.25rem;
    background-color: #161616;
    position: relative;
    border-radius: 6px;
    border-color: transparent;
    outline: none;
    height: auto;
    overflow: auto;
    display: flex;
    justify-content: center;
    align-items: center;

    .buttonClose {
      font-family: Roboto;
      font-weight: 500;
      position: absolute;
      top: 13px;
      right: 13px;
      width: 25px;
      height: 25px;
      border-radius: 50px;
      border: none;
      color: #161616;
      background: #fff35f;
      cursor: pointer;
    }

    .contenidoModal {
      display: flex;
      background-color: #1df4c8;
      width: 100%;
      height: 80%;
      margin-top: 20px;
      margin-bottom: 20px;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      h1 {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #4900da;
        font-family: "MADE Soulmaze Brush";
        font-size: 4.5vw;
        margin-top: 10px;
      }
      p {
        text-align: center;
        font-family: "MADE Soulmaze";
        font-size: 1.5vw;
        font-weight: bold;
        color: #161616;
      }

      form {
        display: flex;
        justify-content: center;
        flex-direction: column;
        width: 100%;

        .containInfo {
          display: flex;
          margin: 30px;

          .info {
            display: flex;
            flex-direction: column;

            label {
              font-family: "Founders Grotesk";
              color: #514d5b;
              text-align: justify;
              font-weight: bold;
            }

            .infoImg {
              font-family: "Filson Pro Book";
              border-radius: 1rem;
              font-size: 90%;
              width: 80%;
              margin-bottom: 20px;
              border: none;
              outline: none;
              padding: 5px;
            }

            .selecImg {
              border: none;
              font-family: "Filson Pro Book";
              position: relative;
              display: inline-block;
            }
            .selecImg::before {
              background-color: #d977c8;
              color: white;
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 1rem;
              content: "Seleccionar";
              position: absolute;
              padding: 5px;
              width: 75%;
            }

            .selecImg input[type="file"] {
              opacity: 0;
              width: 200px;
              height: 32px;
              display: inline-block;
            }

            #src-selecImg1::before {
              content: "Seleccionar Archivo 1";
            }

            #src-selecImg2::before {
              content: "Seleccionar Archivo 2";
            }
          }

         
        }

        span {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 20px;

          button {
            display: flex;
            background-color: #fff35f;
            padding: 1rem;
            color: #ffffff;
            border: none;
            border-radius: 1.25rem;
            color: #161616;
            font-family: "MADE Soulmaze";
            font-size: 0.75rem;
          }
        }
      }
    }
  }
`;

const PreviewImage = styled.img`
  width: 200px;
  height: auto;
  border: 2px solid #ddd; 
  border-radius: 5px; 
  box-shadow: 0 4px 8px rgba(0,0,0,0.1); 
`;

export const AddFanzines = ({ onClose }) => {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const [name, setName] = useState("");
  const [urlDocument, setUrlDocument] = useState("");
  const defaultImage =
    "https://cdn.icon-icons.com/icons2/65/PNG/128/imageup_imagen_12892.png";

  const onFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    updateImagePreview(file);
  };

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const onUrlDocumentChange = (event) => {
    setUrlDocument(event.target.value);
  };

  const onFormSubmit = async (event) => {
    event.preventDefault();
    if (selectedFile && name && urlDocument) {
      try {
        await dispatch(
          actionAddFanzi({ file: selectedFile, name, urlDocument })
        );
        setSelectedFile(null);
        setName("");
        setUrlDocument("");
        document.getElementById("preview").src = defaultImage;
        Swal.fire({
          icon: "success",
          title: "¡Has subido un Fanzine correctamente!",
          showConfirmButton: false,
          timer: 2500,
        }).finally(() => {
          onClose();
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const updateImagePreview = (file) => {
    if (file) {
      document.getElementById("preview").src = URL.createObjectURL(file);
      Swal.fire({
        icon: "success",
        title: "¡Imagen agregada correctamente!",
        showConfirmButton: false,
        timer: 2500 
      });
    } else {
      document.getElementById("preview").src = defaultImage;
    }
  };

  return (
    <StyledModal>
      <div className="containerModal">
        <button className="buttonClose" onClick={onClose}>
          X
        </button>
        <div className="contenidoModal">
          <h1>FANZINES</h1>
          <p>¡LISTO PARA PUBLICAR!</p>
          <form onSubmit={onFormSubmit}>
            <div className="containInfo">
              <div className="info">
                <label htmlFor="name">Nombre:</label>
                <input
                  className="infoImg"
                  type="text"
                  id="name"
                  value={name}
                  onChange={onNameChange}
                  required
                />
                <label htmlFor="urlDocument">Url del sitio:</label>
                <input
                  className="infoImg"
                  type="text"
                  id="urlDocument"
                  value={urlDocument}
                  onChange={onUrlDocumentChange}
                  required
                />
                <label htmlFor="file">Seleccionar imagen:</label>
                <div className="selecImg">
                  <input
                    type="file"
                    id="file"
                    onChange={onFileChange}
                    required
                  />
                </div>
              </div>
              <div className="imagePrev">
                <PreviewImage
                  id="preview"
                  src={defaultImage}
                  alt="Vista previa"
                />
              </div>
            </div>

            <span>
              <button type="submit">SUBIR IMAGEN</button>
            </span>
          </form>
        </div>
      </div>
    </StyledModal>
  );
};