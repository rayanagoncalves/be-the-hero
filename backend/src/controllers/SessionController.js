const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { id } = request.body;

        const ong = await connection('ongs')
            .where('id', id)
            .select('name')
            .first();  // como estou buscando pelo id, só será retornado um resultado, 
            // por isso se usa o .first(), para retornar um único resultado e nao um array.
    
        if (!ong) { // se a ong nao existir
            return response.status(400).json({ error: 'No ONG found with this ID' });
        }

        return response.json(ong);
    }
}