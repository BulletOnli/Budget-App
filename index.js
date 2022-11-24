// Inputs 
const inputBudget = document.querySelector('.inputBudget')
const inputSavings = document.querySelector('.inputSavings')
const inputAmountSpent = document.querySelector('.inputAmountSpent')
const inputWithdraw = document.querySelector('.inputWithdraw')
// Bottons 
const addBudgetBtn = document.querySelector('.addBudgetBtn')
const addSavingsBtn = document.querySelector('.saveBtn')
const AddExpenseBtn = document.querySelector('.AddExpenseBtn')
const withdrawBtn = document.querySelector('.withdrawBtn')
// text Contents
const totalBudgetEl = document.querySelector('.totalBudget')
const totalExpenseEl = document.querySelector('.totalExpense')
const savingsEl = document.querySelector('.savings')
const balanceEl = document.querySelector('.balance')
// Expense List
const expenseContainer = document.querySelector('.expensesContainer')
const expTitle = document.querySelector('.inputExpenseTitle')

let totalBudget = 0
let totalExpense = 0
let savings = 0
let balance = 0

addBudgetBtn.addEventListener('click', () => {
    // Total Budget
    totalBudget += Number(inputBudget.value)
    totalBudgetEl.textContent = totalBudget

    // Auto save 10% from the added money
    const autoSave = inputBudget.value * .10 
    savings += autoSave
    savingsEl.textContent = savings

    // Compute the balance after saving money
    balance += inputBudget.value - autoSave
    balanceEl.textContent = balance

    inputBudget.value = ''
})

addSavingsBtn.addEventListener('click', () => {
    if (balance > 0 && inputSavings.value <= balance) {
        savings += Number(inputSavings.value)
        savingsEl.textContent = savings
    
        // Update Balance
        balance -= Number(inputSavings.value)
        balanceEl.textContent = balance
    } else {
        errorMessage.style.display = 'block'
    }

    inputSavings.value = ''
})

AddExpenseBtn.addEventListener('click', () => {
    if (balance > 0 && inputAmountSpent.value <= balance && expTitle.value !== '' && inputAmountSpent.value !== '') {
        totalExpense += Number(inputAmountSpent.value)
        totalExpenseEl.textContent = totalExpense

        // Update Balance
        balance -= Number(inputAmountSpent.value)
        balanceEl.textContent = balance

        createExpense()
    }

    expTitle.value = ''
    inputAmountSpent.value = ''
})

withdrawBtn.addEventListener('click', () => {
    if (savings > 0 && inputWithdraw.value <= savings) {
        savings -= Number(inputWithdraw.value)
        savingsEl.textContent = savings
    
        // Update Balance
        balance += Number(inputWithdraw.value)
        balanceEl.textContent = balance

        // Render withdrawals info in container
        createWithdraw()
    }
        
    inputWithdraw.value = ''
})

// Expense List

let expenses = []

function createExpense() {
    expenses.push({
        title: expTitle.value,
        amount: inputAmountSpent.value
    })

    renderExpense()
    console.log(expenses)
}

function renderExpense() {
    expenseContainer.innerHTML = ''

    expenses.forEach(expense => {
        const p = document.createElement('p')
        p.className = 'expenseTitle'
        p.innerText = `• ${expense.title}`

        const span = document.createElement('span')
        span.className = 'expenseAmount'
        span.innerText = `P ${expense.amount}`
        p.appendChild(span)

        expenseContainer.appendChild(p)
    })
}


// Withdrawls
const withdrawalContainer = document.querySelector('.withdrawalContainer')

let withdrawals = []

function createWithdraw() {
    const date = new Date()
    const month = date.getMonth() + 1
    const day = date.getDay()
    const year = date.getUTCFullYear()
    const fullDate = `${month} / ${day} / ${year}`

    console.log(fullDate)
    withdrawals.push({
        withdrawValue: inputWithdraw.value,
        dateIssued: fullDate
    })

    renderWithdraw()
}

function renderWithdraw() {
    withdrawalContainer.innerHTML = ''

    withdrawals.forEach(withdrawal => {
        const p = document.createElement('p')
        p.className = 'withdrawEl'
        p.innerText = `Withdraw P${withdrawal.withdrawValue} on ${withdrawal.dateIssued}`
        console.log(withdrawal.withdrawValue)

        withdrawalContainer.appendChild(p)
    })
}
