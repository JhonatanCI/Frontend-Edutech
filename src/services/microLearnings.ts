import { API } from "../config/axios";

export const getMicroLearning = async (name: string) => {
  try {
    const encodedName = encodeURIComponent(name);
    const response = await API.get(`/microlearnings/name/${encodedName}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMicroLearnings = async () => {
  try {
    const response = await API.get(`/microlearnings`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
