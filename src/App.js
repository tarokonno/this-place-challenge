import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

  constructor() {
    super();
    this.state = {
      name: '',
      questions: [
        {
          id: 1,
          question: '',
          answer: '',
          endpoint: '',
          completed: false
        },
        {
          id: 2,
          question: '',
          answer: '',
          endpoint: '',
          completed: false
        },
        {
          id: 3,
          question: '',
          answer: '',
          endpoint: '',
          completed: false
        },
        {
          id: 4,
          question: '',
          answer: '',
          endpoint: '',
          completed: false
        },
        {
          id: 5,
          question: '',
          answer: '',
          endpoint: '',
          completed: false,
        }
      ],
      prizeUrl: '',
      completed: false
    };
  }

  handleNameChange = e => {
    this.setState({
      name: e.target.value
    });
  }

  handleSubmit = e => {
    const data = this.state.name;

    e.preventDefault();
    // Handle initial name submission
    axios({
      method: 'post',
      data: { name: data },
      url: 'http://dev-challenge.thisplace.com/hello',
      withCredentials: false,
    })
    // Get question one
    .then(response => {
      // Save endpoint for question one
      const endpoint = response.data.substring(response.data.indexOf("/"));
      this.state.questions[0].endpoint = endpoint;
      this.setState({ questions: this.state.questions })
      // Retrieve question one
      return axios({
        method: 'get',
        url: `http://dev-challenge.thisplace.com${this.state.questions[0].endpoint}`,
      })
      .then(response => {
        // Save question one
        const question = response.data;
        this.state.questions[0].question = question;
        this.setState({ questions: this.state.questions })
        // Solve question one
        this.quickMath(0);
        // Post question one
        return axios({
          method: 'post',
          data: { answer: this.state.questions[0].answer },
          url: `http://dev-challenge.thisplace.com${this.state.questions[0].endpoint}`,
          withCredentials: false
        })
        // Get question two
        .then(response => {
          // Update 1 question status to complete
          if(response.data.indexOf('Correct') > -1) {
            this.state.questions[0].completed = true;
          }
          // Save endpoint for question two
          const endpoint = response.data.substring(response.data.indexOf("/"));
          this.state.questions[1].endpoint = endpoint;
          this.setState({ questions: this.state.questions })

          // Retrieve question two
          return axios({
            method: 'get',
            url: `http://dev-challenge.thisplace.com${this.state.questions[1].endpoint}`,
          })
          .then(response => {
            // Save question two
            const question = response.data;
            this.state.questions[1].question = question;
            this.setState({ questions: this.state.questions })
            // Solve question two
            this.quickMath(1);
            // Post question two
            return axios({
              method: 'post',
              data: { answer: this.state.questions[1].answer },
              url: `http://dev-challenge.thisplace.com${this.state.questions[1].endpoint}`,
              withCredentials: false
            })
          })
          // Get question three
          .then(response => {
            // Update question 2 status to complete
            if(response.data.indexOf('Correct') > -1) {
              this.state.questions[1].completed = true;
            }
            // Save endpoint for question three
            const endpoint = response.data.substring(response.data.indexOf("/"));
            this.state.questions[2].endpoint = endpoint;
            this.setState({ questions: this.state.questions })
            // Retrieve question three
            return axios({
              method: 'get',
              url: `http://dev-challenge.thisplace.com${this.state.questions[2].endpoint}`,
            })
          })
          .then(response => {
            // Save question three
            const question = response.data;
            this.state.questions[2].question = question;
            this.setState({ questions: this.state.questions })
            // Solve question three
            this.sliceroo(2);
            // Post question three
            return axios({
              method: 'post',
              data: { answer: this.state.questions[2].answer },
              url: `http://dev-challenge.thisplace.com${this.state.questions[2].endpoint}`,
              withCredentials: false
            })
            // Get question four
            .then(response => {
              // Update question 3 status to complete
              if(response.data.indexOf('Correct') > -1) {
                this.state.questions[2].completed = true;
              }
              // Save endpoint for question four
              const endpoint = response.data.substring(response.data.indexOf("/"));
              this.state.questions[3].endpoint = endpoint;
              this.setState({ questions: this.state.questions })
              // Retrieve question four
              return axios({
                method: 'get',
                url: `http://dev-challenge.thisplace.com${this.state.questions[3].endpoint}`,
              })
            })
            .then(response => {
              // Save question four
              const question = response.data;
              this.state.questions[3].question = question;
              this.setState({ questions: this.state.questions })
              // Solve question four
              this.sliceroo(3);
              // Post question four
              return axios({
                method: 'post',
                data: { answer: this.state.questions[3].answer },
                url: `http://dev-challenge.thisplace.com${this.state.questions[3].endpoint}`,
                withCredentials: false
              })
            })
            // Get question five
            .then(response => {
              // Update question 4 status to complete
              if(response.data.indexOf('Correct') > -1) {
                this.state.questions[3].completed = true;
              }
              // Save endpoint for question five
              const endpoint = response.data.substring(response.data.indexOf("/"));
              this.state.questions[4].endpoint = endpoint;
              this.setState({ questions: this.state.questions })
              // Retrieve question five
              return axios({
                method: 'get',
                url: `http://dev-challenge.thisplace.com${this.state.questions[4].endpoint}`,
              })
            })
            // Save question five
            .then(response => {
              const question = response.data;
              this.state.questions[4].question = question;
              this.setState({ questions: this.state.questions })
              // Solve question five (guess 5 as a good starting point)
              this.guesseroo(5);
              // Post my guess of 5 and while loop through until the answer is correct
              while(this.state.completed === false) {
                return axios({
                  method: 'post',
                  data: { answer: this.state.questions[4].answer },
                  url: `http://dev-challenge.thisplace.com${this.state.questions[4].endpoint}`,
                  withCredentials: false
                })
              .then(response => {
                const res = response.data;
                  // if answer is correct get the prize url
                  if(res.indexOf('Well done!') > -1) {
                    const prizeUrl = res.substring(res.indexOf("/"));
                    this.state.prizeUrl = prizeUrl;
                    this.setState({ prizeUrl: this.state.prizeUrl })

                    return axios({
                      method: 'get',
                      url: `http://dev-challenge.thisplace.com${this.state.prizeUrl}`
                    })
                    // get the response data from the prize url and display it on the page
                    .then(response => {
                      const prize = response.data;
                      const displayPrize = document.querySelector('.display-prize');
                      this.setState({ completed: true })
                      displayPrize.innerHTML = prize;
                    })
                  // if the answer is incorrect run the guesseroo function again
                  } else if(res.indexOf('That answer was incorrect.') > -1) {
                    // if the answer is greater add 1 on last guess
                    if(res.indexOf('greater than') > -1) {
                      const guess = (this.state.questions[4].answer + 1);
                      this.guesseroo(guess);
                    // if the answer is less minus 1 off last guess
                    } else if(res.indexOf('less than') > -1) {
                      const guess = (this.state.questions[4].answer - 1);
                      this.guesseroo(guess);
                    }
                  }
                })
              }
            })
          })
        })
      })
    })
  }

  quickMath = (i) => {
    // Get the actual question
    const question = this.state.questions[i].question;
    const sub = question.substring(question.indexOf("What is"),question.indexOf("?"));

    // Update the question state with the actual question
    this.state.questions[i].question = `${sub}?`;
    this.setState({ questions: this.state.questions });

    // Get the numbers from the question
    const numbers = sub.match(/\d+/g).map(Number);

    // Check string to determine to calculate the numbers
    if(sub.indexOf('minus') > -1) {
      const answer = numbers[0] - numbers[1];
      this.state.questions[i].answer = answer;
      this.setState({ questions: this.state.questions })
    } else if (sub.indexOf('plus') > -1) {
      const answer = numbers[0] + numbers[1];
      this.state.questions[i].answer = answer;
      this.setState({ questions: this.state.questions })
    } else if (sub.indexOf('times') > -1) {
      const answer = numbers[0] * numbers[1];
      this.state.questions[i].answer = answer;
      this.setState({ questions: this.state.questions })
    } else if (sub.indexOf('divide') > -1) {
      const answer = numbers[0] / numbers[1];
      this.state.questions[i].answer = answer;
      this.setState({ questions: this.state.questions })
    }
  }

  sliceroo = (i) => {
    // Get the actual question
    const question = this.state.questions[i].question;
    const sub = question.substring(question.indexOf("What are the"),question.indexOf("?"));

    // Update the question state with the actual question
    this.state.questions[i].question = `${sub}?`;
    this.setState({ questions: this.state.questions });

    // Extract the word to manipulate and the number to calculate
    const word = sub.substring(sub.indexOf('"'),sub.lastIndexOf('"')).split('"').join('');
    const number = Number(sub.match(/\d+/g).map(Number));
    
    // Check string to determine where to slice the string
    if(sub.indexOf('What are the last') > -1) {
      const answer = word.slice(`-${number}`);
      this.state.questions[i].answer = answer;
      this.setState({ questions: this.state.questions })
    } else if(sub.indexOf('What are the first') > -1) {
      const answer = word.substring(0, number);
      this.state.questions[i].answer = answer;
      this.setState({ questions: this.state.questions })
    }
  }

  guesseroo = (guess) => {
    // Get the actual question
    const question = this.state.questions[4].question;
    const sub = question.substring(question.indexOf("Guess a number"),question.indexOf("?"));

    // Update the question state with the actual question
    this.state.questions[4].question = `${sub}?`;
    this.setState({ questions: this.state.questions });

    // let guess = Math.floor(Math.random() * (upper - lower) + 1);
    this.state.questions[4].answer = guess;
    this.setState({ questions: this.state.questions });
  }

  render() {
    return (
      <div className="App">
        <h1>This Place Dev Challenge</h1>
        <form className="form" onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Enter name to run program" value={this.state.name} onChange={this.handleNameChange} />
          <button>Let's Go!</button>
        </form>
        <div className="answers">
          {this.state.questions.map(question => {
            return (
              <div className="questions">
                { question.question && <p className="question">{question.question}</p> }
                <p className="answer">{question.answer}</p>
                { question.completed && <span className="correct">&#10004;</span> }
              </div>
            );
          })}
        </div>
        <div className="display-prize"></div>
      </div>
    );
  }
}

export default App;
