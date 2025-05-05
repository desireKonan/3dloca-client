import Link from "next/link";
const MenuList = ({ addListing }) => {
  return (
    <ul>
      <li>
        <Link href="/">Accueil</Link>
      </li>
      <li>
        <Link href="/shop">Biens</Link>
      </li>
      <li>
        <Link href="/about">A propos</Link>
      </li>
      <li>
        <Link href="/contact">Contact</Link>
      </li>
      {addListing ? (
        <li className="special-link">
          <Link href="/login">Se Connecter</Link>
        </li>
      ) : null}
    </ul>
  );
};

export default MenuList;
