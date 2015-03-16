# Async Function Literals
# -----------------

# On Node < 0.12, define Promise as a dummy function that will call
# its callback.
# TODO: Remove this and use ES6 Promise once the project builds on Node 0.12
class Promise
  constructor: (cb) ->
    @callback = cb or (->)
  then: (thencb) -> thencb(@callback())

# Function Definition
x = 1
y = {}
y.x = async -> 3
ok x is 1
ok typeof(y.x) is 'function'
ok y.x instanceof Function
ok y.x() instanceof Promise
eq y.x().then((x) -> x), 3

# The empty function should not cause a syntax error.
async ->
() async ->

test "async functions wrap the body inside promise", ->
  foo = (x) async -> x + 3

  ok foo(3) instanceof Promise
  eq foo(3).then((x) -> x), 6

test "async functions works on bound function as well", ->
  Foo = (y) ->
    @y = y
    return ((x) async => x + @y + 3)

  eq (Foo(2))(3).then((x) -> x), 8

test "nested async functions", ->
  foo = (x) async -> (y) async -> x + y
  eq (foo(3).then((y) -> y(4).then((x) -> x))), 7
