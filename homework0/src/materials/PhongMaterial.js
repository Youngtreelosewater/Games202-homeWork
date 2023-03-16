class PhongMaterial extends Material{
    /**
     * Creates an instance of PhongMaterial.
     * @param {vec3f} color The material color
     * @param {Texture} colorMap The texture object of the material
     * @param {vec3f} specular The material specular coefficient
     * @param {float} intensity The light intensity
     * @memberof PhongMaterial
     */

    constructor(color , colorMap , specular , intensity) {
        let textureSample = 0;

        if (colorMap != null) {
            textureSample = 1;
            super({
                'uTextureSample': { type: '1i', value: textureSample },
                'uSampler': { type: 'texture', value: colorMap },
                'uKd': { type: '3fv', value: color },
                'uKs': { type: '3fv', value: specular },
                'uLightIntensity': { type: '1f', value: intensity }
            }, [], PhongVertexShader , PhongFragmentShader);
        } else {
        //console.log(color);
            super({
                'uTextureSample': { type: '1i', value: textureSample },
                'uKd': { type: '3fv', value: color },
                'uKs': { type: '3fv', value: specular },
                'uLightIntensity': { type: '1f', value: intensity }
            }, [], PhongVertexShader , PhongFragmentShader);
        }

    }
}

//构造函数
//中，会为 PhongShader 所需要的 uniform 和 attribute 变量传递相应的 map 和
//array，以及指定要用到的 vertexShader 和 fragmentShader，一起到基类
//(Material) 的构造函数中

// 实例化 PhongMaterial 并以此进一步构造 MeshRender 类时，MeshRender
// 的构造函数会调用 material.compile(gl)，该方法自动完成材质用到的 Shader 编
// 译，以及参数和 Shader 的绑定

// 用户在向材质构造函数中传递完 Shader 用
// 到的 uniform、attribute 变量后，在 Shader 中就可以认为这些对应的变量可用
