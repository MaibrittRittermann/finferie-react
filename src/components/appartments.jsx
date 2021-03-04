import React, { Component } from 'react';
import AppartmentCard from './common/appartmentCard';
import { getAppartments } from './../services/appartmentService';

class Appartments extends Component {
    state = { 
        data: []
    }

    async componentDidMount() {
        const { data } = await getAppartments();
        this.setState({data});
    }

    render() { 
        const {data} = this.state;

        return ( 
            <React.Fragment>
            
            <main className="container">
                <h1>Lejligheder</h1>
                
                {data.map(appartment => (
                   <AppartmentCard appartment={appartment} key={data.indexOf(appartment)}/>
                ))}                        
                   
            </main>
            </React.Fragment>
         );
    }
}
 
export default Appartments;