export interface ValidationError {
    message: string;
}

export class ValidationContract {
    private _errors: ValidationError[] = [];

    isRequired(value: any, message: string): void {
        if (!value || value.length <= 0) {
            this._errors.push({ message });
        }
    }

    hasMinLen(value: any, min: number, message: string): void {
        if (!value || value.length < min) {
            this._errors.push({ message });
        }
    }

    hasMaxLen(value: any, max: number, message: string): void {
        if (!value || value.length > max) {
            this._errors.push({ message });
        }
    }

    isfixedLen(value: any, len: number, message: string): void {
        if (value.length != len) {
            this._errors.push({ message });
        }
    }

    isEmail(value: string, message: string): void {
        const reg = new RegExp(/^[\w\.-]+@[\w\.-]+\.[\w\.-]+$/);
        if (!reg.test(value)) {
            this._errors.push({ message });
        }
    }

    errors(): ValidationError[] {
        return this._errors;
    }

    clear(): void {
        this._errors = [];
    }

    isValid(): boolean {
        return this._errors.length === 0;
    }
}

export default ValidationContract;