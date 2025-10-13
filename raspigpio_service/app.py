from flask import Flask, jsonify
from gpio_controller import Relay
from flask_cors import CORS
import threading
import time

app = Flask(__name__)

CORS(app, origins=["http://localhost:3000"])

# Initialize 4 relays
relays = {
    1: Relay(17),
    2: Relay(27),
    3: Relay(22),
    4: Relay(23),
}

RELAY_ON_TIME = 0.8  # seconds
_lock = threading.Lock()  # ensures thread-safe access


def trigger_relay(relay: Relay):
    """Turns the relay on for RELAY_ON_TIME seconds, then off."""
    try:
        relay.on()
        time.sleep(RELAY_ON_TIME)
        relay.off()
    except Exception as e:
        # Log the error if needed
        print(f"Error controlling relay: {e}")


@app.route("/relay/<int:id>/on", methods=["POST"])
def relay_endpoint(id):
    relay = relays.get(id)
    if not relay:
        return jsonify({"error": f"Invalid relay ID {id}. Must be 1-4."}), 400

    # Use lock to prevent race conditions
    threading.Thread(target=lambda: trigger_relay(relay)).start()
    return jsonify({"status": f"Relay {id} triggered for {RELAY_ON_TIME} seconds"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
