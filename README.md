Task: 

http://dev-challenge.thisplace.com/

Welcome, this is the server for the This Place developer challenge.
Your task is to write a program that will correctly answer a series of questions without human assistance.
Each correct answer will reveal the location of the next question. There are 5 questions in total.

To begin, make a POST request to /hello, use the field `name` to set your name.

Get program running:
- Issue hosting this program on Github pages due to insecure data requests
- Had an issue with CORS so installed Allow-Control-Allow-Origin: * extension for chrome to get this working
- Clone repo and run yarn start or npm start


Overall Plan:
- Create an input field to type in name and a submit button that will trigger the post request to begin program
- Store the response data in a variable and extract the endpoint for the next question
- Make a get request to retrieve and then store the next question
- Create and run a function to solve the question and then make a post request with the answer
- Complete posting answers and retrieving questions until the program runs until the end
- Store response data in the App's state so that it is accessible anywhere in the program
- Update the view to display question and answers as they are retrieved to show visual feedback on how the program ran

Questions Plan:
- 1 & 2: Detect the numbers in the question, stores them and find out what calculation to do with the numbers.
- 3 & 4: Find the word in the question to manipulate, the number to use in the calculation and whether it is at the start or the end of the word.
- 5: Guess the random number from the question. Start at a midpoint and figure if previous answer is higher or lower and then finetune the calculation to determine the lower and upper bounds each time the function is looped through.








