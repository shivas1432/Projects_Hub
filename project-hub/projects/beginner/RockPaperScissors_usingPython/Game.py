import random

def get_user_choice():
    """Get and validate user input"""
    while True:
        user_input = input("Enter your choice (rock/paper/scissors): ").lower().strip()
        if user_input in ['rock', 'paper', 'scissors']:
            return user_input
        else:
            print("Invalid choice! Please enter rock, paper, or scissors.")

def get_computer_choice():
    """Generate computer's random choice"""
    choices = ['rock', 'paper', 'scissors']
    return random.choice(choices)

def determine_winner(user_choice, computer_choice):
    """Determine the winner of the game"""
    if user_choice == computer_choice:
        return "tie"
    
    winning_combinations = {
        'rock': 'scissors',      # Rock beats scissors
        'scissors': 'paper',     # Scissors beat paper  
        'paper': 'rock'          # Paper beats rock
    }
    
    if winning_combinations[user_choice] == computer_choice:
        return "user"
    else:
        return "computer"

def display_result(user_choice, computer_choice, winner):
    """Display the game result"""
    print(f"\nYou chose: {user_choice}")
    print(f"Computer chose: {computer_choice}")
    print("-" * 30)
    
    if winner == "tie":
        print("It's a tie!")
    elif winner == "user":
        print("You win!")
    else:
        print("Computer wins!")

def play_game():
    """Main game function"""
    print("Welcome to Rock Paper Scissors!")
    print("=" * 40)
    
    user_choice = get_user_choice()
    computer_choice = get_computer_choice()
    winner = determine_winner(user_choice, computer_choice)
    
    display_result(user_choice, computer_choice, winner)

def main():
    """Main program loop"""
    while True:
        play_game()
        
        # Ask if user wants to play again
        play_again = input("\nWould you like to play again? (y/n): ").lower().strip()
        if play_again != 'y':
            print("Thanks for playing! Goodbye!")
            break
        print()

if __name__ == "__main__":
    main()
