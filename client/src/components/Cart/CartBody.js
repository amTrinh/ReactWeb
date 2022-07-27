import ItemCartComp from './ItemCartComp';

function CartBody(props) {
    
    const setCartList = (list) => {
        return props.onReceiveCartInfo(list)
    }

    const DisplayItemCart = props.CartList.map((cartl) =>
        <ItemCartComp item={cartl} onReceiveCartList = {setCartList} />
    );

    return (
        <div className='cart-body'>
            <div className='cart-list'>
                {DisplayItemCart}
            </div>
        </div>
    )
}


export default CartBody;
