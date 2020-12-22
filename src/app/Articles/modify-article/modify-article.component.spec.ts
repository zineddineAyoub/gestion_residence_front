import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyArticleComponent } from './modify-article.component';

describe('ModifyArticleComponent', () => {
  let component: ModifyArticleComponent;
  let fixture: ComponentFixture<ModifyArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
