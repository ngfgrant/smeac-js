import React from "react";
import api from "../../api/apiService";

class AdministrationList extends React.Component {
  state = { admin: [], lastItemAdded: {} };

  async getAdminItems() {
    const response = await api.get("/administration");
    this.setState({
      admin: response.data.items
    });
  }

  async componentDidMount() {
    await this.getAdminItems();
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.lastItemAdded !== this.props.lastItemAdded) {
      await this.getAdminItems();
    }
  }

  removeAdminItem = async event => {
    const itemId = event.target.value;
    try {
      const result = await api.delete(`/administration?id=${itemId}`);
      if (result.status === 201) {
        const newState = this.state.admin.filter(item => item._id !== itemId);
        this.setState({ admin: newState });
      }
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    let output;
    if (!this.state.admin) {
      output = <div>No admin items</div>;
    } else {
      output = (
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Description</th>
              <th>Mechanic Aware</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.admin.map(i => (
              <tr key={i._id}>
                <td>{i.type}</td>
                <td>{i.description}</td>
                <td>{i.mechanicAware}</td>
                <td>{i.status}</td>
                <td>
                  <button onClick={this.removeAdminItem} value={i._id}>
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    return <div>{output}</div>;
  }
}

export default AdministrationList;
