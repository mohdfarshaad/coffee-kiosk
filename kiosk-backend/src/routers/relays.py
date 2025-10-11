from fastapi import FastAPI
from gpiozero import OutputDevice
import threading
import time

app = FastAPI()

# Define relay pins
RELAY_PINS = [17, 18, 27, 22]

# Initialize relays
relays = [
    OutputDevice(pin, active_high=False, initial_value=False) for pin in RELAY_PINS
]


def activate_relay(relay_index: int, duration: int = 8):
    """Turn on the relay for 'duration' seconds asynchronously."""
    relay = relays[relay_index]
    relay.on()
    time.sleep(duration)
    relay.off()


@app.post("/relay/{relay_id}")
def trigger_relay(relay_id: int):
    """
    Trigger relay by ID (1-4).
    Turns ON for 8 seconds, then OFF automatically.
    """
    if relay_id < 1 or relay_id > len(relays):
        return {"error": "Invalid relay ID. Must be 1–4."}

    threading.Thread(target=activate_relay, args=(relay_id - 1,)).start()
    return {"message": f"Relay {relay_id} activated for 8 seconds."}
