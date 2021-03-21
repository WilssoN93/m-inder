export const hostIp = "78.108.61.63";
const host = `http://${hostIp}:8080`;

const createGroupUrl = "/group"; //POST Group Request
const getGroupsByUserIdUrl = "/group/user/"; //GET userId
const getGroupByGroupIdUrl = "/group/"; //GET groupID
const addUserToGroupUrl = "/group/user"; //POST AddUserRequest
const getUsersByGroupIdUrl = "/group/users/"; //GET userid
const matchMovieWithMovieAndGroupUrl = "/group/match/"; //GET groupId/movieId
const matchMoviesWithGroupUrl = "/group/match"; //GET groupId;
const getUserByIdUrl = "/user/"; //GET userid
const addNewMovieToUserWithUserIDUrl = "/user/"; //POST userId Movie

/*
Movie = {
    string id,
    string name,
    string overview,
    string posterPath
}
*/

/*
Group Request = {
    string groupName,
   [] users,
   [] matchedMovies
}
*/

/*
AddUserRequest = {
    string groupId
    user {
        string id,
        string name,
        string photoUrl,
        [] watchList
    }
}
*/

export const fetchUsersByGroupId = async (groupId) => {
  return await fetch(`${getUsersByGroupIdUrl}${groupId}`, {
    method: "GET",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const createGroup = async (group) => {
  const url = `${host}${createGroupUrl}`;
  const myInit = {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(group),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  };

  const myRequest = new Request(url, myInit);

  return await fetch(myRequest).then((res) => console.log(res));
};

export const fetchGroupsByUserId = async (userId) => {
  return await fetch(`${host}${getGroupsByUserIdUrl}${userId}`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const fetchGroupById = async (groupId) => {
  return await fetch(`${host}${getGroupByGroupIdUrl}${groupId}`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const addNewUserToGroup = async (group) => {
  await fetch(`${host}${addUserToGroupUrl}`, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(group),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const addNewMovieToUser = async (userid, movie) => {
  return await fetch(`${host}${addNewMovieToUserWithUserIDUrl}${userid}`, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(movie),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const matchMovieWithIds = async (userId, movieId) => {
  return await fetch(
    `${host}${matchMovieWithMovieAndGroupUrl}${userId}/${movieId}`,
    {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
