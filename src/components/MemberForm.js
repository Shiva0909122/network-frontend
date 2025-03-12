// import React, { useState } from "react";
// import { addMember } from "../services/api";

// function MemberForm({ members, refresh }) {
//     const [name, setName] = useState("");
//     const [parent, setParent] = useState("");

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!name) return;
//         await addMember({ name, parent });
//         setName("");
//         setParent("");
//         refresh();
//     };

//     return (
//         <form onSubmit={handleSubmit} className="mb-4">
//             <div className="mb-3">
//                 <label className="form-label">Member Name</label>
//                 <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
//             </div>
//             <div className="mb-3">
//                 <label className="form-label">UpLine Member</label>
//                 <select className="form-control" value={parent} onChange={(e) => setParent(e.target.value)}>
//                     <option value="">None (Top Level)</option>
//                     {members.map((m) => (
//                         <option key={m._id} value={m.name}>{m.name}</option>
//                     ))}
//                 </select>
//             </div>
//             <button type="submit" className="btn btn-primary">DownLine Member</button>
//         </form>
//     );
// }

// export default MemberForm;

import React, { useState } from "react";
import { addMember } from "../services/api";

function MemberForm({ members, refresh }) {
    const [name, setName] = useState("");
    const [parent, setParent] = useState("");
    const [showForm, setShowForm] = useState(true); // Toggle Form Visibility

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name) return;
        await addMember({ name, parent });
        setName("");
        setParent("");
        refresh();
    };

    return (
        <div className="card p-3 shadow">
            {/* 🔘 Toggle Button */}
            <button className="btn btn-warning mb-3" onClick={() => setShowForm(!showForm)}>
                {showForm ? "➖ Hide Form" : "➕ Add New Member"}
            </button>

            {showForm && (
                <form onSubmit={handleSubmit} className="mb-4">
                    {/* 🏷️ Member Name */}
                    <div className="mb-3">
                        <label className="form-label">📝 Member Name</label>
                        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>

                    {/* 🔝 Upline Member Selection */}
                    <div className="mb-3">
                        <label className="form-label">📌 Upline Member</label>
                        <select className="form-control" value={parent} onChange={(e) => setParent(e.target.value)}>
                            <option value="">🏆 None (Top Level)</option>
                            {members.map((m) => (
                                <option key={m._id} value={m.name}>👤 {m.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* 🎯 Submit Button */}
                    <button type="submit" className="btn btn-success">🚀 Add Downline</button>
                </form>
            )}
        </div>
    );
}

export default MemberForm;
