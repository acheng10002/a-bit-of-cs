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
      console.log(`Gives ${drinkList[i]} to ${personsList[i]}`);
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

findValue([9, 8, 1, 4, 7, 3]);

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
const t1 = performance.now();
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

F, D, B, A, C, E, J, G, I, H, K preorder: Root, L, R
 A, C, B, E, D, H, I, G, K, J, F postorder: L, R, Root 

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

    // I can visit/read/print this node being pointed by current
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
  inorder(root.right);
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

// an improvement on above- it eliminates many duplicate hash codes from being generated
function betterHash(name, surname) {
  return name.charAt(0) + surname.charAt(0);
}

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

insertion order is not maintained
some libraries implement hash tables with insertion order in mind, like JS's Map

/ hash map data structures = hash tables = dictionaries
they're efficient in accessing and manipulating data
for key-value stores:
  config settings - stores app settings where each setting has a unique key
  caching - stores frequently accessed data to improve performance by reducing redundant data fetching
for database indexing:
  hashmaps create indexes that allow for quick access to data
  indexes map keys to records in the database
for counting frequencies:
  hashmaps can be used to count the occurences of elements in a dataset, 
  exs. counting word frequency in a text or the frequency of items sold in a store
for symbol tables in compilers:
  compilers use hashmaps to manage symbol tables with store info about variable names, function names, and other
    identifiers used in the source code 
for implementing sets:
  the keys present the elements of the set
  allows for fast membership testing, insertion, and deletion
for routing and dispatching:
  hashmaps get used in networking and web servers to route requests to appropriate handlers
    routing in webservers - mapping urls to handler functions
    DNA resolution - mapping domain names to IP addresses
for data de-duplication:
  hashmaps help remove duplicate entries from data collections by using keys to track unique items
for memoization in dynamic programming:
  hashmaps store intermediate results (memoization) to avoid redundant calculations and improve efficiency
for graph algorithms:
  in various graph algorithms, hashmaps store adjacency lists and keep track of visited nodes 
for authentication systems:
  hashmaps store user sessions and tokens, enabling quick validation and management of user authentication
/

the next project will be an unordered hash map
if I need to iterate over a hash map frequently, hash tables are not the right choice, a simple array would be better

Collisions?
What is a collision?
collision - when two different keys generate the exact same hash code (because of the hashing function), landing them
            in the same bucket
when this happens, rework the hashing function to give me unique hash codes that depend on where the letters appear in the name
*/

function bestHashHelper(string) {
  let hashCode = 0;

  const primeNumber = 31;
  for (let i = 0; i < string.length; i++) {
    // here, the hash code starts to change because I am multiplying the old hash with every new iteration and then adding the letter code
    hashCode += primeNumber * hashCode + string.charCodeAt(i);
  }
  return hashCode;
}
/* prime numbers are preferable, because multiplying by a prime number will reduce the likelihood of hash codes being evenly divisible 
by the bucket length, and this helps minimize the occurence of collisions, no way to eliminate collisions completely

Dealing with collisions
What if the bucket was a linked list and not just a node?
When inserting into a bucket, if it's empty, insert the head of the linked list
if a head exists in a bucket, follow that linked list to add to the end of it 

1. hash function
   hash code is used to determine the bucket where the entry should be placed

   hash_code = hash_function(key)

   2. bucket index calculation
   hash code is converted into a bucket index
   
   bucket_index = hash_code % bucket_array_size

   3. store in buckets
   each bucket is a slot in an array, where entries are stored
   if a bucket is empty, the new entry is placed there
   if the bucket is already occupied, use a linked list to store multiple entries in the same bucket
   
   buckets[bucket_index] = new Entry(key, value, next_entry)

   4. collision handling 
   chaining - each bucket points to a linked list of entries that have the same bucket index
   open addressing - upon collision, the algorithm searches for the next available bucket in the array

   5. retrieval 
   to retrieve a value:
   pass the key through the hash function again
   the bucket index is calculated
   the entries in the bucket are searched to find the matching key

   hash_code = hash_function(key)
   bucket_index = hash_code % bucket_array_size
   entry = search_bucket(buckets[bucket_index], key)


6. rehashing 
   when the hashmap becomes too full, rehashing is performed
   rehashing involves creating a new, larger array of buckets and re-inserting all the entries based on 
   the new bucket indices
   
   new_bucket_array_size = current_bucket_array_size * 2
   rehash_all_entries(new_bucket_array, old_bucket_array)
*/
class HashMap {
  constructor(size) {
    // sets the size property to the value passed as an argument
    this.size = size;

    /* creates an array of the specified size, initializes all elements to null and then maps
    each element to an empty array, the buckets array will be used to store key-value pairs 
    hashmaps use buckets to store key-value pairs 
    chaining stores entries in an array at each bucket 
    values are then efficiently inserted and retrieved */
    this.buckets = Array(size)
      .fill(null)
      .map(() => []);
  }

