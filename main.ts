input.onButtonPressed(Button.B, function () {
    pins.digitalWritePin(DigitalPin.P0, 1)
    basic.pause(100)
    reading = pins.analogReadPin(AnalogPin.P3)
    basic.pause(100)
    pins.digitalWritePin(DigitalPin.P0, 0)
    // La valeur de 600 peut varier il faut l'ajuster en fonction de votre test lorsque un des deux fils n'est pas dans la terre.  Si la valeur de la variable « reading » est de 540 pour vous, modifier toutes les valeurs de 600 pour 540 dans ce code.
    pourcentage = Math.round((reading - 600) * 100 / (1023 - 600))
    basic.showString("H" + pourcentage + "%")
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
    // La valeur de 600 peut varier il faut l'ajuster en fonction de votre test lorsque un des deux fils n'est pas dans la terre.  Si la valeur de la variable « reading » est de 540 pour vous, modifier toutes les valeurs de 600 pour 540 dans ce code.
    pourcentage = Math.round((reading - 600) * 100 / (1023 - 600))
    // Arrosage si l'humidité du sol est inférieure à 95 %.
    // Ajuster cette valeur en fonction de vos paramètres expérimentaux.
    // Si l'humidité du sol se situe entre 95 % et 98 %, maintenir l'action actuelle (arrosage ou non).  Ajuster ces valeurs en fonction de vos paramètres expérimentaux.
    // Arrêter l'arrosage si l'humidité du sol est supérieure à 98%.  Ajuster cette valeur en fonction de vos paramètres expérimentaux.
    if (pourcentage <= 95) {
        servos.P2.setAngle(160)
    } else if (pourcentage >= 95 && pourcentage <= 98) {
        servos.P2.stop()
    } else if (pourcentage > 98) {
        servos.P2.setAngle(0)
    }
    radio.sendValue("H", pourcentage)
    basic.pause(1000)
    servos.P2.stop()
    // 1 heure (3 600 000 ms) avant la prochaine mesure.  On peut modifier le temps entre les prises de mesures
    basic.pause(3600000)
})
