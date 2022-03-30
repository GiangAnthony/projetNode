'use strict';

module.exports = {

    async up(knex) {

        await knex.schema.createTable('favorite', (table) => {

            table.integer('userId');
            table.foreign('userId').references('user.id').onDelete('CASCADE');
            table.integer('filmId');
            table.foreign('filmId').references('film.id').onDelete('CASCADE');
            table.dateTime('createdAt').notNull().defaultTo(knex.fn.now());
        });
    },

    async down(knex) {

        await knex.schema.dropTableIfExists('favorite');
    }
};