  // Hash Function
  hash(key) {
    let hash = 0;

    // loops over each character in the key string
    for (let i = 0; i < key.length; i++) {
      /* updates the hash using bitwise left shift and the character code of the current character
      bitwise left shift - shifts all the bits in a binary number to the left by a specified number of positions */
      hash = (hash << 5) - hash + key.charCodeAt(i);
      hash |= 0; // convert to 32bit integer
    }

    // returns the computed hash code
    return hash;
  }

  // Bucket Index Calculation
  getBucketIndex(key) {
    /* computes the absolute value of the hash code, then takes the modulo with the size of the 
    hashmap to get the bucket index */
    return Math.abs(this.hash(key)) % this.size;
  }

  // Adds a key-value pair to the hashmap
  set(key, value) {
    // computes the bucket index for the given key
    const index = this.getBucketIndex(key);

    // loops through the entries in the bucket at the computed index
    for (let i = 0; i < this.buckets[index].length; i++) {
      // if the key already exists in the bucket, updates its value and exits the method
      if (this.buckets[index][i][0] === key) {
        this.buckets[index][i][1] === value;
        return;
      }
    }

    // if the key does not exist, add the new key-value pair to the bucket
    this.buckets[index].push([key, value]);
  }

  // retrieves the value for a given key
  get(key) {
    // computes the bucket index for the given key
    const index = this.getBucketIndex(key);

    // loops through the entries in the bucket at the computed index
    for (let i = 0; i < this.buckets[index].length; i++) {
      // if the key is found, returns the corresponding value
      if (this.buckets[index][i][0] === key) {
        return this.buckets[index][i][1];
      }
    }

    // if the key is not found, return null
    return null;
  }
}

// creates a new hashmap instance with 10 buckets
const map = new HashMap(10);

// adds the key-value pair `("name", "Alice")` to the hashmap
map.set("name", "Alice");

// retrieves and prints the value associated with the key `"name"`, which is `"Alice"`
console.log(map.get("name")); // Alice

/*
Growth of hash table
When is it a good time to grow my table? 
I don't have infinite memory, so I can't have an infinite number of buckets
So I'll start with a small array for my buckets, array size 16 
  16 is a power of 2, which helps with some techniques for performance that require bit manipulation for indexes

How to deal with big hash code numbers? Use the modulo operation
  given any number modulo by 16, I will get a number between 0 and 15

As I continue to add nodes into my buckets, collisions get more likely
eventually there will be more nodes than there are buckets, which guarantees a collision
  I don't want collisions, so I grow my buckets to have more chance that our nodes will spread and not stack up in the same buckets
  how to grow my buckets - create a new buckets list that is double the size of the old buckets list, then copy all nodes over to
  the new buckets

When do I know it's time to grow my buckets size?
hashmap class needs to keep track of 2 new fields: capacity and load factor
capacity - total number of buckets I currently have
load factor - a number that I assign my hash map to at the start
              this factor determines when it's a good time to grow my buckets
              hash map implementations use a load factor between 0.75 and 1 
product of the capacity and the load number gives me a number...
I know it's time to grow when there are more entries in the hash map that that product
  if there are 16 buckets
  load factor is 0.8
  I need to grow the buckets when there are more than 16 * 0.8 = 12.8 entries

setting the product number too low will consume too much memory by having too many empty buckets
setting the product number too high allows my buckets to have many collisions before I grow them 

Computation complexity
hash map has an average case complexity of O(1) for insertion, retrieval, and removal 
worse case of those operations would be O(n) and that happens when I have all my data hashes to the same exact bucket

growth of my hash map has complexity of O(n) at all times
*/

class Node1 {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  add(key, value) {
    // creates a new Node isntance with the given key and value
    const newNode = new Node1(key, value);

