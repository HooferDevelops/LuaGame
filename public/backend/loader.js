import { displayScale } from "./display-scale.js";
import { LuaLoader } from "./lua-loader.js";

// start display scaler
displayScale()

let main = new LuaLoader();

await main.preloadScripts();

main.executeScript("test");

// run a test fengari load script
//fengari.load("print(game['test']())")();