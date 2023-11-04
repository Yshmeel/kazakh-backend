/**
 * @param {userVocalburyRepository()} repository
 */
const userVocabularyService = (repository) => {
    const getUserVocabulary = async (userID) => {
        return repository.getUserVocabulary(userID);
    };

    const insertUserVocabularyWords = (userID, wordsPair) => {
        return repository.insertUserVocabularyWords(userID, wordsPair);
    };

    return {
        getUserVocabulary,
        insertUserVocabularyWords
    };
};

export default userVocabularyService;
