import React from 'react';
import { connect } from 'react-redux';
import { toggleCart } from '../../action/cart_action';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.scss';

const CartIcon = ({ toggleCartHidden }) => (
    <div className="cart-icon" onClick={toggleCartHidden} >
        <ShoppingIcon className="shopping-icon"/>
        <span className="item-count">0</span>
    </div>
)


const mapDispatchToProps = (dispatch) => {
    return {
        toggleCartHidden: () => dispatch(toggleCart())
    }
}

export default connect(null, mapDispatchToProps)(CartIcon);