import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSettingsStore } from "@/store/settings-store";

export function ZoomButtons() {
  const { zoom, zoomIn, zoomOut, resetZoom } = useSettingsStore();
  const percentage = Math.round(zoom * 100);

  return (
    <div className="flex items-center gap-1">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={zoomOut}
            size="icon"
            variant="outline"
            aria-label="Zoom out"
            disabled={zoom <= 0.5}
          >
            <ZoomOut className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Zoom out</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={resetZoom}
            variant="outline"
            size="sm"
            aria-label="Reset zoom"
            className="min-w-12 tabular-nums h-9"
          >
            {percentage}%
          </Button>
        </TooltipTrigger>
        <TooltipContent>Reset zoom</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={zoomIn}
            size="icon"
            variant="outline"
            aria-label="Zoom in"
            disabled={zoom >= 3}
          >
            <ZoomIn className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Zoom in</TooltipContent>
      </Tooltip>
    </div>
  );
}
