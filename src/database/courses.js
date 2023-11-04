import { Knex } from "knex"

/**
 * TABLE: courses
 * STRUCTURE:
 * id INT AI
 * key VARCHAR 512
 * level INT
 */


/**
 * @param {Knex} knex
 */
const getCourses = (knex) => () => {
    return knex.select('id', 'key')
        .from('courses')
};

/**
 * @param {Knex} knex
 * @returns {{getUserByToken: (function(*): function(*): *)}}
 */
const coursesRepository = (knex) => {
    return {
        getCourses: getCourses(knex)
    };
};

export default coursesRepository;
