# Day 9: Rope Bridge

## First part

This rope bridge creaks as you walk along it. You aren't sure how old it is, or whether it can even support your weight.

It seems to support the Elves just fine, though. The bridge spans a gorge which was carved out by the massive river far below you.

You step carefully; as you do, the ropes stretch and twist. You decide to distract yourself by modeling rope physics; maybe you can even figure out where not to step.

Consider a rope with a knot at each end; these knots mark the head and the tail of the rope. If the head moves far enough away from the tail, the tail is pulled toward the head.

Due to nebulous reasoning involving Planck lengths, you should be able to model the positions of the knots on a two-dimensional grid. Then, by following a hypothetical series of motions (your puzzle input) for the head, you can determine how the tail will move.

Due to the aforementioned Planck lengths, the rope must be quite short; in fact, the head (H) and tail (T) must always be touching (diagonally adjacent and even overlapping both count as touching):
 <br/>
....  <br/>
.TH.  <br/>
....  <br/>
 <br/>
....  <br/>
.H..  <br/>
..T.  <br/>
....  <br/>

...  <br/>
.H. (H covers T)  <br/>
...  <br/>

If the head is ever two steps directly up, down, left, or right from the tail, the tail must also move one step in that direction so it remains close enough:
 <br/>
.....    .....    .....  <br/>
.TH.. -> .T.H. -> ..TH.  <br/>
.....    .....    .....  <br/>
 <br/>
...    ...    ...  <br/>
.T.    .T.    ...  <br/>
.H. -> ... -> .T.  <br/>
...    .H.    .H.  <br/>
...    ...    ...  <br/>

Otherwise, if the head and tail aren't touching and aren't in the same row or column, the tail always moves one step diagonally to keep up:
 <br/>
.....    .....    .....  <br/>
.....    ..H..    ..H..  <br/>
..H.. -> ..... -> ..T..  <br/>
.T...    .T...    .....  <br/>
.....    .....    .....
 <br/>
.....    .....    .....  <br/>
.....    .....    .....  <br/>
..H.. -> ...H. -> ..TH.  <br/>
.T...    .T...    .....  <br/>
.....    .....    .....  <br/>

You just need to work out where the tail goes as the head follows a series of motions. Assume the head and the tail both start at the same position, overlapping.

For example:
> R 4 <br/>
> U 4 <br/>
> L 3 <br/>
> D 1 <br/>
> R 4 <br/>
> D 1 <br/>
> L 5 <br/>
> R 2 <br/>

This series of motions moves the head right four steps, then up four steps, then left three steps, then down one step, and so on. After each step, you'll need to update the position of the tail if the step means the head is no longer adjacent to the tail. Visually, these motions occur as follows (s marks the starting position as a reference point):

== Initial State ==

......  <br/>
......  <br/>
......  <br/>
......  <br/>
H.....  (H covers T, s)  <br/>

== R 4 ==

......  <br/>
......  <br/>
......  <br/>
......
TH....  (T covers s)  <br/>

......  <br/>
......  <br/>
......  <br/>
......  <br/>
sTH...  <br/>

......  <br/>
......  <br/>
......  <br/>
......  <br/>
s.TH..  <br/>

......  <br/>
......  <br/>
......  <br/>
......  <br/>
s..TH.  <br/>

== U 4 ==

......  <br/>
......  <br/>
......  <br/>
....H.  <br/>
s..T..  <br/>

......  <br/>
......  <br/>
....H.  <br/>
....T.  <br/>
s.....  <br/>

......  <br/>
....H.  <br/>
....T.  <br/>
......  <br/>
s.....  <br/>

....H.  <br/>
....T.  <br/>
......  <br/>
......  <br/>
s.....  <br/>

== L 3 ==

...H..  <br/>
....T.  <br/>
......  <br/>
......  <br/>
s.....  <br/>

..HT..  <br/>
......  <br/>
......  <br/>
......  <br/>
s.....  <br/>

.HT...  <br/>
......  <br/>
......  <br/>
......  <br/>
s.....  <br/>

== D 1 ==

..T...  <br/>
.H....  <br/>
......  <br/>
......  <br/>
s.....  <br/>

== R 4 ==

..T...  <br/>
..H...  <br/>
......  <br/>
......  <br/>
s.....  <br/>

..T...  <br/>
...H..  <br/>
......  <br/>
......  <br/>
s.....  <br/>

......  <br/>
...TH.  <br/>
......  <br/>
......  <br/>
s.....  <br/>

......  <br/>
....TH  <br/>
......  <br/>
......  <br/>
s.....  <br/>

