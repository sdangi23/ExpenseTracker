const token = localStorage.getItem('token');

document.addEventListener('DOMContentLoaded', () => {
    var btn = document.getElementById('submit');
    btn.addEventListener('click', (e) => {
        var expenseAmount = document.getElementById('money').value;
        var description = document.getElementById('description').value;
        var category = document.getElementById('category').value;

        e.preventDefault();

        const obj = {
            expenseAmount: expenseAmount,
            description: description,
            category: category
        }
        axios.post('http://localhost:3000/user/addexpense', obj, { headers: {"Authorization" : token} })
            .then(res => {
                console.log(res);
                alert('Added');
                document.getElementById('money').value = "";
                document.getElementById('description').value = "";

            })
            .catch(err => {
                console.log(err);
            })
    })
});

window.addEventListener('load', ()=> {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:3000/user/getexpenses', { headers: {"Authorization" : token} }).then(response => {
        if(response.status === 200){
            response.data.expense.forEach(expense => {

                addexpense(expense);
            })
        } else {
            throw new Error();
        }
    })
});

function addexpense(expense){
    const parentElement = document.getElementById('record');
    const expenseElemId = `expense-${expense.id}`;
    parentElement.innerHTML = parentElement.innerHTML + `
        <li class='list-group-item' id =${expenseElemId}>
        ${expense.expenseAmount} -${expense.description} -${expense.category}
        <button class='btn btn-danger' onclick='deleteExpense(event, ${expense.id})'> Del </button>
        </li>`
}

function deleteExpense(e, expenseid){
    //const token = localStorage.getItem('token');
    axios.delete(`http://localhost:3000/user/deleteexpense/${expenseid}`, {headers:{"Authorization":token}}).then(response => {
        if(response.status === 204){
            removeExpensefromUI(expenseid);
        }else{
            throw new Error('Failed to Delete');
        }
    }).catch(err => {
        console.log(err);
    })
}

function removeExpensefromUI(expenseid){
    const expenseElemId = `expense-${expenseid}`;
    document.getElementById(expenseElemId).remove();
}