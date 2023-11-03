import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {Form, Button} from 'react-bootstrap';

class App extends Component {
  constructor() {
    super();
    this.state = {
      numberOfStudents: 0,
      meetings: [],
      description: '',
      teacherName: '',
      emails: [],
      meetDate: "",
      isMeetCreated: false
    };
  }

  handleCreateMeetings = async () => {
    try {
      const {
        description,
        teacherName,
        emails,
        meetDate,
        url
      } = this.state;

      const response = await fetch('/app/scheduleMeet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description,
          teacherName,
          emails,
          meetDate,
          url
        }),
      });

      if (response.ok) {
        // Meet created successfully
        this.setState({ isMeetCreated: true })
        const newMeet = await response.json();
        // Handle the response as needed
      } else {
        // Handle the error
      }
    } catch (error) {
      console.error('Error creating meet:', error);
    }
  };

  handleNumberOfStudentsChange = (event) => {
    this.setState({ numberOfStudents: parseInt(event.target.value) || 0 });
  };

  handleTextChange = (event) => {
    const { name, value } = event.target;

    if (name === 'emails') {
      // Split email addresses by commas and store them in an array
      const emailArray = value.split(',');
      this.setState({ emails: emailArray });
    } else {
      this.setState({ [name]: value });
    }
  };

  handleBackToHomePage = () => {
    this.setState({ isMeetCreated: false })
    this.setState({
      numberOfStudents: 0,
      meetings: [],
      description: '',
      teacherName: '',
      emails: [],
      meetDate: "",
      isMeetCreated: false
    })
  }

  render() {
    const {
      description,
      meetings,
      teacherName,
      emails,
      meetDate,
      isMeetCreated
    } = this.state
    console.log(this.state)

    return !isMeetCreated ? (
      <div style={{
        display: 'block',
        width: 1000,
        padding: 100
      }}>
        <center><h4 style={{color: 'green'}}>Create Meeting For Students</h4></center>
        <Form>
          <Form.Group>
            <Form.Label>Enter Description:</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={description}
              onChange={this.handleTextChange}
              placeholder="Enter description"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Enter Teacher Name:</Form.Label>
            <Form.Control
              type="text"
              name="teacherName"
              value={teacherName}
              onChange={this.handleTextChange}
              placeholder="Enter teacher name"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Enter Emails:</Form.Label>
            <Form.Control
              type="email"
              name="emails"
              value={emails}
              onChange={this.handleTextChange}
              placeholder="Enter emails"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Enter No.of Students:</Form.Label>
            <Form.Control
              type="number"
              name="meetings"
              value={meetings}
              onChange={this.handleTextChange}
              placeholder="Enter no.of students"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Enter Teacher Name:</Form.Label>
            <Form.Control
              type="date"
              name="meetDate"
              value={meetDate}
              onChange={this.handleTextChange}
              placeholder="Enter date"
            />
          </Form.Group>
          <br/>
          <Button variant="secondary" type="submit" onClick={this.handleCreateMeetings}>
            Create Meeting
          </Button>
        </Form>
      </div>
    ) : <h1>
      <Button
        type="submit"
        variant="secondary"
        onClick={this.handleBackToHomePage}>
        Created Meetings, Click this to go back to home page
      </Button>
    </h1>
  }
}

export default App;
