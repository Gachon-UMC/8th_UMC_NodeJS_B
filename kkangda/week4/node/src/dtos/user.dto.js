export const bodyToUser = (body) => {
    const birth = new Date(body.birth);

    return {
        email: body.email,
        name: body.name,
        gender: body.gender,
        birth,
        address: body.address || "",
        detailAddress: body.detailAddress || "",
        phone: body.phone,
        preferences: body.preferences,
    };
};

export const responseFromUser = (user, preferences) => {
    return {
        email: user.email,
        name: user.name,
        preferCategory: preferences.map((p) => p.category),
    };
};
