import express from 'express'
import {newMeUser} from "../dto/user"

/**
 * @param {userVocabularyService} userVocabularyService
 * @param {userPassedCoursesService} userPassedCoursesService
 */
const usersHandlers = (userVocabularyService, userPassedCoursesService) => {
    /**
     * @param {express.Request} req
     * @param {express.Response} res
     */
    const me = async (req, res) => {
        return res.status(200).json({
            data: {
                me: newMeUser(req.user),
                vocabulary: await userVocabularyService.getUserVocabulary(req.user.id),
                passed_courses: (await userPassedCoursesService.getPassedCoursesByUserID(req.user.id)) || [],
            },
        });
    };

    return {
        me
    };
};

export default usersHandlers;
