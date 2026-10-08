import type * as React from 'react';

export type Tone = 'primary' | 'accent' | 'dark' | 'neutral' | 'soft';
export type Appearance = 'solid' | 'outline' | 'ghost' | 'divided';
export type Size = 'sm' | 'md' | 'lg';
export type ChipTone = 'primary' | 'success' | 'error' | 'warning' | 'neutral';
export type PaginationVariant =
  | 'basic'
  | 'arrows'
  | 'ellipsis'
  | 'edges'
  | 'compact'
  | 'icons'
  | 'outline'
  | 'pills'
  | 'text'
  | 'jump'
  | 'simple'
  | 'group'
  | 'summary';
export type PaginationLang = 'es' | 'en';


type CommonControlProps = {
  disabled?: boolean;
  name?: string;
  value?: string;
  checked?: boolean;
  'aria-label'?: string;
  'aria-labelledby'?: string;
};

export type GobButtonProps =
  React.HTMLAttributes<HTMLElement> & {
    tone?: Tone;
    appearance?: Appearance;
    size?: Size;
    loading?: boolean;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    name?: string;
    value?: string;
    'icon-only'?: boolean;
    'icon-position'?: 'left' | 'right';
    'demo-state'?: 'hover' | 'pressed';
    'aria-label'?: string;
    'aria-labelledby'?: string;
  };

export type CheckboxVariant =
  | 'basic'
  | 'labeled'
  | 'helper'
  | 'dense'
  | 'soft'
  | 'card'
  | 'pill'
  | 'tile'
  | 'complete';

export type CheckboxStatus =
  | 'default'
  | 'error'
  | 'success'
  | 'warning'
  | 'info';

export type CheckboxSize = 'sm' | 'md' | 'lg';

export type GobCheckboxProps =
  React.HTMLAttributes<HTMLElement> &
    CommonControlProps & {
      indeterminate?: boolean;
      variant?: CheckboxVariant;
      label?: string;
      description?: string;
      helper?: string;
      status?: CheckboxStatus;
      size?: CheckboxSize;
      required?: boolean;
    };

export type GobRadioProps =
  React.HTMLAttributes<HTMLElement> &
    CommonControlProps & {
      variant?: RadioVariant;
      label?: string;
      description?: string;
      helper?: string;
      status?: RadioStatus;
      size?: RadioSize;
      required?: boolean;
    };

export type RadioVariant =
  | 'basic'
  | 'labeled'
  | 'helper'
  | 'dense'
  | 'soft'
  | 'card'
  | 'pill'
  | 'tile'
  | 'complete';

export type RadioStatus =
  | 'default'
  | 'error'
  | 'success'
  | 'warning'
  | 'info';

export type RadioSize = 'sm' | 'md' | 'lg';

export type GobSwitchProps =
  React.HTMLAttributes<HTMLElement> &
    CommonControlProps & {
      variant?: SwitchVariant;
      label?: string;
      description?: string;
      helper?: string;
      status?: SwitchStatus;
      size?: SwitchSize;
      required?: boolean;
    };

export type SwitchVariant =
  | 'basic'
  | 'labeled'
  | 'helper'
  | 'dense'
  | 'soft'
  | 'card'
  | 'pill'
  | 'tile'
  | 'complete';

export type SwitchStatus =
  | 'default'
  | 'error'
  | 'success'
  | 'warning'
  | 'info';

export type SwitchSize = 'sm' | 'md' | 'lg';

export type GobChipProps =
  React.HTMLAttributes<HTMLElement> & {
    tone?: ChipTone;
    disabled?: boolean;
    dismissible?: boolean;
    'aria-label'?: string;
  };

export type DatepickerVariant =
  | 'basic'
  | 'labeled'
  | 'helper'
  | 'dense'
  | 'soft'
  | 'floating'
  | 'underline'
  | 'pill'
  | 'clearable'
  | 'range'
  | 'complete';

export type DatepickerStatus =
  | 'default'
  | 'error'
  | 'success'
  | 'warning'
  | 'info';

export type DatepickerSize = 'sm' | 'md' | 'lg';
export type DatepickerMode = 'single' | 'range';

export type GobDatepickerProps = React.HTMLAttributes<HTMLElement> & {
  variant?: DatepickerVariant;
  label?: string;
  placeholder?: string;
  helper?: string;
  value?: string;
  status?: DatepickerStatus;
  size?: DatepickerSize;
  mode?: DatepickerMode;
  min?: string;
  max?: string;
  name?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
};

export type TimepickerVariant =
  | 'basic'
  | 'labeled'
  | 'helper'
  | 'dense'
  | 'soft'
  | 'floating'
  | 'underline'
  | 'pill'
  | 'clearable'
  | 'complete';

export type TimepickerStatus =
  | 'default'
  | 'error'
  | 'success'
  | 'warning'
  | 'info';

export type TimepickerSize = 'sm' | 'md' | 'lg';

export type GobTimepickerProps = React.HTMLAttributes<HTMLElement> & {
  variant?: TimepickerVariant;
  label?: string;
  placeholder?: string;
  helper?: string;
  value?: string;
  status?: TimepickerStatus;
  size?: TimepickerSize;
  step?: number | string;
  min?: string;
  max?: string;
  name?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
};

export type FileUploadVariant =
  | 'basic'
  | 'labeled'
  | 'helper'
  | 'dense'
  | 'soft'
  | 'button'
  | 'compact'
  | 'multiple'
  | 'complete';

export type FileUploadStatus =
  | 'default'
  | 'error'
  | 'success'
  | 'warning'
  | 'info';

export type FileUploadSize = 'sm' | 'md' | 'lg';

export type GobFileUploadProps = React.HTMLAttributes<HTMLElement> & {
  variant?: FileUploadVariant;
  label?: string;
  helper?: string;
  hint?: string;
  accept?: string;
  status?: FileUploadStatus;
  size?: FileUploadSize;
  'max-size'?: string;
  'max-files'?: number | string;
  name?: string;
  multiple?: boolean;
  disabled?: boolean;
  required?: boolean;
};

