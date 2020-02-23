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
      dateReported: new Date().toDateString()
    };

    try {
      await api.post("administration", params);
      this.setState({ lastItem: params, showForm: false });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    let buttonText = "Show Admin Form";
    if (this.state.showForm === true) {
      buttonText = "Hide Admin Form";
    }
    return (
      <div>
        <h1>Administration</h1>
        <span
          className="toggle"
          onClick={() => {
            if (this.state.showForm === false) {
              this.setState({ showForm: true });
            } else {
              this.setState({ showForm: false });
            }
          }}
        >
          {buttonText}
        </span>
        {this.state.showForm ? (
          <div>
            <AdministrationForm submitFormHandler={this.formSubmit} />
          </div>
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
