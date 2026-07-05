const fs = require('fs');

let css = fs.readFileSync('app/styles/style.css', 'utf8');

const target = `    header{
        justify-content: unset;
        padding: 0 2rem;
        background-color: #ffc0cb;
        box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px;
        justify-content: space-between;
       
    }
    #logo{
      display: flex;
      align-items: center;
      width: 20%;
    }
    
    #logo > img{
        width: 100%;
        margin: unset;
    }
  
    header #nav_bar{
        display: none;
    }
    
    #search{
        width: 65%;
        justify-content: flex-start;
    }
    #search > #search_bar{
        padding-left: 5.5rem;
        background-color: #fae6e9;
    }
    #search > #search_bar:focus{
        background-color: #fff2f4;
    }
    #search #search_icon{
        left: 2rem;
    }
    #right_icon{
        display: none;
    }

   /* TOGGLE MENU */
    #toggle{
        visibility: visible;
        width: 7%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 4rem;
        color: var(--primaryColor);
    }`;

const replacement = `    header{
        padding: 1.5rem 2rem;
        background-color: #ffffff;
        box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px;
        flex-wrap: wrap;
        height: auto;
        justify-content: space-between;
    }
    #logo{
      display: flex;
      align-items: center;
      width: auto;
    }
    
    #logo > img{
        height: 28px;
        width: auto;
        margin: unset;
    }
  
    header #nav_bar{
        display: none;
    }
    
    #search{
        width: 100%;
        order: 3;
        margin-top: 1.5rem;
    }
    #search > #search_bar{
        padding-left: 4.5rem;
        background-color: #f5f5f6;
        height: 42px;
    }
    #search > #search_bar:focus{
        background-color: #ffffff;
    }
    #search #search_icon{
        left: 1.5rem;
    }
    #right_icon{
        display: none;
    }

   /* TOGGLE MENU */
    #toggle{
        visibility: visible;
        width: auto;
        display: flex;
        align-items: center;
        font-size: 3rem;
        color: var(--primaryColor);
        order: 2;
    }

    /* GRID FIXES FOR MOBILE */
    .promo-grid {
        grid-template-columns: repeat(2, 1fr) !important;
        gap: 1rem !important;
        margin-bottom: 2rem !important;
    }
    .products-grid {
        grid-template-columns: repeat(2, 1fr) !important;
        gap: 15px !important;
    }`;

if(css.includes(target)) { 
    css = css.replace(target, replacement); 
    fs.writeFileSync('app/styles/style.css', css); 
    console.log('Successfully replaced mobile header in style.css'); 
} else { 
    console.log('Target not found in style.css'); 
}
