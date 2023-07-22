//첫 서버를 열수있는 정해진 코드
const express = require('express');
const app = express();

//post 보낸 데이터 확인하는 라이브러리
app.use(express.urlencoded({extended: true})) 
// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({extended : true}));

//mongodb연결
var db;
const MongoClient = require('mongodb').MongoClient;

//ejs 라이브러리 사용하기
app.set('view engine', 'ejs');


MongoClient.connect("mongodb+srv://kimjihee1113:4IEHuLQav3FsGAch@kimjihee.s5gra3y.mongodb.net/?retryWrites=true&w=majority", function(에러,client){
    //연결되면 할일
    if(에러) return console.log(에러)

    //todoapp 이라는 database에 넣을거다~~
    db = client.db('todoapp');

    //임시용으로 데이터 저장해보기
    db.collection('post').insertOne({이름: 'John', _id : 100}, function(에러,결과){
        console.log('저장완료');
    });

    app.listen(8080, function(){
        console.log('listening on 8080')
    });

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
// 어떤 사람이 /add 로 post요청을 하면.. ??을 해주세용~~


//1. 숙제 어떤사람이 /add 라는 결로로 post요청을하면 데이터 2개가 오는데 ,
// 이때 post라는 이름을 가진 collection 저장하기
app.post('/add', (req,res) => {
    res.send('전송완료')
    console.log(req.body);
    db.collection('post').insertOne({title: req.body.title , date: req.body.date}, function(에러,결과){
        console.log('데이터 저장완료!!!');
    });    
});


// ??가 get으로 접속하면 html을 보여줌 실제 db에 저장된 데이터를 !
app.get('/list', function(req,res){
    
    // post에 저장된 모든 데이터가 가져와짐.
    db.collection('post').find().toArray(function(에러,결과){
        console.log(결과);
        res.render('list.ejs', {posts : 결과});
    });
    //디비에 저장된 post라는 collection안에 제목이 ??인 데이터를 꺼내주세요.


});




















