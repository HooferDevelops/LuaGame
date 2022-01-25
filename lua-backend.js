const luaconf  = fengari.luaconf;
const lua      = fengari.lua;
const lauxlib  = fengari.lauxlib;
const lualib   = fengari.lualib;

const L = lauxlib.luaL_newstate();

lualib.luaL_openlibs(L);

lua.lua_pushstring(L, "100");
lua.lua_setglobal(L, "gvar");

lauxlib.luaL_loadstring(L, "print(1)")

let result = lua.lua_pcall(L, 0, 0, 0);

if (result != 0) {
  console.log(new TextDecoder().decode(lua.lua_tostring(L, -1)))
}

console.log(result)

console.log("LUA Completed!")