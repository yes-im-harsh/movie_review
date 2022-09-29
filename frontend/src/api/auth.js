import client from "./client";

const createUser = async (userInfo) => {
  try {
    const { data } = await client.post("/user/create", userInfo);
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

export default createUser;
