module.exports = {
  configureWebpack: {
    resolve: {
      fallback: { 
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify") 
      } 
    }     
  },
  devServer: {
  //   headers: { 
  //     "Access-Control-Allow-Origin": "*", 
  //     "Access-Control-Allow-Credentials": "true" 
  //   },
    proxy: {
      '/api': {
        target: 'http://localhost:80/',
        changeOrigin: true, // so CORS doesn't bite us.
        logLevel: 'debug',
        
      }
    },
    
    historyApiFallback: true,
  
  },    
}

  
  