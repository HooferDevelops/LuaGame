const test = (L) => {
    lua.lua_pushstring(L, "test");
    console.log(_this.data)
    console.log("!")

    return 1;
}

export { test }