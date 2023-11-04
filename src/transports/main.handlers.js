const mainHandlers = () => {
    const home = (_, res) => {
        return res.json({
            ok: true
        });
    };

    return {
        home
    };
};

export default mainHandlers;
