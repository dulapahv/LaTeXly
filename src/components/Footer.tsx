import { Link } from '@nextui-org/react';

const Footer = () => {
  return (
    <div className="absolute bottom-0 isolate flex w-full justify-between px-1 text-sm">
      <div>
        <span className="text-neutral-600">With 💕 from </span>
        <Link
          href="https://github.com/dulapahv"
          isExternal
          showAnchorIcon
          className="text-sm text-neutral-600"
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
          className="text-sm text-neutral-600"
        >
          GitHub
        </Link>
        )
      </span>
    </div>
  );
};

export default Footer;
