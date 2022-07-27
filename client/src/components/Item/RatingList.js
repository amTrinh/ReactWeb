import React from 'react';
import './style/RatingList.css'
function RatingList()
{ 
  
    return (
    <div className='ratingList col-md-5 '>
    
        <div className='borderShadow'>
            <span class="heading">User Rating</span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <p>4.1 average based on 254 reviews.</p>
            <hr />

            <div class="hi">
                <div className='d-flex'>
                    <div class="side ">
                        <div>5 star</div>
                    </div>
                    <div class="middle">
                        <div class="bar-container">
                        <div class="bar-5"></div>
                        </div>
                    </div>
                    <div class="side right ">
                        <div>150</div>
                    </div>
                </div>
                <div className='d-flex'>
                    <div class="side ">
                        <div>4 star</div>
                    </div>
                    <div class="middle" >
                        <div class="bar-container">
                        <div class="bar-4"></div>
                        </div>
                    </div>
                    <div class="side right ">
                        <div>63</div>
                    </div>
                </div>
                <div className='d-flex'>
                    <div class="side">
                        <div>3 star</div>
                    </div>
                    <div class="middle">
                        <div class="bar-container">
                        <div class="bar-3"></div>
                        </div>
                    </div>
                    <div class="side right">
                        <div>15</div>
                    </div>
                </div>
                <div className='d-flex'>
                    <div class="side">
                        <div>2 star</div>
                    </div>
                    <div class="middle">
                        <div class="bar-container">
                        <div class="bar-2"></div>
                        </div>
                    </div>
                    <div class="side right">
                        <div>6</div>
                    </div>
                </div>
                <div className='d-flex'>
                    <div class="side">
                        <div>1 star</div>
                    </div>
                    <div class="middle">
                        <div class="bar-container">
                        <div class="bar-1"></div>
                        </div>
                    </div>
                    <div class="side right">
                        <div>20</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        )
}


export default RatingList;