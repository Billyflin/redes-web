import { Check } from 'lucide-react'

export function Step({
  title,
  children
}) {
  return (
    (<li className="flex items-start space-x-2">
      <div
        className="flex-shrink-0 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
        <Check className="w-3 h-3 text-primary-foreground" />
      </div>
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-muted-foreground">{children}</p>
      </div>
    </li>)
  );
}

export function Steps({
  children
}) {
  return (
    (<ol className="space-y-4">
      {children}
    </ol>)
  );
}

