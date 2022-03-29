'use strict';

const { Service } = require('@hapipal/schmervice');

module.exports = class FilmService extends Service {

    create(film) {

        const { Film } = this.server.models();

        return Film.query().insertAndFetch(film);
    }

    findAll() {

        const { Film } = this.server.models();

        return Film.query();
    }

    delete(id) {

        const { Film } = this.server.models();

        return Film.query().deleteById(id);
    }

    update(id, film) {

        const { Film } = this.server.models();

        return Film.query().patchAndFetchById(id, film);
    }
};
