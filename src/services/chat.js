import {newUser} from "../dto/user";
import {getLevelByXP} from "../dto/level";
import knex from "knex";

const chatService = (chatMessagesRepository, usersService) => {
    const getMessages = async (userID) => {
        const user = await usersService.getUserByID(userID);
        const level = getLevelByXP(user.xp);

        let messages = await chatMessagesRepository.getMessagesByLevel(level);
        const userIDs = [...new Set(messages.map((m) => m.user_id))];

        const users = await usersService.getUsersByIDs(userIDs);

        messages = messages.map((m) => {
            return {
                ...m,
                user: newUser(users.find((u) => u.id === m.user_id) || {})
            };
        });

        return messages;
    };

    const sendMessage = async (userID, message) => {
        const user = await usersService.getUserByID(userID);
        const level = getLevelByXP(user.xp);

        await chatMessagesRepository.sendMessage(userID, message, level);

        return true;
    };

    return {
        getMessages,
        sendMessage
    };
}

export default chatService;
