import { useEffect, useState } from 'react';

import { Button, Tooltip } from '@heroui/react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const text = `Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`;

  return (
    <div className="flex items-center pr-1">
      <Tooltip
        disableAnimation
        closeDelay={0}
        className="text-xs"
        content={text}
      >
        <Button
          onPress={() => {
            setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
          }}
          className="text-base"
          isIconOnly
          size="sm"
          variant="light"
          aria-label={text}
          isLoading={!mounted}
          isDisabled={!mounted}
        >
          {resolvedTheme === 'dark' ? <Moon /> : <Sun />}
        </Button>
      </Tooltip>
    </div>
  );
}
