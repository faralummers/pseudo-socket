import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgForOf } from '@angular/common';

interface SelectedIdsForm {
  selectedIds: FormArray<FormControl<string | null>>
}

/** The component to control tracked data */
@Component({
  selector: 'app-tracking-block',
  templateUrl: './tracking-block.component.html',
  styleUrls: ['./tracking-block.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, NgForOf],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrackingBlockComponent {
  @Output()
  selectedIdsChanged = new EventEmitter<string[]>();

  formGroup: FormGroup<SelectedIdsForm> = new FormGroup<SelectedIdsForm>({
    selectedIds: new FormArray([
      this.getIdControl()
    ])
  })

  maxArrayLength: number = 10;

  public confirmTracking(): void {
    const selectedIds: string[] = this.formGroup.getRawValue().selectedIds.filter((id): id is string => !!id);

    this.selectedIdsChanged.next(selectedIds);
  }

  /** Adds new field to "Selected ids" section */
  public addIdField(): void {
    const currentLength = this.formGroup.controls.selectedIds.length;
    const newControl = this.getIdControl();

    this.formGroup.controls.selectedIds.insert(currentLength, newControl);
  }

  /** Removes the field from "Selected ids" section */
  public removeIdField(index: number): void {
    console.log(index)
    this.formGroup.controls.selectedIds.removeAt(index);
  }

  private getIdControl(): FormControl<string | null> {
    return new FormControl<string | null>(null, [Validators.required, Validators.pattern('[a-z0-9]{10}')]);
  }
}
