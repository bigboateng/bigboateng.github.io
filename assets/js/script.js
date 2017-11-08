document.addEventListener("DOMContentLoaded", () => {

    const terminalWindow = document.getElementById('terminal');
    const terminal = new Terminal(terminalWindow);


    $("#themeSelector").on("change", () => {
        let value = $("#themeSelector").val();
        if (value === 0) { // Dark
            $(body).css('background-color', "#30353a");
        } else {
            $(body).css('background-color', "#30353a");
        }
    });

});