import axios from "axios";

const API_URL = "https://network-marketing.onrender.com/api";  // ✅ Correct URL

export const getMembers = async () => {
    try {
        const res = await fetch(`${API_URL}/members`);
        if (!res.ok) throw new Error("API call failed");
        return await res.json();
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
