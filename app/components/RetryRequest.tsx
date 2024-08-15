import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
interface Props {
  retryFn: () => void;
  loading: boolean;
}
export default function RetryRequest({ retryFn, loading }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>
        Ha ocurrido un error con el servidor, intentalo de nuevo mas tarde.
      </Text>
      <TouchableOpacity
        onPress={retryFn}
        activeOpacity={0.4}
        style={styles.retryBtn}
      >
        {loading ? (
          <ActivityIndicator size={"small"} />
        ) : (
          <Text style={styles.txt}>Intentar de nuevo</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
  },
  txt: {
    fontSize: 15,
    textAlign: "center",
    padding: 10,
  },
  retryBtn: {
    padding: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 5,
    backgroundColor: "#c4c4c4",
    alignSelf: "center",
  },
});
