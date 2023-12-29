# SonicWeave standard library
<!-- This file has been auto-generated by scripts/builtin-docs.ts !-->
## Built-in functions
### ablin
Convert interval to absolute linear representation.
#### Parameters:

`interval`

### ablog
Convert interval to absolute logarithmic representation.
#### Parameters:

`interval`

### abs
Calculate the absolute value of the interval.
#### Parameters:

`value`

### absoluteFJS
Convert interval to absolute FJS.
#### Parameters:

`interval`

### arrayReduce
Reduce the given/current scale to a single value by `reducer` riff.
#### Parameters:

`reducer`, `initialValue`, `array`

### bool
Convert value to a boolean.
#### Parameters:

`value`

### ceil
Round value up to the nearest integer.
#### Parameters:

`value`

### cents
Convert interval to cents.
#### Parameters:

`interval`, `fractionDigits`

### cologarithmic
Convert interval to cologarithmic representation.
#### Parameters:

`interval`

### decimal
Convert interval to a decimal number.
#### Parameters:

`interval`, `fractionDigits`

### dir
Obtain the javascript representation of the value.
#### Parameters:

`arg`

### distill
Remove intervals from the given/current scale that evaluate to `false` according to the `tester` riff.
#### Parameters:

`tester`, `array`

### doc
Obtain the docstring of the given riff.
#### Parameters:

`riff`

### filter
Obtain a copy of the given/current scale containing values that evaluate to `true` according to the `tester` riff.
#### Parameters:

`tester`, `array`

### FJS
Convert interval to (relative) FJS.
#### Parameters:

`interval`

### floor
Round value down to the nearest integer.
#### Parameters:

`value`

### fraction
Convert interval to a fraction.
#### Parameters:

`interval`, `epsilon`

### hasConstantStructure
Returns `true` if the current/given scale has constant structure (i.e. every scale degree is unambiguous).
#### Parameters:

`scale`

### help
Print information about the given riff to the console.
#### Parameters:

`riff`

### int
Truncate value towards zero to the nearest integer.
#### Parameters:

`value`

### isArray
Return `true` if the value is an array.
#### Parameters:

`value`

### isPrime
Return `true` if `n` is a prime number, `false` otherwise.
#### Parameters:

`n`

### kCombinations
Obtain all k-sized combinations in a set
#### Parameters:

`set`, `k`

### length
Return the number of intervals in the scale.
#### Parameters:

`scale`

### linear
Convert interval to linear representation.
#### Parameters:

`interval`

### logarithmic
Convert interval to logarithmic representation.
#### Parameters:

`interval`

### map
Map a riff over the given/current scale producing a new scale.
#### Parameters:

`mapper`, `array`

### max
Obtain the argument with the maximum value.
#### Parameters:

`...args`

### min
Obtain the argument with the minimum value.
#### Parameters:

`...args`

### monzo
Convert interval to a prime count vector a.k.a. monzo.
#### Parameters:

`interval`

### mosSubset
Calculate a subset of equally tempered degrees with maximum variety two per scale degree.
#### Parameters:

`numberOfLargeSteps`, `numberOfSmallSteps`, `sizeOfLargeStep`, `sizeOfSmallStep`, `up`, `down`

### pop
Remove and return the last interval in the current/given scale.
#### Parameters:

`scale`

### primes
Obtain an array of prime numbers such that start <= p <= end.
#### Parameters:

`start`, `end`

### print
Print the arguments to the console.
#### Parameters:

`...args`

### push
Append an interval onto the current/given scale.
#### Parameters:

`interval`, `scale`

### radical
Convert interval to a radical expression.
#### Parameters:

`interval`, `maxIndex`, `maxHeight`

### random
Obtain a random value between (linear) 0 and 1.
_(No parameters)_

### randomCents
Obtain random cents between (logarithmic) 0.0c and 1.0c.
_(No parameters)_

### relin
Convert interval to relative linear representation.
#### Parameters:

`interval`

### relog
Convert interval to relative logarithmic representation.
#### Parameters:

`interval`

### remap
Map a riff over the given/current scale replacing the content.
#### Parameters:

`mapper`, `array`

### reverse
Reverse the order of the current/given scale.
#### Parameters:

`scale`

### round
Round value to the nearest integer.
#### Parameters:

`value`

### shift
Remove and return the first interval in the current/given scale.
#### Parameters:

`scale`

### simplify
Get rid of interval formatting, coloring and label.
#### Parameters:

`interval`

### slice
Obtain a slice of a string or scale between the given indices.
#### Parameters:

`array`, `indexStart`, `indexEnd`

### sort
Sort the current/given scale in ascending order.
#### Parameters:

`scale`

### toString
Obtain a string representation of the value.
#### Parameters:

`value`

### trunc
Truncate value towards zero to the nearest integer.
#### Parameters:

`value`

### trunc
Truncate value towards zero to the nearest integer.
#### Parameters:

`value`

### unshift
Prepend an interval at the beginning of the current/given scale.
#### Parameters:

