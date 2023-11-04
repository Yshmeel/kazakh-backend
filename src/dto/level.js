const getLevelByXP = (xp) => {
    if(xp < 15) {
        return 1;
    }

    if(xp > 15 && xp < 30) {
        return 2;
    }

    return 3;
};

export {
    getLevelByXP
};
