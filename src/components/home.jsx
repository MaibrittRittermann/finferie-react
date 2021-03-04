import React, { Component } from 'react';
import Carousel from './common/carousel';

class Home extends Component {
    state = {  }
    render() { 
        const carousel = ['/carousel/1.jpg','/carousel/2.jpg', '/carousel/3.jpg', '/carousel/4.jpg', '/carousel/5.jpg', '/carousel/6.jpg'];

        return ( 
            <React.Fragment>
                <Carousel images={carousel} id="home"/>
                <main className="container"> 
                    <h1>Forsiden</h1>
                </main>
            </React.Fragment>
         );
    }
}
 
export default Home;