import ShoppingCard from "./ShoppingCard";
import ScrollContainer from "./Arrows";
import { Suspense, useEffect, useState } from "react";

interface Product {
  titel: string;
  preis: number;
  bild: string;
  kundenId?: string;
  sparte: string;
}
function Produkt() {
  const isTouchpad = matchMedia("(pointer: coarse)").matches;
  const [products, setProducts] = useState<Array<Product>>([]);

  //const existSparte = (sparte: string): boolean => {
  //  return products.some(product => product.sparte === sparte);
  // };

  const loadProducts = async (): Promise<void> => {
    try {
      const request = await fetch(
        `http://localhost:3001/api/v1/generalProdukts`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }
      ); // TODO http://localhost:3001/api/v1 austauschen mit Variablenname bsp. ${apiUrl}
      const product = await request.json();

      product.map(
        async (product: Product) =>
          (product.bild = await loadImage(product.bild))
      );
      setProducts(product);
    } catch (error) {
      console.error(error);
      setProducts([]);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadImage(path: string): Promise<string> {
    const image = await import(`../../img/${path}`);
    return image.default; //Wegen ES6 mit default
  }

  const ShoppingCards = (sparte: string) => {
    const productsToRender = products
      .filter((product: Product) => product.sparte === sparte)
      .map((product: Product) => ({
        image: product.bild,
        title: product.titel,
        price: product.preis,
        content: ["ABC-Salat", "Buchstabensuppe"],
        allergy: ["Alles", "Nichts"],
        veggie: true,
      }));

    return productsToRender.map(product => (
      <ShoppingCard
        key={product.title}
        image={product.image}
        title={product.title}
        price={product.price}
        content={product.content}
        allergy={product.allergy}
        veggie={product.veggie}
      />
    ));
  };

  return (
    <>
      <h2>Unsere Produkte</h2>
      <p>
        Nachfolgend findest Du unser reichliches Angebot an Speisen und
        Getränken, um Dir Dein perfektes Frühstück zusammenzustellen. Alle
        Produkte sind bio und klimaneutral hergestellt sowie geliefert. Wenn Du
        weitere Informationen zu deren Ursprüngen oder zu den Zutaten erhalten
        möchtest, helfen Dir gerne unsere Mitarbeiter:innen weiter!
      </p>

      <h3>Speisen</h3>

      {isTouchpad ? (
        <div
          style={{
            display: "flex",
            flexWrap: "nowrap",
            overflowX: "scroll",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {ShoppingCards("Food")}
        </div>
      ) : (
        <ScrollContainer scrollAmount={283}>
          {ShoppingCards("Food")}
        </ScrollContainer>
      )}

      <h3>Getränke</h3>
      <Suspense fallback={<div>Loading...</div>}>
        {isTouchpad ? (
          <div
            style={{
              display: "flex",
              flexWrap: "nowrap",
              overflowX: "scroll",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {ShoppingCards("Drink")}
          </div>
        ) : (
          <ScrollContainer scrollAmount={283}>
            {ShoppingCards("Drink")}
          </ScrollContainer>
        )}
      </Suspense>

      <h3>Menüs</h3>
      {isTouchpad ? (
        <div
          style={{
            display: "flex",
            flexWrap: "nowrap",
            overflowX: "scroll",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {ShoppingCards("Menu")}
        </div>
      ) : (
        <ScrollContainer scrollAmount={283}>
          {ShoppingCards("Menu")}
        </ScrollContainer>
      )}
    </>
  );
}

export default Produkt;
