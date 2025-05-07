export const bodyToUser = (body) => {
    const birth = new Date(body.birth);
  
    return {
      email: body.email,
      name: body.name,
      password: body.password,
      gender: body.gender,
      birth: birth,
      address: body.address || "",
      phone: body.phone,
      preferences: body.preferences,
      status: 1,
      inactive_data: null
    };
  };

  export const responseFromUser = ({ user, preferences }) => {
    const preferFoods = preferences.map(
      (preference) => preference.foodCategory.name
    );
  
    return {
      email: user.email,
      name: user.name,
      preferCategory: preferFoods,
    };
  };