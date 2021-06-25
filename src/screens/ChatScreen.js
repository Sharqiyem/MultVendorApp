import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { GiftedChat, MessageText } from "react-native-gifted-chat";
import firebase from "../config/firebase.config";

import ChatHelper from "../core/chatHelper";
import Colors from "../constants/Colors";
import { Feather } from "@expo/vector-icons";
import getStyle from "../constants/styles";

const ChatScreen = ({ navigation, route }) => {
  const { orderId: chatId } = route.params;
  console.log("chatId", chatId);
  const [data, isLoading] = ChatHelper.useGetMessages(chatId);

  const [messages, setMessages] = React.useState([]);

  React.useEffect(() => {
    // const msgs = [
    //   {
    //     _id: '1',
    //     text: 'Hello developer',
    //     createdAt: new Date(),
    //     user: {
    //       _id: '2',
    //       name: 'Abdul',
    //       // avatar: 'https://placeimg.com/140/140/any',
    //     },
    //   },
    //   {
    //     _id: '2',
    //     text: 'Hello user',
    //     createdAt: new Date(Date.UTC(2020, 5, 11, 17, 20, 0)),
    //     user: {
    //       _id: '1',
    //       name: 'React',
    //       // avatar: 'https://placeimg.com/140/140/1',
    //     },
    //   },
    //   {
    //     _id: '3',
    //     text: 'This is a system message',
    //     createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
    //     system: true,
    //     // Any additional custom parameters are passed through
    //   },
    // ];
    console.log("useGetMessages data", data);
    setMessages(data);
  }, [data]);

  const user = {
    _id: firebase.auth().currentUser?.uid,
    name: firebase.auth().currentUser?.displayName,
  };
  const send = (newMessages) => {
    newMessages[0].createdAt = new Date();
    // const msgs = [...newMessages, ...messages];
    // setMessages(msgs);
    console.log("newMessages", newMessages);
    ChatHelper.sendMessage(chatId, newMessages);
  };

  return (
    <View
      style={[{ flex: 1, paddingTop: 38, backgroundColor: Colors.primary }]}
    >
      <View style={[{ flexDirection: "row" }]}>
        <Feather
          name="arrow-left"
          size={25}
          style={{ marginHorizontal: 10, alignSelf: "center" }}
          color={Colors.white}
          onPress={() => {
            navigation.pop();
          }}
        />

        <Text
          style={{
            padding: 10,
            flex: 1,
            textAlign: "center",
            fontSize: 16,
            color: Colors.white,
          }}
        >
          Chat {chatId}
        </Text>
      </View>
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        {!isLoading ? (
          <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <GiftedChat
              messages={messages}
              onSend={(messages) => {
                send(messages);
              }}
              user={user}
              inverted={false}
              renderMessageText={({ currentMessage, ...args }) => {
                return (
                  <MessageText
                    currentMessage={currentMessage}
                    customTextStyle={{ fontSize: 14, lineHeight: 40 }} // or more it's depend whats font you use
                    {...args}
                  />
                );
              }}
            />
            {/* <KeyboardAvoidingView
            behavior={Platform.OS === 'android' ? 'padding' : null}
            keyboardVerticalOffset={20}
          /> */}
          </View>
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator
              style={{
                alignSelf: "center",
                width: Layout.window.width,
              }}
              size={"large"}
              color={Colors.primary}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default ChatScreen;