`interval`, `scale`

### upsAs
Change up arrows to the given interval (mapping comma).
#### Parameters:

`comma`

### zip
Combine elements of each array into tuples until one of them is exhausted.
#### Parameters:

`...args`

### zipLongest
Combine elements of each array into tuples until all of them are exhausted. Pads missing values with `niente`.
#### Parameters:

`...args`

## Prelude functions
### ags
Generate an alternating generator sequence. Zero ordinal corresponds to the (trivial) stack of all generators while positive ordinals denote scales with constant structure ordered by increasing size.
#### Parameters:

`generators`, `ordinal`, `period`, `numPeriods`, `maxSize`

### cbrt
Calculate the cube root of the input.
#### Parameters:

`x`

### clear
Remove the contents of the current/given scale.
#### Parameters:

`scale`

### cps
Generate a combination product set from the given factors and combination size.
#### Parameters:

`factors`, `count`, `equave`, `withUnity`

### cumprod
Calculate the cumulative products of the factors in the array. (i.e. logarithmic cumulative sum)
#### Parameters:

`array`

### cumsum
Calculate the cumulative sums of the terms in the array.
#### Parameters:

`array`

### ed
Generate an equal temperament with the given number of divisions of the given equave/octave.
#### Parameters:

`divisions`, `equave`

### eulerGenus
Span a lattice from all divisors of the guide-tone rotated to the root-tone.
#### Parameters:

`guide`, `root`, `equave`

### ftom
Convert absolute frequency to MIDI note number / MTS value (fractional semitones with A440 = 69).
#### Parameters:

`freq`

### ground
Use the first interval in the current/given scale as the implicit unison.
#### Parameters:

`scale`

### invert
Invert the current/given scale (negative harmony).
#### Parameters:

`scale`

### keepUnique
Only keep unique intervals in the current/given scale.
#### Parameters:

`scale`

### label
Apply labels (or colors) from the first array to the current/given scale.
#### Parameters:

`labels`, `scale`

### mergeOffset
Merge the given offset or polyoffset of the current/given scale onto itself. `overflow` is one of 'keep', 'drop' or 'wrap' and controls what to do with offset intervals outside of current bounds.
#### Parameters:

`offsets`, `overflow`, `scale`

### mos
Generate a Moment-Of-Symmetry scale with the given number number of large and small steps.   Size of the large step defaults to 2. Size of the small step defaults to 1.   `up` defines the brightness of the mode i.e. the number of major intervals from the root.   Alternatively `down` defines the darkness of the mode i.e. the number of minor intervals from the root.   The default `equave` is the octave `2/1`.
#### Parameters:

`numberOfLargeSteps`, `numberOfSmallSteps`, `sizeOfLargeStep`, `sizeOfSmallStep`, `up`, `down`, `equave`

### mtof
Convert MIDI note number to absolute frequency.
#### Parameters:

`index`

### octaplex
Generate a 4-dimensional octaplex a.k.a. 20-cell from the given basis intervals.
#### Parameters:

`b0`, `b1`, `b2`, `b3`, `equave`, `withUnity`

### prod
Calculate the (linear) product of the factors. (i.e. the logarithmic sum)
#### Parameters:

`factors`

### randomVariance
Add random variance to the current/given scale.
#### Parameters:

`amount`, `varyEquave`, `scale`

### rank2
Generate a finite segment of a Rank-2 scale generated by stacking the given generator against the given period (or the octave `2/1` by default).
#### Parameters:

`generator`, `up`, `down`, `period`, `numPeriods`

### reduce
Reduce the current/given scale by its equave.
#### Parameters:

`scale`

### repeat
Stack the current/given scale on top of itself. Clears the scale if the number of repeats is zero.
#### Parameters:

`times`

### rotate
Rotate the current/given scale onto the given degree.
#### Parameters:

`onto`, `scale`

### spanLattice
Span a lattice by extending a basis combinatorically.
#### Parameters:

`basis`, `ups`, `downs`, `equave`

### sqrt
Calculate the square root of the input.
#### Parameters:

`x`

### stretch
Stretch the current/given scale by the given amount. A value of `1` corresponds to no change.
#### Parameters:

`amount`, `scale`

### subharmonics
Generate a subharmonic segment including the given start and end points.
#### Parameters:

`start`, `end`

### subset
Only keep the given indices (scale degrees) of the current/given scale.
#### Parameters:

`indices`, `scale`

### sum
Calculate the (linear) sum of the terms.
#### Parameters:

`terms`

### toSubharmonics
Quantize the current/given scale to subharmonics of the given overtone.
#### Parameters:

`overtone`, `scale`

### void
Get rid of expression results. `void(i++)` increments the value but doesn't push anything onto the scale.
_(No parameters)_

### wellTemperament
Generate a well-temperament by cumulatively modifying the pure fifth `3/2` (or a given generator) by fractions of the syntonic/given comma.
#### Parameters:

`commaFractions`, `comma`, `down`, `generator`, `period`
