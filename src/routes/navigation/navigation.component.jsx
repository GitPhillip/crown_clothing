import { useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";

import { signOutUser} from '../../utils/firebase/firebase.utils';

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import {ReactComponent as CrownLogo} from '../../assets/crown.svg';

import './navigation.styles.scss';

const Navigation = () =>{

    const {currentUser} = useContext(UserContext); // get the current user from the context
    const {isCartOpen} = useContext(CartContext);

    return (
      <>
        <div className='navigation'>
            <Link className="logo-container" to='/'>
                <CrownLogo className="logo" />
            </Link>
            <div className="nav-links-container">
                <Link className="nav-link" to="/shop">
                    Shop
                </Link>
                {
                    currentUser ? (
                        <span className="nav-link" onClick={signOutUser}>Sign Out</span>
                    ):
                    (
                    <Link className="nav-link" to="/auth">
                        Sign In
                    </Link>
                    )
                }
                <CartIcon />                
            </div>
            {
                isCartOpen && <CartDropdown />
            }
        </div>
        <Outlet/> {/*everything else must be at the bottom */}
      </>
    );
}

export default Navigation;