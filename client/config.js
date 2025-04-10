const checkConfig = (server) => {
    let config = {}; // ✅ Fixed invalid declaration
    
    switch (server) {
      case "production":
        config = {
          baseUrl: "https://e-commerce-wheat-chi.vercel.app",
        };
        break;
      case "local":
        config = {
          baseUrl: "http://localhost:8000",
        };
        break;
      default:
        config = {}; // ✅ Ensure config is always an object
    }
  
    return config;
  };
  
  export const selectServer = "production";
  export const config = checkConfig(selectServer);
  
  