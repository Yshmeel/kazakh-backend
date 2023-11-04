export default (len = 30) => {
    return [...Array(len)].map(() => Math.random().toString(36)[2]).join('');
};
