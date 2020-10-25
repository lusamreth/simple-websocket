
//let next_obj = {
    //count : 3,
    //elements : 
//};
class Navigator {
    constructor(){
        this.prefix;
        this.flag = 0;
    }
    justifyPrefix(){
        let if_next = document.getElementsByClassName("next").length == 1;
        let if_back = document.getElementsByClassName("back").length == 1;
        console.log(if_next,if_back);
        if ( if_next && if_back){
           //middle 
            this.flag = 999;
        }else if(if_next){
            // back
            this.flag = 0;
        }else {
            //front
            this.flag= 1;
        }
        switch(this.flag){
            case 0 :
                this.prefix = "next"
                break;
            case 1 :
                this.prefix = "back"
                break;
            default :
                this.prefix = "back,next"
                break;
        }
        console.log(this.flag);
    }
    loadElement(){
        this.justifyPrefix();
        let pre = this.prefix.split(",");
        let count = pre.length;
        console.log(pre);
        for(let i=0;i<count;i++){
            let e = document.getElementById(`${pre[i]}-${count}`);
            let attr = `${pre[i]}-location`;
            console.log(e);
            console.log(e.getAttribute(attr));
            e.addEventListener("click",() => {
                window.location = e.getAttribute(attr);
            })
        }
    }
}

// flags number!
// 0 mean frontest page
// 1 mean backest page
// 2 or more mean middle page
const navigator = new Navigator();
navigator.loadElement();

