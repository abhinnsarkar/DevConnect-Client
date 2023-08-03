import axios from "axios";
import { setAlert } from "./alert";
import {
    GET_POSTS,
    GET_POST,
    ADD_POST,
    DELETE_POST,
    POST_ERROR,
    UPDATE_LIKES,
    ADD_COMMENT,
    REMOVE_COMMENT,
} from "./types";

export const getPosts = () => async (dispatch) => {
    try {
        const res = await axios.get(
            "https://devconnect-backend-z69k.onrender.com/api/posts"
        );

        dispatch({
            type: GET_POSTS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

export const getPost = (id) => async (dispatch) => {
    try {
        const res = await axios.get(
            `https://devconnect-backend-z69k.onrender.com/api/posts/${id}`
        );

        dispatch({
            type: GET_POST,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

export const addPost = (formData) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    try {
        const res = await axios.post(
            `https://devconnect-backend-z69k.onrender.com/api/posts`,
            formData,
            config
        );

        dispatch({
            type: ADD_POST,
            payload: res.data,
        });
        dispatch(setAlert("Post Created", "success"));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

export const deletePost = (id) => async (dispatch) => {
    try {
        const res = await axios.delete(
            `https://devconnect-backend-z69k.onrender.com/api/posts/${id}`
        );

        dispatch({
            type: DELETE_POST,
            payload: id,
        });
        dispatch(setAlert("Post Removed", "success"));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

export const addLike = (id) => async (dispatch) => {
    try {
        const res = await axios.put(
            `https://devconnect-backend-z69k.onrender.com/api/posts/like/${id}`
        );

        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data },
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

export const removeLike = (id) => async (dispatch) => {
    try {
        const res = await axios.put(
            `https://devconnect-backend-z69k.onrender.com/api/posts/unlike/${id}`
        );

        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data },
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

export const addComment = (postId, formData) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    try {
        const res = await axios.post(
            `https://devconnect-backend-z69k.onrender.com/api/posts/comment/${postId}`,
            formData,
            config
        );

        dispatch({
            type: ADD_COMMENT,
            payload: res.data,
        });
        dispatch(setAlert("Comment Added", "success"));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

export const removeComment = (postId, commentId) => async (dispatch) => {
    try {
        const res = await axios.delete(
            `https://devconnect-backend-z69k.onrender.com/api/posts/comment/${postId}/${commentId}`
        );

        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId,
        });
        dispatch(setAlert("Comment Removed", "success"));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};
