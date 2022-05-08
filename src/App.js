import {Routes,Route} from 'react-router-dom';

import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import SignIn from './routes/sign-in/sign-in.component';

const Shop = () =>{
  return (<h2>hi there</h2>)
}

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Navigation/>}>
          <Route index element={<Home/>} />
          <Route path='sign-in' element={<SignIn/>} />
          <Route path='shop' element={<Shop/>} />
        </Route>
      </Routes>
    </>
    
  );
}

export default App;