== D 1 ==

......  <br/>
....T.  <br/>
.....H  <br/>
......  <br/>
s.....  <br/>

== L 5 ==

......  <br/>
....T.  <br/>
....H.  <br/>
......  <br/>
s.....  <br/>

......  <br/>
....T.  <br/>
...H..  <br/>
......  <br/>
s.....  <br/>

......  <br/>
......  <br/>
..HT..  <br/>
......  <br/>
s.....  <br/>

......  <br/>
......  <br/>
.HT...  <br/>
......  <br/>
s.....  <br/>

......  <br/>
......  <br/>
HT....  <br/>
......  <br/>
s.....  <br/>

== R 2 ==

......  <br/>
......  <br/>
.H....  (H covers T)  <br/>
......  <br/>
s.....  <br/>

......  <br/>
......  <br/>
.TH...  <br/>
......  <br/>
s.....  <br/>

After simulating the rope, you can count up all of the positions the tail visited at least once. In this diagram, s again marks the starting position (which the tail also visited) and # marks other positions the tail visited:

..##..  <br/>
...##.  <br/>
.####.  <br/>
....#.  <br/>
s###..  <br/>

So, there are 13 positions the tail visited at least once.

### Simulate your complete hypothetical series of motions. How many positions does the tail of the rope visit at least once?
Your puzzle answer was 5683.

## Second part

A rope snaps! Suddenly, the river is getting a lot closer than you remember. The bridge is still there, but some of the ropes that broke are now whipping toward you as you fall through the air!

The ropes are moving too quickly to grab; you only have a few seconds to choose how to arch your body to avoid being hit. Fortunately, your simulation can be extended to support longer ropes.

Rather than two knots, you now must simulate a rope consisting of ten knots. One knot is still the head of the rope and moves according to the series of motions. Each knot further down the rope follows the knot in front of it using the same rules as before.

Using the same series of motions as the above example, but with the knots marked H, 1, 2, ..., 9, the motions now occur as follows:

== Initial State ==

......  <br/>
......  <br/>
......  <br/>
......  <br/>
H.....  (H covers 1, 2, 3, 4, 5, 6, 7, 8, 9, s)  <br/>

== R 4 ==

......  <br/>
......  <br/>
......  <br/>
......  <br/>
1H....  (1 covers 2, 3, 4, 5, 6, 7, 8, 9, s)  <br/>

......  <br/>
......  <br/>
......  <br/>
......  <br/>
21H...  (2 covers 3, 4, 5, 6, 7, 8, 9, s)  <br/>

......  <br/>
......  <br/>
......  <br/>
......  <br/>
321H..  (3 covers 4, 5, 6, 7, 8, 9, s)  <br/>

......  <br/>
......  <br/>
......  <br/>
......  <br/>
4321H.  (4 covers 5, 6, 7, 8, 9, s)  <br/>

== U 4 ==

......  <br/>
......  <br/>
......  <br/>
....H.  <br/>
4321..  (4 covers 5, 6, 7, 8, 9, s)  <br/>

......  <br/>
......  <br/>
....H.  <br/>
.4321.  <br/>
5.....  (5 covers 6, 7, 8, 9, s)  <br/>

......  <br/>
....H.  <br/>
....1.  <br/>
.432..  <br/>
5.....  (5 covers 6, 7, 8, 9, s)  <br/>

....H.  <br/>
....1.  <br/>
..432.  <br/>
.5....  <br/>
6.....  (6 covers 7, 8, 9, s)  <br/>

== L 3 ==

...H..  <br/>
....1.  <br/>
..432.  <br/>
.5....  <br/>
6.....  (6 covers 7, 8, 9, s)  <br/>

..H1..  <br/>
...2..  <br/>
..43..  <br/>
.5....  <br/>
6.....  (6 covers 7, 8, 9, s)  <br/>

.H1...  <br/>
...2..  <br/>
..43..  <br/>
.5....  <br/>
6.....  (6 covers 7, 8, 9, s)  <br/>

== D 1 ==

..1...  <br/>
.H.2..  <br/>
..43..  <br/>
.5....  <br/>
6.....  (6 covers 7, 8, 9, s)  <br/>

== R 4 ==

..1...  <br/>
..H2..  <br/>
..43..  <br/>
.5....  <br/>
6.....  (6 covers 7, 8, 9, s)  <br/>

..1...  <br/>
...H..  (H covers 2)  <br/>
..43..  <br/>
.5....  <br/>
6.....  (6 covers 7, 8, 9, s)  <br/>

