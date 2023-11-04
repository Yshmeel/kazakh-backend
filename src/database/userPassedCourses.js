import { Knex } from "knex"

/**
 * TABLE: user_passed_courses
 * STRUCTURE:
 * id INT AI
 * user_id INT
 * course_key VARCHAR 512
 * gained_xp INT
 * fails_count INT
 * created_at DATE
 */

/**
 * @param {Knex} knex
 */
const getPassedCoursesByUserID = (knex) => (userID) => {
    return knex.select('id', 'course_key', 'gained_xp', 'fails_count','created_at')
        .from('user_passed_courses')
        .where('user_id', userID);
};

const insertPassedCourse = (knex) => (userID, courseKey, gainedXP, failsCount) => {
    return knex('user_passed_courses').insert({
        user_id: userID,
        course_key: courseKey,
        gained_xp: gainedXP,
        fails_count: failsCount,
        created_at: knex.raw('NOW()')
    }).returning('id');
};

/**
 * @param {Knex} knex
 * @returns {{getUserByToken: (function(*): function(*): *)}}
 */
const userPassedCoursesRepository = (knex) => {
    return {
        getPassedCoursesByUserID: getPassedCoursesByUserID(knex),
        insertPassedCourse: insertPassedCourse(knex),
    };
};

export default userPassedCoursesRepository;
