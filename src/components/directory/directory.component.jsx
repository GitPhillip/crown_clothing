
import DirectoryItem from '../directory-item/directory-item.component';

import jsonContent from '../../resources/categories';

import './directory.styles.scss';

const Directory = () =>{
    const categories = jsonContent;
    return(
        <div className='directory-container'>
            {categories.map( category => (
                <DirectoryItem category={category} key={category.id}/>
            ))}
        </div>
    );
}
export default Directory;