export type SliderVariant =
  | 'basic'
  | 'labeled'
  | 'helper'
  | 'dense'
  | 'soft'
  | 'marks'
  | 'range'
  | 'complete'
  | 'pill'
  | 'tooltip'
  | 'segmented'
  | 'vertical'
  | 'duo'
  | 'inset';

export type SliderStatus =
  | 'default'
  | 'error'
  | 'success'
  | 'warning'
  | 'info';

export type SliderSize = 'sm' | 'md' | 'lg';

export type GobSliderProps = React.HTMLAttributes<HTMLElement> & {
  variant?: SliderVariant;
  label?: string;
  helper?: string;
  status?: SliderStatus;
  size?: SliderSize;
  min?: number | string;
  max?: number | string;
  step?: number | string;
  value?: number | string;
  unit?: string;
  name?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
};

export type SearchFieldVariant =
  | 'basic'
  | 'labeled'
  | 'helper'
  | 'dense'
  | 'soft'
  | 'floating'
  | 'underline'
  | 'pill'
  | 'clearable'
  | 'shortcut'
  | 'loading'
  | 'complete';

export type SearchFieldStatus =
  | 'default'
  | 'error'
  | 'success'
  | 'warning'
  | 'info';

export type SearchFieldSize = 'sm' | 'md' | 'lg';

export type GobSearchFieldProps = React.HTMLAttributes<HTMLElement> & {
  variant?: SearchFieldVariant;
  label?: string;
  placeholder?: string;
  helper?: string;
  value?: string;
  status?: SearchFieldStatus;
  size?: SearchFieldSize;
  shortcut?: string;
  name?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  loading?: boolean;
};

export type FormFieldVariant =
  | 'basic'
  | 'labeled'
  | 'helper'
  | 'dense'
  | 'soft'
  | 'horizontal'
  | 'stacked'
  | 'inline'
  | 'complete';

export type FormFieldStatus =
  | 'default'
  | 'error'
  | 'success'
  | 'warning'
  | 'info';

export type FormFieldSize = 'sm' | 'md' | 'lg';

export type GobFormFieldProps = React.HTMLAttributes<HTMLElement> & {
  variant?: FormFieldVariant;
  label?: string;
  helper?: string;
  hint?: string;
  status?: FormFieldStatus;
  size?: FormFieldSize;
  required?: boolean;
  disabled?: boolean;
};

export type FormVariant =
  | 'basic'
  | 'single'
  | 'dual'
  | 'triple'
  | 'stacked'
  | 'dense'
  | 'soft'
  | 'card'
  | 'sections'
  | 'complete'
  | 'outline'
  | 'rail'
  | 'inset'
  | 'flat'
  | 'wide'
  | 'split'
  | 'panel'
  | 'toolbar'
  | 'bleed'
  | 'dashboard';

export type FormGap = 'sm' | 'md' | 'lg';

export type GobFormProps = React.HTMLAttributes<HTMLElement> & {
  variant?: FormVariant;
  title?: string;
  description?: string;
  gap?: FormGap;
  columns?: 1 | 2 | 3 | '1' | '2' | '3';
};

export type TabsVariant =
  | 'basic'
  | 'underline'
  | 'pills'
  | 'soft'
  | 'vertical'
  | 'dense'
  | 'icons'
  | 'segmented'
  | 'bordered'
  | 'complete'
  | 'line'
  | 'ghost'
  | 'card'
  | 'rail'
  | 'flush'
  | 'editorial';

export type TabsSize = 'sm' | 'md' | 'lg';

export type GobTabsProps = React.HTMLAttributes<HTMLElement> & {
  variant?: TabsVariant;
  size?: TabsSize;
  value?: string;
  items?: string;
  disabled?: boolean;
};

export type StepsVariant =
  | 'basic'
  | 'numbered'
  | 'dots'
  | 'vertical'
  | 'compact'
  | 'soft'
  | 'outlined'
  | 'labeled'
  | 'progress'
  | 'complete';

export type StepsSize = 'sm' | 'md' | 'lg';

export type GobStepsProps = React.HTMLAttributes<HTMLElement> & {
  variant?: StepsVariant;
  size?: StepsSize;
  value?: string;
  items?: string;
  disabled?: boolean;
};

export type NavMenuVariant =
  | 'basic'
  | 'horizontal'
  | 'vertical'
  | 'pills'
  | 'underline'
  | 'soft'
  | 'dense'
  | 'icons'
  | 'bordered'
  | 'complete'
  | 'rail'
  | 'ghost'
  | 'dock'
  | 'sidebar'
  | 'floating';

export type NavMenuSize = 'sm' | 'md' | 'lg';

export type GobNavMenuProps = React.HTMLAttributes<HTMLElement> & {
  variant?: NavMenuVariant;
  size?: NavMenuSize;
  value?: string;
  items?: string;
  disabled?: boolean;
};

export type PaginationBarVariant =
  | 'basic'
  | 'summary'
  | 'dense'
  | 'soft'
  | 'bordered'
  | 'compact'
  | 'detailed'
  | 'toolbar'
  | 'split'
  | 'complete';

export type PaginationBarSize = 'sm' | 'md' | 'lg';

export type GobPaginationBarProps = React.HTMLAttributes<HTMLElement> & {
  variant?: PaginationBarVariant;
  size?: PaginationBarSize;
  page?: number | string;
  total?: number | string;
  'page-size'?: number | string;
  summary?: string;
  disabled?: boolean;
};

export type LinkVariant =
  | 'basic'
  | 'inline'
  | 'subtle'
  | 'underline'
  | 'strong'
  | 'soft'
  | 'external'
  | 'nav'
  | 'muted'
  | 'complete';

export type LinkTone = 'primary' | 'neutral' | 'success' | 'warning' | 'danger';

export type LinkSize = 'sm' | 'md' | 'lg';

export type GobLinkProps = React.HTMLAttributes<HTMLElement> & {
  variant?: LinkVariant;
  tone?: LinkTone;
  size?: LinkSize;
  href?: string;
  label?: string;
  external?: boolean;
  disabled?: boolean;
};

