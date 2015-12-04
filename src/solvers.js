/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  //Create a new board instance.
  var solution = new Board({n: n});

  var board = solution.rows(); 

  //Iterate through the entire board
  for(var rowIndex = 0; rowIndex < board.length; rowIndex++) {
    for(var colIndex = 0; colIndex < board.length; colIndex++) {
      //toggle the pieace at the row and column index
      solution.togglePiece(rowIndex, colIndex);
      //If any row or column conflicts
      if(solution.hasAnyRowConflicts() || solution.hasAnyColConflicts()) {
        //toggle piece back;
        solution.togglePiece(rowIndex, colIndex);
      } 
    }
  }  
   
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solution = new Board({n:n}); //fixme
  var solutionCount = 0;
  var board = solution.rows()
 
  //Define findSolution func that takes in a column index input
  var findSolution = function (row) {
    //iterate through board starting row(i) = 0 and column = column input
    for ( var column = 0; column < board.length; column++ ) {
      solution.togglePiece(row, column)
      //board[row][column] = 1;
      if( solution.hasAnyColConflicts() || solution.hasAnyRowConflicts() ) {
        solution.togglePiece(row,column);
      } else {
        
        if( row === n - 1 ) {
          solutionCount++;
        } else {
          findSolution(row+1);
        }
          
        solution.togglePiece(row, column);  

      }

    }
      //basically run findNRooks solution using the row and column inputs
      //If solution add to solution conunt
  };

  findSolution(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  //Create a new board instance
  var solution = new Board({n:n}); //fixme
  var solutionCount = 0;
  var board = solution.rows()
  var result; 
  //Define findSolution func that takes in a column index input
  var findSolution = function (row) {
    //iterate through board starting row(i) = 0 and column = column input
    for ( var column = 0; column < board.length; column++ ) {
      solution.togglePiece(row, column)
      //board[row][column] = 1;
      if( solution.hasAnyQueensConflicts() ) {
        solution.togglePiece(row,column);
      } else {
        
        if( row === n - 1 ) {
          solutionCount++; 
          
        } else {
          findSolution(row+1);
        }

        if (solutionCount === 1) {
          return;
        }  
        solution.togglePiece(row, column);  
        

      }
    }
  };

  findSolution(0);
  return solution.rows(); 
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solution = new Board({n:n}); //fixme
  var solutionCount = 0;
  var board = solution.rows()

  console.log('board')
  if ( n === 0) {
    solutionCount ++;
  }
  //Define findSolution func that takes in a column index input
  var findSolution = function (row) {
    //iterate through board starting row(i) = 0 and column = column input
    for ( var column = 0; column < board.length; column++ ) {
      solution.togglePiece(row, column); 
      if( solution.hasAnyQueensConflicts() ) {
        solution.togglePiece(row,column);
      } else {
        
        if( row === n - 1 ) {
          solutionCount++;
        } else {
          findSolution(row+1);
        }
          
        solution.togglePiece(row, column);  

      }

    }
      //basically run findNRooks solution using the row and column inputs
      //If solution add to solution conunt
     // console.log('solution')
  };
  findSolution(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
