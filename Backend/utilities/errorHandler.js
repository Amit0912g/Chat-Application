class errorHandler extends Error{
    constructor(message="something went wrong", statusCode){
        super(message);
        this.statusCode = statusCode;
       this.message = message;

        Error.captureStackTrace(this, this.constructor);
    }
}
export default errorHandler;