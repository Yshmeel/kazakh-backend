import generateRandomString from "../utils/generateRandomString";

/**
 * @param {userRepository()} repository
 */
const userService = (repository) => {

    const getUserByID = async (id) => {
        return repository.getUserByID(id);
    };

    const getUserByToken = async (token) => {
        const user = await repository.getUserByToken(token);

        if(user === null) {
            throw new Error('Failed to find user by token');
        }

        return user;
    };

    const getUsersByIDs = (ids) => {
        return repository.getUsersByIDs(ids);
    };

    const createUser = async (displayName) => {
        const token = generateRandomString(30);
        const userID = await repository.createUser(displayName, 0, token);

        const user = await repository.getUserByID(userID[0]);

        return [token, user[0]];
    };

    return {
        getUserByToken,
        getUserByID,
        getUsersByIDs,
        createUser
    };
};

export default userService;
