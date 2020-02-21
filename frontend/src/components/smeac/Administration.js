import React from "react";
import api from "../../api/apiService";
import AdministrationForm from "./AdministrationForm";
import AdministrationList from "./AdministrationList";

class Administration extends React.Component {
  constructor(props) {
    super(props);
    this.state = { lastItem: {}, showForm: false };
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
      this.setState({ lastItem: params, showForm: false });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    let buttonText = "Show";
    if (this.state.showForm === true) {
      buttonText = "Hide";
    }
    return (
      <div>
        <h1>Administration</h1>
        <button
          onClick={() => {
            if (this.state.showForm === false) {
              this.setState({ showForm: true });
            } else {
              this.setState({ showForm: false });
            }
          }}
        >
          {buttonText}
        </button>
        {this.state.showForm ? (
          <AdministrationForm submitFormHandler={this.formSubmit} />
        ) : (
          <div></div>
        )}
        <div>
          <AdministrationList lastItemAdded={this.state.lastItem} />
        </div>
      </div>
    );
  }
}
export default Administration;
