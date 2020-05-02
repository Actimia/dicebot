statement -> expr modifier {% ([expr, mods]) => ({expr: expr, mods: mods}) %}

expr -> sum {% ([exp]) => exp %}

sum ->
      product "+" sum {% ([fst, _, snd]) => ({op: '+', right: snd, left: fst}) %}
    | product "-" sum {% ([fst, _, snd]) => ({op: '-', right: snd, left: fst}) %}
    | product {% ([exp]) => exp %}

product ->
      unary "*" product {% ([fst, _, snd]) => ({op: '*', right: snd, left: fst}) %}
    | unary "/" product {% ([fst, _, snd]) => ({op: '/', right: snd, left: fst}) %}
    | unary {% ([exp]) => exp %}

unary ->
      "(" expr ")"  {% ([_, exp]) => exp %}
    | number {% ([exp]) => exp %}
    | dice {% ([exp]) => exp %}

dice -> number:? "d" number mod:* {% ([count, _, size, mod]) => ({op: 'dice', size: size, count: count || 1, mod: (mod || []).join('')}) %}

number ->
      [0-9]:+ {% ([num]) => parseInt(num.join('')) %}
    | "-" [0-9]:+ {% ([_, num]) => -parseInt(num.join('')) %}

modifier -> null | "!" mod:+ {% ([_, mods]) => mods %}
mod -> [a-z]
