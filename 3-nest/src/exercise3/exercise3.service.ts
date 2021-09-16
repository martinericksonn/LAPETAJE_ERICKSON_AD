import { Injectable } from '@nestjs/common';
import { Car } from './car.model';
import { HTML } from './html.helper';

@Injectable()
export class Exercise3Service {
    private cars: Map<string,Car> = new Map<string,Car>();
    private cars2:Array<{}> = [{
        "id":"431",
        "model":"Ferrari",
        "color":"Black",
        "wheels": {
          "name": "Pirelli",
          "radius":16
        }	
      },{
        "id":"123456",
        "model":"Montero",
        "color":"Red",
        "wheels": {
          "name": "Goodyear",
          "radius":18
        }	
      }
    ];
    searchCar(){
        for(const car of this.cars2){
          if(car['id']==="JOSH420"){
            return car;
          }
        }
      }
    getCar(id:string){
     // console.log(this.cars.get(id));
      return this.cars.get(id).toJson();
    }
      
      
        loopsTriangle(height: number) {
          var html: HTML = new HTML(); 
          for (var i = 1; i <= height; i++) {
            
            var string = ''; 
            var j = i;
            while (j) {
              string += '*';
              j--;
            }
            html.add(html.div([string]));
            console.log(string);
          }
          return html.renderScreenHTML();
        }
      
        addCar(car:any){
           var newCar: Car; 
           newCar = new Car(car?.model, car?.color, {name: car?.wheels.name, radius:car.wheels.radius});
           this.cars.set(car.id, newCar);
           this.logAllCars();
        }
      
        deleteCar(id:string){
          if(this.cars.has(id))
          this.cars.delete(id);
          else console.log(id+" does not exist in database!");
        }
      
        replaceCar(id:string, car:any){
          var newCar: Car; 
          newCar = new Car(car?.model, car?.color, {name: car?.wheels.name, radius:car.wheels.radius});
          this.cars.set(id, newCar);
          this.logAllCars();
        }
      
        addJoshCar2(){
          var joshuaCar: Car; 
          joshuaCar = new Car("Montero", "Blue", {name: "Goodyear", radius:18});
          this.cars.set("joshua", joshuaCar);
          this.logAllCars();
       }
      
        logAllCars(){
         for(const [key,car] of this.cars.entries()){
           console.log(key);
           car.log();
         }
        }
      
        
    loopTriangle(height: number):string{
        var string = "LoopsTriangle <br/><br/>";
        
        for (var i = 1; i <= height; i++) 
            for (var j = 0; j < i; j++) 
                string += "*";           
            string += '<br/>';
        
        console.log(string);
        return string; 
    }

    hello(someWords: string):string{
        return "Hello There! " + someWords;
    }

    prime(numberToCheck: number):string{
        var isPrime = numberToCheck > 1 ? true : false;
        for (var i = 2; i < numberToCheck; i++) 
            if (numberToCheck % i == 0 ) {
                isPrime = false;
                break;
            }   

        return `The number <b>${numberToCheck}</b> ${isPrime ? "is a Prime Number" :  "is NOT a Prime Number"}`;
    }
}
