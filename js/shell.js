var record={};
var shell = function(){

    var init,getsentence;

    init = function(){
        record.datainput.init();
        record.data=configdata;
        getsentence();
        record.bottom.init();
       // record.bottom.start();
        //rencord.graph.init();

    }

    getsentence =function(){
        record.data.sentences =new Array();
        for(var i =0;i<200;i++){
            record.data.sentences.push("num:"+(i+1))
        }
    }


    return{
        init:init
    }
}