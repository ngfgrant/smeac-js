import React from "react";

class AdministrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "Defect",
      description: "",
      reporter: ""
    };
  }

  formChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  };

  formSubmit = async event => {
    event.preventDefault();
    this.props.submitFormHandler(this.state);
    this.setState({
      type: "Defect",
      description: "",
      reporter: ""
    });
  };

  render() {
    return (
      <div>
        <form className="ui form" onSubmit={this.formSubmit}>
          <div className="field">
            <label>
              Type
              <select
                name="type"
                value={this.state.type}
                onChange={this.formChange}
              >
                <option value="Defect">Defect</option>
                <option value="Info">Info</option>
                <option value="Danger">Danger</option>
              </select>
            </label>
          </div>

          <div className="field">
            <label>
              Description
              <textarea
                name="description"
                value={this.state.description}
                type="text"
                placeholder="Description"
                onChange={this.formChange}
              ></textarea>
            </label>
          </div>

          <div className="field">
            <label>
              Reporter
              <input
                name="reporter"
                type="text"
                value={this.state.reporter}
                placeholder="Name"
                onChange={this.formChange}
              />
            </label>
          </div>

          <button className="positive mini ui button" type="submit">
            Submit
          </button>
          <button className="negative mini ui button" type="reset" name="reset">
            Reset
          </button>
        </form>
      </div>
    );
  }
}

export default AdministrationForm;
