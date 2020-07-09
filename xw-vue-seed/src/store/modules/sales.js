
import SaleServices from "@services/sales.js";

export default {
    namespaced: true,
    state:{
        salesRoute:[]
    },
    mutations:{
        setSalesRoute(state,data){
            if(data && data instanceof Array){
                state.salesRoute = data;
            }
        },
    },
    actions:{
        getSalesRoute(context,cb){
            if(context.state.salesRoute.length >0){
                return;
            }
            SaleServices.getSalesRoute().then((res)=>{
                context.commit("setSalesRoute",res.data);
                cb && cb(res);
            });
        }
    }
}