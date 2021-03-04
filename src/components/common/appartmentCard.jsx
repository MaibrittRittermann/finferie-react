import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from './carousel';

const AppartmentCard = ({appartment}) => {
    return ( 
        <div className="card mb-3">
            <div className="row no-gutters">
                <div className="col-md-4">
                    {appartment.images && <Carousel images={appartment.images} id={appartment._id}/>}
                    {/* {data.images && <img src={appartment.images.slice(0,1)} alt=""/>} */}
                    </div>
                    <div className="col-md-4">                                                           
                    <div className="card-body">
                        <h4 className="card-title">{appartment.name}</h4>
                        <p className="card-text">{appartment.excerpt}</p>                                     
                    </div>
                </div>
                <div className="col-md-4 text-right p-4">
                    <p>Pris højsæson: <span className="price"> {appartment.highSeasonPrice},- </span> DKK pr. døgn</p> 
                    <p>Pris lavsæson: <span className="price"> {appartment.lowSeasonPrice},- </span> DKK pr. døgn</p> 
                    <Link to={'appartment/'+ appartment._id} className="btn btn-primary">Book</Link>
                </div>
            </div>
        </div>
     );
}
 
export default AppartmentCard;