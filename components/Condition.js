import React from "react";
import { View, Text, Image } from "native-base";
const Condition = ({ city, condition, temp, iconCode }) => {
  return (
    <View style={{ alignItems: "center" }}>
      <Text fontSize="5xl" bold>
        {city}
      </Text>
      <Text fontSize="xl" pb="3">
        {condition}
        <Image source={{ uri: `http://openweathermap.org/img/wn/${iconCode}@2x.png` }} alt={condition} style={{ width: 50, height: 50 }}></Image>
      </Text>
      <Text fontSize="xl" pb="3">
        {temp}
      </Text>
    </View>
  );
};

export default Condition;
