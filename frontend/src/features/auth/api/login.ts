import { useMutation } from "@tanstack/react-query";
import apiClient from "@api/client";
import { Dispatch } from "@reduxjs/toolkit";
import { loginUser } from "@features/auth/reducers";

export const useLoginMutation = (dispatch: Dispatch) => {
    return useMutation({
        mutationFn: async (body: { [key: string]: string }) => {
            const response = await apiClient.post("/auth/api/login", body);
            return response.data;
        },
        onSuccess: (data) => {
            console.log(loginUser)
            dispatch(loginUser(data));
            console.log("dispatched")
        }
    })
}