export type SegmentedVariant =
  | 'basic'
  | 'pills'
  | 'soft'
  | 'underline'
  | 'dense'
  | 'icons'
  | 'bordered'
  | 'ghost'
  | 'block'
  | 'complete';

export type SegmentedSize = 'sm' | 'md' | 'lg';

export type GobSegmentedProps = React.HTMLAttributes<HTMLElement> & {
  variant?: SegmentedVariant;
  size?: SegmentedSize;
  value?: string;
  items?: string;
  disabled?: boolean;
};

export type IconButtonVariant =
  | 'basic'
  | 'solid'
  | 'soft'
  | 'outline'
  | 'ghost'
  | 'danger'
  | 'success'
  | 'tonal'
  | 'square'
  | 'complete';

export type IconButtonSize = 'sm' | 'md' | 'lg';

export type GobIconButtonProps = React.HTMLAttributes<HTMLElement> & {
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  icon?: string;
  label?: string;
  disabled?: boolean;
  loading?: boolean;
};

export type ButtonGroupVariant =
  | 'basic'
  | 'solid'
  | 'outline'
  | 'soft'
  | 'ghost'
  | 'split'
  | 'vertical'
  | 'dense'
  | 'bordered'
  | 'complete';

export type ButtonGroupSize = 'sm' | 'md' | 'lg';

export type GobButtonGroupProps = React.HTMLAttributes<HTMLElement> & {
  variant?: ButtonGroupVariant;
  size?: ButtonGroupSize;
  items?: string;
  disabled?: boolean;
};

export type DropdownMenuVariant =
  | 'basic'
  | 'solid'
  | 'soft'
  | 'outline'
  | 'ghost'
  | 'dense'
  | 'icons'
  | 'danger'
  | 'bordered'
  | 'complete';

export type DropdownMenuSize = 'sm' | 'md' | 'lg';

export type GobDropdownMenuProps = React.HTMLAttributes<HTMLElement> & {
  variant?: DropdownMenuVariant;
  size?: DropdownMenuSize;
  label?: string;
  items?: string;
  open?: boolean;
  disabled?: boolean;
};

export type SplitButtonVariant =
  | 'basic'
  | 'solid'
  | 'soft'
  | 'outline'
  | 'ghost'
  | 'dense'
  | 'tonal'
  | 'danger'
  | 'bordered'
  | 'complete';

export type SplitButtonSize = 'sm' | 'md' | 'lg';

export type GobSplitButtonProps = React.HTMLAttributes<HTMLElement> & {
  variant?: SplitButtonVariant;
  size?: SplitButtonSize;
  label?: string;
  items?: string;
  open?: boolean;
  disabled?: boolean;
};

export type FabVariant =
  | 'basic'
  | 'solid'
  | 'soft'
  | 'tonal'
  | 'extended'
  | 'mini'
  | 'outline'
  | 'danger'
  | 'success'
  | 'complete'
  | 'actions';

export type FabSize = 'sm' | 'md' | 'lg';

export type GobFabProps = React.HTMLAttributes<HTMLElement> & {
  variant?: FabVariant;
  size?: FabSize;
  icon?: string;
  label?: string;
  actions?: string;
  open?: boolean;
  disabled?: boolean;
};

export type AlertVariant =
  | 'basic'
  | 'soft'
  | 'outline'
  | 'solid'
  | 'banner'
  | 'dense'
  | 'inline'
  | 'bordered'
  | 'dismissible'
  | 'complete';

export type AlertTone = 'info' | 'success' | 'warning' | 'danger' | 'neutral';

export type GobAlertProps = React.HTMLAttributes<HTMLElement> & {
  variant?: AlertVariant;
  tone?: AlertTone;
  title?: string;
  description?: string;
  action?: string;
  dismissible?: boolean;
  hidden?: boolean;
};

export type ToastVariant =
  | 'basic'
  | 'soft'
  | 'solid'
  | 'outline'
  | 'dense'
  | 'action'
  | 'progress'
  | 'stacked'
  | 'compact'
  | 'complete';

export type ToastTone = 'info' | 'success' | 'warning' | 'danger' | 'neutral';

export type GobToastProps = React.HTMLAttributes<HTMLElement> & {
  variant?: ToastVariant;
  tone?: ToastTone;
  title?: string;
  description?: string;
  action?: string;
  dismissible?: boolean;
  duration?: number | string;
  open?: boolean;
};

export type BannerVariant =
  | 'basic'
  | 'soft'
  | 'solid'
  | 'outline'
  | 'dense'
  | 'promo'
  | 'sticky'
  | 'centered'
  | 'split'
  | 'complete';

export type BannerTone =
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
  | 'neutral'
  | 'brand';

export type GobBannerProps = React.HTMLAttributes<HTMLElement> & {
  variant?: BannerVariant;
  tone?: BannerTone;
  title?: string;
  description?: string;
  action?: string;
  dismissible?: boolean;
  hidden?: boolean;
};

export type BadgeVariant =
  | 'basic'
  | 'soft'
  | 'solid'
  | 'outline'
  | 'dot'
  | 'count'
  | 'pill'
  | 'square'
  | 'status'
  | 'complete';

export type BadgeTone =
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'neutral';

export type BadgeSize = 'sm' | 'md' | 'lg';

export type GobBadgeProps = React.HTMLAttributes<HTMLElement> & {
  variant?: BadgeVariant;
  tone?: BadgeTone;
  size?: BadgeSize;
  label?: string;
  count?: number | string;
  max?: number | string;
};

export type TagVariant =
  | 'basic'
  | 'soft'
  | 'outline'
  | 'solid'
  | 'filter'
  | 'removable'
  | 'dense'
  | 'icon'
  | 'brand'
  | 'complete';

export type TagTone =
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'neutral';

export type TagSize = 'sm' | 'md' | 'lg';

export type GobTagProps = React.HTMLAttributes<HTMLElement> & {
  variant?: TagVariant;
  tone?: TagTone;
  size?: TagSize;
  label?: string;
  icon?: string;
  removable?: boolean;
  disabled?: boolean;
};

