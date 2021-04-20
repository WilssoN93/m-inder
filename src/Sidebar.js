import React, { useEffect } from "react";
import Group from "./Group";
import "./Sidebar.css";

function Sidebar({ groups, fetchGroups }) {
  useEffect(() => {
    console.log(fetchGroups);
    fetchGroups();
  }, [fetchGroups]);

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
