"use client";
import React, { useState, useRef, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import classNames from "classnames";
import styles from './createProduct.module.scss';
import RightArrow from '@/icons/rightArrow';
import PlusIcon from '@/icons/plusIcon';
import PlayWhiteIcon from '@/icons/playWhiteIcon';

const PosterImage = '/assets/images/poster.png';
const AnimationVide = "/assets/images/logo-animation.webm";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = (supabaseUrl && supabaseAnonKey) ? createClient(supabaseUrl, supabaseAnonKey) : null;

export default function CreateProduct() {
    const [activeTab, setActiveTab] = useState('video');
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [description, setDescription] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedVideoUrl, setGeneratedVideoUrl] = useState(null);
    const [generatedMediaType, setGeneratedMediaType] = useState('video'); // 'video' or 'image'
    const [generationStatus, setGenerationStatus] = useState('idle'); // idle, generating, completed, failed
    const [currentMessage, setCurrentMessage] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const subscriptionRef = useRef(null);
    const [videoKey, setVideoKey] = useState(0);
    const fileInputRef = useRef(null);
    const [showDownloadModal, setShowDownloadModal] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    // Force video reload on visibility change
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                setVideoKey(prev => prev + 1);
            }
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
    }, []);

    // Load/Save persisted state
    useEffect(() => {
        const persistedUrl = localStorage.getItem("helix_generated_url");
        const persistedType = localStorage.getItem("helix_generated_type");
        if (persistedUrl) {
            setGeneratedVideoUrl(persistedUrl);
            setGeneratedMediaType(persistedType || 'video');
            setGenerationStatus('completed');
        }
    }, []);

    useEffect(() => {
        if (generatedVideoUrl) {
            localStorage.setItem("helix_generated_url", generatedVideoUrl);
            localStorage.setItem("helix_generated_type", generatedMediaType);
        }
    }, [generatedVideoUrl, generatedMediaType]);

    // Loading messages
    const loadingMessages = [
        "Sequencing your product's visual DNA...",
        "Whispering sweet nothings to your brand.",
        "Assembling molecular storytelling strands.",
        "Writing your product's Oscar speech.",
        "Making your competitors nervous.",
        "Synthesizing art from atoms.",
        "Injecting imagination into the code.",
        "Splicing genius into your visuals.",
        "Wooing your pixels until they flirt back.",
        "Generating the next 'you'll never guess it's AI' moment.",
        "Delivering something you're about to brag about.",
        "The genome of storytelling is almost complete.",
    ];

    useEffect(() => {
        if (isGenerating) {
            const interval = setInterval(() => {
                setCurrentMessage((prev) => (prev + 1) % loadingMessages.length);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [isGenerating]);

    // Cleanup subscription
    useEffect(() => {
        return () => {
            if (subscriptionRef.current) {
                supabase?.removeChannel(subscriptionRef.current);
            }
        };
    }, []);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
            setErrorMessage("");
        }
    };

    const getSessionId = () => {
        if (typeof window === 'undefined') return crypto.randomUUID();
        let session_id = localStorage.getItem("session_id");
        if (!session_id) {
            session_id = crypto.randomUUID();
            localStorage.setItem("session_id", session_id);
        }
        return session_id;
    };

    const handleRunHelix = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        if (!selectedFile && !description.trim()) {
            setErrorMessage("Please upload an image and enter a description.");
            return;
        }
        if (!selectedFile) {
            setErrorMessage("Please upload an image.");
            return;
        }
        if (!description.trim()) {
            setErrorMessage("Please enter a description.");
            return;
        }

        setIsGenerating(true);
        setGenerationStatus('generating');
        setGeneratedVideoUrl(null);
        localStorage.removeItem("helix_generated_url");
        localStorage.removeItem("helix_generated_type");

        const session_id = getSessionId();
        const API_BASE_URL = process.env.NEXT_PUBLIC_PYTHON_API || "https://api.runhelix.ai";
        const userContent = description.trim();

        // Clear inputs immediately
        setDescription("");
        setSelectedFile(null);
        setPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";

        try {
            if (activeTab === 'image') {
                const endpoint = `${API_BASE_URL}/v1/media/image/generation`;
                const formData = new FormData();
                formData.append("user_content", userContent);
                formData.append("image_ratio", "portrait");
                formData.append("file", selectedFile);
                formData.append("session_id", session_id);

                const response = await fetch(endpoint, {
                    method: "POST",
                    body: formData,
                });

                if (response.ok) {
                    const data = await response.json();
                    await handleGenerationResponse(data, session_id, userContent);
                } else {
                    handleGenerationError();
                }
            } else {
                const endpoint = `${API_BASE_URL}/v1/video-generation/webhook`;
                const base64File = await new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(selectedFile);
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = error => reject(error);
                });
                const base64Only = base64File.split(",")[1];

                const payload = {
                    user_content: userContent,
                    image_ratio: "portrait",
                    image_base64: base64Only,
                    session_id: session_id
                };

                const response = await fetch(endpoint, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    const data = await response.json();
                    await handleGenerationResponse(data, session_id, userContent);
                } else {
                    handleGenerationError();
                }
            }
        } catch (error) {
            console.error("Error:", error);
            handleGenerationError();
        }
    };

    const handleGenerationResponse = async (data, sessionId, userContent) => {
        const mediaId = data.video_id || data.image_id;
        if (mediaId && supabase) {
            const mode = activeTab === 'image' ? 'image-to-image' : 'image-to-video';
            const videoData = {
                id: mediaId,
                status: 'pending',
                created_at: new Date().toISOString(),
                title: userContent ? userContent.slice(0, 80) : "Generated Media",
                mode: mode,
                session_id: sessionId,
                user_content: userContent,
            };

            const { error } = await supabase.from("generated_videos").upsert([videoData], { onConflict: "id" });
            if (error) console.error("Error upserting record:", error);

            subscribeToMedia(mediaId);
        } else {
            if (!supabase) alert("Supabase client not initialized! Check env vars.");
            setIsGenerating(false);
            setGenerationStatus('failed');
        }
    };

    const handleGenerationError = () => {
        setGenerationStatus('failed');
        setIsGenerating(false);
        setErrorMessage("Failed to start generation.");
    };

    const subscribeToMedia = (mediaId) => {
        const channel = supabase
            .channel(`generated_videos_${mediaId}`)
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "generated_videos",
                    filter: `id=eq.${mediaId}`,
                },
                (payload) => {
                    const newData = payload.new;
                    if (newData && newData.status === "completed" && newData.location) {
                        const mediaUrl = newData.location.startsWith("http")
                            ? newData.location
                            : `${process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://api.runhelix.ai'}/storage/v1/object/public/${newData.location}`;

                        setGeneratedVideoUrl(mediaUrl);
                        const isImage = newData.mode === 'image-to-image';
                        setGeneratedMediaType(isImage ? 'image' : 'video');
                        setGenerationStatus('completed');
                        setIsGenerating(false);
                        supabase.removeChannel(channel);
                    } else if (newData && newData.status === "failed") {
                        setGenerationStatus('failed');
                        setIsGenerating(false);
                        supabase.removeChannel(channel);
                        setErrorMessage("Generation failed.");
                    }
                }
            )
            .subscribe((status) => {
                if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
                    setIsGenerating(false);
                    setGenerationStatus('failed');
                    setErrorMessage("Connection error. Please try again.");
                    supabase.removeChannel(channel);
                }
            });

        subscriptionRef.current = channel;
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const handleDownloadClick = () => {
        setShowDownloadModal(true);
    };

    const confirmDownload = () => {
        const session_id = getSessionId();
        window.location.href = `https://platform.runhelix.ai/auth?session_id=${session_id}`;
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            // Check if file is an image
            if (file.type.startsWith('image/')) {
                setSelectedFile(file);
                setPreview(URL.createObjectURL(file));
                setErrorMessage("");
            } else {
                setErrorMessage("Please upload an image file.");
            }
        }
    };

    return (
        <div className={styles.createProductAlignment} id="create-first-video">
            {showDownloadModal && (
                <div className={styles.modalBackdrop} onClick={() => setShowDownloadModal(false)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <button
                            className={styles.closeButton}
                            onClick={() => setShowDownloadModal(false)}
                        >
                            ×
                        </button>
                        <h3>We hope you love your {generatedMediaType === 'image' ? 'Image' : 'Video'}</h3>
                        <p>To download, please create an account.</p>
                        <button className={styles.modalButton} onClick={confirmDownload}>
                            Create Account
                        </button>
                    </div>
                </div>
            )}
            <div className='container-xs2'>
                <div className={styles.title}>
                    <h2>Create Your First Product Video or Image</h2>
                    <div className={styles.allIconAlignment}>
                        <span>Idea</span><RightArrow />
                        <span>Run Helix</span><RightArrow />
                        <span>Post</span><RightArrow />
                        <span>Test</span><RightArrow />
                        <span>Boost</span><RightArrow />
                        <span>Repeat</span>
                    </div>
                </div>
                <div className={styles.outlineBox}>
                    <div className={styles.boxCenter}>
                        <div className={styles.relativeClass}>
                            <div className={styles.subtitle}>
                                <h2>Good Afternoon,Jason What’s on <span>your mind?</span></h2>
                            </div>
                            
                            <div className={styles.videobox} style={{ minHeight: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                {isGenerating ? (
                                    <div style={{ height: '100%', minHeight: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#111', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
                                        <video
                                            src={AnimationVide}
                                            loop
                                            autoPlay
                                            muted
                                            playsInline
                                            className="mt-6"
                                        />
                                        <p style={{ color: 'white', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
                                            {loadingMessages[currentMessage]}
                                        </p>
                                        <p style={{ color: '#ffffff70', fontSize: '12px', fontWeight: '500', marginBottom: '8px' }}>
                                            Helix is now running . <br/> Videos can take up to 7 minutes to generate. <br/> Please enjoy a snack.
                                        </p>
                                    </div>
                                ) : generatedVideoUrl ? (
                                    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                                        <button
                                            onClick={handleDownloadClick}
                                            style={{
                                                position: 'absolute',
                                                top: '12px',
                                                right: '12px',
                                                zIndex: 10,
                                                background: 'rgba(0, 0, 0, 0.6)',
                                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                                borderRadius: '8px',
                                                width: '36px',
                                                height: '36px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer',
                                                backdropFilter: 'blur(4px)',
                                                transition: 'all 0.2s ease'
                                            }}
                                            title="Download & Save"
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background = 'rgba(0, 0, 0, 0.8)';
                                                e.currentTarget.style.transform = 'scale(1.05)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background = 'rgba(0, 0, 0, 0.6)';
                                                e.currentTarget.style.transform = 'scale(1)';
                                            }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                                <polyline points="7 10 12 15 17 10"></polyline>
                                                <line x1="12" y1="15" x2="12" y2="3"></line>
                                            </svg>
                                        </button>
                                        {generatedMediaType === 'image' ? (
                                            <img src={generatedVideoUrl} alt="Generated" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} />
                                        ) : (
                                            <video
                                                key={`${generatedVideoUrl}-${videoKey}`}
                                                src={generatedVideoUrl}
                                                controls
                                                autoPlay
                                                style={{ width: '100%', height: '100%', borderRadius: '12px' }}
                                            />
                                        )}
                                    </div>
                                ) : (
                                    <>
                                        <div className={styles.poster}>
                                            <img src={PosterImage} alt='PosterImage' />
                                        </div>
                                        {!generatedVideoUrl && <div className={styles.textBox}>
                                            <p>
                                                Real creator. Real setting. Handheld phone shots with casual movement and natural lighting — true UGC authenticity.
                                            </p>
                                        </div>}
                                    </>
                                )}
                            </div>

                            <div className={styles.toggleCenter}>
                                <div className={styles.buttonGroup}>
                                    <button 
                                        className={classNames(activeTab === 'video' ? styles.active : "")}
                                        onClick={() => setActiveTab('video')}
                                    >
                                        Video
                                    </button>
                                    <button 
                                        className={classNames(activeTab === 'image' ? styles.active : "")}
                                        onClick={() => setActiveTab('image')}
                                    >
                                        Photo
                                    </button>
                                </div>
                            </div>

                            <div 
                                className={styles.messageBox}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                style={{
                                    border: isDragging ? '2px dashed #29A6B4' : '1px solid rgba(255, 255, 255, 0.12)',
                                    backgroundColor: isDragging ? 'rgba(41, 166, 180, 0.1)' : 'rgba(18, 18, 18, 0.40)',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                {preview && (
                                    <div style={{ padding: '0 16px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <img src={preview} alt="Preview" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                                        <button onClick={() => { setSelectedFile(null); setPreview(null); }} style={{ background: 'rgba(0,0,0,0.1)', border: 'none', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', cursor: 'pointer', fontSize: '14px' }}>×</button>
                                    </div>
                                )}
                                <textarea 
                                    placeholder='Simply enter your prompt and media here to create your first video'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                                
                                {errorMessage && <div style={{ color: 'red', fontSize: '12px', padding: '0 16px' }}>{errorMessage}</div>}

                                <div className={styles.chatBottomAlignment}>
                                    <div className={styles.leftAlignment}>
                                        <input 
                                            type="file" 
                                            ref={fileInputRef} 
                                            onChange={handleFileChange} 
                                            accept="image/*" 
                                            style={{ display: 'none' }} 
                                        />
                                        <button onClick={triggerFileInput}>
                                            <PlusIcon />
                                            Media
                                        </button>
                                    </div>
                                    <div className={styles.rightAlignment}>
                                        <button 
                                            onClick={handleRunHelix} 
                                            disabled={isGenerating}
                                            style={{ opacity: isGenerating ? 0.7 : 1, cursor: isGenerating ? 'not-allowed' : 'pointer' }}
                                        >
                                            <PlayWhiteIcon />
                                            {isGenerating ? 'Generating...' : 'Run Helix'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
