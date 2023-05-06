const generateID = (receiverId, userId) =>
  receiverId > userId ? receiverId + userId : userId + receiverId;

export default generateID;
