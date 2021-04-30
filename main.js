alert("Welcome to Martial Arts Game!!!\n\nMake as much as possible kicks and punches in 10 seconds.\n\nControls of the game:\nPress right arrow key to move ahead.\nPress left arrow key to move back.\nPress 'w' to kick.\nPress 'p' to punch and\nPress arrow down key to block the attack. ")
let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");

let loadImage = (src, callback) =>{
   let img = document.createElement("img");
   img.onload = () => callback(img);
   img.src = src;
};
let img = document.createElement("img");

let imagePath = (frameNumber, animation) =>{
   return "images/" + animation + "/" + frameNumber + ".png"
};

let frames = {
   idle: [1, 2, 3, 4, 5, 6, 7, 8],
   kick: [1, 2, 3, 4, 5, 6, 7],
   punch: [1, 2, 3, 4, 5, 6, 7],
   forward: [1, 2, 3, 4, 5, 6],
   backward: [1, 2, 3, 4, 5, 6],
   block:[1, 2, 3, 4, 5, 6,7,8,9],
};

let loadImages= (callback) =>{
   let images = {idle: [], kick: [], punch:[], forward:[], backward:[],block:[]};
   let imagesToLoad = 0;
   //Callback with an array of loaded images
   ["idle", "kick", "punch","forward","backward","block"].forEach((animation) => {
      let animationFrames = frames[animation];
      animationFrames.forEach((frameNumber)=>{

         let path = imagePath(frameNumber, animation);

         loadImage(path, (image)=>{
           images[animation][frameNumber - 1] = image;
           imagesToLoad = imagesToLoad - 1;

           if (imagesToLoad === 0){
              callback(images);
           }

         });
      });
      imagesToLoad = imagesToLoad + animationFrames.length;

   });
};

let animate = (ctx, images, animation, callback)=>{
   if (animation == "forward")
   {
      images[animation].forEach((image, index)=>{
         setTimeout(()=>{
            ctx.clearRect(0, 0, 500, 500);
            ctx.drawImage(image, 0, 0, 450, 150);
         },index * 100);
         });
         setTimeout(callback, images[animation].length * 80);

   }

   else if (animation == "backward")
   {
   images[animation].forEach((image, index)=>{
   setTimeout(()=>{
      ctx.clearRect(0, 0, 500, 500);
      ctx.drawImage(image, 0, 0, 250, 150);
   },index * 100);
   });
   setTimeout(callback, images[animation].length * 80);
   }
   else if (animation == "idle")
   {
      images[animation].forEach((image, index)=>{
         setTimeout(()=>{
            ctx.clearRect(0, 0, 500, 500);
            ctx.drawImage(image, 0, 0, 350, 150);
         },index * 100);
         });
         setTimeout(callback, images[animation].length * 80);
   }
   else
   {
      images[animation].forEach((image, index)=>{
         setTimeout(()=>{
            ctx.clearRect(0, 0, 500, 500);
            ctx.drawImage(image, 0, 0, 350, 150);
         },index * 100);
         });
         setTimeout(callback, images[animation].length * 80);


   }

};
let quedAnimation = [];

loadImages((images) => {
   
   let aux = () => {
      let selectedAnimation;

      if (quedAnimation.length === 0)
      {
         selectedAnimation = "idle";
      } else{
         selectedAnimation = quedAnimation.shift();
      }
      animate(ctx, images, selectedAnimation,aux)
   };

 aux();




document.addEventListener('keyup', (event) => {
   const key = event.key;
   if (key == "ArrowLeft")
   {
      quedAnimation.push("backward");

   }
   else if(key == "ArrowRight"){
      quedAnimation.push("forward");

   }
   else if(key == "p"){
      quedAnimation.push("punch");


   }
   else if (key == "ArrowDown"){
      quedAnimation.push("block");
   }
   else if(key == "k"){
      quedAnimation.push("kick");

   }
 });
 ;})

let startGame = () =>{

   let kcount = 0;
   let pcount = 0;

   document.addEventListener('keyup', (event) => {

      const key = event.key;
      if (key == "ArrowLeft")
      {
         quedAnimation.push("backward");

      }
      else if(key == "ArrowRight"){
         quedAnimation.push("forward");

      }
      else if(key == "p"){
         quedAnimation.push("punch");
         pcount++;


      }
      else if (key == "ArrowDown"){
         quedAnimation.push("block");
      }
      else if(key == "k"){
         quedAnimation.push("kick");
         kcount++;

      }
    });




   var timeleft = 10;
   var downloadTimer = setInterval(function(){
   if(timeleft < 0){
    clearInterval(downloadTimer);
    alert("Game Over!!!\n" + "Score: " + "\nKicks: " + kcount + "\nPunches: " + pcount);
    window.location.reload();
  } else {
    document.getElementById("kcount").innerHTML = "Kicks: " + kcount;
    document.getElementById("pcount").innerHTML = "Punches: " + pcount;
    document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";

  }

  timeleft -= 1;

}, 1000)
};

let reloadGame = () =>{
   window.location.reload();
};