    // checks if the LinkedList instance is empty
    if (!this.head) {
      // if it is, sets the head of the list to be the newNode
      this.head = newNode;
    } else {
      // initializes current to point to the head of LinkedList instance, current will be used to traverse the LinkedList instance
      let current = this.head;

      // starts a while loop that continues as long as the current node has a next node
      while (current.next) {
        // checks if the key of the current node matches the key being added
        if (current.key === key) {
          // if it does, updates the value of the current node to the new value provided
          current.value = value;

          // exists function, and there was no need to add a new node
          return;
        }

        // moves to the next node in LinkedList instance
        current = current.next;
      }

      // after exiting the loop, checks if the key of the current node, which will be the last node, matches the key being added
      if (current.key === key) {
        // if it is, updates the value of the existing node
        current.value = value;
      } else {
        // if it isn't, adds the new node to the end of the LinkedList instance
        current.next = newNode;
      }
    }
  }

  // retrieves a value for a given key
  get(key) {
    // initializes current to point to the head of LinkedList instance, current will be used to traverse the LinkedList instance
    let current = this.head;

    // starts a while loop that continues as long as the LinkedList instead has a current node
    while (current) {
      // checks if the key of the current node matches the key being retrieved
      if (current.key === key) {
        // if it does, return the value of the current node
        return current.value;
      }

      // otherwise, moves to the next node in LinkedList instance
      current = current.next;
    }

    // returns null if the key doesn't match any of the keys in the nodes of the LinkedList instance
    return null;
  }

  // removes a key-value pair
  remove(key) {
    // if the LinkedList instance is already empty, return null
    if (!this.head) return null;

    // if the key of the head node matches the key to be removed
    if (this.head.key === key) {
      // updates the head to point to the next node
      this.head = this.head.next;
      return;
    }

    let current = this.head;

    /* traverse the list to find the node before the one to be removed
    starts a while loop that continues as long as the current node has a next node and as long as 
    the key of the next node doesn't match the key to be removed */
    while (current.next && current.next.key !== key) {
      // move to the next node in LinkedList instance
      current = current.next;
    }

    // after exiting the loop, checks if the next node exists, this means the key was found in the LinkedList instance
    if (current.next) {
      /* if the next node exists and matches the key to be removed, this line updates the next pointer of the current 
      node to skip the node to be removed, removing the node with the given key from the LinkedList */
      current.next = current.next.next;
    }
  }
}

class HashMapWLLBuckets {
  constructor(size) {
    this.size = size;

    this.buckets = Array(size)
      .fill(null)

      // initializes each bucket as a LinkedList
      .map(() => new LinkedList());
  }

  // Hash Function
  hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash << 5) - hash + key.charCodeAt(i);
      hash |= 0; // convert to 32bit integer
    }

    // returns the computed hash code
    return hash;
  }

  // Bucket Index Calculation
  getBucketIndex(key) {
    return Math.abs(this.hash(key)) % this.size;
  }

  // Adds a key-value pair to the hashmap
  set(key, value) {
    const index = this.getBucketIndex(key);
    this.buckets[index].add(key, value);
  }

  // retrieves the value for a given key
  get(key) {
    const index = this.getBucketIndex(key);
    return this.buckets[index].get(key);
  }

  remove(key) {
    const index = this.getBucketIndex(key);
    this.buckets[index].remove(key);
  }
}

const map2 = new HashMapWLLBuckets(10);
map2.set("name", "Alice");
console.log(map2.get("name")); // Alice
map2.remove("name");
console.log(map2.get("name")); // null

/* binary search trees - take a group of data items and turn them into a tree full of nodes
                         each left node being lesser than the parent and the right node 
                         the right node being greater than the parent and left node
                         so everything to the left of the root is less than the root
                         everything to the right of the root is greater than the root
                         starts with the root node 
                         any node with no children is called a leaf node
                         must be no duplicate nodes ( if I do, must follow a consistence process of
                         either storing duplicate values at the left or storing them at the right)
  tree traversal algorithms - breadth-first and depth-first
  balanced binary search trees - because of hierarchical structure, allow fast operations for lookup, 
                                 insertion, and deletion of data items
 1. Searching a node
    1. First, compare the element to be searched with the root element of the tree.
       If root is matched with the target element, then return the node’s location.
       If it is not matched, then check whether the item is less than the root element, if it is smaller than the root element, then move to the left subtree.
       If it is larger than the root element, then move to the right subtree.
    2. Repeat the above procedure recursively until the match is found.
    3. If the element is not found or not present in the tree, then return NULL.
*/
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

