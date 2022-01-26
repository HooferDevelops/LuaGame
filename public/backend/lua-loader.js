import { request } from "./request.js";
import { makeGlobalFunctionList } from "./lua-util.js";

const luaconf  = fengari.luaconf;
const lua      = fengari.lua;
const lauxlib  = fengari.lauxlib;
const lualib   = fengari.lualib;

class LuaLoader{
    constructor(){
        // create a new lua state
        this.L = lauxlib.luaL_newstate();
        lualib.luaL_openlibs(this.L);

        // some fallback variables
        let _this = this;
        let L = this.L;

        // create a new table to store the script data
        this.data = [];

        // create the global game state
        makeGlobalFunctionList(L, "game", {
            "test": () => {
                lua.lua_pushstring(L, "test");
                console.log(_this.data)
                console.log("!")

                return 1;
            }
        })

        // create the global util state
        makeGlobalFunctionList(L, "util", {
            "execute": (L) => {
                let script = lua.lua_tojsstring(L, 1);
                lauxlib.luaL_checktype(L, 1, lua.LUA_TSTRING);

                let result = this.executeScript(script);
                lua.lua_pushboolean(L, result);

                return 1;
            },
            "tableprint": (L) => {
                let table = lua.lua_settop(L, 1);
                lauxlib.luaL_checktype(L, 1, lua.LUA_TTABLE);

                
                let print = (L, i=0) => {
                    let result = {}

                    lua.lua_pushvalue(L, -1-i);

                    lua.lua_pushnil(L);

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
        })
    }

    // preload all the scripts from the lua folder using the scripts.json file
    preloadScripts(){
        let L = this.L;
        let _this = this;

        return new Promise(async (res, rej) => {
            const response = await request("GET", "/lua/scripts.json");
            const scripts = JSON.parse(response);

            // loop through each script
            for (let i = 0; i < scripts.length; i++) {
                let information = scripts[i];
                let name = information.name;
                let path = information.path;
                let type = information.type;

                // make a request to get the file from the lua folder
                const file = await request("GET", "/lua/" + path);

                // log it to console
                console.warn("loaded " + path);
                
                _this.data.push({
                    name: name, path: path, type: type, file: file
                });
            }
            
            res(true);
        })
    }

    // execute a script from the lua folder based on the name
    executeScript(name){
        let L = this.L;

        // get the file from the data variable table
        let script = this.data.find(x => x.name === name);

        // execute the file
        /*let loaded = lauxlib.luaL_loadstring(L, fengari.to_luastring(script.file));

        if (loaded != 0) {
            console.warn("error loading %s:\n %s", script.name, lua.lua_tojsstring(L, -1));
            lua.lua_pop(L, 1);
            return false;
        }

        loaded = lua.lua_resume(L, lua.lua_gettop(L) - 1, 0)

        if (loaded != 0) {
            console.warn("error loading %s:\n %s", script.name, lua.lua_tojsstring(L, -1));
            lua.lua_pop(L, 1);
            return false;
        }*/

        let loaded = lauxlib.luaL_dostring(L, fengari.to_luastring(script.file));

        if (loaded != 0) {
            console.warn("error loading %s:\n %s", script.name, lua.lua_tojsstring(L, -1));
            lua.lua_pop(L, 1);
            return false;
        }

        return true;
    }
}

export { LuaLoader }