(function()
{record.datainput = function(){

    var gender_value,  age_value,    gender,
        age,           inputgroup,    start_btn,
        name_value,    nation_value,  if_continue,
        continue_1,    continue_0;

    var name,nation,gender,age;

    var init,   findele,     getgender,
        getage, submitinfo;

    fineele = function(){
        gender_value=$("#gender_value");
        age_value=$("#age_value");
        name_value =$("#name");
        nation_value =$("#nation");
        gender=$(".gender");
        age=$(".age");
        inputgroup=$("#inputgroup");
        start_btn =$("#start_record");
        if_continue =$("#if_continue");
        continue_0 =$("#continue_0");
        continue_1 =$("#continue_1");

    }

    getgender=function(){
        gender = this.innerText;
        gender_value[0].innerText=gender;
    }

    getage=function(){
        age = this.innerText;
        age_value[0].innerText=age;
    }

    submitinfo=function(){
        name=name_value[0].value;
                nation=nation_value[0].value;
if(name&&nation&&gender&&age){
//        $.ajax({
//            url: "/info",
//            type: "POST",
//            data: {
//                "name":name,
//                "nation":nation,
//                "gender":gender,
//                "age":age
//            },
//            success:function(){
//            }
//        });
        inputgroup.fadeOut(1000);
        start_btn.fadeOut(1000);
        record.bottom.start();
}
        else{alert("info uncompleted") }
    }

    init = function(){
        fineele();
        gender.click(getgender);
        age.click(getage);
        start_btn.click(submitinfo);
        continue_1.click(function(){
            if_continue.fadeOut(1000);
            record.data.present_number=$.cookie("rokid_record_presentnum");
            record.bottom.start();
        });

        continue_0.click(function(){
            if_continue.fadeOut(1000);
            inputgroup.fadeIn(1000);
            start_btn.fadeIn(1000);
        })

        if($.cookie("rokid_record_presentnum")){
            console.log($.cookie("rokid_record_presentnum"));
            if_continue.fadeIn(1000);
            if_continue[0].style.left=window.innerWidth/2-if_continue[0].scrollWidth/2;
            inputgroup.fadeOut(1000);
            start_btn.fadeOut(1000);
        }
    }

    return{
        init:init
    }
}()

})();