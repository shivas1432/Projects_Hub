import tkinter as tk
from tkinter import messagebox

# --- Core Subnet Calculation Logic (Adapted for GUI) ---

def bit24(A, B, C, D, n, a1):
    """Calculates subnet information for /24 and higher CIDR masks."""
    results = []
    
    a, b, c, d = 8, 8, 8, n - 24
    p, q, r, s = 8 - a, 8 - b, 8 - c, 8 - d
    
    # Calculate last octet mask value based on 'd' (host bits in last octet)
    da = 0
    if d == 1: da = 128
    elif d==2: da = 192
    elif d==3: da = 224
    elif d==4: da = 240
    elif d==5: da = 248
    elif d==6: da = 252
    elif d==7: da = 254
    elif d==8: da = 255
    
    results.append(f"Network Bit              : {a},{b},{c},{d}")
    results.append(f"Host Bit                 : {p},{q},{r},{s}")
    
    # Calculate Network ID
    P = A & (2**a - 1)
    Q = B & (2**b - 1)
    R = C & (2**c - 1)
    S = D & da
    
    results.append(f"Network ID Is            : {P}.{Q}.{R}.{S}")
    
    # Calculate Broadcast ID
    E = P + (2**p - 1 if p > 0 else 0)
    F = Q + (2**q - 1 if q > 0 else 0)
    G = R + (2**r - 1 if r > 0 else 0)
    H = S + (2**s - 1 if s > 0 else 0)
    
    results.append(f"Broadcast ID Is          : {E}.{F}.{G}.{H}")
    
    # Calculate First and Last Valid Host IPs
    # Handle cases where S+1 or H-1 might go out of bounds for very small subnets
    if (2**(32-n) - 2) > 0: # Check if there are usable hosts
        results.append(f"First Valid Host IP Is   : {P}.{Q}.{R}.{S+1}")
        results.append(f"Last Valid Host IP Is    : {E}.{F}.{G}.{H-1}")
    else:
        results.append("First Valid Host IP Is   : N/A (No usable hosts)")
        results.append("Last Valid Host IP Is    : N/A (No usable hosts)")

    results.append(f"Host per subnet is       : {int(2**(32-n))-2}")
    results.append(f"Total Subnet is          : {int(2**a1)}")
    
    return "\n".join(results)

def bit16(A, B, C, D, n, a1):
    """Calculates subnet information for /16 to /23 CIDR masks."""
    results = []

    a, b, c, d = 8, 8, n - 16, 0
    p, q, r, s = 8 - a, 8 - b, 8 - c, 8 - d
    
    # Calculate third octet mask value based on 'c'
    da = 0
    if c == 1: da = 128
    elif c==2: da = 192
    elif c==3: da = 224
    elif c==4: da = 240
    elif c==5: da = 248
    elif c==6: da = 252
    elif c==7: da = 254
    elif c==8: da = 255

    results.append(f"Network Bit              : {a},{b},{c},{d}")
    results.append(f"Host Bit                 : {p},{q},{r},{s}")
    
    # Calculate Network ID
    P = A & (2**a - 1)
    Q = B & (2**b - 1)
    R = C & da
    S = D & (2**d - 1) # This will be 0 as d is 0
    
    results.append(f"Network ID Is            : {P}.{Q}.{R}.{S}")
    
    # Calculate Broadcast ID
    E = P + (2**p - 1 if p > 0 else 0)
    F = Q + (2**q - 1 if q > 0 else 0)
    G = R + (2**r - 1 if r > 0 else 0)
    H = S + (2**s - 1 if s > 0 else 0) # This will be 255 if s is 8
    
    results.append(f"Broadcast ID Is          : {E}.{F}.{G}.{H}")
    
    # Calculate First and Last Valid Host IPs
    if (2**(32-n) - 2) > 0:
        results.append(f"First Valid Host IP Is   : {P}.{Q}.{R}.{S+1}") 
        results.append(f"Last Valid Host IP Is    : {E}.{F}.{G}.{H-1}")
    else:
        results.append("First Valid Host IP Is   : N/A (No usable hosts)")
        results.append("Last Valid Host IP Is    : N/A (No usable hosts)")

    results.append(f"Host per subnet is       : {int(2**(32-n))-2}")
    results.append(f"Total Subnet is          : {int(2**a1)}")
    
    return "\n".join(results)