// utility function to search a key in a BST
function search(root, data) {
  // bases cases: root is null or key is present at root
  if (root === null || root.data === data) {
    return root;
  }

  // key is greater than root's key
  if (root.data < data) {
    return search(root.right, data);
  }

  // key is smaller than root's key
  return search(root.left, data);
}

/*
 2. Insert a node
    A new key is always inserted at the leaf. 
    Start searching a key from the root till a leaf node. 
    Once a leaf node is found, the new node is added as a child of the leaf node.
 */
// a utility function to insert a new node with given key in BST
function insert(node, data) {
  // if the tree is empty, return a new node
  if (node === null) {
    return new Node(data);
  }

  // otherwise, recur down the tree
  if (data < node.data) {
    node.left = insert(node.left, data);
  } else if (data > node.data) {
    node.right = insert(node.right, data);
  }

  // return the (unchanged) node pointer
  return node;
}
/* 
 3. Delete a node
    case A: node to be deleted is a leaf node - simply null it out
    case B: node to be deleted has one child - replace the node with the child node
    case C: node to be deleted has two children - I have to delete the node is such a way, 
                                                  that the resulting tree follows the properties 
                                                  of a BST.  The trick is to find the inorder successor 
                                                  of the node (smallest node in its right subtree). 
                                                  Copy contents of the inorder successor to the node, 
                                                  and delete the inorder successor.

When deleting a node of a BST:
- Need to figure out what will be the replacement of the node to be deleted.
- Want minimal disruption to the existing tree structure
- Can take the replacement node from the deleted nodes left or right subtree.
- If taking if from the left subtree, we have to take the largest value in the left subtree.
- If taking if from the right subtree, we have to take the smallest value in the right subtree.
 */

// utility function to find the minimum value node in the given tree
function minValueNode(node) {
  let minValue = node.data;

  // loop down to find the leftmost left
  while (node.left != null) {
    minValue = node.left.data;
    node = node.left;
  }
  return minValue;
}

// utility function to delete the node with given key in BST
function deleteNode(root, data) {
  // base case: if the tree is empty, return null
  if (root === null) {
    return root;
  }

  /* recur down the tree- if the key to be deleted is smaller than the root's key 
    then it lies in the left subtree */
  if (data < root.data) {
    root.left = deleteNode(root.left, data);

    /* recur down the tree- if the key to be deleted is greater than the root's key 
    then it lies in the right subtree */
  } else if (data > root.data) {
    root.right = deleteNode(root.right, data);

    // if the key is the same as root's key, then delete this node
  } else {
    /* node with only one child - return the non-null child
        or no child */
    if (root.left === null) {
      return root.right;
    } else if (root.right === null) {
      return root.left;
    }

    // node with two children: get the in-order successor (smallest in the right subtree)
    root.data = minValueNode(root.right);

    // copy the in-order successor's content to this node; replace the root's key with the in-order successor's key

    // delete the in-order successor recursively from the right subtree
    root.right = deleteNode(root.right, root.data);
  }

  return root;
}
/*
 4. Inorder traversal of BST
    1. Traverse the left subtree.
    2. Visit the root node.
    3. Traverse the right subtree.  
*/

/* result array is passed as an argument to accumulate the keys during the traversal
this ensures that the keys are collected in ascending order 
function then returns the result array containing the keys of the BST in sorted order */
function inorderTraversal(root, result = []) {
  // base case: if the current node is null, return without doing anything
  if (root != null) {
    // traverse the left subtree
    inorderTraversal(root.left, result);

    // visit the root node and add its key to the result array
    result.push(root.data);

    // traverse the right subtree
    inorderTraversal(root.right, result);
  }
  return result;
}

/* Sorted Array to Balanced BST by Finding the middle element
- find the middle element of the array and make it the root of the tree
- perform the same operation on the left subarray for the root's left child
  recursively get the middle of the left half and make it the left child of the root
- perform the same operation on the right subarray for the root's right child
  recursively get the middle of the right hald and make ir the right child of the root
- print the preorder of the tree
*/

function createBST(arr, start, end) {
  if (start > end) return null; // base case: subarray being processed is invalid or empty

  const mid = Math.floor((start + end) / 2); // find the middle index of the current array/subarray
  const root = new Node(arr[mid]); // new Node is created with the middle element as data

  root.left = createBST(arr, start, mid - 1); // recursively creates left subtree
  root.right = createBST(arr, mid + 1, end); // recursively creates right subtree

  return root;
}

/* Since I am calling createBST recursively, I store function states in a call stack, so that
when execution of call for left subarray returns, I can resume execution for current function. */

