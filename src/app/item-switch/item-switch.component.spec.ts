import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSwitchComponent } from './item-switch.component';

describe('ItemSwitchComponent', () => {
  let component: ItemSwitchComponent;
  let fixture: ComponentFixture<ItemSwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemSwitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
