'use strict';

module.exports = {

    async up(knex) {

        await knex.schema.alterTable('favorite', (table) => {

            table.integer('userId').notNull().alter();
            table.integer('filmId').notNull().alter();
        });
    },

    async down(knex) {

        await knex.schema.dropTableIfExists('favorite');
    }
};
