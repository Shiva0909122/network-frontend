import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const getMembers = async () => {
    try {
        const res = await axios.get(`${API_URL}/members`);
        return res.data;
    } catch (err) {
        console.error("Error fetching members:", err);
        return [];
    }
};


export const addMember = async (member) => {
    try {
        await axios.post(`${API_URL}/members`, member);
    } catch (err) {
        console.error("Error adding member:", err);
    }
};

export const deleteMember = async (id) => {
    try {
        await axios.delete(`${API_URL}/members/${id}`);
    } catch (err) {
        console.error("Error deleting member:", err);
    }
};
