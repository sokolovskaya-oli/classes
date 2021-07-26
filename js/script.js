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
 
class Contacts {
    constructor() {
                
        this.data = []
     
      }

    add(data) {
       
        if (data.id == undefined) data.id = 0;

        const user = new User(data);
        let maxId = 0;

        this.data.forEach(user => {
            if (user.data.id != undefined) {
                if (maxId == undefined) maxId = +user.data.id;
                else if (maxId < +user.data.id) maxId = +user.data.id;
            }
        });

        maxId++;
      
        user.edit({id: maxId});
        this.data.push(user);  
        localStorage.setItem('user',JSON.stringify(this.data))   

       // let localUser = localStorage.getItem('this.data')
        //if (localUser.length == null) this.data=JSON.parse(localUser)
     
    }

    edit(id, data) {
        let user = this.data.filter(user => {
            return +user.data.id == +id;
        });

        if (user.length == 0) return;

        user = user[0];
        user.edit(data);
        localStorage.setItem('user',JSON.stringify(this.data)) 
       
    }

    remove(id) {
        this.data = this.data.filter(user => {
            return +user.data.id != +id;
        });
        localStorage.removeItem('user',JSON.stringify(this.data))    
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
    /* getData(){
        ( async function () {
                    
         let getting = await fetch('https://jsonplaceholder.typicode.com/users', {
             method: 'GET',
             body: JSON.stringify(user)
         });
         if  (!getting.ok) return;
        });
        this.add(this.data)
    }*/



    init() {
        const contactsApp= document.createElement('div');
        contactsApp.classList.add('contacts');
        document.body.appendChild(contactsApp);

        const h3 = document.createElement('h3');
        h3.innerHTML = 'Contacts Book';
        contactsApp.appendChild(h3);


        const contactsForm = document.createElement('div');
        contactsForm.classList.add('contacts__form');
        contactsApp.appendChild(contactsForm);

        this.contactsList = document.createElement('div');
        this.contactsList.classList.add('contacts__list');
        contactsApp.appendChild(this.contactsList);

        this.contactName = document.createElement('input');
        this.contactName.setAttribute('type', 'textarea');
        this.contactName.setAttribute('name', 'Имя');
        this.contactName.setAttribute('placeholder', 'Alex');
        contactsForm.appendChild(this.contactName);

        this.contactCity = document.createElement('input');
        this.contactCity.setAttribute('type', 'textarea');
        this.contactCity.setAttribute('name', 'Город проживания');
        this.contactCity.setAttribute('placeholder', 'Minsk');
        contactsForm.appendChild(this.contactCity);

        this.contactEmail = document.createElement('input');
        this.contactEmail.setAttribute('type', 'email');
        this.contactEmail.setAttribute('name', 'E-mail');
        this.contactEmail.setAttribute('placeholder', 'alex@gmail.com');
        contactsForm.appendChild(this.contactEmail);

        this.contactPhone = document.createElement('input');
        this.contactPhone.setAttribute('type', 'tel');
        this.contactPhone.setAttribute('name', 'Телефон');
        this.contactPhone.setAttribute('placeholder', '+37529 666-66-66');
        contactsForm.appendChild(this.contactPhone);


        const contactsBtnAdd = document.createElement('button');
        contactsBtnAdd.setAttribute('class', 'btn_add');
        contactsBtnAdd.innerHTML = 'Add';
        contactsForm.appendChild(contactsBtnAdd);

        contactsBtnAdd.addEventListener('click', event =>{
            this.onAdd(event);
        })
    }

    updateList() {
        this.contactsList.innerHTML = '';

        this.data.forEach(user => {
            const contact = document.createElement('div');
            contact.classList.add('contact_item');

            const contactH3 = document.createElement('h3')
            contactH3.innerHTML = user.data.name || '';

           const contactSpan = document.createElement('span');
           contactSpan.innerHTML = user.data.city + '<br>' + user.data.email + '<br>' + user.data.phone +'<br>';
            
           contact.dataset.id = user.data.id;

            const contactEdit = document.createElement('button');
            contactEdit.innerHTML = 'Edit';
            
            const contactRemove = document.createElement('button');
            contactRemove.innerHTML = 'Delete';


            contact.appendChild(contactH3);
            contact.appendChild(contactSpan);
            contact.appendChild(contactEdit);
            contact.appendChild(contactRemove);

            this.contactsList.appendChild(contact);

            contactRemove.addEventListener('click', event =>{
                this.onRemove(event);
                
            });
            contactEdit.addEventListener('click', event =>{
                this.onEdit(event);
            });

        });
    }

    onAdd(event) {

        if (event.type !='click') return;

        if (this.contactName.value.length == 0 || 
            this.contactCity.value.length == 0 ||
            this.contactEmail.value.length == 0 ||
            this.contactPhone.value.length == 0) return;

            let phoneNo = /\+375\s?\(?[0-9]{2}\)?\s?-?\d{3}\s?-?\d{2}\s?-?\d{2}/,
                emailNo = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;


        const data ={
            name: (this.contactName && this.contactName.value.length > 0) ? this.contactName.value : '',
            city: (this.contactCity && this.contactCity.value.length > 0) ? this.contactCity.value : '',
            email: (this.contactEmail.value.match(emailNo)) ? this.contactEmail.value : alert ('Введите верно электронную почту'),
            phone: (this.contactPhone.value.match(phoneNo)) ? this.contactPhone.value : alert ('Введите верно телефон')
                    
          
         };

        if (!this.contactName.dataset.action || !this.contactName.dataset.id){
        this.add(data)
    } else {
        this.edit(this.contactName.dataset.id, data);
        this.contactName.dataset.action = '';
        this.contactName.dataset.id = '';
    }

        this.updateList();
        this.contactName.value = '';
        this.contactCity.value = '';
        this.contactEmail.value = '';
        this.contactPhone.value = '';

      
    }
    

    onRemove(event){
        const parent = event.target.closest('.contact_item');
        const id = parent.dataset.id; //забираем индификатор через родителя
    
        if (!id) return;

    this.remove(id);
    this.updateList();
}
    onEdit(event){
        //взять заметки и отобразить их в тайтл и тексариа
        const parent = event.target.closest('.contact_item');
            const id = parent.dataset.id; 
             
            if (!id) return;
    //файнд возвращает отдельный элемент, который мы нашли
            const user = this.data.find(user =>{
                return user.data.id == id;
            });
    //помещаем значение в поле инпута
            this.contactName.value = user.data.name;
            this.contactCity.value = user.data.city;
            this.contactEmail.value = user.data.email;
            this.contactPhone.value = user.data.phone;


            this.contactName.dataset.action = 'edit';
            this.contactName.dataset.id = id;

}

}

  
new ContactsApp();