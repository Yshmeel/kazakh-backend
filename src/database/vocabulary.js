import knex, { Knex } from "knex"

/**
 * TABLE: user_vocabulary
 * STRUCTURE:
 * id INT AI
 * user_id INT
 * left_word VARCHAR
 * right_word VARCHAR
 * created_at DATE
 */

/**
 * @param {Knex} knex
 */
const getUserVocabulary = (knex) => (userID) => {
    return knex.select(['id', 'left_word', 'right_word', 'created_at'])
        .from('user_vocabulary')
        .where('user_id', userID)
        .orderBy('created_at', 'desc');
};

/**
 * @param {Knex} knex
 */
const insertUserVocabularyWords = (knex) => (userID, wordsPair) => {
   return knex('user_vocabulary').insert(wordsPair.map((p) => ({
       user_id: userID,
       left_word: p[0],
       right_word: p[1],
       created_at: knex.raw('NOW()')
   })));
}

/**
 * @param {Knex} knex
 * @returns {{getUserByToken: (function(*): function(*): *)}}
 */
const userVocabularyRepository = (knex) => {
    return {
        getUserVocabulary: getUserVocabulary(knex),
        insertUserVocabularyWords: insertUserVocabularyWords(knex)
    };
};

export default userVocabularyRepository;
