print("Hello from lua! :p")

print("LUA:", "attempting to load: test2")
print("LUA:", util.execute("test2"))

util.tableprint({
    "Hello",
    "World",
    "Lua",
    "is",
    "cool",
    false,
    x1 = 5,
    x2 = {
        "z",
        {
            "lul"
        }
    },
    x3 = {
        5
    }
})

util.tableprint(game)
util.tableprint(util)

util.tableprint(instance)

print("LUA:", "creating an empty instance!")

local empty_instance = instance.new("empty")
print(tostring(empty_instance))
util.tableprint(empty_instance)
print(empty_instance.position)

util.tableprint(empty_instance)