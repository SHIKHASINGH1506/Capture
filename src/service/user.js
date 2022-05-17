import axios from "axios";

const getAllUserService = () => axios.get("/api/users");

const updateUserService = (token, userData) => {
  return axios.post(
    "/api/users/edit", 
    userData,
    {
      headers: {
        authorization: token,
      },
    }
  );
};

const followUserService = (token, userId) => {
  return axios.post(
    `/api/users/follow/${userId}`,
    {},
    {
      headers: {
        authorization: token,
      },
    }
  );
};

const unFollowUserService = (token, userId) => {
  return axios.post(
    `/api/users/unfollow/${userId}`,
    {},
    {
      headers: {
        authorization: token,
      },
    }
  );
};

export { getAllUserService, updateUserService, followUserService, unFollowUserService};