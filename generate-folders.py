import os

# Prompt for the name of the main directory
main_dir = input("Enter the name of the main directory: ")

# Create the main directory
if not os.path.exists(main_dir):
    os.makedirs(main_dir)

# Create subdirectories for each day in December
for day in range(1, 32):
    day_dir = os.path.join(main_dir, f'day{day}')
    if not os.path.exists(day_dir):
        os.makedirs(day_dir)

print("Folders created successfully.")