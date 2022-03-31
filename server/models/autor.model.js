const mongoose = require('mongoose');

const AutorSchema = new mongoose.Schema(
    {
        nombre : {
            type : String,
            required : [true,"El nombre del autor es requerido"],
            minlength : [3,"El nombre del autor debe tener mas de 3 caracteres"]
        },
        cita : {
            type : String,
            required : [true,"La cita del autor es requerido"],
            minlength : [3,"La cita dek autor debe tener mas de 3 caracteres"]
        }
    },
    {timestamps:true}
);

module.exports.Autor = mongoose.model("Autor",AutorSchema);