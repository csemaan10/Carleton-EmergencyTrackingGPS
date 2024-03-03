import { View } from "react-native";
import React, { ReactElement, useContext, useState } from "react";
import { Button, Dialog } from "@rneui/themed";
import HomeContext from "../../../contexts/HomeContext";
import { sizes } from "../../../constants";
import styles from "./Buttons.styles";
import { TextInput } from "react-native-gesture-handler";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../../firebaseConfig";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import Toast from "react-native-toast-message";

const Buttons = () => {
  const { deleteMode, setDeleteMode, setSelectedItems, selectedItems } =
    useContext(HomeContext);
  const [pwdUsername, setPwdUsername] = useState("");
  const [addPwdVisible, setAddPwdVisible] = useState(false);
  const auth = FIREBASE_AUTH;

  const handleCancelDelete = (): void => {
    setDeleteMode(false);
    setSelectedItems([]);
  };

  const deleteSelectedItems = async () => {
    console.log("Selected items: ", selectedItems);
    const col = collection(FIREBASE_DB, "PLWD");

    try {
      await Promise.all(
        selectedItems.map(async (value) => {
          const pwd = query(col, where("username", "==", value));
          const snapshot = await getDocs(pwd);

          if (snapshot.empty) {
            console.warn(`No document found for username: ${value}`);
            return;
          }

          const pwdDoc = snapshot.docs[0];
          const plwdsData = pwdDoc.data();
          const docId = pwdDoc.id;
          const documentRef = doc(FIREBASE_DB, "PLWD", docId);

          const updatedUserIds = plwdsData.user_ids.filter(
            (username: String) => username !== auth.currentUser?.email
          );

          console.log(
            "deleteSelectedItems(), updated userid for username ",
            value,
            "is ",
            updatedUserIds
          );

          await updateDoc(documentRef, {
            user_ids: updatedUserIds,
          });
        })
      ).then(() => {
        Toast.show({ text1: "Successfully Deleted" });
        setDeleteMode(false);
        setSelectedItems([]);
        console.log("Deletion complete for all selected items.");
      });
    } catch (error) {
      console.error("Error in deleting users from PLWD:", error);
    }
  };

  const toggleAddPwdVisibility = () => {
    setAddPwdVisible(!addPwdVisible);
  };

  const submitAddPwdToUser = async () => {
    const col = collection(FIREBASE_DB, "PLWD");
    const pwd = query(col, where("username", "==", pwdUsername));

    if (!pwd) {
      // TODO: have a more graceful error message
      console.warn("Pwd with username of ", pwdUsername, " doesn't exist");
      return;
    }

    try {
      const snapshot = await getDocs(pwd);
      const pwdDoc = snapshot.docs[0];
      const plwdsData = pwdDoc.data();
      const docId = pwdDoc.id;
      console.log("plwds: ", plwdsData);

      if (!plwdsData) {
        // TODO have a more graceful error
        console.error("Something went wrong with collecting the plwd data");
        return;
      }

      const documentRef = doc(FIREBASE_DB, "PLWD", docId);
      const updatedUserIds: string[] = [
        ...plwdsData.user_ids,
        auth.currentUser?.email,
      ];
      console.log("Button.tsx -> updated user ids: ", updatedUserIds);

      await updateDoc(documentRef, {
        user_ids: updatedUserIds,
      })
        .then(() => {
          setAddPwdVisible(false);
          setPwdUsername("");
          Toast.show({ text1: "Successfully Added" });
        })
        .catch(() => {
          console.error(
            "Something went wrong updating doc for pwd user_ids: ",
            plwdsData
          );
        });
    } catch (err) {
      console.error(err);
    }
  };

  const addPwdDialog = (): ReactElement => {
    return (
      <Dialog
        isVisible={addPwdVisible}
        onBackdropPress={toggleAddPwdVisibility}
      >
        <Dialog.Title title="Enter Username" />
        <TextInput
          placeholder="Username"
          value={pwdUsername}
          onChangeText={setPwdUsername}
          autoCapitalize="none"
          style={styles.diaLogTextInput}
          inputMode="text"
        />
        <Button onPress={submitAddPwdToUser}>Add</Button>
      </Dialog>
    );
  };

  return (
    <>
      {addPwdDialog()}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: sizes.medium,
        }}
      >
        <Button
          type="outline"
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
          onPress={toggleAddPwdVisibility}
        >
          Add PWD
        </Button>
        {!deleteMode ? (
          <Button
            type="outline"
            titleStyle={styles.buttonTitle}
            buttonStyle={styles.button}
            onPress={() => setDeleteMode(true)}
          >
            Delete
          </Button>
        ) : (
          <>
            <Button
              type="outline"
              titleStyle={styles.buttonTitle}
              buttonStyle={styles.button}
              onPress={() => deleteSelectedItems()}
            >
              Confirm Delete
            </Button>
            <Button
              type="outline"
              titleStyle={styles.buttonTitle}
              buttonStyle={styles.button}
              onPress={() => handleCancelDelete()}
            >
              Cancel
            </Button>
          </>
        )}
      </View>
    </>
  );
};

export default Buttons;
