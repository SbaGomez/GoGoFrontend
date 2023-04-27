import React from "react";
import { Surface, Stack } from "@react-native-material/core";

function Registro(){
  return(
  <Stack fill center spacing={4}>
     <Surface
      elevation={4}
      category="medium"
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: 600,
        height: 600,
      }}
    >
    </Surface>
  </Stack>
  );
}

export default Registro;
