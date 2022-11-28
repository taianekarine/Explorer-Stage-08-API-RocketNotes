require('express-async-errors');
const migrationsRun = require('./database/sqlite/migrations')
const AppError = require('./utils/AppError')
const express = require('express');
const routes = require('./routes');
const uploadConfig = require('./Configs/updload')

const app = express();
app.use(express.json());

app.use('/files', express.static(uploadConfig.UPLOADS_FOLDER));

app.use(routes);

migrationsRun()

app.use(( error, request, response, next ) => {
  if(error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message
    });
  }

    console.error(error);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });

});

const PORT = 3333;
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}.`)
})

// Mandatory values
// app.get('/message/:id/:user', ( request, response ) => {
//   const { id, user } = request.params;
  
//   response.send(`
//   Id da mensagem: ${id}
//   Para o usuário: ${user}
//   `)
// });

//Optional values (Query Params)

// app.get('/users', (request, response) => {
//   const {page, limit} = request.query;

//   response.send(`Página ${page}. Mostrar ${limit}`);
// });

// Function moved to folder /routes/users.routes.js
// app.post('/users', (request, response) => {
//   const { name, email, password } = request.body;

//   response.send(`Usuário: ${name}. E-mail: ${email}. E a senha é ${password}.`);
// });
























