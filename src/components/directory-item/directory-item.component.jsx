import { useNavigate } from 'react-router-dom';

import './directory-item.styles.scss';

const DirectoryItem = ({category}) => {
    const {title,id, imageUrl, route} = category;
    const navigate = useNavigate ();

    const onNavigateHandler = () => navigate(`/${route}`); //route to your desired place

    return(
        <div className="directory-item-container" onClick={onNavigateHandler}>
            <div className="background-image" style={{ backgroundImage: `url(${imageUrl})`}} />
            <div className="body">
                <h2>{title}</h2>
                <p>Buy now</p>
            </div>
        </div>
    );
} 

export default DirectoryItem;