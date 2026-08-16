export interface ValidationError {
    message: string;
}

export class ValidationContract {
    private errors: ValidationError[] = [];

    constructor() {
        // Initialize errors array
    }

    isRequired(value: any, message: string): void {
        if (!value || value.length <= 0) {
            this.errors.push({ message: message });
        }
    }

    hasMinLen(value: any, min: number, message: string): void {
        if (!value || value.length < min) {
            this.errors.push({ message: message });
        }
    }

    hasMaxLen(value: any, max: number, message: string): void {
        if (!value || value.length > max) {
            this.errors.push({ message: message });
        }
    }

    isfixedLen(value: any, len: number, message: string): void {
        if (value.length != len) {
            this.errors.push({ message: message });
        }
    }

    isEmail(value: string, message: string): void {
        const reg = new RegExp(/^[\w\.-]+@[\w\.-]+\.[\w\.-]+$/);
        if (!reg.test(value)) {
            this.errors.push({ message: message });
        }
    }

    errors(): ValidationError[] {
        return this.errors;
    }

    clear(): void {
        this.errors = [];
    }

    isValid(): boolean {
        return this.errors.length === 0;
    }
}

export default ValidationContract;