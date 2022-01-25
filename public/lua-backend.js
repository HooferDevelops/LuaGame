const luaconf  = fengari.luaconf;
const lua      = fengari.lua;
const lauxlib  = fengari.lauxlib;
const lualib   = fengari.lualib;

// get the main fengari lua state
const L = fengari.L;

// create a global lua variable with the default value of a string saying test
lua.lua_pushstring(L, "test");
lua.lua_setglobal(L, "test");

// run a test fengari load script
fengari.load("print(test)")();