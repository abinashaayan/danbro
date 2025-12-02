import { Footer } from "./components/comman/Footer";
import AppRoutes from "./routes/AppRoutes";
import { Navbar } from "./components/comman/Navbar";
import { TopHeader } from "./components/comman/TopHeader";


function App() {
  return (
    <>
      <TopHeader />
      <Navbar />
      <AppRoutes />
      <Footer />
    </>
  );
}

export default App;
