class SeqErrorWraper extends Error{
    constructor(e) {
        super();
        if(e.message==="Validation error") {
            this.status = 401
            this.message = "This user already registrated"
        }
        else if(e.message==="Validation error: Validation len on password failed"){
            this.status = 401
            this.message="Passwor len is between 8 and 18";
        }
        else {
            this.status = 404
            this.message=e.message;
        }
    }
}
module.exports=SeqErrorWraper