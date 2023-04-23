let numBtns = document.querySelectorAll('.btn-num')
let opBtns = document.querySelectorAll('.btn-operation')
let delBtn = document.getElementById('btn-del')
let acBtn = document.getElementById('btn-all-clear')
let equalBtn = document.getElementById('btn-equal')
let display = document.getElementById('display')

numBtns.forEach(element => {
    element.addEventListener('click',()=>{
        display.value += element.innerText
    })
});
opBtns.forEach(element => {
    element.addEventListener('click',()=>{
        display.value += element.innerText
    })
});

acBtn.addEventListener('click',()=>{
    display.value = ''
})
delBtn.addEventListener('click',()=>{
    display.value = display.value.toString().slice(0,-1)
})
const compute = (expr)=>{
    let newExpr = "";
    let i = 0;
    while(i < expr.length){
        if(expr[i] == '√'){
            if(i !== 0 && (expr[i-1] !== '+' && expr[i-1] !== '-' && expr[i-1] !== '*' && expr[i-1] !== '/' && expr[i-1] !== '%' && expr[i-1] !== '√')) return 'Invalid Expression';
            if(i == expr.length-1) return "Invalid Expression";
            if(expr[i+1] === '('){
                let tmp = "";
                let j = i+2;
                while(j < expr.length && expr[j] !== ')'){
                    tmp += expr[j];
                    j++;
                }
                if(j >= expr.length) return "Invalid Expression";
                tmp = compute(tmp);
                if(tmp === 'Invalid Expression') return tmp;
                i = j+1;
                newExpr += tmp;
            }
            else{
                let decFound = false;
                i++;
                let j = i;
                let tmp = "";
                while(j < expr.length){
                    if(!((expr[j] >= '0' && expr[j] <= '9') || expr[j] === '.')){
                        break;
                    }
                    if(decFound && expr[j] === '.') return "Invalid Expression"
                    else if(expr[j] === '.') decFound = true;
                    tmp += expr[j];
                    j++;
                }
                let num = parseFloat(tmp);
                num = Math.sqrt(num)
                newExpr += num.toString();
                i = j;
            }
        }
        else{
            newExpr += expr[i];
            i++;
        }
    }
    let res;
    try {
        res = eval(newExpr);
    } catch (error) {
        return 'Invalid Expression'
    }

    return res;
}
equalBtn.addEventListener('click',()=>{
    let exp = display.value.toString();
    let res = compute(exp);
    display.value = res.toString()
})