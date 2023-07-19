import axiosClient from './axiosClient';

const ChatRoomsAPI = {
  getMessageByRoomId: (roomId) => {
    const url = `chatrooms/room/${roomId}`;
    return axiosClient.get(url);
  },

  createNewRoom: () => {
    const url = `/chatrooms/createNewRoom`;
    return axiosClient.post(url);
  },

  addMessage: (query) => {
    const url = `/chatrooms/addMessage/${query}`;
    return axiosClient.put(url);
  },
  getAllroom: () => {
    const url = `/chatrooms/allroom`;
    return axiosClient.get(url);
  },
};

export default ChatRoomsAPI;
