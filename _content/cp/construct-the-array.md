---
title: 'Construct the array (Medium)'
subtitle: 'How to use Dynamic Programming to solve a programming puzzle'
date: 2022-06-23 17:50:00
category: 'Algorithm'
---

# Problem
Your goal is to find the number of ways to construct an array such that consecutive positions contain different values.

Specifically, we want to construct an array with `n` elements such that each element between `1` and `k`, inclusive. We also want the first and last elements of the array to be `1` and `x`.

## Example
For example, for `n=4`, `k=3`, `x=2`, there are `3` ways, as shown here:
```cpp
1 2 1 2
1 2 3 2
1 3 1 2
```
## Constraints
- 3 <= n <= 10<sup>5</sup>
- 2 <= k <= 10<sup>5</sup>
- 1 <= x <= k

Read more: https://www.hackerrank.com/challenges/construct-the-array

# Solution
## Strategy
We will apply the idea of `Dynamic Programming`.

- Let `f(i)` indicates the number of ways to contruct array of `i` length and the last number **must not be** `x`.
- Let `g(i)` indicates the number of ways to contruct array of `i` length and the last number **must be** `x`.

Easily we see **the answer is `g(x)`**. 
We can calculate some initial value without much difficulty.

---
If x == 1
```cpp
f(1) = 0
f(2) = k - 1
g(1) = 1
g(2) = 0
```
If x != 1
```cpp
f(1) = 1
f(2) = k - 2
g(1) = 0
g(2) = 1
```
Take a step back and observe, we would notice that `f(i)` and `g(i)` can be calculated using `f(i-1)` and `g(i-1)`.
There are only 1 way to pick `x` at position `i`, so
```cpp
g(i) = f(i - 1)
```
If the previous number is not `x`, we will lost 2 candidates. Thus, there are `k - 2` ways to pick a number at `i`.
If the previous number is `x`, we only lost 1 candidate. Thus, there are `k - 1` ways to pick a number at `i`.
Combine them we have
```cpp
f(i) = (k - 2) * f(i - 1) + (k - 1) * g(i - 1)
```

That's conclude our solution.

## Code

Readable code
```cpp
#define INF 1000000007
long countArray(int n, int k, int x) {
    long f[100001];
    long g[100001];
    if(x == 1) {
        g[1] = 1;
        f[1] = 0;
    } else {
        g[1] = 0;
        f[1] = 1;
    }
    for(int i=2;i<=n;i++) {
        f[i] = ((k-2)*f[i-1] + (k-1)*g[i-1])%INF;
        g[i] = f[i-1];
    }
    return g[n];
}
```
Optimized code
```cpp
#define INF 1000000007
long countArray(int n, int k, int x) {
    long f, g, tmp;
    if(x == 1) {
        g = 1;
        f = 0;
    } else {
        g = 0;
        f = 1;
    }
    for(int i=2;i<n;i++) {
        tmp = ((k-2)*f + (k-1)*g)%INF;
        g = f;
        f = tmp;
    }
    return f;
}
```
