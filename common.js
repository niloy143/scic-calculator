const assignmentContainer = document.getElementById('assignment-container');

const submittedIn = select =>  select.options[select.selectedIndex].value;

const obtainedInput = (input) => {
    const select = input.parentNode.parentNode.children[2].children[1];
    const submission = submittedIn(select);

    const value = Number(input.value);
    input.value = (value>0 && value<=submission) ? value : 0;
}
