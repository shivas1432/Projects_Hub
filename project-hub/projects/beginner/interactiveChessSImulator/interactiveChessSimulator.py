import sys, copy

# Starting positions of black and white chess pieces
starting_pieces = {'a8': 'bR', 'b8': 'bN', 'c8': 'bB', 'd8': 'bQ',
'e8': 'bK', 'f8': 'bB', 'g8': 'bN', 'h8': 'bR', 'a7': 'bP', 'b7': 'bP',
'c7': 'bP', 'd7': 'bP', 'e7': 'bP', 'f7': 'bP', 'g7': 'bP', 'h7': 'bP',
'a1': 'wR', 'b1': 'wN', 'c1': 'ww', 'd1': 'wQ', 'e1': 'wK', 'f1': 'ww',
'g1': 'wN', 'h1': 'wR', 'a2': 'wP', 'b2': 'wP', 'c2': 'wP', 'd2': 'wP',
'e2': 'wP', 'f2': 'wP', 'g2': 'wP', 'h2': 'wP'}

# Multi-line string
board_template = """
    a    b    c    d    e    f    g    h
   ____ ____ ____ ____ ____ ____ ____ ____
  ||||||    ||||||    ||||||    ||||||    |
8 ||{}|| {} ||{}|| {} ||{}|| {} ||{}|| {} |
  ||||||____||||||____||||||____||||||____|
  |    ||||||    ||||||    ||||||    ||||||
7 | {} ||{}|| {} ||{}|| {} ||{}|| {} ||{}||
  |____||||||____||||||____||||||____||||||
  ||||||    ||||||    ||||||    ||||||    |
6 ||{}|| {} ||{}|| {} ||{}|| {} ||{}|| {} |
  ||||||____||||||____||||||____||||||____|
  |    ||||||    ||||||    ||||||    ||||||
5 | {} ||{}|| {} ||{}|| {} ||{}|| {} ||{}||
  |____||||||____||||||____||||||____||||||
  ||||||    ||||||    ||||||    ||||||    |
4 ||{}|| {} ||{}|| {} ||{}|| {} ||{}|| {} |
  ||||||____||||||____||||||____||||||____|
  |    ||||||    ||||||    ||||||    ||||||
3 | {} ||{}|| {} ||{}|| {} ||{}|| {} ||{}||
  |____||||||____||||||____||||||____||||||
  ||||||    ||||||    ||||||    ||||||    |
2 ||{}|| {} ||{}|| {} ||{}|| {} ||{}|| {} |
  ||||||____||||||____||||||____||||||____|
  |    ||||||    ||||||    ||||||    ||||||
1 | {} ||{}|| {} ||{}|| {} ||{}|| {} ||{}||
  |____||||||____||||||____||||||____||||||
"""

white_square = '||'
black_square = '  '

def print_chessboard(board):
    squares = []
    is_white_square = True
    for y in '87654321':
        for x in 'abcdefgh':
            # print(x, y, is_white_square)    # debug purposes
            if x + y in board.keys():
                squares.append(board[x + y])
            else:
                if is_white_square:
                    squares.append(white_square)
                else:
                    squares.append(black_square)
            is_white_square = not is_white_square
        is_white_square = not is_white_square

    print(board_template.format(*squares))

def print_help():
    print('  Interactice Chess Board')
    print('Pieces: ')
    print('w - white, b - black')
    print('  P - Pawn, N - Knight, B - Bishop, R - Rook, Q - Queen, K - King')
    print('Commands:')
    print('  move e2 e4 - Moves the piece at e2 to e4.')
    print('  remove e2 - Removes the piece at e2.')
    print('  set e2 wP - Sets square e2 to a white pawn.')
    print('  reset - Reset pieces back to their starting squares.')
    print('  clear - Clear the entire board.')
    print('  fill wP - Fill entire board with white pawns.')
    print('  help - Show this help information.')
    print('  quit - Quits the program.')   

main_board = copy.copy(starting_pieces)
print_help()
while True:
    print_chessboard(main_board)
    response = input('> ').split()

    if response[0] == 'move':
        main_board[response[2]] = main_board[response[1]]
        del main_board[response[1]]
    elif response[0] == 'remove':
        del main_board[response[1]]
    elif response[0] == 'set':
        main_board[response[1]] = response[2]
    elif response[0] == 'reset':
        main_board = copy.copy(starting_pieces)
    elif response[0] == 'clear':
        main_board = {}
    elif response[0] == 'fill':
        for y in '87654321':
            for x in 'abcdefgh':
                main_board[x + y] = response[1]
    elif response[0] == 'help':
        print_help()
    elif response[0] == 'quit':
        sys.exit()


# print(starting_pieces)
