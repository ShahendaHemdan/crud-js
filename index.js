let title=document.getElementById("title");
let price=document.getElementById("price");
let Tax=document.getElementById("Tax");
let total=document.getElementById("total");
let category=document.getElementById("category");
let count=document.getElementById("count") ;
let search=document.getElementById("search");
let submit=document.getElementById("submit");
let tmp;
let mood='create';
let searchMood='title';
function getTotal(){
    if(price.value!=""){
        let result=+price.value + +Tax.value;
        total.innerHTML=result;
        total.style.backgroundColor="green";
    }else{
        total.innerHTML="";
        total.style.backgroundColor="btn btn-success";
        total.style.border="none";
    }
}


let products;
    

        if(localStorage.getItem("products")==null){
            products=[];
        }else{
            products=JSON.parse(localStorage.getItem("products"));
        }
submit.addEventListener("click",function(){
    if(title.value!="" && price.value!="" && Tax.value!="" && category.value!="" ){
        let product={
            title:title.value,
            price:price.value,
            Tax:Tax.value,
            total:total.innerHTML,
            category:category.value,
            count:count.value,
        }
        if(mood=='create'){
        
        if(product.count>1){
            for(let i=0;i<product.count;i++){
                products.push(product);
            }
        }else{
            
            products.push(product);
        }
        }else{
            products[tmp]=product;
            mood='create';
            submit.innerHTML="Create";
            count.style.display="block";
        }
        localStorage.setItem("products",JSON.stringify(products));
        clearAll();
        showData()
    }else{
        alert("Please fill all the fields");
    }
})

function clearAll(){
    title.value="";
    price.value="";
    Tax.value="";
    total.innerHTML="";
    category.value="";
    count.value="";
}

showData()
function showData(){
getTotal();
    let table='';
    for(let i=0;i<products.length;i++){
    table+=`<tr>
                        <td>${i+1}</td>
                        <td>${products[i].title}</td>
                        <td>${products[i].price}</td>
                        <td>${products[i].Tax}</td>
                        <td>${products[i].total}</td>
                        <td>${products[i].category}</td>
                        <td><button onclick="update(${i})" class="btn btn-warning">Update</button></td>
                        <td><button onclick="Delete(${i})" class="btn btn-danger">Delete</button></td>
            </tr>`
    }
    document.getElementById("tbody").innerHTML=table;

    if(products.length>0){
        document.getElementById("deleteAll").innerHTML=`<button onclick="DeleteAll()"  class="btn btn-danger w-100 mb-3" >Delete All (${products.length})</button>`
    }else{
        document.getElementById("deleteAll").innerHTML="";
    }
}

function Delete(i){
products.splice(i,1);
localStorage.setItem("products",JSON.stringify(products));
showData()
}

function DeleteAll(){
    products.splice(0);
    localStorage.setItem("products",JSON.stringify(products));
    showData()
}


function update(i){
    title.value=products[i].title;
    price.value=products[i].price;
    Tax.value=products[i].Tax;
    category.value=products[i].category;
    submit.innerHTML="Update";
    getTotal();
    count.style.display="none";
    submit.innerHTML="Update";
    mood='update';
    tmp=i;
    scroll({
        top:0,
        behavior:"smooth"
    })
}


function getSearchMood(id){
    if(id=="searchTitle"){
        searchMood='title';

    }else{
        searchMood='category';
    }
    search.focus();
}

function searchProduct(value){
    let table='';
    for(let i=0;i<products.length;i++){

    if(searchMood=='title'){
            if(products[i].title.toLowerCase().includes(value.toLowerCase())){
                table+=`<tr>
                        <td>${i+1}</td>
                        <td>${products[i].title}</td>
                        <td>${products[i].price}</td>
                        <td>${products[i].Tax}</td>
                        <td>${products[i].total}</td>
                        <td>${products[i].category}</td>
                        <td><button onclick="update(${i})" class="btn btn-warning">Update</button></td>
                        <td><button onclick="Delete(${i})" class="btn btn-danger">Delete</button></td>
            </tr>`
            }
        
        
        


    }else{
            if(products[i].category.toLowerCase().includes(value.toLowerCase())){
                table+=`<tr>
                        <td>${i+1}</td>
                        <td>${products[i].title}</td>
                        <td>${products[i].price}</td>
                        <td>${products[i].Tax}</td>
                        <td>${products[i].total}</td>
                        <td>${products[i].category}</td>
                        <td><button onclick="update(${i})" class="btn btn-warning">Update</button></td>
                        <td><button onclick="Delete(${i})" class="btn btn-danger">Delete</button></td>
            </tr>`
            }
        
        
        
        }
        
    }
    document.getElementById("tbody").innerHTML=table;
}