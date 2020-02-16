import React from "react";

class Administration extends React.Component {
  render() {
    return (
      <div>
        <h1>
          <u>Administration</u>
        </h1>

        <form>
          <div>
            <label for="type">Type</label>
            <select id="type" name="type">
              <option>Defect</option>
              <option>Info</option>
              <option>Danger</option>
            </select>
          </div>

          <div>
            <label for="description">Description</label>
            <textarea
              id="description"
              name="description"
              rows="3"
              cols="100"
              type="text"
              class="form-control"
              placeholder="Description"
            ></textarea>
          </div>

          <div>
            <label for="reporter">Reporter</label>
            <input
              id="reporter"
              name="reporter"
              type="text"
              class="form-control"
              placeholder="Name"
            />
          </div>

          <div>
            <label for="mechanicAware">Mechanic Aware</label>
            <select id="mechanicAware" name="mechanicAware">
              <option>No</option>
              <option>Yes</option>
              <option>N/A</option>
            </select>
          </div>

          <div>
            <label for="status">Status</label>
            <select id="status" name="status">
              <option>N.S</option>
              <option>I.P</option>
            </select>
          </div>

          <button type="submit">Add New Admin</button>
          <input type="reset" name="reset" value="Reset" />
        </form>
      </div>
    );
  }
}

export default Administration;
