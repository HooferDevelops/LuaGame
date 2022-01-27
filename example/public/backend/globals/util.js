import { Global } from "../globals.js";

const luaconf  = fengari.luaconf;
const lua      = fengari.lua;
const lauxlib  = fengari.lauxlib;
const lualib   = fengari.lualib;

const execute = (L) => {    
    let script = lua.lua_tojsstring(L, 1);
    lauxlib.luaL_checktype(L, 1, lua.LUA_TSTRING);

    let result = Global.LuaLoader.executeScript(script);
    lua.lua_pushboolean(L, result);

    return 1;
}

const tableprint = (L) => {
    lauxlib.luaL_checktype(L, 1, lua.LUA_TTABLE);
                
    let print = (L, i=0) => {
        let result = {}

        lua.lua_pushvalue(L, -1-i);

        lua.lua_pushnil(L);

        // loop through the table
        while (lua.lua_next(L, -2) != 0) {
            lua.lua_pushvalue(L, -2);
            
            if (lua.lua_type(L, -2) == lua.LUA_TSTRING) {
                let key = lua.lua_tojsstring(L, -1);
                let value = lua.lua_tojsstring(L, -2);
                result[key] = value;
            } else if (lua.lua_type(L, -2) == lua.LUA_TNUMBER) {
                let key = lua.lua_tojsstring(L, -1);
                let value = lua.lua_tonumber(L, -2);
                result[key] = value;
            } else if (lua.lua_type(L, -2) == lua.LUA_TBOOLEAN) {
                let key = lua.lua_tojsstring(L, -1);
                let value = lua.lua_toboolean(L, -2);
                result[key] = value;
            } else if (lua.lua_type(L, -2) == lua.LUA_TTABLE) {
                let key = lua.lua_tojsstring(L, -1);
                let value = print(L, 1);

                result[key] = value;
            } else if (lua.lua_type(L, -2) == lua.LUA_TFUNCTION) {
                let key = lua.lua_tojsstring(L, -1);
                result[key] = "function";
            }
            
            lua.lua_pop(L, 2);
        }

        lua.lua_pop(L, 1);

        return result;
    }

    console.log(print(L));

    return 1;
}

export { execute, tableprint }