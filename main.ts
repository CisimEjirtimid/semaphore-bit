function wait_ms (value: number) {
    for (let index = 0; index < value; index++) {
        control.waitMicros(1000)
    }
}

function wait_s(value: number) {
    for (let index = 0; index < value; index++) {
        control.waitMicros(1000000)
    }
}

function shift_clock () {
    pins.digitalWritePin(DigitalPin.P0, 1)
    pins.digitalWritePin(DigitalPin.P0, 0)
}

function register_clock() {
    pins.digitalWritePin(DigitalPin.P1, 1)
    pins.digitalWritePin(DigitalPin.P1, 0)
}

function data (value: number) {
    pins.digitalWritePin(DigitalPin.P2, value)
    shift_clock()
}

let states: number[][] = []
states.push([ 0, 1, 1, 1, 1, 1, 0, 1 ])
states.push([ 1, 0, 1, 1, 1, 1, 0, 1 ])
states.push([ 1, 1, 0, 1, 1, 0, 0, 1 ])
states.push([ 1, 1, 0, 1, 0, 1, 1, 1 ])
states.push([ 1, 1, 0, 1, 1, 0, 1, 1 ])
states.push([ 1, 0, 0, 1, 1, 1, 0, 1 ])

let times = [ 7, 1, 2, 7, 1, 2 ]

basic.forever(function () {
    let counter = 0
    for (let index = 0; index <= states.length - 1; index++) {

        basic.showNumber(counter)

        let state = states[index]
        let time = times[index]

        for (let value of state) {
            data(value)
        }

        register_clock()

        wait_s(time)
        
        counter += 1
    }
})
