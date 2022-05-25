
import {DirectoryItemContainer,BackgroundImage,Body,Header2,Paragraph} from './directory-item.styles.jsx';

import { useNavigate } from 'react-router-dom';

const DirectoryItem = ({category}) => {
    const {title,id, imageUrl, route} = category;
    const navigate = useNavigate ();

    const onNavigateHandler = () => navigate(`/${route}`); //route to your desired place
    
    return(
        <DirectoryItemContainer onClick={onNavigateHandler}>
            <BackgroundImage imageUrl={imageUrl} />
            <Body>
                <Header2>{title}</Header2>
                <Paragraph>Buy now</Paragraph>
            </Body>
        </DirectoryItemContainer>
    );
} 

export default DirectoryItem;