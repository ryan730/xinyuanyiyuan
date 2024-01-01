// JavaScript Document

//-----思维导图

var pop = {
//    *
//     *画图
//     * @param {Array} arr [旺夫妇,旺感情,旺财富,旺人脉,旺家庭]
//     
    canvasM:function(arr){作息规律性
        var pArr1=[[331,60],[331,90],[331,125],[331,150],[331,185]];//日常活动
        var pArr2=[[440,104],[425,124],[405,152],[385,170],[360,200]];//作息规律性
        var pArr3=[[503,203],[475,210],[437,213],[410,220],[370,223]];//变化接受度
        var pArr4=[[483,320],[453,300],[423,280],[400,270],[362,250]];//环境适应性
		var pArr5=[[390,395],[380,365],[368,332],[358,305],[342,265]];//反应激烈度
        var pArr6=[[270,395],[280,365],[290,335],[303,302],[320,262]];//情绪情悦度
        var pArr7=[[178,320],[205,303],[235,285],[260,265],[299,250]];//内在坚持度
        var pArr8=[[158,202],[190,208],[225,212],[252,217],[288,221]];//注意分散度
		var pArr9=[[220,102],[240,122],[263,150],[281,168],[306,194]];//外部敏感度
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
		context.lineTo(pArr9[arr[8]][0],pArr9[arr[8]][1]);
        context.moveTo(pArr9[arr[8]][0],pArr9[arr[8]][1]);
        context.lineTo(pArr1[arr[0]][0],pArr1[arr[0]][1]);
        context.lineWidth = 2;
        context.strokeStyle = "#ffa000";
        context.stroke();

        context.beginPath();
        context.arc(pArr1[arr[0]][0],pArr1[arr[0]][1],5,0,Math.PI*0,false);
        context.fillStyle="#ffa000";
        context.fill();
        context.strokeStyle="#ffffff";
        context.stroke();
        context.closePath();
        context.beginPath();
        context.arc(pArr2[arr[1]][0],pArr2[arr[1]][1],5,0,Math.PI*0,false);
        context.fillStyle="#ffa000";
        context.fill();
        context.strokeStyle="#ffffff";
        context.stroke();
        context.closePath();
        context.beginPath();
        context.arc(pArr3[arr[2]][0],pArr3[arr[2]][1],5,0,Math.PI*0,false);
        context.fillStyle="#ffa000";
        context.fill();
        context.strokeStyle="#ffffff";
        context.stroke();
        context.closePath();
        context.beginPath();
		context.arc(pArr4[arr[3]][0],pArr4[arr[3]][1],5,0,Math.PI*0,false);
        context.fillStyle="#ffa000";
        context.fill();
        context.strokeStyle="#ffffff";
        context.stroke();
        context.closePath();
        context.beginPath();
		context.arc(pArr5[arr[4]][0],pArr5[arr[4]][1],5,0,Math.PI*0,false);
        context.fillStyle="#ffa000";
        context.fill();
        context.strokeStyle="#ffffff";
        context.stroke();
        context.closePath();
        context.beginPath();
		context.arc(pArr6[arr[0]][0],pArr6[arr[4]][1],5,0,Math.PI*0,false);
        context.fillStyle="#ffa000";
        context.fill();
        context.strokeStyle="#ffffff";
        context.stroke();
        context.closePath();
        context.beginPath();
		context.arc(pArr7[arr[0]][0],pArr7[arr[4]][1],5,0,Math.PI*0,false);
        context.fillStyle="#ffa000";
        context.fill();
        context.strokeStyle="#ffffff";
        context.stroke();
        context.closePath();
        context.beginPath();
		context.arc(pArr8[arr[0]][0],pArr8[arr[4]][1],5,0,Math.PI*0,false);
        context.fillStyle="#ffa000";
        context.fill();
        context.strokeStyle="#ffffff";
        context.stroke();
        context.closePath();
        context.beginPath();
        context.arc(pArr9[arr[0]][0],pArr9[arr[4]][1],5,0,Math.PI*0,false);
        context.fillStyle="#ffa000";
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
		context.arc(pArr5[arr[0]][0],pArr5[arr[0]][1],1,0,Math.PI*2,false);
        context.arc(pArr6[arr[1]][0],pArr6[arr[1]][1],1,0,Math.PI*2,false);
        context.arc(pArr7[arr[2]][0],pArr7[arr[2]][1],1,0,Math.PI*2,false);
        context.arc(pArr8[arr[3]][0],pArr8[arr[3]][1],1,0,Math.PI*2,false);
		context.arc(pArr9[arr[4]][0],pArr9[arr[4]][1],1,0,Math.PI*2,false);
        context.globalAlpha=0;
        context.fillStyle="#ffa000";
        context.fill();
        context.closePath();
    }

}
// export default pop;