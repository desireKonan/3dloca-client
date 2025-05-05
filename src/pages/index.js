import VideoBanner from "@/components/banner/videoBanner";
import BrandCarouselOne from "@/components/brandCarousel";
import CallToAction from "@/components/callToAction";
import CarDealerSearchForm from "@/components/carDealerSearchForm";
import Feature from "@/components/features";
import HeroSectionStyleThree from "@/components/hero/styleThree";
import ProductItem from "@/components/product";
import PropertyItem from "@/components/product/properties";
import TestimonialStyleThree from "@/components/testimonialCarousel/indexThree";
import TitleSection from "@/components/titleSection";
import featuresData from "@/data/service";
import { LayoutTwo } from "@/layouts";
import { getDiscountPrice, getProducts, productSlug } from "@/lib/product";
import fs from "fs/promises";
import path from "path";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import ModalVideo from "react-modal-video";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import api from "@/api";
import { setProducts } from "@/store/slices/product-slice";


function HomeVersionThree(props) {
  const dispatch = useDispatch();
  // Récupération des produits via l'API et mise à jour du store Redux
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await api.get("/annonces/validated?page=1&limit=10");
        if (res.data && res.data.data) {
console.log(res.data.data);

          dispatch(setProducts(res.data.data));
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des annonces:", error);
      }
    }
    fetchProducts();
  }, [dispatch]);
  const [isOpen, setOpen] = useState(false);
  const { products } = useSelector((state) => state.product);
  const featureData = getProducts(featuresData, "buying", "featured", 2);
  const countryProducts = getProducts(products, "buying", "country", 5);
  const featuredProducts = products || [];
  const { data, brand, testimonialData } = props;
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { compareItems } = useSelector((state) => state.compare);

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

  const productsettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          arrows: false,
          dots: true,
        },
      },
      {
        breakpoint: 992,
        settings: {
          arrows: false,
          dots: true,
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: true,
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 580,
        settings: {
          arrows: false,
          dots: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const productCarouselsettings = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: true,
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 575,
        settings: {
          arrows: false,
          dots: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const blogSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <LayoutTwo topbar={true}>
      <ModalVideo
        channel="youtube"
        autoplay
        isOpen={isOpen}
        videoId="LjCzPp-MK48"
        onClose={() => setOpen(false)}
      />
      {/* <!-- SLIDER AREA START (slider-11) --> */}
      <div className="ltn__slider-area ltn__slider-3 section-bg-2">
        <HeroSectionStyleThree data={data} />
      </div>

      {/* <!-- SLIDER AREA END --> */}
      {/* <CarDealerSearchForm navMenuClass="d-none" customClasses="" /> */}
      {/* <!-- CAR DEALER FORM AREA END --> */}

      {/* <!-- FEATURE AREA START ( Feature - 6) --> */}
      <Feature
        servicebtn={true}
        iconTag={false}
        data={featureData}
        classes=""
        headingClasses="section-subtitle-2"
        titleSectionData={{
          sectionClasses: "text-center",
          subTitle: "Nos Services",
          title: "Nos Services",
        }}
      />
      {/* <!-- FEATURE AREA END -->

    <!-- SEARCH BY PLACE AREA START (testimonial-7) --> */}

      {/* <!-- SEARCH BY PLACE AREA END -->



      {/* PRODUCT SLIDER AREA START */}
      <div className="ltn__product-slider-area ltn__product-gutter pt-115 pb-90 plr--7">
        <Container>
          <Row>
            <Col lg={12}>
              <TitleSection
                sectionClasses="text-center"
                headingClasses="section-subtitle-2"
                titleSectionData={{
                  subTitle: "Nos Biens",
                  title: "Biens en Vedette",
                }}
              />
            </Col>
          </Row>

          <Row>
            <Col lg={12}>
              {!!featuredProducts?.length ? (
                <Slider
                  {...productCarouselsettings}
                  className="ltn__product-slider-item-four-active-full-width slick-arrow-1"
                >
                  {featuredProducts.map((product, key) => {
                    const slug = productSlug(product.title);
                    return (
                      <ProductItem
                        key={product.id}
                        productData={product}
                        slug={slug}
                        baseUrl="shop"
                      />
                    );
                  })}
                </Slider>
              ) : null}
            </Col>
          </Row>
        </Container>
      </div>
      {/* PRODUCT SLIDER AREA END */}

      {/* <!-- VIDEO AREA START --> */}
      <div className="ltn__video-popup-area">
        <VideoBanner />
      </div>
      {/* <!-- VIDEO AREA END --> */}

      {/* <!-- TESTIMONIAL AREA START --> */}
      <div className="ltn__testimonial-area ltn__testimonial-4 pt-115 pb-100 plr--9">
        <Container fluid>
          <Row>
            <Col lg={12}>
              <TitleSection
                sectionClasses="text-center"
                headingClasses="section-subtitle-2"
                titleSectionData={{
                  subTitle: "Témoignages",
                  title: "Avis de nos clients",
                }}
              />
            </Col>
          </Row>

          <Row>
            <Col lg={12}>
              <TestimonialStyleThree data={testimonialData} />
            </Col>
          </Row>
        </Container>
      </div>
      {/* <!-- TESTIMONIAL AREA END --> */}

      {/* <!-- BRAND LOGO AREA START --> */}
      {/* <div className="ltn__brand-logo-area ltn__brand-logo-1 section-bg-1 pt-110 pb-110 plr--9">
        <Container fluid>
          <Row>
            <Col xs={12}>
              <BrandCarouselOne data={brand} />
            </Col>
          </Row>
        </Container>
      </div> */}
      {/* <!-- BRAND LOGO AREA END --> */}

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
    </LayoutTwo>
  );
}

export async function getStaticProps() {
  const filePath = path.join(
    process.cwd(),
    "src/data/hero/",
    "index-three.json"
  );

  const brandfilePath = path.join(
    process.cwd(),
    "src/data/brand-logo/",
    "index.json"
  );

  const testimonialFilePath = path.join(
    process.cwd(),
    "src/data/testimonial/",
    "index-three.json"
  );

  const data = JSON.parse(await fs.readFile(filePath));
  const brand = JSON.parse(await fs.readFile(brandfilePath));
  const testimonialData = JSON.parse(await fs.readFile(testimonialFilePath));

  return {
    props: {
      data,
      brand,
      testimonialData,
    },
  };
}
export default HomeVersionThree;
