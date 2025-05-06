export const bodyToUser = (body) => {
    const birth = new Date(body.birth);
    return {
        name: body.name,
        password: body.password,
        email: body.email,
        birth: birth,
        phone_number: body.phone_number,
        gender: body.gender,
        address: body.address,
        birth: body.birth,
        my_point: body.my_point,
        preferences: body.preferences,
    };
};
export const responseFromUser = ({ user, preferences }) => {
    return {
        name: user.name,
        password: user.password,
        email: user.email,
        birth: user.birth,
        phone_number: user.phone_number,
        gender: user.gender,
        address: user.address,
        birth: user.birth,
        my_point: user.my_point,
        preferences: preferences.map((pref) => ({
            id: pref.category_id,
            name: pref.kind,
        })),
    };
};
