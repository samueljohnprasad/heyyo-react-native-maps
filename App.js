import MapComponent from "./src/MapComponent/MapComponent";
import { QueryClient, QueryClientProvider } from "react-query";
import UserLocation from "./src/MapComponent/UserLocation";
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserLocation />
    </QueryClientProvider>
  );
}
