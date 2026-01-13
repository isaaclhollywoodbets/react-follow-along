import './App.css'
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';

function App() {
  const developerName = 'Isaac';
  const role = 'Software Development Instructor';
  const stack = ['C#', 'SQL', 'React'];

  return (
        <>
      <Header title="My React Portfolio" subtitle="Learning React step by step by step" />
      <MainContent developerName={developerName} role={role} stack={stack}/>
      <Footer owner={developerName} />
    </>
  );
}

export default App;