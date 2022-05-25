
import DirectoryItem from '../directory-item/directory-item.component';

import {DirectoryContainer} from './directory.styles';

import jsonContent from '../../resources/categories'; 

const Directory = () =>{

    return(
        <DirectoryContainer>
            {jsonContent.map( category => (
                <DirectoryItem category={category} key={category.id}/>
            ))}
        </DirectoryContainer>
    );
}
export default Directory;