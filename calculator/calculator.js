
let currentOperation = localStorage.getItem('currentOperation') || '0';
let result = localStorage.getItem('result') || 0; 
document.querySelector('.operationLine-p').innerText = currentOperation;



function updateLineNumber(thisNumber)
{
  if (document.querySelector('.operationLine-p').innerText === '0')
    currentOperation = '';
  currentOperation += thisNumber;
  console.log(currentOperation);
  localStorage.setItem('currentOperation',currentOperation); 
  document.querySelector('.operationLine-p').innerText = currentOperation;
}

function updateLineOperator(thisNumber)
{
  currentOperation += thisNumber;
  console.log(currentOperation);
  localStorage.setItem('currentOperation',currentOperation); 
  document.querySelector('.operationLine-p').innerText = currentOperation;
}

function calculateLine()
{
  if (currentOperation != '')
  {
    result = eval(currentOperation);
    currentOperation = result.toString();
    localStorage.setItem('currentOperation',currentOperation);
    document.querySelector('.operationLine-p').innerText = currentOperation;
  }
  else
  {
    console.log('0');
    document.querySelector('.operationLine-p').innerText = currentOperation;
  }
}

function clearLine()
{
  currentOperation = '0';
  result = 0;
  localStorage.removeItem('currentOperation');
  localStorage.removeItem('result');
  console.log(0);
  document.querySelector('.operationLine-p').innerText = currentOperation;
}

function deleteLine()
{
  if (currentOperation.length === 1) {
    currentOperation = '0';
  } else {
    currentOperation = currentOperation.substring(0,currentOperation.length-1);
  }
  document.querySelector('.operationLine-p').innerText = currentOperation;
  localStorage.setItem('currentOperation', currentOperation);
}