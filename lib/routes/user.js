'use strict';

const Joi = require('joi');
const Sha1 = require('sha1');
const Jwt = require('@hapi/jwt');

module.exports = [{
  method: 'post',
  path: '/user',
  options: {
    auth: false,
    tags: ['api'],
    validate: {
      payload: Joi.object({
        firstName: Joi.string().required().min(3).example('John').description('Firstname of the user'),
        lastName: Joi.string().required().min(3).example('Doe').description('Lastname of the user'),
        username: Joi.string().min(3).description('Username of the user'),
        password: Joi.string().min(8).description('Password of the user'),
        email: Joi.string().example('johndoe@gmail.com').min(8).description('Email of the user'),
        role: Joi.string().example('user').description('Role of the user')
      })
    }
  },
  handler: async (request, h) => {

    const { userService, mailService } = request.services();

    request.payload.password = Sha1(request.payload.password);

    const res = await userService.create(request.payload);

    if(res) {
      mailService.sendWelcomeMail(res);
      return res;
    }
  }
},
{
  method: 'get',
  path: '/users',
  options: {
    auth: {
        scope: ['admin', 'user']
    },
    tags: ['api']
  },
  handler: async (request, h) => {

    const { userService } = request.services();

    return await userService.findAll();
  }
},
{
  method: 'get',
  path: '/user/{id}',
  options: {
    auth: {
        scope: ['admin']
    },
    tags: ['api']
  },
  handler: async (request, h) => {

    const params = request.params;

    const { userService } = request.services();

    const res = await userService.delete(params.id);

    if (res === 1) {
      return '';
    }

  }
},
{
  method: 'patch',
  path: '/user/{id}',
  options: {
    auth: {
        scope: ['admin']
    },
    tags: ['api']
  },
  handler: async (request, h) => {

    const params = request.params;

    const { userService } = request.services();

    if (request.payload.password) {
      request.payload.password = Sha1(request.payload.password);
    }

    const res = await userService.update(params.id, request.payload);

    if (res) {
      return '{ update: successful }';
    }

    return '{ update: failed }';

  }
},
{
  method: 'post',
  path: '/user/login',
  options: {
    auth: false,
    tags: ['api'],
    validate: {
      payload: Joi.object({
        username: Joi.string().min(3).description('Username of the user'),
        password: Joi.string().min(8).description('Password of the user')
      })
    }
  },
  handler: async (request, h) => {

    const { userService } = request.services();

    request.payload.password = Sha1(request.payload.password);

    const user = await userService.login(request.payload);

    // if (user) {
    //     return '{ login: "successful" }';
    // }
    if (user) {
      const token = Jwt.token.generate(
        {
          aud: 'urn:audience:iut',
          iss: 'urn:issuer:iut',
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          scope: user.role
        },
        {
          key: 'random_string',
          algorithm: 'HS512'
        },
        {
          ttlSec: 14400 // 4 hours
        }
      );
      return token;
    }

    return '{ login: "failed" }';

  }
}
];