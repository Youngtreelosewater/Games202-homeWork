class DirectionalLight {

    constructor(lightIntensity, lightColor, lightPos, focalPoint, lightUp, hasShadowMap, gl) {
        this.mesh = Mesh.cube(setTransform(0, 0, 0, 0.2, 0.2, 0.2, 0));
        this.mat = new EmissiveMaterial(lightIntensity, lightColor);
        this.lightPos = lightPos;
        this.focalPoint = focalPoint;
        this.lightUp = lightUp
        
        /**ShadowPass 创建属于这个光源实例的FrameBuffer，最终会储存在Material */
        this.hasShadowMap = hasShadowMap;
        this.fbo = new FBO(gl);
        if (!this.fbo) {
            console.log("无法设置帧缓冲区对象");
            return;
        }
    }
/**光源生成ShadowMap所用的MVP矩阵 */
    CalcLightMVP(translate, scale) {
        let lightMVP = mat4.create();
        let modelMatrix = mat4.create();
        let viewMatrix = mat4.create();
        let projectionMatrix = mat4.create();

        // Model transform 目标     源          平移向量/缩放
        mat4.translate(modelMatrix,modelMatrix,translate)   //平移变换
        mat4.scale(modelMatrix,modelMatrix,scale)           //缩放变换

        // View transform
        //视图矩阵 将光源当成相机
        //          存储结果    相机位置      相机对准的目标位置  坐标上的方向
        mat4.lookAt(viewMatrix,this.lightPos, this.focalPoint, this.lightUp)    
    
        // Projection transform
        var right = 100;  
        var left = -right;  
        var top = 100;  
        var bottom = -top;  

        var near = 0.01;  
        var far = 200;  

        mat4.ortho(projectionMatrix, left, right, bottom, top, near, far);
        
        //Edit End
        mat4.multiply(lightMVP, projectionMatrix, viewMatrix);
        mat4.multiply(lightMVP, lightMVP, modelMatrix);

        return lightMVP;
    }
}

