import {createInterface} from 'readline';
import {Grammar, Parser} from 'nearley'

const grammar = require('./grammar')

const io = createInterface(process.stdin)

export const clamp = (x, min, max) => x < min ? min : (x > max ? max : x)

export const die = (size) => Math.floor(size * Math.random()) + 1

const library = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => Math.floor(a / b),
}

type Expr = { op?: string, res?: number, const?: boolean }

interface Result {}

function evaluate(expr: any, mods: string = ''): Expr {
    if (typeof expr === 'number') {
        return {res: expr, const: true}
    }

    const op = expr.op

    if (op === 'dice') {
        const dice = Array.from({length: expr.count}, _ => die(expr.size))
        expr.rolls = dice
        return { res: dice.reduce((a, b) => a + b, 0), const: false }
    }

    const isConst = (xp) => typeof xp === 'number' || !!xp.const

    const joiner = library[op]
    expr.res = joiner(evaluate(expr.left, mods).res, evaluate(expr.right, mods).res)
    expr.const = isConst(expr.left) && isConst(expr.right)
    console.log(expr.left, expr.right, expr)
    return expr
}

const stringifiers = {
    'dice': (expr, mods) => expr.rolls.length === 1 ? expr.rolls[0] : '[' + expr.rolls.join(' ') + ']',
}

function stringify(expr: Expr, mods: string = ''): string {
    if (typeof expr === 'number') {
        return '' + expr
    }

    if (expr.const) return '' + expr.res

    const custom = stringifiers[expr.op]
    if (custom) return custom(expr, mods)

    // @ts-ignore
    return [stringify(expr.left), expr.op, stringify(expr.right)].join(' ')
}

io.on('line', line => {
    const trimmed = line.replace(/\s+/g, '').toLowerCase()

    const parser = new Parser(Grammar.fromCompiled(grammar))
    parser.feed(trimmed)
    const expr = parser.results
    parser.finish()

    const expression = expr[0]

    const result = evaluate(expression.expr, expression.mods)

    console.log(JSON.stringify(expression.expr, null, 2))
    console.log(stringify(expression.expr, expression.mods))
    console.log(result.res)
})
