import { LoginPayload, RegisterPayload } from "types/auth.type";
import { API } from "utils/constant";
import axiosClient from "./axiosClient";

const authSvc = {
    login: (account: LoginPayload) => {
        const url = API.LOGIN;
        return axiosClient
            .post(url, account)
            .then((response) => ({ response }))
            .catch((error) => ({ error }));
    },
    register: (payload: RegisterPayload) => {
        const url = API.REGISTER;
        return axiosClient
            .post(url, payload)
            .then((response) => ({ response }))
            .catch((error) => ({ error }));
    },
    me: () => {
        const url = API.ME;
        return axiosClient
            .get(url)
            .then((response) => ({ response }))
            .catch((error) => ({ error }));
    },
    updateProfile: (payload: any) => {
        const url = API.ME;
        return axiosClient
            .put(url, payload)
            .then((response) => ({ response }))
            .catch((error) => ({ error }));
    },
};

export default authSvc;
