import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";



@ValidatorConstraint({
    name:'ValidatePassword',
    async:false
})
export class ValidatePassword implements ValidatorConstraintInterface{
    validate(password: string, args: ValidationArguments): Promise<boolean> | boolean {
        if (password != (args.object as any)[args.constraints[0]]) {
            return false;
        }
        return true;
    }
    defaultMessage(args?: ValidationArguments): string {
        return "Validación de password Fallida"
        
    }
}