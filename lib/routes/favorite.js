'use strict';

const Joi = require('joi');

module.exports = [{
    method: 'post',
    path: '/favorite/add',
    options: {
        auth: {
            scope: ['admin', 'user']
        },
        tags: ['api'],
        validate: {
            payload: Joi.object({
                filmId: Joi.number().description('film id')
            })
        }
    },
    handler: async (request, h) => {

        const { favoriteService } = request.services();

        const res = await favoriteService.insert(request.auth.credentials.id, request.payload.filmId);

        return res;

    }
},
{
    method: 'post',
    path: '/favorite/delete',
    options: {
        auth: {
            scope: ['admin', 'user']
        },
        tags: ['api'],
        validate: {
            payload: Joi.object({
                filmId: Joi.number().description('film id')
            })
        }
    },
    handler: async (request, h) => {

        const { favoriteService } = request.services();

        const res = await favoriteService.delete(request.auth.credentials.id, request.payload.filmId);

        if (res) {
            return res;
        }

    }
},
{
    method: 'get',
    path: '/favorite/list',
    options: {
        auth: {
            scope: ['admin', 'user']
        },
        tags: ['api']
    },
    handler: async (request, h) => {

        const { favoriteService } = request.services();

        return await favoriteService.findAllByUserId(request.auth.credentials.id);

    }
}

];
