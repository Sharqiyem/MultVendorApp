import firebase from '../config/firebase.config';
import React from 'react';
export default class ChatHelper {
  //Create chat
  static create() {
    const data = {
      uid: firebase.auth().currentUser.uid,
      count: 0,
      createdAt: Date.now(),
      messages: [],
    };
    firebase.firestore().collection('chats').add(data);
  }

  static sendMessage(chatId, data) {
    console.log(data);
    // const data = {
    //   uid: firebase.auth().currentUser.uid,
    //   text,
    //   createdAt: Date.now(),
    // };
    const db = firebase.firestore();
    const ref = db.collection('chats').doc(chatId);

    return ref.update({
      messages: firebase.firestore.FieldValue.arrayUnion(data[0]),
    });
  }

  static useGetMessages = (chatId) => {
    const [data, setData] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    React.useEffect(() => {
      //isCancel to prevent "Can't perform a React state update on an unmounted component"
      let isCancelled = false;

      let unsubscribe;
      try {
        // console.log('useGetDataByCollection useEffect');
        unsubscribe = firebase
          .firestore()
          .collection('chats')
          .doc(chatId)
          .onSnapshot((snapShot) => {
            // console.log('useGetDataByCollection onSnapshot');
            let messages = snapShot.data()?.messages;
            // .orderBy('createdAt', 'asc');

            if (messages) {
              // use inverted in gift chat instead of sort

              // messages = messages?.sort((a, b) => {
              //   a = a.createdAt.toDate();
              //   b = b.createdAt.toDate();
              //   return b - a;
              // });
              const newData = messages.map((message) => ({
                // id: doc._id,
                // ...message,
                _id: message._id,
                createdAt: message.createdAt.toDate(),
                text: message.text,
                user: {
                  _id: message.user._id,
                  name: message.user.name,
                  // avatar: getAvatar(message.data().user),
                },
              }));
              if (!isCancelled) {
                setData(newData);
                setIsLoading(false);
              }
            } else {
              setData([]);
              setIsLoading(false);
            }
          });
      } catch (err) {
        //TODO : try to catch error on use logout
        alert(`useGetDataByCollection chat err` + err);
      }
      return () => {
        console.log(`unsubscribe useGetDataByCollection chat`);
        isCancelled = true;
        if (unsubscribe) {
          unsubscribe();
          console.log(`unsubscribe useGetDataByCollection chat`);
        }
      };
    }, []);

    return [data, isLoading];
  };
}
