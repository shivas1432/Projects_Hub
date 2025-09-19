import random
import string

def generate_password(length=12, use_upper=True, use_lower=True, use_digits=True, use_symbols=True):
    # Character sets
    upper = string.ascii_uppercase
    lower = string.ascii_lowercase
    digits = string.digits
    symbols = "!@#$%^&*()_+[]{}<>?/"

    # Build the pool of characters
    chars = ""
    if use_upper:
        chars += upper
    if use_lower:
        chars += lower
    if use_digits:
        chars += digits
    if use_symbols:
        chars += symbols

    if not chars:
        raise ValueError("At least one character set must be selected!")

    # Generate password
    password = ''.join(random.choice(chars) for _ in range(length))
    return password


# Example usage:
if __name__ == "__main__":
    length = int(input("Enter password length: "))
    print("\nGenerated Password: ", generate_password(length))
