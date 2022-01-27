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

