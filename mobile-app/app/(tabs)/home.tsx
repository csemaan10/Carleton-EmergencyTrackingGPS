import { View } from "react-native";
import React, { FC, useState } from "react";
import Welcome from "../../components/home/welcome/Welcome";
import globalStyles from "../../globals/globals.styles";
import BuddyLists from "../../components/home/buddiesList/BuddyLists";
import HomeContext from "../../contexts/HomeContext";
import Buttons from "../../components/home/buttons/Buttons";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { router } from "expo-router";

const Home: FC = () => {
  const [searchInput, setSearchInput] = useState("");
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const auth = FIREBASE_AUTH;

  if (!auth.currentUser) {
    router.replace("/login");
  }

  const handleSearchChange = (search: string): void => {
    setSearchInput(search);
  };

  return (
    <HomeContext.Provider
      value={{ deleteMode, setDeleteMode, selectedItems, setSelectedItems }}
    >
      <View style={globalStyles.container}>
        <Welcome
          handleSearchChange={handleSearchChange}
          searchInput={searchInput}
        />
        <Buttons />
        <BuddyLists />
      </View>
    </HomeContext.Provider>
  );
};

export default Home;
