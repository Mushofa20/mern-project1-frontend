import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import Menu from './components/Menu';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import Test from './components/Test';




const App = () => {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/services" element={<Services />} />
          <Route path='/about' element={<About />} />
          <Route path="/contact" element={<Contact />} />
          
          <Route path='/test' element={<Test />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
