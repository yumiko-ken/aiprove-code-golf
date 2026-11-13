// Local test harness: runs the official public cases plus extra sanity cases
// (unary +/-, whitespace, nesting, decimals, left-associativity) that the
// hidden grader set plausibly includes.
const { evalExpr } = require("./evalExpr.js");
const cases = require("./cases.json");
const extra = [
  { in: "-3+2", out: -1 },
  { in: "2*-3", out: -6 },
  { in: "3--2", out: 5 },
  { in: "1 + 2 * ( 3 + 4 )", out: 15 },
  { in: ".5*4", out: 2 },
  { in: "((2))", out: 2 },
  { in: "8/2/2", out: 2 },
  { in: "1-2+3", out: 2 },
  { in: "2.5*4-3/2", out: 8.5 },
  { in: "-(2+3)", out: -5 },
  { in: "10-2*3+8/4", out: 6 },
];
let fail = 0;
for (const c of [...cases, ...extra]) {
  const got = evalExpr(c.in);
  const ok = Math.abs(got - c.out) < 1e-9;
  if (!ok) fail++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${JSON.stringify(c.in)} -> ${got} (expected ${c.out})`);
}
console.log(fail === 0 ? `ALL ${cases.length + extra.length} CASES PASS` : `${fail} FAILURES`);
process.exit(fail === 0 ? 0 : 1);
