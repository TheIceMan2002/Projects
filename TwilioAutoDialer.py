from twilio.rest import Client
import time

# Twilio credentials
account_sid = # Stored in another location for privacy reasons. 
auth_token = # Stored in another location for privacy reasons.
twilio_phone_number = '+12192869630' 

# Initialize Twilio client
client = Client(account_sid, auth_token)

def make_call(to):
    try:
        call = client.calls.create(
            twiml='<Response><Say>Hello! This is an automated call.</Say></Response>',
            to=to,
            from_=twilio_phone_number
        )
        print(f"Calling {to}")
        print(call.sid)
    except Exception as e:
        print(f"Failed to call {to}: {str(e)}")

def get_phone_numbers():
    print("Enter phone numbers separated by commas (e.g., +18083977163,+14232082021):")
    user_input = input()
    # Split input into a list, strip spaces, and validate
    phone_numbers = [number.strip() for number in user_input.split(',') if number.strip()]
    if not phone_numbers:
        print("No valid phone numbers entered. Exiting.")
        exit()
    return phone_numbers

def call_multiple_numbers(phone_numbers, delay=5):
    for number in phone_numbers:
        make_call(number)
        time.sleep(delay)  # Add a delay between calls to avoid rate limits

# Get phone numbers from user
phone_numbers = get_phone_numbers()

# Call the list of numbers
call_multiple_numbers(phone_numbers)

