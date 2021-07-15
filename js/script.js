class User {
    constructor(data){
        
        this.id = data.id,
        this.name= data.name,
        this.adress= data.adress,
        this.phone= data.phone,
        this.email= data.email

    };
        
    set infoUser (data) {

        this.id = data.id,
        this.name= data.name,
        this.adress= data.adress,
        this.phone= data.phone,
        this.email= data.email
    }
    get infoUser() {
        return `${this.id}  ${this.name} ${this.adress} ${this.phone} ${this.email}`
    }

    //edit(id, obj) {innerHTML = }
}

/*class Contacts extends User{
    let dataArr = [];

    for(key in data)

    dataArr.push(data)
    dataArr[key]=data

    constructor(data){
        super(data);

        d   


    /*add(){

    }

    edit(id, obj){

    }

    remove(id){

    }

    get(){

    }*/

}

}

class ContactsApp extends Contacts{

}
let alex = new User({id:1,name: 'Alex', adress: 'Minsk', phone: '+375-29-666-66-66', email:'alex@gmail.com' })
console.log(alex.infoUser)
console.log(dataArr)
