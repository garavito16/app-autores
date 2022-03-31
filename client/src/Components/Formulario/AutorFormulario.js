import React, { useState } from "react";
import './AutorFormulario.css';

export default props => {

    const { initialNombre, initialCita, successCallback, limpiar } = props;
    const [nombre, setNombre] = useState(initialNombre);
    const [cita, setCita] = useState(initialCita);

    const enviarDatos = (e) => {
        e.preventDefault();
        let aux = [];
        let validation = true;
        if(nombre === "") {
            aux.push(["El nombre es requerido"]);
            validation = false;
        } else if(nombre.length  < 3) {
            aux.push(["El nombre debe tener como minimo 3 caracteres"]);
            validation = false;
        }

        if(cita === "") {
            aux.push(["La cita es requerida"]);
            validation = false;
        } else if (cita.length < 3) {
            aux.push(["La cita debe tener como minimo 3 caracteres"]);
            validation = false;
        }

        if(validation) {
            successCallback({ nombre, cita });
        } else {
            props.setErrores([...aux]);
        }
    }

    const cancelar = () => {
        limpiar();
        props.history.push("/");
    }

    return (
        <div>
            {
                props.errores.map((err, index) => {
                    return (
                        <p key={index}>{err}</p>
                    )
                })
            }
            <form className="formulario" onSubmit={(e)=>enviarDatos(e)}>
                <div>
                    <label className="etiqueta">Nombre:</label>
                    <input className="ingresa" placeholder="Ingrese nombre" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </div>
                <div>
                    <label className="etiqueta">Cita:</label>
                    <input className="ingresa" placeholder="Ingrese cita" type="text" value={cita} onChange={(e) => setCita(e.target.value)} />
                </div>
                <div className="botones">
                    <button className="btn btnCancelar" onClick={(e) => cancelar()}>Cancel</button>
                    <input className="btn btnGuardar" type="submit" value="Enviar Datos" />
                </div>
            </form>
        </div>
    )

}