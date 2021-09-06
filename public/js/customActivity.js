console.log("hello world");
define(["postmonger"], function (Postmonger) {
    "use strict";
    var connection = new Postmonger.session();
    let authToken;
    let restEndpoint;
    let emailsubject ="";
    let subjectData;
    $(window).ready(onRender);
    connection.on("initActivity", initialize);
    connection.on("requestedTokens",onGetTokens);
    connection.on("requestedEndpoints",onGetEndpoints);
     
    function onRender(){
        connection.trigger("ready");
        connection.trigger("requestTokens");
        connection.trigger("requestInteraction");
    }

    function initialize(data) {
        $('#step1').hide();
        $('#step2').show();
        console.log('initilize called::'+data.key+"\n"+JSON.stringify(data));
        activityKey = data.key
        connection.on("requestedInteraction",onGetIteraction);
    }
    function onGetIteraction(interaction){
        console.log('onGetIteraction called::'+JSON.stringify(interaction));
        let interactionActivityIndex = -1;
        for (let x in interaction.activites){
            if(interaction.activites[x].key == activityKey) {
                interactionActivityIndex = x-1;
                break
            }
        }
        if(interactionActivityIndex > - 1){
            var emailInteraction = interaction.activites[interactionActivityIndex];
            if(emailInteraction){
                emailsubject = emailInteraction.configurationArguments.triggeredsend.emailsubject;
            } else {
                console.log("ERROR: Did not find email interaction in position:"+interactionActivityIndex);
            }
        }
        console.log('emailsubject::'+ emailsubject);
    }
    function onGetTokens(tokens) {
        console.log('onGetTokens func called::'+ tokens.fuel2token);
        authToken =  tokens.fuel2token;
        if(emailsubject){
            getSubjectData();
        }else{
            console.log("no subject found for this activity");
        }
    }

    function getSubjectData(){
        console.log('getsubjectdata::/subject/data.subject:'+emailsubject+',auth:'+authToken+',endpoint:'+restEndpoint);
        fetch(
            `/subject/data?subject=${emailsubject}&token=${authToken}&endpoint=${restEndpoint}`,
            {
                method:"GET",
            }
        )
        .then((response) =>{
            console.log('getsubjectdata::json::'+dataValue);
            subjectData = dataValue.subject;
            if(subjectData){
                console.log('calling getoriginalData.acc_id:'+dataValue.acc_id);
                getOriginalData(dataValue.acc_id);
            }else{
                console.log('originaldata not called');
            }
        })
        .catch((error) => {
            sourceDataList = [];
            console.log("api subject running : ",error);
        })
    }
    function getOriginalData(sparkpostUserId) {
        //console.log('getOriginalData subjectData '+subjectData);
        //console.log('authToken '+authToken);
        let cam_Idenfier = subjectData.campaignIdentifier;
    
        fetch(`/source/data?acc_id=${sparkpostUserId}&header_val=${cam_Idenfier}`, {
          method: "GET",
        })
          .then((response) => response.json())
          .then((dataValue) => {
            sourceDataList = dataValue.length == 0 ? [] : dataValue;
            getDomainRows();
          })
          .catch((error) => {
            sourceDataList = [];
            console.log("api source runningHover : ", error);
          });
      }
}