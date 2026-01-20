import Header from "./Header";
import MainContent from "./MainContent";
import Footer from "./Footer";


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