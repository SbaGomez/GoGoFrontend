import React, { useState } from "react";
import {
  AppBar,
  IconButton,
  Button,
  Avatar,
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const GoGo2 = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <AppBar
      title="GoGo"
      leading={props => (
        <IconButton
          icon={props => <Icon name="menu" {...props} />}
          {...props}
        />
      )}
      /*trailing={props =>
        loggedIn ? (
          <IconButton
            icon={<Avatar label="Yaman KATBY" size={28} />}
            onPress={() => setLoggedIn(!loggedIn)}
            {...props}w
          />
        ) : (
          <Button
            variant="text"
            title="Login"
            compact
            style={{ marginEnd: 4 }}
            onPress={() => setLoggedIn(!loggedIn)}
            {...props}
          />
        )
      }*/
    />
  );
};

export default GoGo2;