import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './components/pages/Home'
import Products from './components/pages/Products'
import Feedstocks from './components/pages/Feedstocks'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Container from './components/layout/Container'
import RegisterProduct from './components/pages/RegisterProduct'
import RegisterFeedstock from './components/pages/RegisterFeedstock'
import UpdateProduct from './components/pages/UpdateProduct'
import UpdateFeedstock from './components/pages/UpdateFeedstock'

function App(props) {
  return (
    <Router>
      <Navbar />
      <Container customClass="min_height">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/feedstocks" element={<Feedstocks />}></Route>
        <Route path="/products/register" element={<RegisterProduct />}></Route>
        <Route path="/feedstocks/register" element={<RegisterFeedstock />}></Route>
        <Route path="/products/update/:id" element={<UpdateProduct />}></Route>
        <Route path="/feedstocks/update/:id" element={<UpdateFeedstock />}></Route>
      </Routes>
      </Container>
      <Footer/>
    </Router>
  );
}

export default App;
