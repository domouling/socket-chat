

class Usuarios {

    constructor() {
        this.personas = [];
    }

    agregarPersona(id, nombre, sala){
        let persona = {id, nombre, sala};
        this.personas.push(persona);

        return this.personas;
    }

    getPersona(id){
        let persona = this.personas.filter(person => {
            return person.id === id
        })[0];

        return persona;
    }

    getPersonas(){
        return this.personas;
    }

    getPersonasSala(sala){
        /////////
    }

    deletePersona(id){
        let personaBorrada = this.getPersona(id);

        this.personas = this.personas.filter(person => {
            return person.id !== id
        });

        return personaBorrada;
    }

}


module.exports = {
    Usuarios
}