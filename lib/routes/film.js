'use strict';

const Joi = require('joi');

module.exports = [{
    method: 'post',
    path: '/film',
    options: {
        auth: {
            scope: ['admin']
        },
        tags: ['api'],
        validate: {
            payload: Joi.object({
                title: Joi.string().min(3).example('Star Wars').description('Title of the film'),
                description: Joi.string().min(3).example('Description').description('Description of the film'),
                releaseDate: Joi.date(),
                director: Joi.string().min(3).example('John Doe').description('Director of the film')

            })
        }
    },
    handler: async (request, h) => {

        const { filmService, mailService, userService } = request.services();

        const res = await filmService.create(request.payload);

        if (!res.error) {
            const users = await userService.findAll();
            users.forEach(user => {
                mailService.sendNewFilmMail(user, res);
            });
        } 

        return res;

    }
},
{
    method: 'get',
    path: '/films',
    options: {
        auth: {
            scope: ['admin', 'user']
        },
        tags: ['api']
    },
    handler: async (request, h) => {

        const { filmService } = request.services();

        return await filmService.findAll();
    }
},
{
    method: 'get',
    path: '/film/{id}',
    options: {
        auth: {
            scope: ['admin']
        },
        tags: ['api']
    },
    handler: async (request, h) => {

        const { filmService } = request.services();

        const res = await filmService.delete(request.params.id);

        if (res === 1) {
            return '';
        }
    }
},
{
    method: 'patch',
    path: '/film/{id}',
    options: {
        auth: {
            scope: ['admin']
        },
        tags: ['api']
    },
    handler: async (request, h) => {

        const { filmService, userService, mailService } = request.services();

        const res = await filmService.update(request.params.id, request.payload);

        if (res) {
            const users = await userService.findAllByFilmId(request.params.id);
            users.forEach(user => {
                mailService.sendUpdatedFilmMail(user, res);
            });
            return '{ update: successful }';
        }

        return '{ update: failed }';
    }
}

];
