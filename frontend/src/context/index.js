import { createContext } from "react";

//createContext(null): This creates a new "context" with a starting value of null. It's like saying, "I have this new global variable, but right now, it doesn't have a value."
// Here, you are saving that new global variable into a constant named Context. Now, whenever you want to use or update this variable, you’ll refer to it as Context.
const Context=createContext(null)

export default Context