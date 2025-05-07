import app from './app';
import config from './app/config';


const startServer = async () => {
  try {
 
    app.listen(config.port || 3001, () => {
      console.log(`Server running on port: ${config.port || 3001}`);
    });
  } catch (error) {
  
    console.error('Error starting server:', error);
  }
};

startServer();