export type TooltipVariant =
  | 'basic'
  | 'soft'
  | 'solid'
  | 'outline'
  | 'dense'
  | 'rich'
  | 'inverse'
  | 'brand'
  | 'success'
  | 'complete';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export type GobTooltipProps = React.HTMLAttributes<HTMLElement> & {
  variant?: TooltipVariant;
  placement?: TooltipPlacement;
  label?: string;
  trigger?: string;
  open?: boolean;
};

export type HelperTextVariant =
  | 'basic'
  | 'hint'
  | 'error'
  | 'success'
  | 'warning'
  | 'info'
  | 'dense'
  | 'icon'
  | 'counter'
  | 'complete';

export type HelperTextTone =
  | 'neutral'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger';

export type GobHelperTextProps = React.HTMLAttributes<HTMLElement> & {
  variant?: HelperTextVariant;
  tone?: HelperTextTone;
  label?: string;
  count?: number | string;
  max?: number | string;
};

export type ModalVariant =
  | 'basic'
  | 'confirm'
  | 'form'
  | 'danger'
  | 'success'
  | 'dense'
  | 'center'
  | 'sheet'
  | 'wide'
  | 'complete';

export type ModalSize = 'sm' | 'md' | 'lg';

export type GobModalProps = React.HTMLAttributes<HTMLElement> & {
  variant?: ModalVariant;
  size?: ModalSize;
  title?: string;
  description?: string;
  body?: string;
  open?: boolean;
  preview?: boolean;
  'confirm-label'?: string;
  'cancel-label'?: string;
};

export type DrawerVariant =
  | 'basic'
  | 'filters'
  | 'detail'
  | 'form'
  | 'danger'
  | 'dense'
  | 'left'
  | 'right'
  | 'wide'
  | 'complete';

export type DrawerSide = 'right' | 'left';
export type DrawerSize = 'sm' | 'md' | 'lg';

export type GobDrawerProps = React.HTMLAttributes<HTMLElement> & {
  variant?: DrawerVariant;
  side?: DrawerSide;
  size?: DrawerSize;
  title?: string;
  description?: string;
  body?: string;
  open?: boolean;
  preview?: boolean;
  'confirm-label'?: string;
  'cancel-label'?: string;
};

export type PopoverVariant =
  | 'basic'
  | 'soft'
  | 'solid'
  | 'outline'
  | 'dense'
  | 'menu'
  | 'rich'
  | 'brand'
  | 'success'
  | 'complete';

export type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right';

export type GobPopoverProps = React.HTMLAttributes<HTMLElement> & {
  variant?: PopoverVariant;
  placement?: PopoverPlacement;
  title?: string;
  description?: string;
  trigger?: string;
  open?: boolean;
};

export type SheetVariant =
  | 'basic'
  | 'actions'
  | 'form'
  | 'danger'
  | 'success'
  | 'dense'
  | 'peek'
  | 'tall'
  | 'brand'
  | 'complete';

export type GobSheetProps = React.HTMLAttributes<HTMLElement> & {
  variant?: SheetVariant;
  title?: string;
  description?: string;
  body?: string;
  open?: boolean;
  preview?: boolean;
  'confirm-label'?: string;
  'cancel-label'?: string;
};

export type ConfirmDialogVariant =
  | 'basic'
  | 'danger'
  | 'warning'
  | 'success'
  | 'info'
  | 'dense'
  | 'soft'
  | 'outline'
  | 'brand'
  | 'complete';

export type GobConfirmDialogProps = React.HTMLAttributes<HTMLElement> & {
  variant?: ConfirmDialogVariant;
  title?: string;
  description?: string;
  body?: string;
  open?: boolean;
  preview?: boolean;
  'confirm-label'?: string;
  'cancel-label'?: string;
};

export type CardVariant =
  | 'basic'
  | 'soft'
  | 'outline'
  | 'elevated'
  | 'media'
  | 'action'
  | 'dense'
  | 'stat'
  | 'horizontal'
  | 'complete';

export type GobCardProps = React.HTMLAttributes<HTMLElement> & {
  variant?: CardVariant;
  title?: string;
  description?: string;
  body?: string;
  meta?: string;
  'action-label'?: string;
};

export type AvatarVariant =
  | 'basic'
  | 'soft'
  | 'solid'
  | 'outline'
  | 'square'
  | 'status'
  | 'group'
  | 'dense'
  | 'brand'
  | 'complete';

export type AvatarSize = 'sm' | 'md' | 'lg';

export type AvatarTone =
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'neutral';

export type GobAvatarProps = React.HTMLAttributes<HTMLElement> & {
  variant?: AvatarVariant;
  size?: AvatarSize;
  tone?: AvatarTone;
  name?: string;
  initials?: string;
  status?: string;
};

export type UserMenuVariant =
  | 'basic'
  | 'soft'
  | 'compact'
  | 'elevated'
  | 'dense'
  | 'outline'
  | 'brand'
  | 'status'
  | 'wide'
  | 'complete';

export type GobUserMenuProps = React.HTMLAttributes<HTMLElement> & {
  variant?: UserMenuVariant;
  name?: string;
  role?: string;
  email?: string;
  initials?: string;
  open?: boolean;
};

export type AccordionVariant =
  | 'basic'
  | 'soft'
  | 'outline'
  | 'dense'
  | 'flush'
  | 'separated'
  | 'brand'
  | 'faq'
  | 'single'
  | 'complete';

export type GobAccordionProps = React.HTMLAttributes<HTMLElement> & {
  variant?: AccordionVariant;
  items?: string;
  'open-index'?: number | string;
};

export type ContentSectionVariant =
  | 'basic'
  | 'soft'
  | 'split'
  | 'centered'
  | 'dense'
  | 'outline'
  | 'steps'
  | 'feature'
  | 'brand'
  | 'complete';

export type GobContentSectionProps = React.HTMLAttributes<HTMLElement> & {
  variant?: ContentSectionVariant;
  eyebrow?: string;
  title?: string;
  description?: string;
  body?: string;
  'action-label'?: string;
};

