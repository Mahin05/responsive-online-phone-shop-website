// no phone found result error getting
document.getElementById('results-error').style.display = 'none';

// spinner
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
const toggleSearchResult = displayStyle => {
    document.getElementById('search-result').style.display = displayStyle;
}

// phone search load
const searchPhone = () => {
    document.getElementById('results-error').style.display = 'none';
    const search = document.getElementById('search-field');
    const searchText = search.value;
    search.value = '';
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';
    // display spinner
    toggleSpinner('block');
    toggleSearchResult('none');
    if (searchText === '') {
        // displayError();
        document.getElementById('results-error').style.display = 'block';
        toggleSpinner('none');
        const phoneDetails = document.getElementById('phone-details');
        phoneDetails.textContent = '';
    }
    // console.log(searchText);
    else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchOutput(data.data))
    }
}

// searched result
const displaySearchOutput = datas => {
    console.log(datas);
    const searchLimit = datas.slice(0, 20);
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    if (!searchLimit) {
        document.getElementById('results-error').style.display = 'block';
        toggleSpinner('none');
    }
    searchLimit?.forEach(data => {
        // console.log(data.slice());
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card">
            <img src="${data.image}" class="card-img-top mt-2 rounded mx-auto" style="width: 60%;"alt="...">
            <div class="card-body">
                <h5 class="card-title">${data.brand}</h5>
                <p class="card-text fs-5">${data.phone_name}</p>
            </div>
            <a href="#" class="mx-auto mb-3"><button onclick="loadPhoneDetail('${data.slug}')"
            class="btn btn-primary">Details</button></a>
            </div>
        `;
        searchResult.appendChild(div);
        toggleSpinner('none');
        toggleSearchResult('flex');

    })
}

// load all phones when page loads
const loadAllPhones = searchText => {
    url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayAllPhones(data.data))
}

//show all phones when page loads
const displayAllPhones = phones => {
    const conatiner = document.getElementById('search-result');
    conatiner.textContent = '';
    phones.forEach(data => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card">
            <img src="${data.image}" class="card-img-top mt-2 rounded mx-auto" style="width: 60%;"alt="...">
            <div class="card-body">
                <h5 class="card-title">${data.brand}</h5>
                <p class="card-text fs-5">${data.phone_name}</p>
            </div>
            <a href="#" class="mx-auto mb-3"><button onclick="loadPhoneDetail('${data.slug}')"
            class="btn btn-primary">Details</button></a>
            </div>
    `
        conatiner.appendChild(div);
    })
}
loadAllPhones('a');

// load individual phone details
const loadPhoneDetail = id => {
    console.log(id);
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetail(data.data))
}

// show individual phone details
const displayPhoneDetail = data => {
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    if (!data.releaseDate) {
        div.innerHTML = `
        <img src="${data.image}" class="card-img-top mx-auto mt-2" style="width: 30%;" alt="...">
        <div class="card-body">
        <h4 class="card-title fw-bolder">${data.brand}</h4>
        <p class="card-text fw-bolder fs-4">${data.name}</p>
        <p class="card-text fw-bolder">No release date found</p>
        <p class="card-text">
        <h5>Main Features</h5>
        <p><span class="fw-bolder">Storage:</span> ${data.mainFeatures.storage}</p>
        <p><span class="fw-bolder">Display-Size:</span> ${data.mainFeatures.displaySize}</p>
        <p><span class="fw-bolder">Chipset:</span> ${data.mainFeatures.chipSet}</p>
        <p><span class="fw-bolder">Memory:</span> ${data.mainFeatures.memory}</p>
        <h5>Sensor</h5>
        <p><span class="fw-bolder">Sensor:</span> ${data.mainFeatures.sensors}</p>
        <h5>Others</h5>
        <p><span class="fw-bolder">WLAN:</span> ${data.others?.WLAN ? data.others?.WLAN : 'not found'}</p>
        <p><span class="fw-bolder">BLUETOOTH:</span> ${data.others?.Bluetooth ? data.others?.Bluetooth : 'not found'}
        </p>
        <p><span class="fw-bolder">GPS:</span> ${data.others?.GPS ? data.others?.GPS : 'not found'}</p>
        <p><span class="fw-bolder">NFC:</span> ${data.others?.NFC ? data.others?.NFC : 'not found'}</p>
        <p><span class="fw-bolder">RADIO:</span>${data.others?.Radio ? data.others?.Radio : 'not found'}</p>
        <p><span class="fw-bolder">USB:</span> ${data.others?.USB ? data.others?.USB : 'not found'}</p>
        </p>
    </div>
        `;
        phoneDetails.appendChild(div);
    }
    else {
        div.innerHTML = `
        <img src="${data.image}" class="card-img-top mx-auto mt-2" style="width: 30%;" alt="...">
        <div class="card-body">
        <h4 class="card-title fw-bolder">${data.brand}</h4>
        <p class="card-text fw-bolder fs-4">${data.name}</p>
        <p class="card-text fw-bolder">${data.releaseDate}</p>
        <p class="card-text">
        <h5>Main Features</h5>
        <p><span class="fw-bolder">Storage:</span> ${data.mainFeatures.storage}</p>
        <p><span class="fw-bolder">Display-Size:</span> ${data.mainFeatures.displaySize}</p>
        <p><span class="fw-bolder">Chipset:</span> ${data.mainFeatures.chipSet}</p>
        <p><span class="fw-bolder">Memory:</span> ${data.mainFeatures.memory}</p>
        <h5>Sensor</h5>
        <p><span class="fw-bolder">Sensor:</span> ${data.mainFeatures.sensors}</p>
        <h5>Others</h5>
        <p><span class="fw-bolder">WLAN:</span> ${data.others?.WLAN ? data.others?.WLAN : 'not found'}</p>
        <p><span class="fw-bolder">BLUETOOTH:</span> ${data.others?.Bluetooth ? data.others?.Bluetooth : 'not found'}
        </p>
        <p><span class="fw-bolder">GPS:</span> ${data.others?.GPS ? data.others?.GPS : 'not found'}</p>
        <p><span class="fw-bolder">NFC:</span> ${data.others?.NFC ? data.others?.NFC : 'not found'}</p>
        <p><span class="fw-bolder">RADIO:</span>${data.others?.Radio ? data.others?.Radio : 'not found'}</p>
        <p><span class="fw-bolder">USB:</span> ${data.others?.USB ? data.others?.USB : 'not found'}</p>
        </p>
    </div>
        `;
        phoneDetails.appendChild(div);
    }
}