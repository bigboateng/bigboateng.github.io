class Terminal {

    constructor(terminal) {
        let input = document.getElementById("input");
        input.focus();
        Terminal.init();
        this.cli = new Cli();
        this.terminal = terminal;
        this.commandKeys = {
            enter: 13,
        };
        this.setListeners(terminal);
        this.newTerminal =
            " <p>Last login: <span id=\"datetime\">Tue Nov 7 03:27:48</span> on ttys000 |           |Theme: <select id=\"themeSelector\">\n" +
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
        Terminal.updateDateTime();

    }


    static updateDateTime() {
        let date = new Date();
        let d = document.getElementById("datetime");
        d.innerHTML = date;
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
                } else if (command && ["pwd", "help", "ls",  "view"].includes(command)) {

                    this.terminal.innerHTML += this.cli.handleCommand(command, args);
                    this.resetPrompt(event.target);

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
        Terminal.updateDateTime();
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
        Terminal.updateDateTime();
    }

}


// Deals with the command line interface
class Cli {

    constructor() {
        this.command = {};
        this.currDir = "/home";
        this.commands = ["cd", "ls", "open"];
        this.home = ["projects", "contact"];
        this.projects = ["bigboateng.github.io", "ChromeExtensionSample", "algorithms", "robosoc_eurobot_2017", "JARVIS"];
        this.currentDir = 0;
        this.init();
    }

    init() {
        this.command.pwd = () => {
            return this.currDir;
        };

        this.command.ls = () => {
            if (this.currentDir === 0) {
                return this.listToParagraph(this.projects);
            }
        };
        this.command.help = () => {
           return this.listToParagraph(this.commands);
        };
        this.command.view = (repo) => {
            if (this.projects.indexOf(repo) !== -1) {
                let url = "https://github.com/bigboateng/" +repo;
                window.open(url, '_blank');
                return `Git repo for ${repo} is opened in new tab.`
            } else {
                return "Invalid project";
            }
        }
    }

    listToParagraph(list) {
        let output = "";
        list.forEach((item)=>{
            output += `<p>${item}</p>`
        });
        return output;
    }

    handleCommand(cmd, args) {
        return this.command[cmd](args);
    }


}