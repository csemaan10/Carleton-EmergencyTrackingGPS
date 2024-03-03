import { View, TouchableOpacity, FlatList } from "react-native";
import React, { FC, useContext, useEffect, useState } from "react";
import { ListItem, Avatar, CheckBox, Text, Badge } from "@rneui/themed";
import { router } from "expo-router";
import styles from "./BuddyList.styles";
import HomeContext from "../../../contexts/HomeContext";
import { sizes } from "../../../constants";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../../firebaseConfig";
import { collection, where, query, onSnapshot } from "firebase/firestore";

interface PLWDListInterface {
  username: string;
  name: string;
  status: number;
}

const BuddyLists: FC = () => {
  const auth = FIREBASE_AUTH;
  const { deleteMode, setSelectedItems, selectedItems } =
    useContext(HomeContext);
  const [plwdList, setPlwdList] = useState<PLWDListInterface[]>([]);

  const toggleSelect = (itemId: string) => {
    setSelectedItems((prevSelectedItems: any) =>
      prevSelectedItems.includes(itemId)
        ? prevSelectedItems.filter((id: string) => id !== itemId)
        : [...prevSelectedItems, itemId]
    );
  };

  useEffect(() => {
    (async () => {
      if (auth.currentUser) {
        const col = collection(FIREBASE_DB, "PLWD");
        const val = query(
          col,
          where("user_ids", "array-contains", auth.currentUser.email)
        );

        try {
          const unsubscribe = onSnapshot(val, (snapshot) => {
            const plwdsData = snapshot.docs.map((doc) => doc.data());
            console.log("BudddyList: PLWDDATA: ", plwdsData);
            if (plwdsData) {
              const _data: PLWDListInterface[] = [];
              plwdsData.forEach((person) => {
                const status = person["status"];
                const name = person["name"];
                const username = person["username"];
                _data.push({ status, name, username });
              });
              setPlwdList(_data);
            }
          });

          // Clean up the listener when the component unmounts (we leave the page)
          return () => unsubscribe();
        } catch (error) {
          console.error("Error fetching PLWD data:", error);
        }
      }
    })();
  }, [auth.currentUser]);

  return (
    <View style={styles.container}>
      {plwdList.length === 0 ? (
        <Text>No PLWD to show</Text>
      ) : (
        <FlatList
          data={plwdList}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                if (deleteMode) {
                  toggleSelect(item.username);
                } else {
                  router.push(`/buddy/${item.username}`);
                }
              }}
              style={styles.buttonContainer}
            >
              <ListItem containerStyle={styles.button}>
                <Avatar
                  rounded
                  source={{
                    uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                  }}
                />
                <ListItem.Content>
                  <ListItem.Title style={styles.title}>
                    {item.name}
                  </ListItem.Title>
                  <ListItem.Subtitle style={styles.subTitle}>
                    <View
                      style={{
                        flexDirection: "row",
                      }}
                    >
                      <Text>Status:</Text>
                      <View>
                        <Badge
                          value={item.status === 0 ? "Safe" : "Lost"}
                          status={item.status === 0 ? "success" : "error"}
                          badgeStyle={styles.badgeStyle}
                        />
                      </View>
                    </View>
                  </ListItem.Subtitle>
                </ListItem.Content>
                {!deleteMode && (
                  <ListItem.Chevron color="black" size={sizes.large} />
                )}
                {deleteMode && (
                  <CheckBox
                    checked={selectedItems.includes(item.username)}
                    onPress={() => toggleSelect(item.username)}
                    containerStyle={styles.checkBoxContainer}
                  />
                )}
              </ListItem>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.username}
        />
      )}
    </View>
  );
};

export default BuddyLists;
