import React, { Component } from "react";

class Bikes extends Component {

  render() {
    return (
        <React.Fragment>

            <div className="table-responsive">
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Image</th>
                        <th scope="col">Product Type</th>
                        <th scope="col">Price</th>
                    </tr>
                    </thead>
                    <tbody>

                        { this.props.bikes.map(bike => {
                            return (
                                <tr key={bike.id}>
                                    <td>{bike.name}</td>
                                    <td><img src={bike.image} alt="" height="100px" width="100px"/></td>
                                    <td>{bike.product_type}</td>
                                    <td>{bike.price}</td>
                                </tr>
                            );
                        }) }

                    </tbody>
                </table>
            </div>
        </React.Fragment>

    );
  }
}

export default Bikes;
