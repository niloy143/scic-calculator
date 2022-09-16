const assignmentGrid = () => {
    const totalAssignment = document.getElementById('assignment-amount');
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
                <input class="w-12 py-1 rounded text-center font-semibold" type="text" placeholder="0" oninput="obtainedInput(this)" value="0">
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