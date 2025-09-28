# Rock Paper Scissors Game 🪨 📄 ✂️

A simple command-line Rock Paper Scissors game written in Python. Play against the computer in this classic hand game!

## How to Play

1. Run the game
2. Choose between rock, paper, or scissors
3. The computer will make its choice randomly
4. See who wins each round!
5. Play as many times as you want

## Game Rules

- **Rock** beats **Scissors**
- **Scissors** beats **Paper**  
- **Paper** beats **Rock**
- Same choice = Tie game!

## Getting Started

### Prerequisites
- Python 3.x installed on your computer

### Running the Game

1. Download the `Game.py` file
2. Open your terminal or command prompt
3. Navigate to where you saved the file
4. Run the game with:
   ```bash
   python Game.py
   ```

### Or just copy-paste the code:

Save this as `Game.py` and run it:

```python
# [the code from above would go here]
```

## Features

- Input validation (only accepts rock/paper/scissors)
- Clear results display
- Play multiple rounds
- Simple and easy to understand code

## Example Game

```
Welcome to Rock Paper Scissors!
========================================
Enter your choice (rock/paper/scissors): rock

You chose: rock
Computer chose: scissors
------------------------------
You win!

Would you like to play again? (y/n): y
```

## Project Structure

The game uses simple functions:
- `get_user_choice()` - gets and validates player input
- `get_computer_choice()` - random computer choice
- `determine_winner()` - checks who wins
- `display_result()` - shows the game outcome

## Enjoy!
