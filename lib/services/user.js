'use strict';

const { Service } = require('@hapipal/schmervice');

module.exports = class UserService extends Service {

    create(user) {

        const { User } = this.server.models();

        

        return User.query().insertAndFetch(user);
    }

    findAll() {

        const { User } = this.server.models();

        return User.query();
    }

    delete(id) {

        const { User } = this.server.models();

        return User.query().deleteById(id);
    }

    update(id, user) {

        const { User } = this.server.models();

        return User.query().patchAndFetchById(id, user);
    }

    login(user) {

        const { User } = this.server.models();

        return User.query().findOne({ username: user.username, password: user.password });
    }
};
