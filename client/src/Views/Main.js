import React, { useEffect, useState } from "react";
import Lista from "../Components/Lista/Lista";
import axios from 'axios';
import AutorFormulario from "../Components/Formulario/AutorFormulario";
import { Switch, Link, Route, withRouter } from "react-router-dom";

function App(props) {
    const [autores, setAutores] = useState([]);
    const [recargar, setRecargar] = useState(true);
    const [seleccionado, setSeleccionado] = useState({});
    const [errores, setErrores] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/autor/all')
            .then(response => {
                setAutores(response.data);
                setRecargar(false);
            })
    }, [recargar]);

    const cargaDatosEdit = (idAutor) => {
        axios.get('http://localhost:8000/api/autor/' + idAutor)
            .then(response => {
                setSeleccionado(response.data);
                console.log(response.data);
                props.history.push('/edit/' + idAutor);
            })
            .catch(err => {
                console.log("error :" + err);
            });
    }


    const registrarAutor = (autor) => {
        axios.post("http://localhost:8000/api/autor/new", autor)
            .then(response => {
                functionSuccess();
            })
            .catch(err => {
                functionError(err);
            });
    }

    const functionSuccess = () => {
        setRecargar(true);
        props.history.push('/');
        setErrores([]);
    }

    const functionError = (err) => {
        console.log("Ocurrio un error :" + err);
        const auxErrores = err.response.data.errors;
        const mostrar = [];
        for (const key of Object.keys(auxErrores)) {
            mostrar.push(auxErrores[key].message);
        }
        setErrores(mostrar);
    }

    const actualizarAutor = (autor) => {
        axios.put("http://localhost:8000/api/autor/edit/" + seleccionado._id, autor)
            .then(response => {
                functionSuccess();
            })
            .catch(err => {
                functionError(err);
            })
    }

    const limpiar = () => {
        setErrores([]);
    }

    return (
        <div>
            <h1>Favorite Authors</h1>
            <Switch>
                <Route exact path="/" render={
                    (routeprops) =>
                        <>
                            <Link to={"/new"}>Add an author</Link>
                            <p>We have quotes by:</p>
                            <Lista
                                autores={autores}
                                setAutores={setAutores}
                                {...routeprops}
                                cargaDatosEdit={cargaDatosEdit}
                            />
                        </>
                }
                />
                <Route exact path="/new" render={
                    (routeprops) =>
                        <>
                            <Link onClick={() => limpiar()} to={"/"}>Home</Link>
                            <p>Add a new author : </p>
                            <AutorFormulario
                                initialNombre=""
                                initialCita=""
                                successCallback={registrarAutor}
                                errores={errores}
                                setErrores={setErrores}
                                limpiar={limpiar}
                                {...routeprops}
                            />
                        </>
                }
                />
                <Route exact path="/edit/:identificador" render={
                    (routeprops) => {
                        if (seleccionado.nombre !== undefined) {
                            return (
                                <>
                                    <Link onClick={() => limpiar()} to={"/"}>Home</Link>
                                    <p>Edit this author : </p>
                                    <AutorFormulario
                                        initialNombre={seleccionado.nombre}
                                        initialCita={seleccionado.cita}
                                        successCallback={actualizarAutor}
                                        errores={errores}
                                        setErrores={setErrores}
                                        limpiar={limpiar}
                                        {...routeprops}
                                    />
                                </>
                            )
                        }
                        else {
                            return (
                                <div>
                                    <p>Lo sentimos, pero no pudimos encontrar el autor que estás buscando. ¿Deseas agregar este autor a nuestra base de datos?</p>
                                    <Link to={"/new"}>Add an author</Link>
                                </div>
                            )
                        }
                    }
                }
                />
            </Switch>


        </div>
    )
}

export default withRouter(App);