import React, { Component } from 'react';

class DynamicInput extends Component {
    state = { 
        values : []
    }

    constructor ({data}) {
        super();
        this.state.values = data ? data : ['']; 
    }
    
    createInputs() {      
        return this.state.values.map((v, i) =>
          <div key={i}>
            <input type="text" value={v||''} onChange={this.handleChange.bind(this, i)} />
            <button className="btn btn-outline-danger btn-sm m-2" onClick={this.removeClick.bind(this, i)} >Fjern</button>
          </div>
        );
      }

    handleChange(index, {currentTarget: input}) {
        const values = [...this.state.values];      
        values[index] = input.value;
        this.props.handler(this.state.values);
        this.setState({ values });
    }

    addClick = e => {
      e.preventDefault();
        const values =  [...this.state.values, ''];
        this.setState({ values });
    }

    removeClick = e => {
      e.preventDefault();
      const values = [...this.state.values];
      values.splice(this,1);
      this.setState({ values });
    }

    render() {
        return (
            <div>
                <label htmlFor="name">{this.props.label}</label><br/>
                {this.createInputs()}
                <button className="btn btn-success btn-sm" onClick={this.addClick}>+</button>
                <input type="hidden" name={this.props.name} value={this.state.values}/>

                {this.props.error && <div className="alert alert-danger">{this.props.error}</div>}
            </div>
        );
    }
}

export default DynamicInput;