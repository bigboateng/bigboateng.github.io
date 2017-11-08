class Terminal {

    constructor() {
        let input = document.getElementById("input");
        input.focus();
        this.setListeners();
    }

    setListeners() {
        // First element is theme selector
        let themeSelect = document.getElementById("themeSelector");
        let mainBody = document.getElementById("body");
        themeSelect.addEventListener('change', () => {
            switch (themeSelect.value) {
                case 0: // White
                    console.log(themeSelect.value);
                    mainBody.style.backgroundColor = "#ffffff";
                    break;
                case 1: // Dark
                    console.log(themeSelect.value);
                    mainBody.style.backgroundColor = "#30353a";
                    break;
                default: // Dark
                    console.log(themeSelect.value);
                    mainBody.style.backgroundColor = "#30353a";
                    break;

            }
        });
    };

}