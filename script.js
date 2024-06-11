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

function powWRecursion(b, e) {
  if (e == 1) {
    return x;
  } else {
    return b * powWRecursion(b, e - 1);
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
  let product = 1;
  while (n > 0) {
    product *= n;
    n--;
  }
  return product;
}

function factorialWRecursion(n) {
  return n != 1 ? n * factorialWRecursion(n - 1) : 1;
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

function countDown(n) {
  for (let i = n; i > 0; i--) {
    console.log(i);
  }
  console.log("Hooray");
}

function countDownWRecursive(n) {
  /* first thing I need to do in a recursive function is to write clause that breaks out out of the recursive 
  function; the break out statement is the exact opposite of the while condition for the for loop */
  if (n <= 0) {
    console.log("Hooray");
    return;
  }
  console.log(n);
  countDownWRecursive(n - 1);
}

/* What happens?
   countDownRecursive(3)
    countDownRecursive(2)
        countDownRecursive(1)
            countDownRecursive(0)
            return
        return
    return
  return


next, taking an input and growing it- which is very common in most recursive functions */
function sumRange(n) {
  let total = 0;
  for (let i = n; i > 0; i--) {
    total += 1;
  }
  return total;
}

/* any variable I set in this recursive function is only available to that one single version of the recursive
so I need to pass the total value to all of my recursive functions */
function sumRangeRecursive(n, total = 0) {
  // break out clause, again the opposite of the while condition for the for loop
  if (n <= 0) {
    return total;
  }

  // n - 1, emulates the looping of subtracting 1 counter
  return sumRangeRecursive(n - 1, total + n);
}

function sumRangeOtherRecursive(n) {
  if (n <= 1) {
    return n;
  }
  return n + sumRangeOtherRecursive(n - 1);
}

/* sumRangeRecursive(3, 0)
    sumRangeRecursive(2, 3)
        sumRangeRecursive(1, 5)
         sumRangeRecursive(0, 6)  
         return 6;
        return 6;
    return 6;
   return 6;
*/

function printChildrenRecursive(t) {
  if (t.children.length === 0) {
    return;
  }
  t.children.forEach((child) => {
    console.log(child.name);
    printChildrenRecursive(child);
  });
}

const tree = {
  name: "John",
  children: [
    {
      name: "Jim",
      children: [],
    },
    {
      name: "Zoe",
      children: [
        { name: "Kyle", children: [] },
        { name: "Sophia", children: [] },
      ],
    },
  ],
};

/* 
printChildrenRecursive('John');
    printChildrenRecursive('Jim');
    return;
    printChildrenRecursive('Zoe');
        printChildrenRecursive('Kyle');
        return;
        printChildrenRecursive('Sophia');
        return;
    return;
return;


checks if all elements in an array satisfy a condition defined by a callback */
function all(array, callback) {
  // creates a copy of the array to prevent modifying the original array; .slice() creates a shallow copy of the array
  var copy = copy || array.slice();

  // if the length of the copy array is 0, returns true; this is the base case for recursion
  if (copy.length === 0) return true;

  /* applies the callback function to the first element of the copy array, if the callback returns true, 
  that means the first element meets the condition, and the function proceeds to recursively check the rest of the array */
  if (callback(copy[0])) {
    // removes first element from array and focus on the next element in the subsequent recursive call
    copy.shift();

    // makes a recursive call to the all function with the modied copy
    return all(copy, callback);

    // if the callback function returns false for any element, false is returned immediately
  } else {
    return false;
  }
}

function productOfArray(array) {
  if (array.length === 0) return 1;

  return array.shift() * productOfArray(array);
}

function contains(object, searchValue) {
  // ensures that the function only attemps to recurse through genuine non-null objects
  if (typeof object !== "object" || object === null) {
    /* if the object is not an object, function directly compares it to searchValue 
        returns true if they are equal, otherwise returns false - base case for the recursion */
    return object === searchValue;
  }

  // Object.values(object) creates an array of the object's values, and iterates through each array element
  for (const value of Object.values(object)) {
    // function calls itself recursively with the current value from the object and searchValue
    if (contains(value, searchValue)) {
      // if the recursive call return true, true is immediately returned
      return true;
    }
  }

  // if the loop completes without returning true, the execution continues and the function returns false
  return false;
}

function totalIntegers(array) {
  // if the array is empty, no elements are integers
  if (array.length === 0) return 0;

  // initialize the total to 0
  let total = 0;

  // assigns first element of the array to variable first
  let first = array.shift();

  // if variable first is an array
  if (Array.isArray(first)) {
    // call totalIntegers on the first array and add the result to total
    total += totalIntegers(first);

    // if the variable first is not an array, check to see if it is an integer
  } else if (Number.isInteger(first)) {
    // if it is an integer, increment total by 1
    total += 1;
  }

  // return the updated total and call totalIntegers on the updated array (with first removed)
  return total + totalIntegers(array);
}

function printChildrenRecursive(t) {
  if (t.children.length === 0) {
    return;
  }
  t.children.forEach((child) => {
    console.log(child.name);
    printChildrenRecursive(child);
  });
}

function sumSquares(array) {
  if (array.length === 0) return 0;
  let sum = 0;

  for (let i = 0; i < array.length; i++) {
    if (Array.isArray(array[i])) {
      sum += sumSquares(array[i]);
    } else {
      sum += array[i] * array[i];
    }
  }
  return sum;
}

// retuns an array containing repetitions of the number argument
function replicate(times, number) {
  // base case for the recursion (prevents infinite recursion and handles cases where no repetition is needed)
  if (times <= 0) return [];

  /* concatenate the number array with the array returned by the recursive call 
    builds up the array one element at a time as each recursive call returns */
  return [number].concat(replicate(times - 1, number));
}

function collatz(n) {
  if (n === 1) {
    return 0;
  } else if (n % 2 == 0) {
    return 1 + collatz(n / 2);
  } else {
    return 1 + collatz(3 * n + 1);
  }
}

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

function fibs(n) {
  // initializes an empty array that will store the Fibonacci sequence
  let sequence = [];

  // initializes the previous number to 0
  let prev = 0;

  // initializes the current number to 1
  let current = 1;

  // handles the special case when no Fibonacci numbers are requested
  if (n === 0) {
    return sequence;

    // if n is 1, function adds the first Fibonacci number, 0, stored in prev, to the sequence array
  } else if (n === 1) {
    sequence.push(prev);

    // if n is 2, function adds the first two Fibonacci numbers, 0 and 1, stored in prev and current, to sequence
  } else if (n === 2) {
    sequence.push(prev);
    sequence.push(current);

    // if n is greater than 2, function first adds the first two Fibonacci numbers
  } else {
    sequence.push(prev);
    sequence.push(current);

    // loop will generate the remaining Fibonacci numbers beyond the first two
    for (let i = 3; i <= n; i++) {
      // each next number is the sum of the two preceding numbers
      let next = prev + current;

      // calculated next value is added to the sequence array
      sequence.push(next);

      // prev variable is updated to the value of current
      prev = current;

      // current variable is updated to the value of next
      current = next;
    }
  }

  // sequence array containing the Fibonacci numbers up to n terms is returned
  return sequence;
}

let sequence = fibs(8);
console.log(sequence);

function betterFibs(n) {
  let sequence = [];
  if (n === 0) return sequence;
  sequence.push(0);
  if (n > 1) {
    sequence.push(1);
    let prev = 0;
    let current = 1;
    for (let i = 2; i < n; i++) {
      let next = prev + current;
      sequence.push(next);
      prev = current;
      current = next;
    }
  }
  return sequence;
}

let betterSequence = betterFibs(8);
console.log(betterSequence);

function fibsRecursive(n) {
  if (n === 0) return [];
  if (n === 1) return [0];
  if (n === 2) return [0, 1];

  let prevSequence = fibsRecursive(n - 1);
  prevSequence.push(
    prevSequence[prevSequence.length - 1] +
      prevSequence[prevSequence.length - 2]
  );
  return prevSequence;
}

let sequenceRecursive = fibsRecursive(8);
console.log(sequenceRecursive);

/* bubble sort
  insertion sort
  selection sort
  they all have a worst case scenario run time of n squared
  we can do better than that with merge sort!
  
  merge sort - sort smaller arrays and then combine those arrays together in sorted order
  
  in pseudocode
  - sort the left half of the array (assuming n > 1)
  - sort the right half of the array (assuming n > 1)
  - merge the two halves together
  
  5   2   1   3   6   4
  
  1a. sort the left half of the array: 5, 2, 1
  5    2   1
  
  
      2a. sort the left half of array part 1: 5, a single element array must necessarily be sorted
          2   1
  
      5
  
      2b. sort the right half of the array part 1: 2 and 1
      
          3a. sort the left half of right half of the array part 1: 2 
                  1
              2
          5
  
          3b. sort the right half of the right half of the array part 1: 1
  
              2   1
          5
  
          3c. merge the two halves together: 2 and 1, 1 is the lower element
              1 gets put into the first position of a new hypothetical array
              2 gets compared to nothing, and 2 is the lower element
  
      
          5   1   2
  
      2c. merge the two halves of array part 1: 5 and 1, 2
          compare the first element of the left part with the first element of the right part 
          and make it the first element of a new array: 5 and 1, 1 is the lower element
  
          5       2   Is 5 or 2 lower? 2 is lower
          1           1 is the first element in a new array
  
          5          
          1   2       2 becomes the next element of the merging step
  
                      is 5 or nothing lower? 5 is lower 
          1   2   5   for the entire array, the left half has been sorted
  
  1b. sort the right half of the entire array: 3, 6, 4
      2a. sort the left half of array part 2: 3
  
          6   4
  
      3
  
      2b. sort the right half of the array part 2: 6 and 4
  
          3a. sort the left half of the right half of the array part 2: 6
  
                  4
              6
          3
  
          3b. sort the right half of the right half of the array part 2: 4
  
              6   4
          3
          
          3c. merge the two halves together: 6 and 4, 4 is the lower element
              4 gets put in the first position of a new hypothetical array
              6 gets compared to nothing, and 6 is the lower element
  
          
              3   4   6
      
      2c. merge the two halves of array part 2: 3, and 4, 6
          compare the first element of the left part with the first element of the right part
          and make it the first element of a new array: 3 and 4, 3 is the lower element
  
              4   6   Is 4 or nothing lower? well, 4 and 6, are known to be bigger than 3 and are already sorted 
          3           3 is the first element in a new array
  
                     
          3   4   6   Since the only numbers left are on a sorted side, they all must go down
  
  1c. merge the two halves of the entire array together
  
      1   2   3   4   5  6   Which is lower, the first element on the left, 1, or the first element on the right, 3? 1
      1   2                  Which is lower, 2 or 3? 2
      1   2   3              Which is lower, 5 or 3? 3
      1   2   3   4   5      Which is lower, 5 or 6? 5
      1   2   3   4   5   6   Which is lower, 6 or nothing? 6
  
  merge sort
  worst-case scenario - split n elements up and then recombine them, effectively doubling the sorted subarrays
                        as I build them up (combining sorted 1 element arrays into 2 element arrays, combining
                        sorted 2 element arrays into 4 element arrays) - log n run time
                        O (n log n)
  best-case scenario- array is already perfectly sorted, but I still have to split and recombine it back together
                      with this algorithm
                      omega (n log n)
  
  In the worst case or even average case, merge sort is going to be faster at the expense of maybe taking up more memory
  because I need to recombine and create new segments in memory for the sub-arrays
  
  bubble sort best-case - where the list is already sorted, bubble sort is smarter and will terminate early, giving me 
                          a better lower bound
  
  If only one number
      Quit
  Else
      Sort left half of numbers
      Sort right half of numbers
      Merge sorted halves (MERGE - COMBINING TWO SORTED LISTS, CAN BE OF DIFFERENT SIZES-CAN BE ARRAYS OR LINKED LISTS, INTO A SINGLE SORTED LIST)
          I only take the first number of each of the halves because the halves themselves are sorted
          every number after the first number in the sorted arrays, are going to be bigger than the first number
          (selection sort and bubble sort double back, merge sort doesn't)
  
  merge sort technically uses more memory
  
  7   2   5   4   1   6   0   3
  
  1a. sort the left half of the numbers, a subarray of half the size: 7, 2, 5, 4
      2a. sort the left half of the left half of the numbers: 7, 2
          3a. sort the left half of the left half of the left half of the numbers: 7
          3b. sort the right half of the left half of the left half of the numbers: 2
          3c. merge the two halves: Is 7 or 2 lower? 2 is lower
                                    Is 7 or nothing lower? 7 is lower
              now the left half of the left half of numbers is sorted
              2   7
      2b. sort the right half of the left half of the numbers: 5, 4
          3a. sort the left half of the right half of the left half of the numbers: 5
          3b. sort the right half of the right half of the left half of the numbers: 4
          3c. merge the two halves: Is 5 or 4 lower? 4 is lower
                                    Is 5 or nothing lower? 5 is lower
              now the left half of the left half of numbers is sorted
              4   5
      2c. merge the left and right halves of the left half of the numbers
          2               Is 2 or 4 lower? 2 is lower
          2   4           Is 7 or 4 lower? 4 is lower
          2   4   5       Is 7 or 5 lower? 5 is lower
          2   4   5   7   Is 7 or nothing lower? 7 is lower
  1b. sort the right half of the numbers, a subarray of half the size: 1, 6, 0, 3
      2a. sort the left half of the right half of the numbers: 1, 6
          3a. sort the left half of the left half of the right half of the numbers: 1
          3b. sort the right half of the left half of the right half of the numbers: 6
          3c. merge the two halves: Is 1 or 6 lower? 1 is lower
                                    Is 6 or nothing lower? 6 is lower
              now the left half of the left half of numbers is sorted
              1   6
      2b. sort the right half of the right half of the numbers: 0, 3
          3a. sort the left half of the right half of the right half of the numbers: 0
          3b. sort the right half of the right half of the right half of the numbers: 3
          3c. merge the two halves: Is 0 or 3 lower? 0 is lower
                                    Is 3 or nothing lower? 3 is lower
              now the left half of the left half of numbers is sorted
              0   3
      2c. merge the left and right halves of the right half of the numbers
          0               Is 1 or 0 lower? 0 is lower
          0   1           Is 1 or 3 lower? 1 is lower
          0   1   3       Is 6 or 3 lower? 3 is lower
          0   1   3   6   Is 6 or nothing lower? 6 is lower 
  1c. merge the left and right halves of the numbers 
      2   4   5   7       0   1   3   6   
      0                                   Is 2 or 0 lower? 0 is lower
      0   1                               Is 2 or 1 lower? 1 is lower
      0   1   2                           Is 2 or 3 lower? 2 is lower
      0   1   2   3                       Is 4 or 3 lower? 3 is lower
      0   1   2   3   4                   Is 4 or 6 lower? 4 is lower
      0   1   2   3   4   5               Is 5 or 6 lower? 5 is lower
      0   1   2   3   4   5   6           Is 6 or 7 lower? 6 is lower
      0   1   2   3   4   5   6   7       Is 7 or nothing lower? 7 is lower
  
  I divided an array of size 8 into 8 arrays of size 1. *base case
  I merged 2 arrays of size 1 into 4 arrays of size 2.
  I merged 4 arrays of size 2 into 2 arrays of size 4.
  I merged 2 arrays of size 4 into 1 array of size 8.
  
  Each element only gets touched once. 
  
  linear search - is searching blindly without any sorting
  binary search - requires sorting before search
  
  Libraries or frameworks usually choose the sorting algorithm for me
  */

function mergeSort(array) {
  // assign h the value of the array's highest index
  let h = array.length - 1;

  // assign l the value of the array's lowest index
  let l = 0;

  // initialize mergedArray to an empty array
  let mergedArray = [];

  // if the array has more than one element
  if (l < h) {
    // assign m the value of a rounded down midpoint
    mid = Math.floor((l + h) / 2);

    /* leftSubArray is assigned to the array resulting from a slice that starts at index 0 and goes up to,
      but not including, index mid + 1 */
    let leftSubArray = array.slice(l, mid + 1);

    /* rightSubArray is assigned to the array resulting from a slice that starts at index mid + 1 and goes up to,
      but not including, index h + 1 */
    let rightSubArray = array.slice(mid + 1, h + 1);

    // recursive calls to sort the subarrays and return the sorted results
    let sortedLeftSubArray = mergeSort(leftSubArray);
    let sortedRightSubArray = mergeSort(rightSubArray);

    // merge the sorted results
    merge(sortedLeftSubArray, sortedRightSubArray);

    function merge(leftSubArray, rightSubArray) {
      // assign m and n to the values of the leftSubArray and rightSubArray's highest indices, respectively
      let m = leftSubArray.length - 1;
      let n = rightSubArray.length - 1;

      // initialize the index for the leftSubArray, the rightSubArray, and the combined, sorted mergedArray
      let i = 0;
      let j = 0;
      let k = 0;

      // as long as either the leftSubArray oe the rightSubArray have an element
      while (i <= m && j <= n) {
        // compare the first remaining element of the leftSubArray to the first remaining element of the rightSubArray
        if (leftSubArray[i] < rightSubArray[j]) {
          // if the former is less, copy that element of the leftSubArray to mergedArray, and increment their indices
          mergedArray[k++] = leftSubArray[i++];
        } else {
          /* otherwise, the latter is less, so
            copy that element of the rightSubArray to mergedArray, and increment their indices */
          mergedArray[k++] = rightSubArray[j++];
        }
      }

      /* for any remaining elements in either the leftSubArray or the rightSubArray that have nothing to be 
        compared to, copy them to the mergedArray and increment the mergedArray's index */
      for (; i <= m; i++) {
        mergedArray[k++] = leftSubArray[i];
      }
      for (; j <= n; j++) {
        mergedArray[k++] = rightSubArray[j];
      }
    }

    // otherwise, the array only has one element and is already sorted
  } else {
    mergedArray = array;
  }

  // return the sorted arrays
  return mergedArray;
}

let mergedArray = mergeSort([105, 79, 100, 110]);
console.log(mergedArray);

/* Time Complexity
    I will spend as much, if not more, time reading code than writing it
    I need to make sure new features are integrated with ease 
    I need to understand how the choices I make impact performance, so that I can choose
    the right data structure and algorithm for my requirement
    
    How to measure time efficiency 
        running a script might be faster or slower depending on what else my computer is doing 
        measure instead, how many STEPS it takes to complete

    What is Big O

    What are the Big O notations used to measure an algorithm's efficiency

    How else can an algorithm's efficiency be measured

    What to do when 2 algorithms have the same time complexity
*/

// program that prints out all odd numbers between 1 and 10
function oddNumbersLessThanTen() {
  let currentNumber = 1; // 1 step

  while (currentNumber < 10) {
    // 1 step - 1 of 3 that goes every iteration
    // 1 step - 1 of 3 that goes every iteration
    if (currentNumber % 2 != 0) {
      // 1 step - 1 of 3 that goes every iteration
      console.log(currentNumber); // 1 step every 2 iterations
    }

    currentNumber += 1; // 1 step
  }
  // 1 last step to compare currentNumber one last time to see that it is not less than twn any more
}

oddNumbersLessThanTen();

/* 3 steps for every iteration, 9 iterations, 27 steps
1 step which iterates for only half the iterations, 5 steps
assign an initial value to currentNumber, 1 step
check the exit condition of the loop, 1 step 

oddNumbersLessThanTen takes 34 steps to complete */

function oddNumbers(maxNumber) {
  let currentNumber = 1; // 1 step

  while (currentNumber < maxNumber) {
    // 1 step - 1 of 3 that goes every iteration
    // 1 step - 1 of 3 that goes every iteration
    if (currentNumber % 2 != 0) {
      // 1 step - 1 of 3 that goes every iteration
      console.log(currentNumber); // 1 step every 2 iterations
    }
    currentNumber += 1; // 1 step
  }
}

oddNumbers(10);
// no concrete number I can use to measure code efficiency here because it changes based on external input

/* I WANT TO MEASURE HOW THE NUMBER OF STEPS OF THE ALGORITHM CHANGES WHEN THE DATA CHANGES, TELLS ME IF
THE CODE I WRITE WILL SCALE 

Asymptotic Notations, *Big O 
3 notations that measure running time of an algorithm
Big O Notation - the upper bound of an algorithm; worst-case scenario for how the algorithm will perform
Omega Notation - the lower bound of an algorithm; best-case scenario 
Theta Notation - analyzes the average case complesity of an algorithm

Big O is most commonly referenced, the worst-case scenario of any code has to be scalable as the inputs grow in my app 
From fastest to slowest -
O(1) - constant complexity
O(log n) - logarithmic complexity
O(n) - linear complexity
O(n log n) - n log n complexity
O(n^2) - quadratic complexity
O(n^3) - cubic complexity
O(2^n) - exponential complexity
O(n!) - factorial complexity

O(1) - constant complexity
if I want to look up the element at index 2, arr[2] gets me it, taking one step
*/
arr1 = [1, 2, 3, 4, 5];

// if the array doubles in size, I can still access any element in just one step
arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

/* I can keep adding data, but I can always access any element in 1 step
so it's constant, O(1) 
(technically it takes longer than 1 step because the computer has to look up where the array is in memory, and then from
the first element in the array, jump to the index argument, but the extra 2 steps are incidental) 
I am just measuring an algorithm's complexity relative to the size of the input

O(log n) - logarithmic complexity
the number of steps an algorithm takes increases by 1 as the data doubles 
ex. going from 5,000 to 10,000 data elements and only taking one additional step

Binary Search has a logarithmic complexity
it only works on sorted arrays 
*/
arr3 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
/* if I want to know if arr3 had 7, Binary Search would guess the middle index of the array and see what is there
if the number at the middle index is 6, anything to the left of that index cannot be 7
in one step, I've eliminated half the array 
Size of An Array Doubling   How Many Steps in Big O Terms to Arrive at 1 Element
1                           1
2                           2
4                           3
8                           4
16                          5
32                          6

no matter the size of the input, the function takes the same amount of time to compute 
it also has a constant space complexity - it doesn't store any values in memory */
function timesTwo(num) {
  return 2 * num;
}

// this is just one operation
let result1 = timesTwo(5); // 10

// this is just one operation
let result2 = timesTwo(2000); // 4000

/* this function still has a Big O of 1 because 2 operatons doesn't take significantly longer than 1 operation 
it also has a constant space complexity - only stores one value in memory 
if I increase the size of the input, the space in memory remains the same */
function manyTimes(num) {
  let total = 4 * num;
  return total * 3;
}

/*
time complexity - analyzing how the runtime of an algorithm changes as the input increases
space complexity - space required by an algorithm, not including inputs

there is usually a trade-off between space complexity and time complexity, to increase the speed of an algorithm, I'd
likely need to store more variables in memory 

O(n) - linear complexity
As the number of items grows, the number of steps grows at exactly the same rate
every time I iterate over an array, that's linear complexity
if I have an array of 5 items, then I can iterate every element in 5 steps
an array of 10 items can be iterated in 10 steps
an algorithm of O(n) means the number of steps will increase in line with the number of elements in the data structure

loops over the input array starting at the last item, and builds up a new array which 
ends up being the input array reversed 
this function has a Big O(n), linear time complexity, the execution time or number of operations the function has to do
increases linearly with input size */
function reverseArray(arr) {
  let newArr = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    newArr.push(arr[i]);
  }
  return newArr;
}

const reversedArray1 = reverseArray([1, 2, 3]);
const reversedArray2 = reverseArray([1, 2, 3, 4, 5, 6]);

// simple function that checks price of a product with a given name
const productList = [
  { name: "Laptop", price: 18487 },
  { name: "Keyboard", price: 356 },
  { name: "Monitor", price: 8345 },
  // ...assuming 10,000 more items
  { name: "Tablet", price: 9875 },
];

/* iterates through each element in the list until it finds the product with target game 
  Big O (n), linear time complexity */
function lookupPrice(name, list) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].name === name) {
      // when target found, prints its name and price, and then stops execution
      console.log(`Price of '${list[i].name}' is: ${list[i].price}`);
      break;
    }
  }
}

