import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { FaPlay } from "react-icons/fa";
import ModalVideo from "react-modal-video";
function AboutUsStyleOne({ sectionSpace }) {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <ModalVideo
        channel="youtube"
        autoplay
        isOpen={isOpen}
        videoId="X7R-q9rsrtU"
        onClose={() => setOpen(false)}
      />
      <div className={`ltn__about-us-area ${sectionSpace}`}>
        <Container>
          <Row>
            <Col xs={12} lg={6} className="align-self-center">
              <div className="about-us-img-wrap about-img-left">
                <Image src="/img/others/7.png" alt="Image 3D Loca" width={500} height={400} />
                <div className="about-us-img-info about-us-img-info-2 about-us-img-info-3">
                  <div className="ltn__video-img ltn__animation-pulse1">
                    <Image src="/img/others/8.png" alt="Image popup video" width={150} height={120} />
                    <button
                      onClick={() => setOpen(true)}
                      className="ltn__video-icon-2"
                    >
                      <FaPlay />
                    </button>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={12} lg={6} className="align-self-center">
              <div className="about-us-info-wrap">
                <div className="section-title-area mb-20">
                  <h6 className="section-subtitle section-subtitle-2 ltn__secondary-color">
                    À propos de nous
                  </h6>
                  <h1 className="section-title">
                    Le leader du marché de la location de propriétés 3D
                    <span>.</span>
                  </h1>
                  <p>
                    Plus de 39 000 personnes travaillent pour nous dans plus de
                    70 pays à travers le monde. Cette couverture mondiale
                    combinée à des services spécialisés nous permet de vous
                    offrir une expérience de location de propriétés 3D unique.
                  </p>
                </div>
                <ul className="ltn__list-item-half clearfix">
                  <li>
                    <i className="flaticon-home-2"></i>
                    Conception de maison intelligente
                  </li>
                  <li>
                    <i className="flaticon-mountain"></i>
                    Paysage magnifique autour
                  </li>
                  <li>
                    <i className="flaticon-heart"></i>
                    Mode de vie exceptionnel
                  </li>
                  <li>
                    <i className="flaticon-secure"></i>
                    Sécurité 24h/24
                  </li>
                </ul>
                <div className="ltn__callout bg-overlay-theme-05  mt-30">
                  <p>
                    Nous nous engageons à vous offrir une expérience de location
                    de propriétés 3D exceptionnelle. <br />
                    Veuillez nous contacter pour en savoir plus.
                  </p>
                </div>
                <div className="btn-wrapper animated">
                  <Link
                    href="/contact"
                    className="theme-btn-1 btn btn-effect-1"
                  >
                    NOUS CONTACTER
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default AboutUsStyleOne;
