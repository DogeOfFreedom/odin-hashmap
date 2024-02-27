/* eslint-disable import/extensions */
import Hashmap from "./hashmap.js";

const hashmap = new Hashmap();
hashmap.set("chicken", "Old value");
hashmap.set("chicken", "New Value");
hashmap.set("chickenasfas", "New VsdgsafefWEalue");
console.log(hashmap.keys());
console.log(hashmap.values());
console.log(hashmap.entries());