lookupPrice("Monitor", productList); // "Price of 'Monitor' is: 8345"

/* when analyzing a function eith multiple inputs, make sure a unique variable is assigned to each input */
const numbers = [1, 2, 3, 4];
const letters = ["a", "b"];

function printLists(listOne, listTwo) {
  // Big O(a)
  for (let i = 0; i < listOne.length; i++) {
    console.log(listOne[i]);
  }

  // Big O(b)
  for (let i = 0; i < listTwo.length; i++) {
    console.log(listTwo[i]);
  }
}

/* whole function has // Big O(a + b) 
looping through 2 separate arrays, any step that happens, one after another, add them 
looping 2 nested arrays, any step that is nested, multiply them */

printLists(numbers, letters);

// another function w/ O(n)
const numbers1 = [1, 2, 3, 4, 5, 6];

function printFirstHalf(list) {
  for (let i = 0; i < list.length / 2; i++) {
    console.log(list[i]);
  }
}

printFirstHalf(numbers);

const numbers2 = [1, 2, 3];

function printTwiceForNoReason(list) {
  for (let i = 0; i < list.length; i++) {
    console.log(list[i]);
  }
  for (let j = 0; j < list.length; j++) {
    console.log(list[j]);
  }
}

printTwiceForNoReason(numbers2);
// when adding complexities together, I define the constant values with numbers and scalable parts with variable names (letters)

