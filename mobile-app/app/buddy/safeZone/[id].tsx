import { Stack, useLocalSearchParams } from "expo-router";
import { View, StyleSheet } from "react-native";
import { ReactElement, useEffect, useState } from "react";
import {
  LocationObject,
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import MapView, { Circle, LatLng, Marker } from "react-native-maps";
import HeaderComponent from "../../../components/common/Header";
import { Button, Text, Dialog } from "@rneui/themed";
import { sizes } from "../../../constants";
import Toast from "react-native-toast-message";
import {
  GeoPoint,
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../../firebaseConfig";
import { TextInput } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    margin: sizes.xSmall,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  btn: {
    borderColor: "black",
    backgroundColor: "black",
    marginBottom: sizes.small,
  },
  buttonText: {
    color: "white",
  },
  radiusSetContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  diaLogTextInput: {
    borderWidth: 2,
    padding: 5,
    fontSize: 20,
    fontWeight: "300",
    marginBottom: 10,
  },
});

const SetSafeZone = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [selectedCoordinates, setSelectedCoordinates] = useState<LatLng | null>(
    null
  );
  const [currentRadius, setCurrentRadius] = useState<number | null>(0);
  const auth = FIREBASE_AUTH;
  const [radiusInput, setRadiusInput] = useState("");
  const [radiusDialogVisiblity, setRadiusDialogVisiblity] = useState(false);

  useEffect(() => {
    // request access to use device location to set the safe zone
    (async () => {
      let { status } = await requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      const location = await getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    // get the current safe zone data
    (async () => {
      const col = collection(FIREBASE_DB, "safe-zone");
      const datas = query(
        col,
        where("plwdUsername", "==", id),
        where("userEmail", "==", auth.currentUser?.email)
      );
      try {
        const unsubscribe = onSnapshot(datas, (snapshot) => {
          const data = snapshot.docs.map((doc) => doc.data())[0];
          console.log(
            "Safe zone for ",
            auth.currentUser?.email,
            " and plwd: ",
            id
          );
          if (data) {
            setSelectedCoordinates({
              latitude: data.homeLocation.latitude,
              longitude: data.homeLocation.longitude,
            });
            setCurrentRadius(data.radius);
          }
          return () => unsubscribe();
        });
      } catch (err) {
        console.error(err);
      }
    })();
  }, [location]);

  const toggleRadiusDialogVisibility = () => {
    setRadiusDialogVisiblity(!radiusDialogVisiblity);
  };

  const saveRadiusSetting = () => {
    const r = Number(radiusInput);
    if (!Number.isNaN(r)) {
      setCurrentRadius(r * 1000);
      setRadiusInput("");
      toggleRadiusDialogVisibility();
      Toast.show({ text1: "Radius Set" });
      return;
    }
    Toast.show({ type: "info", text1: "Radius must be a number" });
  };

  const setRadiusDialog = (): ReactElement => {
    return (
      <Dialog
        isVisible={radiusDialogVisiblity}
        onBackdropPress={toggleRadiusDialogVisibility}
      >
        <Dialog.Title title="Enter Radius Number (km)" />
        <TextInput
          placeholder="Radius"
          value={radiusInput}
          onChangeText={setRadiusInput}
          autoCapitalize="none"
          style={styles.diaLogTextInput}
          inputMode="text"
        />
        <Button onPress={saveRadiusSetting}>Add</Button>
      </Dialog>
    );
  };

  const handleMapPress = (event: any): void => {
    const { coordinate } = event.nativeEvent;
    console.log("Map press coordinates: ", coordinate);
    setSelectedCoordinates(coordinate);
  };

  const useCurrentLocation = (): void => {
    setSelectedCoordinates({
      latitude: location?.coords.latitude as number,
      longitude: location?.coords.longitude as number,
    });
  };

  const saveSafeZoneSetting = async (): Promise<void> => {
    if (!(currentRadius && selectedCoordinates)) {
      Toast.show({
        type: "info",
        text1: "Radius or coordinates need to be set!",
      });
      return;
    }

    const safeZoneCollection = collection(FIREBASE_DB, "safe-zone");

    // Check if the document already exists
    const querySnapshot = await getDocs(
      query(
        safeZoneCollection,
        where("plwdUsername", "==", id),
        where("userEmail", "==", auth.currentUser?.email)
      )
    );

    try {
      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        await updateDoc(docRef, {
          homeLocation: new GeoPoint(
            selectedCoordinates.latitude,
            selectedCoordinates.longitude
          ),
          radius: currentRadius,
        });
      } else {
        // Create new document
        await addDoc(safeZoneCollection, {
          plwdUsername: id,
          userEmail: auth.currentUser?.email,
          homeLocation: new GeoPoint(
            selectedCoordinates.latitude,
            selectedCoordinates.longitude
          ),
          radius: currentRadius,
        });
      }

      Toast.show({ text1: "Safe Zone Setting Saved" });
    } catch (error) {
      console.error("Error saving safe zone setting:", error);
      Toast.show({ type: "error", text1: "Error saving Safe Zone Setting" });
    }
  };

  return (
    <>
      {setRadiusDialog()}
      <View style={styles.container}>
        <Stack.Screen
          options={{
            headerTitle: "",
            header: () => <HeaderComponent goBack={true} />,
          }}
        />
        <View style={styles.topContainer}>
          <Text h4>Safe Zone: {id}</Text>
          <Text>Click on the map to select a safe location</Text>
          <View style={styles.radiusSetContainer}>
            <Text style={{ fontSize: sizes.medium, marginRight: sizes.medium }}>
              Radius: {currentRadius ? currentRadius / 1000 : 0}km
            </Text>
            <Button
              buttonStyle={styles.btn}
              titleStyle={styles.buttonText}
              onPress={() => toggleRadiusDialogVisibility()}
            >
              Set Radius
            </Button>
          </View>
          <Button
            buttonStyle={styles.btn}
            titleStyle={styles.buttonText}
            disabled={location?.coords ? false : true}
            onPress={() => useCurrentLocation()}
          >
            Use Current Location
          </Button>
          <Button onPress={() => saveSafeZoneSetting()}>Save</Button>
        </View>
        {location ? (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onPress={handleMapPress}
          >
            {selectedCoordinates && (
              <Marker
                coordinate={selectedCoordinates}
                title="Selected Safe Zone"
              />
            )}
            {currentRadius && selectedCoordinates ? (
              <Circle
                center={{
                  latitude: selectedCoordinates.latitude,
                  longitude: selectedCoordinates.longitude,
                }}
                radius={currentRadius}
                strokeColor="rgba(0, 128, 255, 0.5)"
                fillColor="rgba(0, 128, 255, 0.2)"
              />
            ) : null}
          </MapView>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
      <Toast position="top" topOffset={0} />
    </>
  );
};

export default SetSafeZone;
