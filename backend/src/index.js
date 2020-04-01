const express = require('express'); //importando o modulo express para dentro da variavel express
const routes = require('./routes'); // ./ -> referencia a mesma pasta do arquivo index 
const cors = require('cors');
const app = express(); //instanciando a aplicacao

app.use(cors()); //dá permissao a quem pode acessar o back-end
app.use(express.json()); // avisando para que o express vá no corpo da requisicao e transforme o objeto json em algo entendível para a aplicaçao
app.use(routes);

/**
 * Rota / Recurso
 */

 /**
  * Métodos HTTP: 
  * 
  * GET: Buscar/listar uma informação no back-end
  * POST: Criar uma informação no back-end 
  * PUT: Alterar uma informação no back-end
  * DELETE: Deletar uma informação no back-end
  */

  /**
   * Tipos de parâmetros:
   * 
   * Query Params: Parâmetros nomeados enviados na rota após o símbolo de "?" (Filtros, paginação)
   * Route Params: Parâmetros utilizados para identificar recursos
   * Request Body: Corpo da requisição utilizado para criar ou altera recursos
   */

app.listen(3333);  //mandando a aplicacao ouvir na porta 3333 (localhost:3333)