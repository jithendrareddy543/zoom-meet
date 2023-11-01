import React, { Component } from 'react';
import './App.css';

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
        this.setState({isMeetCreated: true})
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
    this.setState({isMeetCreated: false})
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
    const { numberOfStudents,
      description,
      meetings,
      teacherName,
      emails,
      meetDate,
      isMeetCreated
    } = this.state
    console.log(this.state)

    return !isMeetCreated ? (
      <div className="App">
        <header className="App-header">
          <h1>Create Meeting for Students</h1>

          {/* New text fields and date field */}
          <input
            type="text"
            name="description"
            value={description}
            onChange={this.handleTextChange}
            placeholder="Description"
          />
          <input
            type="text"
            name="teacherName"
            value={teacherName}
            onChange={this.handleTextChange}
            placeholder="Teacher Name"
          />
          <input
            type="text"
            name="emails"
            value={emails}
            onChange={this.handleTextChange}
            placeholder="Emails (comma-separated)"
          />
          <input
            type="number"
            value={numberOfStudents}
            onChange={this.handleNumberOfStudentsChange}
          />
          <input
            type="date"
            name="meetDate"
            value={meetDate}
            onChange={this.handleTextChange}
            placeholder="Meet date"
          />
          <br></br>

          <button onClick={this.handleCreateMeetings}>Create Meeting</button>
          {meetings.length > 0 && (
            <div>
              <h2>Created Meeting:</h2>
              <ul>
                {meetings.map((description, index) => (
                  <li key={index}>{description}</li>
                ))}
              </ul>
            </div>
          )}
        </header>
      </div>

    ):<h1> <button onClick={this.handleBackToHomePage}>Created Meetings, Click this to go back to home page</button></h1>;
  }
}

export default App;
