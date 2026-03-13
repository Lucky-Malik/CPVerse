import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

const ProfilePage = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [publicProfileEnabled, setPublicProfileEnabled] = useState(true);
  const robotContainerRef = useRef(null);
  
  const [saveStatus, setSaveStatus] = useState('💾 Save Changes');

  const handleSave = () => {
    setSaveStatus('✅ Saved!');
    setTimeout(() => {
        setSaveStatus('💾 Save Changes');
    }, 2000);
  };

  useEffect(() => {
    if (!robotContainerRef.current) return;
    const container = robotContainerRef.current;
    
    // 1. Setup Scene
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(3, 1, 6); 
    camera.lookAt(0, 0, 0);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0x555555, 0.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x10b981, 1.5);
    keyLight.position.set(-2, 4, 3);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0x059669, 1.0);
    fillLight.position.set(2, 1, 2);
    scene.add(fillLight);

    // 3. Build the Standing Robot
    const robot = new THREE.Group();
    robot.scale.set(1.2, 1.2, 1.2); 
    scene.add(robot);

    const armorMat = new THREE.MeshStandardMaterial({ 
        color: 0x6b7280,
        roughness: 0.4, 
        metalness: 0.8 
    });
    const neonMat = new THREE.MeshStandardMaterial({ 
        color: 0x10b981, 
        emissive: 0x10b981, 
        emissiveIntensity: 3.5,
        toneMapped: false
    });

    // Torso
    const torsoGeo = new THREE.BoxGeometry(0.8, 1, 0.5);
    const torso = new THREE.Mesh(torsoGeo, armorMat);
    torso.position.y = 0.5;
    robot.add(torso);

    // Chest Core
    const coreGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.1, 16);
    const core = new THREE.Mesh(coreGeo, neonMat);
    core.rotation.x = Math.PI / 2;
    core.position.set(0, 0.7, 0.26);
    robot.add(core);

    // Head
    const headGroup = new THREE.Group();
    robot.add(headGroup);
    
    const headGeo = new THREE.BoxGeometry(0.5, 0.6, 0.5);
    const head = new THREE.Mesh(headGeo, armorMat);
    head.position.y = 1.4;
    headGroup.add(head);

    // Visor
    const visorGeo = new THREE.BoxGeometry(0.4, 0.1, 0.52);
    const visor = new THREE.Mesh(visorGeo, neonMat);
    visor.position.set(0, 1.4, 0.02);
    headGroup.add(visor);

    // Legs
    const legGeo = new THREE.BoxGeometry(0.25, 1.2, 0.3);
    const leftLeg = new THREE.Mesh(legGeo, armorMat);
    leftLeg.position.set(-0.25, -0.6, 0);
    robot.add(leftLeg);
    const rightLeg = new THREE.Mesh(legGeo, armorMat);
    rightLeg.position.set(0.25, -0.6, 0);
    robot.add(rightLeg);

    // Feet
    const footGeo = new THREE.BoxGeometry(0.3, 0.15, 0.5);
    const leftFoot = new THREE.Mesh(footGeo, armorMat);
    leftFoot.position.set(-0.25, -1.25, 0.1);
    robot.add(leftFoot);
    const rightFoot = new THREE.Mesh(footGeo, armorMat);
    rightFoot.position.set(0.25, -1.25, 0.1);
    robot.add(rightFoot);

    // Arms
    const armGeo = new THREE.BoxGeometry(0.2, 0.9, 0.2);
    const leftArm = new THREE.Mesh(armGeo, armorMat);
    leftArm.position.set(-0.55, 0.5, 0);
    leftArm.rotation.z = 0.1;
    robot.add(leftArm);
    const rightArm = new THREE.Mesh(armGeo, armorMat);
    rightArm.position.set(0.55, 0.5, 0);
    rightArm.rotation.z = -0.1;
    robot.add(rightArm);

    // Ground
    const gridHelper = new THREE.GridHelper(4, 10, 0x4b5563, 0x374151);
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.3;
    gridHelper.position.y = -1.35;
    scene.add(gridHelper);

    const ringGeo = new THREE.TorusGeometry(1.2, 0.02, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.4 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = -1.3;
    scene.add(ring);

    // Animation Logic
    let mouseX = 0;
    const windowHalfX = window.innerWidth / 2;

    const onMouseMove = (event) => {
        mouseX = (event.clientX - windowHalfX) / 4;
    };
    
    document.addEventListener('mousemove', onMouseMove);

    const clock = new THREE.Clock();
    let animationFrameId;

    function animate() {
        animationFrameId = requestAnimationFrame(animate);
        const time = clock.getElapsedTime();

        const breathe = Math.sin(time * 2) * 0.005;
        torso.position.y = 0.5 + breathe;
        headGroup.position.y = breathe;
        
        const targetRot = Math.max(-0.5, Math.min(0.5, mouseX * 0.002));
        headGroup.rotation.y += (targetRot - headGroup.rotation.y) * 0.1;

        ring.rotation.z -= 0.005;
        ring.scale.setScalar(1 + Math.sin(time * 3) * 0.05);

        renderer.render(scene, camera);
    }

    animate();

    const handleResize = () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
        document.removeEventListener('mousemove', onMouseMove);
        cancelAnimationFrame(animationFrameId);
        container.removeChild(renderer.domElement);
        scene.clear();
    };
  }, []);

  return (
    <div className="min-h-screen relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 relative z-10 lg:ml-auto lg:mr-32">
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Profile Settings</h1>
            <p className="text-gray-400">Manage your account and platform connections</p>
        </div>

        <div className="setting-card bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-700 mb-8">
            <h3 className="text-xl font-bold text-white mb-6">Personal Information</h3>
            <div className="flex items-center space-x-6 mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-700 rounded-full flex items-center justify-center text-black text-2xl font-bold shadow-lg">
                    LM
                </div>
                <div className="flex-1">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                            <input type="text" defaultValue="Lucky Malik" className="platform-input w-full px-4 py-3 rounded-lg focus:outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                            <input type="email" defaultValue="lucky.malik@example.com" className="platform-input w-full px-4 py-3 rounded-lg focus:outline-none" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Location</label>
                    <input type="text" placeholder="Enter your location..." className="platform-input w-full px-4 py-3 rounded-lg focus:outline-none" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Time Zone</label>
                    <select className="platform-input w-full px-4 py-3 rounded-lg focus:outline-none">
                        <option>UTC+0 (GMT)</option>
                        <option>UTC+1 (CET)</option>
                        <option>UTC+5:30 (IST)</option>
                        <option>UTC-5 (EST)</option>
                        <option>UTC-8 (PST)</option>
                    </select>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <button 
                  onClick={handleSave}
                  style={{ backgroundColor: saveStatus !== '💾 Save Changes' ? '#059669' : '' }}
                  className="bg-green-600 text-black px-6 py-3 rounded-lg font-bold hover:bg-green-500 hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all">
                    {saveStatus}
                </button>
                <button className="text-gray-400 hover:text-white px-4 py-3 rounded-lg font-medium transition-colors">
                    Cancel
                </button>
            </div>
        </div>

        <div className="setting-card bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-700 mb-8">
            <h3 className="text-xl font-bold text-white mb-6">Connected Platforms</h3>
            <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-red-900/10 rounded-lg border border-red-900/30 hover:border-red-800 transition-colors">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-700 rounded-lg flex items-center justify-center text-white font-bold shadow-lg">CF</div>
                        <div>
                            <div className="font-medium text-white">Codeforces</div>
                            <div className="text-sm text-gray-400">Connected as: luckymalik_07</div>
                            <div className="text-xs text-red-400">Rating: 1,450 (Pupil)</div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <span className="bg-green-900/30 text-green-400 border border-green-900 px-3 py-1 rounded-full text-sm font-medium">✓ Connected</span>
                        <button className="text-red-400 hover:text-red-300 font-medium text-sm">Disconnect</button>
                    </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-blue-900/10 rounded-lg border border-blue-900/30 hover:border-blue-800 transition-colors">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white font-bold shadow-lg">AC</div>
                        <div>
                            <div className="font-medium text-white">AtCoder</div>
                            <div className="text-sm text-gray-400">Connected as: lucky_malik</div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <span className="bg-green-900/30 text-green-400 border border-green-900 px-3 py-1 rounded-full text-sm font-medium">✓ Connected</span>
                        <button className="text-blue-400 hover:text-blue-300 font-medium text-sm">Disconnect</button>
                    </div>
                </div>
            </div>
        </div>

        <div className="setting-card bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-700 mb-8">
            <h3 className="text-xl font-bold text-white mb-6">Preferences</h3>
            <div className="space-y-6">
                <div>
                    <h4 className="font-medium text-white mb-4">Notifications</h4>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="font-medium text-gray-300">Contest Reminders</div>
                                <div className="text-sm text-gray-500">Get notified about upcoming contests</div>
                            </div>
                            <div 
                                className={`toggle-switch w-12 h-6 rounded-full cursor-pointer relative ${notificationsEnabled ? 'active' : ''}`}
                                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                            >
                                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all duration-300 ${notificationsEnabled ? 'transform translate-x-6' : 'translate-x-0.5'}`}></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pt-6 border-t border-gray-800">
                    <h4 className="font-medium text-white mb-4">Privacy</h4>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="font-medium text-gray-300">Public Profile</div>
                                <div className="text-sm text-gray-500">Allow others to view your profile</div>
                            </div>
                            <div 
                                className={`toggle-switch w-12 h-6 rounded-full cursor-pointer relative ${publicProfileEnabled ? 'active' : ''}`}
                                onClick={() => setPublicProfileEnabled(!publicProfileEnabled)}
                            >
                                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all duration-300 ${publicProfileEnabled ? 'transform translate-x-6' : 'translate-x-0.5'}`}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="setting-card bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-6">Account Actions</h3>
            <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-red-900/10 rounded-lg border border-red-900/30">
                    <div>
                        <div className="font-medium text-white">Delete Account</div>
                        <div className="text-sm text-gray-500">Permanently delete your account and data</div>
                    </div>
                    <button className="bg-red-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors">
                        🗑️ Delete
                    </button>
                </div>
            </div>
        </div>
      </div>

      <div id="robot-container" ref={robotContainerRef} className="hidden xl:block"></div>
    </div>
  );
};

export default ProfilePage;