export type HeroBlockVariant =
  | 'basic'
  | 'soft'
  | 'split'
  | 'centered'
  | 'dense'
  | 'outline'
  | 'compact'
  | 'feature'
  | 'brand'
  | 'complete';

export type GobHeroBlockProps = React.HTMLAttributes<HTMLElement> & {
  variant?: HeroBlockVariant;
  eyebrow?: string;
  title?: string;
  description?: string;
  'primary-label'?: string;
  'secondary-label'?: string;
};

export type FooterVariant =
  | 'basic'
  | 'soft'
  | 'dense'
  | 'outline'
  | 'columns'
  | 'legal'
  | 'compact'
  | 'wide'
  | 'brand'
  | 'complete';

export type GobFooterProps = React.HTMLAttributes<HTMLElement> & {
  variant?: FooterVariant;
  brand?: string;
  tagline?: string;
  links?: string;
  legal?: string;
};

export type TableOfContentsVariant =
  | 'basic'
  | 'soft'
  | 'dense'
  | 'outline'
  | 'numbered'
  | 'sticky'
  | 'minimal'
  | 'rail'
  | 'brand'
  | 'complete';

export type GobTableOfContentsProps = React.HTMLAttributes<HTMLElement> & {
  variant?: TableOfContentsVariant;
  title?: string;
  items?: string;
  active?: number | string;
};

export type CodeBlockVariant =
  | 'basic'
  | 'soft'
  | 'dense'
  | 'outline'
  | 'terminal'
  | 'numbered'
  | 'compact'
  | 'wide'
  | 'brand'
  | 'complete';

export type GobCodeBlockProps = React.HTMLAttributes<HTMLElement> & {
  variant?: CodeBlockVariant;
  language?: string;
  filename?: string;
  code?: string;
};

export type StatStripVariant =
  | 'basic'
  | 'soft'
  | 'dense'
  | 'outline'
  | 'cards'
  | 'inline'
  | 'centered'
  | 'wide'
  | 'brand'
  | 'complete';

export type GobStatStripProps = React.HTMLAttributes<HTMLElement> & {
  variant?: StatStripVariant;
  items?: string;
};

export type NotificationCenterVariant =
  | 'basic'
  | 'soft'
  | 'dense'
  | 'outline'
  | 'unread'
  | 'compact'
  | 'panel'
  | 'feed'
  | 'brand'
  | 'complete';

export type GobNotificationCenterProps = React.HTMLAttributes<HTMLElement> & {
  variant?: NotificationCenterVariant;
  title?: string;
  items?: string;
};

export type CommandPaletteVariant =
  | 'basic'
  | 'soft'
  | 'dense'
  | 'outline'
  | 'grouped'
  | 'compact'
  | 'wide'
  | 'spotlight'
  | 'brand'
  | 'complete';

export type GobCommandPaletteProps = React.HTMLAttributes<HTMLElement> & {
  variant?: CommandPaletteVariant;
  placeholder?: string;
  query?: string;
  items?: string;
};

export type GobPaginationProps =
  React.HTMLAttributes<HTMLElement> & {
    page?: number | string;
    total?: number | string;
    variant?: PaginationVariant;
    tone?: Tone;
    size?: Size;
    lang?: PaginationLang;
    disabled?: boolean;
    'sibling-count'?: number | string;
    'boundary-count'?: number | string;
    'page-size'?: number | string;
    'aria-label'?: string;
  };

export type GobAppShellProps = React.HTMLAttributes<HTMLElement> & {
  collapsed?: boolean;
  dense?: boolean;
  'hide-topbar'?: boolean;
  'sticky-topbar'?: boolean | 'true' | 'false';
};

export type SidebarVariant =
  | 'basic'
  | 'collapsed'
  | 'brand'
  | 'grouped'
  | 'user'
  | 'dense'
  | 'badges';

export type GobSidebarProps = React.HTMLAttributes<HTMLElement> & {
  variant?: SidebarVariant;
  tone?: Tone;
  collapsed?: boolean;
};

export type TopbarVariant =
  | 'basic'
  | 'search'
  | 'actions'
  | 'notifications'
  | 'breadcrumb'
  | 'dense'
  | 'complete';

export type GobTopbarProps = React.HTMLAttributes<HTMLElement> & {
  variant?: TopbarVariant;
  tone?: Tone;
  sticky?: boolean | 'true' | 'false';
};

export type PageHeaderVariant =
  | 'basic'
  | 'description'
  | 'breadcrumb'
  | 'actions'
  | 'status'
  | 'dense'
  | 'complete';

export type PageHeaderSurface = 'plain' | 'panel';

export type GobPageHeaderProps = React.HTMLAttributes<HTMLElement> & {
  variant?: PageHeaderVariant;
  surface?: PageHeaderSurface;
};

export type BreadcrumbVariant =
  | 'basic'
  | 'chevron'
  | 'icons'
  | 'collapsed'
  | 'underline'
  | 'dense'
  | 'complete'
  | 'dot'
  | 'arrow'
  | 'back';

export type GobBreadcrumbProps = React.HTMLAttributes<HTMLElement> & {
  variant?: BreadcrumbVariant;
  tone?: Tone;
};

export type ContainerVariant =
  | 'basic'
  | 'narrow'
  | 'wide'
  | 'full'
  | 'flush'
  | 'padded'
  | 'prose';

export type GobContainerProps = React.HTMLAttributes<HTMLElement> & {
  variant?: ContainerVariant;
  radius?: boolean | 'true' | 'false';
  shadow?: boolean | 'true' | 'false';
};

export type GridVariant =
  | 'basic'
  | 'three'
  | 'four'
  | 'dense'
  | 'loose'
  | 'split'
  | 'auto';

export type GridGap = 'sm' | 'md' | 'lg';

export type GobGridProps = React.HTMLAttributes<HTMLElement> & {
  variant?: GridVariant;
  gap?: GridGap;
};

export type DividerVariant =
  | 'basic'
  | 'vertical'
  | 'dashed'
  | 'dotted'
  | 'thick'
  | 'label'
  | 'inset';

export type DividerTone = 'primary' | 'accent';

