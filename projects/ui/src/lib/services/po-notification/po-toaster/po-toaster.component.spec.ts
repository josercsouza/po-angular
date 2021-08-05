import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser/';

import { configureTestSuite } from './../../../util-test/util-expect.spec';

import { PoToaster } from './po-toaster.interface';
import { PoToasterType } from './po-toaster-type.enum';
import { PoToasterOrientation } from './po-toaster-orientation.enum';
import { PoToasterComponent } from './po-toaster.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('PoToasterComponent', () => {
  let component: PoToasterComponent;
  let fixture: ComponentFixture<PoToasterComponent>;

  const toasterErrorWithAction: PoToaster = {
    position: 1,
    type: PoToasterType.Error,
    message: 'toasterErrorWithAction',
    action: () => {}
  };

  const toasterErrorWithoutAction: PoToaster = {
    position: 1,
    type: PoToasterType.Error,
    message: 'toasterErrorWithoutAction'
  };

  const toasterInfoWithAction: PoToaster = {
    position: 1,
    type: PoToasterType.Information,
    message: 'toasterInfoWithAction',
    action: () => {},
    actionLabel: 'Texto Botão'
  };

  const toasterInfoWithoutAction: PoToaster = {
    position: 1,
    type: PoToasterType.Information,
    message: 'toasterInfoWithoutAction'
  };

  const toasterSuccessWithAction: PoToaster = {
    position: 1,
    type: PoToasterType.Success,
    message: 'toasterSuccessWithAction',
    action: () => {}
  };

  const toasterSuccessWithoutAction: PoToaster = {
    position: 1,
    type: PoToasterType.Success,
    message: 'toasterSuccessWithoutAction'
  };

  const toasterWarningWithAction: PoToaster = {
    position: 1,
    type: PoToasterType.Warning,
    message: 'toasterWarning',
    action: () => {}
  };

  const toasterWarningWithoutAction: PoToaster = {
    position: 1,
    type: PoToasterType.Warning,
    message: 'toasterWarningWithoutAction'
  };

  const toasterBottom: PoToaster = {
    position: 1,
    type: PoToasterType.Error,
    message: 'toasterBottom',
    orientation: PoToasterOrientation.Bottom
  };
  const toasterTop: PoToaster = {
    position: 1,
    type: PoToasterType.Error,
    message: 'toasterTop',
    orientation: PoToasterOrientation.Top
  };

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [PoToasterComponent],
      imports: [NoopAnimationsModule]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoToasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be load `component` correctly', () => {
    expect(component).toBeTruthy();
  });

  it('should be load `component.message` attribute correctly', () => {
    component.configToaster(toasterErrorWithAction);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.po-toaster-message')).nativeElement.innerHTML).toContain('toasterError');
  });

  it('should be load `component.orientation`with PoToasterOrientation.Bottom atribute correctly', () => {
    component.configToaster(toasterBottom);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.po-toaster-bottom'))).toBeTruthy();
  });

  it('should be load `component.orientation`with PoToasterOrientation.Top atribute correctly', () => {
    component.configToaster(toasterTop);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.po-toaster-bottom'))).toBeNull();
    expect(fixture.debugElement.query(By.css('.po-toaster-top'))).toBeTruthy();
  });

  it('should be load `component` with all `PoToasterType` with PoToasterType.Error and with action correctly', () => {
    component.configToaster(toasterErrorWithAction);

    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.po-toaster-error'))).not.toBeNull();
    expect(fixture.debugElement.query(By.css('.po-icon-warning'))).not.toBeNull();
    expect(fixture.debugElement.query(By.css('.po-toaster-action'))).toBeNull();
    expect(fixture.debugElement.query(By.css('.po-toaster-close'))).toBeTruthy();
  });

  it('should be load `component` with all `PoToasterType` with PoToasterType.Info and with action correctly', () => {
    component.configToaster(toasterInfoWithAction);

    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.po-toaster-info'))).not.toBeNull();
    expect(fixture.debugElement.query(By.css('.po-icon-info'))).not.toBeNull();
    expect(fixture.debugElement.query(By.css('.po-toaster-action')).nativeElement.innerHTML).toContain('Texto Botão');
  });

  it('should be load `component` with all `PoToasterType` with PoToasterType.Success and with action correctly', () => {
    component.configToaster(toasterSuccessWithAction);

    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.po-toaster-success'))).not.toBeNull();
    expect(fixture.debugElement.query(By.css('.po-icon-ok'))).not.toBeNull();
    expect(fixture.debugElement.query(By.css('.po-toaster-action'))).toBeNull();
    expect(fixture.debugElement.query(By.css('.po-toaster-close'))).toBeTruthy();
  });

  it('should be load `component` with all `PoToasterType` with PoToasterType.Warning and with action correctly', () => {
    component.configToaster(toasterWarningWithAction);

    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.po-toaster-warning'))).not.toBeNull();
    expect(fixture.debugElement.query(By.css('.po-icon-warning'))).not.toBeNull();
    expect(fixture.debugElement.query(By.css('.po-toaster-action'))).toBeNull();
    expect(fixture.debugElement.query(By.css('.po-toaster-close'))).toBeTruthy();
  });

  it('should be load `component` with all `PoToasterType` with PoToasterType.Error and without action correctly', () => {
    component.configToaster(toasterErrorWithoutAction);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.po-toaster-action'))).toBeNull();
  });

  it('should be load `component` with all `PoToasterType` with PoToasterType.Info and without action correctly', () => {
    component.configToaster(toasterInfoWithoutAction);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.po-toaster-action'))).toBeNull();
  });

  it('should be load `component` with all `PoToasterType` with PoToasterType.Success and without action correctly', () => {
    component.configToaster(toasterSuccessWithoutAction);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.po-toaster-action'))).toBeNull();
  });

  it('should be load `component` with all `PoToasterType` with PoToasterType.Warning and without action correctly', () => {
    component.configToaster(toasterWarningWithoutAction);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.po-toaster-action'))).toBeNull();
  });

  it('should be call the `component.action` method how must call a function correctly', () => {
    component.configToaster(toasterErrorWithAction);
    fixture.detectChanges();
    spyOn(component, 'action');
    component.poToasterAction();
    expect(component.action).toHaveBeenCalled();
  });

  it('should be call the `component.close` method how must close my `component` correctly', fakeAsync(() => {
    component.configToaster(toasterErrorWithAction);
    tick(301);
    expect(fixture.debugElement.query(By.css('.po-toaster'))).not.toBeNull();

    component.setShowToaster(false);
    tick(301);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.po-toaster'))).toBeNull();
  }));

  describe('Methods:', () => {
    it('onButtonClose: should call `close` if action and actionLabel are truthy', () => {
      component.action = () => {};
      component.actionLabel = 'Details';

      const spyClose = spyOn(component, 'close');
      const spyToasterAction = spyOn(component, 'poToasterAction');

      component.onButtonClose();

      expect(spyToasterAction).not.toHaveBeenCalled();
      expect(spyClose).toHaveBeenCalled();
    });

    it('onButtonClose: should call `poToasterAction` if action is truthy and actionLabel is null', () => {
      component.action = () => {};
      component.actionLabel = null;

      const spyToasterAction = spyOn(component, 'poToasterAction');
      const spyClose = spyOn(component, 'close');

      component.onButtonClose();

      expect(spyClose).not.toHaveBeenCalled();
      expect(spyToasterAction).toHaveBeenCalled();
    });

    it('onButtonClose: should call `close` if action and actionLabel are null', () => {
      component.action = null;
      component.actionLabel = null;

      const spyToasterAction = spyOn(component, 'poToasterAction');
      const spyClose = spyOn(component, 'close');

      component.onButtonClose();

      expect(spyClose).toHaveBeenCalled();
      expect(spyToasterAction).not.toHaveBeenCalled();
    });

    it('close: should call `FadeOut` when click to close notification', () => {
      component.action = () => {};
      component.actionLabel = 'Details';

      const spyFadeOut = spyOn(component, 'setFadeOut');
      component.close();

      expect(spyFadeOut).toHaveBeenCalled();
    });

    it('setFadeOut: if the class is fade out it must keep fade out', () => {
      component.action = () => {};
      component.actionLabel = 'Details';
      component.toaster.nativeElement.className = 'fade-out';
      const spyFadeOut = spyOn(component, 'setFadeOut');
      component.setFadeOut();

      expect(component.toaster.nativeElement.className).toContain('fade-out');
      expect(component.toaster.nativeElement.className).not.toContain('fade-in');
    });

    it('setFadeOut: if the css class is different from fade-in/out, it must keep the same class', () => {
      component.action = () => {};
      component.actionLabel = 'Details';
      component.toaster.nativeElement.className = 'po-toaster-test';

      component.setFadeOut();

      expect(component.toaster.nativeElement.className).not.toContain('fade-out');
      expect(component.toaster.nativeElement.className).not.toContain('fade-in');
      expect(component.toaster.nativeElement.className).toContain('po-toaster-test');
    });

    it('setFadeOut: if the class is fade-in it must change to fade-out', () => {
      component.action = () => {};
      component.actionLabel = 'Details';
      component.toaster.nativeElement.className = 'fade-in';

      component.setFadeOut();

      expect(component.toaster.nativeElement.className).not.toContain('fade-in');
    });
  });

  describe('Properties', () => {
    it('icon: should get icon', () => {
      component['icon'] = 'icone';

      expect(component.getIcon()).toBe('icone');
    });

    it('toasterPosition: should get toasterPosition', () => {
      component['toasterPosition'] = 'toasterPosition';

      expect(component.getToasterPosition()).toBe('toasterPosition');
    });

    it('toasterType: should get toasterType', () => {
      component['toasterType'] = 'toasterType';

      expect(component.getToasterType()).toBe('toasterType');
    });
  });
});
