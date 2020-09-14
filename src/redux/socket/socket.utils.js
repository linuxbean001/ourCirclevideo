export const mainIntervalUpdate = (packetData, eventData, reduxPacketCount) => {
  const {data, packetCount} = packetData
  let newReduxPacketCount;
  let missedPacket = true;

  if (reduxPacketCount === -1 || reduxPacketCount === packetCount){
    missedPacket = false;
  }
  if (packetCount < 10){
    newReduxPacketCount = packetCount + 1;
  }
  else{
    newReduxPacketCount = 0;
  }

  let pullDataFromServer = missedPacket;

  let users = [...eventData.users];
  let messagesTemp = [...eventData.messages];
  let { 
    hostTable, 
    isVisible, 
    hasAudio 
  } = eventData;
  let myId = eventData.id;
  let myPosition = eventData.position;
  let tableMessagesObj = {...eventData.tableMessages}

  if (data.newUsers){
    let newUsers = [...data.newUsers];
    newUsers.forEach(newUser => {
      let {
        connectionId, 
        tableConnectionId, 
        username, 
        socketId, 
        isVisible,
        hasAudio,
        zoomed,
        profilePicture,
        profilePictureKey,
        id,
        host
      } = newUser;

      let position = convertDBPosition(newUser.position);
      if (myId === id && host){
        myPosition = position;
      }
      else{
        let found = false;
        users.forEach((user) => {
          if (user.id === id){
            user.username = username;
            user.socketId = socketId;
            user.position = position;
            user.tableConnectionId = tableConnectionId;
            user.isVisible = isVisible;
            user.hasAudio = hasAudio;
            user.profilePicture = profilePicture;
            user.profilePictureKey = profilePictureKey;
            user.zoomed = zoomed;
            user.connectionId = connectionId;
            user.host = host;
            found = true;
          }
        })
        if (!found){
          newUser.position = position;
          users.push(newUser);
        }
      }
    })
  }
  if (data.positionChanges){
    let positionChanges = [...data.positionChanges];
    positionChanges.forEach(positionChange => {
      let position = convertDBPosition(positionChange.dbposition);
      if (positionChange.id === myId){
        myPosition = position;
      }
      else{
        let found = false;
        let duplicatePosition = false;
        users.forEach((user) => {
          if ((position.seat !== -1) && (user.position.table === position.table && user.position.seat === position.seat)){
            duplicatePosition = true;
            console.log("extra user in Browser");
            console.log('position conflict between:');
            console.log("connection ID", user.id);
            console.log("Position: ", user.position);
            console.log('AND');
            console.log("connection ID", positionChange.id);
            console.log("Position: ", position);
          }
          if (!duplicatePosition && (user.id === positionChange.id)){
            found = true;
            user.position = position;
          }
        })
        if (!found || duplicatePosition) {
          if (!found){
            console.log("extra user in DB", positionChange.id);
          }
            pullDataFromServer = true;
        }
      }
    })
  }
  if (data.removeUsers){
    let removeUsers = [...data.removeUsers];
    removeUsers.forEach(removeUser => {
      if (myId !== removeUser){
        users = users.filter(user => user.id !== removeUser);
      }
    })
  }
  if (data.hostTable){
    hostTable = data.hostTable;
  }
  if (data.eventMessages){
    let eventMessages = [...data.eventMessages];
    eventMessages.forEach(eventMessage => {
      let {newMessage} = eventMessage;
      if (eventMessage.id === myId){
        newMessage.me = true;
      }
      else{
        newMessage.me = false;
      }
      let date = new Date();
      let time = date.getHours() + ':' + ('0'+date.getMinutes()).slice(-2);
      let count = 1;
      if (messagesTemp.length !== 0){
        count = messagesTemp[messagesTemp.length - 1].count + 1;
      }
      newMessage.time = time;
      newMessage.count = count;
      messagesTemp.push(newMessage);
      if (messagesTemp.length > 100){
        messagesTemp.shift();
      }
    })
  }
  if (data.tableMessages){
    let incomingTableMessages = [...data.tableMessages];
    incomingTableMessages.forEach(incomingTableMessage => {
      let table = incomingTableMessage.table;
      if (!tableMessagesObj[table]){
        tableMessagesObj[table] = [];
      }
      let tableMessages = tableMessagesObj[table];
      let {newMessage} = incomingTableMessage;
      if (incomingTableMessage.id === myId){
        newMessage.me = true;
      }
      else{
        newMessage.me = false;
      }
      let date = new Date();
      let time = date.getHours() + ':' + ('0'+date.getMinutes()).slice(-2);
      let count = 1;
      if (tableMessages.length !== 0){
        count = tableMessages[tableMessages.length - 1].count + 1;
      }
      newMessage.time = time;
      newMessage.count = count;
      tableMessages.push(newMessage);
      if (tableMessages.length > 50){
        tableMessages.shift();
      }
      tableMessagesObj[table] = tableMessages;
    })
  }
  if (data.newTableUsers){
    let newTableUsers = [...data.newTableUsers];
    newTableUsers.forEach(newTableUser => {
      let {id, tableConnectionId} = newTableUser;
      if (myId !== id){
        users.forEach((user) => {
          if (user.id === id){
            user.tableConnectionId = tableConnectionId;
            user.zoomed = true;
          }
        })
      }
    })
  }
  if (data.usersLeavingTable){
    let usersLeavingTable = [...data.usersLeavingTable];
    usersLeavingTable.forEach(userLeavingTable => {
      if (myId !== userLeavingTable){
        users.forEach(user => {
          if (user.id === userLeavingTable){
            user.tableConnectionId = '';
            user.zoomed = false;
            if (user.position.seat !== -2){
              user.isVisible = false;
              user.hasAudio = false;
            }
          }
        })
      }
    })
  }
  if (data.usersVideoAndAudio){
    let usersVideoAndAudio = [...data.usersVideoAndAudio];
    usersVideoAndAudio.forEach(userVideoAndAudio => {
      if (userVideoAndAudio.id === myId){
        isVisible = userVideoAndAudio.isVisible;
        hasAudio = userVideoAndAudio.hasAudio;
      }
      else{
        users.forEach(user => {
          if (user.id === userVideoAndAudio.id){
            user.isVisible = userVideoAndAudio.isVisible;
            user.hasAudio = userVideoAndAudio.hasAudio;
          }
        })
      }
    })
  }

  let newStateData = {
    users,
    position: myPosition,
    hostTable,
    messages: messagesTemp,
    tableMessages: tableMessagesObj,
    isVisible,
    hasAudio
  }

  return({
    newStateData,
    newReduxPacketCount,
    pullDataFromServer
  })
}

