import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { convertToBoolean } from '../../../utils/util';
import { PoColorPaletteEnum } from '../../../enums/po-color-palette.enum';

const poTagColors = (<any>Object).values(PoColorPaletteEnum);

/**
 * @docsPrivate
 *
 * @description
 *
 * Componente responsável por manipular os botões de aba.
 */
@Component({
  selector: 'po-tab-button',
  templateUrl: './po-tab-button.component.html'
})
export class PoTabButtonComponent implements OnChanges {
  // Desabilita o botão
  @Input('p-disabled') disabled: boolean;

  // Identificador do componente
  @Input('p-id') id: string;

  // Rótulo do botão
  @Input('p-label') label: string;

  // Diminui o tamanho do botão
  @Input('p-small') small: boolean;

  // Função sera emitida quando a tab ficar ativada
  @Output('p-activated') activated = new EventEmitter();

  // Função sera emitida quando a tab ficar desabilitada ou escondida
  @Output('p-change-state') changeState = new EventEmitter();

  // Método recebido do usuário para ser disparado quando clicar na aba
  @Output('p-click') click = new EventEmitter();

  private _active: boolean;
  private _hide: boolean;
  private _align: string;
  private _color?: string;
  private _colorLabel?: string;
  private _activeColors?: string;

  // Ativa o botão
  @Input('p-active') set active(value: boolean) {
    this._active = value;

    this.emitActivated();
  }

  get active() {
    return this._active;
  }

  // Oculta o botão
  @Input('p-hide') set hide(value: boolean) {
    this._hide = convertToBoolean(value);

    this.setDisplayOnHide();
  }

  get hide(): boolean {
    return this._hide;
  }

  // Alinhamento do botao [center] | left | right
  @Input('p-align') set align(value: string) {
    this._align = value;
  }

  get align(): string {
    return this._align;
  }

  // cor da aba
  @Input('p-color') set color(value: string) {
    this._color = poTagColors.includes(value) ? value : undefined;
  }

  // cor da label da aba
  @Input('p-colorLabel') set colorLabel(value: string) {
    this._colorLabel = poTagColors.includes(value) ? value : undefined;
  }

  // cor da aba e label
  @Input('p-activeColors') set activeColors(value: string) {
    this._activeColors = value ? value : undefined;
  }

  constructor(private elementRef: ElementRef) {}

  get buttonColor() {
    return this.active
      ? this._activeColors
      : (this._color ? `po-${this._color}` : '') + (this._colorLabel ? ` po-text-${this._colorLabel}` : '');
  }

  ngOnChanges(changes: SimpleChanges) {
    if ((changes.hide && changes.hide.currentValue) || (changes.disabled && changes.disabled.currentValue)) {
      this.changeState.emit(this);
    }
  }

  onClick() {
    if (!this.disabled) {
      this.click.emit(this.id);
    }
  }

  private emitActivated() {
    if (this.active) {
      this.activated.emit(this);
    }
  }

  private setDisplayOnHide() {
    this.elementRef.nativeElement.style.display = this.hide ? 'none' : '';
  }
}
