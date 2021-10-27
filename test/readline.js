const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const getValue = (question) => {
    return new Promise((res) => {
        rl.question(question, (answer) => {
            if (answer === "q") rl.close();
            else res(answer);
        });
    });
}

const calculator = async () => {
    const a = await getValue("Введіть перше число: ");
    const b = await getValue("Введіть друге число: ");
    rl.close();
    console.log("сума:", +a + +b);
}

calculator();
