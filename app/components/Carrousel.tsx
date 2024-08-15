import * as React from "react";
import { StyleSheet, FlatList } from "react-native";
import CarrouselItem from "./CarrouselItem";
interface Props {
  data: ArrayLike<any>;
}
export default function Carrousel({ data }: Props) {
  const flatlistRef = React.useRef<FlatList<any>>(null);
  const [selectedItem, setSelectedItem] = React.useState("1");
  return (
    <>
      <FlatList
        ref={flatlistRef}
        data={data}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <CarrouselItem
            {...item}
            id={item.key}
            selectedItem={selectedItem === item.key}
            toggleSelectedItem={() => {
              setSelectedItem(item.key);
              if (flatlistRef.current)
                flatlistRef.current.scrollToIndex({
                  animated: true,
                  index: Number(item.key) - 1,
                  viewPosition: 0.65,
                });
            }}
          />
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
}

const styles = StyleSheet.create({});
