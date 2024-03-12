export let localServices = { 
    set: (user) => { 
        return localStorage.setItem("USER_LOGIN", JSON.stringify(user))
     },
     get: () => { 
        return JSON.parse(localStorage.getItem("USER_LOGIN"))
      },
      remove: () => {
        return localStorage.removeItem("USER_LOGIN");
      }
 }