/*
O(n log n) - n log n/linearithmic complexity
I have an algorithm that is initially O(log n) such as Binary Search, where it repeatedly breaks an array in half
each of those array halves is processed by another algorithm with a complexity of O(n)
merge sort algorithm has a O(n log n)
Cartesian tree has a O(n log n)
linearithmic time is a combination of linear time and logarithmic time
- it has an outer loop that iterates through a list (n operation)
- if it has an inner loop that is cutting down/reducing the data set on each iteration (log n operation)
- then the overall algorithm has a Big O(n log n)

merge sort has a linearithmic time complexity */
function linearithmic(n) {
  // outer loop iterates through 0 to n linearly (n)
  for (let i = 0; i < n; i++) {
    /* inner loop is log n because j is getting doubled on each loop 
    if I double the size of my input, n
    the outer loop will have twice as many iterations
    whereas the inner loop would only have 1 extra iteration */
    for (let j = 1; j < n; j = j * 2) {
      console.log("Hello");
    }
  }
}

/*
O(log n) - logarithmic complexity
logarithms - quantity representing the power to which a fixed number (the base) must be raised to produce a given number
in CS, if the base is unspecified, it is assumed to be 2, binary logarithm
*/
function logTime(arr) {
  let numberOfLoops = 0;

  // multiplies the current value of i by 2, so it goes from 1, 2, 4, 8, 16, 32
  for (let i = 1; i < arr.length; i *= 2) {
    numberOfLoops++;
  }
  return numberOfLoops;
}

