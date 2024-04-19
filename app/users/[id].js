import { useLocalSearchParams } from "expo-router";
export default function Page() {
  const { id } = useLocalSearchParams();

  return <UserTodos userId={id} />;
}
