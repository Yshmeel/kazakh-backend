import express from 'express'

const chatHandlers = (chatService) => {
    /**
     * @type {express.Request} req
     * @type {express.Response} response}
     */
    const getMessages = async (req, res) => {
        const user = req.user;
        const messages = await chatService.getMessages(user.id);

        return res.status(200).json({
            data: messages
        });
    };

    /**
     * @type {express.Request} req
     * @type {express.Response} response}
     */
    const sendMessage = async (req, res) => {
        const {
            message
        } = req.body;

        const user = req.user;
        await chatService.sendMessage(req.user.id, message);

        return res.status(200).json(true);
    };

    return {
        getMessages,
        sendMessage
    };
};

export default chatHandlers;
