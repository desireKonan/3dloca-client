

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ModalVideo from "react-modal-video";
import Link from "next/link";
import Slider from "react-slick";
import {
  FaArrowRight,
  FaArrowLeft,
  FaPlay,
  FaStar,
  FaStarHalfAlt,
  FaSearch,
  FaRegStar,
  FaDribbble,
  FaInstagram,
  FaTwitter,
  FaFacebookF,
  FaUserAlt,
  FaEnvelope,
  FaGlobe,
  FaPencilAlt,
  FaCalendarAlt,
} from "react-icons/fa";
import BreadCrumb from "@/components/breadCrumbs";
import { LayoutOne } from "@/layouts";
import { useSelector } from "react-redux";
import { getProducts, productSlug, getDiscountPrice } from "@/lib/product";
import { Container, Row, Col, Nav, Tab } from "react-bootstrap";
import RelatedProduct from "@/components/product/related-product";
import FollowUs from "@/components/followUs";
import Tags from "@/components/tags";
import blogData from "@/data/blog";
import CallToAction from "@/components/callToAction";
import api from "@/api";

function ProductDetails() {
  const router = useRouter();
  const { slug } = router.query;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { products } = useSelector((state) => state.product);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { compareItems } = useSelector((state) => state.compare);
  const latestdBlogs = getProducts(blogData, "buying", "featured", 4);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    api.get(`/annonces/${slug}`)
      .then((res) => {
        // if (!res.ok) throw new Error("Erreur lors de la récupération du produit");
        return res.data;
      })
      .then((data) => {
        console.log("data", data);
        setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <LayoutOne topbar={true}>
        <div style={{ minHeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span>Chargement du produit...</span>
        </div>
      </LayoutOne>
    );
  }

  if (!product) {
    return (
      <LayoutOne topbar={true}>
        <div style={{ minHeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span>Produit non trouvé.</span>
        </div>
      </LayoutOne>
    );
  }

  // Adaptation des champs selon la nouvelle structure API
  const discountedPrice = product.price; // Pas de discount dans l'API exemple
  const productPrice = product.price;
  const cartItem = cartItems.find((cartItem) => cartItem.id === product.id);
  const wishlistItem = wishlistItems.find((wishlistItem) => wishlistItem.id === product.id);
  const compareItem = compareItems.find((compareItem) => compareItem.id === product.id);

  // Pour RelatedProduct, on peut filtrer sur la catégorie si besoin
  const relatedProducts = getProducts(products, product.category, "popular", 2);
  const topRatedProducts = getProducts(products, product.category, "topRated", 2);
  const popularProducts = getProducts(products, product.category, "popular", 4);

  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <button
      {...props}
      className={
        "slick-prev slick-arrow" + (currentSlide === 0 ? " slick-disabled" : "")
      }
      aria-hidden="true"
      aria-disabled={currentSlide === 0 ? true : false}
      type="button"
    >
      <FaArrowLeft />
    </button>
  );
  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <button
      {...props}
      className={
        "slick-next slick-arrow" +
        (currentSlide === slideCount - 1 ? " slick-disabled" : "")
      }
      aria-hidden="true"
      aria-disabled={currentSlide === slideCount - 1 ? true : false}
      type="button"
    >
      <FaArrowRight />
    </button>
  );
  const productDetailsCarouselSettings = {
    centerMode: true,
    infinite: true,
    centerPadding: "450px",
    slidesToShow: 1,
    dots: false,
    speed: 500,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "250px",
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "250px",
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "200px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "150px",
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "0px",
          dots: true,
        },
      },
    ],
  };


  const popular_product = {
    infinite: true,
    slidesToShow: 1,
    dots: true,
    speed: 500,
    arrows: false,
  };

  
  return (
    <>
      <LayoutOne topbar={true}>
        <ModalVideo
          channel="youtube"
          autoplay
          isOpen={isOpen}
          videoId="X7R-q9rsrtU"
          onClose={() => setOpen(false)}
        />
        {/* <!-- BREADCRUMB AREA START --> */}

        <BreadCrumb
          title={product.title}
          sectionPace="mb-0"
          currentSlug={product.title}
        />

        {/* <!-- BREADCRUMB AREA END --> */}

        {/* <!-- IMAGE SLIDER AREA START (img-slider-3) --> */}
        <div className="ltn__img-slider-area mb-90">
          <Container fluid className="px-0">
            <Slider
              {...productDetailsCarouselSettings}
              className="ltn__image-slider-5-active slick-arrow-1 slick-arrow-1-inner"
            >
              {(
  (Array.isArray(product.carousel) && product.carousel.length > 0
    ? product.carousel
    : [
        { img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', title: 'Maison 1' },
        { img: 'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=800&q=80', title: 'Maison 2' },
        { img: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80', title: 'Maison 3' }
      ])
).map((single, key) => {
                return (
                  <div className="ltn__img-slide-item-4" key={key}>
                    <Link href="#">
                      <img
                        src={single.img.startsWith('http') ? single.img : `/img/img-slide/${single.img}`}
                        alt={`${single.title}`}
                      />
                    </Link>
                  </div>
                );
              })}
            </Slider>
          </Container>
        </div>
        {/* <!-- IMAGE SLIDER AREA END -->

    <!-- SHOP DETAILS AREA START --> */}
        <div className="ltn__shop-details-area pb-10">
          <Container>
            <Row>
              <Col xs={12} lg={8}>
                <div className="ltn__shop-details-inner ltn__page-details-inner mb-60">
                  <div className="ltn__blog-meta">
                    <ul>
                      {
                        (product.featured ? (
                          <li className="ltn__blog-category">
                            <Link href="#">Featured</Link>
                          </li>
                        ) : (
                          ""
                        ),
                        product.category === "Location" ? (
                          <li className="ltn__blog-category">
                            <Link className="bg-orange" href="#">
                              Location
                            </Link>
                          </li>
                        ) : (
                          <li className="ltn__blog-category">
                            <Link className="bg-green" href="#">
                              Vente
                            </Link>
                          </li>
                        ))
                      }

                      <li className="ltn__blog-date">
                        <i className="far fa-calendar-alt"></i>
                        {new Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(product.createdAt))}
                      </li>
                    </ul>
                  </div>
                  <h1>{product.title}</h1>
<label>
  <span className="ltn__secondary-color">
    <i className="flaticon-pin"></i>
  </span>{" "}
  {product.location || "N/A"}
</label>
<h4 className="title-2">Description</h4>
<p>{product.description || "Aucune description disponible."}</p>

<h4 className="title-2">Property Detail</h4>
<div className="property-detail-info-list section-bg-1 clearfix mb-60">
  <ul>

    <li>
      <label>Categorie:</label>{" "}
      <span>{product.category || "N/A"}</span>
    </li>
    <li>
      <label>Prix:</label>{" "}
      <span>{product.price ? `${product.price} FCFA` : "N/A"}</span>
    </li>
    <li>
      <label>Créé le:</label>{" "}
      <span>{product.createdAt ? new Date(product.createdAt).toLocaleDateString() : "N/A"}</span>
    </li>
    <li>
      <label>Propriétaire:</label>{" "}
      <span>{product.user?.name || "N/A"}</span>
    </li>
  </ul>
  {/* You can add more fields here if your API returns them in the future */}
  <ul>
    <li>
      <label>Location:</label>{" "}
      <span>{product.location || "N/A"}</span>
    </li>
    <li>
      <label>Prix:</label>{" "}
      <span>{product.price ? `${product.price} FCFA` : "N/A"}</span>
    </li>
    <li>
      <label>Créé le:</label>{" "}
      <span>{product.createdAt ? new Date(product.createdAt).toLocaleDateString() : "N/A"}</span>
    </li>
    <li>
      <label>Propriétaire:</label>{" "}
      <span>{product.user?.name || "N/A"}</span>
    </li>
    <li>
      <label>Statut:</label>{" "}
      <span>{product.isValidated ? "Validé" : "Non validé"}</span>
                      </li>
                    </ul>
                  </div>

                  <h4 className="title-2">Caractéristiques</h4>
                  <div className="property-detail-feature-list clearfix mb-45">
                    <ul>
                      <li>
                        <div className="property-detail-feature-list-item">
                          <i className="flaticon-double-bed"></i>
                          <div>
                            <h6>Chambre</h6>
                            {/* <small>{product.factsAndFeatures.livingRoom}</small> */}
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="property-detail-feature-list-item">
                          <i className="flaticon-double-bed"></i>
                          <div>
                            <h6>Garage</h6>
                            {/* <small>{product.factsAndFeatures.garage}</small> */}
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="property-detail-feature-list-item">
                          <i className="flaticon-double-bed"></i>
                          <div>
                            <h6>Salle de douche</h6>
                            {/* <small>{product.factsAndFeatures.diningArea}</small> */}
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="property-detail-feature-list-item">
                          <i className="flaticon-double-bed"></i>
                          <div>
                            <h6>Salle de douche</h6>
                            {/* <small>{product.factsAndFeatures.bedroom}</small> */}
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="property-detail-feature-list-item">
                          <i className="flaticon-double-bed"></i>
                          <div>
                            <h6>Salle de douche</h6>
                            {/* <small>{product.factsAndFeatures.bathroom}</small> */}
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="property-detail-feature-list-item">
                          <i className="flaticon-double-bed"></i>
                          <div>
                            <h6>Salle de sport</h6>
                            {/* <small>{product.factsAndFeatures.gymArea}</small> */}
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="property-detail-feature-list-item">
                          <i className="flaticon-double-bed"></i>
                          <div>
                            <h6>Jardin</h6>
                            {/* <small>{product.factsAndFeatures.garden}</small> */}
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="property-detail-feature-list-item">
                          <i className="flaticon-double-bed"></i>
                          <div>
                            <h6>Parking</h6>
                               {/* <small>{product.factsAndFeatures.parking}</small> */}
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>



                  <h4 className="title-2 mb-10">Avantages</h4>

                  <div className="property-details-amenities mb-60">
                    <div className="row">
                      <div className="col-lg-4 col-md-6">
                        <div className="ltn__menu-widget">
                          <ul>
                            {["Ascenseur", "Jardin", "Terrasse", "Cuisine équipée", "Chauffe-eau", "Concierge"].map((single, key) => {
                              return (
                                <li key={key}>
                                  <label className="checkbox-item">
                                    {single}
                                    <input
                                      type="checkbox"
                                      defaultChecked="checked"
                                    />
                                    <span className="checkmark"></span>
                                  </label>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="ltn__menu-widget">
                          <ul>
                            {["Parking", "Climatisation", "Piscine", "Balcon", "Sécurité", "Internet"].map((single, key) => {
                              return (
                                <li key={key}>
                                  <label className="checkbox-item">
                                    {single}
                                    <input
                                      type="checkbox"
                                      defaultChecked="checked"
                                    />
                                    <span className="checkmark"></span>
                                  </label>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="ltn__menu-widget">
                          <ul>
                            {["Vue sur la ville", "Salle de sport", "Proche transports", "Salle de réunion", "Cave", "Accès PMR"].map((single, key) => {
                              return (
                                <li key={key}>
                                  <label className="checkbox-item">
                                    {single}
                                    <input
                                      type="checkbox"
                                      defaultChecked="checked"
                                    />
                                    <span className="checkmark"></span>
                                  </label>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

              


                  {/* <!-- APARTMENTS PLAN AREA END --> */}

                  <h4 className="title-2">Vidéo</h4>
                  <div
                    className="ltn__video-bg-img ltn__video-popup-height-500 bg-overlay-black-50 bg-image mb-60"
                    style={{ backgroundImage: `url("../../img/others/5.jpg")` }}
                  >
                    <button
                      className="ltn__video-icon-2 ltn__video-icon-2-border---"
                      onClick={() => setOpen(true)}
                    >
                      <FaPlay />
                    </button>
                  </div>

               

                  <h4 className="title-2">Autres annonces</h4>
                  <Row>
                    {relatedProducts.map((data, key) => {
                      const slug = productSlug(data.title);
                      const discountedPrice = getDiscountPrice(
                        product.price,
                        product.discount
                      ).toFixed(2);
                      const productPrice = product.price.toFixed(2);
                      const cartItem = cartItems.find(
                        (cartItem) => cartItem.id === product.id
                      );
                      const wishlistItem = wishlistItems.find(
                        (wishlistItem) => wishlistItem.id === product.id
                      );
                      const compareItem = compareItems.find(
                        (compareItem) => compareItem.id === product.id
                      );
                      return (
                        <Col xs={12} sm={6} key={key}>
                          <RelatedProduct
                            productData={data}
                            slug={slug}
                            baseUrl="shop"
                            discountedPrice={discountedPrice}
                            productPrice={productPrice}
                            cartItem={cartItem}
                            wishlistItem={wishlistItem}
                            compareItem={compareItem}
                          />
                        </Col>
                      );
                    })}
                  </Row>
                </div>
              </Col>

              <Col xs={12} lg={4}>
                <aside className="sidebar ltn__shop-sidebar ltn__right-sidebar---">
                  {/* <!-- Author Widget --> */}
                  <div className="widget ltn__author-widget">
                    <div className="ltn__author-widget-inner text-center">
                      {/* <img
                        src={`/img/team/${product.agent.img}`}
                        alt={`${product.agent.fullName}`}
                      /> */}
                      <h5>{product.user.name}</h5>
                      <small>{product.user.email}</small>
                      <div className="product-ratting">
                        <ul>
                          <li>
                            <a href="#">
                              <FaStar />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <FaStar />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <FaStar />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <FaStar />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <FaRegStar />
                            </a>
                          </li>
                          <li className="review-total">
                            {" "}
                            <Link href="#">
                              {" "}
                              {/* ( {product.user.raiting} Reviews ) */}
                            </Link>
                          </li>
                        </ul>
                      </div>
                      {/* <p>{product.user.description}</p> */}

                      <div className="ltn__social-media">
                        <ul>
                          <li>
                            <a href="#" title="Facebook">
                              <FaFacebookF />
                            </a>
                          </li>
                          <li>
                            <a href="#" title="Twitter">
                              <FaTwitter />
                            </a>
                          </li>
                          <li>
                            <a href="#" title="Linkedin">
                              <FaInstagram />
                            </a>
                          </li>

                          <li>
                            <a href="#" title="Youtube">
                              <FaDribbble />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  {/* <!-- Search Widget --> */}
               
                  {/* <!-- Form Widget --> */}
                  <div className="widget ltn__form-widget">
                    <h4 className="ltn__widget-title ltn__widget-title-border-2">
                      Contactez le propriétaire
                    </h4>
                    <form action="#">
                      <input
                        type="text"
                        name="yourname"
                        placeholder="Nom*"
                      />
                      <input
                        type="text"
                        name="youremail"
                        placeholder="Email*"
                      />
                      <textarea
                        name="yourmessage"
                        placeholder="Message..."
                      ></textarea>
                      <button type="submit" className="btn theme-btn-1">
                        Envoyer
                      </button>
                    </form>
                  </div>
              


                  <FollowUs title="Suivez-nous" />

                  {/* <!-- Tagcloud Widget --> */}

                  {/* <Tags title="Popular Tags" /> */}
                </aside>
              </Col>
            </Row>
          </Container>
        </div>
        {/* <!-- SHOP DETAILS AREA END -->

    <!-- CALL TO ACTION START (call-to-action-6) --> */}
        <div className="ltn__call-to-action-area call-to-action-6 before-bg-bottom">
          <Container>
            <Row>
              <Col xs={12}>
                <CallToAction />
              </Col>
            </Row>
          </Container>
        </div>
        {/* <!-- CALL TO ACTION END --> */}
      </LayoutOne>

    </>
  );
}

export default ProductDetails;

// Suppression de getStaticProps et getStaticPaths, récupération dynamique dans le composant principal
