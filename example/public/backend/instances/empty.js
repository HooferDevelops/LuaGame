// Empty Instance :
// ----------------------------------------------------------------------------
// This is an empty instance. It is used simply for holding positional and
// rotational data for children instances. It is very useful for containers.
// This is made SPECIFICALLY for the Lua scripting language ONLY.
// ----------------------------------------------------------------------------

const luaconf  = fengari.luaconf;
const lua      = fengari.lua;
const lauxlib  = fengari.lauxlib;
const lualib   = fengari.lualib;

class EmptyInstance {
    static createLuaSchema(L) {
        let accessibleFunctions = [
            'getPosition',
            'getRotation',
            'setPosition',
            'setRotation',
            'setPositionAndRotation',
            'getPositionAndRotation'
        ]

        let readableProperties = {
            'position': 0,
            'rotation': 0
        }

        // create a newmetatable
        lauxlib.luaL_newmetatable(L, "Empty");
        lauxlib.luaL_getmetatable(L, "Empty");
        lua.lua_setmetatable(L, -2);

        // create a table for the values
        lua.lua_newtable(L);

        // loop through all readable properties
        for (let property in readableProperties) {
            // add the property to the metatable
            lua.lua_pushnumber(L, readableProperties[property]);
            lua.lua_setfield(L, -2, property);
        }

        // push the table
        // put the table inside the table
        lua.lua_setfield(L, -2, "__readonly");


        // reading data metamethod
        lua.lua_pushjsfunction(L, (L)=>{
            let indexing_string = lua.lua_tojsstring(L, 2);

            console.log(lua.lua_gettop(L));

            lua.lua_settop(L, 2);

            lua.lua_getfield(L, -3, "__readonly");
            // TODO: fix this lol            
        })

        lua.lua_setfield(L, -2, "__index");

        // read only metamethod
        lua.lua_pushjsfunction(L, (L)=>{
            lauxlib.luaL_error(L, "Attempt to write to a read-only property");

            return 1;
        });

        lua.lua_setfield(L, -2, "__newindex");
    }

    // Get the position of the instance
    /**
     * 
     * @param {Object} L Current Luastate for the function call
     * @returns {Boolean} Success 
     * @memberof EmptyInstance
    */
    static getPosition(L) {
    
    }

    // Get the rotation of the instance
    /**
     * 
     * @param {Object} L Current Luastate for the function call
     * @returns {Boolean} Success 
     * @memberof EmptyInstance
    */
    static getRotation(L) {

    }

    // Set the position of the instance
    /**
     * 
     * @param {Object} L Current Luastate for the function call
     * @returns {Boolean} Success
     * @memberof EmptyInstance
    */
    static setPosition(L) {

    }

    // Set the rotation of the instance
    /**
     * 
     * @param {Object} L Current Luastate for the function call
     * @returns {Boolean} Success
     * @memberof EmptyInstance
    */
    static setRotation(L) {

    }

    // Set the position and rotation of the instance
    /**
     * 
     * @param {Object} L Current Luastate for the function call
     * @returns {Boolean} Success
     * @memberof EmptyInstance
    */
    static setPositionAndRotation(data) {

    }

    // Get the position and rotation of the instance
    /**
     * 
     * @param {Object} L Current Luastate for the function call
     * @returns {Boolean} Success
     * @memberof EmptyInstance
    */
    static getPositionAndRotation(data) {

    }
}

export { EmptyInstance }