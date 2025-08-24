const express = require('express');
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/order');

app.use('/api/auth',authRoutes);
app.use('/api/order',orderRoutes);













































/*const express = require('express');
const app = express();
app.listen(5000,()=>console.log('server is running at port 5000'));

app.get('/test',(req,res) => res.send('Hello World'));
//app.use(express.json());

//app.post('/api/test',(req,res) => {console.log(req.body);
//res.json({message:'Data received',data:req.body});
//});


const db = require('./config/db');

app.get('/orders',async(requestAnimationFrame,res) => {
  const [rows]= await db.query('select * from users');
  res.json(rows);
});*\