(function()
{

    record.bottom =function(){
        //dom
        var rec_btn,       next_btn,     sentence,
            index,         senblock;
        // obj
        var rec;
        // int
        var intervalKey;
        //flag
        var recording= 0;
        //function
        var init,          find_ele,           switch_record,
            onFail,         onSuccess,         next_sentence;

//==========================================================================================
        onFail = function(e) {
            console.log('Rejected!', e);
        };

        onSuccess = function(s) {
            var context = new AudioContext();
            var mediaStreamSource = context.createMediaStreamSource(s);
            rec = new window.Recorder(mediaStreamSource);
            //rec.record();
            // audio loopback
            // mediaStreamSource.connect(context.destination);
        }

        //window.URL = URL || window.URL || window.webkitURL;
        navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

        function startRecording() {
            if (navigator.getUserMedia) {
                navigator.getUserMedia({audio: true}, onSuccess, onFail);
            } else {
                console.log('navigator.getUserMedia not present');
            }
        }
        startRecording();

        find_ele=function(){
            rec_btn = $("#rec_btn");
            next_btn =$("#next_btn");
            sentence = $("#sen_p");
            senblock = $("#sentence");
            index = $("#index")
        };

        switch_record = function(){
            if(!recording){
                rec.clear();
                rec.record();
                rec_btn[0].innerText=("Stop");
            }
            else {
                rec.stop();
                rec_btn[0].innerText=("Start")
            }
            recording=!recording;
        };

        next_sentence = function(){

            if(recording){
                rec.stop();
                recording=!recording;
                rec_btn[0].innerText=("Start")
            }
            rec.exportWAV(function(blob) {
                var fd=new FormData();
                fd.append('audio',blob);
                fd.append('number',record.data.present_number);
                $.ajax({
                    url: "/newaudio",
                    type: "POST",
                    data: fd,
                    processData: false,
                    contentType: false,
                    success:function(){
                    },
                    error : function() {
                        console.log('fail');
                    }
                });
            });
            record.data.present_number++;
            sentence[0].innerText = record.data.sentences[record.data.present_number-1];
            index[0].innerText = record.data.present_number+"/"+record.data.total_number;
            $.cookie("rokid_record_presentnum",record.data.present_number);
        }

        start = function(){
            rec_btn.fadeIn(2000);
            next_btn.fadeIn(2000);
            senblock.fadeIn(2000);
            sentence[0].innerText = record.data.sentences[record.data.present_number-1];
            index[0].innerText = record.data.present_number+"/"+record.data.total_number;
            $("#sentence")[0].style.marginTop=innerHeight*1/4;
            $("#sentence-left")[0].style.height=$("#sentence")[0].offsetHeight;
        }

        init = function(){
            find_ele();
            rec_btn[0].style.display="none" ;
            next_btn[0].style.display="none";
            senblock[0].style.display="none";

            rec_btn.click(switch_record);
            next_btn.click(next_sentence);
        };

        return {
            init:init,
            start:start
        }
    }()
}
    )();