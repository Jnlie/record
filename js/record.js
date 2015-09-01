(function()
{   record.data=configdata;

    record.bottom =function(){
        //dom
        var rec_btn;
        // obj
        var rec;
        // int
        var intervalKey;
        //flag
        var recording= 0;
        //function
        var init,          find_ele,           switch_record,
            onFail,         onSuccess;

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
        };

        switch_record = function(){
            if(!recording){
                rec.clear();
                rec.record();
            }
            else {
                rec.stop();
                rec.exportWAV(function(blob) {
                    $.ajax({
                        url: "/newaudio",
                        data: {
                            "audio":blob,
                            "number":record.data.present_number
                        },
                        success: function(){
                            console.log("success");
                        }
                    });
                });
            }
            recording=!recording;
        };

        init = function(){
            find_ele();
            rec_btn.click(switch_record);
        };

        return {
            init:init
        }
    }()
}
    )();