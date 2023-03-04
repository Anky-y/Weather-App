// import { Button, SafeAreaView, StyleSheet, TextInput } from "react-native";
import React from "react";
// import { useState } from "react";

import { Input, Icon, Button } from "native-base";
import { IconButton, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

function SearchBar({ onSubmit }) {
  const [value, setValue] = React.useState("");

  const handleChange = (text) => setValue(text);

  return (
    <Input
      value={value}
      onChangeText={handleChange}
      onSubmit={() => onSubmit("saofhisa")}
      size="sm"
      placeholder="Search for a city"
      bg="gray.900"
      focusOutlineColor={"gray.500"}
      _focus={{ bg: "gray.400" }}
      width="65%"
      borderRadius="10"
      py="1"
      px="2"
      InputRightElement={
        <Button bg={"gray.700"} startIcon={<Icon as={AntDesign} name="search1" />} onPress={() => onSubmit(value)}>
          Search
        </Button>
      }
    />
  );
}
export default SearchBar;
