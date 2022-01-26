const luaconf  = fengari.luaconf;
const lua      = fengari.lua;
const lauxlib  = fengari.lauxlib;
const lualib   = fengari.lualib;

// function that creates a global variable in the lua state, and adds all the functions as a list
function makeGlobalFunctionList(scope, global_name, functions_object){
    let L = scope;

    // create a lua table
    lua.lua_newtable(L);

    // loop through each function
    for (let function_name in functions_object) {
        // get the function
        let function_object = functions_object[function_name];
        
        // set the table value to the function
        lua.lua_pushjsfunction(L, function_object);

        // set the table index to the function name
        lua.lua_setfield(L, -2, function_name);
    }

    // create a global lua variable with the name
    lua.lua_setglobal(L, global_name);
}

export { makeGlobalFunctionList }