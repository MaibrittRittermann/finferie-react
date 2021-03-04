import React from 'react';

function targets(count, id) {
    const targets = [];
    for(let i=0; i < count; i++) {
        if(i===0)
            targets.push(<li key={i} data-target={'#' + id} data-slide-to="0" className="active"></li>);
        else
        targets.push(<li key={i} data-target={'#' + id} data-slide-to={i}></li>);
    } 

    return targets;
}

const Carousel = ({images, id}) => {

    id = "A" + id;

    if(!images.length)
            return null;

    return ( 
        <div id={id} className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
                {targets(images.length, id)}
            </ol>
            <div className="carousel-inner">
            {images.map(img => (
                <div className={images.indexOf(img)===0? "carousel-item active" : "carousel-item "} key={images.indexOf(img)}>                 
                    <img src={img} className="d-block w-100" alt="..."/>                    
                </div>
                ))}
            </div>
            <a className="carousel-control-prev" href={'#' + id} role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href={'#' + id} role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>
     );
}
 
export default Carousel;