import express from 'express'
import userVocabularyService from "../services/userVocabulary";

/**
 * @param {userVocabularyService} userVocabularyService
 */
const vocabularyHandlers = (userVocabularyService) => {
    /**
     * @type {express.Request} req
     * @type {express.Response} response}
     */
    const insert = async (req, res) => {
        const pairs = req.body.pairs;

        if(!pairs) {
            return res.status(400).json({
                type: 'vocabulary/invalid-pairs',
                message: '`pairs` parameter is not provided'
            });
        }

        await userVocabularyService.insertUserVocabularyWords(req.user.id, pairs);

        const vocabulary = await userVocabularyService.getUserVocabulary(req.user.id);

        return res.status(200).json({
            data: vocabulary
        });
    };

    return {
        insert
    };
};

export default vocabularyHandlers;