const sortedArray = [1, 2, 3, 4, 5, 6, 7];
const bstRoot = createBST(sortedArray, 0, sortedArray.length - 1);

console.log(bstRoot);

deleteNode(bstRoot, 2);
console.log(bstRoot);

let root = null;

function sortedArrayToBST(arr, start, end) {
  // base case
  if (start > end) {
    return null;
  }

  // get the middle element and make it the root
  let mid = parseInt((start + end) / 2);
  let node = new Node(arr[mid]);

  // recursively construct the left subtree and make it left child of the root
  node.left = sortedArrayToBST(arr, start, mid - 1);

  // recursively construct the right subtree and make it the right child of the root
  node.right = sortedArrayToBST(arr, mid + 1, end);
  return node;
}

// utility function to print preorder traversal of BST
function preOrder(node) {
  // if tree is either empty or the function has reached a leaf node's child
  if (node == null) {
    // returns, ends current call, and backtracks to previous node in the call stack
    return;
  }
  console.log(node.data + " ");
  preOrder(node.left);
  preOrder(node.right);
}

let arr = [1, 2, 3, 4, 5, 6, 7];
let n = arr.length;
root = sortedArrayToBST(arr, 0, n - 1);
console.log("Preorder traversal of constructed BST:");
preOrder(root); // 4 / 2 / 1 / 3 / 6 / 5 / 7

/* First initialize a queue with root node and loop until the queue is empty.
Remove first node from the queue and find mid element of the sorted array.
Create new node with previously find middle node 
and set left child to the dequeue node left child if present and 
also set the right child with dequeue node right child. 
Enqueue the new node onto the queue. 
Set the right child of the dequeued node to the middle element on the left side of the sorted array. 
If the dequeued node has a left child, enqueue it onto the queue. Return the root node.


constructs a balanced BST from a sorted array using in iterative approach with a queue 
it processes each subarray iteratively, creating nodes and attaching them as children to their respective parent nodes */
function sortedArrayToBSTIteratively(nums) {
  // if the array is empty, return null
  if (nums.length === 0) {
    return null;
  }

  // calculates the middle index of the array
  const mid = Math.floor(nums.length / 2);

  // creates a new Node with the value at the middle index, this node becomes the root of the BST
  const root = new Node(nums[mid]);

  // initializes queue with two elements
  const q = [
    // first element is a pair, representing the left subtree of the root
    [root, [0, mid - 1]],

    // second element is a pair, representing the right subtree of the root
    [root, [mid + 1, nums.length - 1]],

    /* each element in the queue is a tuple where the first part is a parent node and the
       second part is a range (subarray indices) that needs to be processed to build the subtree 
    */
  ];

  // while loop that continues as long as the queue q is not empty
  while (q.length > 0) {
    /* dequeues the first element from the queue q using shift() and destructures it into 
       parent (the current parent node) and [left, right] (indices of the current subarray to be processed) */
    const [parent, [left, right]] = q.shift();

    // if there are elements to process/still elements in the subarray and parent node is not null
    if (left <= right && parent != null) {
      // calculates the middle index of the current subarray and creates a new Node with the value at the middle index
      const mid = Math.floor((left + right) / 2);

      // this node becomes the child node to be attached to the parent
      const child = new Node(nums[mid]);

      // checks if the child node's key is less than the parent's key
      if (nums[mid] < parent.data) {
        // if it is, it attaches as the left child of the parent
        parent.left = child;
      } else {
        // otherwise, it attaches as the right child
        parent.right = child;
      }

      // enqueues two new elements to the queue q for further processing
      // enqueues the left subarray of the current child node
      q.push([child, [left, mid - 1]]);

      // enquques the right subarray of the current child node
      q.push([child, [mid + 1, right]]);
    }
  }
  return root;
}

// function to print the preorder traversal of the constructed BST
function printBST(root) {
  if (root === null) {
    return;
  }
  console.log(root.data + " ");
  printBST(root.left);
  printBST(root.right);
}

const nums = [1, 2, 3, 4, 5, 6, 7];
const root1 = sortedArrayToBSTIteratively(nums);
printBST(root); // 4 / 2 / 1 / 3 / 6 / 5 / 7

