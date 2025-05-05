import Link from "next/link";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

const HeaderTopInfo = function () {
  return (
    <>
      <div className="ltn__top-bar-menu">
        <ul>
          <li>
            <Link href="mailto:info@webmail.com">
              <FaEnvelope />
              <i></i> info@3dloca.com
            </Link>
          </li>
          <li>
            <Link href="/locations">
              {/* <FaMapMarkerAlt /> */}
              <FaPhone />
              07 88 364 444
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default HeaderTopInfo;
