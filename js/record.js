(function()
{

    record.bottom =function(){
        //dom
        var rec_btn,       next_btn,     sentence,
            index;
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
                        console.log('suc');
                    },
                    error : function() {
                        console.log('fail');
                    }
                });
            });
            record.data.present_number++;
            sentence[0].innerText = record.data.sentences[record.data.present_number];
            index[0].innerText = record.data.present_number+"/"+record.data.total_number;

        }

        init = function(){
            find_ele();

            rec_btn.click(switch_record);
            next_btn.click(next_sentence);
        };

        return {
            init:init
        }
    }()
}
    )();