/* Algorithm
1. Initialize: start = 0
               end = length of the array - 1
2. mid = (start + end) / 2
3. Create a tree node with mid as root, call it A.
4. Recursively do the following steps:
5. Calculate mid of left subarray and make it root of the left subtree of A.
6. Calculate mid of right subarray and make it root of the right subtree of A.

private static TreeNode createBST(int[] array, int start, int end) {
    if (start > end) return null;
    int mid = (start + end) / 2;
    TreeNode root = newTreeNode(array[mid]);

    root.setLeft(createBST(array, start, mid - 1));
    root.setRight(createBST(array, mid + 1, end));

    return root;
} 
*/

/* graph - data structure used to represent relationships between pairs of objects 
vertex - points in the graph ex. u or v
edge - line connecting vertices ex. edge connecting u and v is (u, v) 
undirected graph - edges connecting vertices in either direction are the same 
    incident - how an edge between two vertices is in an undirected graph
    adjacent/neighbors - how vertices that are connected by an edge are in an undirected graph
    degree - the number of edges incident on a vertex
path - distance between two non-adjacent vertices
shortest path - path between two vertices with the fewest edges
cycle - when a path goes from a particular vertex back to itself
sometimes, numeric values are put on edges 
ex. a road map is an undirected graph
    cities are vertices
    roads are edges
    values on edges indivating distance of each road
weight - number that is put on an edge, making the graph a weighted graph
    if I want to find the shortest route between two locations, I'm looking for a path between 
    two vertices with minimum sum of edge weights over all paths between the two vertices 

directed graph - relationships between vertices don't necessarily go both ways 
directed acyclic graph (dag) - directed graphs with no cycles 
weighted directed graphs ex. road maps with one-way streets and road distances
in a directed graph,
    edges are directed
    a directed edge leaves one vertex and enters another
    a directed edge that leaves vertex u and enters vertex v is denoted by (u, v) and their order matters
out-degree - number of edges leaving a vertex
in-degree - number of edges entering a vertex 
V - vertex set
E - edge set 
|| notation to denote the size of a set 
theta(|V|) - running time that is linear in the number of vertices 

3 ways to represent graphs
3 criteria:
1. how much memory or space I need in each representation
2. how long it takes to determine whether a given edge is in the graph
3. how long it takes to find the neighbors of a given vertex

typically, vertices are numbered, |V| vertices from 0 to |V| - 1

3 graph representations
1. edge list - array
   ex. one edge = array of 2 vertices
       array of objects containing the vertex numbers of the vertices that the edges are incident on
       (if edges have weights, add either a third element to the array or more info to the object, fiving the edge's weight)
total space for an edge list is theta |E|  
   ex. [ [0,1], [0,6], [0,8], [1,4], [1,6], [1,9], [2,4], [2,6], [3,4], [3,5], [3,8], [4,5], [4,9], [7,8], [7,9] ]

2. adjacency matrices
adjacency matric - |V| x |V| matrix of 0s and 1s, where the entry in row i and column j is 1 if and only if the edge (i, j) is in the graph 
    to indicate an edge weight, put it in the row i, column j entry
    reserve a special value, maybe null, to indicate an absent edge

[ [0, 1, 0, 0, 0, 0, 1, 0, 1, 0],
  [1, 0, 0, 0, 1, 0, 1, 0, 0, 1],
  [0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 0, 0, 1, 0],
  [0, 1, 1, 1, 0, 1, 0, 0, 0, 1],
  [0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
  [1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [1, 0, 0, 1, 0, 0, 0, 1, 0, 0],
  [0, 1, 0, 0, 1, 0, 0, 1, 0, 0] ]

total time to find the edge is constant because I'm just looking up the entry
total space for an adjacency matrix is theta (V^2)
another disadvantage, if I want to find out which vertices are adjacent to a given vertex i, I have to look at all |V| entries in row i, 
even if only a small number of vertices are adjacent to vertex i 

ex. adjacency matrix is named graph
    look at graph [i][j] to query whether edge is in the graph

adjacency matrix for an undirected graph is symmetric: row i, column j entry is 1 if and only if the row j, column i entry is 1

3. adjacency lists
for each vertex i, store an array of the vertices adjacent to it
usually have an array of |V| adjacency lists, one adjacency list per vertex
[ [1, 6, 8],
  [0, 4, 6, 9],
  [4, 6],
  [4, 5, 8],
  [1, 2, 3, 5, 9],
  [3, 4],
  [0, 1, 2],
  [8, 9],
  [0, 3, 7],
  [1, 4, 7] ]

  vertex numbers in an adjacency list are not required to appear in order, though it's convenient to list them in increasing order
  total time to find the edge is constant, because I just have to index into an array
    go to i's adjacency list, look for j in i's adjacency list
    in the worse case, it takes theta (d) where d is the degree of vertex i (degree is the number of edges incident on a vertex
        degree of vertex i could be as high as |V| - 1 (if i is adjacent to all the other |V| - 1 vertices, or as low as 0, if i is isolated with no incident edges)
    in an undirected graph, vertex j is in vertex i's adjacency list if and only if i is in j's adjacency list
  if the graph is weight, each item in each adjacency list is either a two-item array or an object, giving the vertex number and the edge weight
  total space for adjacency list, the adjacency lists for an undirected graph contain 2|E| elements
    because each edge (i, j) appears exactly twice in the adjacenecy lists, once in i's list and once in j's list and there are |E| edges
  total space for adjacency lists for a directed graph is 2|E|

I can use a for-loop to iterate through the vertices in an adjacency list
I have an adjacency-list representation of a graph in the variable graph,
    graph[i] is an array containing the neighbors of vertex i
    // calls doStuff on each vertex adjacent to vertex i
    for (let j = 0; j < graph[i].length; j++) {
        doStuff(graph[i][j]);

    OR

    let vertex = graph[i];
    for (let j; j < vertex.length; j++) {
        doStuff(vertex[j]);

  */

