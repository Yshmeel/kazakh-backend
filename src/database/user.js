import { Knex } from "knex"

/**
 * TABLE: users
 * STRUCTURE:
 * id INT AI
 * display_name VARCHAR 64
 * xp INT
 * access_token VARCHAR 512
 */


/**
 * @param {Knex} knex
 */
const getUserByToken = (knex) => (token) => {
    return knex.select('id', 'display_name', 'xp')
        .from('users')
        .where('access_token', token);
};

/**
 * @param {Knex} knex
 */
const getUsersByIDs = (knex) => (ids) => {
    return knex.select('id', 'display_name', 'xp')
        .from('users')
        .where('id', 'IN', ids);
};

/**
 * @param {Knex} knex
 */
const getUserByID = (knex) => (id) => {
    return knex.select('id', 'display_name', 'xp')
        .from('users')
        .where('id', id);
};

/**
 * @param {Knex} knex
 */
const createUser = (knex) => (displayName, xp, accessToken) => {
    return knex('users').insert({
        display_name: displayName,
        xp,
        access_token: accessToken
    }).returning('id');
};

/**
 * @param {Knex} knex
 * @returns {{getUserByToken: (function(*): function(*): *)}}
 */
const userRepository = (knex) => {
    return {
        getUserByToken: getUserByToken(knex),
        getUsersByIDs: getUsersByIDs(knex),
        getUserByID: getUserByID(knex),
        createUser: createUser(knex),
    }
};

export default userRepository;
