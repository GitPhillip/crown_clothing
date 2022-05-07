import './category.styles.scss';

import CategoryItem from '../category-item/category-item.component';

const Category = ({categories}) =>{

    return(
        <div className='categories-container'>
            {categories.map( category => (
                <CategoryItem category={category} key={category.id}/>
            ))}
        </div>
    );
}
export default Category;