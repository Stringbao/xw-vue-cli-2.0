
module.exports = {
    projectPath:"",
    set(path){
        this.projectPath = path;
    },
    get(){
        return this.projectPath;
    }
}