let c = document.getElementsByTagName("canvas")[0];
let gtx = c.getContext("2d");
"image/idle.png"
let loadImg=(sr,callback)=>{
    let img = new Image()
    img.src=sr
    img.onload=()=>callback(img)
}
let imgpath=(num,animation)=>{
    return "image/"+animation+"/"+ num+".png"
}
let frame={idle:8,kick:7,punch:7,block:9,forward:6,backward:6}
let loadImgs=(callback)=>{
    let images={idle:[],punch:[],kick:[],block:[],forward:[],backward:[]};
    let imagesToLoad=0
    let animationtype=["idle","kick","punch","backward","block","forward"]
    animationtype.forEach((ani)=>{
        let animationframe=frame[ani]
        imagesToLoad+=animationframe
        for (let index = 1; index < animationframe+1; index++) {
            let path =imgpath(index,ani)
            loadImg(path,(image)=>{
                images[ani][index-1]=image
                imagesToLoad--
                if(imagesToLoad==0){
                    callback(images)
                }
            })
        }
    })
}
let animate=(gtx,images,ani,callback)=>{
    images[ani].forEach((image,index) => {
        setTimeout(()=>{
            gtx.clearRect(0,0,300,150)
            gtx.drawImage(image,0,0,300,150)
        },index*100)
    });
    setTimeout(callback,images[ani].length*100)
}

loadImgs((images)=>{
    let queuedanimation=[]
    let aux=()=>{
        let selectedanimation=0 ;
        if(queuedanimation.length===0){
            selectedanimation="idle"
        }else{
            selectedanimation=queuedanimation.shift()
        }
        animate(gtx,images,selectedanimation,aux)
    }
    aux()

    // document.getElementById("kick").onclick=()=>{
    //     queuedanimation.push("kick")
    // }
    // document.getElementById("punch").onclick=()=>{
    //     queuedanimation.push("punch")
    // }
    document.addEventListener("keyup",(eve)=>{
        let key=eve.key
        if(key=="s"){
            queuedanimation.push("kick")
        }else if(key=="d"){
            queuedanimation.push("punch")
        }else if(key=="ArrowRight"){
            queuedanimation.push("forward")
        }else if(key=="ArrowLeft"){
            queuedanimation.push("backward")
        }else if(key=="a"){
            queuedanimation.push("block")
        }
    })


})