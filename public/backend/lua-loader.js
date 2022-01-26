import { request } from "./request.js";

const luaconf  = fengari.luaconf;
const lua      = fengari.lua;
const lauxlib  = fengari.lauxlib;
const lualib   = fengari.lualib;

// get the main fengari lua state
class LuaLoader{
    constructor(){
        this.L = lauxlib.luaL_newstate();
        lualib.luaL_openlibs(this.L);

        let _this = this;
        let L = this.L;

        this.data = [];

        // create a lua table
        lua.lua_newtable(L);

        // create a global lua variable with a function that returns the string "test"
        lua.lua_pushjsfunction(L, function() {
            lua.lua_pushstring(L, "test");
            console.log(_this.data)
            console.log("!")
            return 1;
        });


        lua.lua_setfield(L, -2, "test");

        // create a global lua variable
        lua.lua_setglobal(L, "game");        
    }

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

                // log it to console
                console.log(name + " " + path + " " + type);

                // make a request to get the file from the lua folder
                const file = await request("GET", "/lua/" + path);

                // log it to console
                console.log("loaded " + path);
                
                _this.data.push({
                    name: name, path: path, type: type, file: file
                });

                res(true);
            }
        })
    }

    executeScript(name){
        let L = this.L;

        // get the file from the data variable table
        let script = this.data.find(x => x.name === name);

        // execute the file
        let loaded = lauxlib.luaL_loadstring(L, fengari.to_luastring(script.file));

        if (loaded != 0) {
            console.warn("error loading %s:\n %s", script.name, lua.lua_tojsstring(L, -1));
            lua.lua_pop(L, 1);
            return;
        }

        loaded = lua.lua_resume(L, null, 0)

        if (loaded != 0) {
            console.warn("error loading %s:\n %s", script.name, lua.lua_tojsstring(L, -1));
            lua.lua_pop(L, 1);
            return;
        }
    }
}

export { LuaLoader }