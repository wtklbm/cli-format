#!/bin/bash

# This is a test shell script
# It demonstrates various shell features

# Variables
NAME="John Doe"
AGE=30
EMAIL="john@example.com"

# Array
FRUITS=("apple" "banana" "orange" "grape")

# Function
greet() {
    echo "Hello, $1!"
}

# Conditional
if [ $AGE -gt 18 ]; then
    echo "$NAME is an adult"
else
    echo "$NAME is a minor"
fi

# Loop
echo "Fruits:"
for fruit in "${FRUITS[@]}"; do
    echo "  - $fruit"
done

# Case statement
case "$1" in
    start)
        echo "Starting service..."
        ;;
    stop)
        echo "Stopping service..."
        ;;
    restart)
        echo "Restarting service..."
        ;;
    *)
        echo "Usage: $0 {start|stop|restart}"
        exit 1
        ;;
esac

# Command substitution
CURRENT_DIR=$(pwd)
echo "Current directory: $CURRENT_DIR"

# Pipe and redirection
echo "List of files:" | ls -la

# Arithmetic
RESULT=$((5 + 3))
echo "5 + 3 = $RESULT"

# Exit
exit 0
