import { Link } from '@nextui-org/react';

const Footer = () => {
  return (
    <div className="fixed bottom-0 left-1 isolate text-xs">
      <div>
        <span className="text-neutral-500">With 💕 from </span>
        <Link
          href="https://github.com/dulapahv"
          isExternal
          showAnchorIcon
          className="text-xs text-neutral-500"
        >
          dulapahv
        </Link>
      </div>
      <span className="text-neutral-500">
        LaTeXly 0.2.0 (
        <Link
          href="https://github.com/dulapahv/LaTeXly"
          isExternal
          showAnchorIcon
          className="text-xs text-neutral-500"
        >
          GitHub
        </Link>
        )
      </span>
    </div>
  );
};

export default Footer;
