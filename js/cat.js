// MODEL
let model =
{
    currentCat: null,
    adminMode: false,
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
        // initialize views
        catListView.init();
        catDetailView.init();
        adminView.init();
        adminView.hide();
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
    },

    // run when we hit the admin button
    adminShow: function()
    {
        if(model.adminMode === false)
        {
            model.adminMode = true;
            adminView.render();
            adminView.show();
        }
        else
        {
            model.adminMode = false;
            adminView.hide();
        }
    },

    adminCancel: function() // hide admin button if we hit cancel button
    {
        adminView.hide();
        model.adminMode = false;
    },

    adminSave: function() // save data and hide buttons
    {
        model.currentCat.name = adminView.adminName.value;
        model.currentCat.imgSrc = adminView.adminUrl.value;
        model.currentCat.clickCount = adminView.adminClicks.value;
        catListView.render();
        catDetailView.render();
        adminView.hide();
        model.adminMode = false;
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

// VIEW admin mode
let adminView =
{
    init: function()
    {
        // get the form elements
        this.adminName = document.querySelector('.admin-name');
        this.adminUrl = document.querySelector('.admin-url');
        this.adminClicks = document.querySelector('.admin-clicks');
        // get the whole area
        this.adminArea = document.querySelector('.admin-area');

        // get buttons
        this.adminButton = document.querySelector('.admin-button');
        this.saveButton = document.querySelector('.save-button');
        this.cancelButton = document.querySelector('.cancel-button');

        // add listeners
        this.adminButton.addEventListener('click', function()
        {
            octopus.adminShow();
        });

        this.saveButton.addEventListener('click', function()
        {
            octopus.adminSave();
        });

        this.cancelButton.addEventListener('click', function()
        {
            octopus.adminCancel();
        });

        this.render();
    },

    render: function()
    {
        let currentCat = octopus.getCurrentCat();
        this.adminName.value = currentCat.name;
        this.adminUrl.value = currentCat.imgSrc;
        this.adminClicks.value = currentCat.clickCount;
    },

    show: function()
    {
        this.adminArea.style.display = "block";
    },

    hide: function()
    {
        this.adminArea.style.display = "none";
    }
};

// start
octopus.init();