......  <br/>
...1H.  (1 covers 2)  <br/>
..43..  <br/>
.5....  <br/>
6.....  (6 covers 7, 8, 9, s)  <br/>

......  <br/>
...21H  <br/>
..43..  <br/>
.5....  <br/>
6.....  (6 covers 7, 8, 9, s)  <br/>

== D 1 ==

......  <br/>
...21.  <br/>
..43.H  <br/>
.5....  <br/>
6.....  (6 covers 7, 8, 9, s)  <br/>

== L 5 ==

......  <br/>
...21.  <br/>
..43H.  <br/>
.5....  <br/>
6.....  (6 covers 7, 8, 9, s)  <br/>

......  <br/>
...21.  <br/>
..4H..  (H covers 3)  <br/>
.5....  <br/>
6.....  (6 covers 7, 8, 9, s)  <br/>

......  <br/>
...2..  <br/>
..H1..  (H covers 4; 1 covers 3)  <br/>
.5....  <br/>
6.....  (6 covers 7, 8, 9, s)  <br/>

......  <br/>
...2..  <br/>
.H13..  (1 covers 4)  <br/>
.5....  <br/>
6.....  (6 covers 7, 8, 9, s)  <br/>

......  <br/>
......  <br/>
H123..  (2 covers 4)  <br/>
.5....  <br/>
6.....  (6 covers 7, 8, 9, s)  <br/>

== R 2 ==

......  <br/>
......  <br/>
.H23..  (H covers 1; 2 covers 4)  <br/>
.5....  <br/>
6.....  (6 covers 7, 8, 9, s)  <br/>

......  <br/>
......  <br/>
.1H3..  (H covers 2, 4)  <br/>
.5....  <br/>
6.....  (6 covers 7, 8, 9, s)  <br/>

Now, you need to keep track of the positions the new tail, 9, visits. In this example, the tail never moves, and so it only visits 1 position. However, be careful: more types of motion are possible than before, so you might want to visually compare your simulated rope to the one above.

Here's a larger example:
> R 5 <br/>
> U 8 <br/>
> L 8 <br/>
> D 3 <br/>
> R 17 <br/>
> D 10 <br/>
> L 25 <br/>
> U 20 <br/>

These motions occur as follows (individual steps are not shown):

== Initial State ==

..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
...........H..............  (H covers 1, 2, 3, 4, 5, 6, 7, 8, 9, s)  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>

== R 5 ==

..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
...........54321H.........  (5 covers 6, 7, 8, 9, s)  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>

== U 8 ==

..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
................H.........  <br/>
................1.........  <br/>
................2.........  <br/>
................3.........  <br/>
...............54.........  <br/>
..............6...........  <br/>
.............7............  <br/>
............8.............  <br/>
...........9..............  (9 covers s)  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>

== L 8 ==

..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
........H1234.............  <br/>
............5.............  <br/>
............6.............  <br/>
............7.............  <br/>
............8.............  <br/>
............9.............  <br/>
..........................  <br/>
..........................  <br/>
...........s..............  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>

== D 3 ==

..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
.........2345.............  <br/>
........1...6.............  <br/>
........H...7.............  <br/>
............8.............  <br/>
............9.............  <br/>
..........................  <br/>
..........................  <br/>
...........s..............  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>

== R 17 ==

..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
................987654321H  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
...........s..............  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>

== D 10 ==

..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
...........s.........98765  <br/>
.........................4  <br/>
.........................3  <br/>
.........................2  <br/>
.........................1  <br/>
.........................H  <br/>

== L 25 ==

..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
...........s..............  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
H123456789................  <br/>

== U 20 ==

H.........................  <br/>
1.........................  <br/>
2.........................  <br/>
3.........................  <br/>
4.........................  <br/>
5.........................  <br/>
6.........................  <br/>
7.........................  <br/>
8.........................  <br/>
9.........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
...........s..............  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>

Now, the tail (9) visits 36 positions (including s) at least once:

..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
..........................  <br/>
#.........................  <br/>
#.............###.........  <br/>
#............#...#........  <br/>
.#..........#.....#.......  <br/>
..#..........#.....#......  <br/>
...#........#.......#.....  <br/>
....#......s.........#....  <br/>
.....#..............#.....  <br/>
......#............#......  <br/>
.......#..........#.......  <br/>
........#........#........  <br/>
.........########.........  <br/>

### Simulate your complete series of motions on a larger rope with ten knots. How many positions does the tail of the rope visit at least once?
Your puzzle answer was 2372.

[Go to puzzle](https://adventofcode.com/2022/day/9)
