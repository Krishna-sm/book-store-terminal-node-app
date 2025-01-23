function sum(a,b){
    return a + b;
}
function sub(a,b){
    return a - b;
}

function square(a,b){
    return {
        a: a * a,
        b: b * b
    };
}

module.exports= {
    sum: sum,
    sub: sub,
    square: square
}