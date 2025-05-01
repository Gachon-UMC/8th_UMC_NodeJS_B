export const bodyToUser = (body) => {
    const birth = new Date(body.birth);
  
    return {
      email: body.email,
      name: body.name,
      gender: body.gender,
      birth,
      address: body.address || "",
      phone: body.phoneNumber,
      preferences: body.preferences,
      status: 1,
      inactive_data: null
    };
  };

  export const responseFromUser = ({ user, preferences }) => {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      gender: user.gender,
      birth: user.birth,
      address: user.address,
      phone: user.phone,
      preferences: preferences.map((pref) => ({
        id: pref.food_category_id,
        name: pref.name,
      })),
      createdAt: user.created_at,
      status: user.status,                    
      inactiveAt: user.inactive_data || null  
    };
  };