export const bodyToUser = (userId, body) => {
    let birth = null;

    if (body.birth) {
        birth = new Date(body.birth);
    }

    return {
        id: Number(userId),
        email: body.email,
        name: body.name,
        gender: body.gender,
        birth: birth,
        address: body.address,
        detailAddress: body.detailAddress,
        phone: body.phone,
        preferences: body.preferences,
    };
};

export const responseFromUser = (user, preferences) => {
    const preferFoods = preferences.map((preference) => preference.foodCategory.category);

    return {
        email: user.email,
        name: user.name,
        gender: user.gender,
        birth: user.birth,
        address: user.address,
        detailAddress: user.detailAddress,
        phone: user.phone,
        preferCategory: preferFoods,
    };
};
