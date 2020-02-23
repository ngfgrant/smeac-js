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
    if (this.state.admin.length === 0) {
      output = (
        <div>
          <div className="ui info message">No admin items</div>
        </div>
      );
    } else {
      output = (
        <div>
          <table className="ui striped table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Description</th>
                <th>Reported On</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.admin.map(i => (
                <tr key={i._id}>
                  <td>{i.type}</td>
                  <td>{i.description}</td>
                  <td>{i.dateReported}</td>
                  <td>
                    <button
                      className="circular compact negative mini ui button"
                      onClick={this.removeAdminItem}
                      value={i._id}
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    return <div>{output}</div>;
  }
}

export default AdministrationList;
