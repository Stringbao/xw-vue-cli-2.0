
module.exports = {
    projectPath:"",
    set(path){
        this.projectPath = path;
    },
    get(){
        if(!this.projectPath){
            return "/Users/wupeng/Documents/www";
        }
        return this.projectPath;
    }
}