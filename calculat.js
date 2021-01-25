// code goes here  
//----------------------------------------------------//
//easy solution 1 with eval but don't working with exemple
// (2-0)(6/2) =(need '*')=> (2-0)*(6/2) */
  /*
  function StringCalculate(str) { 

           let res1= eval(str);
           return res1; 

  }
  */
//let's go with the lang way :p ;)
//----------------------------------------------------//

//return array of item for evaluate the mathematical expression
function tokenize(str){
    var resultat=[];
    var tokenRegExp=/\s*([A-Za-z]+|[0-9]+|[\+\-\/\*\**]+|\S)\s*/g;
    var m;
    while((m=tokenRegExp.exec(str)) !== null){
      resultat.push(m[1]);
    }
    return resultat;
  }
  
  //test si operator
  
  function isOperation(token){
    return token !== undefined && token.match(/^[\+\-\/\*\**]+$/) !== null;
  }
  
  //test si number
  
  function isNumber(token){
    return token !== undefined && token.match(/^[0-9]+$/) !== null;
  }
  
  //pour regler le cas comme exemple (4+1)(5**2)
  
  function tokenize2(arr){
    for (var i=0;i<arr.length;i++){
      if(arr[i]=='('){
        if(arr[i-1] === ')' || Number.isInteger(Number(arr[i-1]))){
          arr.splice(i,0,'*');
        }
      }
      if(arr[i]==')'){
        if(Number.isInteger(Number(arr[i+1]))){
          arr.splice(i+1,0,'*');
        }
      }
    }
    return arr;
  }
  
  
  function StringCalculate(str){
  
    var tokens= tokenize2(tokenize(str));
    var position=0;
  
    function peek(){
      return tokens[position];
    }
  
    function consume(token){
      var assert=require('assert');
      assert.strictEqual(token,tokens[position]);
      position++;
    }
  
    //primary expression: [num] or [operation] or ["(" expr ")"]
  
    function parsePrimaryExpr(){
      var t= peek();
      if(isNumber(t)){
        consume(t);
        return {type:"numbre",value:t};
      }else if(isOperation(t)){
        consume(t);
        return {type:"operation",id:t};
      }else if(t === ("(")){
        consume(t);
        var expr= parseExpr();
        if(peek()!== ")"){
          throw new SyntaxError("Expected )");
        }
        consume(")");
        return expr;
      }else{
        throw new SyntaxError("Expected a number, a variable, or parentheses");
      }
    }
  
    function parsePowExpr(){
      var expr= parsePrimaryExpr();
      var t= peek();
  
      while (t==="**"){
        consume(t);
        var r= parsePrimaryExpr();
        expr={type:t,left:expr,right:r};
        t=peek();
      }
      return expr;
    }
  
    function parseDivExpr(){
      var expr= parsePowExpr();
      var t= peek();
  
      while (t==="/"){
        consume(t);
        var r= parsePowExpr();
        expr={type:t,left:expr,right:r};
        t=peek();
      }
      return expr;
    }
  
    function parseMulExpr(){
      var expr= parseDivExpr();
      var t= peek();
  
      while (t==="*"){
        consume(t);
        var r= parseDivExpr();
        expr={type:t,left:expr,right:r};
        t=peek();
      }
      return expr;
    }
  
    function parseExpr(){
      var expr= parseMulExpr();
      var t= peek();
  
      while (t==="+" || t==="-"){
        consume(t);
        var r= parseMulExpr();
        expr={type:t,left:expr,right:r};
        t=peek();
      }
      return expr;
    }
  
    var resultat= parseExpr();
  
    return resultat
  
  }
  
  function evaluate(obj){
    switch (obj.type){
      case 'numbre': return parseInt(obj.value);
      case '+': return evaluate(obj.left) + evaluate(obj.right);
      case '-': return evaluate(obj.left) - evaluate(obj.right);
      case '*': return evaluate(obj.left) * evaluate(obj.right);
      case '/': return evaluate(obj.left) / evaluate(obj.right);
      case '**': return evaluate(obj.left) ** evaluate(obj.right);
    }
  }
     
  // keep this function call here 
  console.log(evaluate(StringCalculate(readline())));
  //console.log(tokenize2( tokenize(readline())));
  
  