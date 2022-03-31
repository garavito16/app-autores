import axios from "axios";
import React from "react";
import './Lista.css';

export default props => {

    const eliminarAutor = (idAutor) => {
        axios.delete('http://localhost:8000/api/autor/delete/' + idAutor)
            .then(response => {
                console.log("se elimino");
                props.setAutores(props.autores.filter((autor, index) => autor._id !== idAutor));
            })
            .catch(err => {
                console.log("no se elimino");
            })
    }

    const editarAutor = (idAutor) => {
        props.cargaDatosEdit(idAutor);
    }

    return (
        <div>
            <table className="tabla">
                <thead>
                    <tr>
                        <th>Autor</th>
                        <th>Actions available</th>
                    </tr>
                </thead>
                <tbody>
                {
                    props.autores.map((autor, index) => {
                        return (
                            <tr key={"Indice" + index}>
                                <td>
                                    {autor.nombre}
                                </td>
                                <td>
                                    <button className="btn btnEditar" onClick={(e) => editarAutor(autor._id)}>
                                        Editar
                                    </button>
                                    <button className="btn btnEliminar" onClick={(e) => eliminarAutor(autor._id)}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    )
}