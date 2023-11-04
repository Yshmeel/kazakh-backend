import {getLevelByXP} from "./level";

const newMeUser = (user) => {
    return {
        id: user.id,
        display_name: user.display_name,
        xp: user.xp,
        level: getLevelByXP(user.xp),
    };
};

const newUser = (user) => {
    return {
        id: user.id,
        display_name: user.display_name,
        xp: user.xp,
        level: getLevelByXP(user.xp),
    };
}

export {
    newMeUser,
    newUser
};
