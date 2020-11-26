input.onButtonPressed(Button.B, function () {
    pins.digitalWritePin(DigitalPin.P7, 1)
    basic.pause(100)
    reading = pins.analogReadPin(AnalogPin.P3)
    basic.pause(100)
    pins.digitalWritePin(DigitalPin.P7, 0)
    pourcentage = Math.round((reading - 480) * 100 / (1023 - 480))
    basic.showString("" + pourcentage + "%")
})
let pourcentage = 0
let reading = 0
radio.setGroup(1)
led.setBrightness(50)
servos.P2.setAngle(0)
basic.pause(1000)
servos.P2.stop()
basic.forever(function () {
    pins.digitalWritePin(DigitalPin.P7, 1)
    basic.pause(100)
    reading = pins.analogReadPin(AnalogPin.P3)
    basic.pause(100)
    pins.digitalWritePin(DigitalPin.P7, 0)
    pourcentage = Math.round((reading - 480) * 100 / (1023 - 480))
    if (pourcentage <= 50) {
        servos.P2.setAngle(180)
    } else if (pourcentage >= 50 && pourcentage <= 80) {
        servos.P2.stop()
    } else if (pourcentage > 80) {
        servos.P2.setAngle(0)
    }
    radio.sendValue("H sol", pourcentage)
    basic.pause(1000)
    servos.P2.stop()
    // 30 secondes avant la prochaine mesure.
    basic.pause(30000)
})