/* every time I double the length of the input array, the number of operations increases linearly, by 1 each time 
in other words, the number of operations doesn't increase very much when I increase the size of the input */
let loopsA = logTime([1]); // 0
let loopsB = logTime([1, 2]); // 1
let loopsC = logTime([1, 2, 3, 4]); // 2
let loopsD = logTime([1, 2, 3, 4, 5, 6, 7, 8]); // 3
let loopsE = logTime([Array[16]]); // 4

/*
visualize log n time with a balanced binary tree
the number of nodes double with each single step down the binary tree
binary search algorithm has a Big O (log n)
- if I input a sorted array of length 16 (the bottom level of the balanced binary tree), it would only take 
4 steps (to get to the top tree node) to find the number I am looking for

these algorithms are "divide and conquer" steyle, meaning the data set is cut down/reduced upon each loop iteration
the algorithm has less data to deal with on each loop and so can find or sort things quickly

O(n^2) - quadratic complexity
this complexity is commonly seen when I loop over a data set, and within each loop, I loop over it again
ex. if my array has 3 items, the nested loops require 3^2 = 9 substeps
    adding just one more item to 4, nested loops require 4^2 = 16 substeps
    adding one more item to 5, nested loops require 5^2 = 25 substeps
    array with n items, nested loops require n^2 substeps
*/

function multiplyAll(arr1, arr2) {
  if (arr1.length !== arr2.length) return undefined;

  let total = 0;
  // first loop loops over the first array
  for (let i of arr1) {
    /* second loop, nested inside the first one, loops over the second array
        for every item I loop over in the first array, I have to loop over every item in the second array */
    for (let j of arr2) {
      // for every item in arr1, loop over item in arr2, first n^2 operation
      /* multiply every number in the first array with every number in the second array and return the sum 
            of all these products */
      total += i * j; // multiply 2 numbers, second n^2 operation
      // add to the total, third n^2 operation
      // this makes Big O(3 * n^2)
    }
  }
  return total;
}

let otherResult1 = multiplyAll([1, 2], [5, 6]); // 33
let otherResult2 = multiplyAll([1, 2, 3, 4], [5, 3, 1, 8]); // 170

/* for small inputs, I can choose the algorithm that is easiest to read or understand
*** if possible, avoid nested for loops if the input size is large
    use two separate loops instead */

