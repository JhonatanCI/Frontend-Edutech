
import { API } from "../config/axios";

export interface UserInfo {
  id: string;
  username: string;
  email: string;
}

export const getUserInfo = async (): Promise<UserInfo> => {
  try {
    const response = await API.get('/user/me');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const userService = {
  getUserInfo
};