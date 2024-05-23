/* loop-based algorithm is more memory-saving 
iterative pow uses a single context 
*ANY RECURSION CAN BE REWRITTEN AS A LOOP
THE LOOP VARIANT USUALLY CAN BE MADE MORE EFFECTIVE */
function powWFor(x, n) {
  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}

// alert(powWFor(2, 3));

// using a for loop
function sumToWFor(n) {
  // second fastest solution
  let sum = 0;

  for (let i = 1; i < n; i++) {
    sum += i;
  }

  return sum;
}

// dynamic programming bottom-up
function fib(n) {
  let a = 1;
  let b = 1;
  for (let i = 3; i <= n; i++) {
    let c = a + b;
    a = b;
    b = c;
  }
  return b;
}

function powWRecursion(x, n) {
  if (n == 1) {
    return x;
  } else {
    return x * powWRecursion(x, n - 1);
  }
}

// recursion involves nested calls and execution stack management, which takes resources and thus is slower
function sumToWRecursion(n) {
  if (n < 2) {
    return n;
  } else {
    return n + sumToWRecursion(n - 1);
  }
}

function factorial(n) {
  //   if (n < 3) {
  //     return n;
  //   } else {
  //     return n * factorial(n - 1);
  //   }
  return n != 1 ? n * factorial(n - 1) : 1;
}

function sumToWArithmeticProgression(n) {
  // fastest solution
  return (n * (n + 1)) / 2;
}

// alert(powWRecursion(2, 3));
/* recursion depth is exactly n
execution context - internal data structure that contains details about the execution of a function 
                    where the control flow (order in which instructions are executed) is now 
                    the current variables 
                    the value of this
                    a few other details 
                    
context: { x: 2, n: 3 at line 14} call: powWRecursion(2, 3) 

// since condition n == 1 is falsy, flow continues into second branch of if
context: { x: 2, n: 3 at line 18} call: powWRecursion(2,3) 

/* current context is remembered on top of the stack 
new context is created for the subcall
when the subcall is finished, previous context is popped from the stack and its execution continues /* 
context: { x: 2, n: 2 at line 14} call: powWRecursion(2, 2) 
context: { x: 2, n: 3 at line 18} call: powWRecursion(2, 3)  remembered contexts are below the current execution context

// now 2 old contexts and 1 currently running 
context: { x: 2, n: 1 at line 14} call: powWRecursion(2, 1) returns 2
context: { x: 2, n: 2 at line 18} call: powWRecursion(2, 2) 
context: { x: 2, n: 3 at line 18} call: powWRecursion(2, 3) 
*/

function powWShorterRecursion(x, n) {
  return n == 1 ? x : x * powWShorterRecursion(x, n - 1);
}

/* another application of recursion is a recursive traversal 

staff object with departments */
let company = {
  // a dept may have an array of staff
  sales: [
    {
      name: "John",
      salary: 1000,
    },
    {
      name: "Alice",
      salary: 1600,
    },
  ],

  // a dept may be split into subdepts
  development: {
    // sites subdept may be spit into subsubdepts
    sites: [
      {
        name: "Peter",
        salary: 2000,
      },
      {
        name: "Alex",
        salary: 1800,
      },
    ],

    internals: [
      {
        name: "Jack",
        salary: 1300,
      },
    ],
  },
};

/* when my function gets a dept to sum salaries, there are 2 possible cases:
1. either it's a simple dept with an array of people, then I can sum the salaries in a simple loop
2. or it's an object with N subdepts, then I can make N recursive calls to get the sum for each of the subdeps and combine the results 

1. is the base of recursion, the trivial case
*/

function sumSalaries(department) {
  /* case 1.
    checks if the department parameter is an array*/
  if (Array.isArray(department)) {
    /* sum the array (reduce())
        reduce(), accumulates a value, prev, by adding by each employee's salary (accessed via current.salary 
        initial value for the accumulation is 0*/
    return department.reduce((prev, current) => prev + current.salary, 0);

    // case 2.
  } else {
    // variable sum is initialized to 0
    let sum = 0;

    /* iterates over each value in the department object, treating each value as a subdept
    Object.values returns an arrray of object values
        Object.values(department) extracts all the values from the department object, either of which could be
        an employee array or further nested subdepts */
    for (let subdep of Object.values(department)) {
      /* function calls itself recursively for each sub dept 
            result of each recursive call is added to the sum */
      sum += sumSalaries(subdep);
    }

    /* if the department is an arrray, the total sum of salaries from the array is returned directly
        if it's an object, the total accumulated sum of salaries from all recursive calls is returned */
    return sum;
  }
}

// alert(sumSalaries(company));

/* Recursive structures
recursive structure - data structure that replicates itself in parts
ex. a company dept is:
- either an array of people
- or an object with departments

ex. in the HTML document, an HTML tag may contain a list of:
- text pieces
- HTML comments
- other HTML tags (that in turn may contain text pieces/comments/or other tags)

Linked list
linked list might be a better alternative for arrays
problem with arrays
arr.unshift(obj) (add one or more elements to the beginning of an array)
arr.shift(obj) (removes first element fromt he array)
are expensive bc they require the renumbering of all elements to make room for or to delete a new obj 
arr.push/pop that operate with the end of an array, do not require mass-renumbering

linked list element - data structure, object with value, and next property referencing the next linked 
                      list element or null if that's the end
*/
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null,
      },
    },
  },
};

function printListWFor(list) {
  // loop does not spend resources for nested function calls
  let tmp = list;

  while (tmp) {
    console.log(tmp.value);
    tmp = tmp.next;
  }
}

printListWFor(list);

function printListWRecursion(list) {
  // recursive variant is shorter
  console.log(list.value); // output the current item

  if (list.next) {
    printListWRecursion(list.next); // do the same for the rest of the list
  }
}

printListWRecursion(list);

function printReverseListWFor(list) {
  // loop does not spend resources for nested function calls
  let arr = [];
  let tmp = list;

  while (tmp) {
    arr.push(tmp.value);
    tmp = tmp.next;
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    console.log(arr[i]);
  }
}

printReverseListWFor(list);

function printReverseListWRecursion(list) {
  if (list.next) {
    printReverseListWRecursion(list.next);
  }
  console.log(list.value);
}

printReverseListWRecursion(list);

// or
let otherList = { value: 1 };
otherList.next = { value: 2 };
otherList.next.next = { value: 3 };
otherList.next.next.next = { value: 4 };
otherList.next.next.next.next = null;

/* the otherList variable is the first object in the chain, so following next pointers from it, I can reach
any element

the list can be easily split into multiple parts and later joined back
*/
let secondList = list.next.next;
list.next.next = null;

// to join
list.next.next = secondList;

/* I can insert or remove items in any place 
to prepend a new value, I need to update the head of the list */

otherList = { value: "new item", next: list };

/* to remove a value from the middle, change next of the previous one
otherList.next jumps over 1 to value 2 and value 1 gets excluded from the chain, 
if value 1 is not stored anywhere else, it will be automatically removed from the memory */
otherList.next = otherList.next.next;

/* no mass-renumbering like with arrays, and elements can be easily rearranged 
with lists, I can't easily access an element by its number
in a list, I need to start from the first item and go next N times to get the Nth element 

when I need a queue or deque, the ordered structure must allow very fast adding/removing elements from both ends, but access to
its mdidle is not needed 

lists can be enhanced:
I can add property prev in addition to next to reference the previous element, to move back easily 
I can also add a variable named tail, referencing the last element of the list (and update it when adding/removing 
    elements from the end 
    
an exit conditions jumps me out of the recursion */
