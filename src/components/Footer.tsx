import { Link } from '@nextui-org/react';

const Footer = () => {
  return (
    <div className="fixed bottom-0 left-1 isolate text-xs">
      <div>
        <span className="text-neutral-600">With 💕 from </span>
        <Link
          href="https://github.com/dulapahv"
          isExternal
          showAnchorIcon
          className="text-xs text-neutral-600"
        >
          dulapahv
        </Link>
      </div>
      <span className="text-neutral-600">
        Ver: 3.0.1 (
        <Link
          href="https://github.com/dulapahv/LaTeXly"
          isExternal
          showAnchorIcon
          className="text-xs text-neutral-600"
        >
          GitHub
        </Link>
        )
      </span>
    </div>
  );
};

export default Footer;
