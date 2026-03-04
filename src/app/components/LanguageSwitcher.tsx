import { Globe } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';

interface LanguageSwitcherProps {
  currentLanguage: 'de' | 'en' | 'tr' | 'sr';
  onLanguageChange: (lang: 'de' | 'en' | 'tr' | 'sr') => void;
}

const languages = {
  de: 'Deutsch',
  en: 'English',
  tr: 'Türkçe',
  sr: 'Srpski',
};

export function LanguageSwitcher({ currentLanguage, onLanguageChange }: LanguageSwitcherProps) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Globe className="size-4" />
          {languages[currentLanguage]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onLanguageChange('de')}>
          Deutsch
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onLanguageChange('en')}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onLanguageChange('tr')}>
          Türkçe
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onLanguageChange('sr')}>
          Srpski
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}