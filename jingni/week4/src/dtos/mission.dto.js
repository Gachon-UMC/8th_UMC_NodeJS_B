export const bodyToMission = (body) => {
    return {
        title: body.title,
        content: body.content,
        point: Number(body.point),
        deadline: body.deadline,
        inactive_data: null,
        store_id: Number(body.store_id)
    }
}

export const responseFromMission = (mission) => {
    return {
        id: mission.id,
        title: mission.title,
        content: mission.content,
        point: mission.point,
        created_at: mission.created_at,
        updated_at: mission.updated_at,
        inactive_data: mission.inactive_data,
        deadline: mission.deadline,
        store_id: mission.store_id
    }
}