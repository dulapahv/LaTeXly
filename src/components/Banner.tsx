/**
 * Announcement banner (likely be removed in the future)
 */

import { useState } from "react";
import { Button, Link } from "@nextui-org/react";
import { IoClose } from "react-icons/io5";

const Banner = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      {isVisible ? (
        <div className="isolate flex justify-between border-b-1 bg-yellow-100 p-0.5">
          <span aria-hidden="true"></span>
          <div className="flex items-center gap-x-3">
            <span className="text-sm">
              LaTeXly is currently under development
            </span>
            <Button
              href="https://github.com/dulapahv/LaTeXly"
              as={Link}
              showAnchorIcon
              isExternal
              size="sm"
              radius="full"
              className="h-6 gap-x-0.5"
            >
              GitHub
            </Button>
          </div>
          <Button
            onPress={() => setIsVisible(false)}
            isIconOnly
            size="sm"
            radius="full"
            variant="light"
            aria-label="Close"
          >
            <IoClose className="text-base text-black" />
          </Button>
        </div>
      ) : null}
    </>
  );
};

export default Banner;
