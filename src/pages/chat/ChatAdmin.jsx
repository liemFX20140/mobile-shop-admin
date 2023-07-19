import React, { useEffect, useState } from 'react';
import styles from './Chat.module.css';
import io from 'socket.io-client';
import queryString from 'query-string';
import ChatRoomsAPI from '../../API/ChatRoomsAPI';

const socket = io(
  'http://localhost:5000',
  // 'https://mobileshop-server.glitch.me',
  {
    transports: ['websocket'],
    withCredentials: true,
  }
);
function ChatAdmin(props) {
  const [allRoom, setAllRoom] = useState([]);
  const [roomId, setRoomId] = useState('');
  const [message, setMessage] = useState([]);
  const [load, setLoad] = useState(false);
  const [textMessage, setTextMessage] = useState('');
  const onChangeText = (e) => {
    setTextMessage(e.target.value);
  };
  const loadChatRoom = async (event) => {
    setRoomId(event.target.dataset.id);
    const res = await ChatRoomsAPI.getMessageByRoomId(event.target.dataset.id);
    setMessage(res.messages);
  };
  // Hàm này dùng để tìm ra những user khác với admin
  const fetchData = async () => {
    const result = await ChatRoomsAPI.getAllroom();
    setAllRoom(result);
  };
  // load cac chat room lan dau
  useEffect(() => {
    fetchData();
  }, []);
  const reloadChatroom = async () => {
    const result = await ChatRoomsAPI.getMessageByRoomId(roomId);
    setMessage(result.messages);
  };
  // Hàm này dùng để load dữ liệu message và nó sẽ chạy lại khi state id_user2 thay đổi
  // Tức là khi admin chọn người dùng mà admin muốn chat thì state id_user2 sẽ thay đổi
  // để gọi lại hàm này

  // Đây là hàm lấy dữ liệu từ api dựa vào state load
  // Dùng để load lại tin nhắn khi có socket từ server gửi tới
  useEffect(() => {
    if (load) {
      reloadChatroom();
      fetchData();
      setLoad(false);
    }
  }, [load]);

  //Hàm này dùng để nhận socket từ server gửi lên
  useEffect(() => {
    //Nhận dữ liệu từ server gửi lên thông qua socket với key receive_message
    socket.on('receive_message', (data) => {
      //Sau đó nó sẽ setLoad gọi lại hàm useEffect lấy lại dữ liệu
      setLoad(true);
    });
  }, []);

  // Hàm này dùng để gửi tin nhắn cho khách hàng
  const handlerSend = async () => {
    if (!roomId) {
      return;
    }
    if (roomId && textMessage.toLowerCase() === '/end') {
      const query =
        '?' +
        queryString.stringify({
          message: '==END ROOM==',
          roomId: roomId,
          is_admin: false,
        });
      await ChatRoomsAPI.addMessage(query);
      setTextMessage('');
      setRoomId('');
      setMessage([]);
      return;
    }
    const data = {
      message: textMessage,
      roomId: roomId,
      is_admin: true,
    };
    const query = '?' + queryString.stringify(data);
    const postData = async () => {
      const res = await ChatRoomsAPI.addMessage(query);
      setMessage(res.messages);
    };
    postData();
    setTextMessage('');

    setTimeout(() => {
      socket.emit('send_message');
      // setLoad(true);
    }, 200);
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.roomsHead}>Active Rooms</div>
        <div className={styles.rooms}>
          {allRoom.map((room) => (
            <button key={room._id} data-id={room._id} onClick={loadChatRoom}>
              {room._id}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.chatWindow}>
        <h1>Chat window</h1>
        <div className={styles.messages}>
          {message &&
            message.map((value, index) =>
              value.is_admin === 'false' ? (
                <div
                  className={`${styles.media} ${styles.mediaChat}`}
                  key={index}
                >
                  {' '}
                  <div className={styles.mediaBody} key={value.id}>
                    <p>Client: {value.message}</p>
                  </div>
                </div>
              ) : (
                <div
                  className={`${styles.media} ${styles.mediaChat} ${styles.mediaChatReverse}`}
                  key={index}
                >
                  <img
                    className={styles.avatars}
                    src='https://img.icons8.com/color/36/000000/administrator-male.png'
                    alt='...'
                  />
                  <div className={styles.mediaBody}>
                    <p>You: {value.message}</p>
                  </div>
                </div>
              )
            )}
        </div>
        <div className={styles.inputMessage}>
          <input
            type='text'
            placeholder='Enter Message!'
            onChange={onChangeText}
            value={textMessage}
            style={{ width: '80%' }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handlerSend();
              }
            }}
          />
          <button onClick={handlerSend}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default ChatAdmin;
