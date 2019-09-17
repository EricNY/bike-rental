import React, { Component } from "react";
import Bikes from './Bikes'
import axios from "axios";

class ResySystem extends Component {

  state = {
    bikes: [],
    filteredBikes: [],
    formFields: {
        email: '',
        selection: 'all'
    },
    errors: {},
    display: 'none'
  };

  componentDidMount(){
    axios.get('bikerentals.json').then(res => {
        const bikes = res.data.products;
        this.setState({ bikes: bikes, filteredBikes: bikes });
      });
  }

  selectBike = e => {
    let selection = e.target.value,
        filteredBikes = [],
        formFields = this.state.formFields;

    if (selection === 'all') {
        filteredBikes = this.state.bikes;
    } else {
        filteredBikes = this.state.bikes.filter(b => b.name === selection);
    }
    formFields.selection = selection;
    this.setState({filteredBikes, formFields});
  }

  enterEmail = e => {
    const email = e.target.value,
          formFields = this.state.formFields;

    formFields.email = email;
    this.setState({formFields});
  }

  validate = () => {
    const errors = {};
    if (this.state.formFields.email === '') {
        errors.email = 'Email is required';
    }
    if (this.state.formFields.selection === 'all') {
        errors.selection = 'You must select an option'
    }
    return Object.keys(errors).length === 0 ? null : errors;
  }

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    console.log(errors);
    if (errors) {
        this.setState({ errors });
    } else {
        this.setState({display: 'block'});
    }
    return;
  }

  render() {
    return (
        <div>
            <form className="form" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1">Select an item to reserve</label>
                    <select 
                        className="form-control" 
                        id="exampleFormControlSelect1" 
                        onChange={this.selectBike}
                    >
                        <option value='all'>choose one</option>
                        { this.state.bikes.map(bike => {
                            return <option key={bike.id} value={bike.name}>{bike.name}</option>;
                        }) }
                    </select>
                    { this.state.errors.selection && <div className="alert alert-danger">{this.state.errors.selection}</div> }
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Email address</label>
                    <input
                        className="form-control" 
                        id="exampleFormControlInput1" 
                        placeholder="name@example.com"
                        onChange={this.enterEmail}
                        value={this.state.formFields.email}
                    />
                </div>
                { this.state.errors.email && <div className="alert alert-danger">{this.state.errors.email}</div> }
                <button className="btn btn-primary">Reserve</button>
                <div className="alert alert-success" style={{'display': this.state.display}}>Your request has been sent</div>
            </form>
            <br></br>
            <Bikes bikes={this.state.filteredBikes}></Bikes>
        </div>
    );
  }
}

export default ResySystem;
