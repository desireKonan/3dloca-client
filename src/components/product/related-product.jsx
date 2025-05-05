import Link from "next/link";
import { Tooltip } from "react-bootstrap";
const RelatedProduct = ({
  productData,
  slug,
  baseUrl,
  discountedPrice,
  productPrice,
  cartItem,
  wishlistItem,
  compareItem,
}) => {
  let badgeText = "";

  if (productData.rent) {
    badgeText = "À louer";
  } else {
    badgeText = "À vendre";
  }


  const wishListTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Favoris
    </Tooltip>
  );
  const quickViewTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Aperçu rapide
    </Tooltip>
  );
  const addToCartTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Ajouter au panier
    </Tooltip>
  );
  return (
    <>
      <div className="ltn__product-item ltn__product-item-4 ltn__product-item-5">
        <div className="product-img">
          <Link href={`/${baseUrl}/${slug}`}>
            <img
              src={`https://picsum.photos/seed/house${Math.floor(Math.random()*1000)}/400/300`}
              alt="Maison"
            />
          </Link>
          {/* <div className="real-estate-agent">
            <div className="agent-img">
              <Link href={`/${baseUrl}/${slug}`}>
                <img
                  src={`/img/blog/.jpg`}
                  alt={`${productData.title}`}
                />
              </Link>
            </div>
          </div> */}
        </div>
        <div className="product-info">
          <div className="product-badge">
            <ul>
              <li
                className={`sale-badge ${productData.rent ? "bg-green" : ""}`}
              >
                {badgeText}
              </li>
            </ul>
          </div>
          <h2 className="product-title">
            <Link href={`/${baseUrl}/${slug}`}>{productData.title}</Link>
          </h2>
          <div className="product-img-location">
            <ul>
              <li>
                <i className="flaticon-pin"></i>
                {productData.location || productData.locantion}
              </li>
            </ul>
          </div>
          {/* <div className="product-owner-info" style={{marginTop:8}}>
            {productData.user && (
              <>
                <div><strong>Propriétaire :</strong> {productData.user.name}</div>
                <div><strong>Email :</strong> {productData.user.email}</div>
              </>
            )}
          </div> */}
          {/* <ul className="ltn__plot-brief">
            <li>
              <span>{productData.propertyDetails.bedrooms}</span>
              <span className="ms-1">Bedrooms</span>
            </li>
            <li>
              <span>{productData.propertyDetails.baths}</span>
              <span className="ms-1">Bathrooms</span>
            </li>
            <li>
              <span>{productData.propertyDetails.area}</span>
              <span className="ms-1">square Ft</span>
            </li>
          </ul> */}
          
        </div>
        <div className="product-info-bottom">
          <div className="product-price">
            <span>
              {`${Number(productData.price).toLocaleString('fr-FR')} FCFA`}
              {productData.category === "Location" ? <label>/mois</label> : <label></label>}
            </span>
          </div>
        </div>
      </div>


    </>
  );
};

export default RelatedProduct;
