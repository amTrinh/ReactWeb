import React from 'react';
import { AiFillStar } from 'react-icons/ai'


function Rating(props) {
	return (
		<>
			{props.rating >= 5 ? <span className='fa-solid fa-star Iconstar'></span> : <AiFillStar />}
			{props.rating >= 4 ? <span className='fa-solid fa-star Iconstar'></span> : <AiFillStar />}
			{props.rating >= 3 ? <span className='fa-solid fa-star Iconstar'></span> : <AiFillStar />}
			{props.rating >= 2 ? <span className='fa-solid fa-star Iconstar'></span> : <AiFillStar />}
			{props.rating >= 1 ? <span className='fa-solid fa-star Iconstar'></span> : <AiFillStar />}
		</>
	)
}

function ItemComp({ item }) {
	return (
		<div class="col">
			<div class="card shadow-sm">
				<img src={item.itemImg} width="100%" height="225" class="bd-placeholder-img card-img-top" alt="..." />
				<div class="card-body">
					<h5 className='ItemTitle noneUnderline '>{item.itemName}</h5>
					<p className='ByBrand colorBlack'><b>{item.itemType}</b></p>
					<small class="card-text graylight">{item.description.slice(0, 35) + '...'}</small>
					<div class="colorBlack d-flex justify-content-between align-items-center">
						<p className='noneUnderline'>$ <span className='price'>{item.itemPrice}</span></p>
						<p class="text-muted">
							<Rating rating={item.itemRating} />
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ItemComp;