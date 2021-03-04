import React, { Component } from 'react';
import { getAppartment } from '../services/appartmentService';
import Carousel from './common/carousel';
import { Link } from 'react-router-dom';
import Form from './common/form';
import Joi from 'joi-browser';

class Appartment extends Form {
    state = { 
        data: {
            dateFrom: '',
            dateTo: ''
        },
        errors: {}
    }

    schema = {
        dateFrom: Joi.string(),
        dateTo: Joi.string()
    }

    async componentDidMount() {
        const {data} = await getAppartment(this.props.match.params.id);
        this.setState({data});
    }

    render() { 
        const {data} = this.state;     
        return ( 
            <div>
                {data.images && <Carousel images={data.images} id={data._id}/>}
                <div className="container">
                    <h1>{data.name}</h1>
                    <p>{data.description}</p>
                    
                <div className="row">
                    <div className="col-md-4 col-12">
                        <h4>I lejligheden</h4>
                        <ul>
                            {data.bullets && data.bullets.map(b => (
                                <li key={data.bullets.indexOf(b)}>{b}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-md-4 col-12">
                        <h4>På hotellet</h4>
                        <ul>
                            {data.hotelBullets && data.hotelBullets.map(b => (
                                <li key={data.hotelBullets.indexOf(b)}>{b}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-md-4 col-12">
                    Pris højsæson: <span className="price"> {data.highSeasonPrice},- DKK</span> pr. døgn<br/>
                    Pris lavsæson: <span className="price"> {data.lowSeasonPrice},- DKK</span> pr. døgn<br/>
                    {this.renderInput("dateFrom", "Fra dato: ", "date", {value:data.dateFrom})}
                    {this.renderInput("dateTo", "Til dato: ", "date", {value:data.dateTo})}                    
                    <Link 
                        to={`/booking/${data._id}/${data.dateFrom}/${data.dateTo}`} 
                        className="btn btn-primary">Book ferie
                    </Link>
                    </div>
                </div>
                
                </div>
            </div>
         );
    }
}
 
export default Appartment;