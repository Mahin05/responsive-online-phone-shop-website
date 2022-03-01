document.getElementById('results-error').style.display = 'none';
// spinner
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
// to skip loaded data while showing spinner
const toggleSearchResult = displayStyle => {
    document.getElementById('search-result').style.display = displayStyle;
}

const searchPhone = () => {
    document.getElementById('results-error').style.display = 'none';
    const search = document.getElementById('search-field');
    const searchText = search.value;
    search.value = '';
    // display spinner
    toggleSpinner('block');
    toggleSearchResult('none');
    if (searchText == '') {
        // displayError();
        document.getElementById('results-error').style.display = 'block';
        toggleSpinner('none');
    }
    // console.log(searchText);
    else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchOutput(data.data))
        // .catch(error => displayError(error));
        // document.getElementById('results-error').style.display = 'none';

    }
}
const displaySearchOutput = datas => {
    console.log(datas);
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    if (!datas) {
        document.getElementById('results-error').style.display = 'block';
        toggleSpinner('none');
    }
    datas?.forEach(data => {
        console.log(data);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="col">
        <div class="card">
            <img src="${data.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${data.brand}</h5>
                <p class="card-text">${data.phone_name}</p>
            </div>
            <button onclick="loadPhoneDetail('${data.slug}')" class="btn btn-primary">Details</button>
        </div>
        `;
        searchResult.appendChild(div);
        toggleSpinner('none');
        toggleSearchResult('flex');

    })
}
// const loadMeals = searchText => {
//     url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
//     fetch(url)
//         .then(res => res.json())
//         .then(data => displayMeals(data.meals))
// }

// const displayMeals = meals => {
//     const conatiner = document.getElementById('search-result');
//     conatiner.textContent = '';
//     meals.forEach(meal => {
//         const div = document.createElement('div');
//         div.classList.add('col');
//         div.innerHTML = `
// <div class="col">
// <div  onclick="loadMealDetail(${meal.idMeal})" class="col">
// <div class="card">
//     <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
//     <div class="card-body">
//         <h5 class="card-title">${meal.strMeal}</h5>
//         <p class="card-text">${meal.strInstructions.slice(0, 300)}</p>
//     </div>
// </div>
// </div>
//     `
//         conatiner.appendChild(div);
//     })
// }
// loadMeals('a');

const loadPhoneDetail = id => {
    console.log(id);
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetail(data.data))
}
const displayPhoneDetail = data => {
    console.log(data);
    console.log(data.mainFeatures.sensors[0]);
    console.log(data.image);
    console.log(data.mainFeatures.storage);
    console.log(data.mainFeatures.displaySize);
    console.log(data.mainFeatures.chipSet);
    console.log(data.mainFeatures.memory);
    if (!data.releaseDate) {
        console.log("No release date");
    }
    else {
        console.log(data.releaseDate);
    }
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <img src="${data.image}" class="card-img-top w-50 mx-auto" alt="...">
        <div class="card-body">
            <h5 class="card-title">${data.brand}</h5>
            <p class="card-text">${data.name}</p>
            <p class="card-text">${data.releaseDate}</p>
            <p class="card-text"> <p>Storage: ${data.mainFeatures.storage}</p>
            <p>Display-Size: ${data.mainFeatures.displaySize}</p>
            <p>Chipset: ${data.mainFeatures.chipSet}</p>
            <p> Memory: ${data.mainFeatures.memory}</p>
            </p>
        </div>
        `;
    phoneDetails.appendChild(div);
    // console.log(data.mainFeatures);
    // const phoneDetails = document.getElementById('phone-details');
    // phoneDetails.textContent = '';
    // const div = document.createElement('div');
    // div.classList.add('card');
    // div.innerHTML = `
    //     <img src="${data.mainFeatures.storage}" class="card-img-top w-50 mx-auto" alt="...">
    //     <div class="card-body">
    //         <h5 class="card-title">${data.brand}</h5>
    //         <p class="card-text">${data.name}</p>
    //         <p class="card-text">${data.releaseDate}</p>
    //         <p class="card-text">${data.sensors}</p>
    //     </div>
    //     `;
    // phoneDetails.appendChild(div);
}
