import React from 'react';
import './style/AddReview.css';
function AddReview()
{ 
  
    return (
            <form id="feedback" className='borderShadow' action="">
                <h3>Add Reivew</h3>

                <div class="pinfo">Rating.</div>
                <div class="form-group">
                    <div class=" inputGroupContainer">
                        <div class="input-group">
                            <span class="input-group-addon"><i class="fa fa-heart"></i></span>
                            <select class="form-control" id="rate">
                                <option value="1star">1</option>
                                <option value="2stars">2</option>
                                <option value="3stars">3</option>
                                <option value="4stars">4</option>
                                <option value="5stars">5</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="pinfo">Write your review.</div>
                <div class="form-group">
                    <div class=" inputGroupContainer">
                        <div class="input-group">
                            <span class="input-group-addon"><i class="fa fa-pencil"></i></span>
                            <textarea class="form-control" id="review" rows="3" placeholder='Enter your review'></textarea>
                        
                        </div>
                    </div>
                </div>

                <button type="submit" class="btn btn-primary">Publish Review</button>

            </form>
        )
}


export default AddReview;