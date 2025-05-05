import {
  getIndividualAminities,
  getIndividualAminitiesList,
  priceRange,
  bedBath,
  getIndividualCategories,
  setActiveSort,
} from "@/lib/product";
import FilterByPrice from "../FilterByPrice";
import { useState } from "react";
const SideBar = ({ products, getSortParams }) => {
  // États pour les filtres
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [priceMin, setPriceMin] = useState(100000);
  const [priceMax, setPriceMax] = useState(100000000);

  // Liste des localisations (à personnaliser si besoin)
  const locations = ["Abidjan", "Bouaké", "Yamoussoukro"];

  // Appel du parent à chaque changement de filtre
  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat === selectedCategory ? null : cat);
    getSortParams("category", cat === selectedCategory ? null : cat);
  };
  const handleLocationChange = (loc) => {
    setSelectedLocation(loc === selectedLocation ? null : loc);
    getSortParams("location", loc === selectedLocation ? null : loc);
  };
  const handlePriceChange = (min, max) => {
    setPriceMin(min);
    setPriceMax(max);
    getSortParams("price", { min, max });
  };

  const aminities = getIndividualAminities(products);
  const aminitiesList = getIndividualAminitiesList(products);
  const priceRanges = priceRange(products);
  const bedBaths = bedBath(products);
  const categories = getIndividualCategories(products);

  return (
    <>
      <aside className="sidebar ltn__shop-sidebar ltn__right-sidebar">
        <h3 className="mb-10">Filtres avancés</h3>
        <label className="mb-30">
          <small>Environ {products.length.toLocaleString('fr-FR')} résultats</small>
        </label>
        {/* <!-- Advance Information widget --> */}
        <div className="widget ltn__menu-widget">
          <div className="ltn__price-filter-widget mt-30">
            <h4 className="ltn__widget-title">Filtrer par prix</h4>
            <div className="price_filter">
              <FilterByPrice onChange={handlePriceChange} />
            </div>
          </div>
          <hr />
          <h4 className="ltn__widget-title">Catégorie</h4>
          {categories.length > 0 ? (
            <ul>
              {/* Catégorie spéciale "Vendre" */}
              <li key="vendre">
                <label className="checkbox-item">
                  Vente
                  <input
                    type="checkbox"
                    checked={selectedCategory === "Vendre"}
                    onChange={() => handleCategoryChange("Vendre")}
                  />
                  <span className="checkmark"></span>
                </label>
              </li>
              {categories.map((categorie, key) => (
                <li key={key}>
                  <label className="checkbox-item">
                    {categorie.name}
                    <input
                      type="checkbox"
                      checked={selectedCategory === categorie.name}
                      onChange={() => handleCategoryChange(categorie.name)}
                    />
                    <span className="checkmark"></span>
                  </label>
                </li>
              ))}
            </ul>
          ) : (
            "Aucune catégorie trouvée"
          )} 
          <hr />
          <h4 className="ltn__widget-title">Localisation</h4>
          <ul>
            {locations.map((loc, idx) => (
              <li key={loc}>
                <label className="checkbox-item">
                  {loc}
                  <input
                    type="checkbox"
                    checked={selectedLocation === loc}
                    onChange={() => handleLocationChange(loc)}
                  />
                  <span className="checkmark"></span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
