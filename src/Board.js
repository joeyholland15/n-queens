// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var count = 0;
      //console.log('rowIndex', rowIndex)
      // _.each(row, function (piece) {
      //   if( piece === 1) {
      //     count++;
      //   }
      // });
      for(var i = 0; i < rowIndex.length; i++) {
        if(rowIndex[i] === 1) {
          count++;
        }
      }

      if ( count > 1) {
        return true;
      } else {
        return false;
      }


    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var board = this.rows();

      var conflict = false;
      // _.each(board, function(row) {
      //   if( that.hasRowConflictAt(row) ) {
      //     conflict = true;
      //   }
      // });

      for(var i = 0; i < board.length; i++) {
        console.log('board[i]', board[i])
        if(this.hasRowConflictAt(board[i])) {
          conflict = true; 
        }
      }
      return conflict;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      
      var count = 0; 
      for(var i = 0; i < colIndex.length; i++) {
        if(colIndex[i] === 1) {
          count++; 
        }
      };
      if(count > 1) {
        return true;
      } else {
        return false;
      }

      // return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      
      var board = this.rows();
      
      var columnArray = [];
      var conflict = false;

      //We transformed the row array matrix to a column row matrix
      for(var n = 0; n < board.length; n++ ) {
        var columnInstance = []; 
        for(var i = 0; i < board.length; i++) {
         columnInstance.push(board[i][n]);
        }
        columnArray.push(columnInstance);
      } 

      for ( var j = 0; j < columnArray.length; j++ ) {
        if( this.hasColConflictAt(columnArray[j]) ) {
          conflict = true;
        }
      }
      return conflict;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      console.log('majorDiagonalColumnIndexAtFirstRow', majorDiagonalColumnIndexAtFirstRow);

      //create a diagnoal row variable = 0;
      var diagonalRow = 0;
      //create a diagonal column variable  majorDiagonalColumnIndexAtFirstRow
      var diagonalColumn = 0;
      var count = 0;
      var board = [[1,1],[0,1]];
    

      //iterate through each piece of the board
      for ( var boardRow = 0; boardRow < board.length; boardRow ++ ) {
        for ( var boardColumn = 0; boardColumn < board.length; boardColumn ++) {
         //if the piece === 1 && the piece is diagonal
         var isDiagonal;
         if( diagonalRow !== boardRow && diagonalColumn !== boardColumn ) { 
           isDiagonal = ( boardRow - diagonalRow ) === ( boardColumn - diagonalColumn )  
         } else {
          isDiagonal = false;
         }
            // //increment the count 
           console.log('boardRow',boardRow,'boardColumn', boardColumn, 'Board',board, 'board[boardRow][boardColumn]',board[boardRow][boardColumn], 'isDiagonal',isDiagonal )
           if( board[boardRow][boardColumn] === 1 && isDiagonal) {

             count++;   
           }
           
          
        }
      }

    if ( count > 1) {
      return true;
    } else {
      return false;
    }
      
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
