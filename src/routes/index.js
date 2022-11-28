const { Router } = require('express');

const usersRouter = require('./users.routes');
const notesRouter = require('./notes.routes');
const tagsRouter = require('./tags.routes');
const sessionsRouter = require('./sessions.routes');
// const avatarRouter = require('./users.routes');


const routes = Router();
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/notes', notesRouter);
routes.use('/tags', tagsRouter);
// routes.use('/avatar', avatarRouter);



module.exports = routes;