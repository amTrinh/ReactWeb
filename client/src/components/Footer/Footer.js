import React from 'react';
import "./Footer.css"
function Footer()
{

        return (
            <div class=" footer">
                <footer class="py-5 container">
                <div class="row">
                    <div class="col-2">
                    <h5>Section</h5>
                    <ul class="nav flex-column">
                        <li class="nav-item mb-2"><p href="#" class="nav-link p-0 text-muted noMarginBot">Home</p></li>
                        <li class="nav-item mb-2"><p href="#" class="nav-link p-0 text-muted noMarginBot">Features</p></li>
                        <li class="nav-item mb-2"><p href="#" class="nav-link p-0 text-muted noMarginBot">Pricing</p></li>
                        <li class="nav-item mb-2"><p href="#" class="nav-link p-0 text-muted noMarginBot">FAQs</p></li>
                        <li class="nav-item mb-2"><p href="#" class="nav-link p-0 text-muted noMarginBot">About</p></li>
                    </ul>
                    </div>
            
                    <div class="col-2">
                    <h5>Section</h5>
                    <ul class="nav flex-column">
                        <li class="nav-item mb-2"><p href="#" class="nav-link p-0 text-muted noMarginBot">Home</p></li>
                        <li class="nav-item mb-2"><p href="#" class="nav-link p-0 text-muted noMarginBot">Features</p></li>
                        <li class="nav-item mb-2"><p href="#" class="nav-link p-0 text-muted noMarginBot">Pricing</p></li>
                        <li class="nav-item mb-2"><p href="#" class="nav-link p-0 text-muted noMarginBot">FAQs</p></li>
                        <li class="nav-item mb-2"><p href="#" class="nav-link p-0 text-muted noMarginBot">About</p></li>
                    </ul>
                    </div>
            
                    <div class="col-2">
                    <h5>Section</h5>
                    <ul class="nav flex-column">
                        <li class="nav-item mb-2"><p href="#" class="nav-link p-0 text-muted noMarginBot">Home</p></li>
                        <li class="nav-item mb-2"><p href="#" class="nav-link p-0 text-muted noMarginBot">Features</p></li>
                        <li class="nav-item mb-2"><p href="#" class="nav-link p-0 text-muted noMarginBot">Pricing</p></li>
                        <li class="nav-item mb-2"><p href="#" class="nav-link p-0 text-muted noMarginBot">FAQs</p></li>
                        <li class="nav-item mb-2"><p href="#" class="nav-link p-0 text-muted noMarginBot">About</p></li>
                    </ul>
                    </div>
            
                    <div class="col-4 offset-1">
                    <form>
                        <h5>Subscribe to our newsletter</h5>
                        <p>Monthly digest of whats new and exciting from us.</p>
                        <div class="d-flex w-100 gap-2">
                        <label for="newsletter1" class="visually-hidden">Email address</label>
                        <input id="newsletter1" type="text" class="form-control" placeholder="Email address"/>
                        <button class="btn btn-primary" type="button">Subscribe</button>
                        </div>
                    </form>
                    </div>
                </div>
            
                <div class="d-flex justify-content-between py-4 my-4 border-top">
                    <p>&copy; 2021 Company, Inc. All rights reserved.</p>
                    {/* <ul class="list-unstyled d-flex">
                    <li class="ms-3"><p class="link-dark" href="#"><svg class="bi" width="24" height="24"><use xlink:href="#twitter"/></svg></p></li>
                    <li class="ms-3"><p class="link-dark" href="#"><svg class="bi" width="24" height="24"><use xlink:href="#instagram"/></svg></p></li>
                    <li class="ms-3"><p class="link-dark" href="#"><svg class="bi" width="24" height="24"><use xlink:href="#facebook"/></svg></p></li>
                    </ul> */}
                </div>
                </footer>
            </div>
        )
}


export default Footer;