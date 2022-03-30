'use strict';

const { Service } = require('@hapipal/schmervice');

module.exports = class FavoriteService extends Service {

    insert(userId, filmId) {

        const { Favorite } = this.server.models();

        const search = Favorite.query().findOne({ userId: userId, filmId: filmId }).then((data) => {
            if (data) {
                return { error: 'Film already in favorite' };
            } else {
                return Favorite.query().insert({
                    userId: userId,
                    filmId: filmId
                });
            }
        });

        return search;
    }

    delete(userId, filmId) {

        const { Favorite } = this.server.models();

        const search = Favorite.query().findOne({ userId: userId, filmId: filmId }).then((data) => {
            if (data) {
                return Favorite.query().delete().where({ userId: userId, filmId: filmId });
            } else {
                return { error: 'Film not in favorite' };
            }
        });

        return search;


    }

    findAllByUserId(userId) {

        const { Favorite } = this.server.models();

        return Favorite.query().join('film', 'filmId', 'film.id').where({ userId: userId }).select('film.id', 'film.title', 'film.description', 'film.releaseDate', 'film.director', 'film.createdAt', 'film.updatedAt');
    }

};
