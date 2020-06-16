const con = require('./config/db');
const mailUtil = require('./utils/mailUtil');
const fetch  = require('node-fetch');

setInterval( async  ()=>{
    const response = await fetch(`http://worldclockapi.com/api/json/utc/now`);
    if (response.ok) {
        const json = await response.json();
        let current_time = json.currentDateTime.slice(0, 16).replace('T', ' ') + ':00';

        let sql = `select * from mail_queue where sendtime < '${current_time}' and status = 'a' limit 10`;
        let result = await con.query(sql);
        if(result.length > 0){
            let ids = '(';

            for(let i = 0 ; i < result.length ; i++){
                mailUtil.sendMail(result[i].mailTo,result[i].subject,result[i].html);
                if(i == 0){
                    ids = ids +  result[i].id;
                }else{
                    ids = ids + ',' + result[i].id;
                }
            }
            
            ids = ids+')';
    
            sql = `update mail_queue set status = 'i' where id in ${ids}`;
            await con.query(sql);
        }else{
            console.log('all set for now');
        }
    }else{
        console.log('Some error occured');
    }
},5000);