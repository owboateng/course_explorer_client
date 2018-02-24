import React from "react";
import GLogin from './glogin';
import Header from './header';
import Footer from './footer';

import '../styles/home.css';
import '../styles/maincontent.css';
/**/

export default class Home extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <div className='main-content'>
                  <GLogin />
                </div>
                <Footer />
            </div>
        );
    }
}