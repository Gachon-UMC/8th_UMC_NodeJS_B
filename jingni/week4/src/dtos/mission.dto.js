export const bodyToMission = (body) => {
    const deadline = new Date(body.deadline);

    return {
        title: body.title,
        content: body.content,
        point: body.point,
        deadline: deadline,
        inactive_data: null,
        store_id: body.store_id,
    }
}

export const responseFromMission = (mission) => {
    return {
        id: mission.id,
        title: mission.title,
        content: mission.content,
        point: mission.point,
        inactive_data: mission.inactive_data,
        deadline: mission.deadline,
        store_id: mission.store_id
    }
}

export const bodyToDoMission = (body) => {
    return {
        status: Number(body.status),
        user_id: Number(body.user_id),
        mission_id: Number(body.mission_id)
    }
}

export const responseFromDoMission = (data) => {
    return {
        id : data.id,
        created_at: data.created_at,
        status: data.status,
        completed_at: data.completed_at,
        user_id:data.user_id,
        mission_id:data.mission_id
    }
}


export const responseFromMissionList = (missions) => {
    return {
      data: missions,
      pagination: {
        cursor: missions.length ? missions[missions.length - 1].id : null,
      },
    };
  };