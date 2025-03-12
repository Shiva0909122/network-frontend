import React, { useState, useEffect } from "react";
import { getMembers } from "./services/api";
import MemberForm from "./components/MemberForm";
import MemberList from "./components/MemberList";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    const [members, setMembers] = useState([]);

    const fetchMembers = async () => {
        const data = await getMembers();
        setMembers(data);
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="text-center">Network Marketing Hierarchy</h2>
            <MemberForm members={members} refresh={fetchMembers} />
            <h3>Member Hierarchy</h3>
            <MemberList members={members} refresh={fetchMembers} />
        </div>
    );
}

export default App;
