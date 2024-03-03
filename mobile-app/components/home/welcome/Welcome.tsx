import React, { FC, useContext } from "react";
import { View } from "react-native";
import { SearchBar } from "@rneui/themed";

import styles from "./Welcome.styles";

interface WelcomeFCProps {
  handleSearchChange: (search: string) => void;
  searchInput: string;
}

const Welcome: FC<WelcomeFCProps> = ({ handleSearchChange, searchInput }) => {
  return (
    <View>
      <SearchBar
        placeholder="Type a Buddy's Name"
        onChangeText={(text: string): void => handleSearchChange(text)}
        value={searchInput}
        round
        inputContainerStyle={styles.searchContainer}
        containerStyle={styles.searchBar}
        inputStyle={styles.searchInput}
        searchIcon={styles.searchIcon}
      />
    </View>
  );
};

export default Welcome;
