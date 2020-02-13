module engine {
    export class Tank {
        width: number = 80;
        height: number = 50;
        x: number = 100;
        y: number = 100;
        scaleX: number = 1;
        scaleY: number = 1;

        tankRotation: number = 0;
        turretRotation: number = 0;
        initYAxis: boolean = true;
        showLine: boolean = false;

        showCoord: boolean = false;
        gunLength: number = Math.max(this.width, this.height);

        gunMuzzleRadius: number = 5;

        targetX: number = 0;
        targetY: number = 0;

        draw(app: TestCanvas2DApplication) {
            if (app.context2D === null) {
                return;
            }
            app.context2D.save();
            app.context2D.translate(this.x, this.y);
            app.context2D.rotate(this.tankRotation);
            app.context2D.scale(this.scaleX, this.scaleY);

            app.context2D.save();
            if (this.initYAxis) {
                app.context2D.rect(-this.height * 0.5, -this.width * 0.5, this.height, this.width);
            } else {
                app.context2D.rect(-this.width * 0.5, -this.height * 0.5, this.width, this.height);
            }

            app.context2D.fill();
            app.context2D.restore();

            app.context2D.save();
            if (this.initYAxis) {
                app.context2D.translate(0, this.height * 0.5);
            } else {
                app.context2D.translate(this.width * 0.5, 0);
            }

            app.fillCircle(0, 0, 10, "green");
            app.context2D.restore();

            app.context2D.save();
            app.context2D.rotate(this.turretRotation);
            app.context2D.fillStyle = "red";
            app.context2D.beginPath();
            if (this.initYAxis) {
                app.context2D.ellipse(0, 0, 10, 15, 0, 0, Math.PI * 2);
            } else {
                app.context2D.ellipse(0, 0, 15, 10, 0, 0, Math.PI * 2);
            }
            app.context2D.fill();
            app.context2D.strokeStyle = "blue";
            app.context2D.lineWidth = 5;
            app.context2D.lineCap = "round";
            app.context2D.beginPath();
            app.context2D.moveTo(0, 0);
            if (this.initYAxis) {
                app.context2D.lineTo(0, this.gunLength);
            } else {
                app.context2D.lineTo(this.gunLength, 0);
            }
            app.context2D.stroke();
            if (this.initYAxis) {
                app.context2D.translate(0, this.gunLength);
                app.context2D.translate(0, this.gunMuzzleRadius);
            } else {
                app.context2D.translate(this.gunLength, 0);
                app.context2D.translate(this.gunMuzzleRadius, 0);
            }

            app.fillCircle(0, 0, 5, "black");
            app.context2D.restore();

            if (this.showCoord) {
                app.context2D.save();
                app.context2D.lineWidth = 1;
                app.context2D.lineCap = "round";
                app.strokeCoord(0, 0, this.width * 1.2, this.height * 1.2);
                app.context2D.restore();
            }
            app.context2D.restore();

            // app.context2D.save();
            // app.strokeLine(this.x, this.y, app.canvas.width * 0.5, app.canvas.height * 0.5);
            // app.strokeLine(this.x, this.y, this.targetX, this.targetY);
            // app.context2D.restore();
        }

        private _lookAt(): void {
            let diffX: number = this.targetX - this.x, diffY: number = this.targetY - this.y, radian = Math.atan2(diffY, diffX);
            console.log(radian);
            if (this.initYAxis) {
                radian -= Math.PI / 2;
            }
            this.tankRotation = radian;
        }

        onMouseMove(evt: CanvasMouseEvent): void {
            this.targetX = evt.canvasPosition.x;
            this.targetY = evt.canvasPosition.y;
            this._lookAt();
        }

        linearSpeed: number = 100;
        _moveTowardTo(intervalSec: number): void {
            let diffX: number = this.targetX - this.x,
                diffY: number = this.targetY - this.y,
                currSpeed: number = this.linearSpeed * intervalSec;
            if ((diffX * diffX + diffY * diffY) > currSpeed * currSpeed) {
                let rot:number = this.tankRotation;
                if(this.initYAxis){
                    rot += Math.PI / 2;
                }
                this.x = this.x + Math.cos(rot) * currSpeed;
                this.y = this.y + Math.sin(rot) * currSpeed;
            }

        }

        update(intervalSec: number) {
            this._moveTowardTo(intervalSec);
        }

        turretRotationSpeed: number = Math2D.toRadian(2);
        onKeyPress(evt: CanvasKeyBoardEvent): void {
            if (evt.key === "r") {
                this.turretRotation += this.turretRotationSpeed;
            } else if (evt.key === "t") {
                this.turretRotation = 0;
            } else if (evt.key === "e") {
                this.turretRotation -= this.turretRotationSpeed;
            }
        }

    }
}