def bit8(A, B, C, D, n, a1):
    """Calculates subnet information for /8 to /15 CIDR masks."""
    results = []

    a, b, c, d = 8, n - 8, 0, 0
    p, q, r, s = 8 - a, 8 - b, 8 - c, 8 - d
    
    # Calculate second octet mask value based on 'b'
    da = 0
    if b == 1: da = 128
    elif b==2: da = 192
    elif b==3: da = 224
    elif b==4: da = 240
    elif b==5: da = 248
    elif b==6: da = 252
    elif b==7: da = 254
    elif b==8: da = 255
    
    results.append(f"Network Bit              : {a},{b},{c},{d}")
    results.append(f"Host Bit                 : {p},{q},{r},{s}")
    
    # Calculate Network ID
    P = A & (2**a - 1)
    Q = B & da
    R = C & (2**c - 1) # This will be 0 as c is 0
    S = D & (2**d - 1) # This will be 0 as d is 0
    
    results.append(f"Network ID Is            : {P}.{Q}.{R}.{S}")
    
    # Calculate Broadcast ID
    E = P + (2**p - 1 if p > 0 else 0)
    F = Q + (2**q - 1 if q > 0 else 0)
    G = R + (2**r - 1 if r > 0 else 0) # This will be 255 if r is 8
    H = S + (2**s - 1 if s > 0 else 0) # This will be 255 if s is 8
    
    results.append(f"Broadcast ID Is          : {E}.{F}.{G}.{H}")
    
    # Calculate First and Last Valid Host IPs
    if (2**(32-n) - 2) > 0:
        results.append(f"First Valid Host IP Is   : {P}.{Q}.{R}.{S+1}")
        results.append(f"Last Valid Host IP Is    : {E}.{F}.{G}.{H-1}")
    else:
        results.append("First Valid Host IP Is   : N/A (No usable hosts)")
        results.append("Last Valid Host IP Is    : N/A (No usable hosts)")

    results.append(f"Host per subnet is       : {int(2**(32-n))-2}")
    results.append(f"Total Subnet is          : {int(2**a1)}")
    
    return "\n".join(results)

def calculate_subnet_details(A, B, C, D, n):
    """
    Main function to determine IP class and call appropriate bit calculation.
    Returns a formatted string of subnet details.
    """
    # Determine 'u' (IP class logic from your original code)
    u = 0
    if 0 <= A < 128:
        u = 8  # Class A default mask prefix
    elif 128 <= A < 192:
        u = 16 # Class B default mask prefix
    elif 192 <= A < 224:
        u = 24 # Class C default mask prefix
    # Class D (multicast) and E (experimental) typically don't use subnetting in this context
    # so we cap at Class C range for practical subnetting
    elif 224 <= A <= 255: # Extended for broader validation, though practical subnetting ends at C
        u = 24 # Treat as Class C for calculations for now

    if u == 0: # This means A was outside 0-255 or an unrecognized class
        return "Error: Invalid first IP octet for subnetting (0-255)."

    # Validate subnet mask range
    if not (8 <= n <= 32):
        return "Error: Subnet Mask (/n) must be between 8 and 32."

    a1 = n - u # Calculate a1 based on your original logic (bits borrowed)
    
    # Route to appropriate calculation function
    if n >= 24:
        return bit24(A, B, C, D, n, a1)
    elif n >= 16:
        return bit16(A, B, C, D, n, a1)
    elif n >= 8:
        return bit8(A, B, C, D, n, a1)
    else:
        return "Error: Subnet mask /n must be 8 or greater." # Should be caught by n validation above, but added for safety


# --- GUI Application Logic ---

def on_calculate_button_click():
    """Handles the event when the Calculate button is clicked."""
    try:
        # Get integer values from input fields
        A = int(entry_A.get())
        B = int(entry_B.get())
        C = int(entry_C.get())
        D = int(entry_D.get())
        n = int(entry_n.get())

        # Comprehensive IP Octet validation
        if not (0 <= A <= 255 and 0 <= B <= 255 and 0 <= C <= 255 and 0 <= D <= 255):
            messagebox.showerror("Invalid Input", "IP Octets must be between 0 and 255.")
            return
        
        # Call the main calculation function
        result_text = calculate_subnet_details(A, B, C, D, n)
        
        # Update the output label with results or error messages
        output_label.config(text=result_text) 

    except ValueError:
        messagebox.showerror("Invalid Input", "Please enter valid numbers for all IP octets and subnet mask.")
    except Exception as e:
        messagebox.showerror("Error", f"An unexpected error occurred: {e}")

