function sum(...args) {
  if(args.length === 0){
    return 0;
  }
  let sums = args[0];
  sums += sum(...args.slice(1));
  return sums;
}

console.log(sum(1,2,3,4,5));


Function.prototype.myBind = function (obj) {
  let args = Array.prototype.slice.call(arguments, 1);
  let that = this;
  return function() {
    const args2 = Array.from(arguments);
    that.apply(obj, args.concat(args2));
  };
};

Function.prototype.myBind2 = function (obj, ...args) {
  // let that = this;
  return (...args2) => {
    this.apply(obj, args.concat(args2));
  };
};

class Cat {
  constructor(name) {
    this.name = name;
  }

  says(sound, person) {
    console.log(`${this.name} says ${sound} to ${person}!`);
    return true;
  }
}

const markov = new Cat("Markov");
const breakfast = new Cat("Breakfast");

markov.says("meow", "Ned");
// Markov says meow to Ned!
// true

// bind time args are "meow" and "Kush", no call time args
markov.says.myBind2(breakfast, "meow", "Kush")();
// Breakfast says meow to Kush!
// true

// no bind time args (other than context), call time args are "meow" and "me"
markov.says.myBind2(breakfast)("meow", "a tree");
// Breakfast says meow to a tree!
// true

// bind time arg is "meow", call time arg is "Markov"
markov.says.myBind2(breakfast, "meow")("Markov");
// Breakfast says meow to Markov!
// true

// no bind time args (other than context), call time args are "meow" and "me"
const notMarkovSays = markov.says.myBind2(breakfast);
notMarkovSays("meow", "me");
// Breakfast says meow to me!
// true

function curriedSum(numArgs){
  const numbers = [];

  const _curriedSum = function(num){
    numbers.push(num);
    if(numbers.length === numArgs){
    console.log('finished');
    return sum(...numbers);
    }
    else{
      return _curriedSum;
    }
  };
  return _curriedSum;
}

const notOurSum = curriedSum(4);

console.log(notOurSum(5)(30)(20)(1));

Function.prototype.curry = function (numArgs) {
  const numbers = [];
  // let that = this;
  const _curryCurry = function (num) {
    numbers.push(num);
    if(numbers.length === numArgs){
    // return that(...numbers);
    return this(...numbers);
    }
    else{
      return _curryCurry;
    }
  }.bind(this);
  return _curryCurry;
};

function sumThree(num1, num2, num3, num4) {
  return num1 + num2 + num3 + num4;
}
console.log(sumThree.curry(4)(5)(30)(20)(1));
