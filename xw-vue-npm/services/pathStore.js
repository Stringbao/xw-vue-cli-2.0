
module.exports = {
    projectPath:"",
    set(path){
        this.projectPath = path;
    },
    get(){
        if(!this.projectPath){
            return "/Users/wupeng/Documents/aaa";
        }
        return this.projectPath;
    }
}