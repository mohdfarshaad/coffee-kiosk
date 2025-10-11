from gpiozero import OutputDevice, DigitalInputDevice


class Relay:
    def __init__(self, pin):
        self.device = OutputDevice(pin, active_high=False, initial_value=False)

    def on(self):
        self.device.on()

    def off(self):
        self.device.off()


class Sensor:
    def __init__(self, pin):
        self.device = DigitalInputDevice(pin)

    def is_active(self):
        return self.device.value
