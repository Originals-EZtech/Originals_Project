import React from 'react';
import { Link } from 'react-router-dom';

function SubNavBar() {

    const upsideMenu={
        paddingBottom: 33
    }

    const upsideLogo={
        fontSize: 45
    }

    return (
        <div>
            <section class="navbar custom-navbar navbar-fixed-top" role="navigation">
                <div class="container" style={upsideMenu}>
                    <div class="navbar-header">
                          <button class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                              <span class="icon icon-bar"></span>
                              <span class="icon icon-bar"></span>
                              <span class="icon icon-bar"></span>
                          </button>
                        
                          <Link to="/" class="navbar-brand" style={upsideLogo}>ORIGINALS</Link>
                    </div>
                </div>
            </section>
    </div>
    );
}

export default SubNavBar;