export type GobDividerProps = React.HTMLAttributes<HTMLElement> & {
  variant?: DividerVariant;
  tone?: DividerTone | Tone;
};

export type SpacerVariant =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | 'horizontal'
  | 'section';

export type GobSpacerProps = React.HTMLAttributes<HTMLElement> & {
  variant?: SpacerVariant;
};

export type KpiVariant =
  | 'basic'
  | 'trend-up'
  | 'trend-down'
  | 'period'
  | 'icon'
  | 'dense'
  | 'complete'
  | 'stripe'
  | 'filled'
  | 'horizontal'
  | 'compare'
  | 'progress'
  | 'elevated'
  | 'sparkline'
  | 'ring'
  | 'split'
  | 'live';

export type KpiTone = Tone;

export type GobKpiCardProps = React.HTMLAttributes<HTMLElement> & {
  variant?: KpiVariant;
  tone?: KpiTone | Tone;
  progress?: number | string;
};

export type ChartCardVariant =
  | 'basic'
  | 'legend'
  | 'actions'
  | 'period'
  | 'side-legend'
  | 'dense'
  | 'elevated'
  | 'footer'
  | 'stripe'
  | 'framed'
  | 'toolbar'
  | 'minimal'
  | 'compare'
  | 'funnel'
  | 'treemap'
  | 'rose'
  | 'waterfall';

export type ChartCardTone = Tone;

export type GobChartCardProps = React.HTMLAttributes<HTMLElement> & {
  variant?: ChartCardVariant;
  tone?: ChartCardTone | Tone;
};

export type TableVariant =
  | 'basic'
  | 'striped'
  | 'bordered'
  | 'dense'
  | 'selectable'
  | 'sortable'
  | 'sticky'
  | 'status'
  | 'actions'
  | 'empty';

export type TableTone = Tone;

export type GobTableProps = React.HTMLAttributes<HTMLElement> & {
  variant?: TableVariant;
  tone?: TableTone | Tone;
};

export type DataGridVariant =
  | 'filters'
  | 'frozen-left'
  | 'frozen-right'
  | 'bulk'
  | 'paginated'
  | 'expandable'
  | 'column-filter'
  | 'wide'
  | 'toolbar'
  | 'grouped'
  | 'card-rows'
  | 'assignees'
  | 'progress'
  | 'tags'
  | 'live'
  | 'financial'
  | 'alert'
  | 'skeleton';

export type DataGridTone = Tone;

export type GobDataGridProps = React.HTMLAttributes<HTMLElement> & {
  variant?: DataGridVariant;
  tone?: DataGridTone | Tone;
};

export type FilterBarVariant =
  | 'basic'
  | 'search'
  | 'chips'
  | 'dense'
  | 'with-actions'
  | 'complete'
  | 'dates'
  | 'tags'
  | 'count'
  | 'region'
  | 'advanced';

export type FilterBarTone = Tone;

export type GobFilterBarProps = React.HTMLAttributes<HTMLElement> & {
  variant?: FilterBarVariant;
  tone?: FilterBarTone | Tone;
};

export type ToolbarVariant =
  | 'basic'
  | 'actions'
  | 'density'
  | 'refresh'
  | 'complete'
  | 'search'
  | 'views'
  | 'print'
  | 'bulk'
  | 'icons';

export type ToolbarTone = Tone;

export type GobToolbarProps = React.HTMLAttributes<HTMLElement> & {
  variant?: ToolbarVariant;
  tone?: ToolbarTone | Tone;
  dense?: boolean | 'true' | 'false';
};

export type ListVariant =
  | 'basic'
  | 'avatar'
  | 'meta'
  | 'actions'
  | 'dense'
  | 'selectable'
  | 'complete'
  | 'icon'
  | 'nav'
  | 'grouped'
  | 'status'
  | 'empty';

export type ListTone = Tone;

export type GobListProps = React.HTMLAttributes<HTMLElement> & {
  variant?: ListVariant;
  tone?: ListTone | Tone;
};

export type TimelineVariant =
  | 'basic'
  | 'icons'
  | 'status'
  | 'dense'
  | 'alternating'
  | 'cards'
  | 'complete'
  | 'numbered'
  | 'dates'
  | 'milestones'
  | 'horizontal'
  | 'grouped';

export type TimelineTone = Tone;

export type GobTimelineProps = React.HTMLAttributes<HTMLElement> & {
  variant?: TimelineVariant;
  tone?: TimelineTone | Tone;
};

export type ActivityFeedVariant =
  | 'basic'
  | 'avatar'
  | 'actions'
  | 'dense'
  | 'grouped'
  | 'unread'
  | 'complete'
  | 'status'
  | 'icon'
  | 'cards'
  | 'mentions'
  | 'files'
  | 'empty';

export type ActivityFeedTone = Tone;

export type GobActivityFeedProps = React.HTMLAttributes<HTMLElement> & {
  variant?: ActivityFeedVariant;
  tone?: ActivityFeedTone | Tone;
};

export type EmptyStateVariant =
  | 'basic'
  | 'icon'
  | 'actions'
  | 'search'
  | 'error'
  | 'dense'
  | 'complete'
  | 'filter'
  | 'permission'
  | 'success'
  | 'upload'
  | 'inline';

export type EmptyStateTone = Tone;

export type GobEmptyStateProps = React.HTMLAttributes<HTMLElement> & {
  variant?: EmptyStateVariant;
  tone?: EmptyStateTone | Tone;
};

export type SkeletonVariant =
  | 'text'
  | 'avatar'
  | 'card'
  | 'table'
  | 'list'
  | 'media'
  | 'kpi'
  | 'form'
  | 'dense'
  | 'complete';

export type GobSkeletonProps = React.HTMLAttributes<HTMLElement> & {
  variant?: SkeletonVariant;
  rows?: number | string;
  animated?: boolean | string;
};

export type ProgressVariant =
  | 'bar'
  | 'labeled'
  | 'thin'
  | 'thick'
  | 'ring'
  | 'steps'
  | 'segmented'
  | 'indeterminate'
  | 'stacked'
  | 'complete';

