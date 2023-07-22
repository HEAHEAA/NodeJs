
//첫 서버를 열수있는 정해진 코드
const express = require('express');
const app = express();

app.listen(8080, function(){
    console.log('listening on 8080')
});


//1. 누군가가 /pet 으로 방문하면 pet 관련된 안내문을 띄우기 (GET)
app.get('/pet', function(req,res){
    res.send('펫용품 쇼핑할 수 있는 페이지 입니다.');
});

//2. 숙제 : /beauty url로 접속하면 안내문("뷰티용품페이지임") 띄우기 
app.get('/beauty', function(req,res){
    res.send("뷰티용품페이지임");
});

//html get 파일 날리기
app.get('/' , function(req,res){
    res.sendFile(__dirname + '/Page/index.html');
});

//write get 페이지
app.get('/write', function(req,res){
    res.sendFile(__dirname + '/Page/write.html');
});








