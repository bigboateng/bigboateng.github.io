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
        this.newTerminal =
            "<p>Last login: Tue Nov 7 03:27:48 on ttys000 |           |Theme: <select id=\"themeSelector\">\n" +
            "        <option value=0>Black</option>\n" +
            "        <option value=1>White</option>\n" +
            "    </select></p>\n" +
            "    <p><span class=\"green\"></span> - you're in boateng's cli! type `help` to get started.</p>\n" +
            "    <p class=\"hidden\" id=\"hidden\">\n" +
            "        <span class=\"prompt\">\n" +
            "          <span class=\"root\">root</span>\n" +
            "          <span class=\"tick\">❯</span>\n" +
            "        </span>\n" +
            "        <span contenteditable=\"true\" id=\"input\"></span>\n" +
            "    </p>";

    }

    static init() {
        $(body).css('background-color', "#30353a");
    }


    setListeners(terminal) {

        terminal.addEventListener("keypress", (event) => {
            let key = event.keyCode;
            if (key === this.commandKeys.enter) {
                // get the commands
                let prompt = event.target; // What triggered the keypress event
                let input = prompt.textContent.trim().split(" ");
                let command = input[0];
                let args = input[1];
                if (command === "clear") {
                    this.clearTerminal();
                } else if (command && command in this.commands) {
                    // handle the command
                } else {
                    this.terminal.innerHTML += 'Error: command not recognized';
                    this.resetPrompt(prompt);
                }
                event.preventDefault();
            }
        })
    }


    clearTerminal() {
        this.terminal.innerHTML = this.newTerminal;
        let input = document.getElementById("input");
        input.focus();
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
        this.terminal.append(copy);
        copy.querySelector('#input').innerHTML = '';
        copy.querySelector('#input').focus();
    }

}


// Deals with the command line interface
class Cli {

}