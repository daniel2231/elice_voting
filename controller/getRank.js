// 랭크를 계산하는 함수


const router = require('express').Router();
const Service = require('../models/service');

const rank = (req, res) => {
    //votes수를 기준으로 정렬
    const result = Service.find({})
    .then(d => d.sort((a,b)=>{
        if (a.votes > b.votes) {
            return -1;
        } 

        if( a.votes < b.votes){
            return 1;
        }

        return 0;
    }))
    .then(e => {

    //득표수로 랭킹. 동점인 경우 차순위는 스킵없이 이어서                    
        const votes = e.map( d=> d.votes);
        let ranking = [1,0,0,0,0,0];
        for(let i=1; i<votes.length; i++){
            if(votes[i] === votes[i-1]){
                ranking[i] = ranking[i-1]
            } else {
                ranking[i] = ranking[i-1]+1
            }
        };
        // console.log(votes);
        // console.log(ranking);  


        for(let j=0; j<ranking.length; j++){
            e[j].rank = ranking[j];
           
        }
        return e;
    })
    .then(services=> {
    // res.json(e);
    res.render('services/ranking', {services});
    })
                                    
}

module.exports = {rank};