/* for nested loops with 2 different inputs, Big O(a * b ) */
const drinks = ["water", "coffee"];
const persons = ["person 1", "person 2", "person 3", "person 4"];

function servingDrinks(drinkList, personsList) {
  for (let i = 0; i < drinkList.length; i++) {
    for (let j = 0; j < personsList.length; j++) {
      console.log(`Gives ${drinksList[i]} to ${personsList[i]}`);
    }
  }
}

servingDrinks(drinks, persons);
/* above, not to be confused with two nested loops iterating over the same inputs
double check when I have 2 nested loops, they don't always loop through the same list 
loops using the same input:
loop through the same array one after another: O(n), linear time
loop through same array with 2 nested loops: O(n^2), quadraitc time

compare all the existing complexities that I have, then pick the worst scaling one, the
dominant one, and drop the non-dominant terms.
*/
const fruits = ["apple", "strawberry", "watermelon"];

function printAndPair(arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  }

  const totalPairs = arr.length * arr.length;
  console.log("Estimated paired elements length: ", totalPairs);

  for (let j = 0; j < arr.length; j++) {
    for (let k = 0; k < arr.length; k++) {
      console.log(`${arr[j]} - ${arr[k]}`);
    }
  }
}

printAndPair(fruits);
// above, has O(n^2)

// Big O applies to built-in JS functions
let arr4 = [1, 2, 3, 4];

// adding and removing to the end of an array => Big O(1), constant complexity
arr4.push(5); // [1, 2, 3, 4, 5]
arr4.pop(); // [1, 2, 3]

/* adding and removing to the front of an array => Big O(n) because I have to re-index 
every item in the array, linear complexity */
arr4.unshift(0); //
arr4.shift(); //
/*
O(n^3) - cubic complexity
triple nested loops
if looping over an array with n items, 1 extra item adds an extra outer loop, an extra middle loop, and an extra innermost loop
an array of size n, I need a total of n^3 substeps
array of 3 items, nested loops requite 3^3 = 27 substeps
array of 4 items, nested loops requite 4^3 = 64 substeps
array of 5 items, nested loops requite 5^3 = 125 substeps

O(2^n) - exponential complexity
with each item added to the data size, the number of steps doubles from the previous number of steps
Size of An Array Increasing by 1  How Many Steps in Big O Terms to Arrive at 1 Element
1                                  2
2                                  4
3                                  8
4                                  16
5                                  32
6                                  64
7                                  128
an algorithm with this Big O should be avoided at all times, because I won't be processing much data quickly

algorithm with exponential time complexity - is one where the number of operations doubles every time I 
                                              increase the input by one 
ex. if input size is 1, then 2^1 = 2 operations
    if input size is 2, then 2^2 = 4 operations
    input size                      operations
    1                               2
    2                               4
    3                               8
    4                               16
    5                               32
    ...                             ...
    16                              65,536        
    
exponential time is the opposite of logarithmic time 

pass in an index number to return the nth Fibonacci number in the sequence */
function fibonacci(num) {
  // base cases
  if (num === 0) return 0;
  else if (num === 1) return 1;

  // recursive part
  return fibonacci(num - 1) * fibonacci(num - 2);
}

fibonacci(1); // 1
fibonacci(2); // 1
fibonacci(3); // 2
fibonacci(4); // 3
fibonacci(5); // 5

/*
O(n!) - factorial complexity
If I ever need to calculate permutations or combinations, I will run into algorithms with factorial complexity
if I have an array and have to work out all the combinations I can make from the array, that is a factorial complexity

Alternatives to Big O
Big Omega notation
Omega is the best case scenario of an algorithm 
*/
function findValue(arr) {
  for (let i = 0; i < arr.length; i++) {
    let item = arr[i];
    if (item === 1) {
      return item;
    }
  }
}

findValue(arr);

/* algorithm with factorial growth - traveling salesman problem 

recursive factorial algorithm 
every digit in my factorial will run its own function until it reaches 0 
each recursive layer adds its product to my original number */
function recursiveFactorial(n) {
  let num = n;
  if (n === 0) return 1;
  for (let i = 0; i < n; i++) {
    num = n * factorial(n - 1);
  }

  return num;
}

const t0 = performance.now();
recursiveFactorial(1);
const t1 = performancenow();
console.log("The function took: " + (t1 - t0) + " milliseconds.");

recursiveFactorial(1); // 0.02 ms
recursiveFactorial(2); // 0.04 ms
recursiveFactorial(10); // 42.08 ms
recursiveFactorial(12); // 5 s
recursiveFactorial(13); // 70 s
recursiveFactorial(14); //

/* in the worst case, if the item is not in the array, the algorithm has linear complexity O(n)
O(n) because if the item is not in the array, the code has to iterate on every value
but, in the best-case scenario, Omega Complexity would be O(1) if the value I was looking for is the first time in the array

Omega Notation isn't useful because it isn't likely that the item I want will be the first item in my data structure search, 
so I get no idea of how well the algorithm will scale
*/

/*
Big Theta notation
Big Theta aims to give the exact value or a useful range between narrow upper and lower bounds
if a piece of code looped every item in a an array, then it doesn't matter the size of the array, the algorithm runs in O(n) time
in its best-case and worst-case scenario 
the exact performance in all scenarios is O(n)

Why Big O
I need to be confident that my code won't lock up and leaves users frustrated if I suddenly get an input of a million items instead of 10

Algorithms with the same complexity
if I have 2 algorithms with the same complexity, does that mean they're equally good to use?
*/
function oddNumbersLessThanTenAgain() {
  let currentNumber = 1; // 1 step

  while (currentNumber < 10) {
    // 1 step - 1 of 3 that goes every iteration
    // 1 step - 1 of 3 that goes every iteration
    if (currentNumber % 2 != 0) {
      // 1 step - 1 of 3 that goes every iteration
      console.log(currentNumber); // 1 step every 2 iterations
    }

    currentNumber += 1; // 1 step
  }
  // 1 last step to compare currentNumber one last time to see that it is not less than twn any more
}
oddNumbersLessThanTenAgain();
/* this algorithm's time complexity is O(n) - as the data size increases, the number of steps of my algorithm increases at the same rate */

function oddNumbersAgain(maxNumber) {
  let currentNumber = 1; // 1 step

  while (currentNumber < maxNumber) {
    // 1 step - 1 of 3 that goes every iteration
    // 1 step - 1 of 3 that goes every iteration
    if (currentNumber % 2 != 0) {
      // 1 step - 1 of 3 that goes every iteration
      console.log(currentNumber); // 1 step every 2 iterations
    }
    currentNumber += 2; // 1 step
  }
}

oddNumbersAgain(10);
/* currentNumber is increased by 2
for an input of n, the number of steps is about half as I iterate by 2 each time 
Big O doesn't concern itself with constants, so the Big O of both algorithms is O(n)

Big-O notation  Computations for 10 elements    Computations for 100 elements   Computations for 1000 elements
O(1)            1                               1                               1
O(log n)        3                               7                               10
O(n)            10                              100                             1000
O(n log n)      33                              664                             9966
O(n^2)          100                             10000                           1000000
O(2^n)          1024                            1.26765E+30                     1.0715E+301
O(n!)           3628800                         9.3326E+157                     4.0238726E+2567

How do I reduce everything into one end result 
1. analyze and break my function into individual oeprations
2. calculate the Big O of each operation
3. sum Big O and calculate end result

Rules:
- always assume the worst case
- each input should have a unique variable
- drop the constants
- drop non-dominant terms
*/

