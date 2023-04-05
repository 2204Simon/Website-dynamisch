import React from "react";

export default function Bestellformular(){
    return(
        <div className="App">
        <main className='HellerHintergrund'>
          <form className="Bestellformular">
            <h1>Bestellung</h1>
            <p>Für welche Menüs hast Du dich entschieden?</p>
            <div className="MenusToOrder">
              <label htmlFor="mixMaxMenu">Großes Mix-Max-Menü</label>    
              <input type="number" name="mixMaxMenu" id="mixMaxMenu" min="0" max="10"  placeholder="Anzahl"/>
            </div>
            <div className="MenusToOrder">
              <label htmlFor="schokoBagels">Schoko-Bagels</label>   
              <input type="number" name="schokoBagels" id="schokoBagels"  min="0" max="10" placeholder="Anzahl"/>
            </div>
            <div className="MenusToOrder">
              <label htmlFor="brezeln">Brezeln</label>   
              <input type="number" name="brezeln" id="brezeln"  min="0" max="10" placeholder="Anzahl"/>
            </div>
            <div className="MenusToOrder">
              <label htmlFor="croissants">Croissants</label>  
              <input type="number" name="croissants" id="croissants"  min="0" max="10" placeholder="Anzahl"/>
            </div>
            <div className="MenusToOrder">
              <label htmlFor="marmeladentoast">Marmeladentoast</label>  
              <input type="number" name="marmeladentoast" id="marmeladentoast"  min="0" max="10" placeholder="Anzahl"/>
            </div>
            <div className="MenusToOrder">  
              <label htmlFor="heißeSchokolade">Heiße Schokolade</label>   
              <input type="number" name="heißeSchokolade" id="heißeSchokolade"  min="0" max="10" placeholder="Anzahl"/>
            </div>
            <div className="MenusToOrder">  
              <label htmlFor="tee">Tee</label>  
              <input type="number" name="tee" id="tee"  min="0" max="10" placeholder="Anzahl"/>
            </div>
            <div className="MenusToOrder">
              <label htmlFor="kaffee">Kaffee</label>   
              <input type="number" name="kaffee" id="kaffee"  min="0" max="10" placeholder="Anzahl"/>
            </div>  
            <a href="#SprungzuAdressdaten">  
              <button type="button" >Zum Bestellungsformular<span></span> </button>
            </a>
          </form>
        </main>
      </div>  
    )

}