// src/hooks/useInitialFetch.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
    fetchAsyncGetMyProf,
    fetchAsyncGetProfs,
    } from "../features/auth/authSlice";
    import {
    fetchAsyncGetPosts,
    fetchAsyncGetComments,
    } from "../features/post/postSlice";

    export const useInitialFetch = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchBootLoader = async () => {
        if (localStorage.localJWT) {
            await dispatch(fetchAsyncGetMyProf());
            await dispatch(fetchAsyncGetPosts());
            await dispatch(fetchAsyncGetProfs());
            await dispatch(fetchAsyncGetComments());
        }
        };
        fetchBootLoader();
    }, [dispatch]);
};