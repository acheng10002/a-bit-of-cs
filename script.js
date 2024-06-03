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
