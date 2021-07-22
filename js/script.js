class User {
    constructor(data){
      
        this.data = data;
    }
    edit(data) {
        for (let key in data) {
            if (this.data[key] != undefined) this.data[key] = data[key];
        }
    }

    get() {
        return this.data;
    }
}
const name = document.getElementById('user_name');
const city = document.getElementById('user_city');
const email = document.getElementById('user_email');
const phone = document.getElementById('user_phone');

class Contacts {
    constructor() {
                
        this.data = []
     
      }

    add(data) {
        if (data.id == undefined) data.id = 0;

        const user = new User(id, name.value, city.value, address.value, phone.value);

        let maxId = 0;
        this.data.forEach(note => {
            if (note.data.id != undefined) {
                if (maxId == undefined) maxId = +note.data.id;
                else if (maxId < +note.data.id) maxId = +note.data.id;
            }
        });

        maxId++;

        
      
        user.edit({id: maxId});
        this.data.push(user);     
     
    }

    edit(id, data) {
        let user = this.data.filter(user => {
            return +user.data.id == +id;
        });

        if (user.length == 0) return;

        user = user[0];
        user.edit(data);
    }

    remove(id) {
        this.data = this.data.filter(user => {
            return +user.data.id != +id;
        });
    }

    get() {
        return this.data;
    }
}
class ContactsApp extends Contacts {
    constructor() {
        super();
       

        this.init();
    }

    init() {
  

        let htmlContacts =   `
                                <div class="contacts">
                                <h1>Contacts Book</h1>
                                <div class= "contacts_form">

                                <form>
                                <div class="input">
                                <label for="user">Имя</label>
                                <input type="textarea" id= "user_name" placeholder="Alex" name="user"/>
                                </div>

                                <div class="input">
                                <label for="city">Город проживания</label>
                                <input type="textarea" id="user_city" placeholder = "Minsk" name="city"/>
                                </div>

                                <div class="input">
                                <label for="email">E-mail</label>
                                <input type="email" id= "user_email" placeholder="alex@gmail.com" name="email"/>
                                </div>

                                <div class="input">
                                <label for="phone">Телефон</label>
                                <input type="tel" id="user_phone" placeholder = "+37529 666-66-66" name="phone"/>
                                </div>
                                </form>
                                <span class="message"> Message here</span>
                                <button type= "submit" class = "btn_add">Add</button>

                                </div>        
                            </div>
                            <div class="contacts_list"></div>
                           `

        let contactform = document.querySelector('.contacts')
        contactform.innerHTML = htmlContacts

        function setMessage(status, message){
            let messageBox = document.querySelector('.message');
            if (status == "error"){
                messageBox.innerHTML = `${message}`;
                messageBox.classList.add('error');
                removeMessage(status, messageBox);
            }
            if(status == "success"){
                messageBox.innerHTML = `${message}`;
                messageBox.classList.add('success');
                removeMessage(status, messageBox);

            }
        }
        function removeMessage(status, messageBox){
            setTimeout(function(){
                messageBox.classList.remove(`${status}`);
            }, 2000);
        }

        let btnAdd = document.querySelector('.btn_add')
        btnAdd.addEventListener('click', user => {
            if (cheakInputFields(user)){
                setMessage("success", "Added successfully!");
                maxId++;
          
           
                  this.onAdd(user);
            }else{
                setMessage("error", "Field is ampty!");

            }      
        
        });
        }
        

    updateList() {
      

        this.data.forEach(user => {
            const userItem = document.createElement('div');
            userItem.classList.add('contacts__item');
            userItem.dataset.id =user.data.id;
           
                  

            userItem.innerHTML = `                                                                   
                                    <div class = "record-form">
                                    <span id ="labeling"> Имя: </span>
                                    <span id= "name_content"> ${user.data.name}</span>
                                </div>  
                                <div class = "record-form">
                                    <span id ="labeling"> Город проживани: </span>
                                    <span id= "name_content"> ${user.data.city}</span>
                                </div>  
                                <div class = "record-form">
                                    <span id ="labeling"> E-mail: </span>
                                    <span id= "name_content"> ${user.data.email}</span>
                                </div>  
                                <div class = "record-form">
                                    <span id ="labeling"> Телефон: </span>
                                    <span id= "name_content"> ${user.data.phone}</span>
                                </div>  
                                    <button type="button" id="btn_delete">
                                    <span>
                                    <i class= "fas fa-trash"> </i>
                                    </span>Delete
                                </button>`;

            
        let contactList = document.querySelector('.contacts_list')  ;
        this.userItem.appendChild(contactList);
           
        });
        let btnDelete = document.querySelector('.btn_delete')
        btnDelete.addEventListener('click', user => {
           
                  this.onDelete(user);
        
        });


      
    }

    onAdd(user) {

      function cheakInputFields(inputArr){
           if (inputArr[0].value === "" || inputArr[1].value === "" || inputArr[2].value === ""  ){
                    return false;
                }

            let phoneNo = /\+375\s?\(?[0-9]{2}\)?\s?-?\d{3}\s?-?\d{2}\s?-?\d{2}/;
            if(!inputArr[3].match(phoneNo)){
                    return false;
            }else{
                return true
            }
        }
           
        

    
        this.add({
            content: user.target.value
        })
       

        this.updateList();
        user.target.value = '';
    
    }
    onDelete(user){

        userItem = user.target.parentElement;
        contactList.removeChild(userItem)
    }

}

new ContactsApp();