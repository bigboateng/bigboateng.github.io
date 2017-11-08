class Terminal {

    constructor(terminal) {
        let input = document.getElementById("input");
        input.focus();
        Terminal.init();
        this.terminal = terminal;
        this.commandKeys = {
            enter: 13,
        };
        this.commands = [
            "pwd", "clear"
        ];
        this.setListeners(terminal);
    }

    static init() {
        $(body).css('background-color', "#30353a");
    }


    setListeners(terminal) {

        terminal.addEventListener('keyup', (event) => {
            console.log(event.keyCode);
        });

        terminal.addEventListener("keypress", (event) => {
            let key = event.keyCode;
            if (key === this.commandKeys.enter) {
                // get the commands
                let prompt = event.target; // What triggered the keypress event
                let input = prompt.textContent.trim();
                let command = input[0];
                let args = input[1];

                if (command === 'clear') {
                    // Clear the console TODO
                }
                if (command && command in this.commands) {
                    // handle the command
                } else {
                    this.terminal.innerHTML += 'Error: command not recognized';
                    this.resetPrompt(prompt);
                }
                event.preventDefault();
            }
        })
    }


    resetPrompt(oldPrompt) {
        /**
         <p class="hidden">
         <span class="prompt">
         <span class="root">root</span>
         <span class="tick">❯</span>
         </span>
         <span contenteditable="true" id="input"></span>
         </p>
         */
        let copy = oldPrompt.parentNode.cloneNode(true);
        oldPrompt.setAttribute('contenteditable', false); // dont make old one editable
        console.log(copy);
        this.terminal.append(copy);
        copy.querySelector('#input').innerHTML = '';
        copy.querySelector('#input').focus();
    }

}


// Deals with the command line interface
class Cli {

}