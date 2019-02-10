var court=document.getElementById('court');
var paddle=document.getElementById('paddle');
var ball=document.getElementById('ball');
var paddletop=paddle.getBoundingClientRect().top;
var courttop=court.getBoundingClientRect().top;
var courtbottom=court.getBoundingClientRect().bottom;
var balltop=ball.getBoundingClientRect().top;
var max=0;
var v=20;
function setSpeed(speed) {
  if (speed==0) {
    v=20;
  }
  else if (speed==1) {
    v=30;
  }
  else if (speed==2) {
    v=40;
  }
};
function startGame(){
function getRandom(min, max) {
  return Math.random() * (max - min) + min;
};
function getAngle() {
  var numbers = new Array('1','2');
  if(numbers[Math.floor(Math.random()*numbers.length)]==1){
    return getRandom(1,45);
  };
  if(numbers[Math.floor(Math.random()*numbers.length)]==2)
  {
    return getRandom(315,359);
  };
};
  // ball.style.top='100px';
  // var ballpos=parseFloat(ball.style.top);
  // var ballpos=getRandomInt(390);
  var angle=getAngle();
  var score=0;
  var newy=getRandom(20,390);
  var newx=0;
  var dt=0.1;
  var courtborderwidth=getComputedStyle(court,null).getPropertyValue('border-left-width');
  courtborderwidth=parseFloat(courtborderwidth);
  var courtwidth=court.offsetWidth;
  var courtheight=court.offsetHeight;
  var ballheight=ball.offsetHeight;
  var paddleheight=paddle.offsetHeight;
  var dx=v*Math.cos(Math.PI*angle/180)*dt;
  var dy=v*Math.sin(Math.PI*angle/180)*dt;
  var interval=setInterval(moveball,0.8);
  function moveball() {
    if(ball.offsetTop>court.offsetTop+courtheight-ballheight||ball.offsetTop<court.offsetTop+courtborderwidth){
      dy=-dy;
    }
    if (ball.offsetLeft<court.offsetLeft+courtborderwidth) {
      dx=-dx;
    }
    if (ball.offsetLeft+ballheight>paddle.offsetLeft&&ball.offsetTop>paddle.offsetTop&&ball.offsetTop<paddle.offsetTop+paddleheight) {
      dx=-dx;
      score=score+1;
      if (score>max) {
        document.getElementById('messages').innerHTML="New High Score";

      };
      document.getElementById('strikes').innerHTML=score;
    }
    if(ball.offsetLeft+ballheight>paddle.offsetLeft&&(ball.offsetTop<paddle.offsetTop||ball.offsetTop>paddle.offsetTop+paddleheight)){
      newy=0;
      newx=0;
      ball.style.top=newy+'px';
      ball.style.left=newx+'px';
      if (score>=max) {
        max=score;
      }
      else {
        max=max;
      }
      document.getElementById('score').innerHTML=max;
      score=0;
      document.getElementById('strikes').innerHTML=0;
      // document.getElementById("start").removeEventListener("click", startGame,false);
      document.getElementById('messages').innerHTML="";
      clearInterval(interval);
      return;
    }
    newx=newx+dx;
    newy=newy+dy;
    var pointy=newy+'px';
    var pointx=newx+'px';
    ball.style.top=pointy;
    ball.style.left=pointx;
    // console.log(court.getBoundingClientRect().bottom);
    // console.log(parseFloat(ball.style.top));

  };

};
function movePaddle(event) {
  var x= event.pageX;
  var y=event.pageY;
  if(y<paddletop){
    paddle.style.top=0;
  }
  if(y>=paddletop){
    var pos=y-paddletop;
    paddle.style.top=pos+'px';
    var paddlebottom=paddle.getBoundingClientRect().bottom;
    if(paddlebottom>courtbottom-3){
      var lpos=courtbottom-courttop-102-3;
      paddle.style.top=lpos+'px';
    }
  }
  // console.log(paddle.offsetTop-court.offsetTop-3);
};
function resetGame() {
window.location.reload(true);
};
