import React from 'react'
import { Link } from 'react-router-dom';
import ItemComp from './ItemComp';

function ItemList({ items }) {
    return (
        <div class="album py-5 bg-light">
            <div class="container">
                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    {
                        items.map((ml) => {
                            
                            return <Link to={`/${ml.itemName}`} state={{ _id: ml._id }} className="Itemcontainer transform">
                                <ItemComp item={ml} />
                            </Link>
                        }
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default ItemList;
