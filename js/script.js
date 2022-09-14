
const loadPhones = async (searchText , dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url)
    const data = await res.json()
    displayPhones(data.data , dataLimit)
}

const displayPhones = (phones ,dataLimit) => {
    const phonesContainer = document.getElementById('phone-container')
    phonesContainer.textContent = '';
    // display 10 phones only 
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0,10);
        showAll.classList.remove('d-none');
    } else {
        showAll.classList.add('d-none');
    }
    
    // no phones found warning message 
    const noPhone =document.getElementById('noPhone')
    if (phones.length === 0 ) {
        noPhone.classList.remove('d-none')
    } else {
        noPhone.classList.add('d-none')
    }
    phones.forEach(phone =>{
        const phonesDiv = document.createElement('div')
        phonesDiv.classList.add('col')
        phonesDiv.innerHTML=`
        <div class="card p-1">
            <img src="${phone.image}" class="card-img-top center" alt="'${phone.image}'" />
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">
                    This is a ${phone.phone_name}.This phone cost worth of your two kidney. This phone model is ${phone.slug} .
                </p>
                <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
            </div>
        </div>
        `
        phonesContainer.appendChild(phonesDiv)
    })
    // loader end 
    spinnerLoad(false);
}


document.getElementById('buttonId').addEventListener('click', function(){
    // spinner start 
    processSearch(10);
})

document.getElementById('inputId').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processSearch(10);
    }
});

const spinnerLoad = isLoading => {
    const spin = document.getElementById('loader');
    if(isLoading){
        spin.classList.remove('d-none')
    }
    else{
        spin.classList.add('d-none')
    }
}

const processSearch = (dataLimit) =>{
    spinnerLoad(true);
    const inputField = document.getElementById('inputId');
    const searchText = inputField.value;
    console.log(searchText)
    loadPhones(searchText , dataLimit);
}

const showAllButton = document.getElementById('show-all-button');
showAllButton.addEventListener('click' , function(){
    processSearch();
})

// phone details load function 

const loadPhoneDetails = async id =>{
    const url =`https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhonesDetails(data.data);
}

const displayPhonesDetails = phone =>{
    console.log(phone);
    const modalTitle = document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    console.log(phone.mainFeatures.sensors[0]);
    phoneDetails.innerHTML = `
    <img src="${phone.image}" alt="">
        <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No Release Date Found'}</p>
        <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'No Storage Information '}</p>
        <p>Others: ${phone.others ? phone.others.Bluetooth : 'No Bluetooth Information'}</p>
        <p>Sensor: ${phone.mainFeatures.sensors ? phone.mainFeatures.sensors[0] : 'no sensor'}</p>
    `
}


loadPhones('apple');