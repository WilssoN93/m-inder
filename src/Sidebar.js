import React, { useEffect, useState } from "react";
import db from "./firebase";
import Group from "./Group";
import "./Sidebar.css";
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
        <Group
          className="sidebar__group"
          group={group}
          key={group.id}
          isGroup={true}
        />
      ))}
      <Group isGroup={false} />
    </div>
  );
}
export default Sidebar;
