 const account1={
    owner:'Okpara Helen',
    movements:[200,400,5780,-340,-230,100,850],
    interestRate:0.8,
    pin:1111,

 }


const account2={
    owner:'Onyekachi Gabriel ',
    movements:[6600,4000,4780,-360,-630,100,900],
    interestRate:0.8,
    pin:2222,
}

const account3={
    owner:'Ebube Henry',
    movements:[500,900,5680,-450,-200,1000,850],
    interestRate:0.8,
    pin:3333,
}

const account4={
    owner:'Onyemachi Gospel H',
    movements:[2670,-600,-4000,-2300,560],
    interestRate:0.8,
    pin:4444,
}

const account5={
    owner:'Okoro Chinwendu',
    movements:[300,4560,-800,2950,1000,2780],
    interestRate:0.8,
    pin:5555,
}

var accounts=[account1,account2,account3,account4,account5];

// console.log(accounts)
//headsection of the wrk
const main_transfer=document.querySelector('.main_transfer');
const transction_section=document.querySelector('.transction_section');
const nav_bar=document.querySelector('.nav_bar');
const userNamelable=document.querySelector('.userNamelable');
const input_userName=document.querySelector('#input_userName');
const input_Pin=document.querySelector('#input_Pin');
const login_button=document.querySelector('#login_button');

//balance of the client
const currentBal_dollars=document.querySelector('#currentBal_dollars');

//transctions on the leftside of the wrk
const transactions=document.querySelector('.account_history');

//transfer section of the wrk
const transfer_to=document.querySelector('#transfer_to');
const amount=document.querySelector('#amount');
const withdraw_funds=document.querySelector('#withdrawal_column'); 
const sndbtn=document.querySelector('.button');
const button_deposit=document.querySelector('#button_deposit');
const withdrawal_input=document.querySelector('#withdrawal_input');
const button_credit=document.querySelector('.button_credit');
const outgoing=document.querySelector('.outgoing')



//create username ie.1st step
function createusername(acc){
    acc.forEach((acc)=>{
        const username = acc.owner.split(' ').map(name=>name[0]).join('').toLowerCase();
        acc.username = username;
        // console.log(username);
    })
}
// calling the function above 
createusername(accounts);


var owner ;
var username;

// General function attached to the login button
login_button.addEventListener('click', function(){
    const  accou = findUsers(input_userName.value);
    if(accou){
        // console.log(accou)
        if(accou.pin === +input_Pin.value){
        main_transfer.style.display='block';
        transfer_to.value=""
        amount.value=""
        withdrawal_input.value=""
        input_userName.value=""
        input_Pin.value=""
            owner= accou;
            username=accou.owner;
            userNamelable.innerHTML=username

        dspTransactions(accou.movements);

        calculateBal(accou.movements);
        
        movedMoni(accou.movements)
        loggedinUsers(accou.movements)
}else{
            console.log('incorrect pin or username')

        }

    }else{
        // main_transfer.style.display='none'
        console.log('username not found')
    }
})

   


//evntListener for transfer button
 
sndbtn.addEventListener('click', function(){
    const trfAmount = Number(amount.value)
    const reciver = findUser(transfer_to.value.toLowerCase())
    transferToUser(owner.movements,reciver,trfAmount)
   dspTransactions(owner.movements);
   calculateBal(owner.movements)
   movedMoni(owner.movements)
   localStr(owner.movements) 
   loggedinUsers(owner.movements)
})
// find user account
function findUsers(users){
    const a =accounts.find((user)=>{
         return user.username==users
     })
     return a
 }
// find user account
function findUser(users){
   const a =accounts.find((user)=>{
        return user.username==users
    })
    return a.movements

}
// display transactions
 function dspTransactions(mov){
    transactions.innerHTML="";
    mov.forEach((movs,i)=>{
       const type = movs>0?'deposit':'withdraw';
       const html = `<div id="expenditure"> <p class="type ${type}">${i+1} ${type}</p>      
    <span>$${movs}</span>
   </div>`;
   

    transactions.insertAdjacentHTML('afterbegin',html)
    // console.log(type,i)
    })
 }


//function that will calculate the current bal of a client

function calculateBal(mov) {
    const totalBalance=mov.reduce((a,b)=>a+b);
    // console.log(totalBalance)
    currentBal_dollars.innerHTML='$'+totalBalance;
    // localStr(owner.movements) 
}
  
 // function to track outgoing withdrawal
function withdraw(mov) {
    
    const withdrawval= Number(withdrawal_input.value);
     mov.push(-withdrawval);
     calculateBal(owner.movements);
    //  localStr(owner.movements) 
    return mov
 }
//  console.log(account1.movements);
// function to calculate the total withdraw
function movedMoni(out){
        const el = out.filter((x)=>x<0).reduce((x,y)=>x+y);
        // console.log(el) 
         outgoing.innerHTML = `$ ${Math.abs(el)}`;    
}

// movedMoni(accounts)

// eventListener for the withdraw button
 button_deposit.addEventListener('click', function(){
  var withdrawal=withdraw(owner.movements)
    dspTransactions(withdrawal);
    movedMoni(owner.movements);
    // localStr(owner.movements) 

})

function transferToUser(owner,reciverAccount,amount){

    owner.push(-amount);
      reciverAccount.push(amount);
    //   localStr(owner.movements) 
     
  }

 

// display transactions
function dspTransactions(mov){
    transactions.innerHTML="";
    mov.forEach((movs,i)=>{
       const type = movs>0?'deposit':'withdraw';
       const html = `<div id="expenditure"> <p class="type ${type}">${i+1} ${type}</p>      
    <span>$${movs}</span>
   </div>`;

    transactions.insertAdjacentHTML('afterbegin',html)
    // console.log(type,i)
    })
   
 }

//localstorage
 function localStr() {
    const convert=JSON.stringify(account1)
 localStorage.setItem('data',convert);
 const newObj=JSON.parse(localStorage.getItem('data'))
console.log(newObj);

}
localStr()

function loggedinUsers() {
    transferToUser(owner.movements,reciver,trfAmount)
   dspTransactions(owner.movements);
   calculateBal(owner.movements)
   movedMoni(owner.movements)
   localStr(owner.movements) 
}
// loggedinUsers()
 
 


