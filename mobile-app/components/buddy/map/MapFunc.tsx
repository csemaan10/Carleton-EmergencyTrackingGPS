import React, { FC, useEffect, useState } from "react";
import MapView, { Marker, Circle } from "react-native-maps";
import { Linking, Platform, View } from "react-native";
import { Text, Button } from "@rneui/themed";
import styles from "./MapFunc.styles";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../../firebaseConfig";
import { HomeLocationInterface } from "./mapInterfaces";
import { router } from "expo-router";

interface MapRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface MapFuncInterface {
  plwdUsername: string;
}

const MapFunc: FC<MapFuncInterface> = ({ plwdUsername }) => {
  const [mapRegion, setMapRegion] = useState<MapRegion | undefined>(undefined);
  const [homeLocationData, setHomeLocationData] = useState<
    HomeLocationInterface | undefined
  >(undefined);
  const auth = FIREBASE_AUTH;

  useEffect(() => {
    if (plwdUsername) {
      (async () => {
        const col = collection(FIREBASE_DB, "coordinates");
        const val = query(col, where("plwd_username", "==", plwdUsername));

        try {
          const unsubscribe = onSnapshot(val, (snapshot) => {
            const coords = snapshot.docs.map((doc) => doc.data())[0];
            if (coords) {
              // we have some data
              console.log("MapFunc: PLWD coords:", coords);
              const latitude = coords.lastLocation.latitude;
              const longitude = coords.lastLocation.longitude;
              setMapRegion({
                latitude: parseFloat(latitude.toFixed(5)),
                longitude: parseFloat(longitude.toFixed(5)),
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              });
            }
          });
          return () => unsubscribe();
        } catch (error) {
          console.error("Error fetching PLWD data:", error);
        }
      })();
      // get the safe location
      (async () => {
        const col = collection(FIREBASE_DB, "safe-zone");
        const val = query(
          col,
          where("plwdUsername", "==", plwdUsername),
          where("userEmail", "==", auth.currentUser?.email)
        );
        try {
          const unsubscribe = onSnapshot(val, (snapshot) => {
            const data = snapshot.docs.map((doc) => doc.data())[0];
            console.log(
              "Safe zone for ",
              auth.currentUser?.email,
              " and plwd: ",
              plwdUsername
            );
            console.log("data of safe location: ", data);

            if (data) {
              // we have a safe location for the user and plwd
              setHomeLocationData({
                latitude: data.homeLocation.latitude,
                longitude: data.homeLocation.longitude,
                radius: data.radius,
              });
            }
          });
          return () => unsubscribe();
        } catch (err) {
          console.error("Error fetching the safe zone: ", err);
        }
      })();
    }
  }, [plwdUsername]);

  const handleLaunchMaps = (): void => {
    if (!mapRegion) return;

    const address = Platform.select({
      ios: `maps://?q=${mapRegion.latitude},${mapRegion.longitude}`, // For iOS
      android: `geo:${mapRegion.latitude},${mapRegion.longitude}?q=${mapRegion.latitude},${mapRegion.longitude}`, // For Android
    });

    if (address) {
      Linking.canOpenURL(address)
        .then((supported) => {
          if (supported) {
            return Linking.openURL(address);
          } else {
            console.error("Maps not supported on this device");
          }
        })
        .catch((err) => console.error("An error occurred", err));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topLayer}>
        <Text style={styles.locationText}>
          Last Known Location:{" "}
          {mapRegion ? `${mapRegion.latitude}, ${mapRegion.longitude}` : "N/A"}{" "}
        </Text>
        <Button
          buttonStyle={styles.launchMapBtn}
          titleStyle={styles.buttonText}
          onPress={() => router.push(`/buddy/safeZone/${plwdUsername}`)}
        >
          Add Home Location
        </Button>
        <Button
          onPress={handleLaunchMaps}
          disabled={mapRegion ? false : true}
          buttonStyle={styles.launchMapBtn}
          titleStyle={styles.buttonText}
        >
          Launch Maps
        </Button>
      </View>
      <MapView style={styles.map} region={mapRegion}>
        {mapRegion && (
          <>
            <Marker
              coordinate={{
                latitude: mapRegion.latitude,
                longitude: mapRegion.longitude,
              }}
              title="Current PLWD Location"
            />
          </>
        )}
        {homeLocationData && (
          <Circle
            center={{
              latitude: homeLocationData.latitude,
              longitude: homeLocationData.longitude,
            }}
            radius={homeLocationData.radius}
            strokeColor="rgba(0, 128, 255, 0.5)"
            fillColor="rgba(0, 128, 255, 0.2)"
          />
        )}
      </MapView>
    </View>
  );
};

export default MapFunc;
