import { request } from "./request.js";
import { makeGlobalFunctionList } from "./lua-util.js";
import { test } from "./globals/game.js";
import { execute, tableprint } from "./globals/util.js";

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
            "test": test
        })

        // create the global util state
        makeGlobalFunctionList(L, "util", {
            "execute": execute,
            "tableprint": tableprint
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