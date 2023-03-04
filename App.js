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
        console.log(conditionCode > 5);
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

  const image1 = "https://img.freepik.com/free-photo/weather-effects-composition_23-2149853295.jpg?w=1380&t=st=1677953183~exp=1677953783~hmac=363522694a133c9e162598953798f5950cbffcc6dd27f62d416a28ab8f62ffc5";

  const image2 = `https://images.unsplash.com/photo-1532178910-7815d6919875?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80`;

  const image3 = `https://images.unsplash.com/photo-1518467946652-b194dd6dd321?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80`;

  const image4 = `https://wallpapercave.com/wp/wp8973745.jpg`;

  const image5 = `https://images.unsplash.com/photo-1551234250-d88208c2ce14?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTB8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60`;

  const image6 = `https://cdn.pixabay.com/photo/2019/08/19/07/45/corgi-4415649_960_720.jpg`;

  let imageUrl = `https://images.pexels.com/photos/159020/sunset-sky-afterglow-evening-sky-159020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`;
  if (conditionCode > 499 && conditionCode < 532) {
    imageUrl = image1;
  } else if (conditionCode > 800 && conditionCode < 805) {
    imageUrl = image2;
  } else if (conditionCode > 599 && conditionCode < 623) {
    imageUrl = image3;
  } else if (conditionCode === 800) {
    imageUrl = image4;
  } else if (conditionCode > 199 && conditionCode < 233) {
    imageUrl = image5;
  } else if (conditionCode > 299 && conditionCode < 322) {
    imageUrl = image6;
  }
  return (
    <ImageBackground resizeMode="cover" style={{ flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center" }} source={{ uri: imageUrl }}>
      <NativeBaseProvider>
        <Box style={styles.container}>
          {showCondition && <Condition temp={temp} city={city} condition={condition} styles={styles} iconCode={iconCode} />}
          {errMsg && (
            <Text color="red.400" fontSize="2xl">
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
