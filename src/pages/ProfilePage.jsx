import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

const ProfilePage = () => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [publicProfileEnabled, setPublicProfileEnabled] = useState(true);
    const [saveStatus, setSaveStatus] = useState('Save Changes');
    const robotContainerRef = useRef(null);

    const handleSave = () => {
        setSaveStatus('Saved');
        setTimeout(() => setSaveStatus('Save Changes'), 2000);
    };

    useEffect(() => {
        if (!robotContainerRef.current) return;
        const container = robotContainerRef.current;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.set(3, 1, 6);
        camera.lookAt(0, 0, 0);

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        scene.add(new THREE.AmbientLight(0x555555, 0.8));
        const key = new THREE.DirectionalLight(0x6b7280, 1.5);
        key.position.set(-2, 4, 3);
        scene.add(key);
        const fill = new THREE.PointLight(0x374151, 1.0);
        fill.position.set(2, 1, 2);
        scene.add(fill);

        const robot = new THREE.Group();
        robot.scale.set(1.2, 1.2, 1.2);
        scene.add(robot);

        const armorMat = new THREE.MeshStandardMaterial({ color: 0x374151, roughness: 0.4, metalness: 0.8 });
        const accentMat = new THREE.MeshStandardMaterial({ color: 0x6b7280, emissive: 0x4b5563, emissiveIntensity: 0.5, toneMapped: false });

        const torsoGeo = new THREE.BoxGeometry(0.8, 1, 0.5);
        const torso = new THREE.Mesh(torsoGeo, armorMat);
        torso.position.y = 0.5;
        robot.add(torso);

        const coreGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.1, 16);
        const core = new THREE.Mesh(coreGeo, accentMat);
        core.rotation.x = Math.PI / 2;
        core.position.set(0, 0.7, 0.26);
        robot.add(core);

        const headGroup = new THREE.Group();
        robot.add(headGroup);
        const head = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.6, 0.5), armorMat);
        head.position.y = 1.4;
        headGroup.add(head);
        const visor = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.1, 0.52), accentMat);
        visor.position.set(0, 1.4, 0.02);
        headGroup.add(visor);

        const legGeo = new THREE.BoxGeometry(0.25, 1.2, 0.3);
        const leftLeg = new THREE.Mesh(legGeo, armorMat);
        leftLeg.position.set(-0.25, -0.6, 0);
        robot.add(leftLeg);
        const rightLeg = new THREE.Mesh(legGeo, armorMat);
        rightLeg.position.set(0.25, -0.6, 0);
        robot.add(rightLeg);

        const footGeo = new THREE.BoxGeometry(0.3, 0.15, 0.5);
        const lf = new THREE.Mesh(footGeo, armorMat);
        lf.position.set(-0.25, -1.25, 0.1);
        robot.add(lf);
        const rf = new THREE.Mesh(footGeo, armorMat);
        rf.position.set(0.25, -1.25, 0.1);
        robot.add(rf);

        const armGeo = new THREE.BoxGeometry(0.2, 0.9, 0.2);
        const la = new THREE.Mesh(armGeo, armorMat);
        la.position.set(-0.55, 0.5, 0);
        la.rotation.z = 0.1;
        robot.add(la);
        const ra = new THREE.Mesh(armGeo, armorMat);
        ra.position.set(0.55, 0.5, 0);
        ra.rotation.z = -0.1;
        robot.add(ra);

        const grid = new THREE.GridHelper(4, 10, 0x1f2937, 0x1f2937);
        grid.material.transparent = true;
        grid.material.opacity = 0.2;
        grid.position.y = -1.35;
        scene.add(grid);

        let mouseX = 0;
        const half = window.innerWidth / 2;
        const onMouseMove = (e) => { mouseX = (e.clientX - half) / 4; };
        document.addEventListener('mousemove', onMouseMove);

        const clock = new THREE.Clock();
        let raf;
        function animate() {
            raf = requestAnimationFrame(animate);
            const t = clock.getElapsedTime();
            const breathe = Math.sin(t * 2) * 0.005;
            torso.position.y = 0.5 + breathe;
            headGroup.position.y = breathe;
            const target = Math.max(-0.5, Math.min(0.5, mouseX * 0.002));
            headGroup.rotation.y += (target - headGroup.rotation.y) * 0.1;
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
            cancelAnimationFrame(raf);
            container.removeChild(renderer.domElement);
            scene.clear();
        };
    }, []);

    const Toggle = ({ enabled, onToggle }) => (
        <button
            onClick={onToggle}
            className={`relative w-10 h-5 rounded-full border transition-colors ${enabled ? 'bg-gray-600 border-gray-500' : 'bg-gray-800 border-gray-700'}`}
        >
            <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-gray-300 transition-all duration-200 ${enabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
        </button>
    );

    return (
        <div className="min-h-screen relative">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24 relative z-10 lg:ml-auto lg:mr-32">
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold text-white tracking-tight mb-1">Profile Settings</h1>
                    <p className="text-gray-500 text-sm">Manage your account and platform connections</p>
                </div>

                {/* Personal info */}
                <div className="bg-[#0f1117] border border-gray-800 rounded-xl p-5 mb-4">
                    <div className="text-sm font-medium text-gray-400 mb-4">Personal Information</div>
                    <div className="flex items-center gap-4 mb-5">
                        <div className="w-12 h-12 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-sm font-semibold text-gray-300 flex-shrink-0">LM</div>
                        <div className="flex-1 grid md:grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs text-gray-600 mb-1">Full Name</label>
                                <input type="text" defaultValue="Lucky Malik" className="w-full bg-[#080a0e] border border-gray-800 text-gray-300 text-sm px-3 py-2 rounded-lg focus:outline-none focus:border-gray-600 transition-colors" />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-600 mb-1">Email</label>
                                <input type="email" defaultValue="lucky.malik@example.com" className="w-full bg-[#080a0e] border border-gray-800 text-gray-300 text-sm px-3 py-2 rounded-lg focus:outline-none focus:border-gray-600 transition-colors" />
                            </div>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3 mb-5">
                        <div>
                            <label className="block text-xs text-gray-600 mb-1">Location</label>
                            <input type="text" placeholder="Enter your location..." className="w-full bg-[#080a0e] border border-gray-800 text-gray-400 text-sm px-3 py-2 rounded-lg focus:outline-none focus:border-gray-600 placeholder-gray-700 transition-colors" />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-600 mb-1">Time Zone</label>
                            <select className="w-full bg-[#080a0e] border border-gray-800 text-gray-400 text-sm px-3 py-2 rounded-lg focus:outline-none focus:border-gray-600 transition-colors">
                                <option>UTC+5:30 (IST)</option>
                                <option>UTC+0 (GMT)</option>
                                <option>UTC-5 (EST)</option>
                                <option>UTC-8 (PST)</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={handleSave}
                            className="px-4 py-1.5 rounded-md border border-gray-700 text-gray-300 text-sm hover:border-gray-500 hover:text-white transition-colors"
                        >
                            {saveStatus}
                        </button>
                        <button className="text-sm text-gray-600 hover:text-gray-400 transition-colors">Cancel</button>
                    </div>
                </div>

                {/* Connected platforms */}
                <div className="bg-[#0f1117] border border-gray-800 rounded-xl p-5 mb-4">
                    <div className="text-sm font-medium text-gray-400 mb-4">Connected Platforms</div>
                    <div className="space-y-2">
                        {[
                            { abbr: 'CF', name: 'Codeforces', handle: 'Cactii', rating: '1,450 · Pupil' },
                            { abbr: 'LC', name: 'LeetCode', handle: 'lucky_malik', rating: null },
                            { abbr: 'CC', name: 'CodeChef', handle: 'lucky_cc', rating: null },
                        ].map(p => (
                            <div key={p.name} className="flex items-center justify-between p-3 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-md bg-gray-800 border border-gray-700 flex items-center justify-center text-xs font-semibold text-gray-400">{p.abbr}</div>
                                    <div>
                                        <div className="text-sm text-gray-300">{p.name}</div>
                                        <div className="text-xs text-gray-600">{p.handle}{p.rating ? ` · ${p.rating}` : ''}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs text-gray-600">Connected</span>
                                    <button className="text-xs text-gray-600 hover:text-red-400 transition-colors">Disconnect</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Preferences */}
                <div className="bg-[#0f1117] border border-gray-800 rounded-xl p-5 mb-4">
                    <div className="text-sm font-medium text-gray-400 mb-4">Preferences</div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm text-gray-300">Contest Reminders</div>
                                <div className="text-xs text-gray-600">Get notified about upcoming contests</div>
                            </div>
                            <Toggle enabled={notificationsEnabled} onToggle={() => setNotificationsEnabled(p => !p)} />
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-gray-800">
                            <div>
                                <div className="text-sm text-gray-300">Public Profile</div>
                                <div className="text-xs text-gray-600">Allow others to view your profile</div>
                            </div>
                            <Toggle enabled={publicProfileEnabled} onToggle={() => setPublicProfileEnabled(p => !p)} />
                        </div>
                    </div>
                </div>

                {/* Danger zone */}
                <div className="bg-[#0f1117] border border-gray-800 rounded-xl p-5">
                    <div className="text-sm font-medium text-gray-400 mb-4">Account</div>
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-sm text-gray-300">Delete Account</div>
                            <div className="text-xs text-gray-600">Permanently delete your account and all data</div>
                        </div>
                        <button className="text-xs px-3 py-1.5 rounded-md border border-red-900 text-red-600 hover:border-red-700 hover:text-red-400 transition-colors">
                            Delete
                        </button>
                    </div>
                </div>
            </div>

            <div id="robot-container" ref={robotContainerRef} className="hidden xl:block" />
        </div>
    );
};

export default ProfilePage;
