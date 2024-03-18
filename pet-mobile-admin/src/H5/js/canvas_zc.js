// JavaScript Document

//-----思维导图

var pop = {
//    *
//     *画图
//     * @param {Array} arr [旺夫妇,旺感情,旺财富,旺人脉,旺家庭]
//     
    canvasM:function(arr){
        var pArr1=[[307,65],[307,105],[307,145],[307,185]];//目标导向
        var pArr2=[[140,227],[185,227],[225,227],[270,227]];//精确服从
        var pArr3=[[307,390],[307,350],[307,310],[307,270]];//耐心合作
        var pArr4=[[470,227],[430,227],[390,227],[350,227]];//影响感召
        var canvas = document.getElementById("fivePoint");
        var context = canvas.getContext("2d");
        context.moveTo(pArr1[arr[0]][0],pArr1[arr[0]][1]);
        context.lineTo(pArr2[arr[1]][0],pArr2[arr[1]][1]);
        context.moveTo(pArr2[arr[1]][0],pArr2[arr[1]][1]);
        context.lineTo(pArr3[arr[2]][0],pArr3[arr[2]][1]);
        context.moveTo(pArr3[arr[2]][0],pArr3[arr[2]][1]);
        context.lineTo(pArr4[arr[3]][0],pArr4[arr[3]][1]);
        context.moveTo(pArr4[arr[3]][0],pArr4[arr[3]][1]);
        context.lineTo(pArr1[arr[0]][0],pArr1[arr[0]][1]);
        context.lineWidth = 3;
        context.strokeStyle = "#23bcbb";
        context.stroke();

        context.beginPath();
        context.arc(pArr1[arr[0]][0],pArr1[arr[0]][1],5,0,Math.PI*2,false);
        context.fillStyle="#23bcbb";
        context.fill();
        context.strokeStyle="#ffffff";
        context.stroke();
        context.closePath();
        context.beginPath();
        context.arc(pArr2[arr[1]][0],pArr2[arr[1]][1],5,0,Math.PI*2,false);
        context.fillStyle="#23bcbb";
        context.fill();
        context.strokeStyle="#ffffff";
        context.stroke();
        context.closePath();
        context.beginPath();
        context.arc(pArr3[arr[2]][0],pArr3[arr[2]][1],5,0,Math.PI*2,false);
        context.fillStyle="#23bcbb";
        context.fill();
        context.strokeStyle="#ffffff";
        context.stroke();
        context.closePath();
        context.beginPath();
        context.arc(pArr4[arr[3]][0],pArr4[arr[3]][1],5,0,Math.PI*2,false);
        context.fillStyle="#23bcbb";
        context.fill();
        context.strokeStyle="#ffffff";
        context.stroke();
        context.strokeStyle="#ffffff";
        context.stroke();
        context.closePath();
        context.beginPath();
        context.arc(pArr1[arr[0]][0],pArr1[arr[0]][1],1,0,Math.PI*2,false);
        context.arc(pArr2[arr[1]][0],pArr2[arr[1]][1],1,0,Math.PI*2,false);
        context.arc(pArr3[arr[2]][0],pArr3[arr[2]][1],1,0,Math.PI*2,false);
        context.arc(pArr4[arr[3]][0],pArr4[arr[3]][1],1,0,Math.PI*2,false);
        context.globalAlpha=0.2;
        context.fillStyle="#23bcbb";
        context.fill();
        context.closePath();
    }

}
export default pop;