export const processServerDataRequest = (serverData, eventData) => {
  let users = [...eventData.users];
  let id = eventData.id;

  let newUsers = processExistingUsers(serverData.users, users, id);
  
  return {
    hostTable: serverData.hostTable,
    users: newUsers
  }
}

export const socketDisconnect = (session, tableSession) => {
  if (session) {
    session.disconnect();
  }
  if (tableSession) {
    tableSession.disconnect();
  }
}

const convertDBPosition = (dbPosition) => {
  let position = {};
  if (dbPosition === -1) {
    position = {
      table: -1,
      seat: -1
    };
  }
  else if (dbPosition > 0){
    let table = Math.ceil(dbPosition/8);
    let seat = dbPosition - (table-1)*8;
    position = {
      table,
      seat
    }
  }
  else if (dbPosition === -2){
    position = {
      table: -2,
      seat: -2
    }
  }
  return position;
}


const processExistingUsers = (serverUsers, users, id) => {


  let extraUsersId = [];

  users.forEach((user) => {
    let found = false;
    serverUsers.forEach((serverUser) => {
      if (user.id === serverUser.id){
        found = true; 
      }
    })
    if (!found){
      extraUsersId.push(user.id);
      console.log("DATA: extra user in browser");
    }
  })
  extraUsersId.forEach((extraUserId) => {
    users = users.filter(user => user.id !== extraUserId)
  })
  
  // second section of code refreshes the users in browser
  // with users from database. if the users are already
  // in browser, then update properties. If not in browser,
  // then add new user to browser.
  serverUsers.forEach((serverUser) => {
    if (serverUser.id !== id){

      let position = convertDBPosition(serverUser.position);

      let found = false;
      users.forEach((user) => {
        if (user.id === serverUser.id){
          found = true;
          user.position = position;
          user.username = serverUser.username;
          user.socketId = serverUser.socketId;
          user.tableConnectionId = serverUser.tableConnectionId;
          user.connectionId = serverUser.connectionId
          user.isVisible = serverUser.isVisible;
          user.profilePicture = serverUser.profilePicture;
          user.profilePictureKey = serverUser.profilePictureKey;
          user.zoomed = serverUser.zoomed;
          user.host = serverUser.host;
        }
      })
      if (!found){
        users.push({
          connectionId: serverUser.connectionId,
          position: position,
          username: serverUser.username,
          socketId: serverUser.socketId,
          tableConnectionId: serverUser.tableConnectionId,
          isVisible: serverUser.isVisible,
          profilePicture: serverUser.profilePicture,
          profilePictureKey: serverUser.profilePictureKey,
          zoomed: serverUser.zoomed,
          host: serverUser.host,
          id: serverUser.id
        })
      }
    }
  })
  return users;
}