/* graph is an adjacency list where each node maps to a list of neighbors the knight can move to */
function bfs(graph, startNode) {
  // INITIALIZATION
  // queue will manage nodes to visit/review in a FIFO order, enqueues the startNode/source node
  let queue = [startNode];

  // initializes a distances object to store the distance (number of edges from the startNode to each node)
  let distances = {};

  // set the startNode's distance from the startNode as 0
  distances[startNode] = 0;

  // REPETITION
  // as long as there are nodes in the queue, ensures all nodes reachable from the startNode are visited
  while (queue.length > 0) {
    // TRAVERSAL
    // dequeue a node from the front of the queue and assigns it to currentNode, the active node being processed
    let currentNode = queue.shift();

    // mark the node as being visited, traces the order of node visits during BFS traversal
    console.log(`Currently visiting node: ${currentNode}`);

    /* iterates over each neighbor of the currentNode
    neighbors are retrieved from the adjacency list, graph[currentNode] */
    graph[currentNode].forEach((neighbor) => {
      /* checks if a neighbor has not been visited by seeing if it's absent in the distances object,
      undefined entry means the neighbor hasn't been visited */
      if (distances[neighbor] === undefined) {
        /* assigns the distance to the neighbor, it's one more than the distance to the currentNode, 
        counting the number of edges from the startNode */
        distances[neighbor] = distances[currentNode] + 1;

        // adds the neighbor to the queue for subsequent processing
        queue.push(neighbor);
      }
    });
  }
  /* returns the distances object, which contains the shortest paths from the startNode to about its reachable nodes
  distances object is a map of node distances */
  return distances;
}

const graph = {
  A: ["B", "C", "D"],
  B: ["E"],
  C: ["B", "E", "F"],
  D: ["G", "H"],
  E: ["I"],
  F: [],
  G: ["J"],
  H: [],
  I: [],
  J: [],
};

const startNode = "A";
const nodeDistances = bfs(graph, startNode);
console.log("Shortest path distances from node A:", nodeDistances);

/* 
let graph = {
  '(0, 0)': ['(1, 2)', '(2, 1)'], 
  '(0, 1)': ['(1, 3)', '(2, 0)', '(2, 2)'],
  '(0, 2)': ['(1, 0)', '(1, 4)', '(2, 1)', '(2, 3)']
};
*/

function bfsShortestPath([x, y]) {
  let start = [x, y];
  return [
    [x + 2, y + 1],
    [x + 2, y - 1],
    [x - 2, y + 1],
    [x - 2, y - 1],
    [x + 1, y + 2],
    [x - 1, y + 2],
    [x + 1, y - 2],
    [x - 1, y - 2],
  ].filter(([a, b]) => !(a < 0 || a > 7 || b < 0 || b > 7));
}

// each position is a node with three attributes
class Position {
  constructor(value = null, parent = null, moveCount = 0) {
    // value ex. [2, 1], array with the x and y indices of the position
    this.value = value;
    // parent ex. [0, 0], array of the x and y indices of the position prior to this one
    this.parent = parent;
    // number of moves taken to reach this position from the start
    this.moveCount = moveCount;
  }
}

