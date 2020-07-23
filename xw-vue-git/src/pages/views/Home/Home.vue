<template>
    <div>
        概览
        <div v-html="myMdDescCode">
            
        </div>
    </div>
</template>
<script>
import myMdDesc from "./desc.md"
import marked from "marked";

export default {
    components: {myMdDesc},
    data(){
        return {
            myMdDescCode: myMdDesc
        }
    },
    mounted() {
        this.myMdDescCode = marked(this.myMdDescCode);
    }
}
</script>
<style lang="scss" scoped>

</style>