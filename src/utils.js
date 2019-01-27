export const createParams = queryObject => {
    const result = new URLSearchParams();

    Object.entries(queryObject).forEach(([key, value]) => result.append(key, value));

    return result;
};
