// MODEL
let model =
{
    currentCat: null,
    // cat object array
    cats: [
        {
            clickCount: 0,
            name: "Pepe",
            imgSrc: "img/cat1.jpg"
        },
        {
            clickCount: 0,
            name: "Tosta",
            imgSrc: "img/cat2.jpg"
        },
        {
            clickCount: 0,
            name: "Feliz",
            imgSrc: "img/cat3.jpg"
        }
    ]
};

// OCTOPUS
let octopus =
{
    init: function()
    {
        model.currentCat = model.cats[0];
        // initialize both views
        catListView.init();
        catDetailView.init();

    },

    getCurrentCat: function()
    {
        return model.currentCat;
    },

    getCats: function()
    {
        return model.cats;
    },

    setCurrentCat: function(cat)
    {
        model.currentCat = cat;
    },

    // increments the counter for the currently-selected cat
    incrementCounter: function()
    {
        model.currentCat.clickCount++;
        catDetailView.render();
    }
};

// VIEW cat list
let catListView =
{
    init: function()
    {
        catListElem = document.getElementById('cat-list');
        this.render();
    },

    render: function()
    {
        let elem, cat, i;
        // get cat
        let cats = octopus.getCats();
        // empty the cat list first
        catListElem.innerHTML = '';

        // loop over the cats
        for(i = 0; i < cats.length; i++)
        {
            cat = cats[i];
            elem = document.createElement('li');
            elem.textContent = cat.name;

            elem.addEventListener('click', (function(catCopy) //IIFE (Immediately-Invoked Function Expression
            {
                return function()
                {
                    octopus.setCurrentCat(catCopy);
                    catDetailView.render();
                }
                // closure trick
            })(cat));
            // add element to list
            catListElem.appendChild(elem);
        }
    }
};

// VIEW cat detail
let catDetailView =
{
    init: function()
    {
        this.catName = document.querySelector('.cat-name');
        this.catImage = document.querySelector('.cat-image');
        this.catCounter = document.querySelector('.cat-counter');

        // increment the current counter
        this.catImage.addEventListener('click', function()
        {
            octopus.incrementCounter();
        });

        // update the DOM elements with the right values
        this.render();
    },

    render: function()
    {
        let currentCat = octopus.getCurrentCat();
        this.catCounter.innerHTML = currentCat.clickCount;
        this.catName.innerHTML = currentCat.name;
        this.catImage.src = currentCat.imgSrc;

        this.catImage.style.display = "inline";
    }
};


// start
octopus.init();
