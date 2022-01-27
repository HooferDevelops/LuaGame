import { Global } from "../globals.js";

const luaconf  = fengari.luaconf;
const lua      = fengari.lua;
const lauxlib  = fengari.lauxlib;
const lualib   = fengari.lualib;

import { EmptyInstance } from "../instances/empty.js";

let instance_list = {
    "empty": EmptyInstance
}

const newinstance = (L) => {
    let name = lua.lua_tojsstring(L, 1).toLowerCase();
    lauxlib.luaL_checktype(L, 1, lua.LUA_TSTRING);

    if (instance_list[name] == undefined) {
        lauxlib.luaL_error(L, "Instance '" + name + "' not found");
    }

    instance_list[name].createLuaSchema(L);

    return 1;
}

export { newinstance }