/* Space Complexity
same notations can be used to measure how a change in input for algorithms can affect the amount of memory used
talking about primary memory here, the mwmory available to my system to execute algorithms

What is meant by space complexity
space complexity - total space used by an algorithm relative to the size of the input
auxillary space - extra space used by the algorithm, ex. temporary variables created during the execution of the algorithm  

Why is it important to consider how a algorithm uses memory space
most algorithms will deal with manageable input sizes
more likely to run into an issue with my program being slow before I have any issues with memory being used up

How is space complexity measured
O(1) - constant complexity
no matter the arguments passed to the function call, only a single value is created is O(1) */
function multiply(num1, num2) {
  return num1 * num2;
}

/* O(n) - linear complexity
n, unknown length of the array, + 1 variable called sum
O(n + 1) => O(n) */
function sumArr(arr) {
  const copyArr = arr.slice();
  let sum = 0;
  copyArr.forEach((number) => {
    sum += number;
  });
  return sum;
}

/* O(n) 
many data structures share O(n) space complexity */
function sumObjectValues(obj) {
  const copyObject = { ...obj };
  let sum = 0;
  Object.values(copyObject).forEach((value) => {
    sum += value;
  });
  return sum;
}
/*
Other complexities & considerations
What constitutes using space in the context of an algorithm?
methods that duplicate an array and object argument 
err on the side of caution and consider the space of arguments passed to my methods 

memoization - optimization technique for speeding up programs by storing the results 
of expensive function calls to pure functions and returning the cached result when the same inputs occur again
Consider readability first
Look to refactor for efficiency if there is clear impact on perforamce */
function otherSumArr(arr) {
  let sum = 0;
  arr.forEach((number) => {
    sum += number;
  });
  return sum;
}

/* consider if my code is as efficient as it could be
Am I creating unnecessary variables?
Does my algorithm use a data structure with a worse time complexity for what it's 
mostly used for than another data structure? 

memory consumption of an algorithm can be broken down into three parts:
- variables and constants
- inputs
- execution: if a function completes as soon as it is called, no extra space is needed for it to be done
             in the case of a recursive function or a function calling another function inside of itself, extra
             space is needed in order to hold the values that are waiting to be executed
*/

// O(1) space complexity
function getSum(x, y, z) {
  let sum = 0;
  sum = x + y + z;
  return sum;
}

// O(n), linear space complexity
function otherGetSum(array) {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum += array[i];
  }
  return sum;
}

/* O(n) space complexity 
Big O is still O(n) because each time the function calls itself again, space needs to be made for the 
value being stored on the stack, waiting for execution */
function anotherGetSum(array) {
  let size = array.length;
  if (size === 1) {
    return array[0];
  } else {
    // function calls itself multiple times
    return array[0] + anotherGetSum([...array.slice(1, size + 1)]);
  }
}

/* if my solution to an algorithm involves creating two hash-tables, my space complexity is going to be
a lot higher than if it only involves creating a single primitive variable 
call stack - stack data structure that stores information about the active subroutine of a program 
with recursion, every time I call the function recursively, I add one more function the call stack 
if the recursive function is establishing a variable, that variable is being established anew every time 
I call the function 

ex. I have a function that requires 2 rocks to be balanced in my hands
    every time I call the function, I add two more rocks to my pile
    I can't start putting rocks down until the function they are for finishes
    because recursion involves nesting, I'm doing a lot of things at once, 
    so that rock pile gets bigger and bigger
    
    the more levels of recursion I have, the greater the space complexity 
    I will get better performance out of my machine, the fewer functions I've got going */

/* Common Data Structures and Algorithmss
What is a data structure?
data structure - way to store data that meets the needs of my app; collection of data values, relationships 
                 among them, functions or oeprations that can be applied to the data
relational databases use B-tree indices for data retrieval
compiler implementations use hash tables to look up identifiers

different trade-offs between data structures
- how long it takes to first populate the structure
- how long it takes to add or find elements
- how large the structure is in memory 

Besides sorting algorithms, search algorithms are big
ex. traversing a data tree looking for a particular element is a problem that's common in data 
intensive apps

algorithm uses
- rearrange a bunch of numbers into sorted order
- given a road network, origin, and destination, compute the shortest path between point A to point B
- given a bunch of tasks with deadlines, want to know if accomplishing all the tasks by their 
  respective deadlines is feasible
- routing in a communication network, shortest path algorithms
- public key cryptography
- in computer graphics, I need the computational primitives
- database indices rely on balance tree data structures
- search engines use algorithms to compute the relevance of various webpages

the grade school algorithm for integer multiplcation
How many primitive operations are needed to multiply two numbers?

How many primitive operations are needed to multiple to n-digit numbers, as a function of n? 
in ballpark terms, filled out a grid of n * n, so it required a quadratic number of operations
n rows of roughly n operations
number of operations overall, approx. constant * n^2

binary search algorithm has a Big O (log n)

What are stacks and queues?
queue - concrete data structure that I need if I'm going to implement the breadth-first search algorithm
ex. at a deli - get in line
                pull a number
                wait for my number to be called
                everyone who pulled a number before me is given service before me
                when I'm the customer who's been in line the longest, my number will be called next
    enqueue - when I "start waiting", equivalent to pulling a number in the deli
    dequeue - when it's my turn to be served, equivalent of having my number called at the deli
    queues are said to be FIFO, first-in-first-out

binary search big O(log n), substantially better than linear search
              Omega is (1)

How a binary search tree is constructed from an unordered array
*/
let arr5 = [5, 7, 1, 15, 9, 2, 14, 8, 7, 3];
/*
                    0005 <--- root node
        0001                0007 <--- one 7 is descendant of the root node
                                            0015
                                    0009
            0002
                                        0014
                                0008
                            0007 <--- other 7 is further down
                0003            

this tree is not balanced but it is correctly structured
*/

