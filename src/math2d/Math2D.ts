module engine {
    const EPSILON: number = 0.00001;
    const PiBy180: number = 0.0175;//Math.pI / 180.0
    export class Math2D {
        static isEquals(left: number, right: number, espilon: number = EPSILON): boolean {
            if (Math.abs(left - right) >= EPSILON) {
                return false;
            }
            return true;
        }
        static toRadian(degree: number): number {
            return degree * PiBy180;
        }

        static toDegree(radian: number): number {
            return radian / PiBy180;
        }
    }
}