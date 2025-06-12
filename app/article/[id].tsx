import DetailArticlePage from "@/components/pages/detail-article";
import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

const DetailArticle = () => {
  const { id } = useLocalSearchParams();

  const numericId = Number(id);

  if (isNaN(numericId)) {
    return <Text>Invalid article ID</Text>;
  }

  return <DetailArticlePage id={numericId} />;
};

export default DetailArticle;
