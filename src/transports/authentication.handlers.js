import express from 'express'
import {newMeUser} from "../dto/user";

/**
 * @param {usersService()} usersService
 * @param {userVocabularyService()} userVocabularyService
 * @param {userPassedCoursesService()} userPassedCoursesService
 * @returns {{byName: byName}}
 */
const authenticationHandlers = (usersService, userVocabularyService, userPassedCoursesService) => {
    /**
     * @param {express.Request} req
     * @param {express.Response} res
     */
    const byName = async (req, res) => {
        const name = req.body.display_name;

        if(!name) {
            return res.status(400).json({
                type: 'authentication/invalid-name',
                message: '`name` field is required'
            });
        }

        const [token, user] = await usersService.createUser(name);

        return res.status(201).json({
            data: {
                token,
                user: {
                    me: newMeUser(user),
                    vocabulary: await userVocabularyService.getUserVocabulary(user.id),
                    passed_courses: (await userPassedCoursesService.getPassedCoursesByUserID(user.id)) || [],
                },
            }
        });
    };

    return {
        byName
    };
};

export default authenticationHandlers;
