const connection = require('../database/connection');

module.exports = {
    async index (request, response) {
        const { page = 1} = request.query;
        
        const [count] = await connection('incidents').count(); // coloca em colchetes para trazer apenas a 1 posicao do array

        console.log(count);

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id') // join com a tabela ongs
            .limit(5)
            .offset((page - 1) * 5) // pula os 5 primeiros registros (1 pagina)
            .select([
                'incidents.*', 
                'ongs.name', 
                'ongs.email', 
                'ongs.whatsapp', 
                'ongs.city', 
                'ongs.uf']);
        
        response.header('X-Total-Count', count['count(*)']); //trazendo a quantidade de incidentes no cabeçalho da requisição

        return response.json(incidents);
    },

    async create (request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization; //guarda dados da autenticacao do usuario
    
        const [id] = await connection('incidents').insert({
            title, 
            description, 
            value,
            ong_id
        });

        return response.json({ id });
    },
    async delete (request, response) {
        const { id } = request.params; 
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if(incident.ong_id != ong_id) {
            return response.status(401).json({ error: 'Operation not permitted.' }); // erro 401 = status inautorizado.
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send(); 
    }
}