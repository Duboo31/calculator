// DOM
const display1El = document.querySelector(".display-1");
const display2El = document.querySelector(".display-2");
const tempResultEl = document.querySelector(".temp-result");
const numbersEl = document.querySelectorAll(".number");
const operationEl = document.querySelectorAll(".operation");
const equalEl = document.querySelector(".equal");
const clearAllEl = document.querySelector(".all_clear");

// VARIABLES
let display1Num = "";
let display2Num = "";
let result = null;
let lastOperation = "";
let haveDot = false;

// FUNCTIONS

// number click Event
numbersEl.forEach(number => {
    number.addEventListener("click", (e) => {
			  // .의 중복 유무 체크
        if(e.target.innerText === "." && !haveDot) {
            haveDot = true;
        } else if(e.target.innerText === "." && haveDot) {
            return;
        }
				// 클릭한 숫자 변수에 넣고 변수 값을 출력
        display2Num += e.target.innerText;
        display2El.innerText = display2Num;
    })
})

//  operation click Event
operationEl.forEach(operation => {
    operation.addEventListener("click", (e) => {
			  // 처음에 아무값도 없을 경우 아무것도 하지 않음
        if(!display2Num) {
            return;
        }
				// 두번째 값에.을 다시 쓸 수 있도록
        haveDot = false;
				// 기호를 변수에 넣음
        const operationSymbol = e.target.innerText;
        if(display1Num && display2Num && lastOperation) {
            mathOperation();
        } else {
            result = parseFloat(display2Num);
        }
        clearVar(operationSymbol);
        lastOperation = operationSymbol;
    })
});

function clearVar(name = "") {
    display1Num += `${display2Num} ${name} `;
    display1El.innerText = display1Num;
    display2El.innerText = "";
    display2Num = "";
    tempResultEl.innerText = result;
}

function mathOperation() {
    if(lastOperation === "×") {
        result = parseFloat(result) * parseFloat(display2Num);
    } else if(lastOperation === "+") {
        result = parseFloat(result) + parseFloat(display2Num);
    } else if(lastOperation === "−") {
        result = parseFloat(result) - parseFloat(display2Num);
    } else if(lastOperation === "÷") {
        result = parseFloat(result) / parseFloat(display2Num);
    } else if(lastOperation === "%") {
        result = parseFloat(result) % parseFloat(display2Num);
    }
}


// EVENTS
equalEl.addEventListener("click", (e) => {
    if(!display1Num || !display2Num) {
        return;
    }
    haveDot = false;
    mathOperation();
    clearVar();
    display2El.innerText = result;
    tempResultEl.innerText = "";
    display2Num = result;
    display1Num = "";
});

clearAllEl.addEventListener("click", (e) => {
    display1El.innerText = "0";
    display2El.innerText = "0";
    display1Num = "";
    display2Num = "";
    result = "";
    tempResultEl.innerText = "0";
		haveDot = false;
});


//  ---------------------------------- window keydown Event ----------------------------------
window.addEventListener("keydown", (e) => {
    if(
        e.key === "0" ||
        e.key === "1" ||
        e.key === "2" ||
        e.key === "3" ||
        e.key === "4" ||
        e.key === "5" ||
        e.key === "6" ||
        e.key === "7" ||
        e.key === "8" ||
        e.key === "9" ||
        e.key === "."
    ) {
        clickButtonEl(e.key);
    } else if(
        e.key === "+" ||
        e.key === "/" ||
        e.key === "%"
    ) {
        clickOperation(e.key);
    } else if(e.key === "*") {
        clickOperation("×");
    } else if(e.key === "-") {
        clickOperation("−");
    } else if(e.key === "?") {
        clickOperation("÷");
    } else if(e.key === "Enter" || e.key === "=") {
        ClickEqual();
    }
});

function clickButtonEl(key) {
    numbersEl.forEach(button => {
        if(button.innerText === key) {
            button.click();
        }
    })
};

function clickOperation(key) {
    operationEl.forEach(button => {
        if(button.innerText === key) {
            button.click();
        }
    })
};

function ClickEqual() {
    equalEl.click();
};