export type ProgressStatus =
  | 'default'
  | 'info'
  | 'warning'
  | 'success'
  | 'danger';

export type GobProgressProps = React.HTMLAttributes<HTMLElement> & {
  variant?: ProgressVariant;
  value?: number | string;
  max?: number | string;
  label?: string;
  status?: ProgressStatus;
  steps?: number | string;
};

export type SpinnerVariant =
  | 'ring'
  | 'dual'
  | 'dots'
  | 'pulse'
  | 'bars'
  | 'button'
  | 'inline'
  | 'page'
  | 'overlay'
  | 'complete'
  | 'orbit'
  | 'arc'
  | 'dash'
  | 'comet'
  | 'petals'
  | 'metro'
  | 'wave'
  | 'radar'
  | 'infinity'
  | 'morph';

export type SpinnerSize = 'sm' | 'md' | 'lg';

export type SpinnerStatus =
  | 'default'
  | 'info'
  | 'warning'
  | 'success'
  | 'danger';

export type GobSpinnerProps = React.HTMLAttributes<HTMLElement> & {
  variant?: SpinnerVariant;
  label?: string;
  size?: SpinnerSize;
  status?: SpinnerStatus;
};

export type InputVariant =
  | 'basic'
  | 'labeled'
  | 'helper'
  | 'icon'
  | 'search'
  | 'password'
  | 'prefix'
  | 'suffix'
  | 'dense'
  | 'complete'
  | 'floating'
  | 'underline'
  | 'pill'
  | 'clearable'
  | 'code'
  | 'soft';

export type InputStatus =
  | 'default'
  | 'error'
  | 'success'
  | 'warning'
  | 'info';

export type InputSize = 'sm' | 'md' | 'lg';

export type GobInputProps = React.HTMLAttributes<HTMLElement> & {
  variant?: InputVariant;
  label?: string;
  placeholder?: string;
  helper?: string;
  value?: string;
  type?: string;
  status?: InputStatus;
  size?: InputSize;
  name?: string;
  lead?: string;
  suffix?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
};

export type TextareaVariant =
  | 'basic'
  | 'labeled'
  | 'helper'
  | 'counter'
  | 'auto'
  | 'dense'
  | 'filled'
  | 'soft'
  | 'floating'
  | 'resize'
  | 'code'
  | 'complete';

export type TextareaStatus =
  | 'default'
  | 'error'
  | 'success'
  | 'warning'
  | 'info';

export type TextareaSize = 'sm' | 'md' | 'lg';

export type GobTextareaProps = React.HTMLAttributes<HTMLElement> & {
  variant?: TextareaVariant;
  label?: string;
  placeholder?: string;
  helper?: string;
  value?: string;
  status?: TextareaStatus;
  size?: TextareaSize;
  name?: string;
  rows?: number | string;
  maxlength?: number | string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
};

export type SelectVariant =
  | 'basic'
  | 'labeled'
  | 'helper'
  | 'dense'
  | 'filled'
  | 'soft'
  | 'floating'
  | 'pill'
  | 'icon'
  | 'group'
  | 'multiple'
  | 'search'
  | 'underline'
  | 'ghost'
  | 'split'
  | 'complete';

export type SelectStatus =
  | 'default'
  | 'error'
  | 'success'
  | 'warning'
  | 'info';

export type SelectSize = 'sm' | 'md' | 'lg';

export type GobSelectProps = React.HTMLAttributes<HTMLElement> & {
  variant?: SelectVariant;
  label?: string;
  placeholder?: string;
  helper?: string;
  value?: string;
  status?: SelectStatus;
  size?: SelectSize;
  name?: string;
  options?: string;
  disabled?: boolean;
  required?: boolean;
};

export type ComboboxVariant =
  | 'basic'
  | 'labeled'
  | 'helper'
  | 'dense'
  | 'filled'
  | 'soft'
  | 'floating'
  | 'pill'
  | 'icon'
  | 'create'
  | 'loading'
  | 'complete';

export type ComboboxStatus =
  | 'default'
  | 'error'
  | 'success'
  | 'warning'
  | 'info';

export type ComboboxSize = 'sm' | 'md' | 'lg';

