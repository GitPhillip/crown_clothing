import { Outlet } from 'react-router-dom';

import jsonContent from '../../resources/categories';

import Directory from '../../components/directory/directory.component';

const Home = () => {

  const categories = jsonContent;

  return (
    <div>
      <Directory categories={categories}/>
      <Outlet/>
    </div>
  );
}

export default Home;
