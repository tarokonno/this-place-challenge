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
      prize: '',
      complete: false
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
      withCredentials: false
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
              // Save endpoint for question five
              console.log(response.data);
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
              // Solve question five (guess 5 as the starting point)
              this.guesseroo(5, 10, 0);
              // Post question five
              return axios({
                method: 'post',
                data: { answer: this.state.questions[4].answer },
                url: `http://dev-challenge.thisplace.com${this.state.questions[4].endpoint}`,
                withCredentials: false
              })
            })
            .then(response => {
              const res = response.data;
              console.log(res);
              for(let i = 3; i > 0 && this.state.complete === false; i--) {
                if(res.indexOf('Well done!') > -1) {
                  console.log(res);
                  const prizeUrl = res.substring(res.indexOf("/"));
                  this.state.prizeUrl = prizeUrl;
                  this.setState({ prizeUrl: this.state.prizeUrl })
                  console.log(this.state.prizeUrl)
                  // window.location.replace(`http://dev-challenge.thisplace.com${this.state.prizeUrl}`);

                  return axios({
                    method: 'get',
                    url: `http://dev-challenge.thisplace.com${this.state.prizeUrl}`
                  })
                  .then(response => {
                    console.log(response.data);
                    const prize = response.data;
                    this.state.prize = prize;
                    this.setState({ prize: this.state.prize, complete: true })
                  })
                } else if(res.indexOf('That answer was incorrect.') > -1) {
                  if(res.indexOf('greater than') > -1) {
                    const upper = 10;
                    const lower = (this.state.questions[4].answer + 1);
                    const number = Math.floor(Math.random() * (upper - lower) + 1);
                    this.guesseroo(number,upper,lower);
                    console.log('greater', number, lower,upper);
                    return axios({
                      method: 'post',
                      data: { answer: this.state.questions[4].answer },
                      url: `http://dev-challenge.thisplace.com${this.state.questions[4].endpoint}`,
                      withCredentials: false
                    })
                    
                  } else if(res.indexOf('less than') > -1) {
                    const upper = (this.state.questions[4].answer - 1);
                    const lower = 0;
                    const number = Math.floor(Math.random() * (upper - lower) + 1);
                    this.guesseroo(number,upper,lower);
                    console.log('lower', number, lower,upper);
                    return axios({
                      method: 'post',
                      data: { answer: this.state.questions[4].answer },
                      url: `http://dev-challenge.thisplace.com${this.state.questions[4].endpoint}`,
                      withCredentials: false
                    })
                  }
                }
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

  guesseroo = (number, upper, lower) => {
    // Get the actual question
    const question = this.state.questions[4].question;
    const sub = question.substring(question.indexOf("Guess a number"),question.indexOf("?"));

    // Update the question state with the actual question
    this.state.questions[4].question = `${sub}?`;
    this.setState({ questions: this.state.questions });

    const guess = number;
    const answer = guess;
    this.state.questions[4].answer = answer;
    this.setState({ questions: this.state.questions });
  }

  render() {
    return (
      <div className="App">
        <h1>This Place Dev Challenge</h1>
        <form className="form" onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Name" value={this.state.name} onChange={this.handleNameChange} />
          <button>Let's Go!</button>
        </form>
        <div className="answers">
          {this.state.questions.map(question => {
            return (
              <div clasName="questions">
                { question.question && <p className="question">{question.question}</p> }
                <p className="answer">{question.answer}</p>
              </div>
            );
          })}
        </div>
        <div className="displayPrize">
          { this.state.prize && this.state.prize }
        </div>
      </div>
    );
  }
}

export default App;
