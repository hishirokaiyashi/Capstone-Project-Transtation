import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import avatar from "../../../assets/images/Message/avatar-default.jpg";
import firestore from "../../../firebase/firestore";
import {
  collection,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  setDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

import { useSelector } from "react-redux";

import TextMessages from "../TextMessages";
import generateID from "../../../utils/generateID";

const SupportWindow = ({ visible, showPopUp }) => {
  const { user } = useSelector((state) => state.user);
  const messageContainerRef = useRef(null);
  const [messages, setMessages] = useState(null);
  const [receiver, setReceiver] = useState(null);
  const [sendingMessage, setSendingMessage] = useState("");

  useEffect(() => {
    // This is the admin of this page
    getGiao();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!receiver) {
      return;
    }
    const messagesRef = collection(
      firestore,
      "conversations",
      generateID(user.uid, receiver.uid),
      "messages"
    );

    const sortedMessages = query(messagesRef, orderBy("created_at", "asc"));
    // Subscribe to changes in the messages collection
    const unsubscribe = onSnapshot(sortedMessages, (querySnapshot) => {
      const messageList = [];
      querySnapshot.forEach(async (item) => {
        const messageData = item.data();
        messageList.push(messageData);
        if (messageData.user_id !== user.uid) {
          const userDoc = await getDoc(
            doc(firestore, "users", messageData.user_id)
          );
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setReceiver(userData);
          } else {
            console.log("Receiver does not exist!");
          }
        }
      });
      setMessages(messageList);
    });
    // Unsubscribe from changes when the component unmounts
    return () => unsubscribe();
  }, [receiver]);

  const handleChangeOnClick = () => {
    showPopUp(!visible);
  };

  const getGiao = async () => {
    const giaoAdmin = await getDoc(
      doc(firestore, "users", "G6vdUe5SP5dpyC7Yifq2QXRayTH3")
    );
    const userData = giaoAdmin.data();

    setReceiver(userData);
  };

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  };

  const handleSendMessage = async () => {
    const messageId = generateID(user.uid, receiver.uid);

    const checkDodRef = await getDoc(
      doc(firestore, "conversations", messageId)
    );

    if (!checkDodRef.exists()) {
      await setDoc(doc(firestore, "conversations", messageId), {
        uid: messageId,
      });
    }

    const messagesRef = collection(
      firestore,
      "conversations",
      messageId,
      "messages"
    );

    const newMessage = {
      message: sendingMessage,
      created_at: serverTimestamp(),
      user_id: user.uid,
    };

    const docRef = await addDoc(messagesRef, newMessage);

    await updateDoc(docRef, { uid: docRef.id });

    setSendingMessage("");

    scrollToBottom();
  };

  return (
    <>
      {
        <div
          className={`
        transition-all duration-700 ease-in-out fixed bg-white overflow-hidden bottom-[80px] right-[40px] w-[420px] h-[500px]
        max-w-[100%-48px] max-h-[100%-48px] border-2 border-[#606770] rounded-md flex flex-col justify-between
        ${visible ? "hidden z-[1]" : "block z-[10]"}`}
        >
          <div className="flex justify-between  border-b-2 items-center border-gray-400 p-[4px] bg-slate-500">
            <div className="flex items-center w-[70%]">
              <img
                src={avatar}
                alt=""
                className="w-[40px] h-[40px] rounded-full object-cover "
              />
              <p className="text-[1rem] flex-1 text-white ml-[10px]">
                Supporter of Vietnam Road Trip
              </p>
            </div>
            <div
              onClick={handleChangeOnClick}
              className="transition-all duration-300 ease-in-out flex items-center  justify-center cursor-pointer hover:rounded-full text-slate-300 hover:bg-slate-300 hover:text-slate-500"
            >
              <Icon
                icon="material-symbols:close"
                // width="20"
                // height="20"
                className="text-lg w-[30px] h-[30px]"
              />
            </div>
          </div>
          <div
            ref={messageContainerRef}
            className="flex-1 p-3 overflow-y-scroll"
          >
            {Array.isArray(messages) &&
              messages?.map((message, index) => {
                return user.uid === message.user_id ? (
                  <TextMessages
                    key={index}
                    userInfo={user}
                    type="sender"
                    message={message}
                  />
                ) : (
                  <TextMessages
                    key={index}
                    userInfo={receiver}
                    type="receiver"
                    message={message}
                  />
                );
              })}
          </div>
          <div className="flex items-center p-2 bg-slate-500">
            <input
              onChange={(e) => setSendingMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendMessage();
              }}
              type="text"
              className=" h-[30px] p-2 flex-1 bg-slate-200 rounded"
              value={sendingMessage}
              placeholder="..."
            />
            <div
              onClick={handleSendMessage}
              className="ml-[5px] cursor-pointer p-2 text-white hover:rounded-full hover:bg-slate-300 hover:text-slate-500"
            >
              <Icon icon="ph:paper-plane-tilt-bold" className="" />
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default SupportWindow;
