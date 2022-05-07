import jsonContent from './resources/categories';

import Category from './components/category/category.component';

const App = () => {

  const categories = jsonContent;

  return (
    <div>
      <Category categories={categories}/>
    </div>
  );
}

export default App;
