
import { Knex } from "knex"

/**
 * TABLE: chat_messages
 * STRUCTURE:
 * id INT AI
 * user_id INT
 * message TEXT
 * level INT
 * created_at DATE
 */

/**
 * @param {Knex} knex
 */
const getMessagesByLevel = (knex) => (level) => {
    return knex.select('id', 'user_id', 'message', 'level', 'created_at')
        .from('chat_messages')
        .where('level', level)
        .orderBy('created_at', 'desc')
};


const sendMessage = (knex) => (userID, message, level) => {
    return knex('chat_messages').insert({
        user_id: userID,
        message,
        created_at: knex.raw('NOW()'),
        level,
    }).returning('id');
};

/**
 * @param {Knex} knex
 * @returns {{getUserByToken: (function(*): function(*): *)}}
 */
const chatMessagesRepository = (knex) => {
    return {
        getMessagesByLevel: getMessagesByLevel(knex),
        sendMessage: sendMessage(knex),
    };
};

export default chatMessagesRepository;
