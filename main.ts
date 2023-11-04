import inquirer from "inquirer";
import chalk from "chalk"



const apiLink = "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple"


let fetchData = async (data: string) => {
    let fetchQuiz = await fetch(data)
    let res = await fetchQuiz.json()
    return res.results
}

let data = await fetchData(apiLink) 
// console.log(data)

let quizStart = async () => {
    let score = 0;
    let name = await inquirer.prompt({
        type: "input",
        name: "name",
        message: "Enter your full name:"
    })

    for (let i = 0; i < 10; i++) {
        let answers = [...data[i].incorrect_answers, data[i].correct_answer]
        let quiz = await inquirer.prompt({
            type: "list",
            name: "Quiz",
            message: `\nSelect an correct option:\nQ${i + 1}) ${data[i].question}\n`,
            choices: answers.map(val => val)
        })
        if (quiz.Quiz == data[i].correct_answer) {
            ++score
        }
    }
    let result = score >= 5 ? `${chalk.green.italic("Pass")}` : `${chalk.red.italic("Fail")}`
    console.log(`\n\n${chalk.blue.italic("Dear", name.name)}\n${chalk.blue.italic("Score:", score)}\n${chalk.blue.italic("Grade:", result)}\n`)
}

quizStart()