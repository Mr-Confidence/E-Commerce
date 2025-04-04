const checkConfig = (server) => {
    let config = {}; // ✅ Fixed invalid declaration
    
    switch (server) {
      case "production":
        config = {
          baseUrl: "",
        };
        break;
      case "local":
        config = {
          baseUrl: "http://localhost:7000",
        };
        break;
      default:
        config = {}; // ✅ Ensure config is always an object
    }
  
    return config;
  };
  
  export const selectServer = "local";
  export const config = checkConfig(selectServer);
  
  