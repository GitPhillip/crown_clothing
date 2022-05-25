import { useContext } from "react";
import { Outlet } from "react-router-dom";

import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";

import { signOutUser} from '../../utils/firebase/firebase.utils';

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import {ReactComponent as CrownLogo} from '../../assets/crown.svg';

import {NavigationContainer, NavLinks, NavLink, LogoContainer} from './navigation.styles';

const Navigation = () =>{

    const {currentUser} = useContext(UserContext); // get the current user from the context
    const {isCartOpen} = useContext(CartContext);

    return (
      <>
        <NavigationContainer>
            <LogoContainer to='/'>
                <CrownLogo className="logo" />
            </LogoContainer>
            <NavLinks>
                <NavLink to="/shop">
                    Shop
                </NavLink>
                {
                    currentUser ? (
                        <NavLink as='span' onClick={signOutUser}>Sign Out</NavLink>
                    ):
                    (
                    <NavLink to="/auth">
                        Sign In
                    </NavLink>
                    )
                }
                <CartIcon />                
            </NavLinks>
            {
                isCartOpen && <CartDropdown />
            }
        </NavigationContainer>
        <Outlet/> {/*everything else must be at the bottom */}
      </>
    );
}

export default Navigation;