export type GobComboboxProps = React.HTMLAttributes<HTMLElement> & {
  variant?: ComboboxVariant;
  label?: string;
  placeholder?: string;
  helper?: string;
  value?: string;
  status?: ComboboxStatus;
  size?: ComboboxSize;
  name?: string;
  options?: string;
  disabled?: boolean;
  required?: boolean;
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'gob-button': React.DetailedHTMLProps<GobButtonProps, HTMLElement>;
      'gob-checkbox': React.DetailedHTMLProps<GobCheckboxProps, HTMLElement>;
      'gob-radio': React.DetailedHTMLProps<GobRadioProps, HTMLElement>;
      'gob-switch': React.DetailedHTMLProps<GobSwitchProps, HTMLElement>;
      'gob-chip': React.DetailedHTMLProps<GobChipProps, HTMLElement>;
      'gob-pagination': React.DetailedHTMLProps<GobPaginationProps, HTMLElement>;
      'gob-app-shell': React.DetailedHTMLProps<GobAppShellProps, HTMLElement>;
      'gob-sidebar': React.DetailedHTMLProps<GobSidebarProps, HTMLElement>;
      'gob-topbar': React.DetailedHTMLProps<GobTopbarProps, HTMLElement>;
      'gob-page-header': React.DetailedHTMLProps<GobPageHeaderProps, HTMLElement>;
      'gob-breadcrumb': React.DetailedHTMLProps<GobBreadcrumbProps, HTMLElement>;
      'gob-container': React.DetailedHTMLProps<GobContainerProps, HTMLElement>;
      'gob-grid': React.DetailedHTMLProps<GobGridProps, HTMLElement>;
      'gob-divider': React.DetailedHTMLProps<GobDividerProps, HTMLElement>;
      'gob-spacer': React.DetailedHTMLProps<GobSpacerProps, HTMLElement>;
      'gob-kpi-card': React.DetailedHTMLProps<GobKpiCardProps, HTMLElement>;
      'gob-chart-card': React.DetailedHTMLProps<GobChartCardProps, HTMLElement>;
      'gob-table': React.DetailedHTMLProps<GobTableProps, HTMLElement>;
      'gob-data-grid': React.DetailedHTMLProps<GobDataGridProps, HTMLElement>;
      'gob-filter-bar': React.DetailedHTMLProps<GobFilterBarProps, HTMLElement>;
      'gob-toolbar': React.DetailedHTMLProps<GobToolbarProps, HTMLElement>;
      'gob-list': React.DetailedHTMLProps<GobListProps, HTMLElement>;
      'gob-timeline': React.DetailedHTMLProps<GobTimelineProps, HTMLElement>;
      'gob-activity-feed': React.DetailedHTMLProps<
        GobActivityFeedProps,
        HTMLElement
      >;
      'gob-empty-state': React.DetailedHTMLProps<GobEmptyStateProps, HTMLElement>;
      'gob-skeleton': React.DetailedHTMLProps<GobSkeletonProps, HTMLElement>;
      'gob-progress': React.DetailedHTMLProps<GobProgressProps, HTMLElement>;
      'gob-spinner': React.DetailedHTMLProps<GobSpinnerProps, HTMLElement>;
      'gob-input': React.DetailedHTMLProps<GobInputProps, HTMLElement>;
      'gob-textarea': React.DetailedHTMLProps<GobTextareaProps, HTMLElement>;
      'gob-select': React.DetailedHTMLProps<GobSelectProps, HTMLElement>;
      'gob-combobox': React.DetailedHTMLProps<GobComboboxProps, HTMLElement>;
      'gob-datepicker': React.DetailedHTMLProps<GobDatepickerProps, HTMLElement>;
      'gob-timepicker': React.DetailedHTMLProps<GobTimepickerProps, HTMLElement>;
      'gob-file-upload': React.DetailedHTMLProps<GobFileUploadProps, HTMLElement>;
      'gob-slider': React.DetailedHTMLProps<GobSliderProps, HTMLElement>;
      'gob-search-field': React.DetailedHTMLProps<GobSearchFieldProps, HTMLElement>;
      'gob-form-field': React.DetailedHTMLProps<GobFormFieldProps, HTMLElement>;
      'gob-form': React.DetailedHTMLProps<GobFormProps, HTMLElement>;
      'gob-tabs': React.DetailedHTMLProps<GobTabsProps, HTMLElement>;
      'gob-steps': React.DetailedHTMLProps<GobStepsProps, HTMLElement>;
      'gob-nav-menu': React.DetailedHTMLProps<GobNavMenuProps, HTMLElement>;
      'gob-pagination-bar': React.DetailedHTMLProps<
        GobPaginationBarProps,
        HTMLElement
      >;
      'gob-link': React.DetailedHTMLProps<GobLinkProps, HTMLElement>;
      'gob-segmented': React.DetailedHTMLProps<GobSegmentedProps, HTMLElement>;
      'gob-icon-button': React.DetailedHTMLProps<
        GobIconButtonProps,
        HTMLElement
      >;
      'gob-button-group': React.DetailedHTMLProps<
        GobButtonGroupProps,
        HTMLElement
      >;
      'gob-dropdown-menu': React.DetailedHTMLProps<
        GobDropdownMenuProps,
        HTMLElement
      >;
      'gob-split-button': React.DetailedHTMLProps<
        GobSplitButtonProps,
        HTMLElement
      >;
      'gob-fab': React.DetailedHTMLProps<GobFabProps, HTMLElement>;
      'gob-alert': React.DetailedHTMLProps<GobAlertProps, HTMLElement>;
      'gob-toast': React.DetailedHTMLProps<GobToastProps, HTMLElement>;
      'gob-banner': React.DetailedHTMLProps<GobBannerProps, HTMLElement>;
      'gob-badge': React.DetailedHTMLProps<GobBadgeProps, HTMLElement>;
      'gob-tag': React.DetailedHTMLProps<GobTagProps, HTMLElement>;
      'gob-tooltip': React.DetailedHTMLProps<GobTooltipProps, HTMLElement>;
      'gob-helper-text': React.DetailedHTMLProps<
        GobHelperTextProps,
        HTMLElement
      >;
      'gob-modal': React.DetailedHTMLProps<GobModalProps, HTMLElement>;
      'gob-drawer': React.DetailedHTMLProps<GobDrawerProps, HTMLElement>;
      'gob-popover': React.DetailedHTMLProps<GobPopoverProps, HTMLElement>;
      'gob-sheet': React.DetailedHTMLProps<GobSheetProps, HTMLElement>;
      'gob-confirm-dialog': React.DetailedHTMLProps<
        GobConfirmDialogProps,
        HTMLElement
      >;
      'gob-card': React.DetailedHTMLProps<GobCardProps, HTMLElement>;
      'gob-avatar': React.DetailedHTMLProps<GobAvatarProps, HTMLElement>;
      'gob-user-menu': React.DetailedHTMLProps<GobUserMenuProps, HTMLElement>;
      'gob-accordion': React.DetailedHTMLProps<GobAccordionProps, HTMLElement>;
      'gob-content-section': React.DetailedHTMLProps<
        GobContentSectionProps,
        HTMLElement
      >;
      'gob-hero-block': React.DetailedHTMLProps<GobHeroBlockProps, HTMLElement>;
      'gob-footer': React.DetailedHTMLProps<GobFooterProps, HTMLElement>;
      'gob-table-of-contents': React.DetailedHTMLProps<
        GobTableOfContentsProps,
        HTMLElement
      >;
      'gob-code-block': React.DetailedHTMLProps<GobCodeBlockProps, HTMLElement>;
      'gob-stat-strip': React.DetailedHTMLProps<GobStatStripProps, HTMLElement>;
      'gob-notification-center': React.DetailedHTMLProps<
        GobNotificationCenterProps,
        HTMLElement
      >;
      'gob-command-palette': React.DetailedHTMLProps<
        GobCommandPaletteProps,
        HTMLElement
      >;
    }
  }
}

export {};
