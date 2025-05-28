
import type { SVGProps } from 'react';
import { ShoppingBag } from 'lucide-react';

const AppLogo = (props: SVGProps<SVGSVGElement> & { size?: number; textClassName?: string }) => {
  const { size = 32, className, textClassName, ...rest } = props;
  return (
    <div className="flex items-center gap-2">
      <ShoppingBag className={className} size={size} color="hsl(var(--primary))" {...rest} />
      <span className={cn("text-xl font-bold text-primary", textClassName)}>E-Commerce Hub</span>
    </div>
  );
};

// Helper cn function if not globally available (usually from lib/utils)
// If you have a global cn, this can be removed.
const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');


export default AppLogo;
