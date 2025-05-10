export const bodyToUser = (body) => {
    return {
        name: body.name,
        password: body.password,
        email: body.email,
        birth: body.birth,
        phoneNumber: body.phoneNumber,
        gender: body.gender,
        address: body.address,
        myPoint: body.myPoint,
        preferences: body.preferences,
    };
};
export const responseFromUser = ({ user, preferences }) => {
    return {
        name: user.name,
        password: user.password,
        email: user.email,
        birth: user.birth,
        phoneNumber: user.phoneNumber,
        gender: user.gender,
        address: user.address,
        myPoint: user.my_point,
        preferences: preferences.map((pref) => ({
            id: pref.category_id,
            name: pref.kind,
        })),
    };
};
