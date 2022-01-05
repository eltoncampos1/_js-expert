class User {
    constructor({ name, id, profession, age}) {
        // criar membros de forma automatica quando chamar o classe
        this.name = name
        this.id = parseInt(id)
        this.profession = profession
        this.birthday = new Date().getFullYear() -  age
    }
}

module.exports = User