import { LuaLoader } from "./lua-loader.js";

let main = new LuaLoader();

await main.preloadScripts();

main.executeScript("test");