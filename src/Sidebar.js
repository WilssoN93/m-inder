import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Group from "./Group";
import { fetchGroupsByUserId } from "./requests";
import "./Sidebar.css";

function Sidebar() {
  const [groups, setGroups] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    fetchGroupsByUserId(user.uid)
      .then((res) => setGroups(res))
      .catch((err) => console.log(err.message));
  }, [user.uid]);

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
