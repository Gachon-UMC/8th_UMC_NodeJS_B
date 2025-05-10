export const convertBigIntToString = (obj) => {
    return JSON.parse(
        JSON.stringify(obj, (key, value) =>
            typeof value === "bigint" ? Number(value) : value
        )
    );
};
