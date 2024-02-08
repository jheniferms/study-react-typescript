import { API } from "../ApiConfig";
import { ApiException } from "../ApiException";

export interface ITask {
    title: string;
    isCompleted: boolean;
    id: number

}
const getAll = async (): Promise<ITask[] | ApiException> => {
    try {
        const { data } = await API().get("/tasks");
        return data

    } catch (error: any) {
        return new ApiException(error.message || "Error getting tasks");
    }
};

const get = async (id: number): Promise<ITask | ApiException> => {
    try {
        const { data } = await API().get(`/tasks/${id}`);
        return data

    } catch (error: any) {
        return new ApiException(error.message || "Error getting task");
    }
};

const deleteById = async (id: number): Promise<undefined | ApiException> => {
    try {
       await API().delete(`/tasks/${id}`);
        return undefined;

    } catch (error: any) {
        return new ApiException(error.message || "Error deleting task");
    }
};

const create = async (request: Omit<ITask, "id">): Promise<ITask | ApiException> => {
    try {
        const { data } = await API().post(`/tasks`, request);
        return data

    } catch (error: any) {
        return new ApiException(error.message || "Error creating task");
    }
};

const update = async (id: number, request: ITask): Promise<ITask | ApiException> => {
    try {
        const { data } = await API().put(`/tasks/${id}`, request);
        return data

    } catch (error: any) {
        return new ApiException(error.message || "Error updating task");
    }
};



export const TasksService = {
    getAll,
    get,
    create,
    update,
    deleteById
}