const express = require('express')
const app = express()
app.use(express.urlencoded({extended: true})) 

//미들웨어 설정
app.set('/Result/public', express.static('public'));



//mongodb연결
var db;
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb+srv://kimjihee:qwer1234@kimjihee.s5gra3y.mongodb.net/?retryWrites=true&w=majority', function(error,client){
   if(error) return console.log(error);

   //todoapp 이라는 database에 넣을거다~~
   db = client.db('todoapp');

   app.listen(8080, function() {
    console.log('listening on 8080')
    });
})


app.get('/', (req,res) => {
    db.collection('post').find().toArray(function(err,result){
        res.render('list.ejs', {posts : result});
    });
});

app.get('/write',(req,res) => {
    res.render('write.ejs');
});

app.post('/read', (req,res) => {
    res.send('전송완료');

    db.collection('counter').findOne({name: "게시물갯수"}, function(error,dbres){
        var 총게시물갯수 = dbres.totalPost;

        db.collection('post').insertOne({_id: 총게시물갯수 + 1, title:req.body.title, date:req.body.date},
            function(posterror,postres){
                console.log('데이터 저장완료');

                db.collection('counter').updateOne({name: '게시물갯수'},{$inc : {totalPost:1}},function(e,r){
                });
            });
    });
});




app.delete('/delete', function(req,res){
    console.log(req.body);
    req.body._id = parseInt(req.body._id);


    //게시물id 값을 찾아서 삭제할거임
    db.collection('post').deleteOne(req.body, function(error,result){
        console.log("삭제완료");

        if(res.status(200)){
            res.status(200).send({ message: '성공' });
        }
        if(res.status(500)){
            res.status(500).send({ message: '서버문제' });
        }
        
    })
})


//get요청 url에 파라미터 넣어주기 ( :id )
app.get('/detail/:id', function(req,res){

    //db에서 사용자가 요청한 id를 가져온다.
    db.collection('post').findOne({_id: parseInt(req.params.id)},function(err,result){
        console.log(result);

        //결과는 result기 때문에 하나씩 출력이 가능하다.
        res.render('detail.ejs', { data : result})
    });

})


