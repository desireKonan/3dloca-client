import api from "@/api";
import ShopBreadCrumb from "@/components/breadCrumbs/shop";
import CallToAction from "@/components/callToAction";
import ProductList from "@/components/product/list";
import RelatedProduct from "@/components/product/related-product";
import SideBar from "@/components/shopSideBar";
import { LayoutOne } from "@/layouts";
import {
  getDiscountPrice,
  getSortedProducts,
  productSlug,
} from "@/lib/product";
import { setProducts } from "@/store/slices/product-slice";
import { useEffect, useState } from "react";
import { Col, Container, Form, Nav, Row, Tab } from "react-bootstrap";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaThLarge,
  FaThList,
} from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";

function ShopLeftSideBar() {
  const { products } = useSelector((state) => state.product);
  const [sortType, setSortType] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [filterSortType, setFilterSortType] = useState("");
  const [filterSortValue, setFilterSortValue] = useState("");
  const [offset, setOffset] = useState(0);
  const [sortedProducts, setSortedProducts] = useState([]);
  const pageLimit = 6;
  const [currentItems, setCurrentItems] = useState(products);
  const [pageCount, setPageCount] = useState(0);

  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { compareItems } = useSelector((state) => state.compare);
  const getSortParams = (sortType, sortValue) => {
    setSortType(sortType);
    setSortValue(sortValue);
  };

  const getFilterSortParams = (sortType, sortValue) => {
    setFilterSortType(sortType);
    setFilterSortValue(sortValue);
  };

  const [query, setQuery] = useState("");
  const keys = ["title"];
  const SearchProduct = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(query))
    );
  };
  useEffect(() => {
    let sortedProducts = getSortedProducts(products, sortType, sortValue);

    const filterSortedProducts = getSortedProducts(
      sortedProducts,
      filterSortType,
      filterSortValue
    );

    sortedProducts = filterSortedProducts;

    setSortedProducts(sortedProducts);

    setCurrentItems(sortedProducts.slice(offset, offset + pageLimit));

    setCurrentItems(
      SearchProduct(sortedProducts.slice(offset, offset + pageLimit))
    );
  }, [
    offset,
    products,
    sortType,
    sortValue,
    filterSortType,
    filterSortValue,
    query,
  ]);

  // Récupération des produits via l'API et mise à jour du store Redux
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await api.get("/annonces/validated?page=1&limit=10");
        if (res.data && res.data.data) {
          console.log("récupération des annonces:", res.data.data);
          dispatch(setProducts(res.data.data));
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des annonces:", error);
      }
    }
    fetchProducts();
  }, [dispatch]);

  useEffect(() => {
    const endOffset = offset + pageLimit;
    setCurrentItems(products.slice(offset, endOffset));
    setPageCount(Math.ceil(products.length / pageLimit));
  }, [products, offset, pageLimit]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * pageLimit) % products.length;
    setOffset(newOffset);
  };

  return (
    <LayoutOne topbar={true}>
      {/* <!-- BREADCRUMB AREA START --> */}

      <ShopBreadCrumb title="Biens" sectionPace="" currentSlug="Biens" />
      {/* <!-- BREADCRUMB AREA END -->
    
    <!-- PRODUCT DETAILS AREA START --> */}
      <div className="ltn__product-area ltn__product-gutter mb-120">
        <Container>
          <Row>
            <Col xs={12} lg={{ span: 8, order: 1 }}>
              <Tab.Container defaultActiveKey="first">
                <div className="ltn__shop-options">
                  <ul className="justify-content-between">
                    <li>
                      <div className="ltn__grid-list-tab-menu">
                        <Nav className="nav">
                          <Nav.Link eventKey="first">
                            <FaThLarge />
                          </Nav.Link>
                          <Nav.Link eventKey="second">
                            <FaThList />
                          </Nav.Link>
                        </Nav>
                      </div>
                    </li>

                    <li>
                      <div className="short-by text-center">
                        <Form.Select
                          className="form-control nice-select"
                          onChange={(e) =>
                            getFilterSortParams("filterSort", e.target.value)
                          }
                        >
                          <option value="default">Default</option>
                          <option value="priceHighToLow">
                            Prix - Haut à Bas
                          </option>
                          <option value="priceLowToHigh">
                            Prix - Bas à Haut
                          </option>
                        </Form.Select>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* <Search spaceBottom="mb-30" setQuery={setQuery} /> */}

                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <div className="ltn__product-tab-content-inner ltn__product-grid-view">
                      <Row>
                        {currentItems.map((product, key) => {
                          const slug = productSlug(product.title);
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
                            <Col key={key} xs={12} sm={6}>
                              <RelatedProduct
                                slug={slug}
                                baseUrl="shop"
                                productData={product}
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
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <div className="ltn__product-tab-content-inner ltn__product-list-view">
                      <Row>
                        {currentItems.map((product, key) => {
                          const slug = productSlug(product.title);
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
                            <Col key={key} xs={12}>
                              <ProductList
                                slug={slug}
                                baseUrl="shop"
                                productData={product}
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
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>

              <div className="ltn__pagination-area text-center">
                <ReactPaginate
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={3}
                  marginPagesDisplayed={2}
                  pageCount={pageCount}
                  nextLabel={<FaAngleDoubleRight />}
                  previousLabel={<FaAngleDoubleLeft />}
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  breakLabel="..."
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                  containerClassName="pagination ltn__pagination justify-content-center"
                  activeClassName="active"
                  renderOnZeroPageCount={null}
                />
              </div>
            </Col>
            <Col xs={12} lg={{ span: 4, order: 0 }}>
              <SideBar products={products} getSortParams={getSortParams} />
            </Col>
          </Row>
        </Container>
      </div>
      {/* <!-- PRODUCT DETAILS AREA END -->

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
  );
}

export default ShopLeftSideBar;
