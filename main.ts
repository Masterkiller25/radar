function degtorad (num: number) {
    return num * Math.PI / 180
}
function draw_line (x1: number, y1: number, x2: number, y2: number, color: number) {
    dx = x2 - x1
    dy = y2 - y1
    for(let x = x1;x < x2; x++){
        let y = y1 + dy * (x- x1) / dx
        OLED12864_I2C.pixel(x, y, color)
    }
}
function coo (angle: number, dist: number) {
    radangle = degtorad(angle)
    x2 = Math.cos(radangle) * (dist * (64 / 400))
    y2 = Math.sin(radangle) * (dist * (64 / 400))
    return [x2 + 64, y2 + 62]
}
let arr: number[] = []
let dist = 0
let i = 0
let y2 = 0
let radangle = 0
let dx = 0
let dy = 0
let x2 = 0
basic.showLeds(`
    . . . . .
    . . . . .
    . . # . .
    . . . . .
    . . . . .
    `)
OLED12864_I2C.init(60)
OLED12864_I2C.on()
OLED12864_I2C.clear()
let minborne = 25
let maxborne = 65
basic.forever(function () {
    if (1 == pins.digitalReadPin(DigitalPin.P1)) {
        pins.analogWritePin(AnalogPin.P0, 488)
    }
    if (1 == pins.digitalReadPin(DigitalPin.P2)) {
        pins.analogWritePin(AnalogPin.P0, 0)
    }
    robotbit.GeekServo5KG(robotbit.Servos.S1, i)
    dist = sonar.ping(
    DigitalPin.P15,
    DigitalPin.P14,
    PingUnit.Centimeters
    )
    arr = coo(i, 400)
    draw_line(64, 62, arr[0], arr[1], 0)
    arr = coo(i, dist)
    draw_line(64, 62, arr[0], arr[1], 1)
    if (i == maxborne) {
        i = minborne
    }
    i += 1
})
