import random
import copy
from solver import solve, count_solutions



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



def fill(board):
    for i in range(9):
        for j in range(9):
            if board[i][j] == 0:

                nums = list(range(1, 10))
                random.shuffle(nums)

                for num in nums:
                    if is_valid(board, num, i, j):
                        board[i][j] = num

                        if fill(board):
                            return True

                        board[i][j] = 0

                return False
    return True



def remove_cells(board, empty_cells):
    removed = 0
    attempts = 0
    max_attempts = empty_cells * 10

    while removed < empty_cells and attempts < max_attempts:
        row = random.randint(0, 8)
        col = random.randint(0, 8)

        if board[row][col] == 0:
            attempts += 1
            continue

        backup = board[row][col]
        board[row][col] = 0

        temp_board = copy.deepcopy(board)
        solutions = count_solutions(temp_board)

        if solutions != 1:
            board[row][col] = backup
        else:
            removed += 1

        attempts += 1



def generate_sudoku(empty_cells=40):
    board = [[0] * 9 for _ in range(9)]

    fill(board)

    solution = copy.deepcopy(board)

    remove_cells(board, empty_cells)

    return board, solution