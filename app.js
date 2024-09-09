const formulario = document.getElementById('form');
const buttons = document.querySelectorAll('.btn');
const btnReset = document.getElementById('btn_reset');
const spanErrorElement = document.getElementById('error__span');
const divError = document.getElementById('input_numPerson');
const divErrorBill = document.getElementById('input_bill');
const inputBill = document.getElementById('bill');
const inputNumPerson = document.getElementById('numerPerson');
const inputCustom = document.getElementById('custom');
const spanErrorBill = document.getElementById('error__bill');
const resultAmountElement = document.getElementById('resultAmount');
const resultPersonElement = document.getElementById('resultPerson');

function validNumPerson(value) {
    const onlyNumber = /^[0-9]+.*$/;
    if(value === 0) return "No puede ser cero"; 
    if(!onlyNumber.test(value)) return "Solo se permiten numeros";
    return "";
}

function handleClick(e) {
    const campOcultoExistente = document.querySelector('input[name="botonSeleccionado"]');
    if (e.target.id === 'custom') {
        if (campOcultoExistente) {
            campOcultoExistente.remove();
        }
        handleForm(e);
    } else {
        if (campOcultoExistente) {
            campOcultoExistente.remove();
        }
        const nuevoCampo = document.createElement('input');
        nuevoCampo.type = 'hidden';
        nuevoCampo.name = 'botonSeleccionado';
        nuevoCampo.value = this.getAttribute('value');
        
        formulario.appendChild(nuevoCampo);
        handleForm(e);
    }

}

function calcultePercentage(datos, numPerson) {
    let resultAmount = 0;
    if (datos.botonSeleccionado) {
        console.log('button');
        
        resultAmount = (datos.bill * (datos.botonSeleccionado / 100)) / numPerson;
    }else {
        console.log('input');
        
        resultAmount = (datos.bill * (datos.custom / 100)) / numPerson;
    }
    return resultAmount;
}

function handleForm(e) {
    e.preventDefault();
    
    const formData = new FormData(formulario);
    const datos = Object.fromEntries(formData.entries());
    const numPerson = Number(datos.numerPerson);
    const bill = Number(datos.bill);
    
    const isValidNumPerson = validNumPerson(numPerson);
    const isValidBill = validNumPerson(bill);
    

    if (isValidBill) {
        spanErrorBill.classList.add('message__error');
        divErrorBill.classList.add('active_error');
        spanErrorBill.textContent = isValidBill;
    }else {
        spanErrorBill.textContent = isValidBill;
        divErrorBill.classList.remove('active_error');
    }

    if (isValidNumPerson) {
        spanErrorElement.classList.add('message__error');
        divError.classList.add('active_error');
        spanErrorElement.textContent = isValidNumPerson;
    } else {
        console.log(datos);
        
        let resultAmount = calcultePercentage(datos, numPerson);
        let totalPerPerson = (datos.bill / numPerson) + resultAmount;
    
        spanErrorElement.textContent = isValidNumPerson;
        divError.classList.remove('active_error');
        resultAmountElement.textContent = resultAmount.toFixed(2);
        resultPersonElement.textContent = totalPerPerson.toFixed(2);
    }
}

inputBill.addEventListener('input', handleClick);
inputNumPerson.addEventListener('input', handleClick);
buttons.forEach(btn => {
    btn.addEventListener('click', handleClick);
});
inputCustom.addEventListener('input',handleClick);
btnReset.addEventListener('click', () => {
    resultAmountElement.textContent = '$0.00';
    resultPersonElement.textContent = '$0.00';
    spanErrorBill.textContent = "";
    spanErrorElement.textContent = "";
    divError.classList.remove('active_error');
    divErrorBill.classList.remove('active_error');
    inputBill.value = '';
    inputNumPerson.value = '';
    inputCustom.value = '';
});

