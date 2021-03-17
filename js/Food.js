class Food {
    constructor() {
        this.foodStock = 0;
        this.image=loadImage('images/Milk.png');
    }

    updateFoodStock(foodStock){
        database.ref('/').update({
            food : foodStock
        })
    }

    deductFood(){
        if(this.foodStock >= 1){
         this.foodStock = this.foodStock - 1;
        }
    }

    getFoodStock(){
        database.ref('food').on("value", (data) => {
            this.foodStock = data.val(); 
        })

        return this.foodStock;
    }
  
    display(){
        var x=80,y=70;
        
        imageMode(CENTER);
     
        
        if(this.foodStock!=0){
          for(var i=0;i<this.foodStock;i++){
            if(i%20==0){
              x=60;
              y=y+50;
            }
            image(this.image,x,y,50,50);
            x=x+30;
            }
        }
    }
}
