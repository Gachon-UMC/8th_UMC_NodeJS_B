export const bodyToMission = (body) => {
    return {
        status: Number(body.status),
        user_id: Number(body.user_id),
        mission_id: Number(body.mission_id)
    }
}

export const responseFromMission = (data) => {
    return {
        id : data.id,
        created_at: data.created_at,
        status: data.status,
        completed_at: data.completed_at,
        user_id:data.user_id,
        mission_id:data.mission_id
    }
}