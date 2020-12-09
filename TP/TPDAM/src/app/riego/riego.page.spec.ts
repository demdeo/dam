import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RiegoPage } from './riego.page';

describe('RiegoPage', () => {
  let component: RiegoPage;
  let fixture: ComponentFixture<RiegoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiegoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RiegoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
