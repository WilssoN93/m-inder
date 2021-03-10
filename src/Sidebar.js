import React, { useState, useEffect } from "react";
import Group from "./Group";
import "./Sidebar.css";
import db from "./firebase";
function Sidebar() {
  const [groups, setGroups] = useState([]);
  useEffect(() => {
    db.collection("groups").onSnapshot((snapshot) =>
      setGroups(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);

  return (
    <div className="sidebar">
      {groups.map((group) => (
        <Group group={group} key={group.id} isGroup={true} />
      ))}
      <Group isGroup={false} />
    </div>
  );
}
export default Sidebar;
