'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class Favorite extends Model {

    static get tableName() {

        return 'favorite';
    }

    static get joiSchema() {

        return Joi.object({
            userId: Joi.number().description('User id'),
            filmId: Joi.number().description('Film id'),
            createdAt: Joi.date()
        });
    }

    $beforeInsert(queryContext) {
        this.createdAt = this.updatedAt;
    }

};