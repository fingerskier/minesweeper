// Custom error handler function
const specialErrorHandler = (message, ...optionalParams) => {
  // Customize this function with whatever you need
  // For example, log to an external service or add custom formatting
  console.log("Custom Error Handler:")
  console.log(message, ...optionalParams)
  
  // Optionally, forward to the original console error if needed
  // originalConsoleError(message, ...optionalParams)
}


export default specialErrorHandler