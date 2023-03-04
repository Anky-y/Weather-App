import React from "react";
import { ImageBackground, StyleSheet } from "react-native";
import SearchBar from "./components/SearchBar";
import { NativeBaseProvider, Box, Text } from "native-base";
import { useState } from "react";
import axios from "axios";
import Condition from "./components/Condition";

export default function App() {
  const [city, setCity] = useState("");
  const [condition, setCondition] = useState("");
  const [temp, setTemp] = useState("");
  const [errMsg, setErrMsg] = useState(false);
  const [showCondition, setShowCondition] = useState(true);
  const [iconCode, setIconCode] = useState("");
  const [conditionCode, setConditonCode] = useState(0);
  const handleSubmit = async (name) => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=9e8f7e80c9d0750911b25e22b5c89b5a&units=metric`)
      .then((response) => {
        // handle success
        const data = response.data;
        setConditonCode(data.weather[0].id);
        console.log(conditionCode);
        setErrMsg(false);
        setShowCondition(true);
        setCity(name);
        setCondition(`${data.weather[0].description}`);
        setTemp(`${Math.round(data.main.temp)}°C`);
        setIconCode(data.weather[0].icon);
      })
      .catch(() => {
        // handle error
        setErrMsg(true);
        setShowCondition(false);
      });
  };

  const image1 = require(`./images/rain.jpg`);

  const image2 = require(`./images/cloudy.jpg`);

  const image3 = require(`./images/snow.jpg`);

  const image4 = require(`./images/clear.jpg`);

  const image5 = require(`./images/thunder.jpg`);

  const image6 = require(`./images/drizzle.jpg`);

  const image7 = require(`./images/haze.jpg`);

  let image = require(`./images/default.jpg`);
  if (conditionCode > 499 && conditionCode < 532) {
    image = image1;
  } else if (conditionCode > 800 && conditionCode < 805) {
    image = image2;
  } else if (conditionCode > 599 && conditionCode < 623) {
    image = image3;
  } else if (conditionCode === 800) {
    image = image4;
  } else if (conditionCode > 199 && conditionCode < 233) {
    image = image5;
  } else if (conditionCode > 299 && conditionCode < 322) {
    image = image6;
  } else if (conditionCode === 721 || conditionCode === 741 || conditionCode === 711) {
    image = image7;
  }
  return (
    <ImageBackground resizeMode="cover" style={{ flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center" }} source={image}>
      <NativeBaseProvider>
        <Box style={styles.container}>
          {showCondition && <Condition temp={temp} city={city} condition={condition} styles={styles} iconCode={iconCode} />}
          {errMsg && (
            <Text color="red.400" fontSize="3xl" bold>
              City couldn't be found!
            </Text>
          )}
          <SearchBar onSubmit={handleSubmit} />
        </Box>
      </NativeBaseProvider>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
