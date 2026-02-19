'use client';

import { useState } from 'react';
import { Share2, Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useUrlEquation } from '@/hooks/use-url-equation';

export function ShareButton() {
  const { shareEquation } = useUrlEquation();
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    await shareEquation();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={handleShare}
          size="icon"
          variant="outline"
          aria-label="Share equation"
        >
          {copied ? (
            <Check className="size-4 text-green-500" />
          ) : (
            <Share2 className="size-4" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {copied ? 'URL copied!' : 'Copy URL to this equation'}
      </TooltipContent>
    </Tooltip>
  );
}