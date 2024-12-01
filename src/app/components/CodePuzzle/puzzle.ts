export const puzzles = [
    {
      description: "Fix the following function to return the sum of an array of numbers",
      code: `function sumArray(arr) {
        return arr.map((arr) => arr+arr);
      }`,
      expectedOutput: 15,
      testInput: [1, 2, 3, 4, 5],
      hint: "Use the reduce method to sum the elements."
    },
    {
      description: "Fix the following function to return the maximum number in an array",
      code: `function maxArray(arr) {
        return arr[arr.length - 1];
      }`,
      expectedOutput: 5,
      testInput: [1, 2, 3, 4, 5],
      hint: "Consider using the Math.max function."
    },
    {
      description: "Fix the following function to return the minimum number in an array",
      code: `function minArray(arr) {
        return arr[0]);
      }`,
      expectedOutput: 1,
      testInput: [1, 2, 3, 4, 5],
      hint: "Use the Math.min function to find the minimum number."
    },
    {
      description: "Fix the following function to reverse a string",
      code: `function reverseString(str) {
        return str;
      }`,
    //   code: `function reverseString(str) {
    //     return str.split('').reverse().join('');
    //   }`,
      expectedOutput: "edcba",
      testInput: "abcde",
      hint: "Think about how to manipulate strings."
    },
    {
      description: "Fix the following function to check if a number is even",
      code: `function isEven(num) {
        return num && 2 === 0;
      }`,
      expectedOutput: true,
      testInput: 4,
      hint: "Use the modulo operator to check if a number is even."
    },
    {
      description: "Fix the following function to count the vowels in a string",
      code: `function countVowels(str) {
        return str.match(/[aeiou]/gi).length;
      }`,
      expectedOutput: 3,
      testInput: "hello world",
      hint: "Use the match method to find vowels in a string."
    },
    {
      description: "Fix the following function to calculate the average of an array of numbers",
      code: `function average(arr) {
        return arr[0] + arr[1] + arr[3] / 3;
      }`,
      expectedOutput: 3,
      testInput: [1, 2, 3, 4, 5],
      hint: "Use the reduce method to calculate the average."
    },
    {
      description: "Fix the following function to check if a number is prime",
      code: `function isPrime(num) {
        return num;
      }`,
    //   code: `function isPrime(num) {
    //     for (let i = 2; i <= Math.sqrt(num); i++) {
    //       if (num % i === 0) return false;
    //     }
    //     return num > 1;
    //   }`,
      expectedOutput: true,
      testInput: 7,
      hint: "Use a loop to check if a number is prime."
    },
    // {
    //   description: "Fix the following function to find the longest word in a string",
    //   code: `function findLongestWord(str) {
    //     return str.split(' ').reduce((longest, current) => current.length > longest.length ? current : longest, '');
    //   }`,
    //   expectedOutput: "programming",
    //   testInput: "I love programming and coding",
    //   hint: "Use the reduce method to find the longest word."
    // },
    // {
    //   description: "Fix the following function to find the GCD of two numbers",
    //   code: `function gcd(a, b) {
    //     return b === 0 ? a : gcd(b, a % b);
    //   }`,
    //   expectedOutput: 6,
    //   testInput: [54, 24],
    //   hint: "Use the Euclidean algorithm to find the GCD."
    // },
    {
      description: "Fix the following function to find the square root of a number",
      code: `function squareRoot(num) {
        return num;
      }`,
      expectedOutput: 4,
      testInput: 16,
      hint: "Use the Math.sqrt function to find the square root."
    },
    {
      description: "Fix the following function to count the number of words in a string",
      code: `function countWords(str) {
        return str.split(' ').length;
      }`,
      expectedOutput: 6,
      testInput: "Hello world this is a test",
      hint: "Use the split method to count words."
    },
    // {
    //   description: "Fix the following function to capitalize the first letter of each word",
    //   code: `function capitalizeWords(str) {
    //     return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    //   }`,
    //   expectedOutput: "Hello World This Is A Test",
    //   testInput: "hello world this is a test",
    //   hint: "Use the map method to capitalize the first letter of each word."
    // },
    // {
    //   description: "Fix the following function to find the common elements in two arrays",
    //   code: `function commonElements(arr1, arr2) {
    //     return arr1.filter(value => arr2.includes(value));
    //   }`,
    //   expectedOutput: [2, 3],
    //   testInput: [[1, 2, 3], [2, 3, 4]],
    //   hint: "Use the filter method to find common elements."
    // },
    // {
    //   description: "Fix the following function to find the missing number in an array",
    //   code: `function findMissingNumber(arr) {
    //     const n = arr.length + 1;
    //     const total = (n * (n + 1)) / 2;
    //     const sum = arr.reduce((acc, num) => acc + num, 0);
    //     return total - sum;
    //   }`,
    //   expectedOutput: 3,
    //   testInput: [1, 2, 4, 5],
    //   hint: "Use the formula to find the missing number."
    // },
    // {
    //   description: "Fix the following function to check if two strings are anagrams",
    //   code: `function areAnagrams(str1, str2) {
    //     const sorted1 = str1.split('').sort().join('');
    //     const sorted2 = str2.split('').sort().join('');
    //     return sorted1 === sorted2;
    //   }`,
    //   expectedOutput: true,
    //   testInput: ["listen", "silent"],
    //   hint: "Use the sort method to check if two strings are anagrams."
    // },
    // {
    //   description: "Fix the following function to find the first non-repeating character in a string",
    //   code: `function firstNonRepeatingCharacter(str) {
    //     const charCount = {};
    //     for (const char of str) {
    //       charCount[char] = (charCount[char] || 0) + 1;
    //     }
    //     for (const char of str) {
    //       if (charCount[char] === 1) return char;
    //     }
    //     return null;
    //   }`,
    //   expectedOutput: "d",
    //   testInput: "aabbccdde",
    //   hint: "Use an object to count character occurrences."
    // },
    // {
    //   description: "Fix the following function to generate a random number between min and max",
    //   code: `function getRandomNumber(min, max) {
    //     return Math.floor(Math.random() * (max - min + 1)) + min;
    //   }`,
    //   expectedOutput: 5,
    //   testInput: [1, 10],
    //   hint: "Use the Math.random function to generate a random number."
    // },
    // {
    //   description: "Fix the following function to find the second largest number in an array",
    //   code: `function secondLargest(arr) {
    //     const uniqueArr = [...new Set(arr)];
    //     uniqueArr.sort((a, b) => b - a);
    //     return uniqueArr[1];
    //   }`,
    //   expectedOutput: 4,
    //   testInput: [1, 2, 3, 4, 5],
    //   hint: "Use the sort method to find the second largest number."
    // },
    // {
    //   description: "Fix the following function to check if a string contains only digits",
    //   code: `function isNumeric(str) {
    //     return /^\d+$/.test(str);
    //   }`,
    //   expectedOutput: true,
    //   testInput: "12345",
    //   hint: "Use the test method to check if a string contains only digits."
    // },
    // {
    //   description: "Fix the following function to find the longest substring without repeating characters",
    //   code: `function longestSubstring(str) {
    //     let longest = 0;
    //     let currentSubstring = '';
    //     for (const char of str) {
    //       const index = currentSubstring.indexOf(char);
    //       if (index !== -1) {
    //         currentSubstring = currentSubstring.slice(index + 1);
    //       }
    //       currentSubstring += char;
    //       longest = Math.max(longest, currentSubstring.length);
    //     }
    //     return longest;
    //   }`,
    //   expectedOutput: 3,
    //   testInput: "abcabcbb",
    //   hint: "Use a loop to find the longest substring without repeating characters."
    // },
    // {
    //   description: "Fix the following function to find the sum of all even numbers in an array",
    //   code: `function sumEvenNumbers(arr) {
    //     return arr.filter(num => num % 2 === 0).reduce((acc, num) => acc + num, 0);
    //   }`,
    //   expectedOutput: 6,
    //   testInput: [1, 2, 3, 4, 5],
    //   hint: "Use the filter method to filter even numbers."
    // },
    // {
    //   description: "Fix the following function to find the sum of all odd numbers in an array",
    //   code: `function sumOddNumbers(arr) {
    //     return arr.filter(num => num % 2 !== 0).reduce((acc, num) => acc + num, 0);
    //   }`,
    //   expectedOutput: 9,
    //   testInput: [1, 2, 3, 4, 5],
    //   hint: "Use the filter method to filter odd numbers."
    // },
    // {
    //   description: "Fix the following function to find the product of all numbers in an array",
    //   code: `function productOfArray(arr) {
    //     return arr.reduce((acc, num) => acc * num, 1);
    //   }`,
    //   expectedOutput: 120,
    //   testInput: [1, 2, 3, 4, 5],
    //   hint: "Use the reduce method to calculate the product."
    // },
    // {
    //   description: "Fix the following function to find the maximum product of two integers in an array",
    //   code: `function maxProduct(arr) {
    //     let max = 0;
    //     for (let i = 0; i < arr.length; i++) {
    //       for (let j = i + 1; j < arr.length; j++) {
    //         max = Math.max(max, arr[i] * arr[j]);
    //       }
    //     }
    //     return max;
    //   }`,
    //   expectedOutput: 20,
    //   testInput: [1, 2, 3, 4, 5],
    //   hint: "Use nested loops to find the maximum product."
    // },
    // {
    //   description: "Fix the following function to find the minimum product of two integers in an array",
    //   code: `function minProduct(arr) {
    //     let min = Infinity;
    //     for (let i = 0; i < arr.length; i++) {
    //       for (let j = i + 1; j < arr.length; j++) {
    //         min = Math.min(min, arr[i] * arr[j]);
    //       }
    //     }
    //     return min;
    //   }`,
    //   expectedOutput: 2,
    //   testInput: [1, 2, 3, 4, 5],
    //   hint: "Use nested loops to find the minimum product."
    // },
    // {
    //   description: "Fix the following function to find the longest common prefix among an array of strings",
    //   code: `function longestCommonPrefix(strs) {
    //     if (!strs.length) return '';
    //     let prefix = strs[0];
    //     for (let i = 1; i < strs.length; i++) {
    //       while (strs[i].indexOf(prefix) !== 0) {
    //         prefix = prefix.slice(0, -1);
    //       }
    //     }
    //     return prefix;
    //   }`,
    //   expectedOutput: "fl",
    //   testInput: ["flower", "flow", "flight"],
    //   hint: "Use a loop to find the longest common prefix."
    // },
    // {
    //   description: "Fix the following function to find the first repeating character in a string",
    //   code: `function firstRepeatingCharacter(str) {
    //     const charSet = new Set();
    //     for (const char of str) {
    //       if (charSet.has(char)) return char;
    //       charSet.add(char);
    //     }
    //     return null;
    //   }`,
    //   expectedOutput: "a",
    //   testInput: "abcda",
    //   hint: "Use a Set to track characters."
    // },
    // {
    //   description: "Fix the following function to find the longest increasing subsequence in an array",
    //   code: `function longestIncreasingSubsequence(arr) {
    //     const dp = Array(arr.length).fill(1);
    //     for (let i = 1; i < arr.length; i++) {
    //       for (let j = 0; j < i; j++) {
    //         if (arr[i] > arr[j]) {
    //           dp[i] = Math.max(dp[i], dp[j] + 1);
    //         }
    //       }
    //     }
    //     return Math.max(...dp);
    //   }`,
    //   expectedOutput: 4,
    //   testInput: [10, 9, 2, 5, 3, 7, 101, 18],
    //   hint: "Use dynamic programming to find the longest increasing subsequence."
    // },
    // {
    //   description: "Fix the following function to find the number of unique characters in a string",
    //   code: `function countUniqueCharacters(str) {
    //     return new Set(str).size;
    //   }`,
    //   expectedOutput: 10,
    //   testInput: "hello world",
    //   hint: "Use the Set object to count unique characters."
    // },
    // {
    //   description: "Fix the following function to find the sum of digits in a number",
    //   code: `function sumOfDigits(num) {
    //     return num.toString().split('').reduce((acc, digit) => acc + Number(digit), 0);
    //   }`,
    //   expectedOutput: 6,
    //   testInput: 123,
    //   hint: "Use the split method to convert the number to a string."
    // },
    // {
    //   description: "Fix the following function to check if a string is a valid email",
    //   code: `function isValidEmail(email) {
    //     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     return regex.test(email);
    //   }`,
    //   expectedOutput: true,
    //   testInput: "test@example.com",
    //   hint: "Use the test method to check if a string is a valid email."
    // },
    // {
    //   description: "Fix the following function to find the longest word in an array of strings",
    //   code: `function longestWord(arr) {
    //     return arr.reduce((longest, current) => current.length > longest.length ? current : longest, '');
    //   }`,
    //   expectedOutput: "longest",
    //   testInput: ["short", "longest", "medium"],
    //   hint: "Use the reduce method to find the longest word."
    // },
    // {
    //   description: "Fix the following function to find the first character that appears twice in a string",
    //   code: `function firstCharacterThatAppearsTwice(str) {
    //     const charSet = new Set();
    //     for (const char of str) {
    //       if (charSet.has(char)) return char;
    //       charSet.add(char);
    //     }
    //     return null;
    //   }`,
    //   expectedOutput: "a",
    //   testInput: "abcda",
    //   hint: "Use a Set to track characters."
    // },
    // {
    //   description: "Fix the following function to find the number of occurrences of a character in a string",
    //   code: `function countCharacterOccurrences(str, char) {
    //     return str.split(char).length - 1;
    //   }`,
    //   expectedOutput: 2,
    //   testInput: ["hello world", "o"],
    //   hint: "Use the split method to count occurrences."
    // },
    // {
    //   description: "Fix the following function to find the sum of squares of an array of numbers",
    //   code: `function sumOfSquares(arr) {
    //     return arr.reduce((acc, num) => acc + num * num, 0);
    //   }`,
    //   expectedOutput: 55,
    //   testInput: [1, 2, 3, 4, 5],
    //   hint: "Use the reduce method to calculate the sum of squares."
    // },
    // {
    //   description: "Fix the following function to find the product of squares of an array of numbers",
    //   code: `function productOfSquares(arr) {
    //     return arr.reduce((acc, num) => acc * (num * num), 1);
    //   }`,
    //   expectedOutput: 14400,
    //   testInput: [1, 2, 3, 4, 5],
    //   hint: "Use the reduce method to calculate the product of squares."
    // },
    // {
    //   description: "Fix the following function to find the sum of cubes of an array of numbers",
    //   code: `function sumOfCubes(arr) {
    //     return arr.reduce((acc, num) => acc + num * num * num, 0);
    //   }`,
    //   expectedOutput: 225,
    //   testInput: [1, 2, 3, 4, 5],
    //   hint: "Use the reduce method to calculate the sum of cubes."
    // },
    // {
    //   description: "Fix the following function to find the product of cubes of an array of numbers",
    //   code: `function productOfCubes(arr) {
    //     return arr.reduce((acc, num) => acc * (num * num * num), 1);
    //   }`,
    //   expectedOutput: 1728000,
    //   testInput: [1, 2, 3, 4, 5],
    //   hint: "Use the reduce method to calculate the product of cubes."
    // },
    // {
    //   description: "Fix the following function to find the sum of the first n natural numbers",
    //   code: `function sumOfFirstNNaturalNumbers(n) {
    //     return (n * (n + 1)) / 2;
    //   }`,
    //   expectedOutput: 15,
    //   testInput: 5,
    //   hint: "Use the formula to calculate the sum of the first n natural numbers."
    // },
    // {
    //   description: "Fix the following function to find the sum of the first n odd numbers",
    //   code: `function sumOfFirstNOddNumbers(n) {
    //     return n * n;
    //   }`,
    //   expectedOutput: 25,
    //   testInput: 5,
    //   hint: "Use the formula to calculate the sum of the first n odd numbers."
    // },
    // {
    //   description: "Fix the following function to find the sum of the first n even numbers",
    //   code: `function sumOfFirstNEvenNumbers(n) {
    //     return n * (n + 1);
    //   }`,
    //   expectedOutput: 30,
    //   testInput: 5,
    //   hint: "Use the formula to calculate the sum of the first n even numbers."
    // },
    // {
    //   description: "Fix the following function to find the nth Fibonacci number",
    //   code: `function nthFibonacci(n) {
    //     if (n <= 1) return n;
    //     return nthFibonacci(n - 1) + nthFibonacci(n - 2);
    //   }`,
    //   expectedOutput: 5,
    //   testInput: 5,
    //   hint: "Use recursion to find the nth Fibonacci number."
    // },
    // {
    //   description: "Fix the following function to find the number of digits in a number",
    //   code: `function countDigits(num) {
    //     return num.toString().length;
    //   }`,
    //   expectedOutput: 3,
    //   testInput: 123,
    //   hint: "Use the toString method to convert the number to a string."
    // },
    // {
    //   description: "Fix the following function to find the sum of all multiples of 3 and 5 below n",
    //   code: `function sumOfMultiplesOf3And5(n) {
    //     let sum = 0;
    //     for (let i = 0; i < n; i++) {
    //       if (i % 3 === 0 || i % 5 === 0) {
    //         sum += i;
    //       }
    //     }
    //     return sum;
    //   }`,
    //   expectedOutput: 23,
    //   testInput: 10,
    //   hint: "Use a loop to find the sum of multiples of 3 and 5."
    // },
    // {
    //   description: "Fix the following function to find the number of prime numbers less than n",
    //   code: `function countPrimes(n) {
    //     let count = 0;
    //     for (let i = 2; i < n; i++) {
    //       if (isPrime(i)) count++;
    //     }
    //     return count;
    //   }`,
    //   expectedOutput: 4,
    //   testInput: 10,
    //   hint: "Use a loop to count prime numbers."
    // },
    // {
    //   description: "Fix the following function to find the sum of all prime numbers less than n",
    //   code: `function sumOfPrimes(n) {
    //     let sum = 0;
    //     for (let i = 2; i < n; i++) {
    //       if (isPrime(i)) sum += i;
    //     }
    //     return sum;
    //   }`,
    //   expectedOutput: 17,
    //   testInput: 10,
    //   hint: "Use a loop to find the sum of prime numbers."
    // },
    // {
    //   description: "Fix the following function to find the largest prime number less than n",
    //   code: `function largestPrimeLessThan(n) {
    //     for (let i = n - 1; i >= 2; i--) {
    //       if (isPrime(i)) return i;
    //     }
    //     return null;
    //   }`,
    //   expectedOutput: 7,
    //   testInput: 10,
    //   hint: "Use a loop to find the largest prime number less than n."
    // },
    // {
    //   description: "Fix the following function to find the smallest prime number greater than n",
    //   code: `function smallestPrimeGreaterThan(n) {
    //     let num = n + 1;
    //     while (true) {
    //       if (isPrime(num)) return num;
    //       num++;
    //     }
    //   }`,
    //   expectedOutput: 11,
    //   testInput: 10,
    //   hint: "Use a loop to find the smallest prime number greater than n."
    // },
    // {
    //   description: "Fix the following function to find the sum of all even Fibonacci numbers less than n",
    //   code: `function sumOfEvenFibonacci(n) {
    //     let a = 0, b = 1, sum = 0;
    //     while (b < n) {
    //       if (b % 2 === 0) sum += b;
    //       [a, b] = [b, a + b];
    //     }
    //     return sum;
    //   }`,
    //   expectedOutput: 10,
    //   testInput: 10,
    //   hint: "Use a loop to find the sum of even Fibonacci numbers."
    // },
    // {
    //   description: "Fix the following function to find the sum of all odd Fibonacci numbers less than n",
    //   code: `function sumOfOddFibonacci(n) {
    //     let a = 0, b = 1, sum = 0;
    //     while (b < n) {
    //       if (b % 2 !== 0) sum += b;
    //       [a, b] = [b, a + b];
    //     }
    //     return sum;
    //   }`,
    //   expectedOutput: 10,
    //   testInput: 10,
    //   hint: "Use a loop to find the sum of odd Fibonacci numbers."
    // },
    // {
    //   description: "Fix the following function to find the sum of all prime Fibonacci numbers less than n",
    //   code: `function sumOfPrimeFibonacci(n) {
    //     let a = 0, b = 1, sum = 0;
    //     while (b < n) {
    //       if (isPrime(b)) sum += b;
    //       [a, b] = [b, a + b];
    //     }
    //     return sum;
    //   }`,
    //   expectedOutput: 10,
    //   testInput: 10,
    //   hint: "Use a loop to find the sum of prime Fibonacci numbers."
    // },
    // {
    //   description: "Fix the following function to find the sum of all composite Fibonacci numbers less than n",
    //   code: `function sumOfCompositeFibonacci(n) {
    //     let a = 0, b = 1, sum = 0;
    //     while (b < n) {
    //       if (!isPrime(b) && b > 1) sum += b;
    //       [a, b] = [b, a + b];
    //     }
    //     return sum;
    //   }`,
    //   expectedOutput: 0,
    //   testInput: 10,
    //   hint: "Use a loop to find the sum of composite Fibonacci numbers."
    // },
    // {
    //   description: "Fix the following function to find the factorial of a number",
    // //   code: `function factorial(n) {
    // //     return n <= 1 ? 1 : n * factorial(n - 1);
    // //   }`,
    //   code: `function factorial(n) {
    //     return n <= 1 ? 1 : n * n;
    //   }`,
    //   expectedOutput: 120,
    //   testInput: 5,
    //   hint: "Use recursion to calculate the factorial."
    // },
    // {
    //   description: "Fix the following function to check if a string is a palindrome",
    //   code: `function isPalindrome(str) {
    //     return str === str.split('').reverse().join('');
    //   }`,
    //   expectedOutput: true,
    //   testInput: "racecar",
    //   hint: "Consider how to compare strings in JavaScript."
    // },
  ];