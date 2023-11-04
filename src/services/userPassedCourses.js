/**
 * @param {userPassedCoursesRepository()} repository
 * @param {usersService} usersService
 */
const userPassedCoursesService = (repository, usersService) => {
    const getPassedCoursesByUserID = async (userID) => {
        return repository.getPassedCoursesByUserID(userID);
    };

    const insertPassedCourse = async (userID, courseKey, failsCount) => {
        let defaultXP = 15;
        defaultXP -= failsCount * 0.5;

        await repository.insertPassedCourse(userID, courseKey, defaultXP, failsCount);
        // await usersService.incrementUserXP(userID, defaultXP);

        return true;
    };

    return {
        getPassedCoursesByUserID,
        insertPassedCourse
    };
};

export default userPassedCoursesService;
