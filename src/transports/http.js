import express from 'express'
import mh from "./main.handlers"
import bodyParser from "body-parser"
import cors from "cors"
import authH from "./authentication.handlers"
import authMiddleware from "./middlewares/auth";
import userRepository from "../database/user";
import userService from "../services/user";
import usersHandlers from "./users.handlers";
import chatService from "../services/chat";
import chatMessagesRepository from "../database/chatMessages";
import chatHandlers from "./chat.handlers";
import userVocabularyService from "../services/userVocabulary";
import userVocabularyRepository from "../database/vocabulary";
import vocabularyHandlers from "./vocabulary.handlers";
import userPassedCoursesService from "../services/userPassedCourses";
import userPassedCoursesRepository from "../database/userPassedCourses";
import courseHandlers from "./course.handlers";

const initialize = (knex) => {
    const app = express();

    app.use(bodyParser());
    app.use(cors())

    const _chatMessagesRepository = chatMessagesRepository(knex);
    const _userVocabularyRepository = userVocabularyRepository(knex);
    const _userRepository = userRepository(knex);
    const _userPassedCourseRepository = userPassedCoursesRepository(knex);

    const _userService = userService(_userRepository);

    const _chatService = chatService(
        _chatMessagesRepository, _userService
    );

    const _userVocabularyService = userVocabularyService(
        _userVocabularyRepository
    );

    const _userPassedCoursesService = userPassedCoursesService(_userPassedCourseRepository, _userService);

    const mainHandlers = mh();
    const authenticationHandlers = authH(_userService, _userVocabularyService, _userPassedCoursesService);
    const _usersHandlers = usersHandlers(_userVocabularyService, _userPassedCoursesService);
    const _chatHandlers = chatHandlers(_chatService);
    const _vocabularyHandlers = vocabularyHandlers(_userVocabularyService);
    const _courseHandlers = courseHandlers(_userPassedCoursesService);

    const authorizationMiddleware = authMiddleware(_userService);

    app.get('/', mainHandlers.home);
    app.get('/v1/user/me', authorizationMiddleware, _usersHandlers.me)
    app.get('/v1/chat', authorizationMiddleware, _chatHandlers.getMessages);

    app.post('/v1/authentication/by-name', authenticationHandlers.byName);
    app.post('/v1/chat', authorizationMiddleware, _chatHandlers.sendMessage);

    app.post('/v1/vocabulary', authorizationMiddleware, _vocabularyHandlers.insert);

    app.post('/v1/course/pass', authorizationMiddleware, _courseHandlers.passCourse)

    app.listen(process.env.PORT);
};

const http = {
    initialize
};

export default http;