/*
linked list - linear collection of data elements of any type
              principal advantage of a linked list over an array is that values can always be efficiently 
              inserted and removed without relocating the rest of the list
              BUT, random access to a certain element, and certain other operations, are slower on lists than arrays
nodes - data elements of any type 
        each node has itself a value and points to the next node in the linked list

What's the best way to implement stacks and queues in JS?
stacks and queues 
stack - data structure in which elements are sorted by insertion order
        stacks have a top and a bottom
        last element in is first out (LIFO)
        add by pushing from the top, remove by popping an item from the top
        elements have no index; so they can't be accessed in the middle of the stack
        can only add to top and remove from the top
        stacks are useful in contexts where I want to reverse the order of the elements
        ex. undo button - application stores activities performed in a stack 
                          when undo is pressed, the activity's that's undone is the last one that was performed 

queue - data structure in which elements are sorted by insertion order
        queues have a front and a back
        first in first out (FIFO)
        add/enqueue only from the back, and remove/dequeue only from the front
        elements have no index, so middle elements can't be accessed directly
        ex. managing resources - print queue
                                 website access
        

Why bother having many different search algorithms?

What are breadth-first-search (BFS) and depth-first-search (DFS)?
binary tree traversal - may want to visit all the nodes in the tree exactly once 
    what visit means is reading or processing data in the node
    binary trees are not linear data structures, like arrays and linked lists
    in a linear data structure, start with a pointer at one of the ends and keep 
    moving it to the other end
        - for each node or element, I would only have one next element 
    but in a tree, each node can be pointing to more than one possible direction

BFS and DFS are algorithms for tree traversal 
based on the order in which nodes are visited, tree traversal algorithms can be either:
(BFS and DFS are usually used to search graph data structures)
                    F
            D               J
    B           E       G       K
A       C                   I
                        H

a tree is a kind of graph
breadth-first-search - visit all the nodes at the same depth or level,
                       before visiting the nodes at next level 
    depth - number of edges in path from root node, with root node at L - O 
    BFS
    F, D, J, B, E, G, K, A, C, I, H

breadth-frst tree traversal is called level-order traversal
    for any node, I visit all its children before visiting any of its grandchildren

What can I do to visit all nodes? I can't just use one pointer.
Instead, I can, as I visit a node, I can reference or address all of its children in a queue 
then I can visit them later 
a node in the queue is called a discovered node, whose address is known to us but I haven't visited it yet 
  400  200  100  120  160  220  300  320  780  560  720
   F,   D,   J,   B,   E,   G,   K,   A,   C,   I,   H

<== 400           <==
    (F)
     Queue (FIFO)

initially start with the address of the root node in the queue, 
enqueuing the root node and by storing a node in the queue, it means storing the address of the node
starts with one discovered note

as long as the queue isn't empty, I can take out a node from the front, visit it, and then enqueue its children
enqueue the left child and then the right child

<== 200  100     <==
    (D)  (J)   
    Queue (FIFO)        now, there are 1 visited node and 2 discovered nodes  
400  
F,   

again, take out the node at the front of the queue, visit it, and enqueue its children
using a queue does 2 things:
1. as I move from a node, I am not losing reference to its children bc I store the references
2. also bc queues are FIFO, a node that is discovered first, inserted first, will be visited first

dequeue node D, before I move on from node D, I need to enqueue its children
I have 2 visited nodes, 3 discovered nodes, and 6 undiscovered nodes

<== 100  120  160   <==
    (J)  (B)  (E)
    Queue (FIFO)
400  200
F,    D, 

dequeue node J, before I move on from node J, I need to enqueue its children
I have 3 visited nodes, 4 discovered nodes, and 4 undiscovered nodes

<== 120  160  220  300 <==
    (B)  (E)  (G)  (K)
    Queue (FIFO)
400  200  100
F,   D,   J,

dequeue node B, before I move on from node B, I need to enqueue its children
I have 4 visited nodes, 5 discovered nodes, and 2 undiscovered nodes

<== 160  220  300  320  780 <==
    (E)  (G)  (K)  (A)  (C)
    Queue (FIFO)
400  200  100  120
F,   D,   J,   B,

dequeue node E
I have 5 visited nodes, 4 discovered nodes, and 2 undiscovered nodes

<== 220  300  320  780 <==
    (G)  (K)  (A)  (C)
    Queue (FIFO)
400  200  100  120  160
F,   D,   J,   B,   E

dequeue node G, before I move on from node G, I need to enqueue its children
I have 6 visited nodes, 4 discovered nodes, and 1 undiscovered nodes

<== 300  320  780  560 <==
    (K)  (A)  (C)  (I)
    Queue (FIFO)
400  200  100  120  160  220
F,   D,   J,   B,   E,   G  

dequeue nodes K, A, then C
I have 9 visited nodes, 1 discovered nodes, and 1 undiscovered nodes

<== 560 <==
    (I)
    Queue (FIFO)
400  200  100  120  160  220  300  320  780
F,   D,   J,   B,   E,   G,    K,   A,   C

dequeue node I, before I move on from node I, I need to enqueue its children
I have 10 visited nodes, and 1 discovered nodes

<== 720 <==
    (H)
    Queue (FIFO)
400  200  100  120  160  220  300  320  780  560
F,   D,   J,   B,   E,   G,    K,   A,   C,   I

dequeue node H
I have 5 visited nodes, 3 discovered nodes, and 1 undiscovered nodes

<==  <==   now the queue is empty
Queue (FIFO)
400  200  100  120  160  220  300  320  780  560  720
F,   D,   J,   B,   E,   G,    K,   A,   C,   I,   H

Go on until all the nodes are visited and the queue is empty
this is the algorithm for level order traversal of a binary tree
at any time, I am keeping a bunch of addresses in the memory, in the queue, 
instead of using just one pointer to move around
I am using a lot of extra memory

#include<iostream>
#include<queue>
using namespace std;
struct Node {
    char data;
    Node *left;
    Node *right;
}

// function that takes address of the rode node as argument and print the data in the nodes in level order 
void LevelOrder(node *root) {

    // take care of a common case, if the tree/root is empty/null
    if (root === null) return;

    // creates a queue of pointer to node 
    queue<Node*>Q; 

    // initially start with one discovered node in the queue, the only node known to me initially is the root node
    // inserts the address of root node in the queue
    Q.push(root);

    // while there is at least one discovered node/the queue isn't empty
    while (!Q.empty()) {

        // take out a node from the front, function front returns the element at the front of the queue
        // data type is pointer to node, collect the return of this function, the pointer to node, named current
        Node* current = Q.front(); 

        // I can visit/read this code being pointed by current
        cout<<current->data<<" ";

        // push the addresses of children of this node into the queue
        // if the left child is not null, push its address into the queue
        if (current -> left !== null) Q.push(current->left);

        // if the right child is not null, push its address into the queue
        if (current -> right !== null) Q.push(current->right);

        // remove the element from the front of the queue
        Q.pop(); 
    }
}
int main() {
    // some code to test LevelOrder function
}

// need other code to create and insert nodes a binary tree

class is initialized with three properties */
class Node {
  constructor(data) {
    this.data = data; // data type
    this.left = null; // property that is a pointer storing the address of left child node
    this.right = null; // property that is a pointer  storing the address of right child node
  }
}

// creates a new instance of the Node class
let node = new Node("a");
console.log(node.data);

// creates a root node and adds left and right children to it
const root = new Node("b");
root.left = new Node("c");
root.right = new Node("d");

console.log(root);

// function that takes address of the rode node as argument and print the data in the nodes in level order
function levelOrder(root) {
  // take care of a common case, if the tree/root is empty/null
  if (root === null) return;

  // creates a queue of pointer to node
  const queue = [];

  // initially start with one discovered node in the queue, the only node known to me initially is the root node
  // inserts/enqueues the address of root node in the queue
  queue.push(root);

  // while there is at least one discovered node/the queue isn't empty
  while (queue.length > 0) {
    // take out a node from the front, dequeues the front node
    // data type is pointer to node, collect the return of this function, the pointer to node, named current
    const current = queue.shift();

    // I can visit/read/print this code being pointed by current
    console.log(current.data + " ");

    // push the addresses of children of this node into the queue
    // if the left child is not null, push its address/enqueues it into the queue
    if (current.left !== null) queue.push(current.left);

    // if the right child is not null, push its address/enqueues into the queue
    if (current.right !== null) queue.push(current.right);

    // remove the element from the front of the queue
    queue.pop();
  }
}

root.left.left = new Node("e");
root.left.right = new Node("f");
root.right.left = new Node("g");
root.right.right = new Node("h");

levelOrder(root);

/* time complexity
if there are n nodes in the tree, 
visit to a node, is reading the data in the node, inserting its children into the queue, 
a visit to a node takes constant time
each node will be visited exactly once
Big O(n)

space complexity- rate of growth of extra memory used relative to input size 
Big O(1) - if the tree goes down, and each node only has a left child - best 
Big O(n) - worst/average */

