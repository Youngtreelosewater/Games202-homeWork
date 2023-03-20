#ifdef GL_ES
precision mediump float;
#endif

uniform vec3 uLightPos;
uniform vec3 uCameraPos;

varying highp vec3 vNormal;
varying highp vec2 vTextureCoord;

vec4 pack (float depth) {
    // 使用rgba 4字节共32位来存储z值,1个字节精度为1/256
    const vec4 bitShift = vec4(1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0);
    const vec4 bitMask = vec4(1.0/256.0, 1.0/256.0, 1.0/256.0, 0.0);
    // gl_FragCoord:片元的坐标,fract():返回数值的小数部分
    vec4 rgbaDepth = fract(depth * bitShift); //计算每个点的z值
    rgbaDepth -= rgbaDepth.gbaa * bitMask; // Cut off the value which do not fit in 8 bits
    return rgbaDepth;
}

void main(){

  //gl_FragColor = vec4( 1.0, 0.0, 0.0, gl_FragCoord.z);
  /**
  GLSL提供的vec4类型内置变量，其中xyz表示窗口空间坐标（window-space coordinate）
  是NDC坐标经过viewport transformation后得到的坐标，在opengl中，
  其大小范围是x：[0, ScreenWidth]，y：[0, ScreenHeight]，z：[0, 1]。这里我们使用了z值，
  能直接表示片元的深度关系，至于此深度值是否线性，取决于投影矩阵，因为平行光使用的是正交矩阵，
  所以gl_FragCoord.z取得的深度值是线性的。而gl_FragCoord.w则是裁剪空间坐标中w的倒数。

  pack函数的作用是把一个[0,1)的float值储存到RGBA四个通道
  */
  gl_FragColor = pack(gl_FragCoord.z);
}