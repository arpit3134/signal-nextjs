import FooterBrand from './FooterBrand';
import FooterLinks from './FooterLinks';
import FooterBottom from './FooterBottom';

export default function Footer({ categories, onCategoryClick }) {
  return (
    <footer>
      <div className="ft-in">
        <div className="ft-top">
          <FooterBrand />
          <FooterLinks categories={categories} onCategoryClick={onCategoryClick} />
        </div>
        <FooterBottom />
      </div>
    </footer>
  );
}
