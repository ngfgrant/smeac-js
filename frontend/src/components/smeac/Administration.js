import React from "react";
import api from "../../api/apiService";
import AdministrationForm from "./AdministrationForm";
import AdministrationList from "./AdministrationList";

class Administration extends React.Component {
  constructor(props) {
    super(props);
    this.state = { lastItem: {} };
  }

  formSubmit = async form => {
    const params = {
      type: form.type,
      description: form.description,
      reporter: form.reporter,
      mechanicAware: form.mechanicAware,
      status: form.status
    };

    try {
      await api.post("administration", params);
      this.setState({ lastItem: params });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div>
        <h1>Administration</h1>
        <AdministrationForm submitFormHandler={this.formSubmit} />
        <AdministrationList lastItemAdded={this.state.lastItem} />
      </div>
    );
  }
}
export default Administration;
