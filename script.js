var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,                                         
});
renderer.setClearColor(new THREE.Color("black"), 0);   
renderer.setSize(640, 480);                            
renderer.domElement.style.position = "absolute";       
renderer.domElement.style.top = "0px";                 
renderer.domElement.style.left = "0px";                
document.body.appendChild(renderer.domElement);        
var camera = new THREE.Camera();                       
scene.add(camera);                                     
var light = new THREE.DirectionalLight(0xffffff);      
light.position.set(0, 0, 2);                           
scene.add(light);                                      

//var controls = new THREE.OrbitControls( camera, renderer.domElement );



var source = new THREEx.ArToolkitSource({              
    sourceType: "webcam",                                
});
source.init(function onReady() {                       
    onResize();                                          
});



var context = new THREEx.ArToolkitContext({            
    debug: false,                                        
    cameraParametersUrl: "./data/camera_para.dat",              
    detectionMode: "mono",                               
    imageSmoothingEnabled: true,                         
    maxDetectionRate: 60,                                
    canvasWidth: source.parameters.sourceWidth,          
    canvasHeight: source.parameters.sourceHeight,        
});
context.init(function onCompleted(){                   
    camera.projectionMatrix.copy(context.getProjectionMatrix());    
});

 
 
 
window.addEventListener("resize", function() {         
    onResize();                                          
});
 
function onResize(){
    source.onResizeElement();
    source.copyElementSizeTo(renderer.domElement);       
    if(context.arController !== null){                   
        source.copyElementSizeTo(context.arController.canvas);   
    } 
}


////////////////////////////////////////////////////////////////////////////
//////////hiro-marker
var hiro_marker = new THREE.Group();                       
var controls = new THREEx.ArMarkerControls(context, hiro_marker, {
    type: "pattern",                                     
    patternUrl: "./patt/hiro.patt",                             
});
scene.add(hiro_marker);

var loader = new THREE.GLTFLoader();
loader.load("./gltf/face/face.gltf", function( gltf ){
    hiro_marker.add( gltf.scene );
    gltf.animations;
    gltf.scene;
    gltf.scenes;
    gltf.cameras;
});
////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////
////////////kanji_marker
var kanji_marker = new THREE.Group();                       
var controls = new THREEx.ArMarkerControls(context, kanji_marker, {
    type: "pattern",                                     
    patternUrl: "./patt/kanji.patt",                             
});
scene.add(kanji_marker);

var loader = new THREE.GLTFLoader();
loader.load("./gltf/monkey/monkey.gltf", function( gltf ){
    kanji_marker.add( gltf.scene );
    gltf.animations;
    gltf.scene;
    gltf.scenes;
    gltf.cameras;
});
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
////////////utv-marker
var utv_marker = new THREE.Group();                       
var controls = new THREEx.ArMarkerControls(context, utv_marker, {
    type: "pattern",                                     
    patternUrl: "./patt/ut-virtual.patt",                             
});
scene.add(utv_marker);

var loader = new THREE.GLTFLoader();
loader.load("./gltf/geometory03/geometory03.gltf", function( gltf ){
    utv_marker.add( gltf.scene );
    gltf.animations;
    gltf.scene;
    gltf.scenes;
    gltf.cameras;
});
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
////////////utv_tamago
var gltf = null;
var mixer = null;
var clock = new THREE.Clock();

var utv_tamago_ware = new THREE.Group();                       
var controls = new THREEx.ArMarkerControls(context, utv_tamago_ware, {
    type: "pattern",                                     
    patternUrl: "./patt/utvirtual_tamagohibiware_pattern_marker.patt",                             
});
scene.add(utv_tamago_ware);

var loader = new THREE.GLTFLoader();
loader.load("./gltf/sample_object01/sample_object01.gltf", function( gltf ){
//loader.load("./gltf/sample_object02/sample_object02.gltf", function( gltf ){
//loader.load("./gltf/utvirtual_komaba2017/utvirtual_logo_ar.gltf", function( gltf ){
//loader.load("./gltf/utvirtual_3d_logo_ar02/utvirtual_3d_logo_ar02.gltf", function( gltf ){
//loader.load("./gltf/utvirtual_3d_logo_pollenjp02/utvirtual_3d_logo_pollenjp02.gltf", function( gltf ){
//loader.load("./gltf/utvirtual_3d_logo_pollenjp03/utvirtual_3d_logo_pollenjp03.gltf", function( gltf ){
    var animations = gltf.animations;
    if ( animations && animations.length ) {
        mixer = new THREE.AnimationMixer( gltf.scene );
        for ( var i = 0; i < animations.length; i ++ ) {
            var animation = animations[ i ];
            mixer.clipAction( animation ).play();
        }
    }
    utv_tamago_ware.add( gltf.scene );
    //utv_tamago_ware.add( gltf.animation );
    gltf.animation
    gltf.scene;
    gltf.scenes;
    gltf.cameras;
});
function animate() {
    requestAnimationFrame( animate );
    if (mixer) mixer.update(clock.getDelta());
    //orbitControls.update();
    //controls.update();
    //renderScene();
}
animate();
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

function renderScene() {                               
    requestAnimationFrame(renderScene);                  
    if(source.ready === false)    { return; }              
    context.update(source.domElement);                   
    renderer.render(scene, camera);                      
}

//////////////////////////////////////////////////////////////////////////////
//var orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
renderScene();                                         

