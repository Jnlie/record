var shell = function(){

    var init;

    init = function(){
        record.datainput.init();
        record.buttom.init();
        record.head.init();
        record.sentence.init();
        //rencord.graph.init();
    }

    return{
        init:init
    }
}