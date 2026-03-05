import Header from "../components/Header";
import MainContent from "../components/MainContent";
import Footer from "../components/Footer";


 function Layout() {
  return (
    <div style={{ maxWidth: 980, margin: "0 auto", padding: 16 }}>
        <Header/>
        <MainContent/>
        <Footer/>
    </div>
  );
}

export default Layout;