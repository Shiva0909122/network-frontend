// import React from "react";
// import { deleteMember } from "../services/api";

// function MemberList({ members, refresh }) {
//     return (
//         <ul className="list-group">
//             {members.map((m) => (
//                 <li key={m._id} className="list-group-item d-flex justify-content-between">
//                     {m.name} (Upline: {m.parent || "None"})
//                     <button className="btn btn-sm btn-danger" onClick={() => { deleteMember(m._id); refresh(); }}>
//                         Remove
//                     </button>
//                 </li>
//             ))}
//         </ul>
//     );
// }

// export default MemberList;

import React, { useState } from "react";
import { deleteMember } from "../services/api";

function MemberList({ members, refresh }) {
    const [expanded, setExpanded] = useState({}); // Track toggled members

    // Toggle function for expand/collapse
    const toggleMember = (id) => {
        setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    // Recursive function to build hierarchy
    const renderMembers = (parent = "") => {
        return members
            .filter((m) => m.parent === parent)
            .map((m) => (
                <li key={m._id} className="list-group-item">
                    {/* ▶️ Toggle Button */}
                    <span onClick={() => toggleMember(m._id)} style={{ cursor: "pointer", marginRight: "10px" }}>
                        {expanded[m._id] ? "🔽" : "▶️"}
                    </span>
                    👤 {m.name} (Upline: {m.parent ? `📌 ${m.parent}` : "🏆 None"})

                    {/* ❌ Delete Button */}
                    <button className="btn btn-sm btn-danger float-end" onClick={() => { deleteMember(m._id); refresh(); }}>
                        ❌ Remove
                    </button>

                    {/* 🔽 Nested Child Members */}
                    {expanded[m._id] && (
                        <ul className="list-group mt-2 ms-4">
                            {renderMembers(m.name)}
                        </ul>
                    )}
                </li>
            ));
    };

    return <ul className="list-group">{renderMembers()}</ul>;
}

export default MemberList;
