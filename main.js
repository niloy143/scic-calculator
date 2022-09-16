const assignmentGrid = () => {
    let assignmentAmount = Number(totalAssignment.value);
    assignmentAmount = (assignmentAmount>0 && assignmentAmount<=99) ? assignmentAmount : 12;
    
    assignmentContainer.innerHTML = '';

    for (let i=0; i<assignmentAmount; i++) {
        const createdDiv = document.createElement('div');
        createdDiv.classList.add('bg-green-400', 'rounded', 'p-5', 'flex', 'flex-col', 'items-center', 'gap-3');
        createdDiv.innerHTML = `
            <h2 class="text-2xl font-semibold text-center">Assignment ${i+1}</h2>
            <div class="w-full flex items-center justify-around gap-3 text-xl">
                <label for="">Obtained:</label>
                <input class="w-12 py-1 rounded text-center font-semibold" type="text" placeholder="0" oninput="obtainedInput(this)" value="60">
            </div>
            <div class="w-full flex items-center justify-around text-xl">
                <label for="">Submitted in: </label>
                <select class="w-12 rounded bg-white/0 outline-none border border-white cursor-pointer" name="" id="">
                    <option value="60">60</option>
                    <option value="50">50</option>
                    <option value="30">30</option>
                </select>
            </div>
        `

        assignmentContainer.appendChild(createdDiv);
    }
    

    totalAssignment.value = assignmentAmount;
}

assignmentGrid();

const calculate = () => {
    const result = document.getElementById('result');

    const assignments = Number(totalAssignment.value);
    let finished = 0;

    const totalMarks = assignments * 60;
    const requirement = assignments * 50;
    let totalObtained = 0;
    let lessHalf = false;

    for (const assignment of assignmentContainer.children) {
        const obtained = Number(assignment.children[1].children[1].value);
        const submission = Number(submittedIn(assignment.children[2].children[1]));
        
        totalObtained += obtained;
        if(obtained) {finished++};
        if(obtained !== 0 && (obtained / submission * 100) < 50) {lessHalf = true};
    }
    
    const gapMarks = requirement - totalObtained;
    const restAssignments = assignments - finished;
    const answer = (gapMarks > 0 && restAssignments !== 0) ? ((gapMarks) / (restAssignments)).toFixed(2) : gapMarks <= 0 ? 'Fulfilled' : 'Not Fulfilled';

    const lessHalfMsg = '<span class="text-red-400 font-semibold"> Oops! You got less than 50% marks in minimum one assignment.</span>';
    const overLimitMsg = `<span class="text-red-400 font-semibold">Oops! It\'s not possible to get ${answer} out of 60'.</span>`;
    const halfOkMsg = 'you should not get less than <span class="text-yellow-200 font-semibold">50%</span> marks in any rest of assignments.';
    const limitOkMsg = `You need to get at least <span class="text-lime-400 font-semibold">${Math.ceil(answer)}</span> marks in each rest of assignments.`;
    const fulfilledMsg = `<span class="text-green-400 font-semibold">Congratulations!</span> you fulfilled the requirements.`;
    const notfulfilledMsg = `<span class="text-red-400 font-semibold">Sorry but true!</span> you couldn't fulfill the requirements.`;
    
    result.innerHTML = `
        <ul class="max-w-xs mx-auto">
            <li class="flex justify-between"><span>Total Assignment Marks:</span><span class="font-semibold text-lime-400">${totalMarks}</span></li>
            <li class="flex justify-between"><span>SCIC Requirement Marks:</span><span class="font-semibold text-lime-400">${requirement}</span></li>
            <li class="flex justify-between"><span>Assignment Finished:</span><span class="font-semibold text-lime-400">${finished}</span></li>
            <li class="flex justify-between"><span>You Obtained:</span><span class="font-semibold text-lime-400">${totalObtained}</span></li>
        </ul>
        <h3 class="text-2xl text-center text-${(answer > 60 || answer === 'Not Fulfilled') ? 'red': 'lime'}-400 font-semibold my-3">${answer}</h3>
        <p class="text-center">${answer > 60 ? overLimitMsg : (answer === 'Fulfilled' && !lessHalf) ? fulfilledMsg : (answer === 'Fulfilled' && lessHalf) ? 'But' : answer === 'Not Fulfilled' ? notfulfilledMsg : limitOkMsg} <br> ${lessHalf ? lessHalfMsg : (answer <= 60 && answer !== 'Fulfilled' && answer !== 'Not Fulfilled' ) ? halfOkMsg : ''}</p>
        `
    }
    
    calculate();