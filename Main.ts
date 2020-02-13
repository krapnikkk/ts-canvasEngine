import { Canvas2D } from "./Canvas2D";
let canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
if (canvas == null) {
    alert("无法获取HTMLCanvasElement！");
    throw new Error("无法获取HTMLCanvasElement！");
}
// let canvas2d: Canvas2D = new Canvas2D(canvas);
// canvas2d.drawText("Hello World!");

let input: string = "[+3.14]";

let str: string =
    ` numMeshes  5
joints  {
        "origin"    -1  ( 0 0 0 )  ( -0.5  -0.5  -0.5 )     
        "Body"  0  ( -12.1038131714  0  79.004776001 )  ( -0.5 -0.5 -0.5 )  // origin
}` ;
// let tokenizer: engine.IDoom3Tokenizer = engine.Doom3Factory.createDoom3Tokenizer();


//设置IDoom3Tokenzier要解析的数据源
// tokenizer.setSource(input);

//getNextToken函数返回ture，说明仍有token需要解析
//解析的结果以传引用的方式从参数token传出来
//如果getNextToken返回false，说明已经到达字符串结尾，
// while (tokenizer.moveNext()) {
//     //如果当前的token是数字类型
//     if (tokenizer.current.type === engine.ETokenType.NUMBER) {
//         console.log("NUMBER = " + tokenizer.current.getFloat()); //输出该数字的浮点值
//     } else if (tokenizer.current.isString("joints")) {
//         //如果当前token是字符串类型，并且其值为joints，则输出
//         console.log("开始解析joints数据");
//     }
//     else { //否则获取当前token的字符串值
//         console.log("STRING = " + tokenizer.current.getString());
//     }
// }


let app = new engine.TestCanvas2DApplication(canvas);
let ptX: number = 600, ptY: number = 500;
app.strokeGrid();
app.drawCanvasCoordCenter();
app.draw4Quadrant();
app.tank.initYAxis = false;
app.drawTank();
app.tank.tankRotation = Math.atan2(ptX - app.canvas.width / 2, ptY - app.canvas.height / 2);
app.drawTank();
let len: number = app.distance(ptX, ptY, app.canvas.width / 2, app.canvas.height / 2);
app.tank.x = app.tank.x + Math.cos(app.tank.tankRotation) * len * 0.5;
app.tank.y = app.tank.y + Math.sin(app.tank.tankRotation) * len * 0.5;
app.drawTank();
app.tank.x = app.tank.x + Math.cos(app.tank.tankRotation) * len * 0.5;
app.tank.y = app.tank.y + Math.sin(app.tank.tankRotation) * len * 0.5;
app.drawTank();
app.drawTriangle(app.canvas.width / 2, app.canvas.height / 2, ptX, app.canvas.height / 2, ptX, ptY);
// app.start();

// app.drawRect(10,10,canvas.width-20,canvas.height-20);
// app.testMyRenderStateStack();
// app.printLineStates();




