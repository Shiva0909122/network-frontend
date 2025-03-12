
import React, { useState, useEffect } from "react";
import { deleteMember, getMembers } from "../services/api";

function MemberList() {
    const [members, setMembers] = useState([]);  // Stores members from API
    const [expanded, setExpanded] = useState({}); // Stores expanded members

    // ✅ Fetch members when the component mounts
    useEffect(() => {
        fetchMembers();
    }, []);

    // ✅ Function to fetch members
    const fetchMembers = async () => {
        const data = await getMembers();
        console.log("Fetched Members:", data); // Debugging
        setMembers(data);
    };

    // ✅ Toggle function for expand/collapse
    const toggleMember = (id) => {
        setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    // ✅ Recursive function to build hierarchy
    const renderMembers = (parentId = null) => {
        return members
            .filter((m) => m.parent === parentId)
            .map((m) => (
                <li key={m._id} className="list-group-item">
                    {/* ▶️ Toggle Button */}
                    <span onClick={() => toggleMember(m._id)} style={{ cursor: "pointer", marginRight: "10px" }}>
                        {expanded[m._id] ? "🔽" : "▶️"}
                    </span>
                    👤 {m.name} (Upline: {m.parent ? `📌 ${m.parent}` : "🏆 None"})

                    {/* ❌ Delete Button */}
                    <button
                        className="btn btn-sm btn-danger float-end"
                        onClick={async () => {
                            await deleteMember(m._id);
                            fetchMembers(); // Refresh list after delete
                        }}
                    >
                        ❌ Remove
                    </button>

                    {/* 🔽 Nested Child Members */}
                    {expanded[m._id] && (
                        <ul className="list-group mt-2 ms-4">
                            {renderMembers(m._id)}
                        </ul>
                    )}
                </li>
            ));
    };

    return (
        <div>
            <h3 className="mb-3">Member List</h3>
            {members.length === 0 ? <p>No members found.</p> : <ul className="list-group">{renderMembers()}</ul>}
        </div>
    );
}

export default MemberList;
