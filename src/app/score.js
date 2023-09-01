'use server'
import { AES } from 'crypto-js';
import CryptoJS from 'crypto-js';
var jsonscore = require('./score.json')
var fs = require('fs');
export async function SubmitScore(Data) {
    var newscore =  Object.values(JSON.parse(AES.decrypt(Data,new Date().toUTCString().split(" ").splice(0,4).join(" ")).toString(CryptoJS.enc.Utf8)));
    var jsonadata =[];
    Object.assign(jsonadata,jsonscore);
    //check if day exists
    var boolval = false;
    for(let i =0;i<jsonadata.length;i++){
        if(jsonadata[i][0]==newscore[0]){
            boolval=true
        }
    }
    if(!boolval){
        var newdayk = newscore[0];
        var newdayv = [];
        jsonadata.push([newdayk,newdayv]);
        fs.writeFile('./src/app/score.json',JSON.stringify(jsonadata),(err)=>{
            console.log(err)
        });
    }
    var SaveDone=false;
    //add user to day scoreboard if in top5
    for(let i =0;i<jsonadata.length;i++){
        if(jsonadata[i][0]==newscore[0]){
            for(let j=0;j<5;j++){
                if(jsonadata[i][1][j]==undefined){
                    let booler = -1;
                    for(let k =0;k<jsonadata[i][1].length;k++){
                        if(jsonadata[i][1][k][3]==newscore[4]&&jsonadata[i][1][k][2]==newscore[3]){
                            booler=k;
                        }
                    }
                    if(booler!==-1&&newscore[2]>jsonadata[i][1][booler][1]){
                        jsonadata[i][1].splice(booler,1);//get rid of old users score
                    }
                    else if(booler!==-1&&newscore[2]<=jsonadata[i][1][booler][1]){
                        if(newscore[2]===jsonadata[i][1][booler][1]&&newscore[1]>jsonadata[i][1][booler][0]){
                            jsonadata[i][1].splice(booler,1);//get rid of old users score
                        }
                        else{
                            break;
                        }
                        
                    }
                    jsonadata[i][1].push(newscore.slice(1));
                    fs.writeFile('./src/app/score.json',JSON.stringify(jsonadata),(err)=>{
                        console.log(err)
                    });
                    SaveDone=true;
                    break;
                }
                else if(jsonadata[i][1][j][1]<newscore[2]){
                    let booler = -1;
                    for(let k =0;k<jsonadata[i][1].length;k++){
                        if(jsonadata[i][1][k][3]==newscore[4]&&jsonadata[i][1][k][2]==newscore[3]){
                            booler=k;
                        }
                    }
                    if(booler!==-1&&newscore[2]>jsonadata[i][1][booler][1]){
                        jsonadata[i][1].splice(booler,1);//get rid of old users score
                    }
                    else if(booler!==-1&&newscore[2]<=jsonadata[i][1][booler][1]){
                        if(newscore[2]===jsonadata[i][1][booler][1]&&newscore[1]>jsonadata[i][1][booler][0]){
                            jsonadata[i][1].splice(booler,1);//get rid of old users score
                        }
                        else{
                            break;
                        }
                    }
                    else{
                        jsonadata[i][1].splice(4,1);
                    }
                    jsonadata[i][1].splice(j,0,newscore.slice(1));
                    fs.writeFile('./src/app/score.json',JSON.stringify(jsonadata),(err)=>{
                        console.log(err)
                    });
                    SaveDone=true;
                    break;
                }
                
            }
        }
        
    }
    return SaveDone;
}
