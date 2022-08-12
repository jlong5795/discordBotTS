export const validateEnv = () => {
    if (!process.env.BOT_TOKEN) {
        console.warn("Missing Discord Bot Token");
        return false;
    }

    if (!process.env.MONGODB_URI) {
        console.warn("Missing MONGODB connection URI");
        return false;
    }
    return true;
};