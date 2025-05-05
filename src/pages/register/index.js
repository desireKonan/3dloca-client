import { LayoutOne } from "@/layouts";
import { Col, Container, Row } from "react-bootstrap";

import CallToAction from "@/components/callToAction";
import Link from "next/link";

function Register() {
  return (
    <>
      <LayoutOne topbar={true}>
        {/* <ShopBreadCrumb
          title="Inscription"
          sectionPace=""
          currentSlug="Register"
        /> */}

        {/* <!-- LOGIN AREA START (Register) --> */}
        <div className="ltn__login-area pb-110">
          <Container>
            <Row>
              <Col xs={12}>
                <div className="section-title-area text-center">
                  <h1 className="section-title">
                    Inscrivez-vous <br />
                    {/* Votre Compte */}
                  </h1>
                  <p>
                    Inscrivez-vous pour profiter de nos offres personnalisées et
                    rester informé de nos dernières actualités.
                  </p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={12} lg={{ span: 6, offset: 3 }}>
                <div className="account-login-inner">
                  <form action="#" className="ltn__form-box contact-form-box">
                    <input type="text" name="firstname" placeholder="Nom" />
                    <input type="text" name="lastname" placeholder="Prénom" />
                    <input
                      type="text"
                      name="email"
                      placeholder="Adresse e-mail*"
                    />
                    <input
                      type="password"
                      name="password"
                      placeholder="Mot de passe*"
                    />
                    <input
                      type="password"
                      name="confirmpassword"
                      placeholder="Confirmez le mot de passe*"
                    />
                    <label className="checkbox-inline">
                      <input type="checkbox" value="" />
                      Je consens au traitement de mes données personnelles par
                      Herboil pour envoyer du matériel de marketing personnalisé
                      conformément au formulaire de consentement et à la
                      politique de confidentialité.
                    </label>
                    <label className="checkbox-inline">
                      <input type="checkbox" value="" />
                      En cliquant sur Créer un compte, je consens à la politique
                      de confidentialité.
                    </label>
                    <div className="btn-wrapper">
                      <button
                        className="theme-btn-1 btn reverse-color btn-block"
                        type="submit"
                      >
                        CRÉER UN COMPTE
                      </button>
                    </div>
                  </form>
                  <div className="by-agree text-center">
                    <p>En créant un compte, vous acceptez nos:</p>
                    <p>
                      <Link href="/terms">
                        CONDITIONS D&apos;UTILISATION &nbsp; &nbsp; | &nbsp;
                        &nbsp; POLITIQUE DE CONFIDENTIALITÉ
                      </Link>
                    </p>
                    <div className="go-to-btn mt-50">
                      <Link href="/login">DEJA UN COMPTE ?</Link>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        {/* <!-- LOGIN AREA END --> */}

        <div className="ltn__call-to-action-area call-to-action-6 before-bg-bottom">
          <Container>
            <Row>
              <Col xs={12}>
                <CallToAction />
              </Col>
            </Row>
          </Container>
        </div>
      </LayoutOne>
    </>
  );
}

export default Register;
