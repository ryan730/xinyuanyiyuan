// JavaScript Document

//-----思维导图

var pop = {
//    *
//     *画图
//     * @param {Array}
//     
    canvasM:function(arr){
        var pArr1=[[334,43],[334,71],[334,99],[334,127],[334,155],[334,182]];//生活型
        var pArr2=[[463,94],[443,116],[423,136],[403,156],[385,173],[365,193]];//自主/独立型
        var pArr3=[[519,220],[490,220],[460,220],[431,220],[403,220],[375,220]];//挑战/成就型
        var pArr4=[[464,346],[442,326],[421,307],[402,286],[382,268],[362,250]];//创新/创造型
		var pArr5=[[334,400],[334,370],[334,340],[334,313],[334,287],[334,260]];//技术/专业型
        var pArr6=[[202,348],[222,325],[244,307],[266,285],[285,269],[304,247]];//管理/领导型
        var pArr7=[[148,220],[179,220],[210,220],[238,220],[262,220],[295,220]];//安全/稳定型
        var pArr8=[[204,94],[224,114],[244,134],[266,154],[285,170],[305,193]];//服务/助人型
        var canvas = document.getElementById("fivePoint");
        var context = canvas.getContext("2d");
        context.moveTo(pArr1[arr[0]][0],pArr1[arr[0]][1]);
        context.lineTo(pArr2[arr[1]][0],pArr2[arr[1]][1]);
        context.moveTo(pArr2[arr[1]][0],pArr2[arr[1]][1]);
        context.lineTo(pArr3[arr[2]][0],pArr3[arr[2]][1]);
        context.moveTo(pArr3[arr[2]][0],pArr3[arr[2]][1]);
        context.lineTo(pArr4[arr[3]][0],pArr4[arr[3]][1]);
        context.moveTo(pArr4[arr[3]][0],pArr4[arr[3]][1]);
		context.lineTo(pArr5[arr[4]][0],pArr5[arr[4]][1]);
        context.moveTo(pArr5[arr[4]][0],pArr5[arr[4]][1]);
		context.lineTo(pArr6[arr[5]][0],pArr6[arr[5]][1]);
        context.moveTo(pArr6[arr[5]][0],pArr6[arr[5]][1]);
		context.lineTo(pArr7[arr[6]][0],pArr7[arr[6]][1]);
        context.moveTo(pArr7[arr[6]][0],pArr7[arr[6]][1]);
		context.lineTo(pArr8[arr[7]][0],pArr8[arr[7]][1]);
        context.moveTo(pArr8[arr[7]][0],pArr8[arr[7]][1]);
        context.lineTo(pArr1[arr[0]][0],pArr1[arr[0]][1]);
        context.lineWidth = 3;
        context.strokeStyle = "#ffa000";
        context.stroke();

        context.beginPath();
        context.arc(pArr1[arr[0]][0],pArr1[arr[0]][1],6,0,Math.PI*0,false);
        context.fillStyle="#ffa000";
        context.fill();
        context.strokeStyle="#ffffff";
        context.stroke();
        context.closePath();
        context.beginPath();
        context.arc(pArr2[arr[1]][0],pArr2[arr[1]][1],6,0,Math.PI*0,false);
        context.fillStyle="#ffa000";
        context.fill();
        context.strokeStyle="#ffffff";
        context.stroke();
        context.closePath();
        context.beginPath();
        context.arc(pArr3[arr[2]][0],pArr3[arr[2]][1],6,0,Math.PI*0,false);
        context.fillStyle="#ffa000";
        context.fill();
        context.strokeStyle="#ffffff";
        context.stroke();
        context.closePath();
        context.beginPath();
		context.arc(pArr4[arr[3]][0],pArr4[arr[3]][1],6,0,Math.PI*0,false);
        context.fillStyle="#ffa000";
        context.fill();
        context.strokeStyle="#ffffff";
        context.stroke();
        context.closePath();
        context.beginPath();
		context.arc(pArr5[arr[4]][0],pArr5[arr[4]][1],6,0,Math.PI*0,false);
        context.fillStyle="#ffa000";
        context.fill();
        context.strokeStyle="#ffffff";
        context.stroke();
        context.closePath();
        context.beginPath();
		context.arc(pArr6[arr[0]][0],pArr6[arr[4]][1],6,0,Math.PI*0,false);
        context.fillStyle="#ffa000";
        context.fill();
        context.strokeStyle="#ffffff";
        context.stroke();
        context.closePath();
        context.beginPath();
		context.arc(pArr7[arr[0]][0],pArr7[arr[4]][1],6,0,Math.PI*0,false);
        context.fillStyle="#ffa000";
        context.fill();
        context.strokeStyle="#ffffff";
        context.stroke();
        context.closePath();
        context.beginPath();
		context.arc(pArr8[arr[0]][0],pArr8[arr[4]][1],6,0,Math.PI*0,false);
        context.fillStyle="#ffa000";
        context.fill();
        context.strokeStyle="#ffffff";
        context.stroke();
        context.closePath();
        context.beginPath();
        context.arc(pArr1[arr[0]][0],pArr1[arr[0]][1],1,0,Math.PI*2,false);
        context.arc(pArr2[arr[1]][0],pArr2[arr[1]][1],1,0,Math.PI*2,false);
        context.arc(pArr3[arr[2]][0],pArr3[arr[2]][1],1,0,Math.PI*2,false);
        context.arc(pArr4[arr[3]][0],pArr4[arr[3]][1],1,0,Math.PI*2,false);
		context.arc(pArr5[arr[0]][0],pArr5[arr[0]][1],1,0,Math.PI*2,false);
        context.arc(pArr6[arr[1]][0],pArr6[arr[1]][1],1,0,Math.PI*2,false);
        context.arc(pArr7[arr[2]][0],pArr7[arr[2]][1],1,0,Math.PI*2,false);
        context.arc(pArr8[arr[3]][0],pArr8[arr[3]][1],1,0,Math.PI*2,false);
        context.globalAlpha=0;
        context.fillStyle="#ffa000";
        context.fill();
        context.closePath();
    }

}
export default pop;