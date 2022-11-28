//Validndo dados do usuario. # Biblioteca para gerar o token npm  install jsonwebtoken
const knex = require('../database/knex');
const AppError = require ('../utils/AppError');
const { compare } = require('bcryptjs');
const authConfig = require('../Configs/auth'); //Criando token
const { sign } = require ('jsonwebtoken'); //Criando token


class SessionsController {
  async create( request, response ) {
    const { email, password } = request.body;

    const user = await knex('users').where({email}).first();

    if(!user) {
      throw new AppError('E-mail ou senha incorreta.');
    }

    const passwordMatched = await compare(password, user.password);

    if(!passwordMatched) {
      throw new AppError('E-mail ou senha incorreta.', 401);
    }
    //Criando token
    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn
    })

    return response.json({ user, token })
  };
};

module.exports = SessionsController