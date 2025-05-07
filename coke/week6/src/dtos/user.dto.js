export const bodyToUser = (body) => {
    return {
      username: body.username,
      email: body.email,
      password: body.password, // 서비스에서 해싱 처리
      created_at: new Date(),
      is_active: true,
      phone_number: body.phoneNumber || null,
      social_login_type: body.socialLoginType || null,
      preferences: body.preferences || []
    };
  };
  
  export const responseFromUser = (data) => {
    const { user, preferences } = data;
    
    // 비밀번호 해시는 응답에서 제외
    const { password_hash, ...userWithoutPassword } = user;
    
    return {
      ...userWithoutPassword,
      preferences: preferences || []
    };
  };