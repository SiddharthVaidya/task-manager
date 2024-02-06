class Validator{
    static validatePostRequest(body){
        if(body.hasOwnProperty("title")
            && body.hasOwnProperty("description")
            && body.hasOwnProperty("completed")){
                return (
                  typeof body.title === "string" &&
                  typeof body.description === "string" &&
                  typeof body.completed === "boolean"
                );
            }else{
                return false;
            }
    }
    static validatePutRequest(body){
        let status = true
        if(body.title){
            status = status && typeof(body.title) === "string";
        }
        if(body.description){
            status = status && typeof(body.description) === "string";
        }
        if(body.completed){
            status = status && typeof(body.completed) === "boolean";
        }
        return status
    }
}

module.exports = Validator