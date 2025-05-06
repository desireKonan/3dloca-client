import Link from "next/link";
const ProductList = ({
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

  return (
    <div className="ltn__product-item ltn__product-item-4 ltn__product-item-5">
      <div className="product-img">
        <Link href={`/${baseUrl}/${productData.id}`}>
          <img
            src={`https://picsum.photos/seed/house${Math.floor(Math.random()*1000)}/400/300`}
            alt="Maison"
          />
        </Link>
      </div>
      <div className="product-info">
        <div className="product-badge-price">
          <div className="product-badge">
            <ul>
              <li
                className={`sale-badge ${productData.rent ? "bg-green" : ""}`}
              >
                {badgeText}
              </li>
            </ul>
          </div>
          <div className="product-price">
            <span>
              {`${Number(productData.price).toLocaleString('fr-FR')} FCFA`}
              {productData.rent && <label>/mois</label>}
            </span>
          </div>
        </div>
        <h2 className="product-title">
          <Link href={`/${baseUrl}/${productData.id}`}>{productData.title}</Link>
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
      </div>
      <div className="product-info-bottom">
        <div className="real-estate-agent">
          <div className="agent-img">
            <Link href={`/${baseUrl}/${productData.id}`}>
              <img
                src={`/img/blog/author.jpg`}
                alt={`${productData.title}`}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
