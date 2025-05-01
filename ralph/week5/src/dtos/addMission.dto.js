export const bodyToAddMission = (data) => {
    return {
        status: data.status,
        content: data.content,
        point: data.point,
        store_id: data.store_id,
        end_date: data.end_date,
    };
};
export const responseToAddMission = (res) => {
    console.log(res);
    return {
        id: res.id,
        status: res.status,
        content: res.content,
        point: res.point,
        store_id: res.store_id,
        end_date: res.end_date,
        created_at: res.created_at,
    };
};
