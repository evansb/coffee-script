# Async Function Literals
# -----------------

# Function Definition
x = 1
y = {}
y.x = async -> 3
ok x is 1
ok typeof(y.x) is 'function'
ok y.x instanceof Function
ok y.x() is 3

# The empty function should not cause a syntax error.
async ->
() async ->

# with multiple single-line functions on the same line.
func = (x) async -> (x) async -> (x) async -> x
ok func(1)(2)(3) is 3

# Make incorrect indentation safe.
func = async ->
  obj = {
          key: 10
        }
  obj.key - 5
eq func(), 5

# Ensure that functions with the same name don't clash with helper functions.
del = -> 5
ok del() is 5

# Bound Function Definition
obj =
  bound: ->
    (async => this)()
  unbound: ->
    (async -> this)()
  nested: async ->
    (async =>
      (async =>
        (async => this)()
      )()
    )()
eq obj, obj.bound()
ok obj isnt obj.unbound()
eq obj, obj.nested()
