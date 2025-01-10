export abstract class AbstractQuantity<Q, U> {
    public constructor(
        public value: number,
        public unit: U,
    ) {
    }


    public abstract getValue(unit: U): number;


    public isZero(): boolean {
        return this.value === 0;
    }


    public isZeroOrNegative(): boolean {
        return this.value <= 0;
    }


    public add(quantity: AbstractQuantity<Q, U>): Q {
        if (!quantity) {
            return undefined;
        } else if (this.unit === quantity.unit) {
            return this.createInstance(this.value + quantity.value, this.unit);
        } else {
            return this.createInstance(
                this.getValue(this.getDefaultUnit()) + quantity.getValue(this.getDefaultUnit()),
                this.getDefaultUnit()
            );
        }
    }


    public subtract(quantity: AbstractQuantity<Q, U>): Q {
        if (!quantity) {
            return undefined;
        } else if (this.unit === quantity.unit) {
            return this.createInstance(this.value - quantity.value, this.unit);
        } else {
            return this.createInstance(
                this.getValue(this.getDefaultUnit()) - quantity.getValue(this.getDefaultUnit()),
                this.getDefaultUnit()
            );
        }
    }


    public equals(quantity: AbstractQuantity<Q, U>): boolean {
        if (!quantity) {
            return false;
        } else if (this.unit === quantity.unit) {
            return this.value === quantity.value;
        } else {
            return this.getValue(this.getDefaultUnit()) === quantity.getValue(this.getDefaultUnit());
        }
    }


    protected abstract createInstance(value: number, unit: U): Q;


    protected abstract getDefaultUnit(): U;
}
