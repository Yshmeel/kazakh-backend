import express from 'express'
import userPassedCoursesService from "../services/userPassedCourses";

const courseHandlers = (userPassedCoursesService) => {
    /**
     * @param {express.Request} req
     * @param {express.Response} res
     */
    const passCourse = async (req, res) => {
        const courseKey = req.body.course_key;
        const failsCount = req.body.fails_count;

        const user = req.user;
        await userPassedCoursesService.insertPassedCourse(user.id, courseKey, failsCount);

        return res.status(201).json({
            data: await userPassedCoursesService.getPassedCoursesByUserID(user.id)
        });
    };

    return {
        passCourse
    };
};

export default courseHandlers;
