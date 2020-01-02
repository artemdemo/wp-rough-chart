export const rndSalt = () => Math.random().toString(36).substring(7);

export const getIntFromString = (idStr: string|undefined, defaultValue: any = undefined): number => {
    if (idStr) {
        const id = parseInt(idStr, 10);
        if (!Number.isNaN(id)) {
            return id;
        }
    }
    return defaultValue;
};
