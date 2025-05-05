import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/slices/cart-slice";
import {
  addToWishlist,
  deleteFromWishlist,
} from "@/store/slices/wishlist-slice";
import QuickViewtModal from "@/components/modals/quickViewModal";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
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
  // Badge selon la catégorie
  let badgeText = productData.category === "Location" ? "À louer" : "À vendre";
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);

  const wishListTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Wishlist
    </Tooltip>
  );
  const quickViewTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Quick View
    </Tooltip>
  );
  const addToCartTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
     Add To Cart
    </Tooltip>
  );

  return (
    <>
      <div className="ltn__product-item ltn__product-item-4 ltn__product-item-5">
        <div className="product-img">
          <Link href={`/${baseUrl}/${slug}`}>
            <img
              src={productData.imageUrl || "/img/product-3/default.jpg"}
              alt={productData.title}
            />
          </Link>
        </div>

        <div className="product-info">
          <div className="product-badge-price">
            <div className="product-badge">
              <ul>
                <li
                  className={`sale-badge ${productData.category === "Location" ? "bg-green" : ""}`}
                >
                  {badgeText}
                </li>
              </ul>
            </div>

            <div className="product-price">
              <span>
                {`${productData.price} FCFA`}
                <label> {productData.category === "Location" ? "/Mois" : ""}</label>
              </span>
            </div>
          </div>

          <h2 className="product-title">
            <Link href={`/${baseUrl}/${slug}`}>{productData.title}</Link>
          </h2>

          <div className="product-img-location">
            <ul>
              <li>
                <Link href={`/${baseUrl}/${slug}`}>
                  <i className="flaticon-pin"></i>
                  {productData.location}
                </Link>
              </li>
            </ul>
          </div>

          <ul className="ltn__plot-brief">
            <li>
              <span>N/A</span>
              <span className="ms-1">Chambres</span>
            </li>
            <li>
              <span>N/A</span>
              <span className="ms-1">Salles de bain</span>
            </li>
            <li>
              <span>N/A</span>
              <span className="ms-1">Superficie</span>
            </li>
          </ul>
        </div>
        <div className="product-info-bottom">
          <div className="real-estate-agent">
            <div className="agent-img">
              <span style={{ fontWeight: 600 }}>
                {productData.user && productData.user.name ? productData.user.name : "Agent"}
              </span>
            </div>
          </div>

          <div className="product-hover-action">
            <ul>
              <li>
                <OverlayTrigger
                  placement="right"
                  delay={{ show: 250, hide: 400 }}
                  overlay={quickViewTooltip}
                >
                <button onClick={() => setModalShow(true)}>
                  <i className="flaticon-expand"></i>
                </button>


                </OverlayTrigger>
              </li>
              <li>

              <OverlayTrigger
                  placement="right"
                  delay={{ show: 250, hide: 400 }}
                  overlay={wishListTooltip}
                >
                <button
                  onClick={
                    wishlistItem !== undefined
                      ? () => dispatch(deleteFromWishlist(productData.id))
                      : () => dispatch(addToWishlist(productData))
                  }
                >
                  <i className="flaticon-heart-1"></i>
                </button>

                  
                </OverlayTrigger>
              </li>
              <li>
              <OverlayTrigger
                  placement="right"
                  delay={{ show: 250, hide: 400 }}
                  overlay={addToCartTooltip}
                >
                <button onClick={() => dispatch(addToCart(productData))}>
                  <i className="flaticon-add"></i>
                </button>

                  
                </OverlayTrigger>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <QuickViewtModal
        productData={productData}
        show={modalShow}
        onHide={() => setModalShow(false)}
        slug={slug}
        discountedprice={discountedPrice}
        productprice={productPrice}
        cartitem={cartItem}
        wishlistitem={wishlistItem}
        compareitem={compareItem}
      />
    </>
  );
};

export default ProductList;
