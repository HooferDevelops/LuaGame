const luaconf  = fengari.luaconf;
const lua      = fengari.lua;
const lauxlib  = fengari.lauxlib;
const lualib   = fengari.lualib;

// create a new lua state
const L = lua.luaL_newstate();

// create a global lua variable with the default value of a string saying test
lua.lua_pushstring(L, "test");
lua.lua_setglobal(L, "test");

// load a lua string
lua.luaL_loadstring(L, "print(test)");

// run the lua string and check if it errored
if (lua.lua_pcall(L, 0, 0, 0) !== 0) {
  console.log("worked!")
}

