import { Form } from "react-bootstrap";
import {
  FaArrowDown,
  FaEnvelope,
  FaPencilAlt,
  FaPhoneAlt,
  FaUserAlt,
} from "react-icons/fa";

const Contact = () => {
  return (
    <>
      {/* <!-- CONTACT ADDRESS AREA START --> */}
      <div className="ltn__contact-address-area mb-90">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="ltn__contact-address-item ltn__contact-address-item-3 box-shadow">
                <div className="ltn__contact-address-icon">
                  <img src="/img/icons/10.png" alt="Icon Image" />
                </div>
                <h3>Adresse e-mail</h3>
                <p>
                  info@3dloca.com <br />
                  contact@3dloca.com
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="ltn__contact-address-item ltn__contact-address-item-3 box-shadow">
                <div className="ltn__contact-address-icon">
                  <img src="/img/icons/11.png" alt="Icon Image" />
                </div>
                <h3>Numéro de téléphone</h3>
                <p>
                  +225 07 69 69 69 69 <br />
                  +225 07 69 69 69 69
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="ltn__contact-address-item ltn__contact-address-item-3 box-shadow">
                <div className="ltn__contact-address-icon">
                  <img src="/img/icons/12.png" alt="Icon Image" />
                </div>
                <h3>Adresse du bureau</h3>
                <p>
                  Plateau <br />
                  Abidjan, Côte dIvoire
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- CONTACT ADDRESS AREA END --> */}

      {/* <!-- CONTACT MESSAGE AREA START --> */}
      <div className="ltn__contact-message-area mb-120 mb--100">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="ltn__form-box contact-form-box box-shadow white-bg">
                <h4 className="title-2">Demander un devis</h4>
                <form id="contact-form" action="#" method="post">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="input-item input-item-name ltn__custom-icon">
                        <input
                          type="text"
                          name="name"
                          placeholder="Entrez votre nom"
                        />
                        <span className="inline-icon">
                          <FaUserAlt />
                        </span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item input-item-email ltn__custom-icon">
                        <input
                          type="email"
                          name="email"
                          placeholder="Entrez votre adresse e-mail"
                        />
                        <span className="inline-icon">
                          <FaEnvelope />
                        </span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item input-item input-item-email ltn__custom-icon">
                        <Form.Select className="nice-select">
                          <option>Sélectionner le type de service</option>
                          <option>Gestion de biens</option>
                          <option>Service de pr ts hypoth caires </option>
                          <option>Service de conseil</option>
                          <option>Achat de maison</option>
                          <option>Vente de maison</option>
                          <option>Autre</option>
                        </Form.Select>
                        <span className="inline-icon">
                          <FaArrowDown />
                        </span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item input-item-phone ltn__custom-icon">
                        <input
                          type="text"
                          name="phone"
                          placeholder="Entrez votre num ro de t l phone"
                        />
                        <span className="inline-icon">
                          <FaPhoneAlt />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="input-item input-item-textarea ltn__custom-icon">
                    <textarea
                      name="message"
                      placeholder="Entrez votre message"
                    ></textarea>
                    <span className="inline-icon">
                      <FaPencilAlt />
                    </span>
                  </div>
                  {/* <p>
                    <label className="input-info-save mb-0">
                      <input type="checkbox" name="agree" /> Enregistrez mon
                      nom, mon adresse e-mail et mon site web dans ce navigateur
                      pour la prochaine fois que je commenterai.
                    </label>
                  </p> */}
                  <div className="btn-wrapper mt-0">
                    <button
                      className="btn theme-btn-2 btn-effect-1 text-uppercase"
                      type="submit"
                    >
                      Demander un devis gratuit
                    </button>
                  </div>
                  <p className="form-messege mb-0 mt-20"></p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- CONTACT MESSAGE AREA END --> */}

      {/* <!-- GOOGLE MAP AREA START --> */}
      <div className="google-map mb-120">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.843442414384!2d-4.02721251485975!3d5.321170674982946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0f5f7f0c5b6f1b5b%3A0x8b1f7f7b5e5a21f6!2sAbidjan!5e0!3m2!1sen!2sbd!4v1590597267201!5m2!1sen!2sbd"
          width="100%"
          height="100%"
        ></iframe>
      </div>
      {/* <!-- GOOGLE MAP AREA END --> */}
    </>
  );
};

export default Contact;
