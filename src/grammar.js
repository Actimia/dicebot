// Generated automatically by nearley, version 2.19.3
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "statement", "symbols": ["expr", "modifier"], "postprocess": ([expr, mods]) => ({expr: expr, mods: mods})},
    {"name": "expr", "symbols": ["sum"], "postprocess": ([exp]) => exp},
    {"name": "sum", "symbols": ["product", {"literal":"+"}, "sum"], "postprocess": ([fst, _, snd]) => ({op: '+', right: snd, left: fst})},
    {"name": "sum", "symbols": ["product", {"literal":"-"}, "sum"], "postprocess": ([fst, _, snd]) => ({op: '-', right: snd, left: fst})},
    {"name": "sum", "symbols": ["product"], "postprocess": ([exp]) => exp},
    {"name": "product", "symbols": ["unary", {"literal":"*"}, "product"], "postprocess": ([fst, _, snd]) => ({op: '*', right: snd, left: fst})},
    {"name": "product", "symbols": ["unary", {"literal":"/"}, "product"], "postprocess": ([fst, _, snd]) => ({op: '/', right: snd, left: fst})},
    {"name": "product", "symbols": ["unary"], "postprocess": ([exp]) => exp},
    {"name": "unary", "symbols": [{"literal":"("}, "expr", {"literal":")"}], "postprocess": ([_, exp]) => exp},
    {"name": "unary", "symbols": ["number"], "postprocess": ([exp]) => exp},
    {"name": "unary", "symbols": ["dice"], "postprocess": ([exp]) => exp},
    {"name": "dice$ebnf$1", "symbols": ["number"], "postprocess": id},
    {"name": "dice$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "dice$ebnf$2", "symbols": []},
    {"name": "dice$ebnf$2", "symbols": ["dice$ebnf$2", "mod"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "dice", "symbols": ["dice$ebnf$1", {"literal":"d"}, "number", "dice$ebnf$2"], "postprocess": ([count, _, size, mod]) => ({op: 'dice', size: size, count: count || 1, mod: (mod || []).join('')})},
    {"name": "number$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "number$ebnf$1", "symbols": ["number$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "number", "symbols": ["number$ebnf$1"], "postprocess": ([num]) => parseInt(num.join(''))},
    {"name": "number$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "number$ebnf$2", "symbols": ["number$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "number", "symbols": [{"literal":"-"}, "number$ebnf$2"], "postprocess": ([_, num]) => -parseInt(num.join(''))},
    {"name": "modifier", "symbols": []},
    {"name": "modifier$ebnf$1", "symbols": ["mod"]},
    {"name": "modifier$ebnf$1", "symbols": ["modifier$ebnf$1", "mod"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "modifier", "symbols": [{"literal":"!"}, "modifier$ebnf$1"], "postprocess": ([_, mods]) => mods},
    {"name": "mod", "symbols": [/[a-z]/]}
]
  , ParserStart: "statement"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