def clear_fields():
    """Clears all input fields and the output label."""
    entry_A.delete(0, tk.END)
    entry_B.delete(0, tk.END)
    entry_C.delete(0, tk.END)
    entry_D.delete(0, tk.END)
    entry_n.delete(0, tk.END)
    output_label.config(text="Results will appear here.")


def create_gui():
    """Sets up and runs the main Tkinter GUI window."""
    global entry_A, entry_B, entry_C, entry_D, entry_n, output_label # Declare globals for access within handlers

    root = tk.Tk()
    root.title("IP Addressing Hub: Subnet Calculator")
    root.geometry("450x550") # Increased size for better layout and future expansion
    root.resizable(False, False) # Prevent resizing for fixed layout

    # Main Title/Header for the application
    app_title = tk.Label(root, text="Subnet Calculator", font=("Arial", 16, "bold"), fg="#333333")
    app_title.pack(pady=15)

    # Frame for input fields using grid layout
    input_frame = tk.Frame(root, padx=15, pady=15, bd=2, relief="groove") # Added border for visual
    input_frame.pack(pady=10, padx=20, fill="x")

    # Labels and Entry fields for IP Octets
    row_num = 0
    tk.Label(input_frame, text="IP Octet 1 (A):", font=("Arial", 10)).grid(row=row_num, column=0, sticky="w", pady=4, padx=5)
    entry_A = tk.Entry(input_frame, width=10, font=("Arial", 10))
    entry_A.grid(row=row_num, column=1, pady=4, padx=5)
    entry_A.focus_set() # Set focus to the first input field

    row_num += 1
    tk.Label(input_frame, text="IP Octet 2 (B):", font=("Arial", 10)).grid(row=row_num, column=0, sticky="w", pady=4, padx=5)
    entry_B = tk.Entry(input_frame, width=10, font=("Arial", 10))
    entry_B.grid(row=row_num, column=1, pady=4, padx=5)

    row_num += 1
    tk.Label(input_frame, text="IP Octet 3 (C):", font=("Arial", 10)).grid(row=row_num, column=0, sticky="w", pady=4, padx=5)
    entry_C = tk.Entry(input_frame, width=10, font=("Arial", 10))
    entry_C.grid(row=row_num, column=1, pady=4, padx=5)

    row_num += 1
    tk.Label(input_frame, text="IP Octet 4 (D):", font=("Arial", 10)).grid(row=row_num, column=0, sticky="w", pady=4, padx=5)
    entry_D = tk.Entry(input_frame, width=10, font=("Arial", 10))
    entry_D.grid(row=row_num, column=1, pady=4, padx=5)

    # Label and Entry for Subnet Mask (n)
    row_num += 1
    tk.Label(input_frame, text="Subnet Mask (/n, 8-32):", font=("Arial", 10)).grid(row=row_num, column=0, sticky="w", pady=4, padx=5)
    entry_n = tk.Entry(input_frame, width=10, font=("Arial", 10))
    entry_n.grid(row=row_num, column=1, pady=4, padx=5)

    # Configure column weights for input_frame to make column 1 expand
    input_frame.grid_columnconfigure(1, weight=1)

    # Button Frame to hold Calculate and Clear side-by-side
    button_frame = tk.Frame(root)
    button_frame.pack(pady=15)

    # Calculate Button
    calculate_button = tk.Button(button_frame, text="Calculate Subnet Info", command=on_calculate_button_click, 
                                 font=("Arial", 10, "bold"), bg="#4CAF50", fg="white", activebackground="#45a049")
    calculate_button.pack(side=tk.LEFT, padx=10, ipadx=5, ipady=2) 

    # Clear Button
    clear_button = tk.Button(button_frame, text="Clear", command=clear_fields,
                             font=("Arial", 10), bg="#f44336", fg="white", activebackground="#da190b")
    clear_button.pack(side=tk.LEFT, padx=10, ipadx=5, ipady=2) 

    # Output Label (using a Label as it's sufficient for multi-line text)
    output_label = tk.Label(root, text="Enter IP and Subnet Mask above and click 'Calculate'.", 
                            wraplength=400, justify="left", fg="darkblue", bg="#f0f0f0", 
                            font=("Consolas", 10), bd=1, relief="solid", anchor="nw")
    output_label.pack(pady=10, padx=20, fill="both", expand=True)

    # Start the Tkinter event loop
    root.mainloop()

# This ensures create_gui() is called when the script is executed
if __name__ == "__main__":
    create_gui()