import { Global } from "./globals.js";
import { LuaLoader } from "./lua-loader.js";

let main = new LuaLoader();
Global.LuaLoader = main;

await main.preloadScripts();

main.executeScript("test");