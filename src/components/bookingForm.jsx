import React from 'react';
import Joi from 'joi-browser';
import DynamicInput from './common/dynamicInput';
import Form from './common/form';
import { getAppartment } from './../services/appartmentService';
import { saveCustomer } from './../services/customerService';
import { saveBooking } from './../services/bookingService';
import { toast } from 'react-toastify';

class BookingForm extends Form {
    state = { 
        data: {
            dateFrom: this.today(),
            dateTo: this.today(),
            appartment: {},
            price: 0,
            name: '',
            email: '',
            phone: '',
            address: '',
            zip: 0,
            city: '',
            tennents: []           
        },
        errors: {} 
    }

    schema = {
        dateFrom: Joi.string().required(),
        dateTo: Joi.string().required(),
        appartment: Joi.object().required(),
        price: Joi.number().required(),
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().required(),
        address: Joi.string().required(),
        zip: Joi.number().required(),
        city: Joi.string().required(),
        tennents: Joi.array()
    }

    async componentDidMount () {
        const {params} = this.props.match;     
        const {data} = this.state;
        data.dateFrom = params.dateFrom;
        data.dateTo = params.dateTo;
        const {data: appartment} = await getAppartment(params.appartment);
        data.appartment = appartment;
        data.price = this.setPrice(data.dateFrom, data.dateTo);
        this.setState({data});
    }

    today () {
        const d = new Date();
        const m = (d.getUTCMonth() + 1) < 10? '0' + (d.getUTCMonth() + 1): (d.getUTCMonth() + 1);
        const dn =  d.getUTCDate() < 10? '0' + d.getUTCDate(): d.getUTCDate();
        return d.getFullYear() + '-' + m + '-' + dn;
     }

    parseDate(str) {
        var mdy = str.split('-');       
        return new Date(mdy[0], mdy[1]-1, mdy[2]);
    }

    setPrice(dateFrom, dateTo) {
        const days = Math.round(this.parseDate(dateTo) - this.parseDate(dateFrom))/(1000*60*60*24);   
        if(dateFrom > new Date(dateFrom.getCurrentYear, 6, 1) && dateTo < new Date(dateTo.getCurrentYear, 7, 31))
            return days * this.state.data.appartment.highSeasonPrice;
        return days * this.state.data.appartment.lowSeasonPrice;
    }

    makeCustomer() {
        const {data} = this.state;
        return {
            name: data.name,
            phone: data.phone,
            email: data.email,
            address: data.address,
            zip: data.zip,
            city: data.city
        };
    }

    makeBooking(customerId) {
        const {data} = this.state;
        
        return {
            appartment : {
                _id: data.appartment._id,
                name: data.appartment.name
            },
            customer: customerId,
            tennents: this.getTennents(),
            dateFrom: new Date(data.dateFrom),
            dateTo: new Date(data.dateTo),
            price: data.price
        };
    }

    getTennents() {
        const tennentsArray = [];
        
        for(let item of this.state.data.tennents){
            let t = item.split(',', 2);           
            tennentsArray.push({name: t[0], age: parseInt(t[1].trim())});
        }
        return tennentsArray;
    }

    handleTennents = (tennents) => {
        const {data} = this.state;
        data.tennents = tennents;
        this.setState({data});
    }

    async doSubmit() {
        try {
            const {data:customer} = await saveCustomer(this.makeCustomer());
            const booking = await saveBooking(this.makeBooking(customer._id));
            this.props.history.push("/confirm/");

            if(booking.response.status === 400) {
                toast.error(booking.response.data);
                console.log(booking.response.data);                
            }
        } catch (ex) {
            
            toast.error(ex.message);
            console.log(ex.message);
        }
    }

    render() { 
        const {data} = this.state;       
        return ( 
            <form className="container" onSubmit={this.handleSubmit}>
                {this.renderInput("name", "Fornavn & Efternavn: ", {value: data.name})}
                {this.renderInput("email", "E-mail: ", {value: data.email})}
                {this.renderInput("phone", "Telefon: ", {value: data.phone})}
                {this.renderInput("address", "Adresse: ", {value: data.address})}
                {this.renderInput("zip", "Postnummer: ", {value: data.zip})}
                {this.renderInput("city", "By: ", {value: data.city})}
                <DynamicInput name="tennents" label="Gæster navn, alder" handler={this.handleTennents} data={data.tennents}/>

                <button disabled={this.validate()} type="submit" className="btn btn-primary">
                    Bestil ferie
                </button>
            </form>
         );
    }
}
 
export default BookingForm;