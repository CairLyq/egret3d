declare namespace paper {
    /**
     *
     */
    interface IUUID {
        /**
         *
         */
        readonly uuid: string;
    }
    /**
     *
     */
    interface IAssetReference {
        /**
         *
         */
        readonly asset: number;
    }
    /**
     *
     */
    interface IClass {
        /**
         *
         */
        readonly class: string;
    }
    /**
     *
     */
    interface IRelease<T extends IRelease<T>> {
        /**
         *
         */
        release(): T;
        /**
         *
         */
        clone(): T;
        /**
         *
         */
        copy(value: Readonly<T>): T;
        /**
         *
         */
        set(...args: any[]): T;
    }
    /**
     *
     */
    interface ISerializedObject extends IUUID, IClass {
        [key: string]: any | IUUID | IAssetReference;
    }
    /**
     *
     */
    interface ISerializedStruct extends IClass {
        [key: string]: any | IUUID | IAssetReference;
    }
    /**
     * 序列化数据接口。
     */
    interface ISerializedData {
        /**
         *
         */
        version?: number;
        /**
         *
         */
        compatibleVersion?: number;
        /**
         * 所有资源。
         */
        readonly assets?: string[];
        /**
         * 所有实体。（至多含一个场景）
         */
        readonly objects?: ISerializedObject[];
        /**
         * 所有组件。
         */
        readonly components?: ISerializedObject[];
    }
    /**
     * 自定义序列化接口。
     */
    interface ISerializable {
        /**
         *
         */
        serialize(): any;
        /**
         *
         */
        deserialize(element: any, data?: Deserializer): any;
    }
    /**
     *
     */
    interface BaseClass extends Function {
    }
    /**
     *
     */
    type GameObjectExtras = {
        linkedID?: string;
        rootID?: string;
        prefab?: Prefab;
    };
    /**
     *
     */
    interface ComponentClass<T extends BaseComponent> extends BaseClass {
        executeInEditMode: boolean;
        allowMultiple: boolean;
        requireComponents: ComponentClass<BaseComponent>[] | null;
        new (): T;
    }
    /**
     *
     */
    type ComponentClassArray = (ComponentClass<BaseComponent> | undefined)[];
    /**
     *
     */
    type ComponentArray = (BaseComponent | undefined)[];
    /**
     *
     */
    type ComponentExtras = {
        linkedID?: string;
    };
}
declare namespace paper {
    /**
     * 通过装饰器标记序列化属性。
     */
    function serializedField(classPrototype: any, key: string): void;
    function serializedField(key: string): Function;
    /**
     * 通过装饰器标记反序列化时需要忽略的属性。
     */
    function deserializedIgnore(classPrototype: any, key: string): void;
    /**
     * 通过装饰器标记组件是否允许在同一实体上添加多个实例。
     */
    function allowMultiple(componentClass: ComponentClass<BaseComponent>): void;
    /**
     * 通过装饰器标记组件依赖的其他组件。
     */
    function requireComponent(requireComponentClass: ComponentClass<BaseComponent>): (componentClass: ComponentClass<BaseComponent>) => void;
    /**
     * 通过装饰器标记脚本组件是否在编辑模式也拥有生命周期。
     */
    function executeInEditMode(componentClass: ComponentClass<Behaviour>): void;
}
declare namespace paper.editor {
    /**属性信息 */
    class PropertyInfo {
        /**属性名称 */
        name: string;
        /**编辑类型 */
        editType: EditType;
        /**属性配置 */
        option: PropertyOption;
        constructor(name?: string, editType?: EditType, option?: PropertyOption);
    }
    /**属性配置 */
    type PropertyOption = {
        minimum?: number;
        maximum?: number;
        step?: number;
        /**赋值函数*/
        set?: string;
        /**下拉项*/
        listItems?: {
            label: string;
            value: any;
        }[];
    };
    /**编辑类型 */
    const enum EditType {
        /**数字输入 */
        UINT = 0,
        INT = 1,
        FLOAT = 2,
        /**文本输入 */
        TEXT = 3,
        /**选中框 */
        CHECKBOX = 4,
        /**vertor2 */
        VECTOR2 = 5,
        /**vertor3 */
        VECTOR3 = 6,
        /**vertor4 */
        VECTOR4 = 7,
        /**Quaternion */
        QUATERNION = 8,
        /**颜色选择器 */
        COLOR = 9,
        /**下拉 */
        LIST = 10,
        /**Rect */
        RECT = 11,
        /**材质 */
        MATERIAL = 12,
        /**材质数组 */
        MATERIAL_ARRAY = 13,
        /**游戏对象 */
        GAMEOBJECT = 14,
        /**变换 TODO 不需要*/
        TRANSFROM = 15,
        /**组件 */
        COMPONENT = 16,
        /**声音 */
        SOUND = 17,
        /**Mesh */
        MESH = 18,
        /**shader */
        SHADER = 19,
        /**数组 */
        ARRAY = 20,
    }
    /**
     * 装饰器:自定义
     */
    function custom(): (target: any) => void;
    /**
     * 装饰器:属性
     * @param editType 编辑类型
     */
    function property(editType?: EditType, option?: PropertyOption): (target: any, property: string) => void;
    /**
     * 检测一个实例对象是否为已被自定义
     * @param classInstance 实例对象
     */
    function isCustom(classInstance: any): boolean;
    /**
     * 从枚举中生成装饰器列表项。
     */
    function getItemsFromEnum(enumObject: any): any[];
    /**
     * 获取一个实例对象的编辑信息
     * @param classInstance 实例对象
     */
    function getEditInfo(classInstance: any): PropertyInfo[];
}
declare namespace egret3d {
    /**
     *
     */
    interface IVector2 {
        x: number;
        y: number;
    }
    /**
     *
     */
    class Vector2 implements IVector2, paper.ISerializable {
        static readonly ZERO: Readonly<IVector2> & {
            clone: () => Vector2;
        };
        static readonly ONE: Readonly<IVector2> & {
            clone: () => Vector2;
        };
        private static readonly _instances;
        static create(x?: number, y?: number): Vector2;
        release(): this;
        x: number;
        y: number;
        /**
         * 请使用 `egret3d.Vector2.create()` 创建实例。
         * @see egret3d.Vector2.create()
         * @deprecated
         * @private
         */
        constructor(x?: number, y?: number);
        serialize(): number[];
        deserialize(element: [number, number]): this;
        copy(value: Readonly<IVector2>): this;
        clone(): Vector2;
        set(x: number, y: number): this;
        normalize(): this;
        readonly length: number;
        readonly sqrtLength: number;
        static add(v1: Vector2, v2: Vector2, out: Vector2): Vector2;
        static subtract(v1: Vector2, v2: Vector2, out: Vector2): Vector2;
        static multiply(v1: Vector2, v2: Vector2, out: Vector2): Vector2;
        static dot(v1: Vector2, v2: Vector2): number;
        static scale(v: Vector2, scaler: number): Vector2;
        static getLength(v: Vector2): number;
        static getDistance(v1: Vector2, v2: Vector2): number;
        static equal(v1: Vector2, v2: Vector2, threshold?: number): boolean;
        static lerp(v1: Vector2, v2: Vector2, value: number, out: Vector2): Vector2;
    }
}
declare namespace paper {
    /**
     * 基础对象。
     */
    abstract class BaseObject implements IUUID {
        /**
         *
         */
        uuid: string;
    }
}
declare namespace paper {
    /**
     * 组件基类
     */
    abstract class BaseComponent extends BaseObject {
        /**
         * 是否在编辑模式拥有生命周期。
         */
        static executeInEditMode: boolean;
        /**
         * 是否允许在同一实体上添加多个实例。
         */
        static allowMultiple: boolean;
        /**
         * 依赖的其他组件。
         */
        static requireComponents: ComponentClass<BaseComponent>[] | null;
        private static readonly _allComponents;
        private static readonly _allSingletonComponents;
        private static _createEnabled;
        /**
         * 组件挂载的 GameObject
         */
        readonly gameObject: GameObject;
        /**
         * 仅保存在编辑器环境的额外数据，项目发布该数据将被移除。
         */
        extras?: ComponentExtras;
        protected _enabled: boolean;
        /**
         * 禁止实例化组件。
         * @protected
         */
        constructor();
        /**
         * 添加组件后，组件内部初始化。
         * - 重载此方法时，必须调用 `super.initialize()`。
         */
        initialize(config?: any): void;
        /**
         * 移除组件后，组件内部卸载。
         * - 重载此方法时，必须调用 `super.uninitialize()`。
         */
        uninitialize(): void;
        /**
         *
         */
        readonly isDestroyed: boolean;
        /**
         * 组件的激活状态。
         */
        enabled: boolean;
        /**
         * 组件在场景的激活状态。
         */
        readonly isActiveAndEnabled: boolean;
        /**
         *
         */
        readonly transform: egret3d.Transform;
    }
}
declare namespace paper {
    /**
     * Base Class for Asset
     * @version paper 1.0
     * @platform Web
     * @language en_US
     */
    /**
     * 资源基类，扩展资源类型需要继承此抽象类
     * @version paper 1.0
     * @platform Web
     * @language zh_CN
     */
    abstract class Asset extends BaseObject {
        /**
         * @private
         */
        static register(asset: Asset): void;
        /**
         * @readonly
         */
        name: string;
        constructor(name?: string);
        /**
         * asset byte length
         * @version paper 1.0
         * @platform Web
         * @language en_US
         */
        /**
         * 计算资源字节大小。
         * @version paper 1.0
         * @platform Web
         * @language zh_CN
         */
        abstract caclByteLength(): number;
        /**
         * dispose asset
         * @version paper 1.0
         * @platform Web
         * @language en_US
         */
        /**
         * 释放资源。
         * @version paper 1.0
         * @platform Web
         * @language zh_CN
         */
        dispose(disposeChildren?: boolean): boolean;
    }
}
declare namespace egret3d {
    interface IVector3 extends IVector2 {
        z: number;
    }
    /**
     *
     */
    const enum EulerOrder {
        XYZ = 0,
        XZY = 1,
        YXZ = 2,
        YZX = 3,
        ZXY = 4,
        ZYX = 5,
    }
    /**
     *
     */
    class Vector3 implements IVector3, paper.IRelease<Vector3>, paper.ISerializable {
        static readonly ZERO: Readonly<IVector3> & {
            clone: () => Vector3;
        };
        static readonly ONE: Readonly<IVector3> & {
            clone: () => Vector3;
        };
        static readonly UP: Readonly<IVector3> & {
            clone: () => Vector3;
        };
        static readonly DOWN: Readonly<IVector3> & {
            clone: () => Vector3;
        };
        static readonly LEFT: Readonly<IVector3> & {
            clone: () => Vector3;
        };
        static readonly RIGHT: Readonly<IVector3> & {
            clone: () => Vector3;
        };
        static readonly FORWARD: Readonly<IVector3> & {
            clone: () => Vector3;
        };
        static readonly BACK: Readonly<IVector3> & {
            clone: () => Vector3;
        };
        private static readonly _instances;
        static create(x?: number, y?: number, z?: number): Vector3;
        release(): this;
        x: number;
        y: number;
        z: number;
        /**
         * 请使用 `egret3d.Vector3.create()` 创建实例。
         * @see egret3d.Vector3.create()
         * @deprecated
         * @private
         */
        constructor(x?: number, y?: number, z?: number);
        serialize(): number[];
        deserialize(value: Readonly<[number, number, number]>): this;
        copy(value: Readonly<IVector3>): this;
        clone(): Vector3;
        equal(value: Readonly<IVector3>, threshold?: number): boolean;
        set(x: number, y: number, z: number): this;
        fromArray(value: Readonly<ArrayLike<number>>, offset?: number): this;
        fromPlaneProjection(plane: Readonly<Plane>, source?: Readonly<IVector3>): this;
        applyMatrix3(matrix: Readonly<Matrix3>, source?: Readonly<IVector3>): this;
        applyMatrix(matrix: Readonly<Matrix4>, source?: Readonly<IVector3>): this;
        applyDirection(matrix: Readonly<Matrix4>, source?: Readonly<IVector3>): this;
        applyQuaternion(quaternion: Readonly<IVector4>, source?: Readonly<IVector3>): this;
        normalize(source?: Readonly<IVector3>): this;
        negate(source?: Readonly<IVector3>): this;
        addScalar(add: number, source?: Readonly<IVector3>): this;
        add(valueA: Readonly<IVector3>, valueB?: Readonly<IVector3>): this;
        subtract(valueA: Readonly<IVector3>, valueB?: Readonly<IVector3>): this;
        multiplyScalar(scale: number, source?: Readonly<IVector3>): this;
        multiply(valueA: Readonly<IVector3>, valueB?: Readonly<IVector3>): this;
        dot(valueA: Readonly<IVector3>, valueB?: Readonly<IVector3>): number;
        cross(valueA: Readonly<IVector3>, valueB?: Readonly<IVector3>): this;
        lerp(t: number, valueA: Readonly<IVector3>, valueB?: Readonly<IVector3>): this;
        min(valueA: Readonly<IVector3>, valueB?: Readonly<IVector3>): this;
        max(valueA: Readonly<IVector3>, valueB?: Readonly<IVector3>): this;
        clamp(min: Readonly<IVector3>, max: Readonly<IVector3>, source?: Readonly<IVector3>): this;
        divide(source?: Readonly<IVector3>): this;
        getSquaredDistance(value: Readonly<IVector3>): number;
        getDistance(value: Readonly<IVector3>): number;
        closestToTriangle(triangle: Readonly<Triangle>, value?: Readonly<IVector3>): this;
        toArray(value: number[] | Float32Array, offset?: number): number[] | Float32Array;
        readonly length: number;
        readonly squaredLength: number;
        /**
         * @deprecated
         */
        static set(x: number, y: number, z: number, out: Vector3): Vector3;
        /**
         * @deprecated
         */
        static normalize(v: IVector3): IVector3;
        /**
         * @deprecated
         */
        static copy(v: Vector3, out: Vector3): Vector3;
        /**
         * @deprecated
         */
        static add(v1: Vector3, v2: Vector3, out: Vector3): Vector3;
        /**
         * @deprecated
         */
        static multiply(v1: Vector3, v2: Vector3, out: Vector3): Vector3;
        /**
         * @deprecated
         */
        static scale(v: Vector3, scale: number): Vector3;
        /**
         * @deprecated
         */
        static cross(lhs: IVector3, rhs: IVector3, out: IVector3): IVector3;
        /**
         * @deprecated
         */
        static dot(v1: Vector3, v2: Vector3): number;
        /**
         * @deprecated
         */
        static lerp(v1: Vector3, v2: Vector3, v: number, out: Vector3): Vector3;
        /**
         * @deprecated
         */
        static equal(v1: Vector3, v2: Vector3, threshold?: number): boolean;
        /**
         * @deprecated
         */
        static subtract(v1: Readonly<IVector3>, v2: Readonly<IVector3>, out: IVector3): IVector3;
        /**
         * @deprecated
         */
        static getSqrLength(v: Readonly<IVector3>): number;
        /**
         * @deprecated
         */
        static getLength(v: Readonly<IVector3>): number;
        /**
         * @deprecated
         */
        static getDistance(a: Readonly<IVector3>, b: Readonly<IVector3>): number;
    }
    const helpVector3A: Vector3;
    const helpVector3B: Vector3;
    const helpVector3C: Vector3;
    const helpVector3D: Vector3;
    const helpVector3E: Vector3;
    const helpVector3F: Vector3;
    const helpVector3G: Vector3;
    const helpVector3H: Vector3;
}
declare namespace egret3d {
    interface IVector4 extends IVector3 {
        w: number;
    }
    class Vector4 implements IVector4, paper.IRelease<Vector4>, paper.ISerializable {
        private static readonly _instances;
        /**
         *
         */
        static create(x?: number, y?: number, z?: number, w?: number): Vector4;
        release(): this;
        x: number;
        y: number;
        z: number;
        w: number;
        /**
         * 请使用 `egret3d.Quaternion.create()` 创建实例。
         * @see egret3d.Quaternion.create()
         * @deprecated
         * @private
         */
        constructor(x?: number, y?: number, z?: number, w?: number);
        serialize(): number[];
        deserialize(value: Readonly<[number, number, number, number]>): this;
        copy(value: Readonly<IVector4>): this;
        clone(): Vector4;
        set(x: number, y: number, z: number, w: number): this;
        fromArray(value: Readonly<ArrayLike<number>>, offset?: number): this;
        normalize(source?: Readonly<IVector4>): this;
        toArray(value: number[] | Float32Array, offset?: number): number[] | Float32Array;
        readonly length: number;
        readonly squaredLength: number;
    }
    const helpVector4A: Vector4;
    const helpVector4B: Vector4;
    const helpVector4C: Vector4;
    const helpVector4D: Vector4;
    const helpVector4E: Vector4;
    const helpVector4F: Vector4;
}
declare namespace paper {
    const enum RendererEventType {
        Materials = "materials",
    }
    /**
     * renderer component interface
     * @version paper 1.0
     * @platform Web
     * @language en_US
     */
    /**
     * 渲染器组件接口
     * @version paper 1.0
     * @platform Web
     * @language zh_CN
     */
    abstract class BaseRenderer extends BaseComponent {
        protected _receiveShadows: boolean;
        protected _castShadows: boolean;
        protected _lightmapIndex: number;
        protected readonly _boundingSphere: egret3d.Sphere;
        protected readonly _aabb: egret3d.AABB;
        protected _recalculateSphere(): void;
        /**
         * 重新计算 AABB。
         */
        abstract recalculateAABB(): void;
        /**
         *
         */
        receiveShadows: boolean;
        /**
         *
         */
        castShadows: boolean;
        /**
         *
         */
        lightmapIndex: number;
        /**
         *
         */
        readonly aabb: Readonly<egret3d.AABB>;
        /**
         *
         */
        readonly boundingSphere: Readonly<egret3d.Sphere>;
    }
}
declare namespace egret3d {
    /**
     *
     */
    class Matrix4 implements paper.IRelease<Matrix4>, paper.ISerializable {
        static readonly IDENTITY: Readonly<Matrix4>;
        private static readonly _instances;
        /**
         *
         * @param rawData
         * @param offsetOrByteOffset
         */
        static create(rawData?: Readonly<ArrayLike<number>> | ArrayBuffer, offsetOrByteOffset?: number): Matrix4;
        /**
         *
         */
        release(): this;
        /**
         * @readonly
         */
        rawData: Float32Array;
        /**
         * 请使用 `egret3d.Matrix4.create()` 创建实例。
         * @see egret3d.Matrix4.create()
         * @deprecated
         */
        constructor(rawData?: Readonly<ArrayLike<number>> | ArrayBuffer, offsetOrByteOffset?: number);
        serialize(): Float32Array;
        deserialize(value: Readonly<[number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number]>): this;
        copy(value: Readonly<Matrix4>): this;
        clone(): Matrix4;
        identity(): this;
        set(n11: number, n12: number, n13: number, n14: number, n21: number, n22: number, n23: number, n24: number, n31: number, n32: number, n33: number, n34: number, n41: number, n42: number, n43: number, n44: number): this;
        fromArray(value: Readonly<ArrayLike<number>>, offset?: number): this;
        fromBuffer(value: ArrayBuffer, byteOffset?: number): this;
        fromTranslate(value: Readonly<IVector3>, rotationAndScaleStays?: boolean): this;
        fromRotation(rotation: Quaternion, translateStays?: boolean): this;
        fromEuler(value: Readonly<IVector3>, order?: EulerOrder, translateStays?: boolean): this;
        fromScale(x: number, y: number, z: number, translateStays?: boolean): this;
        fromAxis(axis: Readonly<IVector3>, radian?: number): this;
        fromAxises(axisX: Readonly<IVector3>, axisY: Readonly<IVector3>, axisZ: Readonly<IVector3>): this;
        fromRotationX(radian: number): this;
        fromRotationY(radian: number): this;
        fromRotationZ(radian: number): this;
        determinant(): number;
        compose(translation: Readonly<IVector3>, rotation: Readonly<IVector4>, scale: Readonly<IVector3>): this;
        decompose(translation?: Vector3 | null, rotation?: Quaternion | null, scale?: Vector3 | null): this;
        transpose(source?: Readonly<Matrix4>): this;
        inverse(source?: Readonly<Matrix4>): this;
        multiplyScalar(value: number, source?: Readonly<Matrix4>): void;
        multiply(valueA: Matrix4, valueB?: Matrix4): this;
        premultiply(value: Readonly<Matrix4>): this;
        lerp(t: number, value: Matrix4, source?: Matrix4): this;
        /**
         * - 两点位置不重合。
         * @param eye
         * @param target
         * @param up
         */
        lookAt(eye: Readonly<IVector3>, target: Readonly<IVector3>, up: Readonly<IVector3>): this;
        getMaxScaleOnAxis(): number;
        toArray(value?: number[] | Float32Array, offset?: number): number[] | Float32Array;
        toEuler(value: Vector3, order?: EulerOrder): Vector3;
        /**
         * @deprecated
         */
        transformVector3(value: Vector3, out?: Vector3): Vector3;
        /**
         * @deprecated
         */
        transformNormal(value: Vector3, out?: Vector3): Vector3;
        /**
         * @deprecated
         */
        scale(scaler: number): this;
        /**
         * @deprecated
         */
        add(left: Matrix4, right?: Matrix4): this;
        /**
         * @deprecated
         */
        static perspectiveProjectLH(fov: number, aspect: number, znear: number, zfar: number, out: Matrix4): Matrix4;
        /**
         * @deprecated
         */
        static orthoProjectLH(width: number, height: number, znear: number, zfar: number, out: Matrix4): Matrix4;
    }
    const helpMatrixA: Matrix4;
    const helpMatrixB: Matrix4;
    const helpMatrixC: Matrix4;
    const helpMatrixD: Matrix4;
}
declare namespace egret3d {
    /**
     * 射线
     */
    class Ray implements paper.IRelease<Ray>, paper.ISerializable {
        private static readonly _instances;
        static create(origin?: Readonly<IVector3>, direction?: Readonly<IVector3>): Ray;
        release(): this;
        /**
         * 射线起始点
         */
        readonly origin: Vector3;
        /**
         * 射线的方向向量
         */
        readonly direction: Vector3;
        /**
         * 请使用 `egret3d.Ray.create()` 创建实例。
         * @see egret3d.Ray.create()
         */
        private constructor();
        serialize(): number[];
        deserialize(value: Readonly<[number, number, number, number, number, number]>): this;
        copy(value: Readonly<Ray>): this;
        clone(): Ray;
        set(origin: Readonly<IVector3>, direction: Readonly<IVector3>): this;
        fromArray(value: Readonly<ArrayLike<number>>, offset?: number): this;
        applyMatrix(value: Readonly<Matrix4>, ray?: Readonly<Ray>): this;
        getSquaredDistance(value: Readonly<IVector3>): number;
        getDistance(value: Readonly<IVector3>): number;
        at(value: number, out?: Vector3): Vector3;
        /**
         * 与三角形相交检测。
         * TODO
         */
        intersectTriangle(p1: Readonly<Vector3>, p2: Readonly<Vector3>, p3: Readonly<Vector3>, backfaceCulling?: boolean): RaycastInfo | null;
        intersectPlane(planePoint: Vector3, planeNormal: Vector3): Vector3;
        /**
         * 与 AABB 相交检测。
         */
        intersectAABB(aabb: Readonly<AABB>, raycastInfo?: RaycastInfo): boolean;
        intersectAABB(minimum: Readonly<IVector3>, maximum: Readonly<IVector3>, raycastInfo?: RaycastInfo): boolean;
        /**
         * 与球相交检测。
         */
        intersectSphere(sphere: Readonly<Sphere>, raycastInfo?: RaycastInfo): boolean;
        intersectSphere(center: Readonly<IVector3>, radius: number, raycastInfo?: RaycastInfo): boolean;
        /**
         * @deprecated
         */
        static raycast(ray: Ray, isPickMesh?: boolean, maxDistance?: number, layerMask?: paper.Layer): RaycastInfo | null;
        /**
         * @deprecated
         */
        static raycastAll(ray: Ray, isPickMesh?: boolean, maxDistance?: number, layerMask?: paper.Layer): RaycastInfo[] | null;
        private static _doPick(ray, maxDistance, layerMask, pickAll?, isPickMesh?);
        private static _pickMesh(ray, transform, pickInfos);
        private static _pickCollider(ray, transform, pickInfos);
    }
    /**
     * 射线投射信息。
     */
    class RaycastInfo {
        private static readonly _instances;
        static create(): RaycastInfo;
        release(): this;
        subMeshIndex: number;
        triangleIndex: number;
        distance: number;
        readonly position: Vector3;
        readonly textureCoordA: Vector2;
        readonly textureCoordB: Vector2;
        transform: Transform | null;
        clear(): void;
    }
}
declare namespace egret3d {
    /**
     *
     */
    interface GLTFTexture extends gltf.Texture {
        extensions: {
            paper?: {
                mipmap?: boolean;
                format?: 6407 | 6408 | 6409;
                pixelSize?: number;
                width?: number;
                height?: number;
            };
        };
    }
    /**
     *
     */
    interface GLTFMaterial extends gltf.Material {
        extensions: {
            KHR_techniques_webgl: gltf.KhrTechniquesWebglMaterialExtension;
            paper: {
                renderQueue: number;
                defines?: string[];
                states?: gltf.States;
            };
        };
    }
    /**
     *
     */
    interface GLTF extends gltf.GLTF {
        version: string;
        extensions: {
            KHR_techniques_webgl?: gltf.KhrTechniqueWebglGlTfExtension;
            paper?: {
                shaders?: gltf.Shader[];
            };
        };
        extensionsUsed: string[];
        extensionsRequired: string[];
    }
    /**
     *
     */
    interface GLTFAnimation extends gltf.Animation {
        extensions: {
            paper: {
                /**
                 * 动画帧率。
                 */
                frameRate: number;
                /**
                 * 动画帧数。
                 */
                frameCount: number;
                /**
                 * 骨骼名称列表。
                 */
                joints: string[];
                /**
                 * 动画重定向。
                 */
                retarget?: {
                    joints: string[];
                };
                /**
                 * 动画剪辑列表。
                 */
                clips: GLTFAnimationClip[];
            };
        };
    }
    /**
     * 动画剪辑反序列化。
     */
    interface GLTFAnimationClip {
        /**
         * 动画剪辑名称。
         */
        name: string;
        /**
         * 播放次数。
         */
        playTimes?: number;
        /**
         * 开始时间。（以秒为单位）
         */
        position: number;
        /**
         * 持续时间。（以秒为单位）
         */
        duration: number;
        /**
         * 遮罩名称列表。
         */
        mask: number[];
        /**
         * 事件列表。
         */
        events: GLTFFrameEvent[];
    }
    interface GLTFAnimationChannel extends gltf.AnimationChannel {
        extensions?: {
            paper: {
                type: string;
                property: string;
            };
        };
    }
    /**
     * 帧事件反序列化。
     */
    interface GLTFFrameEvent {
        /**
         * 事件名称。
         */
        name: string;
        /**
         * 事件位置。（%）
         */
        position: number;
        /**
         * 事件 int 变量。
         */
        intVariable: number;
        /**
         * 事件 float 变量。
         */
        floatVariable: number;
        /**
         * 事件 string 变量。
         */
        stringVariable: string;
    }
    /**
     * glTF 资源。
     */
    class GLTFAsset extends paper.Asset {
        /**
         *
         */
        private static _createConfig();
        /**
         *
         */
        static parseFromBinary(array: Uint32Array): {
            config: GLTF;
            buffers: (Float32Array | Uint32Array | Uint16Array)[];
        };
        /**
         *
         */
        static createMeshConfig(): GLTF;
        /**
         *
         */
        static createGLTFExtensionsConfig(): GLTF;
        static createTechnique(source: gltf.Technique): gltf.Technique;
        static copyTechniqueStates(source: gltf.States, target?: gltf.States): gltf.States;
        /**
         * Buffer 列表。
         */
        readonly buffers: (Float32Array | Uint32Array | Uint16Array)[];
        /**
         * 配置。
         */
        config: GLTF;
        dispose(): boolean;
        caclByteLength(): number;
        /**
         * 根据指定 BufferView 创建二进制数组。
         */
        createTypeArrayFromBufferView(bufferView: gltf.BufferView, componentType: gltf.ComponentType): Float32Array;
        /**
         * 根据指定 Accessor 创建二进制数组。
         */
        createTypeArrayFromAccessor(accessor: gltf.Accessor, offset?: number, count?: number): Float32Array;
        /**
         *
         */
        getComponentTypeCount(type: gltf.ComponentType): number;
        /**
         *
         */
        getAccessorTypeCount(type: gltf.AccessorType): number;
        /**
         * 自定义 Mesh 的属性枚举。
         */
        getMeshAttributeType(type: gltf.MeshAttribute): gltf.AccessorType;
        /**
         * 通过 Accessor 获取指定 BufferLength。
         */
        getBufferLength(accessor: gltf.Accessor): number;
        /**
         * 通过 Accessor 获取指定 BufferOffset。
         */
        getBufferOffset(accessor: gltf.Accessor): number;
        /**
         * 通过 Accessor 获取指定 Buffer。
         */
        getBuffer(accessor: gltf.Accessor): Float32Array | Uint32Array | Uint16Array;
        /**
         * 通过 Accessor 获取指定 BufferView。
         */
        getBufferView(accessor: gltf.Accessor): gltf.BufferView;
        /**
         * 通过 Accessor 索引，获取指定 Accessor。
         */
        getAccessor(index: gltf.GLTFIndex): gltf.Accessor;
        /**
         * 获取节点。
         */
        getNode(index: gltf.GLTFIndex): gltf.Node;
        getAnimationClip(name: string): any;
    }
}
/**
 *
 */
declare namespace gltf {
    /**
     * glTF index.
     */
    type GLTFIndex = number;
    /**
     * BufferView target.
     */
    const enum BufferViewTarget {
        ArrayBuffer = 34962,
        ElementArrayBuffer = 34963,
    }
    /**
     * Component type.
     */
    const enum ComponentType {
        Byte = 5120,
        UnsignedByte = 5121,
        Short = 5122,
        UnsignedShort = 5123,
        Int = 5124,
        UnsignedInt = 5125,
        Float = 5126,
    }
    const enum MeshPrimitiveMode {
        Points = 0,
        Lines = 1,
        LineLoop = 2,
        LineStrip = 3,
        Triangles = 4,
        TrianglesStrip = 5,
        TrianglesFan = 6,
    }
    /**
     * The uniform type.  All valid values correspond to WebGL enums.
     */
    const enum UniformType {
        INT = 5124,
        FLOAT = 5126,
        FLOAT_VEC2 = 35664,
        FLOAT_VEC3 = 35665,
        FLOAT_VEC4 = 35666,
        INT_VEC2 = 35667,
        INT_VEC3 = 35668,
        INT_VEC4 = 35669,
        BOOL = 35670,
        BOOL_VEC2 = 35671,
        BOOL_VEC3 = 35672,
        BOOL_VEC4 = 35673,
        FLOAT_MAT2 = 35674,
        FLOAT_MAT3 = 35675,
        FLOAT_MAT4 = 35676,
        SAMPLER_2D = 35678,
        SAMPLER_CUBE = 35680,
    }
    /**
     *
     */
    const enum DrawMode {
        Stream = 35040,
        Static = 35044,
        Dynamic = 35048,
    }
    /**
     *
     */
    const enum TextureFormat {
        RGB = 6407,
        RGBA = 6408,
        LUMINANCE = 6409,
    }
    /**
     * The shader stage.  All valid values correspond to WebGL enums.
     */
    const enum ShaderStage {
        FRAGMENT_SHADER = 35632,
        VERTEX_SHADER = 35633,
    }
    const enum EnableState {
        BLEND = 3042,
        CULL_FACE = 2884,
        DEPTH_TEST = 2929,
        POLYGON_OFFSET_FILL = 32823,
        SAMPLE_ALPHA_TO_COVERAGE = 32926,
    }
    const enum BlendMode {
        None = 0,
        Blend = 1,
        Blend_PreMultiply = 2,
        Add = 3,
        Add_PreMultiply = 4,
    }
    const enum BlendEquation {
        FUNC_ADD = 32774,
        FUNC_SUBTRACT = 32778,
        FUNC_REVERSE_SUBTRACT = 32779,
    }
    const enum BlendFactor {
        ZERO = 0,
        ONE = 1,
        SRC_COLOR = 768,
        ONE_MINUS_SRC_COLOR = 769,
        DST_COLOR = 774,
        ONE_MINUS_DST_COLOR = 775,
        SRC_ALPHA = 770,
        ONE_MINUS_SRC_ALPHA = 771,
        DST_ALPHA = 772,
        ONE_MINUS_DST_ALPHA = 773,
        CONSTANT_COLOR = 32769,
        ONE_MINUS_CONSTANT_COLOR = 32770,
        CONSTANT_ALPHA = 32771,
        ONE_MINUS_CONSTANT_ALPHA = 32772,
        SRC_ALPHA_SATURATE = 776,
    }
    const enum CullFace {
        FRONT = 1028,
        BACK = 1029,
        FRONT_AND_BACK = 1032,
    }
    const enum FrontFace {
        CW = 2304,
        CCW = 2305,
    }
    const enum DepthFunc {
        NEVER = 512,
        LESS = 513,
        LEQUAL = 515,
        EQUAL = 514,
        GREATER = 516,
        NOTEQUAL = 517,
        GEQUAL = 518,
        ALWAYS = 519,
    }
    const enum AttributeSemanticType {
        POSITION = "POSITION",
        NORMAL = "NORMAL",
        TEXCOORD_0 = "TEXCOORD_0",
        TEXCOORD_1 = "TEXCOORD_1",
        COLOR_0 = "COLOR_0",
        COLOR_1 = "COLOR_1",
        JOINTS_0 = "JOINTS_0",
        WEIGHTS_0 = "WEIGHTS_0",
        MORPHTARGET_0 = "WEIGHTS_0",
        MORPHTARGET_1 = "WEIGHTS_1",
        MORPHTARGET_2 = "WEIGHTS_2",
        MORPHTARGET_3 = "WEIGHTS_3",
        MORPHTARGET_4 = "WEIGHTS_4",
        MORPHTARGET_5 = "WEIGHTS_5",
        MORPHTARGET_6 = "WEIGHTS_6",
        MORPHTARGET_7 = "WEIGHTS_7",
        MORPHNORMAL_0 = "MORPHNORMAL_0",
        MORPHNORMAL_1 = "MORPHNORMAL_1",
        MORPHNORMAL_2 = "MORPHNORMAL_2",
        MORPHNORMAL_3 = "MORPHNORMAL_3",
        _CORNER = "_CORNER",
        _START_POSITION = "_START_POSITION",
        _START_VELOCITY = "_START_VELOCITY",
        _START_COLOR = "_START_COLOR",
        _START_SIZE = "_START_SIZE",
        _START_ROTATION = "_START_ROTATION",
        _TIME = "_TIME",
        _RANDOM0 = "_RANDOM0",
        _RANDOM1 = "_RANDOM1",
        _WORLD_POSITION = "_WORLD_POSITION",
        _WORLD_ROTATION = "_WORLD_ROTATION",
    }
    const enum UniformSemanticType {
        LOCAL = "LOCAL",
        MODEL = "MODEL",
        VIEW = "VIEW",
        PROJECTION = "PROJECTION",
        MODELVIEW = "MODELVIEW",
        MODELVIEWPROJECTION = "MODELVIEWPROJECTION",
        MODELINVERSE = "MODELINVERSE",
        VIEWINVERSE = "VIEWINVERSE",
        PROJECTIONINVERSE = "PROJECTIONINVERSE",
        MODELVIEWINVERSE = "MODELVIEWINVERSE",
        MODELVIEWPROJECTIONINVERSE = "MODELVIEWPROJECTIONINVERSE",
        MODELINVERSETRANSPOSE = "MODELINVERSETRANSPOSE",
        MODELVIEWINVERSETRANSPOSE = "MODELVIEWINVERSETRANSPOSE",
        VIEWPORT = "VIEWPORT",
        JOINTMATRIX = "JOINTMATRIX",
        _VIEWPROJECTION = "_VIEWPROJECTION",
        _CAMERA_POS = "_CAMERA_POS",
        _CAMERA_UP = "CAMERA_UP",
        _CAMERA_FORWARD = "_CAMERA_FORWARD",
        _DIRECTLIGHTS = "_DIRECTLIGHTS",
        _POINTLIGHTS = "_POINTLIGHTS",
        _SPOTLIGHTS = "_SPOTLIGHTS",
        _AMBIENTLIGHTCOLOR = "_AMBIENTLIGHTCOLOR",
        _DIRECTIONSHADOWMAT = "_DIRECTIONSHADOWMAT",
        _SPOTSHADOWMAT = "_SPOTSHADOWMAT",
        _POINTSHADOWMAT = "_POINTSHADOWMAT",
        _DIRECTIONSHADOWMAP = "_DIRECTIONSHADOWMAP",
        _POINTSHADOWMAP = "_POINTSHADOWMAP",
        _SPOTSHADOWMAP = "_SPOTSHADOWMAP",
        _LIGHTMAPTEX = "_LIGHTMAPTEX",
        _LIGHTMAPINTENSITY = "_LIGHTMAPINTENSITY",
        _REFERENCEPOSITION = "_REFERENCEPOSITION",
        _NEARDICTANCE = "_NEARDICTANCE",
        _FARDISTANCE = "_FARDISTANCE",
        _FOG_COLOR = "_FOG_COLOR",
        _FOG_DENSITY = "_FOG_DENSITY",
        _FOG_NEAR = "_FOG_NEAR",
        _FOG_FAR = "_FOG_FAR",
    }
    const enum AccessorType {
        SCALAR = "SCALAR",
        VEC2 = "VEC2",
        VEC3 = "VEC3",
        VEC4 = "VEC4",
        MAT2 = "MAT2",
        MAT3 = "MAT3",
        MAT4 = "MAT4",
    }
    const enum MeshAttributeType {
        POSITION = "POSITION",
        NORMAL = "NORMAL",
        TANGENT = "TANGENT",
        TEXCOORD_0 = "TEXCOORD_0",
        TEXCOORD_1 = "TEXCOORD_1",
        COLOR_0 = "COLOR_0",
        COLOR_1 = "COLOR_1",
        JOINTS_0 = "JOINTS_0",
        WEIGHTS_0 = "WEIGHTS_0",
    }
    type MeshAttribute = MeshAttributeType | string;
    /**
     * Indices of those attributes that deviate from their initialization value.
     */
    interface AccessorSparseIndices {
        /**
         * The index of the bufferView with sparse indices. Referenced bufferView can't have ARRAY_BUFFER or ELEMENT_ARRAY_BUFFER target.
         */
        bufferView: GLTFIndex;
        /**
         * The offset relative to the start of the bufferView in bytes. Must be aligned.
         */
        byteOffset?: number;
        /**
         * The indices data type.
         */
        componentType: ComponentType.UnsignedByte | ComponentType.UnsignedShort | ComponentType.UnsignedInt;
        extensions?: any;
        extras?: any;
    }
    /**
     * Array of size `accessor.sparse.count` times number of components storing the displaced accessor attributes pointed by `accessor.sparse.indices`.
     */
    interface AccessorSparseValues {
        /**
         * The index of the bufferView with sparse values. Referenced bufferView can't have ARRAY_BUFFER or ELEMENT_ARRAY_BUFFER target.
         */
        bufferView: GLTFIndex;
        /**
         * The offset relative to the start of the bufferView in bytes. Must be aligned.
         */
        byteOffset?: number;
        extensions?: any;
        extras?: any;
    }
    /**
     * Sparse storage of attributes that deviate from their initialization value.
     */
    interface AccessorSparse {
        /**
         * Number of entries stored in the sparse array.
         */
        count: number;
        /**
         * Index array of size `count` that points to those accessor attributes that deviate from their initialization value. Indices must strictly increase.
         */
        indices: AccessorSparseIndices;
        /**
         * Array of size `count` times number of components, storing the displaced accessor attributes pointed by `indices`. Substituted values must have the same `componentType` and number of components as the base accessor.
         */
        values: AccessorSparseValues;
        extensions?: any;
        extras?: any;
    }
    /**
     * A typed view into a bufferView.  A bufferView contains raw binary data.  An accessor provides a typed view into a bufferView or a subset of a bufferView similar to how WebGL's `vertexAttribPointer()` defines an attribute in a buffer.
     */
    interface Accessor {
        /**
         * The index of the bufferView.
         */
        bufferView?: GLTFIndex;
        /**
         * The offset relative to the start of the bufferView in bytes.
         */
        byteOffset?: number;
        /**
         * The datatype of components in the attribute.
         */
        componentType: ComponentType;
        /**
         * Specifies whether integer data values should be normalized.
         */
        normalized?: boolean;
        /**
         * The number of attributes referenced by this accessor.
         */
        count: number;
        /**
         * Specifies if the attribute is a scalar, vector, or matrix.
         */
        type: AccessorType;
        /**
         * Maximum value of each component in this attribute.
         */
        max?: number[];
        /**
         * Minimum value of each component in this attribute.
         */
        min?: number[];
        /**
         * Sparse storage of attributes that deviate from their initialization value.
         */
        sparse?: AccessorSparse;
        name?: string;
        extensions?: any;
        extras?: any;
    }
    /**
     * The index of the node and TRS property that an animation channel targets.
     */
    interface AnimationChannelTarget {
        /**
         * The index of the node to target.
         */
        node?: GLTFIndex;
        /**
         * The name of the node's TRS property to modify, or the "weights" of the Morph Targets it instantiates. For the "translation" property, the values that are provided by the sampler are the translation along the x, y, and z axes. For the "rotation" property, the values are a quaternion in the order (x, y, z, w), where w is the scalar. For the "scale" property, the values are the scaling factors along the x, y, and z axes.
         */
        path: "translation" | "rotation" | "scale" | "weights" | string;
        extensions?: any;
        extras?: any;
    }
    /**
     * Targets an animation's sampler at a node's property.
     */
    interface AnimationChannel {
        /**
         * The index of a sampler in this animation used to compute the value for the target.
         */
        sampler: GLTFIndex;
        /**
         * The index of the node and TRS property to target.
         */
        target: AnimationChannelTarget;
        extensions?: any;
        extras?: any;
    }
    /**
     * Combines input and output accessors with an interpolation algorithm to define a keyframe graph (but not its target).
     */
    interface AnimationSampler {
        /**
         * The index of an accessor containing keyframe input values, e.g., time.
         */
        input: GLTFIndex;
        /**
         * Interpolation algorithm.
         */
        interpolation?: "LINEAR" | "STEP" | "CUBICSPLINE" | string;
        /**
         * The index of an accessor, containing keyframe output values.
         */
        output: GLTFIndex;
        extensions?: any;
        extras?: any;
    }
    /**
     * A keyframe animation.
     */
    interface Animation {
        /**
         * An array of channels, each of which targets an animation's sampler at a node's property. Different channels of the same animation can't have equal targets.
         */
        channels: AnimationChannel[];
        /**
         * An array of samplers that combines input and output accessors with an interpolation algorithm to define a keyframe graph (but not its target).
         */
        samplers: AnimationSampler[];
        name?: string;
        extensions?: any;
        extras?: any;
    }
    /**
     * Metadata about the glTF asset.
     */
    interface Asset {
        /**
         * A copyright message suitable for display to credit the content creator.
         */
        copyright?: string;
        /**
         * Tool that generated this glTF model.  Useful for debugging.
         */
        generator?: string;
        /**
         * The glTF version that this asset targets.
         */
        version: string;
        /**
         * The minimum glTF version that this asset targets.
         */
        minVersion?: string;
        extensions?: any;
        extras?: any;
    }
    /**
     * A buffer points to binary geometry, animation, or skins.
     */
    interface Buffer {
        /**
         * The uri of the buffer.
         */
        uri?: string;
        /**
         * The length of the buffer in bytes.
         */
        byteLength: number;
        name?: string;
        extensions?: any;
        extras?: any;
    }
    /**
     * A view into a buffer generally representing a subset of the buffer.
     */
    interface BufferView {
        /**
         * The index of the buffer.
         */
        buffer: GLTFIndex;
        /**
         * The offset into the buffer in bytes.
         */
        byteOffset?: number;
        /**
         * The length of the bufferView in bytes.
         */
        byteLength: number;
        /**
         * The stride, in bytes.
         */
        byteStride?: number;
        /**
         * The target that the GPU buffer should be bound to.
         */
        target?: BufferViewTarget;
        name?: string;
        extensions?: any;
        extras?: any;
    }
    /**
     * An orthographic camera containing properties to create an orthographic projection matrix.
     */
    interface CameraOrthographic {
        /**
         * The floating-point horizontal magnification of the view. Must not be zero.
         */
        xmag: number;
        /**
         * The floating-point vertical magnification of the view. Must not be zero.
         */
        ymag: number;
        /**
         * The floating-point distance to the far clipping plane. `zfar` must be greater than `znear`.
         */
        zfar: number;
        /**
         * The floating-point distance to the near clipping plane.
         */
        znear: number;
        extensions?: any;
        extras?: any;
    }
    /**
     * A perspective camera containing properties to create a perspective projection matrix.
     */
    interface CameraPerspective {
        /**
         * The floating-point aspect ratio of the field of view.
         */
        aspectRatio?: number;
        /**
         * The floating-point vertical field of view in radians.
         */
        yfov: number;
        /**
         * The floating-point distance to the far clipping plane.
         */
        zfar?: number;
        /**
         * The floating-point distance to the near clipping plane.
         */
        znear: number;
        extensions?: any;
        extras?: any;
    }
    /**
     * A camera's projection.  A node can reference a camera to apply a transform to place the camera in the scene.
     */
    interface Camera {
        /**
         * An orthographic camera containing properties to create an orthographic projection matrix.
         */
        orthographic?: CameraOrthographic;
        /**
         * A perspective camera containing properties to create a perspective projection matrix.
         */
        perspective?: CameraPerspective;
        /**
         * Specifies if the camera uses a perspective or orthographic projection.
         */
        type: "perspective" | "orthographic" | string;
        name?: string;
        extensions?: any;
        extras?: any;
    }
    /**
     * Image data used to create a texture. Image can be referenced by URI or `bufferView` index. `mimeType` is required in the latter case.
     */
    interface Image {
        /**
         * The uri of the image.
         */
        uri?: string;
        /**
         * The image's MIME type.
         */
        mimeType?: "image/jpeg" | "image/png" | string;
        /**
         * The index of the bufferView that contains the image. Use this instead of the image's uri property.
         */
        bufferView?: GLTFIndex;
        name?: string;
        extensions?: any;
        extras?: any;
    }
    /**
     * Reference to a texture.
     */
    interface TextureInfo {
        /**
         * The index of the texture.
         */
        index: GLTFIndex;
        /**
         * The set index of texture's TEXCOORD attribute used for texture coordinate mapping.
         */
        texCoord?: number;
        extensions?: any;
        extras?: any;
    }
    /**
     * A set of parameter values that are used to define the metallic-roughness material model from Physically-Based Rendering (PBR) methodology.
     */
    interface MaterialPbrMetallicRoughness {
        /**
         * The material's base color factor.
         */
        baseColorFactor?: number[];
        /**
         * The base color texture.
         */
        baseColorTexture?: TextureInfo;
        /**
         * The metalness of the material.
         */
        metallicFactor?: number;
        /**
         * The roughness of the material.
         */
        roughnessFactor?: number;
        /**
         * The metallic-roughness texture.
         */
        metallicRoughnessTexture?: TextureInfo;
        extensions?: any;
        extras?: any;
    }
    interface MaterialNormalTextureInfo {
        index?: any;
        texCoord?: any;
        /**
         * The scalar multiplier applied to each normal vector of the normal texture.
         */
        scale?: number;
        extensions?: any;
        extras?: any;
    }
    interface MaterialOcclusionTextureInfo {
        index?: any;
        texCoord?: any;
        /**
         * A scalar multiplier controlling the amount of occlusion applied.
         */
        strength?: number;
        extensions?: any;
        extras?: any;
    }
    /**
     * The material appearance of a primitive.
     */
    interface Material {
        name?: string;
        extensions?: any;
        extras?: any;
        /**
         * A set of parameter values that are used to define the metallic-roughness material model from Physically-Based Rendering (PBR) methodology. When not specified, all the default values of `pbrMetallicRoughness` apply.
         */
        pbrMetallicRoughness?: MaterialPbrMetallicRoughness;
        /**
         * The normal map texture.
         */
        normalTexture?: MaterialNormalTextureInfo;
        /**
         * The occlusion map texture.
         */
        occlusionTexture?: MaterialOcclusionTextureInfo;
        /**
         * The emissive map texture.
         */
        emissiveTexture?: TextureInfo;
        /**
         * The emissive color of the material.
         */
        emissiveFactor?: number[];
        /**
         * The alpha rendering mode of the material.
         */
        alphaMode?: "OPAQUE" | "MASK" | "BLEND" | string;
        /**
         * The alpha cutoff value of the material.
         */
        alphaCutoff?: number;
        /**
         * Specifies whether the material is double sided.
         */
        doubleSided?: boolean;
    }
    /**
     * Geometry to be rendered with the given material.
     */
    interface MeshPrimitive {
        /**
         * A dictionary object, where each key corresponds to mesh attribute semantic and each value is the index of the accessor containing attribute's data.
         */
        attributes: {
            POSITION?: GLTFIndex;
            NORMAL?: GLTFIndex;
            TANGENT?: GLTFIndex;
            TEXCOORD_0?: GLTFIndex;
            TEXCOORD_1?: GLTFIndex;
            COLOR_0?: GLTFIndex;
            COLOR_1?: GLTFIndex;
            JOINTS_0?: GLTFIndex;
            WEIGHTS_0?: GLTFIndex;
            [k: string]: GLTFIndex | undefined;
        };
        /**
         * The index of the accessor that contains the indices.
         */
        indices?: GLTFIndex;
        /**
         * The index of the material to apply to this primitive when rendering.
         */
        material?: GLTFIndex;
        /**
         * The type of primitives to render.
         */
        mode?: MeshPrimitiveMode;
        /**
         * An array of Morph Targets, each  Morph Target is a dictionary mapping attributes (only `POSITION`, `NORMAL`, and `TANGENT` supported) to their deviations in the Morph Target.
         */
        targets?: {
            [k: string]: GLTFIndex;
        }[];
        extensions?: any;
        extras?: any;
    }
    /**
     * A set of primitives to be rendered.  A node can contain one mesh.  A node's transform places the mesh in the scene.
     */
    interface Mesh {
        /**
         * An array of primitives, each defining geometry to be rendered with a material.
         */
        primitives: MeshPrimitive[];
        /**
         * Array of weights to be applied to the Morph Targets.
         */
        weights?: number[];
        name?: string;
        extensions?: any;
        extras?: any;
    }
    /**
     * A node in the node hierarchy.  When the node contains `skin`, all `mesh.primitives` must contain `JOINTS_0` and `WEIGHTS_0` attributes.  A node can have either a `matrix` or any combination of `translation`/`rotation`/`scale` (TRS) properties. TRS properties are converted to matrices and postmultiplied in the `T * R * S` order to compose the transformation matrix; first the scale is applied to the vertices, then the rotation, and then the translation. If none are provided, the transform is the identity. When a node is targeted for animation (referenced by an animation.channel.target), only TRS properties may be present; `matrix` will not be present.
     */
    interface Node {
        /**
         * The index of the camera referenced by this node.
         */
        camera?: GLTFIndex;
        /**
         * The indices of this node's children.
         */
        children?: GLTFIndex[];
        /**
         * The index of the skin referenced by this node.
         */
        skin?: GLTFIndex;
        /**
         * A floating-point 4x4 transformation matrix stored in column-major order.
         */
        matrix?: number[];
        /**
         * The index of the mesh in this node.
         */
        mesh?: GLTFIndex;
        /**
         * The node's unit quaternion rotation in the order (x, y, z, w), where w is the scalar.
         */
        rotation?: number[];
        /**
         * The node's non-uniform scale, given as the scaling factors along the x, y, and z axes.
         */
        scale?: number[];
        /**
         * The node's translation along the x, y, and z axes.
         */
        translation?: number[];
        /**
         * The weights of the instantiated Morph Target. Number of elements must match number of Morph Targets of used mesh.
         */
        weights?: number[];
        name?: string;
        extensions?: any;
        extras?: any;
    }
    /**
     * Texture sampler properties for filtering and wrapping modes.
     */
    interface Sampler {
        /**
         * Magnification filter.
         */
        magFilter?: 9728 | 9729 | number;
        /**
         * Minification filter.
         */
        minFilter?: 9728 | 9729 | 9984 | 9985 | 9986 | 9987 | number;
        /**
         * s wrapping mode.
         */
        wrapS?: 33071 | 33648 | 10497 | number;
        /**
         * t wrapping mode.
         */
        wrapT?: 33071 | 33648 | 10497 | number;
        name?: string;
        extensions?: any;
        extras?: any;
    }
    /**
     * The root nodes of a scene.
     */
    interface Scene {
        /**
         * The indices of each root node.
         */
        nodes?: GLTFIndex[];
        name?: string;
        extensions?: any;
        extras?: any;
    }
    /**
     * Joints and matrices defining a skin.
     */
    interface Skin {
        /**
         * The index of the accessor containing the floating-point 4x4 inverse-bind matrices.  The default is that each matrix is a 4x4 identity matrix, which implies that inverse-bind matrices were pre-applied.
         */
        inverseBindMatrices?: GLTFIndex;
        /**
         * The index of the node used as a skeleton root. When undefined, joints transforms resolve to scene root.
         */
        skeleton?: GLTFIndex;
        /**
         * Indices of skeleton nodes, used as joints in this skin.
         */
        joints: GLTFIndex[];
        name?: string;
        extensions?: any;
        extras?: any;
    }
    /**
     * A texture and its sampler.
     */
    interface Texture {
        /**
         * The index of the sampler used by this texture. When undefined, a sampler with repeat wrapping and auto filtering should be used.
         */
        sampler?: GLTFIndex;
        /**
         * The index of the image used by this texture.
         */
        source?: GLTFIndex;
        name?: string;
        extensions?: any;
        extras?: any;
    }
    /**
     * The root object for a glTF asset.
     */
    interface GLTF {
        /**
         * Names of glTF extensions used somewhere in this asset.
         */
        extensionsUsed?: string[];
        /**
         * Names of glTF extensions required to properly load this asset.
         */
        extensionsRequired?: string[];
        /**
         * An array of accessors.
         */
        accessors?: Accessor[];
        /**
         * An array of keyframe animations.
         */
        animations?: Animation[];
        /**
         * Metadata about the glTF asset.
         */
        asset: Asset;
        /**
         * An array of buffers.
         */
        buffers?: Buffer[];
        /**
         * An array of bufferViews.
         */
        bufferViews?: BufferView[];
        /**
         * An array of cameras.
         */
        cameras?: Camera[];
        /**
         * An array of images.
         */
        images?: Image[];
        /**
         * An array of materials.
         */
        materials?: Material[];
        /**
         * An array of meshes.
         */
        meshes?: Mesh[];
        /**
         * An array of nodes.
         */
        nodes?: Node[];
        /**
         * An array of samplers.
         */
        samplers?: Sampler[];
        /**
         * The index of the default scene.
         */
        scene?: GLTFIndex;
        /**
         * An array of scenes.
         */
        scenes?: Scene[];
        /**
         * An array of skins.
         */
        skins?: Skin[];
        /**
         * An array of textures.
         */
        textures?: Texture[];
        extensions?: any;
        extras?: any;
    }
    /**
    * A vertex or fragment shader. Exactly one of `uri` or `bufferView` must be provided for the GLSL source.
    */
    interface Shader {
        /**
         * The uri of the GLSL source.
         */
        uri?: string;
        /**
         * The shader stage.
         */
        type: 35632 | 35633;
        /**
         * The index of the bufferView that contains the GLSL shader source. Use this instead of the shader's uri property.
         */
        bufferView?: GLTFIndex;
        name: any;
        extensions?: any;
        extras?: any;
    }
    /**
     * An attribute input to a technique and the corresponding semantic.
     */
    interface Attribute {
        /**
         * Identifies a mesh attribute semantic.
         */
        semantic: string;
        extensions?: any;
        extras?: any;
        [k: string]: any;
    }
    type UniformValue = any;
    /**
     * A uniform input to a technique, and an optional semantic and value.
     */
    interface Uniform {
        /**
         * When defined, the uniform is an array of count elements of the specified type.  Otherwise, the uniform is not an array.
         */
        count?: number;
        /**
         * The index of the node whose transform is used as the uniform's value.
         */
        node?: GLTFIndex;
        /**
         * The uniform type.
         */
        type: 5124 | 5126 | 35664 | 35665 | 35666 | 35667 | 35668 | 35669 | 35670 | 35671 | 35672 | 35673 | 35674 | 35675 | 35676 | 35678 | 35680;
        /**
         * Identifies a uniform with a well-known meaning.
         */
        semantic?: string;
        /**
         * The value of the uniform.
         */
        value: UniformValue;
        name?: any;
        extensions?: any;
        extras?: any;
    }
    /**
     * A template for material appearances.
     */
    interface Technique {
        /**
         * The index of the program.
         */
        program?: GLTFIndex;
        /**
         * A dictionary object of `Attribute` objects.
         */
        attributes: {
            /**
             * An attribute input to a technique and the corresponding semantic.
             */
            [k: string]: gltf.Attribute;
        };
        /**
         * A dictionary object of `Uniform` objects.
         */
        uniforms: {
            /**
             * A uniform input to a technique, and an optional semantic and value.
             */
            [k: string]: gltf.Uniform;
        };
        name: any;
        states?: States;
        extensions?: any;
        extras?: any;
        [k: string]: any;
    }
    /**
     * A shader program, including its vertex and fragment shaders.
     */
    interface Program {
        /**
         * The index of the fragment shader.
         */
        fragmentShader: GLTFIndex;
        /**
         * The index of the vertex shader.
         */
        vertexShader: GLTFIndex;
        /**
         * The names of required WebGL 1.0 extensions.
         */
        glExtensions?: string[];
        name?: any;
        extensions?: any;
        extras?: any;
        [k: string]: any;
    }
    interface KhrTechniqueWebglGlTfExtension {
        /**
         * An array of shaders.
         */
        shaders: Shader[];
        /**
         * An array of techniques.
         */
        techniques: Technique[];
        /**
         * An array of programs.
         */
        programs: Program[];
    }
    /**
    * The technique to use for a material and any additional uniform values.
    */
    interface KhrTechniquesWebglMaterialExtension {
        /**
         * The index of the technique.
         */
        technique: string;
        /**
         * Dictionary object of uniform values.
         */
        values?: {
            [k: string]: UniformValue;
        };
        [k: string]: any;
    }
    /**
    * The technique to use for a material and any additional uniform values.
    */
    interface KhrBlendMaterialExtension {
        blendEquation: number[];
        blendFactors: number[];
    }
    /**
     * Arguments for fixed-function rendering state functions other than `enable()`/`disable()`.
     */
    interface Functions {
        /**
         * Floating-point values passed to `blendColor()`. [red, green, blue, alpha]
         */
        blendColor?: number[];
        /**
         * Integer values passed to `blendEquationSeparate()`.
         */
        blendEquationSeparate?: (32774 | 32778 | 32779)[];
        /**
         * Integer values passed to `blendFuncSeparate()`.
         */
        blendFuncSeparate?: (0 | 1 | 768 | 769 | 774 | 775 | 770 | 771 | 772 | 773 | 32769 | 32770 | 32771 | 32772 | 776)[];
        /**
         * Boolean values passed to `colorMask()`. [red, green, blue, alpha].
         */
        colorMask?: boolean[];
        /**
         * Integer value passed to `cullFace()`.
         */
        cullFace?: (1028 | 1029 | 1032)[];
        /**
         * Integer values passed to `depthFunc()`.
         */
        depthFunc?: (512 | 513 | 515 | 514 | 516 | 517 | 518 | 519)[];
        /**
         * Boolean value passed to `depthMask()`.
         */
        depthMask?: boolean[];
        /**
         * Floating-point values passed to `depthRange()`. [zNear, zFar]
         */
        depthRange?: number[];
        /**
         * Integer value passed to `frontFace()`.
         */
        frontFace?: (2304 | 2305)[];
        /**
         * Floating-point value passed to `lineWidth()`.
         */
        lineWidth?: number[];
        /**
         * Floating-point value passed to `polygonOffset()`.  [factor, units]
         */
        polygonOffset?: number[];
        extensions?: any;
        extras?: any;
        [k: string]: any;
    }
    /**
     * Fixed-function rendering states.
     */
    interface States {
        /**
         * WebGL states to enable.
         */
        enable?: (3042 | 2884 | 2929 | 32823 | 32926)[];
        /**
         * Arguments for fixed-function rendering state functions other than `enable()`/`disable()`.
         */
        functions?: Functions;
        extensions?: any;
        extras?: any;
    }
}
declare namespace paper {
    /**
     *
     */
    class BaseObjectAsset extends Asset {
        protected _raw: ISerializedData;
        dispose(): boolean;
        caclByteLength(): number;
    }
    /**
     * scene asset
     * @version paper 1.0
     * @platform Web
     * @language en_US
     */
    /**
     * 场景数据资源
     * @version paper 1.0
     * @platform Web
     * @language zh_CN
     */
    class RawScene extends BaseObjectAsset {
    }
}
declare namespace paper {
    /**
     * SystemManager 是ecs内部的系统管理者，负责每帧循环时轮询每个系统。
     */
    class SystemManager {
        private static _instance;
        static getInstance(): SystemManager;
        private constructor();
        private readonly _systems;
        private _preRegister<T>(systemClass);
        /**
         * 注册一个系统到管理器中。
         */
        register<T extends BaseSystem>(systemClass: {
            new (): T;
        }, after?: {
            new (): BaseSystem;
        } | null): T;
        /**
         * 注册一个系统到管理器中。
         */
        registerBefore<T extends BaseSystem>(systemClass: {
            new (): T;
        }, before?: {
            new (): BaseSystem;
        } | null): T;
        /**
         * 获取一个管理器中指定的系统实例。
         */
        getSystem<T extends BaseSystem>(systemClass: {
            new (): T;
        }): T;
        /**
         * 获取一个管理器中指定的系统实例。
         */
        getOrRegisterSystem<T extends BaseSystem>(systemClass: {
            new (): T;
        }): T;
        /**
         *
         */
        readonly systems: ReadonlyArray<BaseSystem>;
    }
}
declare namespace paper {
    /**
     * 场景管理器
     */
    class SceneManager {
        private static _instance;
        static getInstance(): SceneManager;
        private constructor();
        private readonly _scenes;
        private _globalScene;
        private _editorScene;
        /**
         * 卸载所有场景。
         */
        unloadAllScene(excludes?: ReadonlyArray<Scene>): void;
        /**
         *
         */
        getSceneByName(name: string): Scene;
        /**
         *
         */
        readonly scenes: ReadonlyArray<Scene>;
        /**
         *
         */
        readonly globalScene: Scene;
        /**
         * 当前激活的场景。
         */
        activeScene: Readonly<Scene>;
        /**
         *
         */
        readonly editorScene: Scene;
        /**
         * @deprecated
         */
        createScene(name: string, isActive?: boolean): Scene;
        /**
         * @deprecated
         */
        loadScene(resourceName: string, combineStaticObjects?: boolean): Scene;
        /**
         * @deprecated
         */
        unloadScene(scene: Scene): void;
        /**
         * @deprecated
         */
        getActiveScene(): Readonly<Scene>;
    }
}
declare namespace egret3d {
    /**
     *
     */
    class Quaternion extends Vector4 {
        static readonly IDENTITY: Readonly<Quaternion>;
        private static readonly _instancesQ;
        /**
         *
         */
        static create(x?: number, y?: number, z?: number, w?: number): Quaternion;
        release(): this;
        clone(): Quaternion;
        /**
         * - 旋转矩阵。
         */
        fromMatrix(matrix: Readonly<Matrix4>): this;
        fromEuler(value: Readonly<IVector3>, order?: EulerOrder): this;
        /**
         * - 向量必须已归一化。
         */
        fromAxis(axis: Readonly<IVector3>, radian: number): this;
        inverse(source?: Readonly<IVector4>): this;
        dot(value: Readonly<IVector4>): number;
        multiply(valueA: Readonly<IVector4>, valueB?: Readonly<IVector4>): this;
        premultiply(value: Readonly<IVector4>): this;
        lerp(t: number, valueA: Readonly<IVector4>, valueB?: Readonly<IVector4>): this;
        toEuler(value: Vector3, order?: EulerOrder): Vector3;
    }
}
declare namespace paper {
    /**
     * 单例组件基类。
     */
    abstract class SingletonComponent extends BaseComponent {
    }
}
declare namespace paper {
    /**
     *
     */
    const enum HideFlags {
        /**
         *
         */
        None = 0,
        /**
         *
         */
        NotEditable = 1,
        /**
         *
         */
        Hide = 2,
        /**
         *
         */
        HideAndDontSave = 3,
    }
    /**
     *
     */
    const enum DefaultNames {
        NoName = "NoName",
        Global = "Global",
        MainCamera = "Main Camera",
        EditorCamera = "Editor Camera",
        EditorOnly = "Editor Only",
    }
    /**
     *
     */
    const enum DefaultTags {
        Untagged = "",
        Respawn = "Respawn",
        Finish = "Finish",
        EditorOnly = "Editor Only",
        MainCamera = "Main Camera",
        Player = "Player",
        GameController = "Game Controller",
        Global = "Global",
    }
    /**
     * 渲染排序
     */
    const enum RenderQueue {
        Background = 1000,
        Geometry = 2000,
        AlphaTest = 2450,
        Transparent = 3000,
        Overlay = 4000,
    }
    /**
     * 这里暂未实现用户自定义层级，但用户可以使用预留的UserLayer。
     * 这个属性可以实现相机的选择性剔除。
     */
    const enum Layer {
        Default = 2,
        UI = 4,
        UserLayer1 = 8,
        UserLayer2 = 16,
        UserLayer3 = 32,
        UserLayer4 = 64,
        UserLayer5 = 128,
        UserLayer6 = 240,
        UserLayer7 = 256,
        UserLayer8 = 512,
        UserLayer9 = 1024,
        UserLayer10 = 2048,
        UserLayer11 = 3840,
    }
    /**
     * culling mask
     * @version paper 1.0
     * @platform Web
     * @language en_US
     */
    /**
     * culling mask 枚举。
     * 相机的cullingmask与renderer的renderLayer相匹配，才会执行渲染。否则将会被跳过。
     * 这个属性可以实现相机的选择性剔除。
     * @version paper 1.0
     * @platform Web
     * @language
     */
    const enum CullingMask {
        Everything = 16777215,
        Nothing = 1,
        Default = 2,
        UI = 4,
        UserLayer1 = 8,
        UserLayer2 = 16,
        UserLayer3 = 32,
        UserLayer4 = 64,
        UserLayer5 = 128,
        UserLayer6 = 240,
        UserLayer7 = 256,
        UserLayer8 = 512,
        UserLayer9 = 1024,
        UserLayer10 = 2048,
        UserLayer11 = 3840,
    }
    /**
     *
     * @param cullingMask
     * @param layer
     */
    function layerTest(cullingMask: CullingMask, layer: Layer): boolean;
    /**
     *
     * @param cullingMask
     * @param layer
     */
    function removeLayer(cullingMask: CullingMask, layer: Layer): number;
}
declare namespace paper {
    /**
     * 脚本组件。
     * 生命周期的顺序。
     * - onAwake();
     * - onReset();
     * - onEnable();
     * - onStart();
     * - onFixedUpdate();
     * - onUpdate();
     * - onLateUpdate();
     * - onDisable();
     * - onDestroy();
     */
    abstract class Behaviour extends BaseComponent {
        initialize(config?: any): void;
        uninitialize(): void;
        /**
         * 组件被初始化时调用。
         * - 在整个生命周期中只执行一次。
         * @see paper.GameObject#addComponent()
         */
        onAwake?(config: any): void;
        /**
         *
         */
        onReset?(): void;
        /**
         * 组件被激活或实体被激活时调用。
         * @see paper.BaseComponent#enabled
         * @see paper.GameObject#activeSelf
         */
        onEnable?(): void;
        /**
         * 组件开始运行时调用。
         * - 在整个生命周期中只执行一次。
         */
        onStart?(): void;
        /**
         *
         */
        onFixedUpdate?(currentTimes: number, totalTimes: number): void;
        /**
         *
         */
        onTriggerEnter?(collider: any): void;
        /**
         *
         */
        onTriggerStay?(collider: any): void;
        /**
         *
         */
        onTriggerExit?(collider: any): void;
        /**
         *
         */
        onCollisionEnter?(collider: any): void;
        /**
         *
         */
        onCollisionStay?(collider: any): void;
        /**
         *
         */
        onCollisionExit?(collider: any): void;
        /**
         *
         */
        onUpdate?(deltaTime: number): void;
        /**
         *
         */
        onAnimationEvent?(type: string, animationState: egret3d.AnimationState, eventObject: any): void;
        /**
         *
         */
        onLateUpdate?(deltaTime: number): void;
        /**
         * 组件被禁用或实体被禁用时调用。
         * @see paper.BaseComponent#enabled
         * @see paper.GameObject#activeSelf
         */
        onDisable?(): void;
        /**
         * 组件被移除或实体被销毁时调用。
         * - 在整个生命周期中只执行一次。
         * @see paper.GameObject#removeComponent()
         * @see paper.GameObject#destroy()
         */
        onDestroy?(): void;
        /**
         * @deprecated
         */
        onCollide(collider: any): void;
    }
}
declare namespace paper {
    /**
     * 系统基类。
     */
    abstract class BaseSystem {
        private static _createEnabled;
        private _locked;
        protected _enabled: boolean;
        /**
         *
         */
        protected readonly _interests: ReadonlyArray<InterestConfig> | ReadonlyArray<ReadonlyArray<InterestConfig>>;
        /**
         *
         */
        protected readonly _groups: GameObjectGroup[];
        /**
         *
         */
        protected readonly _clock: Clock;
        /**
         * 禁止实例化系统。
         * @protected
         */
        constructor();
        /**
         * 系统初始化时调用。
         */
        onAwake?(): void;
        /**
         * 系统被激活时调用。
         * @see paper.BaseSystem#enabled
         */
        onEnable?(): void;
        /**
         * 系统开始运行时调用。
         */
        onStart?(): void;
        /**
         * 实体被添加到组时调用。
         * - 注意，该调用并不是立即的，而是等到添加到组的下一帧才被调用。
         * @see paper.GameObject#addComponent()
         */
        onAddGameObject?(gameObject: GameObject, group: GameObjectGroup): void;
        /**
         * 充分非必要组件添加到实体时调用。
         * - 注意，该调用并不是立即的，而是等到添加到实体的下一帧才被调用。
         * @see paper.GameObject#addComponent()
         */
        onAddComponent?(component: BaseComponent, group: GameObjectGroup): void;
        /**
         * 充分非必要组件从实体移除时调用。
         * @see paper.GameObject#removeComponent()
         */
        onRemoveComponent?(component: BaseComponent, group: GameObjectGroup): void;
        /**
         * 实体从系统移除时调用。
         * @see paper.GameObject#removeComponent()
         */
        onRemoveGameObject?(gameObject: GameObject, group: GameObjectGroup): void;
        /**
         * 系统更新时调用。
         */
        onUpdate?(deltaTime?: number): void;
        /**
         *
         */
        onLateUpdate?(deltaTime?: number): void;
        /**
         * 系统被禁用时调用。
         * @see paper.BaseSystem#enabled
         */
        onDisable?(): void;
        /**
         * 系统被注销时调用。
         * @see paper.SystemManager#unregister()
         * @see paper.Application#systemManager
         */
        onDestroy?(): void;
        /**
         * 该系统是否被激活。
         */
        enabled: boolean;
        /**
         *
         */
        readonly groups: ReadonlyArray<GameObjectGroup>;
    }
}
declare namespace egret3d {
    class EventDispatcher {
        private _eventMap;
        addEventListener(type: string, listener: Function, thisObject: any): void;
        removeEventListener(type: string, listener: Function, thisObject: any): void;
        dispatchEvent(event: any): void;
        private notifyListener(event);
    }
}
declare namespace egret3d {
    /**
     * light component
     * @version paper 1.0
     * @platform Web
     * @language en_US
     */
    /**
     * 灯光组件
     * @version paper 1.0
     * @platform Web
     * @language
     */
    abstract class BaseLight extends paper.BaseComponent {
        /**
         * TODO
         */
        cullingMask: paper.CullingMask;
        /**
         *
         */
        intensity: number;
        /**
         *
         */
        readonly color: Color;
        /**
         *
         */
        castShadows: boolean;
        /**
         *
         */
        shadowRadius: number;
        /**
         *
         */
        shadowBias: number;
        /**
         *
         */
        shadowSize: number;
        /**
         *
         */
        shadowCameraNear: number;
        /**
         *
         */
        shadowCameraFar: number;
        /**
         *
         */
        shadowCameraSize: number;
        readonly viewPortPixel: IRectangle;
        readonly matrix: Matrix4;
        renderTarget: BaseRenderTarget;
        protected _updateMatrix(camera: Camera): void;
        /**
         *
         */
        power: number;
    }
}
declare namespace egret3d {
    /**
     * Mesh 渲染组件。
     */
    class MeshRenderer extends paper.BaseRenderer {
        protected readonly _materials: Material[];
        uninitialize(): void;
        recalculateAABB(): void;
        /**
         * material list
         * @version paper 1.0
         * @platform Web
         * @language en_US
         */
        /**
         * 材质数组
         * @version paper 1.0
         * @platform Web
         * @language
         */
        materials: ReadonlyArray<Material>;
        /**
         * 材质数组中的第一个材质。
         */
        material: Material | null;
    }
}
declare namespace egret3d {
    /**
     *
     */
    interface IRectangle {
        x: number;
        y: number;
        w: number;
        h: number;
    }
    /**
     * 矩形可序列化对象
     */
    class Rectangle implements IRectangle, paper.ISerializable {
        /**
         *
         */
        x: number;
        /**
         *
         */
        y: number;
        /**
         *
         */
        w: number;
        /**
         *
         */
        h: number;
        /**
         *
         */
        constructor(x?: number, y?: number, w?: number, h?: number);
        serialize(): number[];
        deserialize(element: number[]): this;
    }
}
declare namespace egret3d {
    class Color implements paper.IRelease<Color>, paper.ISerializable {
        static readonly WHITE: Readonly<Color>;
        static readonly BLACK: Readonly<Color>;
        static readonly RED: Readonly<Color>;
        static readonly GREEN: Readonly<Color>;
        static readonly BLUE: Readonly<Color>;
        private static readonly _instances;
        static create(r?: number, g?: number, b?: number, a?: number): Color;
        release(): this;
        r: number;
        g: number;
        b: number;
        a: number;
        /**
         * 请使用 `egret3d.Color.create()` 创建实例。
         * @see egret3d.Color.create()
         */
        private constructor();
        serialize(): number[];
        deserialize(value: Readonly<[number, number, number, number]>): this;
        clone(): Color;
        copy(value: Readonly<Color>): this;
        set(r: number, g: number, b: number, a: number): this;
        fromArray(value: Readonly<ArrayLike<number>>, offset?: number): this;
        multiply(valueA: Readonly<Color>, valueB?: Readonly<Color>): this;
        scale(value: number, source?: Readonly<Color>): this;
        lerp(t: number, valueA: Readonly<Color>, valueB?: Readonly<Color>): this;
    }
}
declare namespace egret3d {
    /**
     *
     */
    const RAD_DEG: number;
    /**
     *
     */
    const DEG_RAD: number;
    /**
     *
     */
    const EPSILON = 2.220446049250313e-16;
    function sign(value: number): number;
    function floatClamp(v: number, min?: number, max?: number): number;
    function numberLerp(fromV: number, toV: number, v: number): number;
    function getNormal(a: Readonly<IVector3>, b: Readonly<IVector3>, c: Readonly<IVector3>, out: Vector3): Vector3;
    function calPlaneLineIntersectPoint(planeVector: Vector3, planePoint: Vector3, lineVector: Vector3, linePoint: Vector3, out: Vector3): Vector3;
    function triangleIntersectsPlane(): void;
    function triangleIntersectsAABB(triangle: Readonly<Triangle>, aabb: Readonly<AABB>): boolean;
    function planeIntersectsAABB(plane: Readonly<Plane>, aabb: Readonly<AABB>): boolean;
    function planeIntersectsSphere(plane: Readonly<Plane>, sphere: Readonly<Sphere>): boolean;
    function aabbIntersectsSphere(aabb: Readonly<AABB>, sphere: Readonly<Sphere>): boolean;
    function aabbIntersectsAABB(valueA: Readonly<AABB>, valueB: Readonly<AABB>): boolean;
    function sphereIntersectsSphere(valueA: Readonly<Sphere>, valueB: Readonly<Sphere>): boolean;
}
declare namespace egret3d {
    /**
     *
     */
    abstract class BaseMesh extends GLTFAsset {
        protected _drawMode: gltf.DrawMode;
        protected _vertexCount: number;
        protected readonly _attributeNames: string[];
        protected readonly _customAttributeTypes: {
            [key: string]: gltf.AccessorType;
        };
        protected _glTFMesh: gltf.Mesh | null;
        private _helpVertices;
        /**
         * 请使用 `egret3d.Mesh.create()` 创建实例。
         * @see egret3d.Mesh.create()
         * @deprecated
         */
        constructor(vertexCount: number, indexCount: number, attributeNames?: gltf.MeshAttribute[] | null, attributeTypes?: {
            [key: string]: gltf.AccessorType;
        } | null, drawMode?: gltf.DrawMode);
        constructor(config: GLTF, buffers: Uint32Array[], name: string);
        /**
         *
         */
        clone(): Mesh;
        /**
         * TODO
         */
        raycast(ray: Readonly<Ray>, worldMatrix: Readonly<Matrix4>, boneMatrices?: Float32Array | null): RaycastInfo;
        /**
         *
         */
        addSubMesh(indexCount: number, materialIndex?: number, randerMode?: gltf.MeshPrimitiveMode): number;
        /**
         *
         */
        getVertices(offset?: number, count?: number): Float32Array;
        /**
         *
         */
        getUVs(offset?: number, count?: number): Float32Array;
        /**
         *
         */
        getColors(offset?: number, count?: number): Float32Array;
        /**
         *
         */
        getNormals(offset?: number, count?: number): Float32Array;
        /**
         *
         */
        getTangents(offset?: number, count?: number): Float32Array;
        /**
         *
         */
        getAttributes(attributeType: gltf.MeshAttribute, offset?: number, count?: number): Float32Array;
        /**
         *
         */
        setAttributes(attributeType: gltf.MeshAttribute, value: Readonly<ArrayLike<number>>, offset?: number, count?: number): Float32Array;
        /**
         *
         */
        getIndices(subMeshIndex?: number): Uint16Array;
        /**
         *
         */
        setIndices(value: Readonly<ArrayLike<number>>, subMeshIndex?: number, offset?: number): Uint16Array;
        /**
         * 绑定显存。
         */
        abstract _createBuffer(): void;
        /**
         *
         */
        abstract uploadVertexBuffer(uploadAttributes?: gltf.MeshAttribute | (gltf.MeshAttribute[]), offset?: number, count?: number): void;
        /**
         *
         */
        abstract uploadSubIndexBuffer(subMeshIndex: number): void;
        /**
         *
         */
        drawMode: gltf.DrawMode;
        /**
         * 获取子网格数量。
         */
        readonly subMeshCount: number;
        /**
         *
         */
        readonly vertexCount: number;
        /**
         *
         */
        readonly attributeNames: ReadonlyArray<string>;
        /**
         * 获取 glTFMesh 数据。
         */
        readonly glTFMesh: gltf.Mesh;
    }
}
declare namespace egret3d {
    /**
     * 纹理资源。
     */
    class Texture extends paper.Asset {
        caclByteLength(): number;
    }
}
declare namespace paper.editor {
    interface IEventDispatcher {
        addEventListener(type: string, fun: Function, thisObj: any): void;
        removeEventListener(type: string, fun: Function, thisObj: any): void;
        dispatchEvent(event: BaseEvent): void;
    }
    /**
     * 事件派发器
     */
    class EventDispatcher implements IEventDispatcher {
        __z_e_listeners: any;
        constructor();
        addEventListener(type: string, fun: Function, thisObj: any, level?: number): void;
        removeEventListener(type: string, fun: Function, thisObj: any): void;
        dispatchEvent(event: BaseEvent): void;
    }
    /**
     * 事件
     */
    class BaseEvent {
        type: string;
        data: any;
        constructor(type: string, data?: any);
    }
}
declare namespace paper {
    /**
     * 预制体资源。
     */
    class Prefab extends BaseObjectAsset {
        /**
         *
         */
        static create(name: string): GameObject | null;
        static create(name: string, x: number, y: number, z: number): GameObject | null;
        static create(name: string, scene: Scene): GameObject | null;
        static create(name: string, x: number, y: number, z: number, scene: Scene): GameObject | null;
        /**
         * @deprecated
         */
        createInstance(scene?: Scene | null, keepUUID?: boolean): GameObject;
    }
}
declare namespace paper.editor {
    abstract class BaseGeo {
        editorModel: EditorModel;
        geo: GameObject;
        private baseColor;
        greyColor: egret3d.Material;
        yellowColor: egret3d.Material;
        protected helpVec3_1: egret3d.Vector3;
        protected helpVec3_2: egret3d.Vector3;
        protected helpVec3_3: egret3d.Vector3;
        protected helpQuat_1: egret3d.Quaternion;
        protected helpQuat_2: egret3d.Quaternion;
        protected forward: egret3d.Vector3;
        protected up: egret3d.Vector3;
        protected right: egret3d.Vector3;
        protected _dragOffset: egret3d.Vector3;
        protected _delta: egret3d.Vector3;
        protected _newPosition: egret3d.Vector3;
        protected _ctrlPos: egret3d.Vector3;
        _ctrlRot: egret3d.Quaternion;
        protected _dragPlanePoint: egret3d.Vector3;
        protected _dragPlaneNormal: egret3d.Vector3;
        protected _initRotation: egret3d.Quaternion;
        protected _oldLocalScale: egret3d.Vector3;
        constructor();
        onSet(): void;
        abstract isPressed_local(ray: egret3d.Ray, selectedGameObjs: GameObject[]): any;
        abstract wasPressed_local(ray: egret3d.Ray, selectedGameObjs: GameObject[]): any;
        abstract isPressed_world(ray: egret3d.Ray, selectedGameObjs: GameObject[]): any;
        abstract wasPressed_world(ray: egret3d.Ray, selectedGameObjs: GameObject[]): any;
        abstract wasReleased(selectedGameObj: GameObject[]): any;
        _checkIntersect(ray: egret3d.Ray): this;
        changeColor(color: string): void;
        protected _createAxis(color: egret3d.Vector4, type: number): GameObject;
        protected _createCircleLine(): egret3d.Mesh;
        protected createFan(maxAngle: number, _mesh?: egret3d.MeshFilter): any;
    }
}
declare namespace paper.editor {
    abstract class BaseState {
        editorModel: EditorModel;
        autoClear: boolean;
        batchIndex: number;
        private _isDone;
        data: any;
        undo(): boolean;
        redo(): boolean;
        isDone: boolean;
        dispatchEditorModelEvent(type: string, data?: any): void;
        serialize(): any;
        deserialize(data: any): void;
    }
}
declare namespace paper {
    /**
     *
     */
    class ContactColliders extends SingletonComponent {
        /**
         *
         */
        readonly begin: any[];
        /**
         *
         */
        readonly stay: any[];
        /**
         *
         */
        readonly end: any[];
    }
}
declare namespace paper {
    /**
     *
     */
    class DisposeCollecter extends SingletonComponent {
        /**
         * 移除的场景数组。
         */
        readonly scenes: Scene[];
        /**
         * 移除的实体数组。
         */
        readonly gameObjects: GameObject[];
        /**
         * 移除的组件数组。
         */
        readonly components: BaseComponent[];
    }
}
declare namespace egret3d {
    /**
     *
     */
    class Sphere implements paper.IRelease<Sphere>, paper.ISerializable {
        private static readonly _instances;
        /**
         *
         * @param center
         * @param radius
         */
        static create(center?: Readonly<IVector3>, radius?: number): Sphere;
        release(): this;
        /**
         *
         */
        radius: number;
        /**
         *
         */
        readonly center: Vector3;
        /**
         * 请使用 `egret3d.Sphere.create()` 创建实例。
         * @see egret3d.Sphere.create()
         */
        private constructor();
        serialize(): number[];
        deserialize(value: Readonly<[number, number, number, number]>): this;
        clone(): Sphere;
        copy(value: Readonly<Sphere>): this;
        set(center: Readonly<IVector3>, radius: number): this;
        fromPoints(points: Readonly<ArrayLike<IVector3>>, center?: Readonly<IVector3>): this;
        applyMatrix(matrix: Readonly<Matrix4>): this;
        contains(value: Readonly<IVector3 | Sphere>): boolean;
        getDistance(value: Readonly<IVector3>): number;
        clampPoint(point: Readonly<IVector3>, out: Vector3): Vector3;
    }
}
declare namespace egret3d {
    /**
     *
     */
    class Spherical implements paper.IRelease<Spherical>, paper.ISerializable {
        private static readonly _instances;
        /**
         *
         */
        static create(radius?: number, phi?: number, theta?: number): Spherical;
        release(): this;
        /**
         *
         */
        radius: number;
        /**
         *
         */
        phi: number;
        /**
         *
         */
        theta: number;
        /**
         * 请使用 `egret3d.Spherical.create()` 创建实例。
         * @see egret3d.Spherical.create()
         */
        private constructor();
        serialize(): number[];
        deserialize(value: Readonly<[number, number, number]>): this;
        clone(): Spherical;
        copy(value: Readonly<Spherical>): this;
        set(radius: number, phi: number, theta: number): this;
        fromCartesianCoords(value: Readonly<IVector3>): this;
        fromCartesianCoords(x: number, y: number, z: number): this;
        makeSafe(): this;
    }
}
declare namespace paper {
    /**
     *
     */
    const enum InterestType {
        /**
         *
         */
        Extends = 1,
        /**
         *
         */
        Exculde = 2,
        /**
         *
         */
        Unessential = 4,
    }
    /**
     * 关心组件的配置。
     */
    type InterestConfig = {
        /**
         * 关心的组件或组件列表。
         */
        componentClass: ComponentClass<BaseComponent>[] | ComponentClass<BaseComponent>;
        /**
         *
         */
        type?: InterestType;
        /**
         * 关心该组件的事件。
         */
        listeners?: {
            /**
             * 事件类型。
             */
            type: string;
            /**
             * 事件监听。
             */
            listener: (component: BaseComponent) => void;
        }[];
    };
    /**
     *
     */
    class GameObjectGroup {
        private static readonly _groups;
        /**
         *
         */
        locked: boolean;
        readonly name: string;
        private _isRemoved;
        private readonly _isBehaviour;
        private readonly _bufferedGameObjects;
        private _gameObjects;
        private readonly _bufferedComponents;
        private _behaviourComponents;
        private readonly _interestConfig;
        private constructor();
        private _onAddComponent(component);
        private _onAddUnessentialComponent(component);
        private _onRemoveUnessentialComponent(component);
        private _onRemoveComponent(component);
        private _addGameObject(gameObject);
        private _removeGameObject(gameObject);
        private _update();
        /**
         * 判断实体是否被收集。
         */
        hasGameObject(gameObject: GameObject): boolean;
        /**
         *
         */
        readonly gameObjects: ReadonlyArray<GameObject>;
        /**
         *
         */
        readonly components: ReadonlyArray<BaseComponent>;
    }
}
declare namespace egret3d {
    /**
     * aabb box
     * @version paper 1.0
     * @platform Web
     * @language en_US
     */
    /**
     * 轴对称包围盒
     * @version paper 1.0
     * @platform Web
     * @language zh_CN
     */
    class AABB implements paper.IRelease<AABB>, paper.ISerializable {
        private static readonly _instances;
        static create(minimum?: Readonly<IVector3> | null, maximum?: Readonly<IVector3> | null): AABB;
        release(): this;
        private _dirtyRadius;
        private _dirtyCenter;
        private _dirtySize;
        private _boundingSphereRadius;
        private readonly _minimum;
        private readonly _maximum;
        private readonly _center;
        private readonly _size;
        /**
         * 请使用 `egret3d.AABB.create()` 创建实例。
         * @see egret3d.AABB.create()
         */
        private constructor();
        serialize(): number[];
        deserialize(value: Readonly<[number, number, number, number, number, number]>): this;
        clone(): AABB;
        copy(value: Readonly<AABB>): this;
        clear(): this;
        /**
         *
         */
        set(minimum?: Readonly<IVector3> | null, maximum?: Readonly<IVector3> | null): this;
        fromArray(value: Readonly<ArrayLike<number>>, offset?: number): this;
        /**
         *
         */
        fromPoints(value: Readonly<ArrayLike<IVector3>>): this;
        applyMatrix(value: Readonly<Matrix4>, source?: Readonly<AABB>): this;
        /**
         *
         */
        add(value: Readonly<IVector3 | AABB>, source?: Readonly<AABB>): this;
        /**
         *
         */
        expand(value: Readonly<IVector3> | number, source?: Readonly<AABB>): this;
        /**
         *
         */
        offset(value: number | Readonly<IVector3>, source?: Readonly<AABB>): this;
        /**
         * check contains vector
         * @param value a world point
         * @version paper 1.0
         * @platform Web
         * @language en_US
         */
        /**
         * 检查是否包含点
         * @param value 世界坐标
         * @version paper 1.0
         * @platform Web
         * @language zh_CN
         */
        contains(value: Readonly<IVector3 | AABB>): boolean;
        getDistance(value: Readonly<IVector3>): number;
        clampPoints(value: Readonly<IVector3>, out: Vector3): Vector3;
        readonly isEmpty: boolean;
        /**
         * Bounding sphere radius.
         */
        readonly boundingSphereRadius: number;
        /**
         *
         */
        readonly minimum: Readonly<IVector3>;
        /**
         *
         */
        readonly maximum: Readonly<IVector3>;
        /**
         * get center
         * @version paper 1.0
         * @platform Web
         * @language en_US
         */
        /**
         * 获取中心点位置
         * @version paper 1.0
         * @platform Web
         * @language zh_CN
         */
        center: Readonly<IVector3>;
        size: Readonly<IVector3>;
    }
    const helpAABBA: AABB;
}
declare namespace paper {
}
declare namespace paper {
}
declare namespace paper {
    /**
     *
     */
    class UpdateSystem extends BaseSystem {
        protected readonly _interests: {
            componentClass: any;
            type: number;
            isBehaviour: boolean;
        }[];
        onUpdate(deltaTime: number): void;
    }
}
declare namespace paper {
    /**
     *
     */
    class LateUpdateSystem extends BaseSystem {
        protected readonly _interests: {
            componentClass: any;
            type: number;
            isBehaviour: boolean;
        }[];
        private readonly _laterCalls;
        onUpdate(deltaTime: number): void;
        /**
         *
         */
        callLater(callback: () => void): void;
    }
}
declare namespace paper {
}
declare namespace paper {
}
declare namespace paper {
    /**
     *
     */
    class Deserializer {
        /**
         *
         */
        readonly assets: string[];
        /**
         *
         */
        readonly objects: {
            [key: string]: Scene | GameObject;
        };
        /**
         *
         */
        readonly components: {
            [key: string]: BaseComponent;
        };
        private _keepUUID;
        private _makeLink;
        private readonly _deserializers;
        private _target;
        private _deserializeObject(source, target);
        private _createComponent(componentSource, source?, target?);
        private _deserializeChild(source, target?);
        getAssetOrComponent(source: IUUID | IAssetReference): Asset | GameObject | BaseComponent | null;
    }
}
declare namespace paper {
    /**
     *
     */
    const DATA_VERSION: number;
    /**
     *
     */
    const DATA_VERSIONS: number[];
    /**
     *
     */
    function serialize(source: Scene | GameObject | BaseComponent, inline?: boolean): ISerializedData;
    /**
     *
     */
    function clone(object: GameObject): BaseComponent | GameObject | Scene;
    /**
     *
     */
    function equal(source: any, target: any): boolean;
    /**
     *
     */
    function serializeAsset(source: Asset): IAssetReference;
    /**
     * 创建指定对象的结构体。
     */
    function serializeStruct(source: BaseObject): ISerializedStruct;
}
declare namespace egret3d {
    /**
     *
     * 贝塞尔曲线，目前定义了三种：线性贝塞尔曲线(两个点形成),二次方贝塞尔曲线（三个点形成），三次方贝塞尔曲线（四个点形成）
     */
    class Curve3 {
        /**
        * 贝塞尔曲线上的，不包含第一个点
        */
        private _beizerPoints;
        /**
        * 贝塞尔曲线上所有的个数
        */
        private _bezierPointNum;
        beizerPoints: egret3d.Vector3[];
        bezierPointNum: number;
        /**
         * 线性贝塞尔曲线
         */
        static CreateLinearBezier(start: egret3d.Vector3, end: egret3d.Vector3, indices: number): Curve3;
        /**
         * 二次方贝塞尔曲线路径
         * @param v0 起始点
         * @param v1 选中的节点
         * @param v2 结尾点
         * @param nbPoints 将贝塞尔曲线拆分nbPoints段，一共有nbPoints + 1个点
         */
        static CreateQuadraticBezier(v0: egret3d.Vector3, v1: egret3d.Vector3, v2: egret3d.Vector3, bezierPointNum: number): Curve3;
        /**
         * 三次方贝塞尔曲线路径
         * @param v0
         * @param v1
         * @param v2
         * @param v3
         * @param nbPoints
         */
        static CreateCubicBezier(v0: egret3d.Vector3, v1: egret3d.Vector3, v2: egret3d.Vector3, v3: egret3d.Vector3, bezierPointNum: number): Curve3;
        constructor(points: egret3d.Vector3[], nbPoints: number);
        /**
         * 贝塞尔曲线上的点
         */
        getPoints(): Vector3[];
    }
}
declare namespace egret3d {
}
declare namespace egret3d {
}
declare namespace egret3d {
    /**
     * Transform 组件。
     * - 存储实体之间的父子关系。
     * - 存储实体 3D 空间坐标系。
     */
    class Transform extends paper.BaseComponent {
        private _localDirty;
        private _worldDirty;
        private readonly _localMatrix;
        private readonly _worldMatrix;
        private readonly _localPosition;
        private readonly _localRotation;
        private readonly _localEuler;
        private readonly _localEulerAngles;
        private readonly _localScale;
        private readonly _position;
        private readonly _rotation;
        private readonly _euler;
        private readonly _eulerAngles;
        private readonly _scale;
        private _removeFromChildren(value);
        private _dirtify(isLocalDirty, dirty);
        private _updateMatrix(isWorldSpace);
        private _updateEuler(isWorldSpace, order?);
        /**
         * 父节点发生改变的回调方法
         * 子类可通过重载此方法进行标脏状态传递
         */
        protected _onParentChange(newParent: Transform | null, oldParent: Transform | null): void;
        /**
         * 销毁所有子 Transform 组件。
         */
        destroyChildren(): void;
        /**
         * 是否包含指定的子 Transform 组件。
         */
        contains(value: Transform): boolean;
        /**
         * 设置指定的父 Transform 组件。
         */
        setParent(value: Transform | null, worldPositionStays?: boolean): this;
        getChildIndex(value: Transform): number;
        setChildIndex(value: Transform, index: number): void;
        /**
         *
         */
        getChildAt(index: number): Transform;
        /**
         * Finds a child by name or path and returns it.
         * @param nameOrPath
         */
        find(nameOrPath: string): Transform;
        /**
         * 本地位置。
         */
        getLocalPosition(): Readonly<Vector3>;
        /**
         * 本地位置。
         */
        setLocalPosition(position: Readonly<IVector3>): this;
        setLocalPosition(x: number, y: number, z: number): this;
        /**
         * 本地位置。
         */
        localPosition: Readonly<Vector3 | IVector3>;
        /**
         * 本地旋转。
         */
        getLocalRotation(): Readonly<Quaternion>;
        /**
         * 本地旋转。
         */
        setLocalRotation(rotation: Readonly<IVector4>): this;
        setLocalRotation(x: number, y: number, z: number, w: number): this;
        /**
         * 本地旋转。
         */
        localRotation: Readonly<Quaternion | IVector4>;
        /**
         * 本地欧拉弧度。
         */
        getLocalEuler(order?: EulerOrder): Readonly<Vector3>;
        /**
         * 本地欧拉弧度。
         */
        setLocalEuler(value: Readonly<IVector3>, order?: EulerOrder): this;
        setLocalEuler(x: number, y: number, z: number, order?: EulerOrder): this;
        /**
         * 本地欧拉弧度。
         */
        localEuler: Readonly<Vector3 | IVector3>;
        /**
         * 本地欧拉角度。
         */
        getLocalEulerAngles(order?: EulerOrder): Readonly<Vector3>;
        /**
         * 本地欧拉角度。
         */
        setLocalEulerAngles(value: Readonly<IVector3>, order?: EulerOrder): this;
        setLocalEulerAngles(x: number, y: number, z: number, order?: EulerOrder): this;
        /**
         * 本地欧拉角度。
         */
        localEulerAngles: Readonly<Vector3 | IVector3>;
        /**
         * 本地缩放。
         */
        getLocalScale(): Readonly<Vector3>;
        /**
         * 本地缩放。
         */
        setLocalScale(v: Readonly<IVector3>): this;
        setLocalScale(x: number, y?: number, z?: number): this;
        /**
         * 本地缩放。
         */
        localScale: Readonly<Vector3 | IVector3>;
        /**
         * 本地矩阵。
         */
        getLocalMatrix(): Readonly<Matrix4>;
        /**
         * 本地矩阵。
         */
        readonly localMatrix: Readonly<Matrix4>;
        /**
         * 世界位置。
         */
        getPosition(): Readonly<Vector3>;
        /**
         * 世界位置。
         */
        setPosition(position: Readonly<IVector3>): this;
        setPosition(x: number, y: number, z: number): this;
        /**
         * 世界位置。
         */
        position: Readonly<Vector3 | IVector3>;
        /**
         * 世界旋转。
         */
        getRotation(): Readonly<Quaternion>;
        /**
         * 世界旋转。
         */
        setRotation(v: Readonly<IVector4>): this;
        setRotation(x: number, y: number, z: number, w: number): this;
        /**
         * 世界旋转。
         */
        rotation: Readonly<Quaternion | IVector4>;
        /**
         * 世界欧拉弧度。
         */
        getEuler(order?: EulerOrder): Readonly<Vector3>;
        /**
         * 世界欧拉弧度。
         */
        setEuler(v: Readonly<IVector3>, order?: EulerOrder): this;
        setEuler(x: number, y: number, z: number, order?: EulerOrder): this;
        /**
         * 世界欧拉弧度。
         */
        euler: Readonly<Vector3 | IVector3>;
        /**
         * 世界欧拉角度。
         */
        getEulerAngles(order?: EulerOrder): Readonly<Vector3>;
        /**
         * 世界欧拉角度。
         */
        setEulerAngles(v: Readonly<IVector3>, order?: EulerOrder): this;
        setEulerAngles(x: number, y: number, z: number, order?: EulerOrder): this;
        /**
         * 世界欧拉角度。
         */
        eulerAngles: Readonly<Vector3 | IVector3>;
        /**
         * 世界缩放。
         */
        getScale(): Readonly<Vector3>;
        /**
         * 世界缩放。
         */
        setScale(v: Readonly<IVector3>): this;
        setScale(x: number, y?: number, z?: number): this;
        /**
         * 世界缩放。
         */
        scale: Readonly<Vector3 | IVector3>;
        /**
         * 世界矩阵。
         */
        getWorldMatrix(): Readonly<Matrix4>;
        /**
         * 世界矩阵。
         */
        readonly worldMatrix: Readonly<Matrix4>;
        /**
         * 位移指定距离。
         */
        translate(value: Readonly<IVector3>, isWorldSpace?: boolean): this;
        translate(x: number, y: number, z: number, isWorldSpace?: boolean): this;
        /**
         * 旋转指定欧拉弧度。
         */
        rotate(value: Readonly<IVector3>, isWorldSpace?: boolean, order?: EulerOrder): this;
        rotate(x: number, y: number, z: number, isWorldSpace?: boolean, order?: EulerOrder): this;
        /**
         * 绕轴旋转弧度。
         */
        rotateOnAxis(axis: Readonly<IVector3>, radian: number, isWorldSpace?: boolean): this;
        /**
         *
         */
        rotateAround(position: Readonly<IVector3>, axis: Readonly<IVector3>, radian: number): this;
        /**
         * 旋转指定欧拉角度。
         */
        rotateAngle(value: Readonly<IVector3>, isWorldSpace?: boolean, order?: EulerOrder): this;
        rotateAngle(x: number, y: number, z: number, isWorldSpace?: boolean, order?: EulerOrder): this;
        /**
         * 绕轴旋转角度。
         */
        rotateAngleOnAxis(axis: Readonly<IVector3>, angle: number, isWorldSpace?: boolean): this;
        /**
         *
         */
        rotateAngleAround(position: Readonly<IVector3>, axis: Readonly<IVector3>, angle: number): this;
        /**
         * 获取世界坐标系下当前 X 轴的正方向。
         */
        getRight(out?: Vector3): Vector3;
        /**
         * 获取世界坐标系下当前 Y 轴的正方向。
         */
        getUp(out?: Vector3): Vector3;
        /**
         * 获取世界坐标系下当前 Z 轴的正方向。
         */
        getForward(out?: Vector3): Vector3;
        /**
         * 旋转 Z 轴，使其正方向指向目标位置。
         */
        lookAt(target: Readonly<Transform> | Readonly<IVector3>, up?: Readonly<IVector3>): this;
        /**
         * 所有子 Transform 组件的总数。
         */
        readonly childCount: number;
        /**
         * 所有子 Transform 组件。
         */
        readonly children: ReadonlyArray<Transform>;
        /**
         * 父 Transform 组件。
         */
        parent: Transform | null;
    }
}
declare namespace egret3d {
    /**
     *
     */
    class DefaultMeshes extends paper.SingletonComponent {
        static QUAD: Mesh;
        static QUAD_PARTICLE: Mesh;
        static PLANE: Mesh;
        static TORUS: Mesh;
        static CUBE: Mesh;
        static PYRAMID: Mesh;
        static CONE: Mesh;
        static CYLINDER: Mesh;
        static SPHERE: Mesh;
        static LINE_X: Mesh;
        static LINE_Y: Mesh;
        static LINE_Z: Mesh;
        static CIRCLE_LINE: Mesh;
        static CUBE_LINE: Mesh;
        initialize(): void;
        /**
         * 创建带网格的实体。
         */
        static createObject(mesh: Mesh, name?: string, tag?: string, scene?: paper.Scene): paper.GameObject;
        /**
         * 创建平面网格。
         */
        static createPlane(width?: number, height?: number, centerOffsetX?: number, centerOffsetY?: number, widthSegments?: number, heightSegments?: number): Mesh;
        /**
         * 创建立方体网格。
         */
        static createCube(width?: number, height?: number, depth?: number, centerOffsetX?: number, centerOffsetY?: number, centerOffsetZ?: number, widthSegments?: number, heightSegments?: number, depthSegments?: number, differentFace?: boolean): Mesh;
        /**
         * 创建圆柱体网格。
         */
        static createCylinder(radiusTop?: number, radiusBottom?: number, height?: number, centerOffsetX?: number, centerOffsetY?: number, centerOffsetZ?: number, radialSegments?: number, heightSegments?: number, openEnded?: boolean, thetaStart?: number, thetaLength?: number, differentFace?: boolean): Mesh;
        /**
         * 创建圆形网格。
         */
        static createCircle(radius: number, arc: number): Mesh;
        /**
         * 创建圆环网格。
         */
        static createTorus(radius?: number, tube?: number, radialSegments?: number, tubularSegments?: number, arc?: number): Mesh;
        /**
         * 创建球体网格。
         * TODO
         */
        static createSphere(radius?: number, widthSegments?: number, heightSegments?: number): Mesh;
    }
}
declare namespace egret3d {
    /**
     *
     */
    class DefaultTextures extends paper.SingletonComponent {
        /**
         *
         */
        static WHITE: Texture;
        /**
         *
         */
        static GRAY: Texture;
        /**
         *
         */
        static GRID: Texture;
        /**
         *
         */
        static MISSING: Texture;
        initialize(): void;
    }
}
declare namespace egret3d {
    /**
     *
     */
    class DefaultShaders extends paper.SingletonComponent {
        static MESH_BASIC: Shader;
        static MESH_BASIC_DOUBLESIDE: Shader;
        static MESH_LAMBERT: Shader;
        static MESH_LAMBERT_DOUBLESIDE: Shader;
        static MESH_PHONG: Shader;
        static MESH_PHONE_DOUBLESIDE: Shader;
        static MESH_PHYSICAL: Shader;
        static MESH_PHYSICAL_DOUBLESIDE: Shader;
        static LINEDASHED: Shader;
        static VERTEX_COLOR: Shader;
        static MATERIAL_COLOR: Shader;
        static TRANSPARENT: Shader;
        static TRANSPARENT_DOUBLESIDE: Shader;
        static TRANSPARENT_ADDITIVE: Shader;
        static TRANSPARENT_ADDITIVE_DOUBLESIDE: Shader;
        static PARTICLE: Shader;
        static PARTICLE_BLEND: Shader;
        static PARTICLE_BLEND1: Shader;
        static PARTICLE_ADDITIVE: Shader;
        static PARTICLE_BLEND_PREMULTIPLY: Shader;
        static PARTICLE_ADDITIVE_PREMULTIPLY: Shader;
        static CUBE: Shader;
        static DEPTH: Shader;
        static DISTANCE_RGBA: Shader;
        static EQUIRECT: Shader;
        static NORMAL: Shader;
        static POINTS: Shader;
        static SHADOW: Shader;
        static SPRITE: Shader;
        private _createShader(name, config, renderQueue?, states?, defines?);
        initialize(): void;
    }
}
declare namespace egret3d {
    /**
     *
     */
    class DefaultMaterials extends paper.SingletonComponent {
        /**
         *
         */
        static MESH_BASIC: Material;
        /**
         *
         */
        static LINEDASHED_COLOR: Material;
        /**
         *
         */
        static LINEDASHED_COLOR_OVERLAY: Material;
        /**
         *
         */
        static MISSING: Material;
        private _createMaterial(name, shader, renderQueue?);
        initialize(): void;
    }
}
declare namespace egret3d {
    /**
     *
     */
    class CamerasAndLights extends paper.SingletonComponent {
        readonly cameras: Camera[];
        readonly lights: BaseLight[];
        private _sortCameras(a, b);
        updateCamera(gameObjects: ReadonlyArray<paper.GameObject>): void;
        updateLight(gameObjects: ReadonlyArray<paper.GameObject>): void;
        sortCameras(): void;
    }
}
declare namespace egret3d {
    /**
     * @private
     * draw call type
     */
    type DrawCall = {
        renderer: paper.BaseRenderer;
        matrix?: Matrix4;
        isSkinned?: boolean;
        subMeshIndex: number;
        mesh: Mesh;
        material: Material;
        frustumTest: boolean;
        zdist: number;
    };
    /**
     *
     */
    class DrawCalls extends paper.SingletonComponent {
        /**
         * 参与渲染的渲染器列表。
         */
        readonly renderers: paper.BaseRenderer[];
        /**
         * 所有的 draw call 列表。
         */
        readonly drawCalls: DrawCall[];
        /**
         * 非透明列表
         */
        readonly opaqueCalls: DrawCall[];
        /**
         * 透明列表
         */
        readonly transparentCalls: DrawCall[];
        /**
         * 阴影列表
         */
        readonly shadowCalls: DrawCall[];
        /**
         * 所有非透明的, 按照从近到远排序
         */
        private _sortOpaque(a, b);
        /**
         * 所有透明的，按照从远到近排序
         */
        private _sortFromFarToNear(a, b);
        /**
         *
         */
        shadowFrustumCulling(camera: Camera): void;
        /**
         *
         */
        sortAfterFrustumCulling(camera: Camera): void;
        /**
         * 移除指定渲染器的 draw call 列表。
         */
        removeDrawCalls(renderer: paper.BaseRenderer): void;
        /**
         * 是否包含指定渲染器的 draw call 列表。
         */
        hasDrawCalls(renderer: paper.BaseRenderer): boolean;
    }
}
declare namespace egret3d {
    /**
     * Camera系统
     */
    class CameraSystem extends paper.BaseSystem {
        protected readonly _interests: ({
            componentClass: typeof Camera;
        }[] | {
            componentClass: typeof DirectionalLight[];
        }[])[];
        protected readonly _camerasAndLights: CamerasAndLights;
        onAddGameObject(_gameObject: paper.GameObject, group: paper.GameObjectGroup): void;
        onRemoveGameObject(_gameObject: paper.GameObject, group: paper.GameObjectGroup): void;
        onUpdate(deltaTime: number): void;
    }
}
declare namespace egret3d {
    /**
     * 相机组件
     */
    class Camera extends paper.BaseComponent {
        /**
         * 当前场景的主相机。
         * - 如果没有则创建一个。
         */
        static readonly main: Camera;
        /**
         * 编辑相机。
         * - 如果没有则创建一个。
         */
        static readonly editor: Camera;
        /**
         * 是否清除颜色缓冲区
         */
        clearOption_Color: boolean;
        /**
         * 是否清除深度缓冲区
         */
        clearOption_Depth: boolean;
        /**
         * 相机的渲染剔除，对应 GameObject 的层级。
         * - camera.cullingMask = paper.CullingMask.UI;
         * - camera.cullingMask |= paper.CullingMask.UI;
         * - camera.cullingMask &= ~paper.CullingMask.UI;
         */
        cullingMask: paper.CullingMask;
        /**
         * 相机渲染排序
         */
        order: number;
        /**
         * 透视投影的fov
         */
        fov: number;
        /**
         * 正交投影的竖向size
         */
        size: number;
        /**
         * 0=正交，1=透视 中间值可以在两种相机间过度
         */
        opvalue: number;
        /**
         * 背景色
         */
        readonly backgroundColor: Color;
        /**
         * 相机视窗
         */
        readonly viewport: Rectangle;
        /**
         * TODO 功能完善后开放此接口
         */
        readonly postQueues: ICameraPostQueue[];
        /**
         * 渲染目标，如果为null，则为画布
         */
        renderTarget: BaseRenderTarget | null;
        private _near;
        private _far;
        private readonly _matProjP;
        private readonly _matProjO;
        private readonly _frameVectors;
        /**
         * 计算相机视锥区域
         */
        private _calcCameraFrame();
        private _intersectPlane(boundingSphere, v0, v1, v2);
        initialize(): void;
        /**
         * 计算相机的 project matrix（投影矩阵）
         */
        calcProjectMatrix(asp: number, matrix: Matrix4): Matrix4;
        /**
         * 计算相机视口像素rect
         */
        calcViewPortPixel(viewPortPixel: IRectangle): void;
        /**
         * 由屏幕坐标得到世界坐标
         */
        calcWorldPosFromScreenPos(screenPos: Vector3, outWorldPos: Vector3): void;
        /**
         * 由世界坐标得到屏幕坐标
         */
        calcScreenPosFromWorldPos(worldPos: Vector3, outScreenPos: Vector2): void;
        getPosAtXPanelInViewCoordinateByScreenPos(screenPos: Vector2, z: number, out: Vector2): void;
        /**
         * 由屏幕坐标发射射线
         */
        createRayByScreen(screenPosX: number, screenPosY: number, ray?: Ray): Ray;
        testFrustumCulling(node: paper.BaseRenderer): boolean;
        /**
         * 相机到近裁剪面距离
         */
        near: number;
        /**
         * 相机到远裁剪面距离
         */
        far: number;
    }
}
declare namespace egret3d {
    interface ICameraPostQueue {
        renderTarget: GlRenderTarget;
        render(camera: Camera, renderSystem: WebGLRenderSystem): void;
    }
    class CameraPostQueueDepth implements ICameraPostQueue {
        renderTarget: GlRenderTarget;
        render(camera: Camera, renderSystem: WebGLRenderSystem): void;
    }
    /**
     * 颜色绘制通道
     *
     */
    class CameraPostQueueColor implements ICameraPostQueue {
        /**
         * @inheritDoc
         */
        renderTarget: GlRenderTarget;
        /**
         * @inheritDoc
         */
        render(camera: Camera, renderSystem: WebGLRenderSystem): void;
    }
}
declare namespace egret3d {
}
declare namespace egret3d {
    /**
     * 可以添加egret2d显示对象（包括EUI）进行渲染。
     * @version paper 1.0
     * @platform Web
     * @language zh_CN
     */
    class Egret2DRenderer extends paper.BaseRenderer {
        private renderer;
        /**
         * 是否使用视锥剔除
         */
        frustumTest: boolean;
        stage: egret.Stage;
        private _screenAdapter;
        screenAdapter: IScreenAdapter;
        root: egret.DisplayObjectContainer;
        initialize(): void;
        uninitialize(): void;
        recalculateAABB(): void;
        /**
         * 检查屏幕接触事件是否能够穿透此2D层
         */
        checkEventThrough(x: number, y: number): boolean;
        private _catchedEvent;
        private _onTouchStart(event);
        private _onTouchMove(event);
        private _onTouchEnd(event);
        /**
         * screen position to ui position
         * @version paper 1.0
         * @platform Web
         * @language en_US
         */
        /**
         * 从屏幕坐标转换到当前2D系统的坐标
         * @version paper 1.0
         * @platform Web
         * @language
         */
        screenPosToUIPos(pos: Vector2, out?: Vector2): Vector2;
        private _stageWidth;
        private _stageHeight;
        private _scaler;
        /**
         * 从屏幕坐标到当前2D系统的坐标的缩放系数
         */
        readonly scaler: number;
        /**
         *
         */
        update(delta: number): void;
    }
}
declare namespace egret3d {
    /**
     *
     */
    class Egret2DRendererSystem extends paper.BaseSystem {
        protected readonly _interests: {
            componentClass: typeof Egret2DRenderer;
        }[];
        onAwake(): void;
        onUpdate(deltaTime: number): void;
    }
}
declare module egret.web {
}
declare namespace egret3d {
    /**
     * IScreenAdapter
     * @version paper 1.0
     * @platform Web
     * @language en_US
     */
    /**
     * 屏幕适配策略接口，实现此接口可以自定义适配策略
     * @version paper 1.0
     * @platform Web
     * @language zh_CN
     */
    interface IScreenAdapter {
        $dirty: boolean;
        calculateScaler(canvasWidth: number, canvasHeight: number, out: {
            w: number;
            h: number;
            s: number;
        }): any;
    }
    /**
     * ConstantAdapter
     * @version paper 1.0
     * @platform Web
     * @language en_US
     */
    /**
     * 恒定像素的适配策略
     * @version paper 1.0
     * @platform Web
     * @language zh_CN
     */
    class ConstantAdapter implements IScreenAdapter {
        $dirty: boolean;
        private _scaleFactor;
        /**
         * scaleFactor
         * @version paper 1.0
         * @platform Web
         * @language en_US
         */
        /**
         * 设置缩放值
         * @version paper 1.0
         * @platform Web
         * @language zh_CN
         */
        scaleFactor: number;
        calculateScaler(canvasWidth: number, canvasHeight: number, out: {
            w: number;
            h: number;
            s: number;
        }): void;
    }
    /**
     * ConstantAdapter
     * @version paper 1.0
     * @platform Web
     * @language en_US
     */
    /**
     * 拉伸扩展的适配策略
     * @version paper 1.0
     * @platform Web
     * @language zh_CN
     */
    class ExpandAdapter implements IScreenAdapter {
        $dirty: boolean;
        private _resolution;
        /**
         * setResolution
         * @version paper 1.0
         * @platform Web
         * @language en_US
         */
        /**
         * 设置分辨率
         * @version paper 1.0
         * @platform Web
         * @language zh_CN
         */
        setResolution(width: number, height: number): void;
        calculateScaler(canvasWidth: number, canvasHeight: number, out: {
            w: number;
            h: number;
            s: number;
        }): void;
    }
    /**
     * ShrinkAdapter
     * @version paper 1.0
     * @platform Web
     * @language en_US
     */
    /**
     * 缩放的适配策略
     * @version paper 1.0
     * @platform Web
     * @language zh_CN
     */
    class ShrinkAdapter implements IScreenAdapter {
        $dirty: boolean;
        private _resolution;
        /**
         * setResolution
         * @version paper 1.0
         * @platform Web
         * @language en_US
         */
        /**
         * 设置分辨率
         * @version paper 1.0
         * @platform Web
         * @language zh_CN
         */
        setResolution(width: number, height: number): void;
        calculateScaler(canvasWidth: number, canvasHeight: number, out: {
            w: number;
            h: number;
            s: number;
        }): void;
    }
    /**
     * MatchWidthOrHeightAdapter
     * @version paper 1.0
     * @platform Web
     * @language en_US
     */
    /**
     * 适应宽高适配策略
     * @version paper 1.0
     * @platform Web
     * @language zh_CN
     */
    class MatchWidthOrHeightAdapter implements IScreenAdapter {
        $dirty: boolean;
        private _resolution;
        /**
         * setResolution
         * @version paper 1.0
         * @platform Web
         * @language en_US
         */
        /**
         * 设置分辨率
         * @version paper 1.0
         * @platform Web
         * @language zh_CN
         */
        setResolution(width: number, height: number): void;
        private _matchFactor;
        /**
         * matchFactor
         * @version paper 1.0
         * @platform Web
         * @language en_US
         */
        /**
         * 设置匹配系数，0-1之间，越小越倾向以宽度适配，越大越倾向以高度适配。
         * @version paper 1.0
         * @platform Web
         * @language zh_CN
         */
        matchFactor: number;
        calculateScaler(canvasWidth: number, canvasHeight: number, out: {
            w: number;
            h: number;
            s: number;
        }): void;
    }
}
declare namespace paper {
    const enum FogMode {
        NONE = 0,
        FOG = 1,
        FOG_EXP2 = 2,
    }
    /**
     * 场景类
     */
    class Scene extends BaseObject {
        /**
         *
         */
        static createEmpty(name?: string, isActive?: boolean): Scene;
        /**
         *
         */
        static create(name: string, combineStaticObjects?: boolean): Scene;
        static readonly globalScene: Scene;
        static readonly editorScene: Scene;
        static activeScene: Readonly<Scene>;
        /**
         * lightmap 表现的光照强度。
         */
        lightmapIntensity: number;
        /**
         * 场景名称。
         */
        readonly name: string;
        /**
         * 环境光。
         */
        readonly ambientColor: egret3d.Color;
        /**
         * 场景的 lightmap 列表。
         */
        readonly lightmaps: egret3d.Texture[];
        fogMode: FogMode;
        readonly fogColor: egret3d.Color;
        fogDensity: number;
        fogNear: number;
        fogFar: number;
        /**
         * 额外数据，仅保存在编辑器环境，项目发布该数据将被移除。
         */
        extras?: any;
        /**
         * 请使用 `paper.Scene.createEmpty()` 创建实例。
         * @see paper.Scene.createEmpty()
         * @see paper.Scene.create()
         */
        private constructor();
        /**
         *
         */
        uninitialize(): void;
        /**
         * 销毁场景。
         */
        destroy(): void;
        /**
         *
         */
        find(nameOrPath: string): GameObject;
        /**
         *
         */
        findWithTag(tag: string): GameObject;
        /**
         *
         */
        findGameObjectsWithTag(tag: string): GameObject[];
        /**
         * 所有根实体。
         */
        getRootGameObjects(): GameObject[];
        /**
         *
         */
        readonly gameObjectCount: number;
        /**
         * 所有实体。
         */
        readonly gameObjects: ReadonlyArray<GameObject>;
    }
}
declare namespace egret3d {
    /**
     *
     */
    class DirectionalLight extends BaseLight {
        renderTarget: BaseRenderTarget;
        update(camera: Camera, faceIndex: number): void;
    }
}
declare namespace egret3d {
    /**
     *
     */
    class PointLight extends BaseLight {
        /**
         *
         */
        decay: number;
        /**
         *
         */
        distance: number;
        renderTarget: BaseRenderTarget;
        update(camera: Camera, faceIndex: number): void;
    }
}
declare namespace egret3d {
    /**
     *
     */
    class SpotLight extends BaseLight {
        /**
         *
         */
        decay: number;
        /**
         *
         */
        distance: number;
        /**
         *
         */
        angle: number;
        /**
         *
         */
        penumbra: number;
        update(camera: Camera, faceIndex: number): void;
    }
}
declare namespace egret3d {
    /**
     *
     */
    const enum MeshFilterEventType {
        Mesh = "mesh",
    }
    /**
     * MeshFilter 组件
     */
    class MeshFilter extends paper.BaseComponent {
        private _mesh;
        uninitialize(): void;
        /**
         * 组件挂载的 mesh 模型
         */
        mesh: Mesh | null;
    }
}
declare namespace paper {
    /**
     * 可以挂载Component的实体类。
     */
    class GameObject extends BaseObject {
        private static _globalGameObject;
        /**
         * 创建 GameObject，并添加到当前场景中。
         */
        static create(name?: string, tag?: string, scene?: Scene | null): GameObject;
        /**
         *
         */
        static readonly globalGameObject: GameObject;
        /**
         * 是否是静态，启用这个属性可以提升性能
         */
        isStatic: boolean;
        /**
         *
         */
        hideFlags: HideFlags;
        /**
         * 层级
         */
        layer: Layer;
        /**
         * 名称
         */
        name: string;
        /**
         * 标签
         */
        tag: string;
        /**
         * 变换组件
         * @readonly
         */
        transform: egret3d.Transform;
        /**
         * @readonly
         */
        renderer: BaseRenderer | null;
        /**
         * 额外数据，仅保存在编辑器环境，项目发布该数据将被移除。
         */
        extras?: GameObjectExtras;
        private _activeSelf;
        private readonly _components;
        private readonly _cachedComponents;
        private _scene;
        /**
         * @deprecated
         */
        constructor(name?: string, tag?: string, scene?: Scene | null);
        private _destroy();
        private _addToScene(value);
        private _canRemoveComponent(value);
        private _removeComponent(value, groupComponent);
        private _getComponent(componentClass);
        /**
         * 实体被销毁后，内部卸载。
         */
        uninitialize(): void;
        /**
         * 销毁实体。
         */
        destroy(): void;
        /**
         * 添加组件。
         */
        addComponent<T extends BaseComponent>(componentClass: ComponentClass<T>, config?: any): T;
        /**
         * 移除组件。
         */
        removeComponent<T extends BaseComponent>(componentInstanceOrClass: ComponentClass<T> | T, isExtends?: boolean): void;
        /**
         * 移除所有组件。
         */
        removeAllComponents<T extends BaseComponent>(componentClass?: ComponentClass<T>, isExtends?: boolean): void;
        /**
         * 获取组件。
         */
        getComponent<T extends BaseComponent>(componentClass: ComponentClass<T>, isExtends?: boolean): T | null;
        /**
         *
         */
        getComponents<T extends BaseComponent>(componentClass: ComponentClass<T>, isExtends?: boolean): T[];
        /**
         * 搜索自己和父节点中所有特定类型的组件
         */
        getComponentInParent<T extends BaseComponent>(componentClass: ComponentClass<T>, isExtends?: boolean): T;
        /**
         *
         */
        getComponentInChildren<T extends BaseComponent>(componentClass: ComponentClass<T>, isExtends?: boolean): T;
        /**
         * 搜索自己和子节点中所有特定类型的组件
         */
        getComponentsInChildren<T extends BaseComponent>(componentClass: ComponentClass<T>, isExtends?: boolean, components?: T[] | null): T[];
        /**
         * 获取组件，如果未添加该组件，则添加该组件。
         */
        getOrAddComponent<T extends BaseComponent>(componentClass: ComponentClass<T>, isExtends?: boolean): T;
        /**
         * 针对同级的组件发送消息
         * @param methodName
         * @param parameter``
         */
        sendMessage(methodName: string, parameter?: any, requireReceiver?: boolean): void;
        /**
         * 针对直接父级发送消息
         * @param methodName
         * @param parameter
         */
        sendMessageUpwards(methodName: string, parameter?: any, requireReceiver?: boolean): void;
        /**
         * 群发消息
         * @param methodName
         * @param parameter
         */
        broadcastMessage(methodName: string, parameter?: any, requireReceiver?: boolean): void;
        /**
         *
         */
        readonly isDestroyed: boolean;
        /**
         *
         */
        dontDestroy: boolean;
        /**
         * 当前GameObject对象自身激活状态
         */
        activeSelf: boolean;
        /**
         * 获取当前GameObject对象在场景中激活状态。
         * 如果当前对象父级的activeSelf为false，那么当前GameObject对象在场景中为禁用状态。
         */
        readonly activeInHierarchy: boolean;
        readonly path: string;
        /**
         *
         */
        readonly components: ReadonlyArray<BaseComponent>;
        /**
         *
         */
        parent: GameObject | null;
        /**
         * 获取物体所在场景实例。
         */
        readonly scene: Scene;
        /**
         *
         */
        readonly globalGameObject: GameObject;
        /**
         * @deprecated
         * @see paper.Scene#find()
         */
        static find(name: string, scene?: Scene | null): GameObject;
        /**
         * @deprecated
         * @see paper.Scene#findWithTag()
         */
        static findWithTag(tag: string, scene?: Scene | null): GameObject;
        /**
         * @deprecated
         * @see paper.Scene#findGameObjectsWithTag()
         */
        static findGameObjectsWithTag(tag: string, scene?: Scene | null): GameObject[];
    }
}
declare namespace egret3d {
    /**
     *
     */
    class MeshRendererSystem extends paper.BaseSystem {
        protected readonly _interests: ({
            componentClass: typeof MeshFilter;
            listeners: {
                type: MeshFilterEventType;
                listener: (component: MeshFilter) => void;
            }[];
        } | {
            componentClass: typeof MeshRenderer;
            listeners: {
                type: paper.RendererEventType;
                listener: (component: MeshRenderer) => void;
            }[];
        })[];
        private readonly _drawCalls;
        private _updateDrawCalls(gameObject);
        onEnable(): void;
        onAddGameObject(gameObject: paper.GameObject): void;
        onRemoveGameObject(gameObject: paper.GameObject): void;
        onDisable(): void;
    }
}
declare namespace egret3d {
    /**
     * Skinned Mesh Renderer Component
     * @version paper 1.0
     * @platform Web
     * @language en_US
     */
    /**
     * 蒙皮网格的渲染组件
     * @version paper 1.0
     * @platform Web
     * @language
     */
    class SkinnedMeshRenderer extends MeshRenderer {
        /**
         *
         */
        boneMatrices: Float32Array | null;
        private readonly _bones;
        private _rootBone;
        private _inverseBindMatrices;
        private _mesh;
        initialize(reset?: boolean): void;
        uninitialize(): void;
        recalculateAABB(): void;
        readonly bones: ReadonlyArray<Transform | null>;
        readonly rootBone: Transform;
        /**
         *
         */
        mesh: Mesh | null;
    }
}
declare namespace egret3d {
    /**
     * TODO 需要完善
     */
    class SkinnedMeshRendererSystem extends paper.BaseSystem {
        /**
         *
         */
        static maxBoneCount: number;
        protected readonly _interests: {
            componentClass: typeof SkinnedMeshRenderer;
            listeners: ({
                type: MeshFilterEventType;
                listener: (component: SkinnedMeshRenderer) => void;
            } | {
                type: paper.RendererEventType;
                listener: (component: SkinnedMeshRenderer) => void;
            })[];
        }[];
        private readonly _drawCalls;
        private _updateDrawCalls(gameObject);
        onEnable(): void;
        onAddGameObject(gameObject: paper.GameObject): void;
        onRemoveGameObject(gameObject: paper.GameObject): void;
        onUpdate(): void;
        onDisable(): void;
    }
}
declare namespace egret3d {
    /**
     * 动画混合节点。
     */
    abstract class BlendNode {
        /**
         * @private
         */
        additive: boolean;
        /**
         * 动画混合模式。（根节点有效）
         */
        layer: number;
        /**
         * 节点权重。
         */
        weight: number;
        /**
         * 淡入淡出的时间。
         */
        fadeTime: number;
        /**
         * 父节点。
         */
        parent: BlendNode | null;
        /**
         * 全局融合时间标记。
         */
        protected _fadeTimeStart: number;
        protected _onFadeStateChange(): void;
        update(globalTime: number): void;
        fadeOut(fadeTime: number): void;
    }
    /**
     * 动画混合树节点。
     */
    class BlendTree extends BlendNode {
        private readonly _blendNodes;
    }
    /**
     * 动画状态。
     */
    class AnimationState extends BlendNode {
        /**
         * @private
         */
        layer: number;
        /**
         * 动画总播放次数。
         */
        playTimes: number;
        /**
         * 动画当前播放次数。
         */
        currentPlayTimes: number;
        /**
         * 播放速度。
         */
        timeScale: number;
        /**
         * @private
         */
        animationAsset: GLTFAsset;
        /**
         * 播放的动画数据。
         */
        animation: GLTFAnimation;
        /**
         * 播放的动画剪辑。
         */
        animationClip: GLTFAnimationClip;
        /**
         * 是否允许播放。
         */
        private _isPlaying;
        /**
         * 播放状态。
         * -1: start, 0: playing, 1: complete;
         */
        private _playState;
        /**
         * 全局播放时间标记。
         */
        private _playTimeStart;
        /**
         * 本地播放时间。
         */
        private _playTime;
        private _animationComponent;
        private readonly _channels;
        private _onUpdateTranslation(channel, animationState);
        private _onUpdateRotation(channel, animationState);
        private _onUpdateScale(channel, animationState);
        private _onUpdateActive(channel, animationState);
        /**
         *
         */
        update(globalTime: number): void;
        fateOut(): void;
    }
    /**
     * 动画组件。
     */
    class Animation extends paper.BaseComponent {
        /**
         * @private
         */
        autoPlay: boolean;
        /**
         * 动画速度。
         */
        timeScale: number;
        /**
         * 动画数据列表。
         */
        private readonly _animations;
        /**
         * 混合节点列表。
         */
        private readonly _blendNodes;
        private _fadeInParamter;
        /**
         * 最后一个播放的动画状态。
         * - 当进行动画混合时，该值通常没有任何意义。
         */
        private _lastAnimationState;
        uninitialize(): void;
        fadeIn(animationName: string | null, fadeTime: number, playTimes?: number, layer?: number, additive?: boolean): AnimationState | null;
        play(animationNameOrNames?: string | string[] | null, playTimes?: number): AnimationState | null;
        stop(): void;
        readonly lastAnimationnName: string;
        /**
         * 动画数据列表。
         */
        animations: ReadonlyArray<GLTFAsset>;
    }
}
declare namespace egret3d {
    /**
     *
     */
    class AnimationSystem extends paper.BaseSystem {
        protected readonly _interests: {
            componentClass: typeof Animation;
        }[];
        onAddComponent(component: Animation): void;
        onUpdate(): void;
    }
}
declare namespace egret3d.particle {
}
declare namespace egret3d.particle {
    const enum CurveMode {
        Constant = 0,
        Curve = 1,
        TwoCurves = 2,
        TwoConstants = 3,
    }
    const enum ColorGradientMode {
        Color = 0,
        Gradient = 1,
        TwoColors = 2,
        TwoGradients = 3,
        RandomColor = 4,
    }
    const enum SimulationSpace {
        Local = 0,
        World = 1,
        Custom = 2,
    }
    const enum ScalingMode {
        Hierarchy = 0,
        Local = 1,
        Shape = 2,
    }
    const enum ShapeType {
        None = -1,
        Sphere = 0,
        SphereShell = 1,
        Hemisphere = 2,
        HemisphereShell = 3,
        Cone = 4,
        Box = 5,
        Mesh = 6,
        ConeShell = 7,
        ConeVolume = 8,
        ConeVolumeShell = 9,
        Circle = 10,
        CircleEdge = 11,
        SingleSidedEdge = 12,
        MeshRenderer = 13,
        SkinnedMeshRenderer = 14,
        BoxShell = 15,
        BoxEdge = 16,
    }
    const enum ShapeMultiModeValue {
        Random = 0,
        Loop = 1,
        PingPong = 2,
        BurstSpread = 3,
    }
    const enum AnimationType {
        WholeSheet = 0,
        SingleRow = 1,
    }
    const enum UVChannelFlags {
        UV0 = 1,
        UV1 = 2,
        UV2 = 4,
        UV3 = 8,
    }
    const enum GradientMode {
        Blend = 0,
        Fixed = 1,
    }
    class Keyframe implements paper.ISerializable {
        time: number;
        value: number;
        serialize(): number[];
        deserialize(element: any): this;
        clone(source: Keyframe): void;
    }
    class AnimationCurve implements paper.ISerializable {
        /**
         * 功能与效率平衡长度取4
         */
        private readonly _keys;
        private readonly _floatValues;
        serialize(): number[][];
        deserialize(element: any): this;
        evaluate(t?: number): number;
        readonly floatValues: Readonly<Float32Array>;
        clone(source: AnimationCurve): void;
    }
    class GradientColorKey extends paper.BaseObject {
        time: number;
        readonly color: Color;
        deserialize(element: any): this;
    }
    class GradientAlphaKey extends paper.BaseObject {
        alpha: number;
        time: number;
        deserialize(element: any): this;
    }
    class Gradient extends paper.BaseObject {
        mode: GradientMode;
        private readonly alphaKeys;
        private readonly colorKeys;
        private readonly _alphaValue;
        private readonly _colorValue;
        deserialize(element: any): this;
        evaluate(t: number, out: Color): Color;
        readonly alphaValues: Readonly<Float32Array>;
        readonly colorValues: Readonly<Float32Array>;
    }
    class MinMaxCurve extends paper.BaseObject {
        mode: CurveMode;
        constant: number;
        constantMin: number;
        constantMax: number;
        readonly curve: AnimationCurve;
        readonly curveMin: AnimationCurve;
        readonly curveMax: AnimationCurve;
        deserialize(element: any): this;
        evaluate(t?: number): number;
        clone(source: MinMaxCurve): void;
    }
    class MinMaxGradient extends paper.BaseObject {
        mode: ColorGradientMode;
        readonly color: Color;
        readonly colorMin: Color;
        readonly colorMax: Color;
        readonly gradient: Gradient;
        readonly gradientMin: Gradient;
        readonly gradientMax: Gradient;
        deserialize(element: any): this;
        evaluate(t: number, out: Color): Color;
    }
    class Burst implements paper.ISerializable {
        time: number;
        minCount: number;
        maxCount: number;
        cycleCount: number;
        repeatInterval: number;
        serialize(): number[];
        deserialize(element: any): this;
    }
    abstract class ParticleSystemModule extends paper.BaseObject {
        enable: boolean;
        protected _comp: ParticleComponent;
        constructor(comp: ParticleComponent);
        deserialize(element: any): this;
    }
    class MainModule extends ParticleSystemModule {
        duration: number;
        loop: boolean;
        readonly startDelay: MinMaxCurve;
        readonly startLifetime: MinMaxCurve;
        readonly startSpeed: MinMaxCurve;
        readonly startSizeX: MinMaxCurve;
        readonly startSizeY: MinMaxCurve;
        readonly startSizeZ: MinMaxCurve;
        readonly startRotationX: MinMaxCurve;
        readonly startRotationY: MinMaxCurve;
        readonly startRotationZ: MinMaxCurve;
        readonly startColor: MinMaxGradient;
        readonly gravityModifier: MinMaxCurve;
        playOnAwake: boolean;
        deserialize(element: any): this;
        startRotation3D: boolean;
        simulationSpace: SimulationSpace;
        scaleMode: ScalingMode;
        maxParticles: number;
    }
    class EmissionModule extends ParticleSystemModule {
        readonly rateOverTime: MinMaxCurve;
        readonly bursts: Array<Burst>;
        deserialize(element: any): this;
    }
    class ShapeModule extends ParticleSystemModule {
        shapeType: ShapeType;
        radius: number;
        angle: number;
        length: number;
        readonly arcSpeed: MinMaxCurve;
        arcMode: ShapeMultiModeValue;
        radiusSpread: number;
        radiusMode: ShapeMultiModeValue;
        readonly box: egret3d.Vector3;
        randomDirection: boolean;
        spherizeDirection: boolean;
        deserialize(element: any): this;
        invalidUpdate(): void;
        generatePositionAndDirection(position: Vector3, direction: Vector3): void;
    }
    class VelocityOverLifetimeModule extends ParticleSystemModule {
        deserialize(element: any): this;
        mode: CurveMode;
        space: SimulationSpace;
        x: Readonly<MinMaxCurve>;
        y: Readonly<MinMaxCurve>;
        z: Readonly<MinMaxCurve>;
    }
    class ColorOverLifetimeModule extends ParticleSystemModule {
        deserialize(element: any): this;
        color: Readonly<MinMaxGradient>;
    }
    class SizeOverLifetimeModule extends ParticleSystemModule {
        deserialize(element: any): this;
        separateAxes: boolean;
        size: Readonly<MinMaxCurve>;
        x: Readonly<MinMaxCurve>;
        y: Readonly<MinMaxCurve>;
        z: Readonly<MinMaxCurve>;
    }
    class RotationOverLifetimeModule extends ParticleSystemModule {
        deserialize(element: any): this;
        separateAxes: boolean;
        x: Readonly<MinMaxCurve>;
        y: Readonly<MinMaxCurve>;
        z: Readonly<MinMaxCurve>;
    }
    class TextureSheetAnimationModule extends ParticleSystemModule {
        private readonly _floatValues;
        deserialize(element: any): this;
        numTilesX: number;
        numTilesY: number;
        animation: AnimationType;
        useRandomRow: boolean;
        frameOverTime: Readonly<MinMaxCurve>;
        startFrame: Readonly<MinMaxCurve>;
        cycleCount: number;
        rowIndex: number;
        readonly floatValues: Readonly<Float32Array>;
    }
}
declare namespace egret3d {
    class Matrix3 implements paper.IRelease<Matrix3>, paper.ISerializable {
        private static readonly _instances;
        static create(): Matrix3;
        release(): this;
        /**
         * @readonly
         */
        rawData: Float32Array;
        constructor(rawData?: Float32Array | null);
        serialize(): Float32Array;
        deserialize(value: Readonly<[number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number]>): this;
        copy(value: Readonly<Matrix3>): this;
        clone(): Matrix3;
        set(n11: number, n12: number, n13: number, n21: number, n22: number, n23: number, n31: number, n32: number, n33: number): this;
        identity(): this;
        inverse(matrix: Matrix3): this;
        getNormalMatrix(matrix4: Readonly<Matrix4>): this;
        transpose(): this;
        setFromMatrix4(m: Matrix4): this;
        determinant(): number;
        fromArray(value: Readonly<ArrayLike<number>>, offset?: number): this;
        fromBuffer(value: ArrayBuffer, byteOffset?: number): this;
    }
}
declare namespace egret3d.particle {
    const enum ParticleCompEventType {
        MainChanged = "mainChanged",
        ColorChanged = "colorChanged",
        VelocityChanged = "velocityChanged",
        SizeChanged = "sizeChanged",
        RotationChanged = "rotationChanged",
        TextureSheetChanged = "textureSheetChanged",
        ShapeChanged = "shapeChanged",
        StartRotation3DChanged = "rotation3DChanged",
        SimulationSpaceChanged = "simulationSpace",
        ScaleModeChanged = "scaleMode",
        MaxParticlesChanged = "maxParticles",
    }
    class ParticleComponent extends paper.BaseComponent {
        readonly main: MainModule;
        readonly emission: EmissionModule;
        readonly shape: ShapeModule;
        readonly velocityOverLifetime: VelocityOverLifetimeModule;
        readonly rotationOverLifetime: RotationOverLifetimeModule;
        readonly sizeOverLifetime: SizeOverLifetimeModule;
        readonly colorOverLifetime: ColorOverLifetimeModule;
        readonly textureSheetAnimation: TextureSheetAnimationModule;
        private readonly _batcher;
        play(withChildren?: boolean): void;
        pause(withChildren?: boolean): void;
        stop(withChildren?: boolean): void;
        clear(withChildren?: boolean): void;
        readonly loop: boolean;
        readonly isPlaying: boolean;
        readonly isPaused: boolean;
        readonly isAlive: boolean;
    }
}
declare namespace egret3d.particle {
    const enum ParticleRendererEventType {
        Mesh = "mesh",
        Materials = "materials",
        RenderMode = "renderMode",
        LengthScaleChanged = "lengthScale",
        VelocityScaleChanged = "velocityScale",
    }
    const enum ParticleRenderMode {
        Billboard = 0,
        Stretch = 1,
        HorizontalBillboard = 2,
        VerticalBillboard = 3,
        Mesh = 4,
        None = 5,
    }
    /**
     * 粒子着色器用到的变量
     */
    const enum ParticleMaterialUniform {
        WORLD_POSITION = "u_worldPosition",
        WORLD_ROTATION = "u_worldRotation",
        POSITION_SCALE = "u_positionScale",
        SIZE_SCALE = "u_sizeScale",
        SCALING_MODE = "u_scalingMode",
        GRAVIT = "u_gravity",
        START_ROTATION3D = "u_startRotation3D",
        SIMULATION_SPACE = "u_simulationSpace",
        CURRENTTIME = "u_currentTime",
        ALPHAS_GRADIENT = "u_alphaGradient[0]",
        COLOR_GRADIENT = "u_colorGradient[0]",
        ALPHA_GRADIENT_MAX = "u_alphaGradientMax[0]",
        COLOR_GRADIENT_MAX = "u_colorGradientMax[0]",
        VELOCITY_CONST = "u_velocityConst",
        VELOCITY_CURVE_X = "u_velocityCurveX[0]",
        VELOCITY_CURVE_Y = "u_velocityCurveY[0]",
        VELOCITY_CURVE_Z = "u_velocityCurveZ[0]",
        VELOCITY_CONST_MAX = "u_velocityConstMax",
        VELOCITY_CURVE_MAX_X = "u_velocityCurveMaxX[0]",
        VELOCITY_CURVE_MAX_Y = "u_velocityCurveMaxY[0]",
        VELOCITY_CURVE_MAX_Z = "u_velocityCurveMaxZ[0]",
        SPACE_TYPE = "u_spaceType",
        SIZE_CURVE = "u_sizeCurve[0]",
        SIZE_CURVE_X = "u_sizeCurveX[0]",
        SIZE_CURVE_Y = "u_sizeCurveY[0]",
        SIZE_CURVE_Z = "u_sizeCurveZ[0]",
        SIZE_CURVE_MAX = "u_sizeCurveMax[0]",
        SIZE_CURVE_MAX_X = "u_sizeCurveMaxX[0]",
        SIZE_CURVE_MAX_Y = "u_sizeCurveMaxY[0]",
        SIZE_CURVE_MAX_Z = "u_sizeCurveMaxZ[0]",
        ROTATION_CONST = "u_rotationConst",
        ROTATION_CONST_SEPRARATE = "u_rotationConstSeprarate",
        ROTATION_CURVE = "u_rotationCurve[0]",
        ROTATE_CURVE_X = "u_rotationCurveX[0]",
        ROTATE_CURVE_y = "u_rotationCurveY[0]",
        ROTATE_CURVE_Z = "u_rotationCurveZ[0]",
        ROTATE_CURVE_W = "u_rotationCurveW[0]",
        ROTATION_CONST_MAX = "u_rotationConstMax",
        ROTATION_CONST_MAX_SEPRARATE = "u_rotationConstMaxSeprarate",
        ROTATION_CURVE_MAX = "u_rotationCurveMax[0]",
        ROTATION_CURVE_MAX_X = "u_rotationCurveMaxX[0]",
        ROTATION_CURVE_MAX_Y = "u_rotationCurveMaxY[0]",
        ROTATION_CURVE_MAX_Z = "u_rotationCurveMaxZ[0]",
        ROTATION_CURVE_MAX_W = "u_rotationCurveMaxW[0]",
        CYCLES = "u_cycles",
        SUB_UV = "u_subUV",
        UV_CURVE = "u_uvCurve[0]",
        UV_CURVE_MAX = "u_uvCurveMax[0]",
        LENGTH_SCALE = "u_lengthScale",
        SPEED_SCALE = "u_speeaScale",
    }
    /**
     * 粒子着色器用到的宏定义
     */
    const enum ParticleMaterialDefine {
        SPHERHBILLBOARD = "SPHERHBILLBOARD",
        STRETCHEDBILLBOARD = "STRETCHEDBILLBOARD",
        HORIZONTALBILLBOARD = "HORIZONTALBILLBOARD",
        VERTICALBILLBOARD = "VERTICALBILLBOARD",
        ROTATIONOVERLIFETIME = "ROTATIONOVERLIFETIME",
        ROTATIONCONSTANT = "ROTATIONCONSTANT",
        ROTATIONTWOCONSTANTS = "ROTATIONTWOCONSTANTS",
        ROTATIONSEPERATE = "ROTATIONSEPERATE",
        ROTATIONCURVE = "ROTATIONCURVE",
        ROTATIONTWOCURVES = "ROTATIONTWOCURVES",
        TEXTURESHEETANIMATIONCURVE = "TEXTURESHEETANIMATIONCURVE",
        TEXTURESHEETANIMATIONTWOCURVE = "TEXTURESHEETANIMATIONTWOCURVE",
        VELOCITYCONSTANT = "VELOCITYCONSTANT",
        VELOCITYCURVE = "VELOCITYCURVE",
        VELOCITYTWOCONSTANT = "VELOCITYTWOCONSTANT",
        VELOCITYTWOCURVE = "VELOCITYTWOCURVE",
        COLOROGRADIENT = "COLOROGRADIENT",
        COLORTWOGRADIENTS = "COLORTWOGRADIENTS",
        SIZECURVE = "SIZECURVE",
        SIZETWOCURVES = "SIZETWOCURVES",
        SIZECURVESEPERATE = "SIZECURVESEPERATE",
        SIZETWOCURVESSEPERATE = "SIZETWOCURVESSEPERATE",
        RENDERMESH = "RENDERMESH",
        SHAPE = "SHAPE",
    }
    /**
     *
     */
    class ParticleRenderer extends paper.BaseRenderer {
        private _mesh;
        private readonly _materials;
        velocityScale: number;
        _renderMode: ParticleRenderMode;
        lengthScale: number;
        uninitialize(): void;
        recalculateAABB(): void;
        renderMode: ParticleRenderMode;
        /**
         * mesh model
         * @version paper 1.0
         * @platform Web
         * @language en_US
         */
        /**
         * 组件挂载的 mesh 模型
         * @version paper 1.0
         * @platform Web
         * @language
         */
        mesh: Mesh | null;
        /**
         * material list
         * @version paper 1.0
         * @platform Web
         * @language en_US
         */
        /**
         * 材质数组
         * @version paper 1.0
         * @platform Web
         * @language
         */
        materials: ReadonlyArray<Material>;
    }
}
declare namespace egret3d.particle {
    /**
     *
     */
    class ParticleSystem extends paper.BaseSystem {
        protected readonly _interests: ({
            componentClass: typeof ParticleComponent;
            listeners: {
                type: ParticleCompEventType;
                listener: any;
            }[];
        } | {
            componentClass: typeof ParticleRenderer;
            listeners: {
                type: ParticleRendererEventType;
                listener: (comp: ParticleRenderer) => void;
            }[];
        })[];
        private readonly _drawCalls;
        /**
        * Buffer改变的时候，有可能是初始化，也有可能是mesh改变，此时全部刷一下
        */
        private _onUpdateBatchMesh(comp);
        private _onRenderUpdate(render, type);
        /**
         *
         * @param render 渲染模式改变
         */
        private _onRenderMode(render);
        private _onMainUpdate(component, type);
        /**
         * 更新速率模块
         * @param component
         */
        private _onShapeChanged(comp);
        /**
         * 更新速率模块
         * @param component
         */
        private _onVelocityOverLifetime(comp);
        /**
         * 更新颜色模块
         * @param component
         */
        private _onColorOverLifetime(comp);
        /**
         * 更新大小模块
         * @param component
         */
        private _onSizeOverLifetime(comp);
        /**
         * 更新旋转模块
         * @param comp
         */
        private _onRotationOverLifetime(comp);
        private _onTextureSheetAnimation(comp);
        private _updateDrawCalls(gameObject);
        onEnable(): void;
        onAddGameObject(gameObject: paper.GameObject, _group: paper.GameObjectGroup): void;
        onRemoveGameObject(gameObject: paper.GameObject): void;
        onUpdate(deltaTime: number): void;
        onDisable(): void;
    }
}
declare namespace egret3d {
    class Audio extends paper.BaseComponent {
    }
}
declare namespace egret3d {
    /**
     * WebGL窗口信息
     */
    class Stage3D {
        screenViewport: Readonly<IRectangle>;
        absolutePosition: Readonly<IRectangle>;
        private _canvas;
        /**
         * 是否为横屏，需要旋转屏幕
         */
        private isLandscape;
        private contentWidth;
        private contentHeight;
        private _resizeDirty;
        update(): void;
        private _resize();
    }
    const stage: Stage3D;
}
declare namespace egret3d {
    class WebGLCapabilities extends paper.SingletonComponent {
        static canvas: HTMLCanvasElement | null;
        static webgl: WebGLRenderingContext | null;
        static commonDefines: string;
        version: number;
        precision: string;
        maxPrecision: string;
        maxTextures: number;
        maxVertexTextures: number;
        maxTextureSize: number;
        maxCubemapSize: number;
        maxVertexUniformVectors: number;
        floatTextures: boolean;
        anisotropyExt: EXT_texture_filter_anisotropic;
        shaderTextureLOD: any;
        maxAnisotropy: number;
        maxRenderTextureSize: number;
        standardDerivatives: boolean;
        s3tc: WEBGL_compressed_texture_s3tc;
        textureFloat: boolean;
        textureAnisotropicFilterExtension: EXT_texture_filter_anisotropic;
        initialize(): void;
    }
}
declare namespace egret3d {
    /**
     *
     */
    class Plane implements paper.IRelease<Plane>, paper.ISerializable {
        private static readonly _instances;
        /**
         *
         */
        static create(normal?: Readonly<IVector3>, constant?: number): Plane;
        release(): this;
        /**
         *
         */
        constant: number;
        /**
         *
         */
        readonly normal: Vector3;
        /**
         * 请使用 `egret3d.Plane.create()` 创建实例。
         * @see egret3d.Plane.create()
         */
        private constructor();
        serialize(): number[];
        deserialize(value: Readonly<[number, number, number, number]>): this;
        clone(): Plane;
        copy(value: Readonly<Plane>): this;
        set(normal: Readonly<IVector3>, constant: number): this;
        fromPoint(value: Readonly<IVector3>, normal?: Readonly<IVector3>): this;
        fromPoints(valueA: Readonly<IVector3>, valueB: Readonly<IVector3>, valueC: Readonly<IVector3>): this;
        normalize(source?: Readonly<Plane>): this;
        negate(source?: Readonly<Plane>): this;
        getDistance(value: Readonly<IVector3>): number;
    }
}
declare namespace paper {
    /**
     * 组件事件。
     */
    namespace EventPool {
        /**
         * 事件回调类型
         */
        type EventListener<T extends BaseComponent> = (component: T, extend?: any) => void;
        /**
         * 添加事件监听
         */
        function addEventListener<T extends BaseComponent>(eventType: string, componentClass: ComponentClass<T>, callback: EventListener<T>): void;
        /**
         * 移除事件监听
         */
        function removeEventListener<T extends BaseComponent>(eventType: string, componentClass: ComponentClass<T>, callback: EventListener<T>): void;
        /**
         * 移除所有该类型的事件监听
         */
        function removeAllEventListener<T extends BaseComponent>(eventType: string, componentClass: ComponentClass<T>): void;
        /**
         * 发送组件事件:
         * @param type event type:
         * @param component component
         */
        function dispatchEvent<T extends BaseComponent>(type: string, component: T, extend?: any): void;
    }
}
declare type int = number;
declare type uint = number;
declare namespace paper {
    /**
     *
     */
    const enum PlayerMode {
        Player = 0,
        DebugPlayer = 1,
        Editor = 2,
    }
    /**
     *
     */
    let Time: Clock;
    /**
     *
     */
    let Application: ECS;
    /**
     *
     */
    class ECS {
        private static _instance;
        /**
         *
         */
        static getInstance(): ECS;
        private constructor();
        /**
         * 系统管理器。
         */
        readonly systemManager: SystemManager;
        /**
         * 场景管理器。
         */
        readonly sceneManager: SceneManager;
        private _isFocused;
        private _isRunning;
        private _playerMode;
        private _bindUpdate;
        private _update();
        private _updatePlayerMode();
        init(options: egret3d.RunEgretOptions): void;
        /**
         *
         */
        pause(): void;
        resume(): void;
        readonly isFocused: boolean;
        readonly isRunning: boolean;
        playerMode: PlayerMode;
    }
}
declare namespace egret3d {
    /**
     *
     */
    class Triangle implements paper.IRelease<Triangle>, paper.ISerializable {
        private static readonly _instances;
        static create(a?: Readonly<IVector3>, b?: Readonly<IVector3>, c?: Readonly<IVector3>): Triangle;
        release(): this;
        readonly a: Vector3;
        readonly b: Vector3;
        readonly c: Vector3;
        /**
         * 请使用 `egret3d.Triangle.create()` 创建实例。
         * @see egret3d.Triangle.create()
         */
        private constructor();
        serialize(): number[];
        deserialize(element: Readonly<[number, number, number, number, number, number, number, number, number]>): void;
        copy(value: Readonly<Triangle>): this;
        clone(): Triangle;
        set(a?: Readonly<IVector3>, b?: Readonly<IVector3>, c?: Readonly<IVector3>): this;
        fromArray(value: Readonly<ArrayLike<number>>, offsetA?: number, offsetB?: number, offsetC?: number): void;
        getCenter(value: Vector3): Vector3;
        getNormal(value: Vector3): Vector3;
        getArea(): number;
    }
}
declare namespace egret3d {
    /**
     * 通用宏定义
     */
    const enum ShaderDefines {
        USE_COLOR = "USE_COLOR",
        USE_MAP = "USE_MAP",
        USE_SKINNING = "USE_SKINNING",
        USE_LIGHTMAP = "USE_LIGHTMAP",
        USE_SHADOWMAP = "USE_SHADOWMAP",
        MAX_BONES = "MAX_BONES",
        FLIP_V = "FLIP_V",
        NUM_POINT_LIGHTS = "NUM_POINT_LIGHTS",
        NUM_SPOT_LIGHTS = "NUM_SPOT_LIGHTS",
        SHADOWMAP_TYPE_PCF = "SHADOWMAP_TYPE_PCF",
        SHADOWMAP_TYPE_PCF_SOFT = "SHADOWMAP_TYPE_PCF_SOFT",
        DEPTH_PACKING_3200 = "DEPTH_PACKING 3200",
        DEPTH_PACKING_3201 = "DEPTH_PACKING 3201",
        USE_FOG = "USE_FOG",
        FOG_EXP2 = "FOG_EXP2",
    }
    /**
     * 通用Uniform名字
     */
    const enum ShaderUniformNames {
        Diffuse = "diffuse",
        Opacity = "opacity",
        Map = "map",
        Specular = "specular",
        Shininess = "shininess",
        UVTransform = "uvTransform",
    }
    /**
     *
     */
    class Shader extends GLTFAsset {
    }
}
declare namespace egret3d {
    /**
     * 材质资源
     */
    class Material extends GLTFAsset {
        /**
         *
         */
        static create(shader?: Shader | string): Material;
        static create(config: GLTF, name: string): Material;
        /**
         *
         */
        renderQueue: paper.RenderQueue | number;
        private _cacheDefines;
        private readonly _textures;
        /**
         * 请使用 `egret3d.Material.create()` 创建实例。
         * @see egret3d.Material.create()
         * @deprecated
         */
        constructor(shader?: Shader | string);
        constructor(config: GLTF, name: string);
        private _reset(shaderOrConfig);
        dispose(disposeChildren?: boolean): boolean;
        copy(value: Material): this;
        /**
         * 克隆材质资源。
         */
        clone(): Material;
        addDefine(key: string): this;
        removeDefine(key: string): this;
        setBoolean(id: string, value: boolean): this;
        setInt(id: string, value: number): this;
        setIntv(id: string, value: Float32Array): this;
        setFloat(id: string, value: number): this;
        setFloatv(id: string, value: Float32Array): this;
        setVector2(id: string, value: Readonly<IVector2>): this;
        setVector2v(id: string, value: Float32Array): this;
        setVector3(id: string, value: Readonly<IVector3>): this;
        setVector3v(id: string, value: Float32Array): this;
        setVector4(id: string, value: Readonly<IVector4>): this;
        setVector4v(id: string, value: Float32Array | [number, number, number, number]): this;
        setMatrix(id: string, value: Readonly<Matrix4>): this;
        setMatrixv(id: string, value: Float32Array): this;
        /**
         *
         */
        getTexture(id: string): any;
        /**
         *
         */
        setTexture(id: string, value: egret3d.Texture | null): this;
        /**
         *
         */
        setColor(id: string, value: Readonly<Color>): this;
        /**
         *
         * @param blend
         */
        setBlend(blend: gltf.BlendMode): this;
        /**
         *
         */
        setCullFace(cull: boolean, frontFace?: gltf.FrontFace, cullFace?: gltf.CullFace): this;
        /**
         *
         */
        setDepth(zTest: boolean, zWrite: boolean): this;
        /**
         *
         */
        setRenderQueue(value: number): this;
        /**
         *
         */
        clearStates(): this;
        shader: Shader;
        readonly glTFTechnique: gltf.Technique;
    }
}
declare namespace egret3d.ShaderLib {
    const cube: {
        "version": string;
        "asset": {
            "version": string;
        };
        "extensions": {
            "KHR_techniques_webgl": {
                "shaders": {
                    "name": string;
                    "type": number;
                    "uri": string;
                }[];
                "techniques": {
                    "name": string;
                    "attributes": {
                        "position": {
                            "semantic": string;
                        };
                        "normal": {
                            "semantic": string;
                        };
                        "uv": {
                            "semantic": string;
                        };
                        "color": {
                            "semantic": string;
                        };
                        "morphTarget0": {
                            "semantic": string;
                        };
                        "morphTarget1": {
                            "semantic": string;
                        };
                        "morphTarget2": {
                            "semantic": string;
                        };
                        "morphTarget3": {
                            "semantic": string;
                        };
                        "morphNormal0": {
                            "semantic": string;
                        };
                        "morphNormal1": {
                            "semantic": string;
                        };
                        "morphNormal2": {
                            "semantic": string;
                        };
                        "morphNormal3": {
                            "semantic": string;
                        };
                        "morphTarget4": {
                            "semantic": string;
                        };
                        "morphTarget5": {
                            "semantic": string;
                        };
                        "morphTarget6": {
                            "semantic": string;
                        };
                        "morphTarget7": {
                            "semantic": string;
                        };
                        "skinIndex": {
                            "semantic": string;
                        };
                        "skinWeight": {
                            "semantic": string;
                        };
                    };
                    "uniforms": {
                        "modelMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "modelViewMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "projectionMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "viewMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "normalMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "cameraPosition": {
                            "type": number;
                            "semantic": string;
                        };
                        "tCube": {
                            "type": number;
                        };
                        "tFlip": {
                            "type": number;
                        };
                        "opacity": {
                            "type": number;
                            "value": number;
                        };
                    };
                    "states": {
                        "enable": any[];
                        "functions": {};
                    };
                }[];
            };
            "paper": {};
        };
        "extensionsRequired": string[];
        "extensionsUsed": string[];
    };
    const depth: {
        "version": string;
        "asset": {
            "version": string;
        };
        "extensions": {
            "KHR_techniques_webgl": {
                "shaders": {
                    "name": string;
                    "type": number;
                    "uri": string;
                }[];
                "techniques": {
                    "name": string;
                    "attributes": {
                        "position": {
                            "semantic": string;
                        };
                        "normal": {
                            "semantic": string;
                        };
                        "uv": {
                            "semantic": string;
                        };
                        "color": {
                            "semantic": string;
                        };
                        "morphTarget0": {
                            "semantic": string;
                        };
                        "morphTarget1": {
                            "semantic": string;
                        };
                        "morphTarget2": {
                            "semantic": string;
                        };
                        "morphTarget3": {
                            "semantic": string;
                        };
                        "morphNormal0": {
                            "semantic": string;
                        };
                        "morphNormal1": {
                            "semantic": string;
                        };
                        "morphNormal2": {
                            "semantic": string;
                        };
                        "morphNormal3": {
                            "semantic": string;
                        };
                        "morphTarget4": {
                            "semantic": string;
                        };
                        "morphTarget5": {
                            "semantic": string;
                        };
                        "morphTarget6": {
                            "semantic": string;
                        };
                        "morphTarget7": {
                            "semantic": string;
                        };
                        "skinIndex": {
                            "semantic": string;
                        };
                        "skinWeight": {
                            "semantic": string;
                        };
                    };
                    "uniforms": {
                        "modelMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "modelViewMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "projectionMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "viewMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "normalMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "cameraPosition": {
                            "type": number;
                            "semantic": string;
                        };
                        "uvTransform": {
                            "type": number;
                            "value": number[];
                        };
                        "displacementMap": {
                            "type": number;
                        };
                        "displacementScale": {
                            "type": number;
                        };
                        "displacementBias": {
                            "type": number;
                        };
                        "morphTargetInfluences[0]": {
                            "type": number;
                        };
                        "boneTexture": {
                            "type": number;
                        };
                        "boneTextureSize": {
                            "type": number;
                        };
                        "boneMatrices[0]": {
                            "type": number;
                            "semantic": string;
                        };
                        "logDepthBufFC": {
                            "type": number;
                        };
                        "opacity": {
                            "type": number;
                            "value": number;
                        };
                        "map": {
                            "type": number;
                        };
                        "alphaMap": {
                            "type": number;
                        };
                        "clippingPlanes[0]": {
                            "type": number;
                        };
                    };
                    "states": {
                        "enable": any[];
                        "functions": {};
                    };
                }[];
            };
            "paper": {};
        };
        "extensionsRequired": string[];
        "extensionsUsed": string[];
    };
    const distanceRGBA: {
        "version": string;
        "asset": {
            "version": string;
        };
        "extensions": {
            "KHR_techniques_webgl": {
                "shaders": {
                    "name": string;
                    "type": number;
                    "uri": string;
                }[];
                "techniques": {
                    "name": string;
                    "attributes": {
                        "position": {
                            "semantic": string;
                        };
                        "normal": {
                            "semantic": string;
                        };
                        "uv": {
                            "semantic": string;
                        };
                        "color": {
                            "semantic": string;
                        };
                        "morphTarget0": {
                            "semantic": string;
                        };
                        "morphTarget1": {
                            "semantic": string;
                        };
                        "morphTarget2": {
                            "semantic": string;
                        };
                        "morphTarget3": {
                            "semantic": string;
                        };
                        "morphNormal0": {
                            "semantic": string;
                        };
                        "morphNormal1": {
                            "semantic": string;
                        };
                        "morphNormal2": {
                            "semantic": string;
                        };
                        "morphNormal3": {
                            "semantic": string;
                        };
                        "morphTarget4": {
                            "semantic": string;
                        };
                        "morphTarget5": {
                            "semantic": string;
                        };
                        "morphTarget6": {
                            "semantic": string;
                        };
                        "morphTarget7": {
                            "semantic": string;
                        };
                        "skinIndex": {
                            "semantic": string;
                        };
                        "skinWeight": {
                            "semantic": string;
                        };
                    };
                    "uniforms": {
                        "modelMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "modelViewMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "projectionMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "viewMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "normalMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "cameraPosition": {
                            "type": number;
                            "semantic": string;
                        };
                        "uvTransform": {
                            "type": number;
                            "value": number[];
                        };
                        "displacementMap": {
                            "type": number;
                        };
                        "displacementScale": {
                            "type": number;
                        };
                        "displacementBias": {
                            "type": number;
                        };
                        "morphTargetInfluences[0]": {
                            "type": number;
                        };
                        "boneTexture": {
                            "type": number;
                        };
                        "boneTextureSize": {
                            "type": number;
                        };
                        "boneMatrices[0]": {
                            "type": number;
                            "semantic": string;
                        };
                        "referencePosition": {
                            "type": number;
                            "semantic": string;
                        };
                        "nearDistance": {
                            "type": number;
                            "semantic": string;
                        };
                        "farDistance": {
                            "type": number;
                            "semantic": string;
                        };
                        "map": {
                            "type": number;
                        };
                        "alphaMap": {
                            "type": number;
                        };
                        "clippingPlanes[0]": {
                            "type": number;
                        };
                    };
                    "states": {
                        "enable": any[];
                        "functions": {};
                    };
                }[];
            };
            "paper": {};
        };
        "extensionsRequired": string[];
        "extensionsUsed": string[];
    };
    const equirect: {
        "version": string;
        "asset": {
            "version": string;
        };
        "extensions": {
            "KHR_techniques_webgl": {
                "shaders": {
                    "name": string;
                    "type": number;
                    "uri": string;
                }[];
                "techniques": {
                    "name": string;
                    "attributes": {
                        "position": {
                            "semantic": string;
                        };
                        "normal": {
                            "semantic": string;
                        };
                        "uv": {
                            "semantic": string;
                        };
                        "color": {
                            "semantic": string;
                        };
                        "morphTarget0": {
                            "semantic": string;
                        };
                        "morphTarget1": {
                            "semantic": string;
                        };
                        "morphTarget2": {
                            "semantic": string;
                        };
                        "morphTarget3": {
                            "semantic": string;
                        };
                        "morphNormal0": {
                            "semantic": string;
                        };
                        "morphNormal1": {
                            "semantic": string;
                        };
                        "morphNormal2": {
                            "semantic": string;
                        };
                        "morphNormal3": {
                            "semantic": string;
                        };
                        "morphTarget4": {
                            "semantic": string;
                        };
                        "morphTarget5": {
                            "semantic": string;
                        };
                        "morphTarget6": {
                            "semantic": string;
                        };
                        "morphTarget7": {
                            "semantic": string;
                        };
                        "skinIndex": {
                            "semantic": string;
                        };
                        "skinWeight": {
                            "semantic": string;
                        };
                    };
                    "uniforms": {
                        "modelMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "modelViewMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "projectionMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "viewMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "normalMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "cameraPosition": {
                            "type": number;
                            "semantic": string;
                        };
                        "tEquirect": {
                            "type": number;
                        };
                    };
                    "states": {
                        "enable": any[];
                        "functions": {};
                    };
                }[];
            };
            "paper": {};
        };
        "extensionsRequired": string[];
        "extensionsUsed": string[];
    };
    const linedashed: {
        "version": string;
        "asset": {
            "version": string;
        };
        "extensions": {
            "KHR_techniques_webgl": {
                "shaders": {
                    "name": string;
                    "type": number;
                    "uri": string;
                }[];
                "techniques": {
                    "name": string;
                    "attributes": {
                        "position": {
                            "semantic": string;
                        };
                        "normal": {
                            "semantic": string;
                        };
                        "uv": {
                            "semantic": string;
                        };
                        "color": {
                            "semantic": string;
                        };
                        "morphTarget0": {
                            "semantic": string;
                        };
                        "morphTarget1": {
                            "semantic": string;
                        };
                        "morphTarget2": {
                            "semantic": string;
                        };
                        "morphTarget3": {
                            "semantic": string;
                        };
                        "morphNormal0": {
                            "semantic": string;
                        };
                        "morphNormal1": {
                            "semantic": string;
                        };
                        "morphNormal2": {
                            "semantic": string;
                        };
                        "morphNormal3": {
                            "semantic": string;
                        };
                        "morphTarget4": {
                            "semantic": string;
                        };
                        "morphTarget5": {
                            "semantic": string;
                        };
                        "morphTarget6": {
                            "semantic": string;
                        };
                        "morphTarget7": {
                            "semantic": string;
                        };
                        "skinIndex": {
                            "semantic": string;
                        };
                        "skinWeight": {
                            "semantic": string;
                        };
                        "lineDistance": {
                            "semantic": string;
                        };
                    };
                    "uniforms": {
                        "modelMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "modelViewMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "projectionMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "viewMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "normalMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "cameraPosition": {
                            "type": number;
                            "semantic": string;
                        };
                        "scale": {
                            "type": number;
                        };
                        "logDepthBufFC": {
                            "type": number;
                        };
                        "diffuse": {
                            "type": number;
                            "value": number[];
                        };
                        "opacity": {
                            "type": number;
                            "value": number;
                        };
                        "dashSize": {
                            "type": number;
                        };
                        "totalSize": {
                            "type": number;
                        };
                        "fogColor": {
                            "type": number;
                            "semantic": string;
                        };
                        "fogDensity": {
                            "type": number;
                            "semantic": string;
                        };
                        "fogNear": {
                            "type": number;
                            "semantic": string;
                        };
                        "fogFar": {
                            "type": number;
                            "semantic": string;
                        };
                        "clippingPlanes[0]": {
                            "type": number;
                        };
                    };
                    "states": {
                        "enable": any[];
                        "functions": {};
                    };
                }[];
            };
            "paper": {};
        };
        "extensionsRequired": string[];
        "extensionsUsed": string[];
    };
    const meshbasic: {
        "version": string;
        "asset": {
            "version": string;
        };
        "extensions": {
            "KHR_techniques_webgl": {
                "shaders": {
                    "name": string;
                    "type": number;
                    "uri": string;
                }[];
                "techniques": {
                    "name": string;
                    "attributes": {
                        "position": {
                            "semantic": string;
                        };
                        "normal": {
                            "semantic": string;
                        };
                        "uv": {
                            "semantic": string;
                        };
                        "color": {
                            "semantic": string;
                        };
                        "morphTarget0": {
                            "semantic": string;
                        };
                        "morphTarget1": {
                            "semantic": string;
                        };
                        "morphTarget2": {
                            "semantic": string;
                        };
                        "morphTarget3": {
                            "semantic": string;
                        };
                        "morphNormal0": {
                            "semantic": string;
                        };
                        "morphNormal1": {
                            "semantic": string;
                        };
                        "morphNormal2": {
                            "semantic": string;
                        };
                        "morphNormal3": {
                            "semantic": string;
                        };
                        "morphTarget4": {
                            "semantic": string;
                        };
                        "morphTarget5": {
                            "semantic": string;
                        };
                        "morphTarget6": {
                            "semantic": string;
                        };
                        "morphTarget7": {
                            "semantic": string;
                        };
                        "skinIndex": {
                            "semantic": string;
                        };
                        "skinWeight": {
                            "semantic": string;
                        };
                        "uv2": {
                            "semantic": string;
                        };
                    };
                    "uniforms": {
                        "modelMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "modelViewMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "projectionMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "viewMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "normalMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "cameraPosition": {
                            "type": number;
                            "semantic": string;
                        };
                        "uvTransform": {
                            "type": number;
                            "value": number[];
                        };
                        "refractionRatio": {
                            "type": number;
                            "value": any[];
                        };
                        "morphTargetInfluences[0]": {
                            "type": number;
                        };
                        "boneTexture": {
                            "type": number;
                        };
                        "boneTextureSize": {
                            "type": number;
                        };
                        "boneMatrices[0]": {
                            "type": number;
                            "semantic": string;
                        };
                        "logDepthBufFC": {
                            "type": number;
                        };
                        "diffuse": {
                            "type": number;
                            "value": number[];
                        };
                        "opacity": {
                            "type": number;
                            "value": number;
                        };
                        "map": {
                            "type": number;
                        };
                        "alphaMap": {
                            "type": number;
                        };
                        "aoMap": {
                            "type": number;
                        };
                        "aoMapIntensity": {
                            "type": number;
                            "value": number;
                        };
                        "lightMap": {
                            "type": number;
                            "semantic": string;
                        };
                        "lightMapIntensity": {
                            "type": number;
                            "semantic": string;
                        };
                        "reflectivity": {
                            "type": number;
                            "value": any[];
                        };
                        "envMapIntensity": {
                            "type": number;
                            "value": number;
                        };
                        "envMap": {
                            "type": number;
                        };
                        "flipEnvMap": {
                            "type": number;
                            "value": number;
                        };
                        "maxMipLevel": {
                            "type": number;
                            "value": any[];
                        };
                        "fogColor": {
                            "type": number;
                            "semantic": string;
                        };
                        "fogDensity": {
                            "type": number;
                            "semantic": string;
                        };
                        "fogNear": {
                            "type": number;
                            "semantic": string;
                        };
                        "fogFar": {
                            "type": number;
                            "semantic": string;
                        };
                        "specularMap": {
                            "type": number;
                        };
                        "clippingPlanes[0]": {
                            "type": number;
                        };
                    };
                    "states": {
                        "enable": any[];
                        "functions": {};
                    };
                }[];
            };
            "paper": {};
        };
        "extensionsRequired": string[];
        "extensionsUsed": string[];
    };
    const meshlambert: {
        "version": string;
        "asset": {
            "version": string;
        };
        "extensions": {
            "KHR_techniques_webgl": {
                "shaders": {
                    "name": string;
                    "type": number;
                    "uri": string;
                }[];
                "techniques": {
                    "name": string;
                    "attributes": {
                        "position": {
                            "semantic": string;
                        };
                        "normal": {
                            "semantic": string;
                        };
                        "uv": {
                            "semantic": string;
                        };
                        "color": {
                            "semantic": string;
                        };
                        "morphTarget0": {
                            "semantic": string;
                        };
                        "morphTarget1": {
                            "semantic": string;
                        };
                        "morphTarget2": {
                            "semantic": string;
                        };
                        "morphTarget3": {
                            "semantic": string;
                        };
                        "morphNormal0": {
                            "semantic": string;
                        };
                        "morphNormal1": {
                            "semantic": string;
                        };
                        "morphNormal2": {
                            "semantic": string;
                        };
                        "morphNormal3": {
                            "semantic": string;
                        };
                        "morphTarget4": {
                            "semantic": string;
                        };
                        "morphTarget5": {
                            "semantic": string;
                        };
                        "morphTarget6": {
                            "semantic": string;
                        };
                        "morphTarget7": {
                            "semantic": string;
                        };
                        "skinIndex": {
                            "semantic": string;
                        };
                        "skinWeight": {
                            "semantic": string;
                        };
                        "uv2": {
                            "semantic": string;
                        };
                    };
                    "uniforms": {
                        "modelMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "modelViewMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "projectionMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "viewMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "normalMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "cameraPosition": {
                            "type": number;
                            "semantic": string;
                        };
                        "uvTransform": {
                            "type": number;
                            "value": number[];
                        };
                        "refractionRatio": {
                            "type": number;
                            "value": any[];
                        };
                        "ambientLightColor": {
                            "type": number;
                            "semantic": string;
                        };
                        "directionalLights[0]": {
                            "type": number;
                            "semantic": string;
                        };
                        "pointLights[0]": {
                            "type": number;
                            "semantic": string;
                        };
                        "spotLights[0]": {
                            "type": number;
                            "semantic": string;
                        };
                        "ltc_1": {
                            "type": number;
                            "semantic": string;
                        };
                        "ltc_2": {
                            "type": number;
                            "semantic": string;
                        };
                        "rectAreaLights[0]": {
                            "type": number;
                            "semantic": string;
                        };
                        "hemisphereLights[0]": {
                            "type": number;
                            "semantic": string;
                        };
                        "morphTargetInfluences[0]": {
                            "type": number;
                        };
                        "boneTexture": {
                            "type": number;
                        };
                        "boneTextureSize": {
                            "type": number;
                        };
                        "boneMatrices[0]": {
                            "type": number;
                            "semantic": string;
                        };
                        "directionalShadowMatrix[0]": {
                            "type": number;
                            "semantic": string;
                        };
                        "spotShadowMatrix[0]": {
                            "type": number;
                            "semantic": string;
                        };
                        "pointShadowMatrix[0]": {
                            "type": number;
                            "semantic": string;
                        };
                        "logDepthBufFC": {
                            "type": number;
                        };
                        "diffuse": {
                            "type": number;
                            "value": number[];
                        };
                        "emissive": {
                            "type": number;
                            "value": number[];
                        };
                        "opacity": {
                            "type": number;
                            "value": number;
                        };
                        "map": {
                            "type": number;
                        };
                        "alphaMap": {
                            "type": number;
                        };
                        "aoMap": {
                            "type": number;
                        };
                        "aoMapIntensity": {
                            "type": number;
                            "value": number;
                        };
                        "lightMap": {
                            "type": number;
                            "semantic": string;
                        };
                        "lightMapIntensity": {
                            "type": number;
                            "semantic": string;
                        };
                        "emissiveMap": {
                            "type": number;
                        };
                        "reflectivity": {
                            "type": number;
                            "value": any[];
                        };
                        "envMapIntensity": {
                            "type": number;
                            "value": number;
                        };
                        "envMap": {
                            "type": number;
                        };
                        "flipEnvMap": {
                            "type": number;
                            "value": number;
                        };
                        "maxMipLevel": {
                            "type": number;
                            "value": any[];
                        };
                        "fogColor": {
                            "type": number;
                            "semantic": string;
                        };
                        "fogDensity": {
                            "type": number;
                            "semantic": string;
                        };
                        "fogNear": {
                            "type": number;
                            "semantic": string;
                        };
                        "fogFar": {
                            "type": number;
                            "semantic": string;
                        };
                        "directionalShadowMap[0]": {
                            "type": number;
                            "semantic": string;
                        };
                        "spotShadowMap[0]": {
                            "type": number;
                            "semantic": string;
                        };
                        "pointShadowMap[0]": {
                            "type": number;
                            "semantic": string;
                        };
                        "specularMap": {
                            "type": number;
                        };
                        "clippingPlanes[0]": {
                            "type": number;
                        };
                    };
                    "states": {
                        "enable": any[];
                        "functions": {};
                    };
                }[];
            };
            "paper": {};
        };
        "extensionsRequired": string[];
        "extensionsUsed": string[];
    };
    const meshphong: {
        "version": string;
        "asset": {
            "version": string;
        };
        "extensions": {
            "KHR_techniques_webgl": {
                "shaders": {
                    "name": string;
                    "type": number;
                    "uri": string;
                }[];
                "techniques": {
                    "name": string;
                    "attributes": {
                        "position": {
                            "semantic": string;
                        };
                        "normal": {
                            "semantic": string;
                        };
                        "uv": {
                            "semantic": string;
                        };
                        "color": {
                            "semantic": string;
                        };
                        "morphTarget0": {
                            "semantic": string;
                        };
                        "morphTarget1": {
                            "semantic": string;
                        };
                        "morphTarget2": {
                            "semantic": string;
                        };
                        "morphTarget3": {
                            "semantic": string;
                        };
                        "morphNormal0": {
                            "semantic": string;
                        };
                        "morphNormal1": {
                            "semantic": string;
                        };
                        "morphNormal2": {
                            "semantic": string;
                        };
                        "morphNormal3": {
                            "semantic": string;
                        };
                        "morphTarget4": {
                            "semantic": string;
                        };
                        "morphTarget5": {
                            "semantic": string;
                        };
                        "morphTarget6": {
                            "semantic": string;
                        };
                        "morphTarget7": {
                            "semantic": string;
                        };
                        "skinIndex": {
                            "semantic": string;
                        };
                        "skinWeight": {
                            "semantic": string;
                        };
                        "uv2": {
                            "semantic": string;
                        };
                    };
                    "uniforms": {
                        "modelMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "modelViewMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "projectionMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "viewMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "normalMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "cameraPosition": {
                            "type": number;
                            "semantic": string;
                        };
                        "uvTransform": {
                            "type": number;
                            "value": number[];
                        };
                        "displacementMap": {
                            "type": number;
                        };
                        "displacementScale": {
                            "type": number;
                        };
                        "displacementBias": {
                            "type": number;
                        };
                        "refractionRatio": {
                            "type": number;
                            "value": any[];
                        };
                        "morphTargetInfluences[0]": {
                            "type": number;
                        };
                        "boneTexture": {
                            "type": number;
                        };
                        "boneTextureSize": {
                            "type": number;
                        };
                        "boneMatrices[0]": {
                            "type": number;
                            "semantic": string;
                        };
                        "directionalShadowMatrix[0]": {
                            "type": number;
                            "semantic": string;
                        };
                        "spotShadowMatrix[0]": {
                            "type": number;
                            "semantic": string;
                        };
                        "pointShadowMatrix[0]": {
                            "type": number;
                            "semantic": string;
                        };
                        "logDepthBufFC": {
                            "type": number;
                        };
                        "diffuse": {
                            "type": number;
                            "value": number[];
                        };
                        "emissive": {
                            "type": number;
                            "value": number[];
                        };
                        "specular": {
                            "type": number;
                            "value": number[];
                        };
                        "shininess": {
                            "type": number;
                            "value": number;
                        };
                        "opacity": {
                            "type": number;
                            "value": number;
                        };
                        "map": {
                            "type": number;
                        };
                        "alphaMap": {
                            "type": number;
                        };
                        "aoMap": {
                            "type": number;
                        };
                        "aoMapIntensity": {
                            "type": number;
                            "value": number;
                        };
                        "lightMap": {
                            "type": number;
                            "semantic": string;
                        };
                        "lightMapIntensity": {
                            "type": number;
                            "semantic": string;
                        };
                        "emissiveMap": {
                            "type": number;
                        };
                        "reflectivity": {
                            "type": number;
                            "value": any[];
                        };
                        "envMapIntensity": {
                            "type": number;
                            "value": number;
                        };
                        "envMap": {
                            "type": number;
                        };
                        "flipEnvMap": {
                            "type": number;
                            "value": number;
                        };
                        "maxMipLevel": {
                            "type": number;
                            "value": any[];
                        };
                        "gradientMap": {
                            "type": number;
                        };
                        "fogColor": {
                            "type": number;
                            "semantic": string;
                        };
                        "fogDensity": {
                            "type": number;
                            "semantic": string;
                        };
                        "fogNear": {
                            "type": number;
                            "semantic": string;
                        };
                        "fogFar": {
                            "type": number;
                            "semantic": string;
                        };
                        "ambientLightColor": {
                            "type": number;
                            "semantic": string;
                        };
                        "directionalLights[0]": {
                            "type": number;
                            "semantic": string;
                        };
                        "pointLights[0]": {
                            "type": number;
                            "semantic": string;
                        };
                        "spotLights[0]": {
                            "type": number;
                            "semantic": string;
                        };
                        "ltc_1": {
                            "type": number;
                            "semantic": string;
                        };
                        "ltc_2": {
                            "type": number;
                            "semantic": string;
                        };
                        "rectAreaLights[0]": {
                            "type": number;
                            "semantic": string;
                        };
                        "hemisphereLights[0]": {
                            "type": number;
                            "semantic": string;
                        };
                        "directionalShadowMap[0]": {
                            "type": number;
                            "semantic": string;
                        };
                        "spotShadowMap[0]": {
                            "type": number;
                            "semantic": string;
                        };
                        "pointShadowMap[0]": {
                            "type": number;
                            "semantic": string;
                        };
                        "bumpMap": {
                            "type": number;
                        };
                        "bumpScale": {
                            "type": number;
                        };
                        "normalMap": {
                            "type": number;
                        };
                        "normalScale": {
                            "type": number;
                        };
                        "specularMap": {
                            "type": number;
                        };
                        "clippingPlanes[0]": {
                            "type": number;
                        };
                    };
                    "states": {
                        "enable": any[];
                        "functions": {};
                    };
                }[];
            };
            "paper": {};
        };
        "extensionsRequired": string[];
        "extensionsUsed": string[];
    };
    const meshphysical: {
        "version": string;
        "asset": {
            "version": string;
        };
        "extensions": {
            "KHR_techniques_webgl": {
                "shaders": {
                    "name": string;
                    "type": number;
                    "uri": string;
                }[];
                "techniques": {
                    "name": string;
                    "attributes": {
                        "position": {
                            "semantic": string;
                        };
                        "normal": {
                            "semantic": string;
                        };
                        "uv": {
                            "semantic": string;
                        };
                        "color": {
                            "semantic": string;
                        };
                        "morphTarget0": {
                            "semantic": string;
                        };
                        "morphTarget1": {
                            "semantic": string;
                        };
                        "morphTarget2": {
                            "semantic": string;
                        };
                        "morphTarget3": {
                            "semantic": string;
                        };
                        "morphNormal0": {
                            "semantic": string;
                        };
                        "morphNormal1": {
                            "semantic": string;
                        };
                        "morphNormal2": {
                            "semantic": string;
                        };
                        "morphNormal3": {
                            "semantic": string;
                        };
                        "morphTarget4": {
                            "semantic": string;
                        };
                        "morphTarget5": {
                            "semantic": string;
                        };
                        "morphTarget6": {
                            "semantic": string;
                        };
                        "morphTarget7": {
                            "semantic": string;
                        };
                        "skinIndex": {
                            "semantic": string;
                        };
                        "skinWeight": {
                            "semantic": string;
                        };
                        "uv2": {
                            "semantic": string;
                        };
                    };
                    "uniforms": {
                        "modelMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "modelViewMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "projectionMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "viewMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "normalMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "cameraPosition": {
                            "type": number;
                            "semantic": string;
                        };
                        "uvTransform": {
                            "type": number;
                            "value": number[];
                        };
                        "displacementMap": {
                            "type": number;
                        };
                        "displacementScale": {
                            "type": number;
                        };
                        "displacementBias": {
                            "type": number;
                        };
                        "morphTargetInfluences[0]": {
                            "type": number;
                        };
                        "boneTexture": {
                            "type": number;
                        };
                        "boneTextureSize": {
                            "type": number;
                        };
                        "boneMatrices[0]": {
                            "type": number;
                            "semantic": string;
                        };
                        "directionalShadowMatrix[0]": {
                            "type": number;
                            "semantic": string;
                        };
                        "spotShadowMatrix[0]": {
                            "type": number;
                            "semantic": string;
                        };
                        "pointShadowMatrix[0]": {
                            "type": number;
                            "semantic": string;
                        };
                        "logDepthBufFC": {
                            "type": number;
                        };
                        "diffuse": {
                            "type": number;
                            "value": number[];
                        };
                        "emissive": {
                            "type": number;
                            "value": number[];
                        };
                        "roughness": {
                            "type": number;
                        };
                        "metalness": {
                            "type": number;
                        };
                        "opacity": {
                            "type": number;
                            "value": number;
                        };
                        "clearCoat": {
                            "type": number;
                        };
                        "clearCoatRoughness": {
                            "type": number;
                        };
                        "map": {
                            "type": number;
                        };
                        "alphaMap": {
                            "type": number;
                        };
                        "aoMap": {
                            "type": number;
                        };
                        "aoMapIntensity": {
                            "type": number;
                            "value": number;
                        };
                        "lightMap": {
                            "type": number;
                            "semantic": string;
                        };
                        "lightMapIntensity": {
                            "type": number;
                            "semantic": string;
                        };
                        "emissiveMap": {
                            "type": number;
                        };
                        "reflectivity": {
                            "type": number;
                            "value": any[];
                        };
                        "envMapIntensity": {
                            "type": number;
                            "value": number;
                        };
                        "envMap": {
                            "type": number;
                        };
                        "flipEnvMap": {
                            "type": number;
                            "value": number;
                        };
                        "maxMipLevel": {
                            "type": number;
                            "value": any[];
                        };
                        "refractionRatio": {
                            "type": number;
                            "value": any[];
                        };
                        "fogColor": {
                            "type": number;
                            "semantic": string;
                        };
                        "fogDensity": {
                            "type": number;
                            "semantic": string;
                        };
                        "fogNear": {
                            "type": number;
                            "semantic": string;
                        };
                        "fogFar": {
                            "type": number;
                            "semantic": string;
                        };
                        "ambientLightColor": {
                            "type": number;
                            "semantic": string;
                        };
                        "directionalLights[0]": {
                            "type": number;
                            "semantic": string;
                        };
                        "pointLights[0]": {
                            "type": number;
                            "semantic": string;
                        };
                        "spotLights[0]": {
                            "type": number;
                            "semantic": string;
                        };
                        "ltc_1": {
                            "type": number;
                            "semantic": string;
                        };
                        "ltc_2": {
                            "type": number;
                            "semantic": string;
                        };
                        "rectAreaLights[0]": {
                            "type": number;
                            "semantic": string;
                        };
                        "hemisphereLights[0]": {
                            "type": number;
                            "semantic": string;
                        };
                        "directionalShadowMap[0]": {
                            "type": number;
                            "semantic": string;
                        };
                        "spotShadowMap[0]": {
                            "type": number;
                            "semantic": string;
                        };
                        "pointShadowMap[0]": {
                            "type": number;
                            "semantic": string;
                        };
                        "bumpMap": {
                            "type": number;
                        };
                        "bumpScale": {
                            "type": number;
                        };
                        "normalMap": {
                            "type": number;
                        };
                        "normalScale": {
                            "type": number;
                        };
                        "roughnessMap": {
                            "type": number;
                        };
                        "metalnessMap": {
                            "type": number;
                        };
                        "clippingPlanes[0]": {
                            "type": number;
                        };
                    };
                    "states": {
                        "enable": any[];
                        "functions": {};
                    };
                }[];
            };
            "paper": {};
        };
        "extensionsRequired": string[];
        "extensionsUsed": string[];
    };
    const normal: {
        "version": string;
        "asset": {
            "version": string;
        };
        "extensions": {
            "KHR_techniques_webgl": {
                "shaders": {
                    "name": string;
                    "type": number;
                    "uri": string;
                }[];
                "techniques": {
                    "name": string;
                    "attributes": {
                        "position": {
                            "semantic": string;
                        };
                        "normal": {
                            "semantic": string;
                        };
                        "uv": {
                            "semantic": string;
                        };
                        "color": {
                            "semantic": string;
                        };
                        "morphTarget0": {
                            "semantic": string;
                        };
                        "morphTarget1": {
                            "semantic": string;
                        };
                        "morphTarget2": {
                            "semantic": string;
                        };
                        "morphTarget3": {
                            "semantic": string;
                        };
                        "morphNormal0": {
                            "semantic": string;
                        };
                        "morphNormal1": {
                            "semantic": string;
                        };
                        "morphNormal2": {
                            "semantic": string;
                        };
                        "morphNormal3": {
                            "semantic": string;
                        };
                        "morphTarget4": {
                            "semantic": string;
                        };
                        "morphTarget5": {
                            "semantic": string;
                        };
                        "morphTarget6": {
                            "semantic": string;
                        };
                        "morphTarget7": {
                            "semantic": string;
                        };
                        "skinIndex": {
                            "semantic": string;
                        };
                        "skinWeight": {
                            "semantic": string;
                        };
                    };
                    "uniforms": {
                        "modelMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "modelViewMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "projectionMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "viewMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "normalMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "cameraPosition": {
                            "type": number;
                            "semantic": string;
                        };
                        "uvTransform": {
                            "type": number;
                            "value": number[];
                        };
                        "displacementMap": {
                            "type": number;
                        };
                        "displacementScale": {
                            "type": number;
                        };
                        "displacementBias": {
                            "type": number;
                        };
                        "morphTargetInfluences[0]": {
                            "type": number;
                        };
                        "boneTexture": {
                            "type": number;
                        };
                        "boneTextureSize": {
                            "type": number;
                        };
                        "boneMatrices[0]": {
                            "type": number;
                            "semantic": string;
                        };
                        "logDepthBufFC": {
                            "type": number;
                        };
                        "opacity": {
                            "type": number;
                            "value": number;
                        };
                        "bumpMap": {
                            "type": number;
                        };
                        "bumpScale": {
                            "type": number;
                        };
                        "normalMap": {
                            "type": number;
                        };
                        "normalScale": {
                            "type": number;
                        };
                    };
                    "states": {
                        "enable": any[];
                        "functions": {};
                    };
                }[];
            };
            "paper": {};
        };
        "extensionsRequired": string[];
        "extensionsUsed": string[];
    };
    const particle: {
        "version": string;
        "asset": {
            "version": string;
        };
        "extensions": {
            "KHR_techniques_webgl": {
                "shaders": {
                    "name": string;
                    "type": number;
                    "uri": string;
                }[];
                "techniques": {
                    "name": string;
                    "attributes": {
                        "position": {
                            "semantic": string;
                        };
                        "normal": {
                            "semantic": string;
                        };
                        "uv": {
                            "semantic": string;
                        };
                        "color": {
                            "semantic": string;
                        };
                        "morphTarget0": {
                            "semantic": string;
                        };
                        "morphTarget1": {
                            "semantic": string;
                        };
                        "morphTarget2": {
                            "semantic": string;
                        };
                        "morphTarget3": {
                            "semantic": string;
                        };
                        "morphNormal0": {
                            "semantic": string;
                        };
                        "morphNormal1": {
                            "semantic": string;
                        };
                        "morphNormal2": {
                            "semantic": string;
                        };
                        "morphNormal3": {
                            "semantic": string;
                        };
                        "morphTarget4": {
                            "semantic": string;
                        };
                        "morphTarget5": {
                            "semantic": string;
                        };
                        "morphTarget6": {
                            "semantic": string;
                        };
                        "morphTarget7": {
                            "semantic": string;
                        };
                        "skinIndex": {
                            "semantic": string;
                        };
                        "skinWeight": {
                            "semantic": string;
                        };
                        "corner": {
                            "semantic": string;
                        };
                        "startPosition": {
                            "semantic": string;
                        };
                        "startVelocity": {
                            "semantic": string;
                        };
                        "startColor": {
                            "semantic": string;
                        };
                        "startSize": {
                            "semantic": string;
                        };
                        "startRotation": {
                            "semantic": string;
                        };
                        "time": {
                            "semantic": string;
                        };
                        "random0": {
                            "semantic": string;
                        };
                        "random1": {
                            "semantic": string;
                        };
                        "startWorldPosition": {
                            "semantic": string;
                        };
                        "startWorldRotation": {
                            "semantic": string;
                        };
                    };
                    "uniforms": {
                        "modelMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "modelViewMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "projectionMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "viewMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "normalMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "cameraPosition": {
                            "type": number;
                            "semantic": string;
                        };
                        "u_currentTime": {
                            "type": number;
                        };
                        "u_gravity": {
                            "type": number;
                        };
                        "u_worldPosition": {
                            "type": number;
                            "value": number[];
                        };
                        "u_worldRotation": {
                            "type": number;
                            "value": number[];
                        };
                        "u_startRotation3D": {
                            "type": number;
                        };
                        "u_scalingMode": {
                            "type": number;
                        };
                        "u_positionScale": {
                            "type": number;
                        };
                        "u_sizeScale": {
                            "type": number;
                        };
                        "viewProjectionMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "cameraForward": {
                            "type": number;
                            "semantic": string;
                        };
                        "cameraUp": {
                            "type": number;
                            "semantic": string;
                        };
                        "u_lengthScale": {
                            "type": number;
                        };
                        "u_speeaScale": {
                            "type": number;
                        };
                        "u_simulationSpace": {
                            "type": number;
                        };
                        "u_spaceType": {
                            "type": number;
                        };
                        "u_velocityConst": {
                            "type": number;
                        };
                        "u_velocityCurveX[0]": {
                            "type": number;
                        };
                        "u_velocityCurveY[0]": {
                            "type": number;
                        };
                        "u_velocityCurveZ[0]": {
                            "type": number;
                        };
                        "u_velocityConstMax": {
                            "type": number;
                        };
                        "u_velocityCurveMaxX[0]": {
                            "type": number;
                        };
                        "u_velocityCurveMaxY[0]": {
                            "type": number;
                        };
                        "u_velocityCurveMaxZ[0]": {
                            "type": number;
                        };
                        "u_colorGradient[0]": {
                            "type": number;
                        };
                        "u_alphaGradient[0]": {
                            "type": number;
                        };
                        "u_colorGradientMax[0]": {
                            "type": number;
                        };
                        "u_alphaGradientMax[0]": {
                            "type": number;
                        };
                        "u_sizeCurve[0]": {
                            "type": number;
                        };
                        "u_sizeCurveMax[0]": {
                            "type": number;
                        };
                        "u_sizeCurveX[0]": {
                            "type": number;
                        };
                        "u_sizeCurveY[0]": {
                            "type": number;
                        };
                        "u_sizeCurveZ[0]": {
                            "type": number;
                        };
                        "u_sizeCurveMaxX[0]": {
                            "type": number;
                        };
                        "u_sizeCurveMaxY[0]": {
                            "type": number;
                        };
                        "u_sizeCurveMaxZ[0]": {
                            "type": number;
                        };
                        "u_rotationConst": {
                            "type": number;
                        };
                        "u_rotationConstMax": {
                            "type": number;
                        };
                        "u_rotationCurve[0]": {
                            "type": number;
                        };
                        "u_rotationCurveMax[0]": {
                            "type": number;
                        };
                        "u_rotationConstSeprarate": {
                            "type": number;
                        };
                        "u_rotationConstMaxSeprarate": {
                            "type": number;
                        };
                        "u_rotationCurveX[0]": {
                            "type": number;
                        };
                        "u_rotationCurveY[0]": {
                            "type": number;
                        };
                        "u_rotationCurveZ[0]": {
                            "type": number;
                        };
                        "u_rotationCurveW[0]": {
                            "type": number;
                        };
                        "u_rotationCurveMaxX[0]": {
                            "type": number;
                        };
                        "u_rotationCurveMaxY[0]": {
                            "type": number;
                        };
                        "u_rotationCurveMaxZ[0]": {
                            "type": number;
                        };
                        "u_rotationCurveMaxW[0]": {
                            "type": number;
                        };
                        "u_cycles": {
                            "type": number;
                        };
                        "u_subUV": {
                            "type": number;
                        };
                        "u_uvCurve[0]": {
                            "type": number;
                        };
                        "u_uvCurveMax[0]": {
                            "type": number;
                        };
                        "map": {
                            "type": number;
                        };
                        "diffuse": {
                            "type": number;
                            "value": number[];
                        };
                        "opacity": {
                            "type": number;
                            "value": number;
                        };
                    };
                    "states": {
                        "enable": any[];
                        "functions": {};
                    };
                }[];
            };
            "paper": {};
        };
        "extensionsRequired": string[];
        "extensionsUsed": string[];
    };
    const points: {
        "version": string;
        "asset": {
            "version": string;
        };
        "extensions": {
            "KHR_techniques_webgl": {
                "shaders": {
                    "name": string;
                    "type": number;
                    "uri": string;
                }[];
                "techniques": {
                    "name": string;
                    "attributes": {
                        "position": {
                            "semantic": string;
                        };
                        "normal": {
                            "semantic": string;
                        };
                        "uv": {
                            "semantic": string;
                        };
                        "color": {
                            "semantic": string;
                        };
                        "morphTarget0": {
                            "semantic": string;
                        };
                        "morphTarget1": {
                            "semantic": string;
                        };
                        "morphTarget2": {
                            "semantic": string;
                        };
                        "morphTarget3": {
                            "semantic": string;
                        };
                        "morphNormal0": {
                            "semantic": string;
                        };
                        "morphNormal1": {
                            "semantic": string;
                        };
                        "morphNormal2": {
                            "semantic": string;
                        };
                        "morphNormal3": {
                            "semantic": string;
                        };
                        "morphTarget4": {
                            "semantic": string;
                        };
                        "morphTarget5": {
                            "semantic": string;
                        };
                        "morphTarget6": {
                            "semantic": string;
                        };
                        "morphTarget7": {
                            "semantic": string;
                        };
                        "skinIndex": {
                            "semantic": string;
                        };
                        "skinWeight": {
                            "semantic": string;
                        };
                    };
                    "uniforms": {
                        "modelMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "modelViewMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "projectionMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "viewMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "normalMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "cameraPosition": {
                            "type": number;
                            "semantic": string;
                        };
                        "size": {
                            "type": number;
                        };
                        "scale": {
                            "type": number;
                        };
                        "morphTargetInfluences[0]": {
                            "type": number;
                        };
                        "logDepthBufFC": {
                            "type": number;
                        };
                        "diffuse": {
                            "type": number;
                            "value": number[];
                        };
                        "opacity": {
                            "type": number;
                            "value": number;
                        };
                        "uvTransform": {
                            "type": number;
                            "value": number[];
                        };
                        "map": {
                            "type": number;
                        };
                        "fogColor": {
                            "type": number;
                            "semantic": string;
                        };
                        "fogDensity": {
                            "type": number;
                            "semantic": string;
                        };
                        "fogNear": {
                            "type": number;
                            "semantic": string;
                        };
                        "fogFar": {
                            "type": number;
                            "semantic": string;
                        };
                        "clippingPlanes[0]": {
                            "type": number;
                        };
                    };
                    "states": {
                        "enable": any[];
                        "functions": {};
                    };
                }[];
            };
            "paper": {};
        };
        "extensionsRequired": string[];
        "extensionsUsed": string[];
    };
    const shadow: {
        "version": string;
        "asset": {
            "version": string;
        };
        "extensions": {
            "KHR_techniques_webgl": {
                "shaders": {
                    "name": string;
                    "type": number;
                    "uri": string;
                }[];
                "techniques": {
                    "name": string;
                    "attributes": {
                        "position": {
                            "semantic": string;
                        };
                        "normal": {
                            "semantic": string;
                        };
                        "uv": {
                            "semantic": string;
                        };
                        "color": {
                            "semantic": string;
                        };
                        "morphTarget0": {
                            "semantic": string;
                        };
                        "morphTarget1": {
                            "semantic": string;
                        };
                        "morphTarget2": {
                            "semantic": string;
                        };
                        "morphTarget3": {
                            "semantic": string;
                        };
                        "morphNormal0": {
                            "semantic": string;
                        };
                        "morphNormal1": {
                            "semantic": string;
                        };
                        "morphNormal2": {
                            "semantic": string;
                        };
                        "morphNormal3": {
                            "semantic": string;
                        };
                        "morphTarget4": {
                            "semantic": string;
                        };
                        "morphTarget5": {
                            "semantic": string;
                        };
                        "morphTarget6": {
                            "semantic": string;
                        };
                        "morphTarget7": {
                            "semantic": string;
                        };
                        "skinIndex": {
                            "semantic": string;
                        };
                        "skinWeight": {
                            "semantic": string;
                        };
                    };
                    "uniforms": {
                        "modelMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "modelViewMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "projectionMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "viewMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "normalMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "cameraPosition": {
                            "type": number;
                            "semantic": string;
                        };
                        "directionalShadowMatrix[0]": {
                            "type": number;
                            "semantic": string;
                        };
                        "spotShadowMatrix[0]": {
                            "type": number;
                            "semantic": string;
                        };
                        "pointShadowMatrix[0]": {
                            "type": number;
                            "semantic": string;
                        };
                        "color": {
                            "type": number;
                        };
                        "opacity": {
                            "type": number;
                            "value": number;
                        };
                        "fogColor": {
                            "type": number;
                            "semantic": string;
                        };
                        "fogDensity": {
                            "type": number;
                            "semantic": string;
                        };
                        "fogNear": {
                            "type": number;
                            "semantic": string;
                        };
                        "fogFar": {
                            "type": number;
                            "semantic": string;
                        };
                        "ambientLightColor": {
                            "type": number;
                            "semantic": string;
                        };
                        "directionalLights[0]": {
                            "type": number;
                            "semantic": string;
                        };
                        "pointLights[0]": {
                            "type": number;
                            "semantic": string;
                        };
                        "spotLights[0]": {
                            "type": number;
                            "semantic": string;
                        };
                        "ltc_1": {
                            "type": number;
                            "semantic": string;
                        };
                        "ltc_2": {
                            "type": number;
                            "semantic": string;
                        };
                        "rectAreaLights[0]": {
                            "type": number;
                            "semantic": string;
                        };
                        "hemisphereLights[0]": {
                            "type": number;
                            "semantic": string;
                        };
                        "directionalShadowMap[0]": {
                            "type": number;
                            "semantic": string;
                        };
                        "spotShadowMap[0]": {
                            "type": number;
                            "semantic": string;
                        };
                        "pointShadowMap[0]": {
                            "type": number;
                            "semantic": string;
                        };
                    };
                    "states": {
                        "enable": any[];
                        "functions": {};
                    };
                }[];
            };
            "paper": {};
        };
        "extensionsRequired": string[];
        "extensionsUsed": string[];
    };
    const sprite: {
        "version": string;
        "asset": {
            "version": string;
        };
        "extensions": {
            "KHR_techniques_webgl": {
                "shaders": {
                    "name": string;
                    "type": number;
                    "uri": string;
                }[];
                "techniques": {
                    "name": string;
                    "attributes": {
                        "position": {
                            "semantic": string;
                        };
                        "normal": {
                            "semantic": string;
                        };
                        "uv": {
                            "semantic": string;
                        };
                        "color": {
                            "semantic": string;
                        };
                        "morphTarget0": {
                            "semantic": string;
                        };
                        "morphTarget1": {
                            "semantic": string;
                        };
                        "morphTarget2": {
                            "semantic": string;
                        };
                        "morphTarget3": {
                            "semantic": string;
                        };
                        "morphNormal0": {
                            "semantic": string;
                        };
                        "morphNormal1": {
                            "semantic": string;
                        };
                        "morphNormal2": {
                            "semantic": string;
                        };
                        "morphNormal3": {
                            "semantic": string;
                        };
                        "morphTarget4": {
                            "semantic": string;
                        };
                        "morphTarget5": {
                            "semantic": string;
                        };
                        "morphTarget6": {
                            "semantic": string;
                        };
                        "morphTarget7": {
                            "semantic": string;
                        };
                        "skinIndex": {
                            "semantic": string;
                        };
                        "skinWeight": {
                            "semantic": string;
                        };
                    };
                    "uniforms": {
                        "modelMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "modelViewMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "projectionMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "viewMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "normalMatrix": {
                            "type": number;
                            "semantic": string;
                        };
                        "cameraPosition": {
                            "type": number;
                            "semantic": string;
                        };
                        "rotation": {
                            "type": number;
                        };
                        "center": {
                            "type": number;
                        };
                        "uvTransform": {
                            "type": number;
                            "value": number[];
                        };
                        "logDepthBufFC": {
                            "type": number;
                        };
                        "diffuse": {
                            "type": number;
                            "value": number[];
                        };
                        "opacity": {
                            "type": number;
                            "value": number;
                        };
                        "map": {
                            "type": number;
                        };
                        "fogColor": {
                            "type": number;
                            "semantic": string;
                        };
                        "fogDensity": {
                            "type": number;
                            "semantic": string;
                        };
                        "fogNear": {
                            "type": number;
                            "semantic": string;
                        };
                        "fogFar": {
                            "type": number;
                            "semantic": string;
                        };
                        "clippingPlanes[0]": {
                            "type": number;
                        };
                    };
                    "states": {
                        "enable": any[];
                        "functions": {};
                    };
                }[];
            };
            "paper": {};
        };
        "extensionsRequired": string[];
        "extensionsUsed": string[];
    };
}
declare namespace egret3d.ShaderChunk {
    const alphamap_fragment = "#ifdef USE_ALPHAMAP\n\n diffuseColor.a *= texture2D( alphaMap, vUv ).g;\n\n#endif\n";
    const alphamap_pars_fragment = "#ifdef USE_ALPHAMAP\n\n uniform sampler2D alphaMap;\n\n#endif\n";
    const alphatest_fragment = "#ifdef ALPHATEST\n\n if ( diffuseColor.a < ALPHATEST ) discard;\n\n#endif\n";
    const aomap_fragment = "#ifdef USE_AOMAP\n\n // reads channel R, compatible with a combined OcclusionRoughnessMetallic (RGB) texture\n float ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;\n\n reflectedLight.indirectDiffuse *= ambientOcclusion;\n\n #if defined( USE_ENVMAP ) && defined( PHYSICAL )\n\n  float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\n  reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.specularRoughness );\n\n #endif\n\n#endif\n";
    const aomap_pars_fragment = "#ifdef USE_AOMAP\n\n uniform sampler2D aoMap;\n uniform float aoMapIntensity;\n\n#endif";
    const beginnormal_vertex = "\nvec3 objectNormal = vec3( normal );\n";
    const begin_vertex = "\nvec3 transformed = vec3( position );\n";
    const bsdfs = "float punctualLightIntensityToIrradianceFactor( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n\n if( decayExponent > 0.0 ) {\n\n#if defined ( PHYSICALLY_CORRECT_LIGHTS )\n\n  // based upon Frostbite 3 Moving to Physically-based Rendering\n  // page 32, equation 26: E[window1]\n  // https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf\n  // this is intended to be used on spot and point lights who are represented as luminous intensity\n  // but who must be converted to luminous irradiance for surface lighting calculation\n  float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );\n  float maxDistanceCutoffFactor = pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );\n  return distanceFalloff * maxDistanceCutoffFactor;\n\n#else\n\n  return pow( saturate( -lightDistance / cutoffDistance + 1.0 ), decayExponent );\n\n#endif\n\n }\n\n return 1.0;\n\n}\n\nvec3 BRDF_Diffuse_Lambert( const in vec3 diffuseColor ) {\n\n return RECIPROCAL_PI * diffuseColor;\n\n} // validated\n\nvec3 F_Schlick( const in vec3 specularColor, const in float dotLH ) {\n\n // Original approximation by Christophe Schlick '94\n // float fresnel = pow( 1.0 - dotLH, 5.0 );\n\n // Optimized variant (presented by Epic at SIGGRAPH '13)\n // https://cdn2.unrealengine.com/Resources/files/2013SiggraphPresentationsNotes-26915738.pdf\n float fresnel = exp2( ( -5.55473 * dotLH - 6.98316 ) * dotLH );\n\n return ( 1.0 - specularColor ) * fresnel + specularColor;\n\n} // validated\n\n// Microfacet Models for Refraction through Rough Surfaces - equation (34)\n// http://graphicrants.blogspot.com/2013/08/specular-brdf-reference.html\n// alpha is \"roughness squared\" in Disney’s reparameterization\nfloat G_GGX_Smith( const in float alpha, const in float dotNL, const in float dotNV ) {\n\n // geometry term (normalized) = G(l)⋅G(v) / 4(n⋅l)(n⋅v)\n // also see #12151\n\n float a2 = pow2( alpha );\n\n float gl = dotNL + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n float gv = dotNV + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\n return 1.0 / ( gl * gv );\n\n} // validated\n\n// Moving Frostbite to Physically Based Rendering 3.0 - page 12, listing 2\n// https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf\nfloat G_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n\n float a2 = pow2( alpha );\n\n // dotNL and dotNV are explicitly swapped. This is not a mistake.\n float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\n return 0.5 / max( gv + gl, EPSILON );\n\n}\n\n// Microfacet Models for Refraction through Rough Surfaces - equation (33)\n// http://graphicrants.blogspot.com/2013/08/specular-brdf-reference.html\n// alpha is \"roughness squared\" in Disney’s reparameterization\nfloat D_GGX( const in float alpha, const in float dotNH ) {\n\n float a2 = pow2( alpha );\n\n float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0; // avoid alpha = 0 with dotNH = 1\n\n return RECIPROCAL_PI * a2 / pow2( denom );\n\n}\n\n// GGX Distribution, Schlick Fresnel, GGX-Smith Visibility\nvec3 BRDF_Specular_GGX( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float roughness ) {\n\n float alpha = pow2( roughness ); // UE4's roughness\n\n vec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );\n\n float dotNL = saturate( dot( geometry.normal, incidentLight.direction ) );\n float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n float dotNH = saturate( dot( geometry.normal, halfDir ) );\n float dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\n vec3 F = F_Schlick( specularColor, dotLH );\n\n float G = G_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n\n float D = D_GGX( alpha, dotNH );\n\n return F * ( G * D );\n\n} // validated\n\n// Rect Area Light\n\n// Real-Time Polygonal-Light Shading with Linearly Transformed Cosines\n// by Eric Heitz, Jonathan Dupuy, Stephen Hill and David Neubelt\n// code: https://github.com/selfshadow/ltc_code/\n\nvec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {\n\n const float LUT_SIZE  = 64.0;\n const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;\n const float LUT_BIAS  = 0.5 / LUT_SIZE;\n\n float dotNV = saturate( dot( N, V ) );\n\n // texture parameterized by sqrt( GGX alpha ) and sqrt( 1 - cos( theta ) )\n vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );\n\n uv = uv * LUT_SCALE + LUT_BIAS;\n\n return uv;\n\n}\n\nfloat LTC_ClippedSphereFormFactor( const in vec3 f ) {\n\n // Real-Time Area Lighting: a Journey from Research to Production (p.102)\n // An approximation of the form factor of a horizon-clipped rectangle.\n\n float l = length( f );\n\n return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );\n\n}\n\nvec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {\n\n float x = dot( v1, v2 );\n\n float y = abs( x );\n\n // rational polynomial approximation to theta / sin( theta ) / 2PI\n float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;\n float b = 3.4175940 + ( 4.1616724 + y ) * y;\n float v = a / b;\n\n float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;\n\n return cross( v1, v2 ) * theta_sintheta;\n\n}\n\nvec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {\n\n // bail if point is on back side of plane of light\n // assumes ccw winding order of light vertices\n vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];\n vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];\n vec3 lightNormal = cross( v1, v2 );\n\n if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );\n\n // construct orthonormal basis around N\n vec3 T1, T2;\n T1 = normalize( V - N * dot( V, N ) );\n T2 = - cross( N, T1 ); // negated from paper; possibly due to a different handedness of world coordinate system\n\n // compute transform\n mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );\n\n // transform rect\n vec3 coords[ 4 ];\n coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );\n coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );\n coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );\n coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );\n\n // project rect onto sphere\n coords[ 0 ] = normalize( coords[ 0 ] );\n coords[ 1 ] = normalize( coords[ 1 ] );\n coords[ 2 ] = normalize( coords[ 2 ] );\n coords[ 3 ] = normalize( coords[ 3 ] );\n\n // calculate vector form factor\n vec3 vectorFormFactor = vec3( 0.0 );\n vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );\n vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );\n vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );\n vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );\n\n // adjust for horizon clipping\n float result = LTC_ClippedSphereFormFactor( vectorFormFactor );\n\n/*\n // alternate method of adjusting for horizon clipping (see referece)\n // refactoring required\n float len = length( vectorFormFactor );\n float z = vectorFormFactor.z / len;\n\n const float LUT_SIZE  = 64.0;\n const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;\n const float LUT_BIAS  = 0.5 / LUT_SIZE;\n\n // tabulated horizon-clipped sphere, apparently...\n vec2 uv = vec2( z * 0.5 + 0.5, len );\n uv = uv * LUT_SCALE + LUT_BIAS;\n\n float scale = texture2D( ltc_2, uv ).w;\n\n float result = len * scale;\n*/\n\n return vec3( result );\n\n}\n\n// End Rect Area Light\n\n// ref: https://www.unrealengine.com/blog/physically-based-shading-on-mobile - environmentBRDF for GGX on mobile\nvec3 BRDF_Specular_GGX_Environment( const in GeometricContext geometry, const in vec3 specularColor, const in float roughness ) {\n\n float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\n const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );\n\n const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );\n\n vec4 r = roughness * c0 + c1;\n\n float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;\n\n vec2 AB = vec2( -1.04, 1.04 ) * a004 + r.zw;\n\n return specularColor * AB.x + AB.y;\n\n} // validated\n\n\nfloat G_BlinnPhong_Implicit( /* const in float dotNL, const in float dotNV */ ) {\n\n // geometry term is (n dot l)(n dot v) / 4(n dot l)(n dot v)\n return 0.25;\n\n}\n\nfloat D_BlinnPhong( const in float shininess, const in float dotNH ) {\n\n return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n\n}\n\nvec3 BRDF_Specular_BlinnPhong( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float shininess ) {\n\n vec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );\n\n //float dotNL = saturate( dot( geometry.normal, incidentLight.direction ) );\n //float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n float dotNH = saturate( dot( geometry.normal, halfDir ) );\n float dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\n vec3 F = F_Schlick( specularColor, dotLH );\n\n float G = G_BlinnPhong_Implicit( /* dotNL, dotNV */ );\n\n float D = D_BlinnPhong( shininess, dotNH );\n\n return F * ( G * D );\n\n} // validated\n\n// source: http://simonstechblog.blogspot.ca/2011/12/microfacet-brdf.html\nfloat GGXRoughnessToBlinnExponent( const in float ggxRoughness ) {\n return ( 2.0 / pow2( ggxRoughness + 0.0001 ) - 2.0 );\n}\n\nfloat BlinnExponentToGGXRoughness( const in float blinnExponent ) {\n return sqrt( 2.0 / ( blinnExponent + 2.0 ) );\n}\n";
    const bumpMap_pars_frag = "#ifdef USE_BUMPMAP\n\n uniform sampler2D bumpMap;\n uniform float bumpScale;\n\n // Derivative maps - bump mapping unparametrized surfaces by Morten Mikkelsen\n // http://mmikkelsen3d.blogspot.sk/2011/07/derivative-maps.html\n\n // Evaluate the derivative of the height w.r.t. screen-space using forward differencing (listing 2)\n\n vec2 dHdxy_fwd(vec2 uv) {\n\n  vec2 dSTdx = dFdx( uv );\n  vec2 dSTdy = dFdy( uv );\n\n  float Hll = bumpScale * texture2D( bumpMap, uv ).x;\n  float dBx = bumpScale * texture2D( bumpMap, uv + dSTdx ).x - Hll;\n  float dBy = bumpScale * texture2D( bumpMap, uv + dSTdy ).x - Hll;\n\n  return vec2( dBx, dBy );\n\n }\n\n vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy) {\n\n  vec3 vSigmaX = dFdx( surf_pos );\n  vec3 vSigmaY = dFdy( surf_pos );\n  vec3 vN = surf_norm;  // normalized\n\n  vec3 R1 = cross( vSigmaY, vN );\n  vec3 R2 = cross( vN, vSigmaX );\n\n  float fDet = dot( vSigmaX, R1 );\n\n  vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n  return normalize( abs( fDet ) * surf_norm - vGrad );\n\n }\n\n#endif\n";
    const bumpmap_pars_fragment = "#ifdef USE_BUMPMAP\n\n uniform sampler2D bumpMap;\n uniform float bumpScale;\n\n // Bump Mapping Unparametrized Surfaces on the GPU by Morten S. Mikkelsen\n // http://api.unrealengine.com/attachments/Engine/Rendering/LightingAndShadows/BumpMappingWithoutTangentSpace/mm_sfgrad_bump.pdf\n\n // Evaluate the derivative of the height w.r.t. screen-space using forward differencing (listing 2)\n\n vec2 dHdxy_fwd() {\n\n  vec2 dSTdx = dFdx( vUv );\n  vec2 dSTdy = dFdy( vUv );\n\n  float Hll = bumpScale * texture2D( bumpMap, vUv ).x;\n  float dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;\n  float dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;\n\n  return vec2( dBx, dBy );\n\n }\n\n vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {\n\n  // Workaround for Adreno 3XX dFd*( vec3 ) bug. See #9988\n\n  vec3 vSigmaX = vec3( dFdx( surf_pos.x ), dFdx( surf_pos.y ), dFdx( surf_pos.z ) );\n  vec3 vSigmaY = vec3( dFdy( surf_pos.x ), dFdy( surf_pos.y ), dFdy( surf_pos.z ) );\n  vec3 vN = surf_norm;  // normalized\n\n  vec3 R1 = cross( vSigmaY, vN );\n  vec3 R2 = cross( vN, vSigmaX );\n\n  float fDet = dot( vSigmaX, R1 );\n\n  fDet *= ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\n  vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n  return normalize( abs( fDet ) * surf_norm - vGrad );\n\n }\n\n#endif\n";
    const clipping_planes_fragment = "#if defined(NUM_CLIPPING_PLANES) && NUM_CLIPPING_PLANES > 0\n\n vec4 plane;\n\n // #pragma unroll_loop\n for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n\n  plane = clippingPlanes[ i ];\n  if ( dot( vViewPosition, plane.xyz ) > plane.w ) discard;\n\n }\n\n #if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n\n  bool clipped = true;\n\n  // #pragma unroll_loop\n  for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n\n   plane = clippingPlanes[ i ];\n   clipped = ( dot( vViewPosition, plane.xyz ) > plane.w ) && clipped;\n\n  }\n\n  if ( clipped ) discard;\n\n #endif\n\n#endif\n";
    const clipping_planes_pars_fragment = "#if defined(NUM_CLIPPING_PLANES) && NUM_CLIPPING_PLANES > 0\n\n #if ! defined( PHYSICAL ) && ! defined( PHONG )\n  varying vec3 vViewPosition;\n #endif\n\n uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];\n\n#endif\n";
    const clipping_planes_pars_vertex = "#if defined(NUM_CLIPPING_PLANES) && NUM_CLIPPING_PLANES > 0 && ! defined( PHYSICAL ) && ! defined( PHONG )\n varying vec3 vViewPosition;\n#endif\n";
    const clipping_planes_vertex = "#if defined(NUM_CLIPPING_PLANES) && NUM_CLIPPING_PLANES > 0 && ! defined( PHYSICAL ) && ! defined( PHONG )\n vViewPosition = - mvPosition.xyz;\n#endif\n\n";
    const color_fragment = "#ifdef USE_COLOR\n\n diffuseColor.rgb *= vColor;\n\n#endif";
    const color_pars_fragment = "#ifdef USE_COLOR\n\n varying vec3 vColor;\n\n#endif\n";
    const color_pars_vertex = "#ifdef USE_COLOR\n\n varying vec3 vColor;\n\n#endif";
    const color_vertex = "#ifdef USE_COLOR\n\n vColor.xyz = color.xyz;\n\n#endif";
    const common = "#define PI 3.14159265359\n#define PI2 6.28318530718\n#define PI_HALF 1.5707963267949\n#define RECIPROCAL_PI 0.31830988618\n#define RECIPROCAL_PI2 0.15915494\n#define LOG2 1.442695\n#define EPSILON 1e-6\n\n#define saturate(a) clamp( a, 0.0, 1.0 )\n#define whiteCompliment(a) ( 1.0 - saturate( a ) )\n\nfloat pow2( const in float x ) { return x*x; }\nfloat pow3( const in float x ) { return x*x*x; }\nfloat pow4( const in float x ) { float x2 = x*x; return x2*x2; }\nfloat average( const in vec3 color ) { return dot( color, vec3( 0.3333 ) ); }\n// expects values in the range of [0,1]x[0,1], returns values in the [0,1] range.\n// do not collapse into a single function per: http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/\nhighp float rand( const in vec2 uv ) {\n const highp float a = 12.9898, b = 78.233, c = 43758.5453;\n highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );\n return fract(sin(sn) * c);\n}\n\nstruct IncidentLight {\n vec3 color;\n vec3 direction;\n bool visible;\n};\n\nstruct ReflectedLight {\n vec3 directDiffuse;\n vec3 directSpecular;\n vec3 indirectDiffuse;\n vec3 indirectSpecular;\n};\n\nstruct GeometricContext {\n vec3 position;\n vec3 normal;\n vec3 viewDir;\n};\n\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\n return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n\n}\n\n// http://en.wikibooks.org/wiki/GLSL_Programming/Applying_Matrix_Transformations\nvec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {\n\n return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );\n\n}\n\nvec3 projectOnPlane(in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\n float distance = dot( planeNormal, point - pointOnPlane );\n\n return - distance * planeNormal + point;\n\n}\n\nfloat sideOfPlane( in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\n return sign( dot( point - pointOnPlane, planeNormal ) );\n\n}\n\nvec3 linePlaneIntersect( in vec3 pointOnLine, in vec3 lineDirection, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\n return lineDirection * ( dot( planeNormal, pointOnPlane - pointOnLine ) / dot( planeNormal, lineDirection ) ) + pointOnLine;\n\n}\n\nmat3 transposeMat3( const in mat3 m ) {\n\n mat3 tmp;\n\n tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );\n tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );\n tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );\n\n return tmp;\n\n}\n\n// https://en.wikipedia.org/wiki/Relative_luminance\nfloat linearToRelativeLuminance( const in vec3 color ) {\n\n vec3 weights = vec3( 0.2126, 0.7152, 0.0722 );\n\n return dot( weights, color.rgb );\n\n}\n";
    const common_frag_def = "//------------------------------------------------\nuniform mat4 viewMatrix;\nuniform vec3 cameraPosition;\n//------------------------------------------------\n";
    const common_vert_def = "\n//------------------------------------------------\nuniform mat4 modelMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nuniform vec3 cameraPosition;\n\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec2 uv;\n\n#ifdef USE_COLOR\n\n attribute vec3 color;\n#endif\n#ifdef USE_MORPHTARGETS\n attribute vec3 morphTarget0;\n attribute vec3 morphTarget1;\n attribute vec3 morphTarget2;\n attribute vec3 morphTarget3;\n #ifdef USE_MORPHNORMALS\n  attribute vec3 morphNormal0;\n  attribute vec3 morphNormal1;\n  attribute vec3 morphNormal2;\n  attribute vec3 morphNormal3;\n #else\n  attribute vec3 morphTarget4;\n  attribute vec3 morphTarget5;\n  attribute vec3 morphTarget6;\n  attribute vec3 morphTarget7;\n #endif\n#endif\n#ifdef USE_SKINNING\n attribute vec4 skinIndex;\n attribute vec4 skinWeight;\n#endif\n//------------------------------------------------\n";
    const cube_uv_reflection_fragment = "#ifdef ENVMAP_TYPE_CUBE_UV\n\n#define cubeUV_textureSize (1024.0)\n\nint getFaceFromDirection(vec3 direction) {\n vec3 absDirection = abs(direction);\n int face = -1;\n if( absDirection.x > absDirection.z ) {\n  if(absDirection.x > absDirection.y )\n   face = direction.x > 0.0 ? 0 : 3;\n  else\n   face = direction.y > 0.0 ? 1 : 4;\n }\n else {\n  if(absDirection.z > absDirection.y )\n   face = direction.z > 0.0 ? 2 : 5;\n  else\n   face = direction.y > 0.0 ? 1 : 4;\n }\n return face;\n}\n#define cubeUV_maxLods1  (log2(cubeUV_textureSize*0.25) - 1.0)\n#define cubeUV_rangeClamp (exp2((6.0 - 1.0) * 2.0))\n\nvec2 MipLevelInfo( vec3 vec, float roughnessLevel, float roughness ) {\n float scale = exp2(cubeUV_maxLods1 - roughnessLevel);\n float dxRoughness = dFdx(roughness);\n float dyRoughness = dFdy(roughness);\n vec3 dx = dFdx( vec * scale * dxRoughness );\n vec3 dy = dFdy( vec * scale * dyRoughness );\n float d = max( dot( dx, dx ), dot( dy, dy ) );\n // Clamp the value to the max mip level counts. hard coded to 6 mips\n d = clamp(d, 1.0, cubeUV_rangeClamp);\n float mipLevel = 0.5 * log2(d);\n return vec2(floor(mipLevel), fract(mipLevel));\n}\n\n#define cubeUV_maxLods2 (log2(cubeUV_textureSize*0.25) - 2.0)\n#define cubeUV_rcpTextureSize (1.0 / cubeUV_textureSize)\n\nvec2 getCubeUV(vec3 direction, float roughnessLevel, float mipLevel) {\n mipLevel = roughnessLevel > cubeUV_maxLods2 - 3.0 ? 0.0 : mipLevel;\n float a = 16.0 * cubeUV_rcpTextureSize;\n\n vec2 exp2_packed = exp2( vec2( roughnessLevel, mipLevel ) );\n vec2 rcp_exp2_packed = vec2( 1.0 ) / exp2_packed;\n // float powScale = exp2(roughnessLevel + mipLevel);\n float powScale = exp2_packed.x * exp2_packed.y;\n // float scale =  1.0 / exp2(roughnessLevel + 2.0 + mipLevel);\n float scale = rcp_exp2_packed.x * rcp_exp2_packed.y * 0.25;\n // float mipOffset = 0.75*(1.0 - 1.0/exp2(mipLevel))/exp2(roughnessLevel);\n float mipOffset = 0.75*(1.0 - rcp_exp2_packed.y) * rcp_exp2_packed.x;\n\n bool bRes = mipLevel == 0.0;\n scale =  bRes && (scale < a) ? a : scale;\n\n vec3 r;\n vec2 offset;\n int face = getFaceFromDirection(direction);\n\n float rcpPowScale = 1.0 / powScale;\n\n if( face == 0) {\n  r = vec3(direction.x, -direction.z, direction.y);\n  offset = vec2(0.0+mipOffset,0.75 * rcpPowScale);\n  offset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;\n }\n else if( face == 1) {\n  r = vec3(direction.y, direction.x, direction.z);\n  offset = vec2(scale+mipOffset, 0.75 * rcpPowScale);\n  offset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;\n }\n else if( face == 2) {\n  r = vec3(direction.z, direction.x, direction.y);\n  offset = vec2(2.0*scale+mipOffset, 0.75 * rcpPowScale);\n  offset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;\n }\n else if( face == 3) {\n  r = vec3(direction.x, direction.z, direction.y);\n  offset = vec2(0.0+mipOffset,0.5 * rcpPowScale);\n  offset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;\n }\n else if( face == 4) {\n  r = vec3(direction.y, direction.x, -direction.z);\n  offset = vec2(scale+mipOffset, 0.5 * rcpPowScale);\n  offset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;\n }\n else {\n  r = vec3(direction.z, -direction.x, direction.y);\n  offset = vec2(2.0*scale+mipOffset, 0.5 * rcpPowScale);\n  offset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;\n }\n r = normalize(r);\n float texelOffset = 0.5 * cubeUV_rcpTextureSize;\n vec2 s = ( r.yz / abs( r.x ) + vec2( 1.0 ) ) * 0.5;\n vec2 base = offset + vec2( texelOffset );\n return base + s * ( scale - 2.0 * texelOffset );\n}\n\n#define cubeUV_maxLods3 (log2(cubeUV_textureSize*0.25) - 3.0)\n\nvec4 textureCubeUV( sampler2D envMap, vec3 reflectedDirection, float roughness ) {\n float roughnessVal = roughness* cubeUV_maxLods3;\n float r1 = floor(roughnessVal);\n float r2 = r1 + 1.0;\n float t = fract(roughnessVal);\n vec2 mipInfo = MipLevelInfo(reflectedDirection, r1, roughness);\n float s = mipInfo.y;\n float level0 = mipInfo.x;\n float level1 = level0 + 1.0;\n level1 = level1 > 5.0 ? 5.0 : level1;\n\n // round to nearest mipmap if we are not interpolating.\n level0 += min( floor( s + 0.5 ), 5.0 );\n\n // Tri linear interpolation.\n vec2 uv_10 = getCubeUV(reflectedDirection, r1, level0);\n vec4 color10 = envMapTexelToLinear(texture2D(envMap, uv_10));\n\n vec2 uv_20 = getCubeUV(reflectedDirection, r2, level0);\n vec4 color20 = envMapTexelToLinear(texture2D(envMap, uv_20));\n\n vec4 result = mix(color10, color20, t);\n\n return vec4(result.rgb, 1.0);\n}\n\n#endif\n";
    const defaultnormal_vertex = "vec3 transformedNormal = normalMatrix * objectNormal;\n\n#ifdef FLIP_SIDED\n\n transformedNormal = - transformedNormal;\n\n#endif\n";
    const displacementmap_pars_vertex = "#ifdef USE_DISPLACEMENTMAP\n\n uniform sampler2D displacementMap;\n uniform float displacementScale;\n uniform float displacementBias;\n\n#endif\n";
    const displacementmap_vertex = "#ifdef USE_DISPLACEMENTMAP\n\n transformed += normalize( objectNormal ) * ( texture2D( displacementMap, uv ).x * displacementScale + displacementBias );\n\n#endif\n";
    const dithering_fragment = "#if defined( DITHERING )\n\n  gl_FragColor.rgb = dithering( gl_FragColor.rgb );\n\n#endif\n";
    const dithering_pars_fragment = "#if defined( DITHERING )\n\n // based on https://www.shadertoy.com/view/MslGR8\n vec3 dithering( vec3 color ) {\n  //Calculate grid position\n  float grid_position = rand( gl_FragCoord.xy );\n\n  //Shift the individual colors differently, thus making it even harder to see the dithering pattern\n  vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );\n\n  //modify shift acording to grid position.\n  dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );\n\n  //shift the color by dither_shift\n  return color + dither_shift_RGB;\n }\n\n#endif\n";
    const emissivemap_fragment = "#ifdef USE_EMISSIVEMAP\n\n vec4 emissiveColor = texture2D( emissiveMap, vUv );\n\n emissiveColor.rgb = emissiveMapTexelToLinear( emissiveColor ).rgb;\n\n totalEmissiveRadiance *= emissiveColor.rgb;\n\n#endif\n";
    const emissivemap_pars_fragment = "#ifdef USE_EMISSIVEMAP\n\n uniform sampler2D emissiveMap;\n\n#endif\n";
    const encodings_fragment = "  // gl_FragColor = linearToOutputTexel( gl_FragColor );\n";
    const encodings_pars_fragment = "// For a discussion of what this is, please read this: http://lousodrome.net/blog/light/2013/05/26/gamma-correct-and-hdr-rendering-in-a-32-bits-buffer/\n\nvec4 LinearToLinear( in vec4 value ) {\n return value;\n}\n\nvec4 GammaToLinear( in vec4 value, in float gammaFactor ) {\n return vec4( pow( value.xyz, vec3( gammaFactor ) ), value.w );\n}\nvec4 LinearToGamma( in vec4 value, in float gammaFactor ) {\n return vec4( pow( value.xyz, vec3( 1.0 / gammaFactor ) ), value.w );\n}\n\nvec4 sRGBToLinear( in vec4 value ) {\n return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.w );\n}\nvec4 LinearTosRGB( in vec4 value ) {\n return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.w );\n}\n\nvec4 RGBEToLinear( in vec4 value ) {\n return vec4( value.rgb * exp2( value.a * 255.0 - 128.0 ), 1.0 );\n}\nvec4 LinearToRGBE( in vec4 value ) {\n float maxComponent = max( max( value.r, value.g ), value.b );\n float fExp = clamp( ceil( log2( maxComponent ) ), -128.0, 127.0 );\n return vec4( value.rgb / exp2( fExp ), ( fExp + 128.0 ) / 255.0 );\n//  return vec4( value.brg, ( 3.0 + 128.0 ) / 256.0 );\n}\n\n// reference: http://iwasbeingirony.blogspot.ca/2010/06/difference-between-rgbm-and-rgbd.html\nvec4 RGBMToLinear( in vec4 value, in float maxRange ) {\n return vec4( value.xyz * value.w * maxRange, 1.0 );\n}\nvec4 LinearToRGBM( in vec4 value, in float maxRange ) {\n float maxRGB = max( value.x, max( value.g, value.b ) );\n float M      = clamp( maxRGB / maxRange, 0.0, 1.0 );\n M            = ceil( M * 255.0 ) / 255.0;\n return vec4( value.rgb / ( M * maxRange ), M );\n}\n\n// reference: http://iwasbeingirony.blogspot.ca/2010/06/difference-between-rgbm-and-rgbd.html\nvec4 RGBDToLinear( in vec4 value, in float maxRange ) {\n return vec4( value.rgb * ( ( maxRange / 255.0 ) / value.a ), 1.0 );\n}\nvec4 LinearToRGBD( in vec4 value, in float maxRange ) {\n float maxRGB = max( value.x, max( value.g, value.b ) );\n float D      = max( maxRange / maxRGB, 1.0 );\n D            = min( floor( D ) / 255.0, 1.0 );\n return vec4( value.rgb * ( D * ( 255.0 / maxRange ) ), D );\n}\n\n// LogLuv reference: http://graphicrants.blogspot.ca/2009/04/rgbm-color-encoding.html\n\n// M matrix, for encoding\nconst mat3 cLogLuvM = mat3( 0.2209, 0.3390, 0.4184, 0.1138, 0.6780, 0.7319, 0.0102, 0.1130, 0.2969 );\nvec4 LinearToLogLuv( in vec4 value )  {\n vec3 Xp_Y_XYZp = value.rgb * cLogLuvM;\n Xp_Y_XYZp = max(Xp_Y_XYZp, vec3(1e-6, 1e-6, 1e-6));\n vec4 vResult;\n vResult.xy = Xp_Y_XYZp.xy / Xp_Y_XYZp.z;\n float Le = 2.0 * log2(Xp_Y_XYZp.y) + 127.0;\n vResult.w = fract(Le);\n vResult.z = (Le - (floor(vResult.w*255.0))/255.0)/255.0;\n return vResult;\n}\n\n// Inverse M matrix, for decoding\nconst mat3 cLogLuvInverseM = mat3( 6.0014, -2.7008, -1.7996, -1.3320, 3.1029, -5.7721, 0.3008, -1.0882, 5.6268 );\nvec4 LogLuvToLinear( in vec4 value ) {\n float Le = value.z * 255.0 + value.w;\n vec3 Xp_Y_XYZp;\n Xp_Y_XYZp.y = exp2((Le - 127.0) / 2.0);\n Xp_Y_XYZp.z = Xp_Y_XYZp.y / value.y;\n Xp_Y_XYZp.x = value.x * Xp_Y_XYZp.z;\n vec3 vRGB = Xp_Y_XYZp.rgb * cLogLuvInverseM;\n return vec4( max(vRGB, 0.0), 1.0 );\n}\n";
    const envmap_fragment = "#ifdef USE_ENVMAP\n\n #if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\n  vec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );\n\n  // Transforming Normal Vectors with the Inverse Transformation\n  vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\n  #ifdef ENVMAP_MODE_REFLECTION\n\n   vec3 reflectVec = reflect( cameraToVertex, worldNormal );\n\n  #else\n\n   vec3 reflectVec = refract( cameraToVertex, worldNormal, refractionRatio );\n\n  #endif\n\n #else\n\n  vec3 reflectVec = vReflect;\n\n #endif\n\n #ifdef ENVMAP_TYPE_CUBE\n\n  vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\n #elif defined( ENVMAP_TYPE_EQUIREC )\n\n  vec2 sampleUV;\n\n  reflectVec = normalize( reflectVec );\n\n  sampleUV.y = asin( clamp( reflectVec.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\n  sampleUV.x = atan( reflectVec.z, reflectVec.x ) * RECIPROCAL_PI2 + 0.5;\n\n  vec4 envColor = texture2D( envMap, sampleUV );\n\n #elif defined( ENVMAP_TYPE_SPHERE )\n\n  reflectVec = normalize( reflectVec );\n\n  vec3 reflectView = normalize( ( viewMatrix * vec4( reflectVec, 0.0 ) ).xyz + vec3( 0.0, 0.0, 1.0 ) );\n\n  vec4 envColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5 );\n\n #else\n\n  vec4 envColor = vec4( 0.0 );\n\n #endif\n\n envColor = envMapTexelToLinear( envColor );\n\n #ifdef ENVMAP_BLENDING_MULTIPLY\n\n  outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n\n #elif defined( ENVMAP_BLENDING_MIX )\n\n  outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n\n #elif defined( ENVMAP_BLENDING_ADD )\n\n  outgoingLight += envColor.xyz * specularStrength * reflectivity;\n\n #endif\n\n#endif\n";
    const envmap_pars_fragment = "#if defined( USE_ENVMAP ) || defined( PHYSICAL )\n uniform float reflectivity;\n uniform float envMapIntensity;\n#endif\n\n#ifdef USE_ENVMAP\n\n #if ! defined( PHYSICAL ) && ( defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) )\n  varying vec3 vWorldPosition;\n #endif\n\n #ifdef ENVMAP_TYPE_CUBE\n  uniform samplerCube envMap;\n #else\n  uniform sampler2D envMap;\n #endif\n uniform float flipEnvMap;\n uniform int maxMipLevel;\n\n #if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( PHYSICAL )\n  uniform float refractionRatio;\n #else\n  varying vec3 vReflect;\n #endif\n\n#endif\n";
    const envmap_pars_vertex = "#ifdef USE_ENVMAP\n\n #if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n  varying vec3 vWorldPosition;\n\n #else\n\n  varying vec3 vReflect;\n  uniform float refractionRatio;\n\n #endif\n\n#endif\n";
    const envmap_physical_pars_fragment = "#if defined( USE_ENVMAP ) && defined( PHYSICAL )\n\n vec3 getLightProbeIndirectIrradiance( /*const in SpecularLightProbe specularLightProbe,*/ const in GeometricContext geometry, const in int maxMIPLevel ) {\n\n  vec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );\n\n  #ifdef ENVMAP_TYPE_CUBE\n\n   vec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );\n\n   // TODO: replace with properly filtered cubemaps and access the irradiance LOD level, be it the last LOD level\n   // of a specular cubemap, or just the default level of a specially created irradiance cubemap.\n\n   #ifdef TEXTURE_LOD_EXT\n\n    vec4 envMapColor = textureCubeLodEXT( envMap, queryVec, float( maxMIPLevel ) );\n\n   #else\n\n    // force the bias high to get the last LOD level as it is the most blurred.\n    vec4 envMapColor = textureCube( envMap, queryVec, float( maxMIPLevel ) );\n\n   #endif\n\n   envMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\n  #elif defined( ENVMAP_TYPE_CUBE_UV )\n\n   vec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );\n   vec4 envMapColor = textureCubeUV( envMap, queryVec, 1.0 );\n\n  #else\n\n   vec4 envMapColor = vec4( 0.0 );\n\n  #endif\n\n  return PI * envMapColor.rgb * envMapIntensity;\n\n }\n\n // taken from here: http://casual-effects.blogspot.ca/2011/08/plausible-environment-lighting-in-two.html\n float getSpecularMIPLevel( const in float blinnShininessExponent, const in int maxMIPLevel ) {\n\n  //float envMapWidth = pow( 2.0, maxMIPLevelScalar );\n  //float desiredMIPLevel = log2( envMapWidth * sqrt( 3.0 ) ) - 0.5 * log2( pow2( blinnShininessExponent ) + 1.0 );\n\n  float maxMIPLevelScalar = float( maxMIPLevel );\n  float desiredMIPLevel = maxMIPLevelScalar + 0.79248 - 0.5 * log2( pow2( blinnShininessExponent ) + 1.0 );\n\n  // clamp to allowable LOD ranges.\n  return clamp( desiredMIPLevel, 0.0, maxMIPLevelScalar );\n\n }\n\n vec3 getLightProbeIndirectRadiance( /*const in SpecularLightProbe specularLightProbe,*/ const in GeometricContext geometry, const in float blinnShininessExponent, const in int maxMIPLevel ) {\n\n  #ifdef ENVMAP_MODE_REFLECTION\n\n   vec3 reflectVec = reflect( -geometry.viewDir, geometry.normal );\n\n  #else\n\n   vec3 reflectVec = refract( -geometry.viewDir, geometry.normal, refractionRatio );\n\n  #endif\n\n  reflectVec = inverseTransformDirection( reflectVec, viewMatrix );\n\n  float specularMIPLevel = getSpecularMIPLevel( blinnShininessExponent, maxMIPLevel );\n\n  #ifdef ENVMAP_TYPE_CUBE\n\n   vec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );\n\n   #ifdef TEXTURE_LOD_EXT\n\n    vec4 envMapColor = textureCubeLodEXT( envMap, queryReflectVec, specularMIPLevel );\n\n   #else\n\n    vec4 envMapColor = textureCube( envMap, queryReflectVec, specularMIPLevel );\n\n   #endif\n\n   envMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\n  #elif defined( ENVMAP_TYPE_CUBE_UV )\n\n   vec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );\n   vec4 envMapColor = textureCubeUV( envMap, queryReflectVec, BlinnExponentToGGXRoughness(blinnShininessExponent ));\n\n  #elif defined( ENVMAP_TYPE_EQUIREC )\n\n   vec2 sampleUV;\n   sampleUV.y = asin( clamp( reflectVec.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n   sampleUV.x = atan( reflectVec.z, reflectVec.x ) * RECIPROCAL_PI2 + 0.5;\n\n   #ifdef TEXTURE_LOD_EXT\n\n    vec4 envMapColor = texture2DLodEXT( envMap, sampleUV, specularMIPLevel );\n\n   #else\n\n    vec4 envMapColor = texture2D( envMap, sampleUV, specularMIPLevel );\n\n   #endif\n\n   envMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\n  #elif defined( ENVMAP_TYPE_SPHERE )\n\n   vec3 reflectView = normalize( ( viewMatrix * vec4( reflectVec, 0.0 ) ).xyz + vec3( 0.0,0.0,1.0 ) );\n\n   #ifdef TEXTURE_LOD_EXT\n\n    vec4 envMapColor = texture2DLodEXT( envMap, reflectView.xy * 0.5 + 0.5, specularMIPLevel );\n\n   #else\n\n    vec4 envMapColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5, specularMIPLevel );\n\n   #endif\n\n   envMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\n  #endif\n\n  return envMapColor.rgb * envMapIntensity;\n\n }\n\n#endif\n";
    const envmap_vertex = "#ifdef USE_ENVMAP\n\n #if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\n  vWorldPosition = worldPosition.xyz;\n\n #else\n\n  vec3 cameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n\n  vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\n  #ifdef ENVMAP_MODE_REFLECTION\n\n   vReflect = reflect( cameraToVertex, worldNormal );\n\n  #else\n\n   vReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n\n  #endif\n\n #endif\n\n#endif\n";
    const fog_fragment = "#ifdef USE_FOG\n\n float fogDepth = length( vFogPosition );\n\n #ifdef FOG_EXP2\n\n  float fogFactor = whiteCompliment( exp2( - fogDensity * fogDensity * fogDepth * fogDepth * LOG2 ) );\n\n #else\n\n  float fogFactor = smoothstep( fogNear, fogFar, fogDepth );\n\n #endif\n\n gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n\n#endif\n";
    const fog_pars_fragment = "#ifdef USE_FOG\n\n uniform vec3 fogColor;\n varying vec3 vFogPosition;\n\n #ifdef FOG_EXP2\n\n  uniform float fogDensity;\n\n #else\n\n  uniform float fogNear;\n  uniform float fogFar;\n\n #endif\n\n#endif\n";
    const fog_pars_vertex = "#ifdef USE_FOG\n\n varying vec3 vFogPosition;\n\n#endif\n";
    const fog_vertex = "#ifdef USE_FOG\n\n vFogPosition = mvPosition.xyz;\n\n#endif\n";
    const gradientmap_pars_fragment = "#ifdef TOON\n\n uniform sampler2D gradientMap;\n\n vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {\n\n  // dotNL will be from -1.0 to 1.0\n  float dotNL = dot( normal, lightDirection );\n  vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );\n\n  #ifdef USE_GRADIENTMAP\n\n   return texture2D( gradientMap, coord ).rgb;\n\n  #else\n\n   return ( coord.x < 0.7 ) ? vec3( 0.7 ) : vec3( 1.0 );\n\n  #endif\n\n\n }\n\n#endif\n";
    const lightmap_fragment = "#ifdef USE_LIGHTMAP\n\n reflectedLight.indirectDiffuse += PI * texture2D( lightMap, vUv2 ).xyz * lightMapIntensity; // factor of PI should not be present; included here to prevent breakage\n\n#endif\n";
    const lightmap_pars_fragment = "#ifdef USE_LIGHTMAP\n\n uniform sampler2D lightMap;\n uniform float lightMapIntensity;\n\n#endif";
    const lights_fragment_begin = "/**\n * This is a template that can be used to light a material, it uses pluggable\n * RenderEquations (RE)for specific lighting scenarios.\n *\n * Instructions for use:\n * - Ensure that both RE_Direct, RE_IndirectDiffuse and RE_IndirectSpecular are defined\n * - If you have defined an RE_IndirectSpecular, you need to also provide a Material_LightProbeLOD. <---- ???\n * - Create a material parameter that is to be passed as the third parameter to your lighting functions.\n *\n * TODO:\n * - Add area light support.\n * - Add sphere light support.\n * - Add diffuse light probe (irradiance cubemap) support.\n */\n\nGeometricContext geometry;\n\ngeometry.position = - vViewPosition;\ngeometry.normal = normal;\ngeometry.viewDir = normalize( vViewPosition );\n\nIncidentLight directLight;\n\n#if (defined(NUM_POINT_LIGHTS) && NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n\n PointLight pointLight;\n\n // #pragma unroll_loop\n for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\n  // pointLight = pointLights[ i ];\n  pointLight.position = vec3(pointLights[i* 15 + 0], pointLights[i * 15 + 1], pointLights[i * 15 + 2]);\n  pointLight.color = vec3(pointLights[i* 15 + 3], pointLights[i * 15 + 4], pointLights[i * 15 + 5]);\n  pointLight.distance = pointLights[i * 15 + 6];\n  pointLight.decay = pointLights[i * 15 + 7];\n\n  getPointDirectLightIrradiance( pointLight, geometry, directLight );\n\n  #ifdef USE_SHADOWMAP\n  directLight.color *= all( bvec2( pointLight.shadow, directLight.visible ) ) ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n  #endif\n\n  RE_Direct( directLight, geometry, material, reflectedLight );\n\n }\n\n#endif\n\n#if (defined(NUM_SPOT_LIGHTS) && NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n\n SpotLight spotLight;\n\n // #pragma unroll_loop\n for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\n  // spotLight = spotLights[ i ];\n  spotLight.position = vec3(spotLights[i * 18 + 0], spotLights[i * 18 + 1], spotLights[i * 18 + 2]);\n  spotLight.direction = vec3(spotLights[i * 18 + 3], spotLights[i * 18 + 4], spotLights[i * 18 + 5]);\n  spotLight.color = vec3(spotLights[i * 18 + 6], spotLights[i * 18 + 7], spotLights[i * 18 + 8]);\n  spotLight.distance = spotLights[i * 18 + 9];\n  spotLight.decay = spotLights[i * 18 + 10];\n  spotLight.coneCos = spotLights[i * 18 + 11];\n  spotLight.penumbraCos = spotLights[i * 18 + 12];\n  getSpotDirectLightIrradiance( spotLight, geometry, directLight );\n\n  #ifdef USE_SHADOWMAP\n  directLight.color *= all( bvec2( spotLight.shadow, directLight.visible ) ) ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n  #endif\n\n  RE_Direct( directLight, geometry, material, reflectedLight );\n\n }\n\n#endif\n\n#if (defined(NUM_DIR_LIGHTS) && NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n\n DirectionalLight directionalLight;\n\n // #pragma unroll_loop\n for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\n  // directionalLight = directionalLights[ i ];\n  directionalLight.direction = vec3(directionalLights[i * 12 + 0], directionalLights[i * 12 + 1], directionalLights[i * 12 + 2]);\n  directionalLight.color = vec3(directionalLights[i * 12 + 3], directionalLights[i * 12 + 4], directionalLights[i * 12 + 5]);\n  getDirectionalDirectLightIrradiance( directionalLight, geometry, directLight );\n\n  #ifdef USE_SHADOWMAP\n  directLight.color *= all( bvec2( directionalLight.shadow, directLight.visible ) ) ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n  #endif\n\n  RE_Direct( directLight, geometry, material, reflectedLight );\n\n }\n\n#endif\n\n#if (defined(NUM_RECT_AREA_LIGHTS) &&  NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n\n RectAreaLight rectAreaLight;\n\n // #pragma unroll_loop\n for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n\n  rectAreaLight = rectAreaLights[ i ];\n  RE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );\n\n }\n\n#endif\n\n#if defined( RE_IndirectDiffuse )\n\n vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n\n #if (defined(NUM_HEMI_LIGHTS) &&  NUM_HEMI_LIGHTS > 0 )\n\n  // #pragma unroll_loop\n  for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\n   irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\n  }\n\n #endif\n\n#endif\n\n#if defined( RE_IndirectSpecular )\n\n vec3 radiance = vec3( 0.0 );\n vec3 clearCoatRadiance = vec3( 0.0 );\n\n#endif\n";
    const lights_fragment_end = "#if defined( RE_IndirectDiffuse )\n\n RE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );\n\n#endif\n\n#if defined( RE_IndirectSpecular )\n\n RE_IndirectSpecular( radiance, clearCoatRadiance, geometry, material, reflectedLight );\n\n#endif\n";
    const lights_fragment_maps = "#if defined( RE_IndirectDiffuse )\n\n #ifdef USE_LIGHTMAP\n\n  vec3 lightMapIrradiance = texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n\n  #ifndef PHYSICALLY_CORRECT_LIGHTS\n\n   lightMapIrradiance *= PI; // factor of PI should not be present; included here to prevent breakage\n\n  #endif\n\n  irradiance += lightMapIrradiance;\n\n #endif\n\n #if defined( USE_ENVMAP ) && defined( PHYSICAL ) && defined( ENVMAP_TYPE_CUBE_UV )\n\n  irradiance += getLightProbeIndirectIrradiance( /*lightProbe,*/ geometry, maxMipLevel );\n\n #endif\n\n#endif\n\n#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )\n\n radiance += getLightProbeIndirectRadiance( /*specularLightProbe,*/ geometry, Material_BlinnShininessExponent( material ), maxMipLevel );\n\n #ifndef STANDARD\n  clearCoatRadiance += getLightProbeIndirectRadiance( /*specularLightProbe,*/ geometry, Material_ClearCoat_BlinnShininessExponent( material ), maxMipLevel );\n #endif\n\n#endif\n";
    const lights_lambert_vertex = "vec3 diffuse = vec3( 1.0 );\n\nGeometricContext geometry;\ngeometry.position = mvPosition.xyz;\ngeometry.normal = normalize( transformedNormal );\ngeometry.viewDir = normalize( -mvPosition.xyz );\n\nGeometricContext backGeometry;\nbackGeometry.position = geometry.position;\nbackGeometry.normal = -geometry.normal;\nbackGeometry.viewDir = geometry.viewDir;\n\nvLightFront = vec3( 0.0 );\n\n#ifdef DOUBLE_SIDED\n vLightBack = vec3( 0.0 );\n#endif\n\nIncidentLight directLight;\nfloat dotNL;\nvec3 directLightColor_Diffuse;\n\n#if defined(NUM_POINT_LIGHTS) && NUM_POINT_LIGHTS > 0\n PointLight pointLight;\n // #pragma unroll_loop\n for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\n  pointLight.position = vec3(pointLights[i* 15 + 0], pointLights[i * 15 + 1], pointLights[i * 15 + 2]);\n  pointLight.color = vec3(pointLights[i* 15 + 3], pointLights[i * 15 + 4], pointLights[i * 15 + 5]);\n  pointLight.distance = pointLights[i * 15 + 6];\n  pointLight.decay = pointLights[i * 15 + 7];\n  getPointDirectLightIrradiance( pointLight, geometry, directLight );\n\n  dotNL = dot( geometry.normal, directLight.direction );\n  directLightColor_Diffuse = PI * directLight.color;\n\n  vLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\n  #ifdef DOUBLE_SIDED\n\n   vLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\n  #endif\n\n }\n\n#endif\n\n#if defined(NUM_SPOT_LIGHTS) && NUM_SPOT_LIGHTS > 0\n SpotLight spotLight;\n // #pragma unroll_loop\n for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n  spotLight.position = vec3(spotLights[i * 18 + 0], spotLights[i * 18 + 1], spotLights[i * 18 + 2]);\n  spotLight.direction = vec3(spotLights[i * 18 + 3], spotLights[i * 18 + 4], spotLights[i * 18 + 5]);\n  spotLight.color = vec3(spotLights[i * 18 + 6], spotLights[i * 18 + 7], spotLights[i * 18 + 8]);\n  spotLight.distance = spotLights[i * 18 + 9];\n  spotLight.decay = spotLights[i * 18 + 10];\n  spotLight.coneCos = spotLights[i * 18 + 11];\n  spotLight.penumbraCos = spotLights[i * 18 + 12];\n\n  getSpotDirectLightIrradiance( spotLight, geometry, directLight );\n\n  dotNL = dot( geometry.normal, directLight.direction );\n  directLightColor_Diffuse = PI * directLight.color;\n\n  vLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\n  #ifdef DOUBLE_SIDED\n\n   vLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\n  #endif\n }\n\n#endif\n\n/*\n#if NUM_RECT_AREA_LIGHTS > 0\n\n for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n\n  // TODO (abelnation): implement\n\n }\n\n#endif\n*/\n\n#if defined(NUM_DIR_LIGHTS) && NUM_DIR_LIGHTS > 0\n DirectionalLight directionalLight;\n // #pragma unroll_loop\n for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\n  directionalLight.direction = vec3(directionalLights[i * 12 + 0], directionalLights[i * 12 + 1], directionalLights[i * 12 + 2]);\n  directionalLight.color = vec3(directionalLights[i * 12 + 3], directionalLights[i * 12 + 4], directionalLights[i * 12 + 5]);\n  getDirectionalDirectLightIrradiance( directionalLight, geometry, directLight );\n\n  dotNL = dot( geometry.normal, directLight.direction );\n  directLightColor_Diffuse = PI * directLight.color;\n  // directLightColor_Diffuse = directLight.color;\n\n  vLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n  // vLightFront += directLightColor_Diffuse;\n\n  #ifdef DOUBLE_SIDED\n\n   vLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\n  #endif\n\n }\n\n#endif\n\n#if defined(NUM_HEMI_LIGHTS) && NUM_HEMI_LIGHTS > 0\n\n // #pragma unroll_loop\n for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\n  vLightFront += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\n  #ifdef DOUBLE_SIDED\n\n   vLightBack += getHemisphereLightIrradiance( hemisphereLights[ i ], backGeometry );\n\n  #endif\n\n }\n\n#endif\n";
    const lights_pars_begin = "uniform vec3 ambientLightColor;\n\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n\n vec3 irradiance = ambientLightColor;\n\n #ifndef PHYSICALLY_CORRECT_LIGHTS\n\n  irradiance *= PI;\n\n #endif\n\n return irradiance;\n\n}\n\n#if defined(NUM_DIR_LIGHTS) && NUM_DIR_LIGHTS > 0\n\n struct DirectionalLight {\n  vec3 direction;\n  vec3 color;\n\n  int shadow;\n  float shadowBias;\n  float shadowRadius;\n  vec2 shadowMapSize;\n };\n\n uniform float directionalLights[NUM_DIR_LIGHTS * 12];\n\n void getDirectionalDirectLightIrradiance( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n  directLight.direction = directionalLight.direction;\n  directLight.color = directionalLight.color;\n  directLight.visible = true;\n }\n\n#endif\n\n\n#if defined(NUM_POINT_LIGHTS) && NUM_POINT_LIGHTS > 0\n\n struct PointLight {\n  vec3 position;\n  vec3 color;\n  float distance;\n  float decay;\n\n  int shadow;\n  float shadowBias;\n  float shadowRadius;\n  vec2 shadowMapSize;\n  float shadowCameraNear;\n  float shadowCameraFar;\n };\n\n uniform float pointLights[NUM_POINT_LIGHTS * 15 ];\n\n // directLight is an out parameter as having it as a return value caused compiler errors on some devices\n void getPointDirectLightIrradiance( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\n  vec3 lVector = pointLight.position - geometry.position;\n  directLight.direction = normalize( lVector );\n\n  float lightDistance = length( lVector );\n\n  directLight.color = pointLight.color;\n  directLight.color *= punctualLightIntensityToIrradianceFactor( lightDistance, pointLight.distance, pointLight.decay );\n  directLight.visible = ( directLight.color != vec3( 0.0 ) );\n\n }\n\n#endif\n\n\n#if defined(NUM_SPOT_LIGHTS) && NUM_SPOT_LIGHTS > 0\n\n struct SpotLight {\n  vec3 position;\n  vec3 direction;\n  vec3 color;\n  float distance;\n  float decay;\n  float coneCos;\n  float penumbraCos;\n\n  int shadow;\n  float shadowBias;\n  float shadowRadius;\n  vec2 shadowMapSize;\n };\n\n uniform float spotLights[NUM_SPOT_LIGHTS * 18];\n\n // directLight is an out parameter as having it as a return value caused compiler errors on some devices\n void getSpotDirectLightIrradiance( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight directLight  ) {\n\n  vec3 lVector = spotLight.position - geometry.position;\n  directLight.direction = normalize( lVector );\n\n  float lightDistance = length( lVector );\n  float angleCos = dot( directLight.direction, spotLight.direction );\n\n  if ( angleCos > spotLight.coneCos ) {\n\n   float spotEffect = smoothstep( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n\n   directLight.color = spotLight.color;\n   directLight.color *= spotEffect * punctualLightIntensityToIrradianceFactor( lightDistance, spotLight.distance, spotLight.decay );\n   directLight.visible = true;\n\n  } else {\n\n   directLight.color = vec3( 0.0 );\n   directLight.visible = false;\n\n  }\n }\n\n#endif\n\n\n#if defined(NUM_RECT_AREA_LIGHTS) && NUM_RECT_AREA_LIGHTS > 0\n\n struct RectAreaLight {\n  vec3 color;\n  vec3 position;\n  vec3 halfWidth;\n  vec3 halfHeight;\n };\n\n // Pre-computed values of LinearTransformedCosine approximation of BRDF\n // BRDF approximation Texture is 64x64\n uniform sampler2D ltc_1; // RGBA Float\n uniform sampler2D ltc_2; // RGBA Float\n\n uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];\n\n#endif\n\n\n#if defined(NUM_HEMI_LIGHTS) && NUM_HEMI_LIGHTS > 0\n\n struct HemisphereLight {\n  vec3 direction;\n  vec3 skyColor;\n  vec3 groundColor;\n };\n\n uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];\n\n vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in GeometricContext geometry ) {\n\n  float dotNL = dot( geometry.normal, hemiLight.direction );\n  float hemiDiffuseWeight = 0.5 * dotNL + 0.5;\n\n  vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );\n\n  #ifndef PHYSICALLY_CORRECT_LIGHTS\n\n   irradiance *= PI;\n\n  #endif\n\n  return irradiance;\n\n }\n\n#endif\n";
    const lights_pars_maps = "#if defined( USE_ENVMAP ) && defined( PHYSICAL )\n\n vec3 getLightProbeIndirectIrradiance( /*const in SpecularLightProbe specularLightProbe,*/ const in GeometricContext geometry, const in int maxMIPLevel ) {\n\n  vec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );\n\n  #ifdef ENVMAP_TYPE_CUBE\n\n   vec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );\n\n   // TODO: replace with properly filtered cubemaps and access the irradiance LOD level, be it the last LOD level\n   // of a specular cubemap, or just the default level of a specially created irradiance cubemap.\n\n   #ifdef TEXTURE_LOD_EXT\n\n    vec4 envMapColor = textureCubeLodEXT( envMap, queryVec, float( maxMIPLevel ) );\n\n   #else\n\n    // force the bias high to get the last LOD level as it is the most blurred.\n    vec4 envMapColor = textureCube( envMap, queryVec, float( maxMIPLevel ) );\n\n   #endif\n\n   envMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\n  #elif defined( ENVMAP_TYPE_CUBE_UV )\n\n   vec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );\n   vec4 envMapColor = textureCubeUV( queryVec, 1.0 );\n\n  #else\n\n   vec4 envMapColor = vec4( 0.0 );\n\n  #endif\n\n  return PI * envMapColor.rgb * envMapIntensity;\n\n }\n\n // taken from here: http://casual-effects.blogspot.ca/2011/08/plausible-environment-lighting-in-two.html\n float getSpecularMIPLevel( const in float blinnShininessExponent, const in int maxMIPLevel ) {\n\n  //float envMapWidth = pow( 2.0, maxMIPLevelScalar );\n  //float desiredMIPLevel = log2( envMapWidth * sqrt( 3.0 ) ) - 0.5 * log2( pow2( blinnShininessExponent ) + 1.0 );\n\n  float maxMIPLevelScalar = float( maxMIPLevel );\n  float desiredMIPLevel = maxMIPLevelScalar + 0.79248 - 0.5 * log2( pow2( blinnShininessExponent ) + 1.0 );\n\n  // clamp to allowable LOD ranges.\n  return clamp( desiredMIPLevel, 0.0, maxMIPLevelScalar );\n\n }\n\n vec3 getLightProbeIndirectRadiance( /*const in SpecularLightProbe specularLightProbe,*/ const in GeometricContext geometry, const in float blinnShininessExponent, const in int maxMIPLevel ) {\n\n  #ifdef ENVMAP_MODE_REFLECTION\n\n   vec3 reflectVec = reflect( -geometry.viewDir, geometry.normal );\n\n  #else\n\n   vec3 reflectVec = refract( -geometry.viewDir, geometry.normal, refractionRatio );\n\n  #endif\n\n  reflectVec = inverseTransformDirection( reflectVec, viewMatrix );\n\n  float specularMIPLevel = getSpecularMIPLevel( blinnShininessExponent, maxMIPLevel );\n\n  #ifdef ENVMAP_TYPE_CUBE\n\n   vec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );\n\n   #ifdef TEXTURE_LOD_EXT\n\n    vec4 envMapColor = textureCubeLodEXT( envMap, queryReflectVec, specularMIPLevel );\n\n   #else\n\n    vec4 envMapColor = textureCube( envMap, queryReflectVec, specularMIPLevel );\n\n   #endif\n\n   envMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\n  #elif defined( ENVMAP_TYPE_CUBE_UV )\n\n   vec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );\n   vec4 envMapColor = textureCubeUV(queryReflectVec, BlinnExponentToGGXRoughness(blinnShininessExponent));\n\n  #elif defined( ENVMAP_TYPE_EQUIREC )\n\n   vec2 sampleUV;\n   sampleUV.y = asin( clamp( reflectVec.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n   sampleUV.x = atan( reflectVec.z, reflectVec.x ) * RECIPROCAL_PI2 + 0.5;\n\n   #ifdef TEXTURE_LOD_EXT\n\n    vec4 envMapColor = texture2DLodEXT( envMap, sampleUV, specularMIPLevel );\n\n   #else\n\n    vec4 envMapColor = texture2D( envMap, sampleUV, specularMIPLevel );\n\n   #endif\n\n   envMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\n  #elif defined( ENVMAP_TYPE_SPHERE )\n\n   vec3 reflectView = normalize( ( viewMatrix * vec4( reflectVec, 0.0 ) ).xyz + vec3( 0.0,0.0,1.0 ) );\n\n   #ifdef TEXTURE_LOD_EXT\n\n    vec4 envMapColor = texture2DLodEXT( envMap, reflectView.xy * 0.5 + 0.5, specularMIPLevel );\n\n   #else\n\n    vec4 envMapColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5, specularMIPLevel );\n\n   #endif\n\n   envMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\n  #endif\n\n  return envMapColor.rgb * envMapIntensity;\n\n }\n\n#endif\n";
    const lights_phong_fragment = "BlinnPhongMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;\n";
    const lights_phong_pars_fragment = "varying vec3 vViewPosition;\n\n#ifndef FLAT_SHADED\n\n varying vec3 vNormal;\n\n#endif\n\n\nstruct BlinnPhongMaterial {\n\n vec3 diffuseColor;\n vec3 specularColor;\n float specularShininess;\n float specularStrength;\n\n};\n\nvoid RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\n #ifdef TOON\n\n  vec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;\n\n #else\n\n  float dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n  vec3 irradiance = dotNL * directLight.color;\n\n #endif\n\n #ifndef PHYSICALLY_CORRECT_LIGHTS\n\n  irradiance *= PI; // punctual light\n\n #endif\n\n reflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\n reflectedLight.directSpecular += irradiance * BRDF_Specular_BlinnPhong( directLight, geometry, material.specularColor, material.specularShininess ) * material.specularStrength;\n\n}\n\nvoid RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\n reflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\n}\n\n#define RE_Direct    RE_Direct_BlinnPhong\n#define RE_IndirectDiffuse  RE_IndirectDiffuse_BlinnPhong\n\n#define Material_LightProbeLOD( material ) (0)\n";
    const lights_physical_fragment = "PhysicalMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );\nmaterial.specularRoughness = clamp( roughnessFactor, 0.04, 1.0 );\n#ifdef STANDARD\n material.specularColor = mix( vec3( DEFAULT_SPECULAR_COEFFICIENT ), diffuseColor.rgb, metalnessFactor );\n#else\n material.specularColor = mix( vec3( MAXIMUM_SPECULAR_COEFFICIENT * pow2( reflectivity ) ), diffuseColor.rgb, metalnessFactor );\n material.clearCoat = saturate( clearCoat ); // Burley clearcoat model\n material.clearCoatRoughness = clamp( clearCoatRoughness, 0.04, 1.0 );\n#endif\n";
    const lights_physical_pars_fragment = "struct PhysicalMaterial {\n\n vec3 diffuseColor;\n float specularRoughness;\n vec3 specularColor;\n\n #ifndef STANDARD\n  float clearCoat;\n  float clearCoatRoughness;\n #endif\n\n};\n\n#define MAXIMUM_SPECULAR_COEFFICIENT 0.16\n#define DEFAULT_SPECULAR_COEFFICIENT 0.04\n\n// Clear coat directional hemishperical reflectance (this approximation should be improved)\nfloat clearCoatDHRApprox( const in float roughness, const in float dotNL ) {\n\n return DEFAULT_SPECULAR_COEFFICIENT + ( 1.0 - DEFAULT_SPECULAR_COEFFICIENT ) * ( pow( 1.0 - dotNL, 5.0 ) * pow( 1.0 - roughness, 2.0 ) );\n\n}\n\n#if NUM_RECT_AREA_LIGHTS > 0\n\n void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\n  vec3 normal = geometry.normal;\n  vec3 viewDir = geometry.viewDir;\n  vec3 position = geometry.position;\n  vec3 lightPos = rectAreaLight.position;\n  vec3 halfWidth = rectAreaLight.halfWidth;\n  vec3 halfHeight = rectAreaLight.halfHeight;\n  vec3 lightColor = rectAreaLight.color;\n  float roughness = material.specularRoughness;\n\n  vec3 rectCoords[ 4 ];\n  rectCoords[ 0 ] = lightPos - halfWidth - halfHeight; // counterclockwise\n  rectCoords[ 1 ] = lightPos + halfWidth - halfHeight;\n  rectCoords[ 2 ] = lightPos + halfWidth + halfHeight;\n  rectCoords[ 3 ] = lightPos - halfWidth + halfHeight;\n\n  vec2 uv = LTC_Uv( normal, viewDir, roughness );\n\n  vec4 t1 = texture2D( ltc_1, uv );\n  vec4 t2 = texture2D( ltc_2, uv );\n\n  mat3 mInv = mat3(\n   vec3( t1.x, 0, t1.y ),\n   vec3(    0, 1,    0 ),\n   vec3( t1.z, 0, t1.w )\n  );\n\n  // LTC Fresnel Approximation by Stephen Hill\n  // http://blog.selfshadow.com/publications/s2016-advances/s2016_ltc_fresnel.pdf\n  vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );\n\n  reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );\n\n  reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );\n\n }\n\n#endif\n\nvoid RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\n float dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\n vec3 irradiance = dotNL * directLight.color;\n\n #ifndef PHYSICALLY_CORRECT_LIGHTS\n\n  irradiance *= PI; // punctual light\n\n #endif\n\n #ifndef STANDARD\n  float clearCoatDHR = material.clearCoat * clearCoatDHRApprox( material.clearCoatRoughness, dotNL );\n #else\n  float clearCoatDHR = 0.0;\n #endif\n\n reflectedLight.directSpecular += ( 1.0 - clearCoatDHR ) * irradiance * BRDF_Specular_GGX( directLight, geometry, material.specularColor, material.specularRoughness );\n\n reflectedLight.directDiffuse += ( 1.0 - clearCoatDHR ) * irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\n #ifndef STANDARD\n\n  reflectedLight.directSpecular += irradiance * material.clearCoat * BRDF_Specular_GGX( directLight, geometry, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearCoatRoughness );\n\n #endif\n\n}\n\nvoid RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\n reflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\n}\n\nvoid RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 clearCoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\n #ifndef STANDARD\n  float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n  float dotNL = dotNV;\n  float clearCoatDHR = material.clearCoat * clearCoatDHRApprox( material.clearCoatRoughness, dotNL );\n #else\n  float clearCoatDHR = 0.0;\n #endif\n\n reflectedLight.indirectSpecular += ( 1.0 - clearCoatDHR ) * radiance * BRDF_Specular_GGX_Environment( geometry, material.specularColor, material.specularRoughness );\n\n #ifndef STANDARD\n\n  reflectedLight.indirectSpecular += clearCoatRadiance * material.clearCoat * BRDF_Specular_GGX_Environment( geometry, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearCoatRoughness );\n\n #endif\n\n}\n\n#define RE_Direct    RE_Direct_Physical\n#define RE_Direct_RectArea  RE_Direct_RectArea_Physical\n#define RE_IndirectDiffuse  RE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular  RE_IndirectSpecular_Physical\n\n#define Material_BlinnShininessExponent( material )   GGXRoughnessToBlinnExponent( material.specularRoughness )\n#define Material_ClearCoat_BlinnShininessExponent( material )   GGXRoughnessToBlinnExponent( material.clearCoatRoughness )\n\n// ref: https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf\nfloat computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {\n\n return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );\n\n}\n";
    const logdepthbuf_fragment = "#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\n gl_FragDepthEXT = log2( vFragDepth ) * logDepthBufFC * 0.5;\n\n#endif";
    const logdepthbuf_pars_fragment = "#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\n uniform float logDepthBufFC;\n varying float vFragDepth;\n\n#endif\n";
    const logdepthbuf_pars_vertex = "#ifdef USE_LOGDEPTHBUF\n\n #ifdef USE_LOGDEPTHBUF_EXT\n\n  varying float vFragDepth;\n\n #else\n\n  uniform float logDepthBufFC;\n\n #endif\n\n#endif\n";
    const logdepthbuf_vertex = "#ifdef USE_LOGDEPTHBUF\n\n #ifdef USE_LOGDEPTHBUF_EXT\n\n  vFragDepth = 1.0 + gl_Position.w;\n\n #else\n\n  gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;\n\n  gl_Position.z *= gl_Position.w;\n\n #endif\n\n#endif\n";
    const map_fragment = "#ifdef USE_MAP\n\n vec4 texelColor = texture2D( map, vUv );\n\n // texelColor = mapTexelToLinear( texelColor );TODO\n diffuseColor *= texelColor;\n\n#endif\n";
    const map_pars_fragment = "#ifdef USE_MAP\n\n uniform sampler2D map;\n\n#endif\n";
    const map_particle_fragment = "#ifdef USE_MAP\n\n vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;\n vec4 mapTexel = texture2D( map, uv );\n diffuseColor *= mapTexelToLinear( mapTexel );\n\n#endif\n";
    const map_particle_pars_fragment = "#ifdef USE_MAP\n\n uniform mat3 uvTransform;\n uniform sampler2D map;\n\n#endif\n";
    const metalnessmap_fragment = "float metalnessFactor = metalness;\n\n#ifdef USE_METALNESSMAP\n\n vec4 texelMetalness = texture2D( metalnessMap, vUv );\n\n // reads channel B, compatible with a combined OcclusionRoughnessMetallic (RGB) texture\n metalnessFactor *= texelMetalness.b;\n\n#endif\n";
    const metalnessmap_pars_fragment = "#ifdef USE_METALNESSMAP\n\n uniform sampler2D metalnessMap;\n\n#endif";
    const morphnormal_vertex = "#ifdef USE_MORPHNORMALS\n\n objectNormal += ( morphNormal0 - normal ) * morphTargetInfluences[ 0 ];\n objectNormal += ( morphNormal1 - normal ) * morphTargetInfluences[ 1 ];\n objectNormal += ( morphNormal2 - normal ) * morphTargetInfluences[ 2 ];\n objectNormal += ( morphNormal3 - normal ) * morphTargetInfluences[ 3 ];\n\n#endif\n";
    const morphtarget_pars_vertex = "#ifdef USE_MORPHTARGETS\n\n #ifndef USE_MORPHNORMALS\n\n uniform float morphTargetInfluences[ 8 ];\n\n #else\n\n uniform float morphTargetInfluences[ 4 ];\n\n #endif\n\n#endif";
    const morphtarget_vertex = "#ifdef USE_MORPHTARGETS\n\n transformed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\n transformed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\n transformed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\n transformed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\n\n #ifndef USE_MORPHNORMALS\n\n transformed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\n transformed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\n transformed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\n transformed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\n\n #endif\n\n#endif\n";
    const normalmap_pars_fragment = "#ifdef USE_NORMALMAP\n\n uniform sampler2D normalMap;\n uniform vec2 normalScale;\n\n #ifdef OBJECTSPACE_NORMALMAP\n\n  uniform mat3 normalMatrix;\n\n #else\n\n  // Per-Pixel Tangent Space Normal Mapping\n  // http://hacksoflife.blogspot.ch/2009/11/per-pixel-tangent-space-normal-mapping.html\n\n  vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm ) {\n\n   // Workaround for Adreno 3XX dFd*( vec3 ) bug. See #9988\n\n   vec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );\n   vec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );\n   vec2 st0 = dFdx( vUv.st );\n   vec2 st1 = dFdy( vUv.st );\n\n   float scale = sign( st1.t * st0.s - st0.t * st1.s ); // we do not care about the magnitude\n\n   vec3 S = normalize( ( q0 * st1.t - q1 * st0.t ) * scale );\n   vec3 T = normalize( ( - q0 * st1.s + q1 * st0.s ) * scale );\n   vec3 N = normalize( surf_norm );\n   mat3 tsn = mat3( S, T, N );\n\n   vec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\n   mapN.xy *= normalScale;\n   mapN.xy *= ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\n   return normalize( tsn * mapN );\n\n  }\n\n #endif\n\n#endif\n";
    const normal_fragment_begin = "#ifdef FLAT_SHADED\n\n // Workaround for Adreno/Nexus5 not able able to do dFdx( vViewPosition ) ...\n\n vec3 fdx = vec3( dFdx( vViewPosition.x ), dFdx( vViewPosition.y ), dFdx( vViewPosition.z ) );\n vec3 fdy = vec3( dFdy( vViewPosition.x ), dFdy( vViewPosition.y ), dFdy( vViewPosition.z ) );\n vec3 normal = normalize( cross( fdx, fdy ) );\n\n#else\n\n vec3 normal = normalize( vNormal );\n\n #ifdef DOUBLE_SIDED\n\n  normal = normal * ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\n #endif\n\n#endif\n";
    const normal_fragment_maps = "#ifdef USE_NORMALMAP\n\n #ifdef OBJECTSPACE_NORMALMAP\n\n  normal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0; // overrides both flatShading and attribute normals\n\n  #ifdef FLIP_SIDED\n\n   normal = - normal;\n\n  #endif\n\n  #ifdef DOUBLE_SIDED\n\n   normal = normal * ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\n  #endif\n\n  normal = normalize( normalMatrix * normal );\n\n #else // tangent-space normal map\n\n  normal = perturbNormal2Arb( -vViewPosition, normal );\n\n #endif\n\n#elif defined( USE_BUMPMAP )\n\n normal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );\n\n#endif\n";
    const packing = "vec3 packNormalToRGB( const in vec3 normal ) {\n return normalize( normal ) * 0.5 + 0.5;\n}\n\nvec3 unpackRGBToNormal( const in vec3 rgb ) {\n return 2.0 * rgb.xyz - 1.0;\n}\n\nconst float PackUpscale = 256. / 255.; // fraction -> 0..1 (including 1)\nconst float UnpackDownscale = 255. / 256.; // 0..1 -> fraction (excluding 1)\n\nconst vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256.,  256. );\nconst vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );\n\nconst float ShiftRight8 = 1. / 256.;\n\nvec4 packDepthToRGBA( const in float v ) {\n vec4 r = vec4( fract( v * PackFactors ), v );\n r.yzw -= r.xyz * ShiftRight8; // tidy overflow\n return r * PackUpscale;\n}\n\nfloat unpackRGBAToDepth( const in vec4 v ) {\n return dot( v, UnpackFactors );\n}\n\n// NOTE: viewZ/eyeZ is < 0 when in front of the camera per OpenGL conventions\n\nfloat viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {\n return ( viewZ + near ) / ( near - far );\n}\nfloat orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {\n return linearClipZ * ( near - far ) - near;\n}\n\nfloat viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {\n return (( near + viewZ ) * far ) / (( far - near ) * viewZ );\n}\nfloat perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {\n return ( near * far ) / ( ( far - near ) * invClipZ - far );\n}\n";
    const particle_affector = "vec3 lifeVelocity = computeVelocity(t);\nvec4 worldRotation;\nif(u_simulationSpace==1)\n worldRotation=startWorldRotation;\nelse\n worldRotation=u_worldRotation;\nvec3 gravity=u_gravity*age;\n\nvec3 center=computePosition(startVelocity, lifeVelocity, age, t,gravity,worldRotation); \n#ifdef SPHERHBILLBOARD\n   vec2 corner=corner.xy;\n      vec3 cameraUpVector =normalize(cameraUp);\n      vec3 sideVector = normalize(cross(cameraForward,cameraUpVector));\n      vec3 upVector = normalize(cross(sideVector,cameraForward));\n     corner*=computeBillbardSize(startSize.xy,t);\n  #if defined(ROTATIONOVERLIFETIME)||defined(ROTATIONSEPERATE)\n   if(u_startRotation3D){\n    vec3 rotation=vec3(startRotation.xy,computeRotation(startRotation.z,age,t));\n    center += u_sizeScale.xzy*rotation_euler(corner.x*sideVector+corner.y*upVector,rotation);\n   }\n   else{\n    float rot = computeRotation(startRotation.x, age,t);\n    float c = cos(rot);\n    float s = sin(rot);\n    mat2 rotation= mat2(c, -s, s, c);\n    corner=rotation*corner;\n    center += u_sizeScale.xzy*(corner.x*sideVector+corner.y*upVector);\n   }\n  #else\n   if(u_startRotation3D){\n    center += u_sizeScale.xzy*rotation_euler(corner.x*sideVector+corner.y*upVector,startRotation);\n   }\n   else{\n    float c = cos(startRotation.x);\n    float s = sin(startRotation.x);\n    mat2 rotation= mat2(c, -s, s, c);\n    corner=rotation*corner;\n    center += u_sizeScale.xzy*(corner.x*sideVector+corner.y*upVector);\n   }\n  #endif\n #endif\n #ifdef STRETCHEDBILLBOARD\n  vec2 corner=corner.xy;\n  vec3 velocity;\n  #if defined(VELOCITYCONSTANT)||defined(VELOCITYCURVE)||defined(VELOCITYTWOCONSTANT)||defined(VELOCITYTWOCURVE)\n      if(u_spaceType==0)\n       velocity=rotation_quaternions(u_sizeScale*(startVelocity+lifeVelocity),worldRotation)+gravity;\n      else\n       velocity=rotation_quaternions(u_sizeScale*startVelocity,worldRotation)+lifeVelocity+gravity;\n   #else\n      velocity= rotation_quaternions(u_sizeScale*startVelocity,worldRotation)+gravity;\n   #endif \n  vec3 cameraUpVector = normalize(velocity);\n  vec3 direction = normalize(center-cameraPosition);\n    vec3 sideVector = normalize(cross(direction,normalize(velocity)));\n  sideVector=u_sizeScale.xzy*sideVector;\n  cameraUpVector=length(vec3(u_sizeScale.x,0.0,0.0))*cameraUpVector;\n    vec2 size=computeBillbardSize(startSize.xy,t);\n    const mat2 rotaionZHalfPI=mat2(0.0, -1.0, 1.0, 0.0);\n    corner=rotaionZHalfPI*corner;\n    corner.y=corner.y-abs(corner.y);\n    float speed=length(velocity);\n    center +=sign(u_sizeScale.x)*(sign(u_lengthScale)*size.x*corner.x*sideVector+(speed*u_speeaScale+size.y*u_lengthScale)*corner.y*cameraUpVector);\n #endif\n #ifdef HORIZONTALBILLBOARD\n  vec2 corner=corner.xy;\n    const vec3 cameraUpVector=vec3(0.0,0.0,1.0);\n    const vec3 sideVector = vec3(-1.0,0.0,0.0);\n  float rot = computeRotation(startRotation.x, age,t);\n    float c = cos(rot);\n    float s = sin(rot);\n    mat2 rotation= mat2(c, -s, s, c);\n    corner=rotation*corner;\n  corner*=computeBillbardSize(startSize.xy,t);\n    center +=u_sizeScale.xzy*(corner.x*sideVector+ corner.y*cameraUpVector);\n #endif\n #ifdef VERTICALBILLBOARD\n  vec2 corner=corner.xy;\n    const vec3 cameraUpVector =vec3(0.0,1.0,0.0);\n    vec3 sideVector = normalize(cross(cameraForward,cameraUpVector));\n  float rot = computeRotation(startRotation.x, age,t);\n    float c = cos(rot);\n    float s = sin(rot);\n    mat2 rotation= mat2(c, -s, s, c);\n    corner=rotation*corner;\n  corner*=computeBillbardSize(startSize.xy,t);\n    center +=u_sizeScale.xzy*(corner.x*sideVector+ corner.y*cameraUpVector);\n #endif\n #ifdef RENDERMESH\n    vec3 size=computeMeshSize(startSize,t);\n  #if defined(ROTATIONOVERLIFETIME)||defined(ROTATIONSEPERATE)\n    if(u_startRotation3D){\n     vec3 rotation=vec3(startRotation.xy,-computeRotation(startRotation.z, age,t));\n     center+= rotation_quaternions(u_sizeScale*rotation_euler(position*size,rotation),worldRotation);\n    }\n    else{\n     #ifdef ROTATIONOVERLIFETIME\n      float angle=computeRotation(startRotation.x, age,t);\n      if(startPosition.x>0.1 || startPosition.x < -0.1||startPosition.y>0.1 || startPosition.y < -0.1){\n       center+= (rotation_quaternions(rotation_axis(u_sizeScale*position*size,normalize(cross(vec3(0.0,0.0,1.0),vec3(startPosition.xy,0.0))),angle),worldRotation));//已验证\n      }\n      else{\n       #ifdef SHAPE\n        center+= u_sizeScale.xzy*(rotation_quaternions(rotation_axis(position*size,vec3(0.0,-1.0,0.0),angle),worldRotation));\n       #else\n        if(u_simulationSpace==1)\n         center+=rotation_axis(u_sizeScale*position*size,vec3(0.0,0.0,-1.0),angle);\n        else if(u_simulationSpace==0)\n         center+=rotation_quaternions(u_sizeScale*rotation_axis(position*size,vec3(0.0,0.0,-1.0),angle),worldRotation);\n       #endif\n      }\n     #endif\n     #ifdef ROTATIONSEPERATE\n      vec3 angle=compute3DRotation(vec3(0.0,0.0,startRotation.z), age,t);\n      center+= (rotation_quaternions(rotation_euler(u_sizeScale*position*size,vec3(angle.x,angle.y,angle.z)),worldRotation));\n     #endif \n    }\n  #else\n  if(u_startRotation3D){\n   center+= rotation_quaternions(u_sizeScale*rotation_euler(position*size,startRotation),worldRotation);\n  }\n  else{\n   if(startPosition.x>0.1 || startPosition.x < -0.1||startPosition.y>0.1 || startPosition.y < -0.1){\n    if(u_simulationSpace==1)\n     center+= rotation_axis(u_sizeScale*position*size,normalize(cross(vec3(0.0,0.0,1.0),vec3(startPosition.xy,0.0))),startRotation.x);\n    else if(u_simulationSpace==0)\n     center+= (rotation_quaternions(u_sizeScale*rotation_axis(position*size,normalize(cross(vec3(0.0,0.0,1.0),vec3(startPosition.xy,0.0))),startRotation.x),worldRotation));\n   }\n   else{\n    #ifdef SHAPE\n     if(u_simulationSpace==1)\n      center+= u_sizeScale*rotation_axis(position*size,vec3(0.0,-1.0,0.0),startRotation.x);\n     else if(u_simulationSpace==0)\n      center+= rotation_quaternions(u_sizeScale*rotation_axis(position*size,vec3(0.0,-1.0,0.0),startRotation.x),worldRotation); \n    #else\n     if(u_simulationSpace==1)\n      center+= rotation_axis(u_sizeScale*position*size,vec3(0.0,0.0,-1.0),startRotation.x);\n     else if(u_simulationSpace==0)\n      center+= rotation_quaternions(u_sizeScale*rotation_axis(position*size,vec3(0.0,0.0,-1.0),startRotation.x),worldRotation);\n    #endif\n   }\n  }\n  #endif\n  v_mesh_color=vec4(color, 1.0);\n  #endif";
    const particle_common = "\n\nuniform float u_currentTime;\nuniform vec3 u_gravity;\n\nuniform vec3 u_worldPosition;\nuniform vec4 u_worldRotation;\nuniform bool u_startRotation3D;\nuniform int u_scalingMode;\nuniform vec3 u_positionScale;\nuniform vec3 u_sizeScale;\nuniform mat4 viewProjectionMatrix;\n\nuniform vec3 cameraForward;\nuniform vec3 cameraUp;\n\nuniform float u_lengthScale;\nuniform float u_speeaScale;\nuniform int u_simulationSpace;\n\n#if defined(VELOCITYCONSTANT)||defined(VELOCITYCURVE)||defined(VELOCITYTWOCONSTANT)||defined(VELOCITYTWOCURVE)\n  uniform int u_spaceType;\n#endif\n#if defined(VELOCITYCONSTANT)||defined(VELOCITYTWOCONSTANT)\n  uniform vec3 u_velocityConst;\n#endif\n#if defined(VELOCITYCURVE)||defined(VELOCITYTWOCURVE)\n  uniform vec2 u_velocityCurveX[4];\n  uniform vec2 u_velocityCurveY[4];\n  uniform vec2 u_velocityCurveZ[4];\n#endif\n#ifdef VELOCITYTWOCONSTANT\n  uniform vec3 u_velocityConstMax;\n#endif\n#ifdef VELOCITYTWOCURVE\n  uniform vec2 u_velocityCurveMaxX[4];\n  uniform vec2 u_velocityCurveMaxY[4];\n  uniform vec2 u_velocityCurveMaxZ[4];\n#endif\n\n#ifdef COLOROGRADIENT\n  uniform vec4 u_colorGradient[4];\n  uniform vec2 u_alphaGradient[4];\n#endif\n#ifdef COLORTWOGRADIENTS\n  uniform vec4 u_colorGradient[4];\n  uniform vec2 u_alphaGradient[4];\n  uniform vec4 u_colorGradientMax[4];\n  uniform vec2 u_alphaGradientMax[4];\n#endif\n\n#if defined(SIZECURVE)||defined(SIZETWOCURVES)\n  uniform vec2 u_sizeCurve[4];\n#endif\n#ifdef SIZETWOCURVES\n  uniform vec2 u_sizeCurveMax[4];\n#endif\n#if defined(SIZECURVESEPERATE)||defined(SIZETWOCURVESSEPERATE)\n  uniform vec2 u_sizeCurveX[4];\n  uniform vec2 u_sizeCurveY[4];\n  uniform vec2 u_sizeCurveZ[4];\n#endif\n#ifdef SIZETWOCURVESSEPERATE\n  uniform vec2 u_sizeCurveMaxX[4];\n  uniform vec2 u_sizeCurveMaxY[4];\n  uniform vec2 u_sizeCurveMaxZ[4];\n#endif\n\n#ifdef ROTATIONOVERLIFETIME\n  #if defined(ROTATIONCONSTANT)||defined(ROTATIONTWOCONSTANTS)\n    uniform float u_rotationConst;\n  #endif\n  #ifdef ROTATIONTWOCONSTANTS\n    uniform float u_rotationConstMax;\n  #endif\n  #if defined(ROTATIONCURVE)||defined(ROTATIONTWOCURVES)\n    uniform vec2 u_rotationCurve[4];\n  #endif\n  #ifdef ROTATIONTWOCURVES\n    uniform vec2 u_rotationCurveMax[4];\n  #endif\n#endif\n#ifdef ROTATIONSEPERATE\n  #if defined(ROTATIONCONSTANT)||defined(ROTATIONTWOCONSTANTS)\n    uniform vec3 u_rotationConstSeprarate;\n  #endif\n  #ifdef ROTATIONTWOCONSTANTS\n    uniform vec3 u_rotationConstMaxSeprarate;\n  #endif\n  #if defined(ROTATIONCURVE)||defined(ROTATIONTWOCURVES)\n    uniform vec2 u_rotationCurveX[4];\n    uniform vec2 u_rotationCurveY[4];\n    uniform vec2 u_rotationCurveZ[4];\n  uniform vec2 u_rotationCurveW[4];\n  #endif\n  #ifdef ROTATIONTWOCURVES\n    uniform vec2 u_rotationCurveMaxX[4];\n    uniform vec2 u_rotationCurveMaxY[4];\n    uniform vec2 u_rotationCurveMaxZ[4];\n  uniform vec2 u_rotationCurveMaxW[4];\n  #endif\n#endif\n\n#if defined(TEXTURESHEETANIMATIONCURVE)||defined(TEXTURESHEETANIMATIONTWOCURVE)\n  uniform float u_cycles;\n  uniform vec4 u_subUV;\n  uniform vec2 u_uvCurve[4];\n#endif\n#ifdef TEXTURESHEETANIMATIONTWOCURVE\n  uniform vec2 u_uvCurveMax[4];\n#endif\n\nvarying float v_discard;\nvarying vec4 v_color;\nvarying vec2 v_texcoord;\n#ifdef RENDERMESH\n varying vec4 v_mesh_color;\n#endif\n\nvec3 rotation_euler(in vec3 vector,in vec3 euler)\n{\n  float halfPitch = euler.x * 0.5;\n float halfYaw = euler.y * 0.5;\n float halfRoll = euler.z * 0.5;\n\n float sinPitch = sin(halfPitch);\n float cosPitch = cos(halfPitch);\n float sinYaw = sin(halfYaw);\n float cosYaw = cos(halfYaw);\n float sinRoll = sin(halfRoll);\n float cosRoll = cos(halfRoll);\n\n float quaX = (cosYaw * sinPitch * cosRoll) + (sinYaw * cosPitch * sinRoll);\n float quaY = (sinYaw * cosPitch * cosRoll) - (cosYaw * sinPitch * sinRoll);\n float quaZ = (cosYaw * cosPitch * sinRoll) - (sinYaw * sinPitch * cosRoll);\n float quaW = (cosYaw * cosPitch * cosRoll) + (sinYaw * sinPitch * sinRoll);\n \n float x = quaX + quaX;\n  float y = quaY + quaY;\n  float z = quaZ + quaZ;\n  float wx = quaW * x;\n  float wy = quaW * y;\n  float wz = quaW * z;\n float xx = quaX * x;\n  float xy = quaX * y;\n float xz = quaX * z;\n  float yy = quaY * y;\n  float yz = quaY * z;\n  float zz = quaZ * z;\n\n  return vec3(((vector.x * ((1.0 - yy) - zz)) + (vector.y * (xy - wz))) + (vector.z * (xz + wy)),\n              ((vector.x * (xy + wz)) + (vector.y * ((1.0 - xx) - zz))) + (vector.z * (yz - wx)),\n              ((vector.x * (xz - wy)) + (vector.y * (yz + wx))) + (vector.z * ((1.0 - xx) - yy)));\n \n}\n\nvec3 rotation_axis(in vec3 vector,in vec3 axis, in float angle)\n{\n float halfAngle = angle * 0.5;\n float sin = sin(halfAngle);\n \n float quaX = axis.x * sin;\n float quaY = axis.y * sin;\n float quaZ = axis.z * sin;\n float quaW = cos(halfAngle);\n \n float x = quaX + quaX;\n  float y = quaY + quaY;\n  float z = quaZ + quaZ;\n  float wx = quaW * x;\n  float wy = quaW * y;\n  float wz = quaW * z;\n float xx = quaX * x;\n  float xy = quaX * y;\n float xz = quaX * z;\n  float yy = quaY * y;\n  float yz = quaY * z;\n  float zz = quaZ * z;\n\n  return vec3(((vector.x * ((1.0 - yy) - zz)) + (vector.y * (xy - wz))) + (vector.z * (xz + wy)),\n              ((vector.x * (xy + wz)) + (vector.y * ((1.0 - xx) - zz))) + (vector.z * (yz - wx)),\n              ((vector.x * (xz - wy)) + (vector.y * (yz + wx))) + (vector.z * ((1.0 - xx) - yy)));\n}\n\nvec3 rotation_quaternions(in vec3 v,in vec4 q) \n{\n return v + 2.0 * cross(q.xyz, cross(q.xyz, v) + q.w * v);\n}\n\n#if defined(VELOCITYCURVE)||defined(VELOCITYTWOCURVE)||defined(SIZECURVE)||defined(SIZECURVESEPERATE)||defined(SIZETWOCURVES)||defined(SIZETWOCURVESSEPERATE)\nfloat evaluate_curve_float(in vec2 curves[4],in float t)\n{\n float res;\n for(int i=1;i<4;i++)\n {\n  vec2 curve=curves[i];\n  float curTime=curve.x;\n  if(curTime>=t)\n  {\n   vec2 lastCurve=curves[i-1];\n   float lastTime=lastCurve.x;\n   float tt=(t-lastTime)/(curTime-lastTime);\n   res=mix(lastCurve.y,curve.y,tt);\n   break;\n  }\n }\n return res;\n}\n#endif\n\n#if defined(VELOCITYCURVE)||defined(VELOCITYTWOCURVE)||defined(ROTATIONCURVE)||defined(ROTATIONTWOCURVES)\nfloat evaluate_curve_total(in vec2 curves[4],in float t)\n{\n float res=0.0;\n for(int i=1;i<4;i++)\n {\n  vec2 curve=curves[i];\n  float curTime=curve.x;\n  vec2 lastCurve=curves[i-1];\n  float lastValue=lastCurve.y;\n  \n  if(curTime>=t){\n   float lastTime=lastCurve.x;\n   float tt=(t-lastTime)/(curTime-lastTime);\n   res+=(lastValue+mix(lastValue,curve.y,tt))/2.0*time.x*(t-lastTime);\n   break;\n  }\n  else{\n   res+=(lastValue+curve.y)/2.0*time.x*(curTime-lastCurve.x);\n  }\n }\n return res;\n}\n#endif\n\n#if defined(COLOROGRADIENT)||defined(COLORTWOGRADIENTS)\nvec4 evaluate_curve_color(in vec2 gradientAlphas[4],in vec4 gradientColors[4],in float t)\n{\n vec4 overTimeColor;\n for(int i=1;i<4;i++)\n {\n  vec2 gradientAlpha=gradientAlphas[i];\n  float alphaKey=gradientAlpha.x;\n  if(alphaKey>=t)\n  {\n   vec2 lastGradientAlpha=gradientAlphas[i-1];\n   float lastAlphaKey=lastGradientAlpha.x;\n   float age=(t-lastAlphaKey)/(alphaKey-lastAlphaKey);\n   overTimeColor.a=mix(lastGradientAlpha.y,gradientAlpha.y,age);\n   break;\n  }\n }\n \n for(int i=1;i<4;i++)\n {\n  vec4 gradientColor=gradientColors[i];\n  float colorKey=gradientColor.x;\n  if(colorKey>=t)\n  {\n   vec4 lastGradientColor=gradientColors[i-1];\n   float lastColorKey=lastGradientColor.x;\n   float age=(t-lastColorKey)/(colorKey-lastColorKey);\n   overTimeColor.rgb=mix(gradientColors[i-1].yzw,gradientColor.yzw,age);\n   break;\n  }\n }\n return overTimeColor;\n}\n#endif\n\n\n#if defined(TEXTURESHEETANIMATIONCURVE)||defined(TEXTURESHEETANIMATIONTWOCURVE)\nfloat evaluate_curve_frame(in vec2 gradientFrames[4],in float t)\n{\n float overTimeFrame;\n for(int i=1;i<4;i++)\n {\n  vec2 gradientFrame=gradientFrames[i];\n  float key=gradientFrame.x;\n  if(key>=t)\n  {\n   vec2 lastGradientFrame=gradientFrames[i-1];\n   float lastKey=lastGradientFrame.x;\n   float age=(t-lastKey)/(key-lastKey);\n   overTimeFrame=mix(lastGradientFrame.y,gradientFrame.y,age);\n   break;\n  }\n }\n return floor(overTimeFrame);\n}\n#endif\n\nvec3 computeVelocity(in float t)\n{\n  vec3 res;\n  #ifdef VELOCITYCONSTANT\n  res=u_velocityConst; \n  #endif\n  #ifdef VELOCITYCURVE\n     res= vec3(evaluate_curve_float(u_velocityCurveX,t),evaluate_curve_float(u_velocityCurveY,t),evaluate_curve_float(u_velocityCurveZ,t));\n  #endif\n  #ifdef VELOCITYTWOCONSTANT\n  res=mix(u_velocityConst,u_velocityConstMax,vec3(random1.y,random1.z,random1.w)); \n  #endif\n  #ifdef VELOCITYTWOCURVE\n     res=vec3(mix(evaluate_curve_float(u_velocityCurveX,t),evaluate_curve_float(u_velocityCurveMaxX,t),random1.y),\n             mix(evaluate_curve_float(u_velocityCurveY,t),evaluate_curve_float(u_velocityCurveMaxY,t),random1.z),\n        mix(evaluate_curve_float(u_velocityCurveZ,t),evaluate_curve_float(u_velocityCurveMaxZ,t),random1.w));\n  #endif\n     \n  return res;\n} \n\nvec3 computePosition(in vec3 startVelocity, in vec3 lifeVelocity,in float age,in float t,vec3 gravityVelocity,vec4 worldRotation)\n{\n    vec3 startPosition;\n    vec3 lifePosition;\n  #if defined(VELOCITYCONSTANT)||defined(VELOCITYCURVE)||defined(VELOCITYTWOCONSTANT)||defined(VELOCITYTWOCURVE)\n   #ifdef VELOCITYCONSTANT\n      startPosition=startVelocity*age;\n      lifePosition=lifeVelocity*age;\n   #endif\n   #ifdef VELOCITYCURVE\n      startPosition=startVelocity*age;\n      lifePosition=vec3(evaluate_curve_total(u_velocityCurveX,t),evaluate_curve_total(u_velocityCurveY,t),evaluate_curve_total(u_velocityCurveZ,t));\n   #endif\n   #ifdef VELOCITYTWOCONSTANT\n      startPosition=startVelocity*age;\n      lifePosition=lifeVelocity*age;\n   #endif\n   #ifdef VELOCITYTWOCURVE\n      startPosition=startVelocity*age;\n      lifePosition=vec3(mix(evaluate_curve_total(u_velocityCurveX,t),evaluate_curve_total(u_velocityCurveMaxX,t),random1.y)\n                 ,mix(evaluate_curve_total(u_velocityCurveY,t),evaluate_curve_total(u_velocityCurveMaxY,t),random1.z)\n                 ,mix(evaluate_curve_total(u_velocityCurveZ,t),evaluate_curve_total(u_velocityCurveMaxZ,t),random1.w));\n   #endif\n\n   vec3 finalPosition;\n   if(u_spaceType==0){\n     if(u_scalingMode!=2)\n      finalPosition =rotation_quaternions(u_positionScale*(startPosition.xyz+startPosition+lifePosition),worldRotation);\n     else\n      finalPosition =rotation_quaternions(u_positionScale*startPosition.xyz+startPosition+lifePosition,worldRotation);\n   }\n   else{\n     if(u_scalingMode!=2)\n       finalPosition = rotation_quaternions(u_positionScale*(startPosition.xyz+startPosition),worldRotation)+lifePosition;\n     else\n       finalPosition = rotation_quaternions(u_positionScale*startPosition.xyz+startPosition,worldRotation)+lifePosition;\n   }\n    #else\n    startPosition=startVelocity*age;\n    vec3 finalPosition;\n    if(u_scalingMode!=2)\n      finalPosition = rotation_quaternions(u_positionScale*(startPosition.xyz+startPosition),worldRotation);\n    else\n      finalPosition = rotation_quaternions(u_positionScale*startPosition.xyz+startPosition,worldRotation);\n  #endif\n  \n  if(u_simulationSpace==1)\n    finalPosition=finalPosition+startWorldPosition;\n  else if(u_simulationSpace==0) \n    finalPosition=finalPosition+u_worldPosition;\n  \n  finalPosition+=0.5*gravityVelocity*age;\n \n  return finalPosition;\n}\n\n\nvec4 computeColor(in vec4 color,in float t)\n{\n #ifdef COLOROGRADIENT\n   color*=evaluate_curve_color(u_alphaGradient,u_colorGradient,t);\n #endif \n #ifdef COLORTWOGRADIENTS\n   color*=mix(evaluate_curve_color(u_alphaGradient,u_colorGradient,t),evaluate_curve_color(u_alphaGradientMax,u_colorGradientMax,t),random0.y);\n #endif\n\n  return color;\n}\n\nvec2 computeBillbardSize(in vec2 size,in float t)\n{\n #ifdef SIZECURVE\n  size*=evaluate_curve_float(u_sizeCurve,t);\n #endif\n #ifdef SIZETWOCURVES\n   size*=mix(evaluate_curve_float(u_sizeCurve,t),evaluate_curve_float(u_sizeCurveMax,t),random0.z); \n #endif\n #ifdef SIZECURVESEPERATE\n  size*=vec2(evaluate_curve_float(u_sizeCurveX,t),evaluate_curve_float(u_sizeCurveY,t));\n #endif\n #ifdef SIZETWOCURVESSEPERATE\n   size*=vec2(mix(evaluate_curve_float(u_sizeCurveX,t),evaluate_curve_float(u_sizeCurveMaxX,t),random0.z)\n         ,mix(evaluate_curve_float(u_sizeCurveY,t),evaluate_curve_float(u_sizeCurveMaxY,t),random0.z));\n #endif\n return size;\n}\n\n#ifdef RENDERMESH\nvec3 computeMeshSize(in vec3 size,in float t)\n{\n #ifdef SIZECURVE\n  size*=evaluate_curve_float(u_sizeCurve,t);\n #endif\n #ifdef SIZETWOCURVES\n   size*=mix(evaluate_curve_float(u_sizeCurve,t),evaluate_curve_float(u_sizeCurveMax,t),random0.z); \n #endif\n #ifdef SIZECURVESEPERATE\n  size*=vec3(evaluate_curve_float(u_sizeCurveX,t),evaluate_curve_float(u_sizeCurveY,t),evaluate_curve_float(u_sizeCurveZ,t));\n #endif\n #ifdef SIZETWOCURVESSEPERATE\n   size*=vec3(mix(evaluate_curve_float(u_sizeCurveX,t),evaluate_curve_float(u_sizeCurveMaxX,t),random0.z)\n         ,mix(evaluate_curve_float(u_sizeCurveY,t),evaluate_curve_float(u_sizeCurveMaxY,t),random0.z)\n       ,mix(evaluate_curve_float(u_sizeCurveZ,t),evaluate_curve_float(u_sizeCurveMaxZ,t),random0.z));\n #endif\n return size;\n}\n#endif\n\nfloat computeRotation(in float rotation,in float age,in float t)\n{ \n #ifdef ROTATIONOVERLIFETIME\n  #ifdef ROTATIONCONSTANT\n   float ageRot=u_rotationConst*age;\n         rotation+=ageRot;\n  #endif\n  #ifdef ROTATIONCURVE\n   rotation+=evaluate_curve_total(u_rotationCurve,t);\n  #endif\n  #ifdef ROTATIONTWOCONSTANTS\n   float ageRot=mix(u_rotationConst,u_rotationConstMax,random0.w)*age;\n     rotation+=ageRot;\n   #endif\n  #ifdef ROTATIONTWOCURVES\n   rotation+=mix(evaluate_curve_total(u_rotationCurve,t),evaluate_curve_total(u_rotationCurveMax,t),random0.w);\n  #endif\n #endif\n #ifdef ROTATIONSEPERATE\n  #ifdef ROTATIONCONSTANT\n   float ageRot=u_rotationConstSeprarate.z*age;\n         rotation+=ageRot;\n  #endif\n  #ifdef ROTATIONCURVE\n   rotation+=evaluate_curve_total(u_rotationCurveZ,t);\n  #endif\n  #ifdef ROTATIONTWOCONSTANTS\n   float ageRot=mix(u_rotationConstSeprarate.z,u_rotationConstMaxSeprarate.z,random0.w)*age;\n         rotation+=ageRot;\n     #endif\n  #ifdef ROTATIONTWOCURVES\n   rotation+=mix(evaluate_curve_total(u_rotationCurveZ,t),evaluate_curve_total(u_rotationCurveMaxZ,t),random0.w));\n  #endif\n #endif\n return rotation;\n}\n\n#if defined(RENDERMESH)&&(defined(ROTATIONOVERLIFETIME)||defined(ROTATIONSEPERATE))\nvec3 compute3DRotation(in vec3 rotation,in float age,in float t)\n{ \n #ifdef ROTATIONOVERLIFETIME\n   #ifdef ROTATIONCONSTANT\n     float ageRot=u_rotationConst*age;\n       rotation+=ageRot;\n   #endif\n   #ifdef ROTATIONCURVE\n     rotation+=evaluate_curve_total(u_rotationCurve,t);\n   #endif\n   #ifdef ROTATIONTWOCONSTANTS\n     float ageRot=mix(u_rotationConst,u_rotationConstMax,random0.w)*age;\n       rotation+=ageRot;\n   #endif\n   #ifdef ROTATIONTWOCURVES\n     rotation+=mix(evaluate_curve_total(u_rotationCurve,t),evaluate_curve_total(u_rotationCurveMax,t),random0.w);\n   #endif\n #endif\n #ifdef ROTATIONSEPERATE\n    #ifdef ROTATIONCONSTANT\n     vec3 ageRot=u_rotationConstSeprarate*age;\n           rotation+=ageRot;\n    #endif\n    #ifdef ROTATIONCURVE\n     rotation+=vec3(evaluate_curve_total(u_rotationCurveX,t),evaluate_curve_total(u_rotationCurveY,t),evaluate_curve_total(u_rotationCurveZ,t));\n    #endif\n    #ifdef ROTATIONTWOCONSTANTS\n     vec3 ageRot=mix(u_rotationConstSeprarate,u_rotationConstMaxSeprarate,random0.w)*age;\n           rotation+=ageRot;\n     #endif\n    #ifdef ROTATIONTWOCURVES\n     rotation+=vec3(mix(evaluate_curve_total(u_rotationCurveX,t),evaluate_curve_total(u_rotationCurveMaxX,t),random0.w)\n           ,mix(evaluate_curve_total(u_rotationCurveY,t),evaluate_curve_total(u_rotationCurveMaxY,t),random0.w)\n           ,mix(evaluate_curve_total(u_rotationCurveZ,t),evaluate_curve_total(u_rotationCurveMaxZ,t),random0.w));\n    #endif\n #endif\n return rotation;\n}\n#endif\n\nvec2 computeUV(in vec2 uv,in float t)\n{ \n #ifdef TEXTURESHEETANIMATIONCURVE\n  float cycleNormalizedAge=t*u_cycles;\n  float uvNormalizedAge=cycleNormalizedAge-floor(cycleNormalizedAge);\n  float frame=evaluate_curve_frame(u_uvCurve,uvNormalizedAge);\n  uv.x *= u_subUV.x + u_subUV.z;\n  uv.y *= u_subUV.y + u_subUV.w;\n  float totalULength=frame*u_subUV.x;\n  float floorTotalULength=floor(totalULength);\n   uv.x+=totalULength-floorTotalULength;\n  uv.y+=floorTotalULength*u_subUV.y;\n    #endif\n #ifdef TEXTURESHEETANIMATIONTWOCURVE\n  float cycleNormalizedAge=t*u_cycles;\n  float uvNormalizedAge=cycleNormalizedAge-floor(cycleNormalizedAge);\n   float frame=floor(mix(evaluate_curve_frame(u_uvCurve,uvNormalizedAge),evaluate_curve_frame(u_uvCurveMax,uvNormalizedAge),random1.x));\n  uv.x *= u_subUV.x + u_subUV.z;\n  uv.y *= u_subUV.y + u_subUV.w;\n  float totalULength=frame*u_subUV.x;\n  float floorTotalULength=floor(totalULength);\n   uv.x+=totalULength-floorTotalULength;\n  uv.y+=floorTotalULength*u_subUV.y;\n    #endif\n return uv;\n}";
    const premultiplied_alpha_fragment = "#ifdef PREMULTIPLIED_ALPHA\n\n // Get get normal blending with premultipled, use with CustomBlending, OneFactor, OneMinusSrcAlphaFactor, AddEquation.\n gl_FragColor.rgb *= gl_FragColor.a;\n\n#endif\n";
    const project_vertex = "vec4 mvPosition = modelViewMatrix * vec4( transformed, 1.0 );\n\ngl_Position = projectionMatrix * mvPosition;\n";
    const roughnessmap_fragment = "float roughnessFactor = roughness;\n\n#ifdef USE_ROUGHNESSMAP\n\n vec4 texelRoughness = texture2D( roughnessMap, vUv );\n\n // reads channel G, compatible with a combined OcclusionRoughnessMetallic (RGB) texture\n roughnessFactor *= texelRoughness.g;\n\n#endif\n";
    const roughnessmap_pars_fragment = "#ifdef USE_ROUGHNESSMAP\n\n uniform sampler2D roughnessMap;\n\n#endif";
    const shadowmap_pars_fragment = "#ifdef USE_SHADOWMAP\n\n #if defined(NUM_DIR_LIGHTS) && NUM_DIR_LIGHTS > 0//Egret\n\n  uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHTS ];\n  varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHTS ];\n\n #endif\n\n #if defined(NUM_SPOT_LIGHTS) && NUM_SPOT_LIGHTS > 0//Egret\n\n  uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHTS ];\n  varying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHTS ];\n\n #endif\n\n #if defined(NUM_POINT_LIGHTS) && NUM_POINT_LIGHTS > 0//Egret\n\n  uniform sampler2D pointShadowMap[ NUM_POINT_LIGHTS ];\n  varying vec4 vPointShadowCoord[ NUM_POINT_LIGHTS ];\n\n #endif\n\n /*\n #if NUM_RECT_AREA_LIGHTS > 0\n\n  // TODO (abelnation): create uniforms for area light shadows\n\n #endif\n */\n\n float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {\n\n  return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );\n\n }\n\n float texture2DShadowLerp( sampler2D depths, vec2 size, vec2 uv, float compare ) {\n\n  const vec2 offset = vec2( 0.0, 1.0 );\n\n  vec2 texelSize = vec2( 1.0 ) / size;\n  vec2 centroidUV = floor( uv * size + 0.5 ) / size;\n\n  float lb = texture2DCompare( depths, centroidUV + texelSize * offset.xx, compare );\n  float lt = texture2DCompare( depths, centroidUV + texelSize * offset.xy, compare );\n  float rb = texture2DCompare( depths, centroidUV + texelSize * offset.yx, compare );\n  float rt = texture2DCompare( depths, centroidUV + texelSize * offset.yy, compare );\n\n  vec2 f = fract( uv * size + 0.5 );\n\n  float a = mix( lb, lt, f.y );\n  float b = mix( rb, rt, f.y );\n  float c = mix( a, b, f.x );\n\n  return c;\n\n }\n\n float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n\n  float shadow = 1.0;\n\n  shadowCoord.xyz /= shadowCoord.w;\n  shadowCoord.z += shadowBias;//Egret Right-hand\n\n  // if ( something && something ) breaks ATI OpenGL shader compiler\n  // if ( all( something, something ) ) using this instead\n\n  bvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\n  bool inFrustum = all( inFrustumVec );\n\n  bvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n\n  bool frustumTest = all( frustumTestVec );\n\n  if ( frustumTest ) {\n\n  #if defined( SHADOWMAP_TYPE_PCF )\n\n   vec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\n   float dx0 = - texelSize.x * shadowRadius;\n   float dy0 = - texelSize.y * shadowRadius;\n   float dx1 = + texelSize.x * shadowRadius;\n   float dy1 = + texelSize.y * shadowRadius;\n\n   shadow = (\n    texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n    texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n    texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n    texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n    texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +\n    texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n    texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n    texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n    texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n   ) * ( 1.0 / 9.0 );\n\n  #elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n\n   vec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\n   float dx0 = - texelSize.x * shadowRadius;\n   float dy0 = - texelSize.y * shadowRadius;\n   float dx1 = + texelSize.x * shadowRadius;\n   float dy1 = + texelSize.y * shadowRadius;\n\n   shadow = (\n    texture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n    texture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n    texture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n    texture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n    texture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy, shadowCoord.z ) +\n    texture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n    texture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n    texture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n    texture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n   ) * ( 1.0 / 9.0 );\n\n  #else // no percentage-closer filtering:\n\n   shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );\n\n  #endif\n\n  }\n\n  return shadow;\n\n }\n\n // cubeToUV() maps a 3D direction vector suitable for cube texture mapping to a 2D\n // vector suitable for 2D texture mapping. This code uses the following layout for the\n // 2D texture:\n //\n // xzXZ\n //  y Y\n //\n // Y - Positive y direction\n // y - Negative y direction\n // X - Positive x direction\n // x - Negative x direction\n // Z - Positive z direction\n // z - Negative z direction\n //\n // Source and test bed:\n // https://gist.github.com/tschw/da10c43c467ce8afd0c4\n\n vec2 cubeToUV( vec3 v, float texelSizeY ) {\n\n  // Number of texels to avoid at the edge of each square\n\n  vec3 absV = abs( v );\n\n  // Intersect unit cube\n\n  float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );\n  absV *= scaleToCube;\n\n  // Apply scale to avoid seams\n\n  // two texels less per square (one texel will do for NEAREST)\n  v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );\n\n  // Unwrap\n\n  // space: -1 ... 1 range for each square\n  //\n  // #X##  dim    := ( 4 , 2 )\n  //  # #  center := ( 1 , 1 )\n\n  vec2 planar = v.xy;\n\n  float almostATexel = 1.5 * texelSizeY;\n  float almostOne = 1.0 - almostATexel;\n\n  if ( absV.z >= almostOne ) {\n\n   if ( v.z > 0.0 )\n    planar.x = 4.0 - v.x;\n\n  } else if ( absV.x >= almostOne ) {\n\n   float signX = sign( v.x );\n   planar.x = v.z * signX + 2.0 * signX;\n\n  } else if ( absV.y >= almostOne ) {\n\n   float signY = sign( v.y );\n   planar.x = v.x + 2.0 * signY + 2.0;\n   planar.y = v.z * signY - 2.0;\n\n  }\n\n  // Transform to UV space\n\n  // scale := 0.5 / dim\n  // translate := ( center + 0.5 ) / dim\n  return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );\n\n }\n\n float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n\n  vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );\n\n  // for point lights, the uniform @vShadowCoord is re-purposed to hold\n  // the vector from the light to the world-space position of the fragment.\n  vec3 lightToPosition = shadowCoord.xyz;\n\n  // dp = normalized distance from light to fragment position\n  float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear ); // need to clamp?\n  dp += shadowBias;\n\n  // bd3D = base direction 3D\n  vec3 bd3D = normalize( lightToPosition );\n\n  #if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT )\n\n   vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;\n\n   return (\n    texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +\n    texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +\n    texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +\n    texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +\n    texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +\n    texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +\n    texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +\n    texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +\n    texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )\n   ) * ( 1.0 / 9.0 );\n\n  #else // no percentage-closer filtering\n\n   return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );\n\n  #endif\n\n }\n\n#endif\n";
    const shadowmap_pars_vertex = "#ifdef USE_SHADOWMAP\n\n #if defined(NUM_DIR_LIGHTS) && NUM_DIR_LIGHTS > 0//Egret\n\n  uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHTS ];\n  varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHTS ];\n\n #endif\n\n #if defined(NUM_SPOT_LIGHTS) && NUM_SPOT_LIGHTS > 0//Egret\n\n  uniform mat4 spotShadowMatrix[ NUM_SPOT_LIGHTS ];\n  varying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHTS ];\n\n #endif\n\n #if defined(NUM_POINT_LIGHTS) && NUM_POINT_LIGHTS > 0//Egret\n\n  uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHTS ];\n  varying vec4 vPointShadowCoord[ NUM_POINT_LIGHTS ];\n\n #endif\n\n /*\n #if NUM_RECT_AREA_LIGHTS > 0\n\n  // TODO (abelnation): uniforms for area light shadows\n\n #endif\n */\n\n#endif\n";
    const shadowmap_vertex = "#ifdef USE_SHADOWMAP\n\n #if defined(NUM_DIR_LIGHTS) && NUM_DIR_LIGHTS > 0//Egret\n\n // #pragma unroll_loop\n for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\n  vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * worldPosition;\n\n }\n\n #endif\n\n #if defined(NUM_SPOT_LIGHTS) && NUM_SPOT_LIGHTS > 0//Egret\n\n // #pragma unroll_loop\n for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\n  vSpotShadowCoord[ i ] = spotShadowMatrix[ i ] * worldPosition;\n\n }\n\n #endif\n\n #if defined(NUM_POINT_LIGHTS) && NUM_POINT_LIGHTS > 0//Egret\n\n // #pragma unroll_loop\n for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\n  vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * worldPosition;\n\n }\n\n #endif\n\n /*\n #if NUM_RECT_AREA_LIGHTS > 0\n\n  // TODO (abelnation): update vAreaShadowCoord with area light info\n\n #endif\n */\n\n#endif\n";
    const shadowmask_pars_fragment = "float getShadowMask() {\n\n float shadow = 1.0;\n\n #ifdef USE_SHADOWMAP\n\n #if defined(NUM_DIR_LIGHTS) && NUM_DIR_LIGHTS > 0//Egret\n\n DirectionalLight directionalLight;\n\n // #pragma unroll_loop\n for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\n  // directionalLight = directionalLights[ i ];\n  directionalLight.shadow = int(directionalLights[i * 12 + 6]);\n  directionalLight.shadowBias = directionalLights[i * 12 + 7];\n  directionalLight.shadowRadius = directionalLights[i * 12 + 8];\n  directionalLight.shadowMapSize = vec2(directionalLights[i * 12 + 9], directionalLights[i * 12 + 10]);\n  shadow *= bool( directionalLight.shadow ) ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\n }\n\n #endif\n\n #if defined(NUM_SPOT_LIGHTS) && NUM_SPOT_LIGHTS > 0//Egret\n\n SpotLight spotLight;\n // #pragma unroll_loop\n for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\n  // spotLight = spotLights[ i ];\n  spotLight.shadow = int(spotLights[i * 18 + 13]);\n  spotLight.shadowBias = spotLights[i * 18 + 14];\n  spotLight.shadowRadius = spotLights[i * 18 + 15];\n  spotLight.shadowMapSize = vec2(spotLights[i * 18 + 16], spotLights[i * 18 + 17]);\n  shadow *= bool(spotLight.shadow) ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\n }\n\n #endif\n\n #if defined(NUM_POINT_LIGHTS) && NUM_POINT_LIGHTS > 0//Egret\n\n PointLight pointLight;\n\n // #pragma unroll_loop\n for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\n  // pointLight = pointLights[ i ];\n  pointLight.shadow = int(pointLights[i * 15 + 8]);\n  pointLight.shadowBias = pointLights[i * 15 * 9];\n  pointLight.shadowRadius = pointLights[i * 15 * 10];\n  pointLight.shadowMapSize = vec2(pointLights[i * 15 * 11],pointLights[i * 15 * 12]);\n  pointLight.shadowCameraNear = pointLights[i * 15 * 13];\n  pointLight.shadowCameraFar = pointLights[i * 15 * 14];\n  shadow *= bool(pointLight.shadow) ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n\n }\n\n #endif\n\n /*\n #if NUM_RECT_AREA_LIGHTS > 0\n\n  // TODO (abelnation): update shadow for Area light\n\n #endif\n */\n\n #endif\n\n return shadow;\n\n}\n";
    const skinbase_vertex = "#ifdef USE_SKINNING\n\n mat4 boneMatX = getBoneMatrix( skinIndex.x );\n mat4 boneMatY = getBoneMatrix( skinIndex.y );\n mat4 boneMatZ = getBoneMatrix( skinIndex.z );\n mat4 boneMatW = getBoneMatrix( skinIndex.w );\n\n#endif";
    const skinning_pars_vertex = "#ifdef USE_SKINNING\n\n // Modify egret.\n // uniform_mat4 bindMatrix;\n // uniform_mat4 bindMatrixInverse;\n\n #ifdef BONE_TEXTURE\n\n  uniform sampler2D boneTexture;\n  uniform int boneTextureSize;\n\n  mat4 getBoneMatrix( const in float i ) {\n\n   float j = i * 4.0;\n   float x = mod( j, float( boneTextureSize ) );\n   float y = floor( j / float( boneTextureSize ) );\n\n   float dx = 1.0 / float( boneTextureSize );\n   float dy = 1.0 / float( boneTextureSize );\n\n   y = dy * ( y + 0.5 );\n\n   vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\n   vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\n   vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\n   vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\n\n   mat4 bone = mat4( v1, v2, v3, v4 );\n\n   return bone;\n\n  }\n\n #else\n\n  uniform mat4 boneMatrices[ MAX_BONES ];\n\n  mat4 getBoneMatrix( const in float i ) {\n\n   mat4 bone = boneMatrices[ int(i) ];\n   return bone;\n\n  }\n\n #endif\n\n#endif\n";
    const skinning_vertex = "#ifdef USE_SKINNING\n\n // Modify Egret.\n // vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );\n vec4 skinVertex = vec4( transformed, 1.0 );\n\n vec4 skinned = vec4( 0.0 );\n skinned += boneMatX * skinVertex * skinWeight.x;\n skinned += boneMatY * skinVertex * skinWeight.y;\n skinned += boneMatZ * skinVertex * skinWeight.z;\n skinned += boneMatW * skinVertex * skinWeight.w;\n\n // Modify Egret.\n // transformed = ( bindMatrixInverse * skinned ).xyz;\n transformed = skinned.xyz;\n\n#endif\n";
    const skinnormal_vertex = "#ifdef USE_SKINNING\n\n mat4 skinMatrix = mat4( 0.0 );\n skinMatrix += skinWeight.x * boneMatX;\n skinMatrix += skinWeight.y * boneMatY;\n skinMatrix += skinWeight.z * boneMatZ;\n skinMatrix += skinWeight.w * boneMatW;\n \n // Modify egret.\n // skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;\n\n objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n\n#endif\n";
    const specularmap_fragment = "float specularStrength;\n\n#ifdef USE_SPECULARMAP\n\n vec4 texelSpecular = texture2D( specularMap, vUv );\n specularStrength = texelSpecular.r;\n\n#else\n\n specularStrength = 1.0;\n\n#endif";
    const specularmap_pars_fragment = "#ifdef USE_SPECULARMAP\n\n uniform sampler2D specularMap;\n\n#endif";
    const tonemapping_fragment = "#if defined( TONE_MAPPING )\n\n  gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );\n\n#endif\n";
    const tonemapping_pars_fragment = "#ifndef saturate\n #define saturate(a) clamp( a, 0.0, 1.0 )\n#endif\n\nuniform float toneMappingExposure;\nuniform float toneMappingWhitePoint;\n\n// exposure only\nvec3 LinearToneMapping( vec3 color ) {\n\n return toneMappingExposure * color;\n\n}\n\n// source: https://www.cs.utah.edu/~reinhard/cdrom/\nvec3 ReinhardToneMapping( vec3 color ) {\n\n color *= toneMappingExposure;\n return saturate( color / ( vec3( 1.0 ) + color ) );\n\n}\n\n// source: http://filmicgames.com/archives/75\n#define Uncharted2Helper( x ) max( ( ( x * ( 0.15 * x + 0.10 * 0.50 ) + 0.20 * 0.02 ) / ( x * ( 0.15 * x + 0.50 ) + 0.20 * 0.30 ) ) - 0.02 / 0.30, vec3( 0.0 ) )\nvec3 Uncharted2ToneMapping( vec3 color ) {\n\n // John Hable's filmic operator from Uncharted 2 video game\n color *= toneMappingExposure;\n return saturate( Uncharted2Helper( color ) / Uncharted2Helper( vec3( toneMappingWhitePoint ) ) );\n\n}\n\n// source: http://filmicgames.com/archives/75\nvec3 OptimizedCineonToneMapping( vec3 color ) {\n\n // optimized filmic operator by Jim Hejl and Richard Burgess-Dawson\n color *= toneMappingExposure;\n color = max( vec3( 0.0 ), color - 0.004 );\n return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );\n\n}\n";
    const uv2_pars_fragment = "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\n varying vec2 vUv2;\n\n#endif";
    const uv2_pars_vertex = "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\n attribute vec2 uv2;\n varying vec2 vUv2;\n\n#endif";
    const uv2_vertex = "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\n vUv2 = uv2;\n\n#endif";
    const uv_pars_fragment = "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n\n varying vec2 vUv;\n\n#endif";
    const uv_pars_vertex = "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n\n varying vec2 vUv;\n uniform mat3 uvTransform;\n\n#endif\n";
    const uv_vertex = "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n #if defined FLIP_V \n  vUv = ( uvTransform * vec3( uv.x, 1.0 - uv.y, 1 ) ).xy;//modify egret\n #else\n  vUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n #endif\n#endif";
    const worldpos_vertex = "#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP )\n\n vec4 worldPosition = modelMatrix * vec4( transformed, 1.0 );\n\n#endif\n";
}
declare namespace egret3d {
    const BitmapDataProcessor: RES.processor.Processor;
    const ShaderProcessor: RES.processor.Processor;
    const TextureDescProcessor: RES.processor.Processor;
    const TextureProcessor: RES.processor.Processor;
    const MaterialProcessor: RES.processor.Processor;
    const MeshProcessor: RES.processor.Processor;
    const AnimationProcessor: RES.processor.Processor;
    const PrefabProcessor: RES.processor.Processor;
    const SceneProcessor: RES.processor.Processor;
}
declare namespace egret3d {
    /**
     *
     * 正则表达式的工具类，提供一些引擎用到的正则表达式
     */
    class RegexpUtil {
        static textureRegexp: RegExp;
        static vectorRegexp: RegExp;
        static floatRegexp: RegExp;
        static rangeRegexp: RegExp;
        static vector4Regexp: RegExp;
        static vector3FloatOrRangeRegexp: RegExp;
    }
}
declare namespace egret3d.io {
    class BinReader {
        private _data;
        constructor(buf: ArrayBuffer, seek?: number);
        private _seek;
        seek(seek: number): void;
        peek(): number;
        length(): number;
        canread(): number;
        readStringAnsi(): string;
        static utf8ArrayToString(array: Uint8Array | number[]): string;
        readStringUtf8(): string;
        readStringUtf8FixLength(length: number): string;
        readSingle(): number;
        readDouble(): number;
        readInt8(): number;
        readUInt8(): number;
        readInt16(): number;
        readUInt16(): number;
        readInt32(): number;
        readUInt32(): number;
        readUint8Array(target?: Uint8Array, offset?: number, length?: number): Uint8Array;
        readUint8ArrayByOffset(target: Uint8Array, offset: number, length?: number): Uint8Array;
        readUint16Array(target?: Uint16Array, offset?: number, length?: number): Uint16Array;
        readSingleArray(target?: Float32Array, offset?: number, length?: number): Float32Array;
        position: number;
        readBoolean(): boolean;
        readByte(): number;
        readBytes(target?: Uint8Array, offset?: number, length?: number): Uint8Array;
        readUnsignedShort(): number;
        readUnsignedInt(): number;
        readFloat(): number;
        readUTFBytes(length: number): string;
        readSymbolByte(): number;
        readShort(): number;
        readInt(): number;
    }
    class BinWriter {
        _buf: Uint8Array;
        private _data;
        private _length;
        private _seek;
        constructor();
        private sureData(addlen);
        getLength(): number;
        getBuffer(): ArrayBuffer;
        seek(seek: number): void;
        peek(): number;
        writeInt8(num: number): void;
        writeUInt8(num: number): void;
        writeInt16(num: number): void;
        writeUInt16(num: number): void;
        writeInt32(num: number): void;
        writeUInt32(num: number): void;
        writeSingle(num: number): void;
        writeDouble(num: number): void;
        writeStringAnsi(str: string): void;
        writeStringUtf8(str: string): void;
        static stringToUtf8Array(str: string): number[];
        writeStringUtf8DataOnly(str: string): void;
        writeUint8Array(array: Uint8Array | number[], offset?: number, length?: number): void;
        readonly length: number;
        writeByte(num: number): void;
        writeBytes(array: Uint8Array | number[], offset?: number, length?: number): void;
        writeUnsignedShort(num: number): void;
        writeUnsignedInt(num: number): void;
        writeFloat(num: number): void;
        writeUTFBytes(str: string): void;
        writeSymbolByte(num: number): void;
        writeShort(num: number): void;
        writeInt(num: number): void;
    }
}
declare namespace egret3d.utils {
    function getRelativePath(targetPath: string, sourcePath: string): string;
}
declare namespace Stats {
    /**
     * 显示调试面板
     */
    function show(container: HTMLDivElement, refreshTime?: number): void;
    /**
     * 关闭调试面板
     */
    function hide(): void;
}
declare namespace egret3d {
    /**
     * device input manager
     * @version paper 1.0
     * @platform Web
     * @language en_US
     */
    /**
     * 用户输入设备管理器
     * @version paper 1.0
     * @platform Web
     * @language zh_CN
     */
    class InputManager {
        /**
         * keyboard input
         * @version paper 1.0
         * @platform Web
         * @language en_US
         */
        /**
         * 键盘输入
         * @version paper 1.0
         * @platform Web
         * @language zh_CN
         */
        static keyboard: KeyboardDevice;
        /**
         * mouse input
         * @version paper 1.0
         * @platform Web
         * @language en_US
         */
        /**
         * 鼠标输入
         * @version paper 1.0
         * @platform Web
         * @language zh_CN
         */
        static mouse: MouseDevice;
        /**
         * touch input
         * @version paper 1.0
         * @platform Web
         * @language en_US
         */
        /**
         * 鼠标输入
         * @version paper 1.0
         * @platform Web
         * @language zh_CN
         */
        static touch: TouchDevice;
        private static _isInit;
        /**
         *
         */
        static init(canvas: any): void;
        /**
         *
         */
        static update(deltaTime: number): void;
        /**
         * is pressed
         * @version paper 1.0
         * @platform Web
         * @language en_US
         */
        /**
         * 是否正在被点击或者触摸
         * 只有单点触摸才被触发，多点触摸请使用 MouseDivice
         * @version paper 1.0
         * @platform Web
         * @language zh_CN
         */
        static isPressed(): boolean;
        /**
         * was pressed
         * @version paper 1.0
         * @platform Web
         * @language en_US
         */
        /**
         * 是否完成一次点击或触摸
         * 只有单点触摸才被触发，多点触摸请使用 MouseDivice
         * @version paper 1.0
         * @platform Web
         * @language zh_CN
         */
        static wasPressed(): boolean;
        /**
         * was released
         * @version paper 1.0
         * @platform Web
         * @language en_US
         */
        /**
         * 是否完成一次鼠标或触摸释放。
         * 只有单点触摸才被触发，多点触摸请使用 MouseDivice
         * @version paper 1.0
         * @platform Web
         * @language zh_CN
         */
        static wasReleased(): boolean;
        private static _touchPoint;
        /**
         * get touch point
         * @version paper 1.0
         * @platform Web
         * @language en_US
         */
        /**
         * 获取点击或触摸位置
         * @version paper 1.0
         * @platform Web
         * @language zh_CN
         */
        static getTouchPoint(): Vector2;
    }
}
declare namespace egret3d {
    /**
     * keyboard input
     * @version paper 1.0
     * @platform Web
     * @language en_US
     */
    /**
     * 键盘输入
     * @version paper 1.0
     * @platform Web
     * @language zh_CN
     */
    class KeyboardDevice {
        private _element;
        private preventDefault;
        private stopPropagation;
        private _keymap;
        private _lastmap;
        private _keyDownHandler;
        private _keyUpHandler;
        private _keyPressHandler;
        /**
         *
         */
        constructor(element: HTMLElement | Window, options?: {
            preventDefault: boolean;
            stopPropagation: boolean;
        });
        private attach(element);
        private detach();
        private _handleKeyDown(event);
        private _handleKeyPress(event);
        private _handleKeyUp(event);
        private _cacheKeyCodeMap;
        private _toKeyIdentifier(keyCode);
        /**
         *
         */
        update(): void;
        /**
         * is pressed
         * @param key key code or char string
         * @version paper 1.0
         * @platform Web
         * @language en_US
         */
        /**
         * 按键是否在按下状态
         * @param key 按键，可以为健值或者字符。
         * @version paper 1.0
         * @platform Web
         * @language zh_CN
         */
        isPressed(key: number | string): boolean;
        /**
         * was pressed
         * @param key key code or char string
         * @version paper 1.0
         * @platform Web
         * @language en_US
         */
        /**
         * 按键被按下一次
         * @param key 按键，可以为健值或者字符。
         * @version paper 1.0
         * @platform Web
         * @language zh_CN
         */
        wasPressed(key: number | string): boolean;
        /**
         * was released
         * @param key key code or char string
         * @version paper 1.0
         * @platform Web
         * @language en_US
         */
        /**
         * 按键被抬起一次
         * @param key 按键，可以为健值或者字符。
         * @version paper 1.0
         * @platform Web
         * @language zh_CN
         */
        wasReleased(key: number | string): boolean;
    }
}
declare namespace egret3d {
    /**
     * mouse input
     * @version paper 1.0
     * @platform Web
     * @language en_US
     */
    /**
     * 鼠标输入
     * @version paper 1.0
     * @platform Web
     * @language zh_CN
     */
    class MouseDevice extends EventDispatcher {
        private _offsetX;
        private _offsetY;
        private _scalerX;
        private _scalerY;
        private _rotated;
        /**
         *
         */
        updateOffsetAndScale(offsetX: number, offsetY: number, scalerX: number, scalerY: number, rotated: boolean): void;
        /**
         *
         */
        convertPosition(value: Readonly<IVector2>, out: IVector2): void;
        /**
         * mouse position
         * @version paper 1.0
         * @platform Web
         * @language en_US
         */
        /**
         * 当前鼠标位置
         * @version paper 1.0
         * @platform Web
         * @language zh_CN
         */
        position: Vector2;
        /**
         * mouse wheel value
         * @version paper 1.0
         * @platform Web
         * @language en_US
         */
        /**
         * 当前鼠标滚轮值
         * @version paper 1.0
         * @platform Web
         * @language zh_CN
         */
        wheel: number;
        private _buttons;
        private _lastbuttons;
        private _element;
        private _upHandler;
        private _moveHandler;
        private _downHandler;
        private _wheelHandler;
        private _contextMenuHandler;
        /**
         *
         */
        constructor(element: HTMLElement);
        /**
         * disable right key menu
         * @version paper 1.0
         * @platform Web
         * @language en_US
         */
        /**
         * 禁用右键菜单
         * @version paper 1.0
         * @platform Web
         * @language zh_CN
         */
        disableContextMenu(): void;
        /**
         * enable right key menu
         * @version paper 1.0
         * @platform Web
         * @language en_US
         */
        /**
         * 启用右键菜单
         * @version paper 1.0
         * @platform Web
         * @language zh_CN
         */
        enableContextMenu(): void;
        private attach(element);
        private detach();
        /**
         *
         */
        update(): void;
        /**
         * is pressed
         * @param key key value. 0: left key; 1: middle key; 2: right key.
         * @version paper 1.0
         * @platform Web
         * @language en_US
         */
        /**
         * 按键是否在按下状态
         * @param key 按键。0: 左键；1: 中键；2: 右键。
         * @version paper 1.0
         * @platform Web
         * @language zh_CN
         */
        isPressed(button: number): boolean;
        /**
         * was pressed
         * @param key key value. 0: left key; 1: middle key; 2: right key.
         * @version paper 1.0
         * @platform Web
         * @language en_US
         */
        /**
         * 按键被按下一次
         * @param key 按键。0: 左键；1: 中键；2: 右键。
         * @version paper 1.0
         * @platform Web
         * @language zh_CN
         */
        wasPressed(button: number): boolean;
        /**
         * was released
         * @param key key value. 0: left key; 1: middle key; 2: right key.
         * @version paper 1.0
         * @platform Web
         * @language en_US
         */
        /**
         * 按键被抬起一次
         * @param key 按键。0: 左键；1: 中键；2: 右键。
         * @version paper 1.0
         * @platform Web
         * @language zh_CN
         */
        wasReleased(button: number): boolean;
        private _handleUp(event);
        private _handleMove(event);
        private _handleDown(event);
        private _handleWheel(event);
    }
}
declare namespace egret3d {
    /**
     * touch phase type
     * @version paper 1.0
     * @platform Web
     * @language en_US
     */
    /**
     * 触摸状态
     * @version paper 1.0
     * @platform Web
     * @language zh_CN
     */
    enum TouchPhase {
        /**
         * touch began
         * @version paper 1.0
         * @platform Web
         * @language en_US
         */
        /**
         * 触摸开始
         * @version paper 1.0
         * @platform Web
         * @language zh_CN
         */
        BEGAN = 0,
        /**
         * touch moved
         * @version paper 1.0
         * @platform Web
         * @language en_US
         */
        /**
         * 触摸移动
         * @version paper 1.0
         * @platform Web
         * @language zh_CN
         */
        MOVED = 1,
        /**
         * touch stationary
         * @version paper 1.0
         * @platform Web
         * @language en_US
         */
        /**
         * 触摸静止
         * @version paper 1.0
         * @platform Web
         * @language zh_CN
         */
        STATIONARY = 2,
        /**
         * touch ended
         * @version paper 1.0
         * @platform Web
         * @language en_US
         */
        /**
         * 触摸结束
         * @version paper 1.0
         * @platform Web
         * @language zh_CN
         */
        ENDED = 3,
        /**
         * touch canceled
         * @version paper 1.0
         * @platform Web
         * @language en_US
         */
        /**
         * 触摸取消
         * @version paper 1.0
         * @platform Web
         * @language zh_CN
         */
        CANCELED = 4,
    }
    /**
     * touch point
     * @version paper 1.0
     * @platform Web
     * @language en_US
     */
    /**
     * 触摸点信息
     * @version paper 1.0
     * @platform Web
     * @language zh_CN
     */
    class TouchPoint {
        altitudeAngle: number;
        azimuthAngle: number;
        deltaPosition: Vector2;
        fingerId: number;
        maximumPossiblePressure: number;
        phase: TouchPhase;
        position: Vector2;
        pressure: number;
        radius: Vector2;
        type: string;
        /**
         *
         */
        set(touch: any, phase: TouchPhase, device: TouchDevice): void;
        private static _pointPool;
        /**
         *
         */
        static create(): TouchPoint;
        /**
         *
         */
        static release(touchPoint: TouchPoint): void;
    }
    /**
     * touch input
     * @version paper 1.0
     * @platform Web
     * @language en_US
     */
    /**
     * 触摸输入
     * @version paper 1.0
     * @platform Web
     * @language zh_CN
     */
    class TouchDevice extends EventDispatcher {
        private _offsetX;
        private _offsetY;
        private _scalerX;
        private _scalerY;
        private _rotated;
        /**
         *
         */
        updateOffsetAndScale(offsetX: number, offsetY: number, scalerX: number, scalerY: number, rotated: boolean): void;
        /**
         *
         */
        convertPosition(e: Touch, out: Vector2): void;
        private _touchesMap;
        private _touches;
        /**
         * touch count
         * @version paper 1.0
         * @platform Web
         * @language en_US
         */
        /**
         * 当前触摸点的数量
         * @version paper 1.0
         * @platform Web
         * @language zh_CN
         */
        touchCount: number;
        private _startHandler;
        private _endHandler;
        private _moveHandler;
        private _cancelHandler;
        private _element;
        private preventDefault;
        private stopPropagation;
        /**
         *
         */
        constructor(element: HTMLElement, options?: {
            preventDefault: boolean;
            stopPropagation: boolean;
        });
        private attach(element);
        private detach();
        /**
         *
         */
        update(): void;
        /**
         * get touch point
         * @param index touch index
         * @version paper 1.0
         * @platform Web
         * @language en_US
         */
        /**
         * 获取触摸点
         * @param index 触摸点的索引
         * @version paper 1.0
         * @platform Web
         * @language zh_CN
         */
        getTouch(index: number): TouchPoint;
        private _getTouch(identifier);
        private _handleTouchStart(event);
        private _handleTouchEnd(event);
        private _handleTouchMove(event);
        private _handleTouchCancel(event);
    }
}
declare namespace egret3d {
    /**
     *
     */
    class Mesh extends BaseMesh {
        /**
         *
         */
        static create(vertexCount: number, indexCount: number, attributeNames?: gltf.MeshAttribute[] | null, attributeTypes?: {
            [key: string]: gltf.AccessorType;
        } | null, drawMode?: gltf.DrawMode): Mesh;
        static create(config: GLTF, buffers: Uint32Array[], name: string): Mesh;
        dispose(): boolean;
        _createBuffer(): void;
        /**
         *
         */
        uploadVertexBuffer(uploadAttributes?: gltf.MeshAttribute | (gltf.MeshAttribute[]) | null, offset?: number, count?: number): void;
        /**
         *
         */
        uploadSubIndexBuffer(subMeshIndex?: number): void;
    }
}
declare namespace egret3d {
    const enum TextureFormatEnum {
        RGBA = 1,
        RGB = 2,
        Gray = 3,
        PVRTC4_RGB = 4,
        PVRTC4_RGBA = 4,
        PVRTC2_RGB = 4,
        PVRTC2_RGBA = 4,
    }
    interface ITexture {
        texture: WebGLTexture;
        width: number;
        height: number;
        dispose(): void;
        caclByteLength(): number;
    }
    abstract class GLTexture extends egret3d.Texture implements ITexture {
        protected _width: number;
        protected _height: number;
        constructor(name?: string, width?: number, height?: number);
        readonly texture: WebGLTexture;
        readonly width: number;
        readonly height: number;
    }
    /**
     *
     */
    class GLTexture2D extends GLTexture {
        static createColorTexture(name: string, r: number, g: number, b: number): GLTexture2D;
        static createGridTexture(name: string): GLTexture2D;
        protected _mipmap: boolean;
        protected _format: TextureFormatEnum;
        protected _reader: TextureReader;
        constructor(name?: string, width?: number, height?: number, format?: TextureFormatEnum);
        uploadImage(img: HTMLImageElement | Uint8Array, mipmap: boolean, linear: boolean, premultiply?: boolean, repeat?: boolean, mirroredU?: boolean, mirroredV?: boolean): void;
        caclByteLength(): number;
        dispose(): boolean;
        getReader(redOnly?: boolean): TextureReader;
    }
    class TextureReader {
        readonly gray: boolean;
        readonly width: number;
        readonly height: number;
        readonly data: Uint8Array;
        constructor(texRGBA: WebGLTexture, width: number, height: number, gray?: boolean);
        getPixel(u: number, v: number): any;
    }
    class WriteableTexture2D implements ITexture {
        width: number;
        height: number;
        format: TextureFormatEnum;
        texture: WebGLTexture;
        constructor(format: TextureFormatEnum, width: number, height: number, linear: boolean, premultiply?: boolean, repeat?: boolean, mirroredU?: boolean, mirroredV?: boolean);
        dispose(): void;
        caclByteLength(): number;
    }
}
declare namespace egret3d {
    abstract class BaseRenderTarget extends egret3d.Texture {
        protected _width: number;
        protected _height: number;
        protected _depth: boolean;
        protected _stencil: boolean;
        protected _mipmap: boolean;
        protected _linear: boolean;
        protected _fbo: WebGLFramebuffer;
        protected _renderbuffer: WebGLRenderbuffer;
        constructor(name: string, width: number, height: number, depth?: boolean, stencil?: boolean, mipmap?: boolean, linear?: boolean);
        protected uploadTexture(): void;
        use(): void;
        generateMipmap(): boolean;
        dispose(): boolean;
        caclByteLength(): number;
        readonly texture: WebGLTexture;
        readonly width: number;
        readonly height: number;
    }
    class GlRenderTarget extends BaseRenderTarget {
        protected uploadTexture(): void;
        use(): void;
        generateMipmap(): boolean;
    }
    class GlRenderTargetCube extends BaseRenderTarget {
        activeCubeFace: number;
        constructor(name: string, width: number, height: number, depth?: boolean, stencil?: boolean);
        use(): void;
    }
}
declare namespace egret3d {
}
declare namespace egret3d {
    /**
     * WebGL 渲染系统
     */
    class WebGLRenderSystem extends paper.BaseSystem {
        protected readonly _interests: ({
            componentClass: typeof Camera;
        }[] | {
            componentClass: typeof Egret2DRenderer;
        }[] | {
            componentClass: typeof DirectionalLight[];
        }[])[];
        private readonly _drawCalls;
        private readonly _camerasAndLights;
        private readonly _renderState;
        private readonly _lightCamera;
        private readonly _filteredLights;
        private _cacheMaterialVerision;
        private _cacheMaterial;
        private _cacheSubMeshIndex;
        private _cacheMesh;
        private _renderLightShadow(light);
        private _renderCamera(camera, renderEnabled);
        private _draw(context, drawCall, material);
        private _updateContextUniforms(program, context, technique);
        private _updateUniforms(program, material, technique, forceUpdate);
        private _updateAttributes(program, mesh, subMeshIndex, technique, forceUpdate);
        onUpdate(): void;
    }
}
declare namespace egret3d {
    const MAX_VERTEX_COUNT_PER_BUFFER: number;
    /**
     * 尝试对场景内所有静态对象合并
     */
    function autoCombine(scene: paper.Scene): void;
    /**
     * 尝试合并静态对象列表。
     * @param instances
     * @param root
     */
    function combine(instances: ReadonlyArray<paper.GameObject>): void;
}
declare namespace egret3d {
    /**
     *
     */
    const enum PerformanceType {
        All = "all",
    }
    type PerformanceEntity = {
        start: number;
        end: number;
        delta: number;
        _cache: number[];
        averageRange: number;
        averageDelta: number;
    };
    /**
     * Performance
     * 数据收集
     */
    class Performance {
        private static _entities;
        static enable: boolean;
        static getEntity(key: string): PerformanceEntity;
        static getFPS(): number;
        static updateFPS(): void;
        private static _getNow();
        static startCounter(key: string, averageRange?: number): void;
        static endCounter(key: string): void;
    }
}
declare namespace egret3d {
    type ProfileItem = {
        key: string;
        count: number;
        startTime: number;
        time: number;
        group: number;
        maxTime: number;
    };
    type ProfileList = {
        keys: string[];
        values: ProfileItem[];
    };
    class Profile {
        private static debug;
        private static profileList;
        private static _getNow();
        private static _print(list);
        static clear(): void;
        static startTime(key: string, group?: number): void;
        static endTime(key: string): void;
        static printAll(): void;
        static print(group?: number): void;
        static test(): void;
    }
}
declare namespace egret3d {
    type RunEgretOptions = {
        antialias: boolean;
        defaultScene?: string;
        contentWidth?: number;
        contentHeight?: number;
        option?: RequiredRuntimeOptions;
        canvas?: HTMLCanvasElement;
        webgl?: WebGLRenderingContext;
        playerMode?: paper.PlayerMode;
        isPlaying?: boolean;
        systems?: any[];
    };
    type RequiredRuntimeOptions = {
        antialias: boolean;
        contentWidth: number;
        contentHeight: number;
    };
    /**
     * 引擎启动入口
     */
    function runEgret(options?: RunEgretOptions): void;
}
interface Window {
    canvas: HTMLCanvasElement;
    paper: any;
    egret3d: any;
}
declare namespace paper.editor {
    /**
     * 编辑器事件
     */
    class EditorEvent extends BaseEvent {
        static CHANGE_SCENE: string;
        constructor(type: string, data?: any);
    }
    /**
     * 编辑器
     **/
    class Editor {
        private static editorSceneModel;
        /**初始化 */
        static init(): Promise<void>;
        private static _activeEditorModel;
        /**
         * 当前激活的编辑模型
         */
        static readonly activeEditorModel: EditorModel;
        private static setActiveModel(model);
        private static activeScene(scene);
        private static currentEditInfo;
        /**
         * 编辑场景
         * @param sceneUrl 场景资源URL
         */
        static editScene(sceneUrl: string): Promise<void>;
        /**
         * 编辑预置体
         * @param prefabUrl 预置体资源URL
         */
        static editPrefab(prefabUrl: string): Promise<void>;
        /**
         * 刷新
         */
        static refresh(): Promise<void>;
        /**
         * 撤销
         */
        static undo(): void;
        /**
         * 重做
         */
        static redo(): void;
        static deserializeHistory(data: any): void;
        static serializeHistory(): string;
        private static eventDispatcher;
        static addEventListener(type: string, fun: Function, thisObj: any, level?: number): void;
        static removeEventListener(type: string, fun: Function, thisObj: any): void;
        static dispatchEvent(event: BaseEvent): void;
        private static initEditEnvironment();
    }
}
declare namespace paper {
}
declare namespace paper.editor {
    const context: EventDispatcher;
    enum selectItemType {
        GAMEOBJECT = 0,
        ASSET = 1,
    }
    /**
     * 编辑模型事件
     */
    class EditorModelEvent extends BaseEvent {
        static ADD_GAMEOBJECTS: string;
        static DELETE_GAMEOBJECTS: string;
        static SELECT_GAMEOBJECTS: string;
        static CHANGE_DIRTY: string;
        static CHANGE_PROPERTY: string;
        static CHANGE_EDIT_MODE: string;
        static CHANGE_EDIT_TYPE: string;
        static ADD_COMPONENT: string;
        static REMOVE_COMPONENT: string;
        static UPDATE_GAMEOBJECTS_HIREARCHY: string;
        static SAVE_ASSET: string;
        constructor(type: string, data?: any);
    }
    enum ModifyObjectType {
        GAMEOBJECT = 0,
        BASECOMPONENT = 1,
    }
    /**
     * 编辑模型
     */
    class EditorModel extends EventDispatcher {
        private _history;
        readonly history: History;
        private _scene;
        readonly scene: Scene;
        private _contentType;
        readonly contentType: "scene" | "prefab";
        private _contentUrl;
        readonly contentUrl: string;
        private _dirty;
        dirty: boolean;
        /**
         * 初始化
         * @param history
         */
        init(scene: paper.Scene, contentType: 'scene' | 'prefab', contentUrl: string): void;
        addState(state: BaseState | null): void;
        getEditType(propName: string, target: any): editor.EditType | null;
        setTransformProperty(propName: string, propValue: any, target: BaseComponent): void;
        createModifyGameObjectPropertyState(gameObjectUUid: string, newValueList: any[], preValueCopylist: any[]): void;
        createModifyComponent(gameObjectUUid: string, componentUUid: string, newValueList: any[], preValueCopylist: any[]): any;
        createPrefabState(prefab: Prefab, parent?: GameObject): void;
        serializeProperty(value: any, editType: editor.EditType): any;
        deserializeProperty(serializeData: any, editType: editor.EditType): any;
        createGameObject(parentList: (GameObject | Scene)[], createType: string, mesh?: egret3d.Mesh): void;
        addComponent(gameObjectUUid: string, compClzName: string): void;
        removeComponent(gameObjectUUid: string, componentUUid: string): void;
        getComponentById(gameObject: GameObject, componentId: string): BaseComponent | null;
        getComponentByAssetId(gameObject: GameObject, assetId: string): BaseComponent | null;
        /**
         * 复制游戏对象
         * @param objs
         */
        copyGameObject(objs: GameObject[]): void;
        /**
         * 粘贴游戏对象
         * @param parent
         */
        pasteGameObject(parent: GameObject): void;
        /**
         * 克隆游戏对象
         * @param gameObjects
         */
        duplicateGameObjects(gameObjects: GameObject[]): void;
        /**
         * 删除游戏对象
         * @param gameObjects
         */
        deleteGameObject(gameObjects: GameObject[]): void;
        /**
         * 解除预置体联系
         * @param gameObjects
         */
        breakPrefab(gameObjects: GameObject[]): void;
        /**
         * 更改层级
         * */
        updateGameObjectsHierarchy(gameObjects: GameObject[], targetGameobjcet: GameObject, dir: 'top' | 'inner' | 'bottom'): void;
        /**
         * 设置对象的层级
         */
        setGameObjectsHierarchy(objects: GameObject[], targetObject: GameObject, dir: 'top' | 'inner' | 'bottom'): void;
        /**
         * 筛选层级中的顶层游戏对象
         * @param gameObjects
         */
        filtTopHierarchyGameObjects(gameObjects: GameObject[]): void;
        getGameObjectByUUid(uuid: string): GameObject | null;
        getGameObjectsByUUids(uuids: string[]): GameObject[];
        setTargetProperty(propName: string, target: any, value: any, editType: paper.editor.EditType): void;
        private propertyHasGetterSetter(propName, target);
        /**当前选中的对象 */
        currentSelected: GameObject[];
        /**
         * 选择游戏对象
         *  */
        selectGameObject(objs: GameObject[]): void;
        /**当前编辑模式 */
        currentEditMode: string;
        /**
         * 切换编辑模式
         */
        changeEditMode(mode: string): void;
        /**
         * 切换编辑类型
         */
        changeEditType(type: string): void;
        isPrefabRoot(gameObj: GameObject): boolean;
        isPrefabChild(gameObj: GameObject): boolean;
        /**将对象按照层级进行排序
         */
        sortGameObjectsForHierarchy(gameobjects: paper.GameObject[]): paper.GameObject[];
        createApplyPrefabState(applyData: editor.ApplyData, applyPrefabInstanceId: string, prefab: paper.Prefab): void;
        createRevertPrefabState(revertData: editor.revertData, revertPrefabInstanceId: string): void;
        deepClone<T>(obj: T): T;
        updateAsset(asset: Asset, prefabInstance?: GameObject | null): void;
        private _cacheIds;
        private findAssetRefs(target, as, refs?);
        private findFromChildren(source, as, refs, parent, key);
        getAllGameObjectsFromPrefabInstance(gameObj: paper.GameObject, objs?: paper.GameObject[] | null): GameObject[];
        modifyMaterialPropertyValues(target: egret3d.Material, valueList: any[]): Promise<void>;
    }
}
declare namespace paper.editor {
    class EditorSceneModel {
        private viewCache;
        readonly editorScene: Scene;
        private currentModel;
        editorModel: EditorModel;
        private editorCameraScript;
        private pickGameScript;
        private geoController;
        private cameraObject;
        init(): void;
    }
}
declare namespace paper.editor {
    class Controller extends paper.Behaviour {
        private _modeCanChange;
        private _isEditing;
        selectedGameObjs: GameObject[];
        private _cameraObject;
        private bindMouse;
        private bindKeyboard;
        readonly onGeoControll: boolean;
        private mainGeo;
        private readonly controller;
        private _editorModel;
        editorModel: EditorModel;
        private geoCtrlMode;
        private geoCtrlType;
        private coord;
        constructor();
        onUpdate(): void;
        private updateInLocalMode();
        private updateInWorldMode();
        private _oldResult;
        private mouseRayCastUpdate();
        private _oldTransform;
        private geoChangeByCamera();
        private inputUpdate();
        private changeEditMode(mode);
        private changeEditType(type);
        private addEventListener();
        private selectGameObjects(gameObjs);
        private drawCoord();
    }
}
declare namespace paper {
    /**
     *
     */
    class MissingComponent extends BaseComponent {
        missingObject: any | null;
    }
}
declare namespace paper.editor {
    class GeoContainer extends BaseGeo {
        private geos;
        private selectedGeo;
        readonly onGeoControll: boolean;
        constructor();
        onSet(): void;
        checkIntersect(ray: egret3d.Ray): BaseGeo;
        private clear();
        changeType(type: string): void;
        wasPressed_local(ray: egret3d.Ray, selected: any): any;
        isPressed_local(ray: egret3d.Ray, selected: any): void;
        wasPressed_world(ray: egret3d.Ray, selected: any): any;
        isPressed_world(ray: egret3d.Ray, selected: any): void;
        wasReleased(selectedGameObjs: GameObject[]): void;
    }
}
declare namespace paper.editor {
    class xAxis extends BaseGeo {
        constructor();
        onSet(): void;
        wasPressed_local(ray: egret3d.Ray, selectedGameObjs: GameObject[]): void;
        isPressed_local(ray: egret3d.Ray, selectedGameObjs: GameObject[]): void;
        wasPressed_world(ray: egret3d.Ray, selectedGameObjs: any): void;
        isPressed_world(ray: egret3d.Ray, selectedGameObjs: GameObject[]): void;
        wasReleased(selectedGameObjs: GameObject[]): void;
    }
}
declare namespace paper.editor {
    class xyAxis extends BaseGeo {
        constructor();
        onSet(): void;
        wasPressed_local(ray: egret3d.Ray, selectedGameObjs: any): void;
        isPressed_local(ray: egret3d.Ray, selectedGameObjs: any): void;
        wasPressed_world(ray: egret3d.Ray, selectedGameObjs: any): void;
        isPressed_world(ray: egret3d.Ray, selectedGameObjs: any): void;
        wasReleased(selectedGameObjs: GameObject[]): void;
    }
}
declare namespace paper.editor {
    class xzAxis extends BaseGeo {
        constructor();
        onSet(): void;
        wasPressed_local(ray: egret3d.Ray, selectedGameObjs: any): void;
        isPressed_local(ray: egret3d.Ray, selectedGameObjs: any): void;
        wasPressed_world(ray: egret3d.Ray, selectedGameObjs: any): void;
        isPressed_world(ray: egret3d.Ray, selectedGameObjs: any): void;
        wasReleased(selectedGameObjs: GameObject[]): void;
    }
}
declare namespace paper.editor {
    class yzAxis extends BaseGeo {
        constructor();
        onSet(): void;
        wasPressed_local(ray: egret3d.Ray, selectedGameObjs: any): void;
        isPressed_local(ray: egret3d.Ray, selectedGameObjs: any): void;
        wasPressed_world(ray: egret3d.Ray, selectedGameObjs: any): void;
        isPressed_world(ray: egret3d.Ray, selectedGameObjs: any): void;
        wasReleased(selectedGameObjs: GameObject[]): void;
    }
}
declare namespace paper.editor {
    class yAxis extends BaseGeo {
        constructor();
        onSet(): void;
        wasPressed_local(ray: egret3d.Ray, selectedGameObjs: any): void;
        isPressed_local(ray: egret3d.Ray, selectedGameObjs: any): void;
        wasPressed_world(ray: egret3d.Ray, selectedGameObjs: any): void;
        isPressed_world(ray: egret3d.Ray, selectedGameObjs: any): void;
        wasReleased(selectedGameObjs: GameObject[]): void;
    }
}
declare namespace paper.editor {
    class zAxis extends BaseGeo {
        constructor();
        onSet(): void;
        wasPressed_local(ray: egret3d.Ray, selectedGameObjs: any): void;
        isPressed_local(ray: egret3d.Ray, selectedGameObjs: GameObject[]): void;
        wasPressed_world(ray: egret3d.Ray, selectedGameObjs: any): void;
        isPressed_world(ray: egret3d.Ray, selectedGameObjs: GameObject[]): void;
        wasReleased(selectedGameObjs: GameObject[]): void;
    }
}
declare namespace paper.editor {
    class xRot extends BaseGeo {
        constructor();
        private fan;
        onSet(): void;
        wasPressed_local(ray: egret3d.Ray, selectedGameObjs: any): void;
        isPressed_local(ray: egret3d.Ray, selectedGameObjs: GameObject[]): void;
        wasPressed_world(ray: egret3d.Ray, selectedGameObjs: GameObject[]): void;
        isPressed_world(ray: egret3d.Ray, selectedGameObjs: GameObject[]): void;
        wasReleased(): void;
    }
}
declare namespace paper.editor {
    class yRot extends BaseGeo {
        constructor();
        onSet(): void;
        private fan;
        wasPressed_local(ray: egret3d.Ray, selectedGameObjs: any): void;
        isPressed_local(ray: egret3d.Ray, selectedGameObjs: GameObject[]): void;
        wasPressed_world(ray: egret3d.Ray, selectedGameObjs: GameObject[]): void;
        isPressed_world(ray: egret3d.Ray, selectedGameObjs: GameObject[]): void;
        wasReleased(): void;
    }
}
declare namespace paper.editor {
    class zRot extends BaseGeo {
        constructor();
        onSet(): void;
        private fan;
        wasPressed_local(ray: egret3d.Ray, selectedGameObjs: any): void;
        isPressed_local(ray: egret3d.Ray, selectedGameObjs: GameObject[]): void;
        wasPressed_world(ray: egret3d.Ray, selectedGameObjs: GameObject[]): void;
        isPressed_world(ray: egret3d.Ray, selectedGameObjs: GameObject[]): void;
        wasReleased(): void;
    }
}
declare namespace paper.editor {
    class ballRot extends BaseGeo {
        constructor();
        onSet(): void;
        drawBall(SPHERE_DIV: number): egret3d.Mesh;
        wasPressed_local(ray: egret3d.Ray, selectedGameObjs: any): void;
        isPressed_local(ray: egret3d.Ray, selectedGameObjs: GameObject[]): void;
        wasPressed_world(ray: egret3d.Ray, selectedGameObjs: GameObject[]): void;
        isPressed_world(ray: egret3d.Ray, selectedGameObjs: GameObject[]): void;
        wasReleased(): void;
    }
}
declare namespace paper.editor {
    class xScl extends BaseGeo {
        constructor();
        onSet(): void;
        wasPressed_local(ray: egret3d.Ray, selectedGameObjs: any): void;
        isPressed_local(ray: egret3d.Ray, selectedGameObjs: any): void;
        wasPressed_world(ray: egret3d.Ray, selectedGameObjs: any): void;
        isPressed_world(ray: egret3d.Ray, selectedGameObjs: any): void;
        wasReleased(): void;
    }
}
declare namespace paper.editor {
    class yScl extends BaseGeo {
        constructor();
        onSet(): void;
        wasPressed_local(ray: egret3d.Ray, selectedGameObjs: any): void;
        isPressed_local(ray: egret3d.Ray, selectedGameObjs: any): void;
        wasPressed_world(ray: egret3d.Ray, selectedGameObjs: any): void;
        isPressed_world(ray: egret3d.Ray, selectedGameObjs: any): void;
        wasReleased(): void;
    }
}
declare namespace paper.editor {
    class zScl extends BaseGeo {
        constructor();
        onSet(): void;
        wasPressed_local(ray: egret3d.Ray, selectedGameObjs: any): void;
        isPressed_local(ray: egret3d.Ray, selectedGameObjs: any): void;
        wasPressed_world(ray: egret3d.Ray, selectedGameObjs: any): void;
        isPressed_world(ray: egret3d.Ray, selectedGameObjs: any): void;
        wasReleased(): void;
    }
}
declare namespace paper.editor {
    type EventData = {
        isUndo: boolean;
    };
    type ApplyData = {
        [linkedId: string]: {
            addGameObjects?: {
                serializeData: any;
                id: string;
                cacheSerializeData?: {
                    [key: string]: ISerializedData[];
                };
            }[];
            addComponents?: {
                serializeData: any;
                id: string;
                gameObjId: string;
                cacheSerializeData?: {
                    [key: string]: ISerializedData;
                };
            }[];
            modifyGameObjectPropertyList?: {
                newValueList: any[];
                preValueCopylist: any[];
            }[];
            modifyComponentPropertyList?: {
                componentId: string;
                newValueList: any[];
                preValueCopylist: any[];
            }[];
        };
    };
    type revertData = {
        [linkedId: string]: {
            revertGameObjects?: {
                serializeData: any;
                id: string;
            }[];
            revertComponents?: {
                serializeData: any;
                id?: string;
            }[];
            modifyGameObjectPropertyList?: {
                newValueList: any[];
                preValueCopylist: any[];
            }[];
            modifyComponentPropertyList?: {
                componentId: string;
                newValueList: any[];
                preValueCopylist: any[];
            }[];
        };
    };
    const EventType: {
        HistoryState: string;
        HistoryAdd: string;
        HistoryFree: string;
    };
    class History {
        dispatcher: EventDispatcher | null;
        private _locked;
        private _index;
        private _batchIndex;
        private _states;
        private _batchStates;
        private _events;
        private _free();
        private _doState(state, isUndo);
        back(): boolean;
        forward(): boolean;
        go(index: number): boolean;
        add(state: BaseState): void;
        beginBatch(): void;
        endBatch(): void;
        getState(index: number): BaseState | null;
        enabled: boolean;
        readonly count: number;
        readonly index: number;
        readonly batchIndex: number;
        readonly locked: 0 | 1 | 2 | 3;
        readonly states: BaseState[];
        serialize(): any;
        deserialize(serializeHistory: any): void;
    }
}
declare namespace paper {
    /**
     *
     */
    class Clock extends SingletonComponent {
        maxFixedSubSteps: number;
        fixedDeltaTime: number;
        timeScale: number;
        private _frameCount;
        private _beginTime;
        private _lastTime;
        private _delayTime;
        private _unscaledTime;
        private _unscaledDeltaTime;
        private _fixedTime;
        initialize(): void;
        readonly frameCount: number;
        readonly time: number;
        readonly fixedTime: number;
        readonly deltaTime: number;
        readonly unscaledTime: number;
        readonly unscaledDeltaTime: number;
    }
}
declare namespace paper.editor {
    /**
     * 状态组
     * @author 杨宁
     */
    class StateGroup extends BaseState {
        private stateList;
        static create(stateList: BaseState[]): StateGroup;
        redo(): boolean;
        undo(): boolean;
        serialize(): any;
        deserialize(data: any): void;
    }
}
declare namespace paper.editor {
    class ModifyGameObjectPropertyState extends BaseState {
        static create(gameObjectUUid: string, newValueList: any[], preValueCopylist: any[]): ModifyGameObjectPropertyState | null;
        private readonly stateData;
        undo(): boolean;
        private modifyProperty(valueList);
        redo(): boolean;
    }
}
declare namespace paper.editor {
    class ModifyComponentPropertyState extends BaseState {
        static toString(): string;
        static create(gameObjUUid: string, componentUUid: string, newValueList: any[], preValueCopylist: any[]): ModifyComponentPropertyState | null;
        private readonly stateData;
        undo(): boolean;
        private modifyProperty(valueList);
        redo(): boolean;
    }
}
declare namespace paper.editor {
    class CreateGameObjectState extends BaseState {
        static toString(): string;
        static create(parentList: (GameObject | Scene)[], createType: string, mesh: egret3d.Mesh): CreateGameObjectState | null;
        infos: {
            parentUUID: string;
            serializeData: any;
        }[];
        createType: string;
        addList: string[];
        private mesh;
        private isFirst;
        undo(): boolean;
        redo(): boolean;
        private createGameObjectByType(createType);
    }
}
declare namespace paper.editor {
    class DeleteGameObjectsState extends BaseState {
        static toString(): string;
        static create(gameObjects: GameObject[], editorModel: EditorModel): DeleteGameObjectsState;
        private deleteInfo;
        undo(): boolean;
        redo(): boolean;
        serialize(): any;
        deserialize(data: any): void;
    }
}
declare namespace paper.editor {
    class DuplicateGameObjectsState extends BaseState {
        static toString(): string;
        static create(objs: GameObject[], editorModel: EditorModel): DuplicateGameObjectsState;
        private duplicateInfo;
        private addList;
        undo(): boolean;
        private firstDo;
        redo(): boolean;
        private clearPrefabInfo(obj);
        serialize(): any;
        deserialize(data: any): void;
    }
}
declare namespace paper.editor {
    class PasteGameObjectsState extends BaseState {
        static toString(): string;
        static create(serializeData: any[], parent: GameObject): PasteGameObjectsState;
        private pasteInfo;
        private cacheSerializeData;
        private addList;
        undo(): boolean;
        redo(): boolean;
        private clearPrefabInfo(obj);
        serialize(): any;
        deserialize(data: any): void;
    }
}
declare namespace paper.editor {
    class AddComponentState extends BaseState {
        static toString(): string;
        static create(gameObjectUUid: string, compClzName: string): AddComponentState | null;
        private readonly stateData;
        undo(): boolean;
        redo(): boolean;
    }
}
declare namespace paper.editor {
    class RemoveComponentState extends BaseState {
        static toString(): string;
        static create(gameObjectUUid: string, componentUUid: string, cacheSerializeData: any): RemoveComponentState | null;
        private readonly stateData;
        undo(): boolean;
        redo(): boolean;
    }
}
declare namespace paper.editor {
    /**
     * 游戏对象层级
     * @author 杨宁
     */
    class GameObjectHierarchyState extends BaseState {
        private gameObjectsInfo;
        private targetObject;
        private targetDir;
        static create(gameObjects: GameObject[], targetGameObj: GameObject, dir: 'top' | 'inner' | 'bottom', editorModel: EditorModel): GameObjectHierarchyState;
        undo(): boolean;
        redo(): boolean;
    }
}
declare namespace paper.editor {
    class CreatePrefabState extends BaseState {
        static toString(): string;
        static create(prefab: Prefab, parent?: GameObject): CreatePrefabState | null;
        private readonly stateData;
        undo(): boolean;
        redo(): boolean;
    }
}
declare namespace paper.editor {
    /**
     * 预置体结构状态
     * @author 杨宁
     */
    class BreakPrefabStructState extends BaseState {
        static create(prefabInstanceList: GameObject[]): BreakPrefabStructState;
        private static makePrefabInfo(gameOjbect);
        private prefabInfos;
        redo(): boolean;
        undo(): boolean;
        serialize(): any;
        deserialize(data: any): void;
    }
}
declare namespace paper.editor {
    class ApplyPrefabInstanceState extends BaseState {
        private firstRedo;
        static toString(): string;
        static create(applyData: editor.ApplyData, applyPrefabRootId: string, prefab: paper.Prefab): ApplyPrefabInstanceState | null;
        private readonly stateData;
        undo(): boolean;
        getAllUUidFromGameObject(gameObj: paper.GameObject, uuids?: string[] | null): string[];
        setLinkedId(gameObj: GameObject, ids: string[]): void;
        clearLinkedId(gameObj: GameObject): void;
        protected dispathPropertyEvent(modifyObj: any, propName: string, newValue: any): void;
        private modifyPrefabGameObjectPropertyValues(linkedId, tempObj, valueList);
        modifyPrefabComponentPropertyValues(linkedId: string, componentUUid: string, tempObj: GameObject, valueList: any[]): void;
        setGameObjectPrefabRootId(gameObj: GameObject, rootID: string): void;
        getGameObjectsByLinkedId(linkedId: string, filterApplyRootId: string): GameObject[];
        getGameObjectByLinkedId(gameObj: paper.GameObject, linkedID: string): GameObject;
        getGameObjectByUUid(gameObj: GameObject, uuid: string): GameObject;
        redo(): boolean;
        private clearGameObjectExtrasInfo(gameObj);
        private clearExtrasFromSerilizeData(data);
    }
}
declare namespace paper.editor {
    class RevertPrefabInstanceState extends BaseState {
        static toString(): string;
        static create(revertData: editor.revertData, revertPrefabRootId: string): RevertPrefabInstanceState;
        readonly stateData: {
            revertPrefabRootId: string;
            revertData: revertData;
        };
        undo(): boolean;
        protected dispathPropertyEvent(modifyObj: any, propName: string, newValue: any): void;
        private modifyPrefabGameObjectPropertyValues(gameObj, valueList);
        modifyPrefabComponentPropertyValues(gameObj: GameObject, componentUUid: string, valueList: any[]): void;
        redo(): boolean;
    }
}
declare namespace paper.editor {
    /**
     * Represents a UUID as defined by rfc4122.
     */
    interface UUID {
        /**
         * @returns the canonical representation in sets of hexadecimal numbers separated by dashes.
         */
        asHex(): string;
    }
    function v4(): UUID;
    function isUUID(value: string): boolean;
    /**
     * Parses a UUID that is of the format xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.
     * @param value A uuid string.
     */
    function parse(value: string): UUID;
    function generateUuid(): string;
}
declare namespace paper.editor {
    class EditorCameraScript extends paper.Behaviour {
        editorModel: EditorModel;
        moveSpeed: number;
        wheelSpeed: number;
        rotateSpeed: number;
        private bindKeyboard;
        private bindMouse;
        private _lastMouseX;
        private _lastMouseY;
        private _mouseDown_r;
        private _mouseDown_l;
        private _mouseDown_m;
        onStart(): any;
        onUpdate(delta: number): any;
        OnEnable(): void;
        OnDisable(): void;
        private inputUpdate(delta);
        private _lookAtPiont;
        private _dragPlanePoint;
        private _dragPlaneNormal;
        private _helpQuat;
        private _helpVec3;
        onDestroy(): any;
    }
}
declare namespace paper.editor {
    class PickGameObjectScript extends paper.Behaviour {
        editorModel: EditorModel;
        private bindMouse;
        private bindKeyboard;
        private cameraScript;
        private camera;
        private lastX;
        private lastY;
        private selectBox;
        onStart(): any;
        private _tapStart;
        private selectedGameObjects;
        clearSelected(): void;
        onUpdate(delta: number): any;
        private excludingChild();
        private boxSelect();
        private setStroke(picked);
        private initSelectBox();
        private drawSelectBox(start, end);
        private intersectWithCameraAndLight(ray);
    }
}
declare namespace paper.editor {
    class Gizmo extends paper.Behaviour {
        private static enabled;
        private static webgl;
        private static camera;
        onStart(): void;
        static Enabled(): void;
        static setGameObj(obj: GameObject): void;
        private static gameObj;
        static DrawStroke(): void;
        static DrawIcon(path: string, pos: egret3d.Vector3, size: number, color?: egret3d.Color): void;
        private static verticesLine;
        private static lineVertexBuffer;
        private _oldTransform;
        private nrLine;
        static DrawCoord(): void;
        private static verticesCoord;
        private static verticesCylinder;
        private static verticesArrow;
        private static coordVertexBuffer;
        private static cylinderVertexBuffer;
        private static arrowVertexBuffer;
        private static cameraVertexBuffer;
        private static cameraIndexBuffer;
        private static nrLine;
        private static setVertices();
        private static mvpMatrix;
        private static mMatrix;
        private static vMatrix;
        private static pMatrix;
        private static setMVPMatrix(m?);
        private static glProgram_line;
        private static glProgram_icon;
        private static glProgram_stroke;
        private static initPrg();
        static DrawLights(): void;
        private static DrawCylinder(transform, color);
        static DrawCameras(): void;
        static DrawCameraSquare(obj: GameObject, color: number[]): void;
        private static helpVec31;
        private static helpVec32;
        private static helpVec33;
        private static helpVec34;
        private static helpVec35;
        private static helpVec36;
        private static verticesCameraSquare;
        private static getCameraSquare(obj);
        private static helpMat;
        private static helpMat1;
        private static getWorldMatrixWithoutScale(transform, fixScale, out);
        private static _imageLoadCount;
        private static textures;
        private static initIconTexture();
        private static loadIconTexture(image, key);
    }
}
declare namespace paper.editor {
    class GizmoShader {
        prg: WebGLProgram;
        private gl;
        constructor(gl: WebGLRenderingContext, vshader: string, fshader: string);
        private createProgram(vshader, fshader);
        private createShader(type, str);
        use(): void;
        setFloat(name: string, value: number): void;
        setInt(name: string, value: number): void;
        setBool(name: string, value: boolean): void;
        setVec3(name: string, value: egret3d.Vector3): void;
        setVec4(name: string, value: egret3d.Vector4): void;
        setColor(name: string, value: number[]): void;
        setMatrix(name: string, value: egret3d.Matrix4): void;
        setTexture(name: string, value: number): void;
    }
}
declare namespace paper.editor {
    const icon_frag: string;
    const icon_vert: string;
    const line_frag: string;
    const line_vert: string;
    const stroke_vert: string;
}
declare namespace egret3d {
    class GizmoRenderSystem extends paper.BaseSystem {
        private readonly _renderState;
        onUpdate(): void;
    }
}
declare namespace egret3d {
    /**
     * @deprecated
     */
    type Matrix = Matrix4;
    /**
     * @deprecated
     */
    const Matrix: typeof Matrix4;
    /**
     * @deprecated
     */
    const Prefab: typeof paper.Prefab;
    /**
     * @deprecated
     */
    type Prefab = paper.Prefab;
    /**
     * @deprecated
     */
    const RawScene: typeof paper.RawScene;
    /**
     * @deprecated
     */
    type RawScene = paper.RawScene;
}
declare namespace egret3d.particle {
}