
def is_valid(board, num, row, col):
  
    if num in board[row]:
        return False


    for i in range(9):
        if board[i][col] == num:
            return False


    sr, sc = (row // 3) * 3, (col // 3) * 3
    for i in range(3):
        for j in range(3):
            if board[sr + i][sc + j] == num:
                return False

    return True



def solve(board):
    for i in range(9):
        for j in range(9):
            if board[i][j] == 0:
                for num in range(1, 10):
                    if is_valid(board, num, i, j):
                        board[i][j] = num

                        if solve(board):
                            return True

                        board[i][j] = 0 

                return False
    return True



def solve_sudoku(board):
    import copy
    board_copy = copy.deepcopy(board)

    if solve(board_copy):
        return board_copy
    return None


def count_solutions(board):
    count = 0

    def backtrack():
        nonlocal count

        if count > 1:  
            return

        for i in range(9):
            for j in range(9):
                if board[i][j] == 0:
                    for num in range(1, 10):
                        if is_valid(board, num, i, j):
                            board[i][j] = num
                            backtrack()
                            board[i][j] = 0
                    return

        count += 1

    backtrack()
    return count