/* uses a breadth-first search algorithm to find the shortest path between two chess positions
O(V + E) complexity 
BFS helps identify levels of nodes based on their distance from the start node */
function knightMoves(start, end) {
  if (!start || !end) {
    return null;
  }
  /* INITIALIZATION
  start position is an instance of Position 
  start position has no parent, so parent is null by default */
  let startPosition = new Position(start, null, 0);

  // use an array as the queue and add the start position to it; the queue manages positions to visit in a FIFO order
  let queue = [startPosition];

  // set object stores unique values of any time, add the same value to a Set does not increase the Set's size or affect the Set's contents
  let moveTo = new Set();

  /* track visited positions to avoid cycles/ marks the start positions as visited 
  JS objects are compared by reference not by value, so two objects or two arrays with identical contents are considered
  different if they do not reference the exact same instance 
  this way, positions added to moveTo can be compared to positions already in moveTo, and there won't be duplicates */
  moveTo.add(start.toString());

  // TRAVERSAL/REPETITION
  // continue as long as there are possible moves, ensures all possible moves from the start position are visited
  while (queue.length > 0) {
    // dequeues a position from the start of the queue, and it will now be processed
    let currentPosition = queue.shift();

    // if the currentPosition's x (.value[0]) and y (.value[1]) match the endPosition's x and y value
    if (
      currentPosition.value[0] === end[0] &&
      currentPosition.value[1] === end[1]
    ) {
      console.log(
        `=> You made it in ${currentPosition.moveCount} move(s)! Here's your path:`
      );
      /* COMPLETION
      log the path that got to the end position
      at the end of the BFS I have a map of positions that tell me the shortest path in terms of 
      number of edges/moves from the start position to the end position */
      reconstructPath(currentPosition);
      return;
    }

    /* retrieve all neighbors/possible moves from this position
    in graph terms, these are the nodes (other positions) that are directly connected to the current 
    node (position) by an edge (a move)
    generate and process all possible moves from this position 
    passing in the position as an array */
    let moves = generateMoves(currentPosition.value);

    // iterate over each possible next position from the current position
    moves.forEach((move) => {
      // if the next position hasn't been marked as visited
      if (!moveTo.has(move.toString())) {
        // mark it as visited
        moveTo.add(move.toString());
        // instantiate the move as a position with Position.value of move, Position.parent of currentPosition, and increments Position.moveCount
        let nextPosition = new Position(
          move,
          currentPosition,
          currentPosition.moveCount + 1
        );
        // enqueue the move/next position and repeat the process until the queue is empty, indicating that all possible moves have been visited
        queue.push(nextPosition);
      }
    });
  }
}

// returns all possible moves from a start position
function generateMoves(start) {
  // if no coordinates in start, log an error and return an empty array
  if (!Array.isArray(start) || start.length !== 2) {
    console.error("Invalid start position provided.");
    return [];
  }

  // destructuring assignment that extraces row, x, index, and column, y, index from the input array
  const [x, y] = start;

  /* all the possible moves a knight can make from its current position */
  const moves = [
    // move two squares along the x axis and one square along the y axis
    [x + 2, y + 1],
    [x + 2, y - 1],
    [x - 2, y + 1],
    [x - 2, y - 1],
    // move one square along the x axis and two squares along the y axis
    [x + 1, y + 2],
    [x - 1, y + 2],
    [x + 1, y - 2],
    [x - 1, y - 2],
    // filter out moves that fall below 0 or above 7
    /* .filter applies a function to each element in the array 
  [a, b] destructures each move into its component row, a, and column, b 
  !(a < 0 || a > 7 || b < 0 || b > 7) returns true for moves where both a and b are within the valid range 
  moves outside this range are discarded */
  ];
  return moves.filter(([a, b]) => !(a < 0 || a > 7 || b < 0 || b > 7));
}

// reconstructs the shortest path from the start position to the end position and logs it
function reconstructPath(endPosition) {
  let current = endPosition;
  let path = [];

  // trace the path from end position back to the start position
  while (current) {
    // add each position to the front, so that when positions are logged, they're logged from start to end
    path.unshift(current.value);
    // traverse backward on the path back to the start position
    current = current.parent;
  }
  // for each position added to the path, log the positions from the front to the back
  path.forEach((position, index) => {
    console.log(`[${position[0]}], [${position[1]}]`);
  });
}
knightMoves([0, 0], [2, 1]);
knightMoves([0, 0], [3, 3]);
knightMoves([3, 3], [0, 0]);
knightMoves([0, 0], [7, 7]);
