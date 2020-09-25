import { Directive,Input } from '@angular/core';
import {AbstractControl,NG_VALIDATORS,Validators, Validator, ValidationErrors} from '@angular/forms';

@Directive({
  selector: '[appRestricted]',
  providers:[{provide:NG_VALIDATORS,useExisting:RestrictedDirective,multi:true}]
})
export class RestrictedDirective implements Validator
{



  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null
  {
    const rval=control.value;


    if(rval.length<5 || rval.length>10)
    {
      return {appRestricted:true}
      //red
    }
    else
    {
      return null;
    }
  }
  registerOnValidatorChange?(fn: () => void): void
  {

  }

}
