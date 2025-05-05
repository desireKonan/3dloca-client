import Link from "next/link";

const CallToAction = () => {
  return (
    <>
      <div className="call-to-action-inner call-to-action-inner-6 ltn__secondary-bg position-relative">
        <div className="coll-to-info text-color-white">
          <h1> Recherchez votre maison de rêve?</h1>
          <p>Nous pouvons vous aider  r aliser votre r ve de nouvelle maison</p>
        </div>
        <div className="btn-wrapper">
          <Link className="btn btn-effect-3 btn-white" href="shop">
            Explorer les propriétés <i className="icon-next"></i>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CallToAction;
