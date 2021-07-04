function evolve () {
    light_up_cells()
    basic.pause(1000)
    next_gen_update()
    next_gen_to_cells()
}
input.onButtonPressed(Button.A, function () {
    select_x += -1
    if (select_x < 0) {
        select_y += -1
        select_x += 5
    }
    if (select_y < 0) {
        select_y += 5
    }
})
function neighbour_count (x: number, y: number) {
    neighbours = 0
    if (find_xy(adjust_to_grid(x + -1), adjust_to_grid(y + -1)) == 1) {
        neighbours += 1
    }
    if (find_xy(adjust_to_grid(x + 0), adjust_to_grid(y + -1)) == 1) {
        neighbours += 1
    }
    if (find_xy(adjust_to_grid(x + 1), adjust_to_grid(y + -1)) == 1) {
        neighbours += 1
    }
    if (find_xy(adjust_to_grid(x + -1), adjust_to_grid(y + 0)) == 1) {
        neighbours += 1
    }
    if (find_xy(adjust_to_grid(x + 1), adjust_to_grid(y + 0)) == 1) {
        neighbours += 1
    }
    if (find_xy(adjust_to_grid(x + -1), adjust_to_grid(y + 1)) == 1) {
        neighbours += 1
    }
    if (find_xy(adjust_to_grid(x + 0), adjust_to_grid(y + 1)) == 1) {
        neighbours += 1
    }
    if (find_xy(adjust_to_grid(x + 1), adjust_to_grid(y + 1)) == 1) {
        neighbours += 1
    }
    return neighbours
}
function next_gen_to_cells () {
    for (let index = 0; index <= cells.length - 1; index++) {
        cells[index] = next_gen[index]
    }
}
function find_y (num: number) {
    return_value = Math.floor(num / 5)
    return adjust_to_grid(return_value)
}
function cell_toggle (x: number, y: number) {
    if (find_xy(x, y) == 0) {
        cells[adjust_to_grid(y) * 5 + adjust_to_grid(x)] = 1
    } else {
        cells[adjust_to_grid(y) * 5 + adjust_to_grid(x)] = 0
    }
}
function next_gen_update () {
    for (let index = 0; index <= cells.length - 1; index++) {
        // if (alive)
        // else (dead)
        if (led.point(find_x(index), find_y(index))) {
            if (neighbour_count(find_x(index), find_y(index)) == 2 || neighbour_count(find_x(index), find_y(index)) == 3) {
                next_gen[index] = 1
            } else {
                next_gen[index] = 0
            }
        } else {
            if (neighbour_count(find_x(index), find_y(index)) == 3) {
                next_gen[index] = 1
            } else {
                next_gen[index] = 0
            }
        }
    }
}
function find_xy (x: number, y: number) {
    x_value = adjust_to_grid(x)
    y_value = adjust_to_grid(y)
    index_value = y_value * 5
    index_value += x_value
    return cells[index_value]
}
function adjust_to_grid (num: number) {
    adjusted_value = num
    while (adjusted_value < 0) {
        adjusted_value += 5
    }
    while (adjusted_value > 4) {
        adjusted_value += -5
    }
    return adjusted_value
}
input.onButtonPressed(Button.AB, function () {
    cell_toggle(select_x, select_y)
})
input.onButtonPressed(Button.B, function () {
    select_x += 1
    if (select_x > 4) {
        select_y += 1
        select_x += -5
    }
    if (select_y > 4) {
        select_y += -5
    }
})
function select () {
    light_up_cells()
    if (select_blink == 0) {
        led.plot(select_x, select_y)
        select_blink = 1
    } else {
        led.unplot(select_x, select_y)
        select_blink = 0
    }
    basic.pause(500)
}
function find_x (num: number) {
    return_value = num % 5
    return adjust_to_grid(return_value)
}
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    select_x = 0
    select_y = 0
    if (mode == 0) {
        mode = 1
    } else {
        mode = 0
    }
})
function light_up_cells () {
    for (let index = 0; index <= cells.length - 1; index++) {
        if (cells[index] == 1) {
            led.plot(find_x(index), find_y(index))
        } else {
            led.unplot(find_x(index), find_y(index))
        }
    }
}
let adjusted_value = 0
let index_value = 0
let y_value = 0
let x_value = 0
let return_value = 0
let neighbours = 0
let select_y = 0
let select_x = 0
let select_blink = 0
let mode = 0
let next_gen: number[] = []
let cells: number[] = []
cells = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
next_gen = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
mode = 0
select_blink = 0
select_x = 0
select_y = 0
basic.forever(function () {
    if (mode == 0) {
        select()
    } else {
        evolve()
    }
})
