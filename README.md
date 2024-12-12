# odin-knights-travails

## Assignment
Your task is to build a function knightMoves that shows the shortest possible way to get from one square to another by outputting all squares the knight will stop on along the way.

You can think of the board as having 2-dimensional coordinates. Your function would therefore look like:

knightMoves([0,0],[1,2]) == [[0,0],[1,2]]

NOTE: Sometimes there is more than one fastest path. Examples of this are shown below. Any answer is correct as long as it follows the rules and gives the shortest possible path.

knightMoves([0,0],[3,3]) == [[0,0],[2,1],[3,3]] or knightMoves([0,0],[3,3]) == [[0,0],[1,2],[3,3]]
knightMoves([3,3],[0,0]) == [[3,3],[2,1],[0,0]] or knightMoves([3,3],[0,0]) == [[3,3],[1,2],[0,0]]
knightMoves([0,0],[7,7]) == [[0,0],[2,1],[4,2],[6,3],[4,4],[6,5],[7,7]] or knightMoves([0,0],[7,7]) == [[0,0],[2,1],[4,2],[6,3],[7,5],[5,6],[7,7]]

Think about the rules of the board and knight, and make sure to follow them.
For every square there is a number of possible moves, choose a data structure that will allow you to work with them. Don’t allow any moves to go off the board.
Decide which search algorithm is best to use for this case. Hint: one of them could be a potentially infinite series.
Use the chosen search algorithm to find the shortest path between the starting square (or node) and the ending square. Output what that full path looks like, e.g.:

```js
{
> knightMoves([3,3],[4,3])
  => You made it in 3 moves!  Here's your path:
    [3,3]
    [4,5]
    [2,4]
    [4,3]
}
```

## Notes
This is very interesting: https://www.reddit.com/r/chess/comments/3v9ud0/the_knight_in_chess_can_land_on_every_square_once/?rdt=37006

Very helpful links(!):
https://stackoverflow.com/questions/55239386/finding-shortest-path-in-two-dimensional-array-javascript

https://www.youtube.com/watch?v=tWVWeAqZ0WU

https://www.youtube.com/watch?v=KiCBXu4P-2Y

https://www.youtube.com/watch?v=xlVX7dXLS64

https://www.youtube.com/watch?v=b0FJUewRocg

https://www.youtube.com/watch?v=lKwvVsI9r94

## TODO
(Maybe...) Possibly rework code to show all the shortest paths.

***
