

class Usuarios {

    constructor() {
        this.personas = [];
    }

    agregarPersona(id, nombre, sala){

        let persona = { id, nombre, sala };

        this.personas.push(persona);

        return this.personas;

    }

    getPersona ( id ) {
        let persona = this.personas.filter( persona => {
            return persona.id === id
        })[0]; // [0] Regresa la primera posicion, es decir, el primer elemento que coincida
              // ya que solamente va a haber un elemento con ese id.
              // Necesito solamente un registro

        return persona;
    }

    getPersonas() {
        return this.personas;
    }

    getPersonasPorSala( sala ) {
      let personasEnSala = this.personas.filter( persona => persona.sala === sala);
          return personasEnSala;

    }

    borrarPersona(id) {
        // filter() regresa un nuevo arreglo eliminando el registro
        // de la condicion - return persona.id != id; -
        // el nuevo arreglo reempaza a this.personas sin ese registro

        let personaBorrada = this.getPersona(id);

        this.personas = this.personas.filter( persona => persona.id != id);

        return personaBorrada;
    }


}




module.exports = {
  Usuarios
}