/*
depth-first-search - visiting a child is visiting the complete subtree in that path
    visits all the descendants of a child node before moving on to next child node
    relative order of visiting the left subtree, the right subtreem and the root node 
    - left subtree L, root node D right subtree R / <left><root><right> - inorder traversal
      A, B, C, D, E, F, G, H, I, J, K <=== this is a binary search tree!
                                           for each node, the value of nodes in left is lesser than the value of nodes in right
      inorder traversal of a binary search would give me a sorted list!
*/
function inorder(root) {
  if (root === null) return;

  // recursively visits the left subtree
  inorder(root.left);

  // first prints the root node data
  console.log(root.data + " ");

  // recursively visits the right subtree
  inorderorder(root.right);
}

inorder(root);

/*
    - root node, left subtree, right subtree / <root><left><right> preorder traversal
      DL  DL  DL  DL  (after left, right is done for A)  
      F,  D,  B,  A,        
      
      DL  DL  DLR (go right for B) DLR  
      F,  D,  B,                    A,
      
      DL  DL  DLR DLR  DLR
      F,  D,  B,   A,   C,

      DL  DLR  DLR  DLR  DLR  DLR
      F,  D,   B,   A,   C,   E,

      DLR DLR  DLR  DLR  DLR  DLR  DL
      F,  D,   B,   A,   C,   E,   J,

      DLR DLR  DLR  DLR  DLR  DLR  DL  DLR
      F,  D,   B,   A,   C,   E,   J,  G

      DLR DLR  DLR  DLR  DLR  DLR  DL DLR DL
      F,  D,   B,   A,   C,   E,   J,  G,  I

      DLR DLR  DLR  DLR  DLR  DLR  DL  DLR  DLR  DLR
      F,  D,   B,   A,   C,   E,   J,   G,   I,   H

      DLR DLR  DLR  DLR  DLR  DLR  DLR  DLR  DLR  DLR  DLR
      F,  D,   B,   A,   C,   E,   J,   G,   I,   H,   K

      F, D, B, A, C, E, J, G, I, H, K - this would be recursive 

// function that takes pointer or reference to root node as argument and prints data in all the nodes 
void Preorder(Node *root) {

    // base condition for exiting a tree or subtree, namely when the tree or subtree is empty/ for any call, if root === null
    if (root === null) return;

    // first visit/print the data in root node
    printf("%c ", root->data);

    // recursive call to visit the left subtree, passing it the address of the left child of my current root
    Preorder(root-<left);

    // recursive call to visit the right subtree, passing it the address of the right child of my current root
    Preorder(root->right);
}
*/

// performs a preorder depth-first traversal of a binary tree; keep in mind: identity of the tree is always the address of the root node
// address of the root node is what gets passed to all the functions
//  a variable of type pointer to node will be used, named root, that stores the address of root node
function preorder(root) {
  if (root === null) return;

  // first prints the root node data
  console.log(root.data + " ");

  // recursively visits the left subtree
  preorder(root.left);

  // recursively visits the right subtree
  preorder(root.right);
}
preorder(root);
/* even though I am not using any extra memory explicitly,
 bc of the recursion, I am growing the function call stack
 for each function call, I allocate some amount of memory in the stack section of applications memory
 this allocated memory is reclaimed when the function call finishes 
 only the call at the top of the stack will be executing
 all other calls will be paused
 the call stack keeps growing and shrinking during the program's execution, so memory is used implicitly in the call stack
 space complexity for preorder depth-first traversal depends on the maximum depth/height of the tree... O(h) where h is height of the tree
 call stack only grows until I reach a leaf node, a node with no children and then the stack will start shrinking
*/

/*
    - LRD, <left><right><root> - postorder traversal
      A, C, B, E, D, H, I, G, K, J, F
*/
function postorder(root) {
  if (root === null) return;

  // recursively visits the left subtree
  postorder(root.left);

  // recursively visits the right subtree
  postorder(root.right);

  // first prints the root node data
  console.log(root.data + " ");
}

postorder(root);

/* time complexity for all three depth-first traversals is O(n) 
space complexity for all three depth-first traversals is O(h), worst: O(n) and best/average: O(log n)
*/

/* 
What situations would I want to use BFS?
What abstract data types would I use to defer/store nodes in a breadth-first tree traversal? in a queue

What situations would I want to use DFS instead?
What abstract data types would I use to defer/store nodes in a depth-first tree traversal? in a stack

Project: Linked Lists
main benefit of a linked list over an array - list elements can easily be inserted or removed without 
    reallocation of any other elements
in some languages, the size of an array is a concern and a way to overcome the problem and allow 
    dynamically allocated data is using linked lists

linked list - linear collection of data elements called nodes that point to the next node by means of a pointer
node - holds a single element of data and a link/pointer to the next node in the list
head node - first node in the list 
tail node - last node in the list

[NODE(head)] -> [NODE] -> [NODE(tail)] -> null


HashMap Data Structure
JS object literals ({}), Set, and Map, use structures based on hash tables
they help save key value pairs and later retrieve them

hash map - takes in a key value pair, produces a hash code, and stores the pair in a bucket


What is a hash code?
What does it mean to hash?
hash - take an input in and generate a corresponding output
hash function - a pure function with no random generation component
                hashing the same input should always return the same hash code
*/

// hashing function takes a name and gives the first letter of that name
function hash(name) {
  return name.charAt(0);
}
hash(Kai);

// an improvement on above- it eliminates many duplicate hash codes from being generated
function betterHash(name, surname) {
  return name.charAt(0) + surname.charAt(0);
}
betterHash(Kai, Cheng);

// now I take the entire name and convert it into numbers
function evenBetterHashHelper(string) {
  let hashCode = 0;
  for (let i = 0; i < string.length; i++) {
    hashCode += string.charCodeAt(i);
  }
  return hashCode;
}

function evenBetterHash(name, surname) {
  return evenBetterHashHelper(name) + evenBetterHashHelper(surname);
}

/*
difference between hasing and ciphering/encryption: hashing is a one-way process

hash codes and how to generate them
for hash maps, hash codes need to be a number
and the number will serve as the index to the bucket that will store the key value pair

Buckets?
What are buckets?
bucket - storage that I need to store elements; an array
         for a specific key, I need to decide which bucket to use for storage through my hash function 

hash maps and how they work internally
hash function returns a number that serves as the index of the bucket array at which I store this specific key value pair
ex. I want to store a person's full name as a key "Fred" with a value "Smith"
    1. Pass "Fred" into the hash function to get the hash code which is 385
    2. Find the bucket at index 385
    3. Store the key value pair in that bucket
       the key would be "Fred' and the value would be "Smith
    If the bucket at index 385 already contains an item with the same key "Fred", check if it's the same item by
    comparing the keys, then overwrite the value with my new value 
      leads to me only having unique values inside a Set
      Set will have nodes with only keys and no values

If I want to get a value using a key:
    1. Hash the key and calculate its bucket number.
    2. if the bucket is not empty, I go to that bucket.
    3. Compare if the node's key is the same key that was used for the retrieval
    4. If it is, then I can return the node's value, otherwise I return null

*A hash code is just the location, different keys might generate the same hash code
I need to make sure the key is the same by comparing both keys that are inside the bucket

Making this will result in a hash table with has, set, and get

Collisions?
What is a collision?

Growth of hash table
When is it a good time to grow my table? 

Computation complexity


*/
