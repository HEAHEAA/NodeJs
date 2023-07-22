//첫 서버를 열수있는 정해진 코드
const express = require('express');
const app = express();

//post 보낸 데이터 확인하는 라이브러리
app.use(express.urlencoded({extended: true})) 
// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({extended : true}));


app.listen(8080, function(){
    console.log('listening on 8080')
});


//1. 누군가가 /pet 으로 방문하면 pet 관련된 안내문을 띄우기 (GET)
app.get('/pet', (req,res) => {
    res.send('펫용품 쇼핑할 수 있는 페이지 입니다.');
});

//2. 숙제 : /beauty url로 접속하면 안내문("뷰티용품페이지임") 띄우기 
app.get('/beauty', (req,res) => {
    res.send("뷰티용품페이지임");
});

//html get 파일 날리기
app.get('/' , (req,res) => {
    res.sendFile(__dirname + '/Page/index.html');
});

//write get 페이지
app.get('/write', (req,res) => {
    res.sendFile(__dirname + '/Page/write.html');
});


//post 보내기
// 어떤 사람이 /add 로 post요청을 하면.. ??을 해주세용~~
app.post('/add', (req,res) => {
    res.send('전송완료')
    console.log(req.body);
    //db에 저장해주세용
    
});










