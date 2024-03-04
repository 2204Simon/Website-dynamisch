import ShoppingCard from "./ShoppingCard";
import ScrollContainer from "./Arrows";
import { useEffect, useState } from "react";
import { CustomToast } from "../general/toast.style";
import NewspaperAbo from "./Newspaper";
import { colors, grid2Classes } from "@mui/material";
import { baseUrl } from "../../globalVariables/global";

export async function loadImage(path: string): Promise<string> {
  try {
    const image = await import(`../../img/${path}`);
    return image.default;
  } catch (error) {
    console.error(`Error loading image at path ${path}:`, error);
    return "";
  }
}
export type Zutat = {
  zutatsId: string;
  zutatsname: string;
  zutatseigenschaft: string;
  zutatseinheit: string;
};

export type Product = {
  kundenId?: string;
  produktId: string;
  titel: string;
  preis: number;
  bild: string;
  sparte: string;
  Zutaten: Array<Zutat>;
};

function Produkt() {
  const isTouchpad = matchMedia("(pointer: coarse)").matches;
  const [products, setProducts] = useState<Array<Product>>([]);
  const [customerProducts, setCustomerProducts] = useState<Array<Product>>([]);

  const existSparte = (sparte: string): boolean => {
    return products.some(product => product.sparte === sparte);
  };

  const loadProducts = async (): Promise<void> => {
    try {
      const request = await fetch(`${baseUrl}/generalProdukts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });
      const product = await request.json();
      if (!request.ok) throw new Error(product.message);
      const loadedProducts = await Promise.all(
        product.map(async (product: Product) => {
          const image = await loadImage(product.bild);
          return { ...product, bild: image };
        })
      );
      setProducts(loadedProducts);
    } catch (error) {
      console.error(error);
      setProducts([]);
    }
  };

  const loadCustomnerProducts = async (): Promise<void> => {
    try {
      const id = "a842bab0-da48-11ee-b25c-0b61d09fdd95"; //übergangsweise hard gecoded bis zur Implementierung der KundenId aus den Cookies
      const request = await fetch(`${baseUrl}/CustomerProducts/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });
      const product = await request.json();
      if (!request.ok) throw new Error(product.message);
      const loadedProducts = await Promise.all(
        product.map(async (product: Product) => {
          const image = await loadImage(product.bild);
          return { ...product, bild: image };
        })
      );
      setCustomerProducts(loadedProducts);
    } catch (error) {
      console.error(error);
      setCustomerProducts([]);
    }
  };

  useEffect(() => {
    loadProducts();
    loadCustomnerProducts();
  }, []);

  function zutatsname(zutaten: Array<Zutat>) {
    if (zutaten) {
      return zutaten.map(zutat => zutat.zutatsname);
    }
    return [];
  }

  function zutatseigenschaft(zutaten: Array<Zutat>): boolean {
    if (zutaten) {
      return zutaten.every(zutat => zutat.zutatseigenschaft === "vegan");
    }
    return false;
  }

  const ShoppingCards = (sparte: string) => {
    const productsToRender = products
      .filter((product: Product) => product.sparte === sparte)
      .map((product: Product) => ({
        produktId: product.produktId,
        image: product.bild,
        title: product.titel,
        price: product.preis,
        content: zutatsname(product.Zutaten),
        allergy: [],
        veggie: zutatseigenschaft(product.Zutaten),
      }));

    return productsToRender.map(product => (
      <ShoppingCard
        produktId={product.produktId}
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

  const ShoppingCardsCustomerProducts = () => {
    const productsToRender = customerProducts.map((product: Product) => ({
      produktId: product.produktId,
      image: product.bild,
      title: product.titel,
      price: product.preis,
      content: zutatsname(product.Zutaten),
      allergy: [],
      veggie: zutatseigenschaft(product.Zutaten),
    }));

    return productsToRender.map(product => (
      <ShoppingCard
        produktId={product.produktId}
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

  const Newspaper = () => {
    const productsToRender = products
      .filter((product: Product) => product.sparte === "Newspaper")
      .map((product: Product) => ({
        image: product.bild,
        title: product.titel,
        price: product.preis,
        produktId: product.produktId,
      }));
    if (productsToRender.length > 0) {
      return (
        <NewspaperAbo
          title={productsToRender[0].title}
          price={productsToRender[0].price}
          image={productsToRender[0].image}
          produktId={productsToRender[0].produktId}
        />
      );
    } else {
      return <NewspaperAbo title={""} price={0} image={""} produktId={""} />;
    }
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
      {Newspaper()}

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
      ) : existSparte("Food") ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
            alignItems: "center",
            margin: "auto",
          }}
        >
          {ShoppingCards("Food")}
        </div>
      ) : (
        // <ScrollContainer scrollAmount={283}>
        //   {ShoppingCards("Food")}
        // </ScrollContainer>
        <p>
          Die Speisen konnten nicht geladen werden. Bitte wenden Sie sich an den
          Support.
        </p>
      )}

      <h3>Getränke</h3>
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
      ) : existSparte("Drink") ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
            alignItems: "center",
            margin: "auto",
          }}
        >
          {ShoppingCards("Drink")}
        </div>
      ) : (
        // <ScrollContainer scrollAmount={283}>
        //   {ShoppingCards("Drink")}
        // </ScrollContainer>
        <p>
          Die Getränke konnten nicht geladen werden. Bitte wenden Sie sich an
          den Support.
        </p>
      )}

      <h3>eigene Produkte TEST</h3>
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
          {ShoppingCardsCustomerProducts()}
        </div>
      ) : (
        // ) : existSparte("KundenProdukt") ? (
        //   <ScrollContainer scrollAmount={283}>
        //     {ShoppingCards("KundenProdukt")}
        //   </ScrollContainer>
        // ) : (
        <p>
          Die eigenen Konfiguratorprodukte konnten nicht geladen werden. Bitte
          wenden Sie sich an den Support.
        </p>
      )}
    </>
  );
}

export default Produkt;
