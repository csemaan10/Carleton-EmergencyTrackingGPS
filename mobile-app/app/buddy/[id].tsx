import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import HeaderComponent from "../../components/common/Header";
import Intro from "../../components/buddy/intro/Intro";
import MapFunc from "../../components/buddy/map/MapFunc";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../firebaseConfig";

interface DataStructure {
  username: string;
  name: string;
  status: string;
}

const BuddyDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [data, setData] = useState<DataStructure | undefined>(undefined);
  const auth = FIREBASE_AUTH;

  useEffect(() => {
    (async () => {
      if (auth.currentUser && id) {
        // on load, retreive plwd data IF any
        const col = collection(FIREBASE_DB, "PLWD");
        const val = query(col, where("username", "==", id));

        try {
          const unsubscribe = onSnapshot(val, (snapshot) => {
            const plwdsData = snapshot.docs.map((doc) => doc.data())[0];

            if (plwdsData) {
              // we have some data
              console.log("PLWD data:", plwdsData);
              const _data: DataStructure = {} as DataStructure;
              _data.name = plwdsData["name"];
              _data.username = plwdsData["username"];
              _data.status = plwdsData["status"] == 0 ? "Safe" : "Lost";
              setData(_data);
            }
          });

          return () => unsubscribe();

          // Do something with the data, for example, log it
        } catch (error) {
          console.error("Error fetching PLWD data:", error);
        }
      }
    })();
  }, [id, auth.currentUser]);

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerTitle: "",
          header: () => <HeaderComponent goBack={true} />,
        }}
      />
      {!data ? (
        <Text>Something went wrong with #{id}</Text>
      ) : (
        <>
          <Intro name={data.name} status={data.status} />
          <MapFunc plwdUsername={data.username} />
        </>
      )}
    </View>
  );
};

export default BuddyDetails;
